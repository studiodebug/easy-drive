# 04 — Autenticação e Segurança

## Visão Geral

O sistema usa **JWT duplo** (access token + refresh token):
- **Access token:** curto prazo (15 min), assina requisições autenticadas.
- **Refresh token:** longo prazo (7 dias), usado apenas para renovar o access token.

---

## Estrutura do JWT Payload

```typescript
interface TokenPayload {
  userId: number;
  userUuid: string;
  email: string;
}
```

---

## TokenProvider

**Localização:** `src/app/providers/TokenProvider/`

```typescript
interface ITokenProvider {
  generateAccessToken(payload: TokenPayload): string;
  generateRefreshToken(payload: TokenPayload): string;
  verifyAccessToken(token: string): TokenPayload;
  verifyRefreshToken(token: string): TokenPayload;
}
```

**Implementação:**
```typescript
// JwtTokenProvider.ts
import jwt from 'jsonwebtoken';

class JwtTokenProvider implements ITokenProvider {
  generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_ACCESS_EXPIRES_IN });
  }
  generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
  }
  verifyAccessToken(token: string): TokenPayload {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  }
  verifyRefreshToken(token: string): TokenPayload {
    return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
  }
}
```

**Configuração** (`src/config/jwtConfig.ts`):
```typescript
export const JWT_SECRET = process.env.JWT_SECRET!;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
export const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
export const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
```

---

## Middleware: `authenticateMiddleware`

**Localização:** `src/app/middleware/authenticate.ts`

```typescript
export async function authenticateMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = tokenProvider.verifyAccessToken(token);
    req.user = payload;  // { userId, userUuid, email }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
}
```

**Como usar nas rotas:**
```typescript
router.get('/wallet/summary', rateLimitMiddleware, authenticateMiddleware, walletController.getSummary);
```

---

## Middleware: `rateLimitMiddleware`

**Localização:** `src/app/middleware/rateLimit.ts`

Implementação **em memória** (sem Redis). Limita por `IP + rota`.

```typescript
interface RateLimitEntry {
  count: number;
  resetAt: number;  // timestamp ms
}

const store = new Map<string, RateLimitEntry>();

function createRateLimiter(options: { maxRequests: number; windowMs: number }) {
  return (req, res, next) => {
    const key = `${req.ip}:${req.path}`;
    const now = Date.now();
    const entry = store.get(key);

    if (!entry || now > entry.resetAt) {
      store.set(key, { count: 1, resetAt: now + options.windowMs });
      return next();
    }

    if (entry.count >= options.maxRequests) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
      res.setHeader('Retry-After', retryAfter);
      return res.status(429).json({ message: 'Muitas requisições. Tente novamente mais tarde.' });
    }

    entry.count++;
    next();
  };
}
```

**Políticas:**
| Rotas | Limite |
|-------|--------|
| `/users/login` | 30 req/min |
| `/billing/**` | 30 req/min |
| `/bookings/**` | 30 req/min |
| demais rotas com rate limit | 120 req/min |

---

## Middleware: `webhookSignatureMiddleware`

**Localização:** `src/app/middleware/webhookSignature.ts`

Verifica assinatura **HMAC-SHA256** dos webhooks de pagamento.

```typescript
import crypto from 'crypto';

export function webhookSignatureMiddleware(req, res, next) {
  const provider = req.params.provider as 'stripe' | 'mercadopago' | 'mock';

  const secrets: Record<string, string | undefined> = {
    stripe: process.env.STRIPE_WEBHOOK_SECRET,
    mercadopago: process.env.MERCADOPAGO_WEBHOOK_SECRET,
    mock: process.env.MOCK_WEBHOOK_SECRET,
  };

  const secret = secrets[provider];
  if (!secret) return res.status(400).json({ message: 'Provider desconhecido' });

  const signature = req.headers['x-webhook-signature'] as string;
  const payload = JSON.stringify(req.body);

  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  if (signature !== expected) {
    return res.status(401).json({ message: 'Assinatura inválida' });
  }

  next();
}
```

**Header esperado:** `X-Webhook-Signature: <hmac-sha256-hex>`

---

## Middleware: `uploadImageMiddleware`

**Localização:** `src/app/middleware/uploadImage.ts`

```typescript
import multer from 'multer';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_SIZE_BYTES },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) cb(null, true);
    else cb(new InvalidFileTypeError());
  },
});

export const uploadImageMiddleware = upload.single('file');
```

---

## Middleware: `initSession`

**Localização:** `src/app/middleware/initSession.ts`

Inicializa o container DI por requisição, injetando a instância Sequelize correta.

```typescript
export function initSession(req, res, next) {
  const container = buildContainer({ sequelize: dbInstance });
  req.container = container;
  next();
}
```

---

## Hash de Senha

Biblioteca: **bcrypt**  
Salt rounds: **10**

```typescript
// Hook beforeCreate no model User
const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(user.password, salt);

// Hook beforeUpdate (só se password mudou)
if (user.changed("password")) {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
}

// Na verificação (login) — método do model
async comparePassword(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
}
```

---

## Normalização de E-mail

O repositório `SequelizeUsersRepository` normaliza o e-mail para **lowercase** em todas as operações:

```typescript
// findByEmail
where: { email: email.toLowerCase() }

// create
email: data.email.toLowerCase()

// update
if (data.email) data.email = data.email.toLowerCase();
```

---

## Fluxo de Tokens de E-mail

### Confirmação de E-mail

```typescript
// Geração (no signup)
const token = crypto.randomBytes(32).toString('hex');  // 64 chars
const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // +24h

user.emailConfirmToken = token;
user.emailConfirmTokenExpiresAt = expiresAt;
// E-mail enviado com link: {FRONTEND_URL}/auth/confirm?token={token}

// Verificação (POST /users/confirm-email)
const user = await UsersRepo.findByEmailConfirmToken(token);
if (!user || user.emailConfirmTokenExpiresAt < new Date()) throw InvalidConfirmTokenError;
user.emailVerifiedAt = new Date();
user.emailConfirmToken = null;
user.emailConfirmTokenExpiresAt = null;
```

### Reset de Senha

```typescript
// Geração (POST /users/forgot-password)
const token = crypto.randomBytes(32).toString('hex');
const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // +1h

user.passwordResetToken = token;
user.passwordResetTokenExpiresAt = expiresAt;
// E-mail: {FRONTEND_URL}/auth/reset-password?token={token}

// Aplicação (POST /users/reset-password)
const user = await UsersRepo.findByPasswordResetToken(token);
if (!user || user.passwordResetTokenExpiresAt < new Date()) throw InvalidResetTokenError;
user.password = newPassword;  // hook bcrypt aplica hash
user.passwordResetToken = null;
user.passwordResetTokenExpiresAt = null;
```

---

## Classes de Erro de Auth

```typescript
class InvalidCredentialsError extends ApplicationError {
  // status: 401 — e-mail ou senha incorretos
}
class UserBlockedError extends ApplicationError {
  // status: 403 — conta bloqueada
}
class UserInactiveError extends ApplicationError {
  // status: 403 — conta inativa
}
class InvalidRefreshTokenError extends ApplicationError {
  // status: 401 — refresh token inválido ou expirado
}
class UserAlreadyExistsError extends ApplicationError {
  // status: 409 — e-mail já cadastrado
}
class InvalidConfirmTokenError extends ApplicationError {
  // status: 400 — token de confirmação inválido/expirado
}
class InvalidResetTokenError extends ApplicationError {
  // status: 400 — token de reset inválido/expirado
}
```

---

## Segurança Global (server.ts)

```typescript
import cors from 'cors';
import helmet from 'helmet';

app.use(helmet());  // headers de segurança (CSP, HSTS, etc.)
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
```
