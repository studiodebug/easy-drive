# 13 — Arquitetura do Sistema

## Padrão Arquitetural: Clean Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Presentation (HTTP)                                     │
│  ├── Routes (Express Router)                             │
│  ├── Controllers (BaseController)                        │
│  └── Validators (Zod schemas)                            │
├─────────────────────────────────────────────────────────┤
│  Application (Use Cases)                                 │
│  ├── AuthenticateUserUseCase                             │
│  ├── BillingUseCase                                      │
│  ├── BookingUseCase                                      │
│  └── ...demais use cases                                 │
├─────────────────────────────────────────────────────────┤
│  Domain (Interfaces / Core)                              │
│  ├── Repository Interfaces (TypeScript interfaces)       │
│  ├── Error Classes                                       │
│  └── Domain Entities (types)                             │
├─────────────────────────────────────────────────────────┤
│  Data (Infrastructure)                                   │
│  ├── Sequelize Models                                    │
│  ├── Sequelize Repositories                              │
│  └── Cloudinary Repository                               │
└─────────────────────────────────────────────────────────┘
```

---

## BaseController

**Localização:** `src/app/BaseController.ts`

Todos os controllers herdam de `BaseController`. Os métodos reais são:

```typescript
export abstract class BaseController {
  // Envia JSON com status code (default: 200)
  public sendJson<T>(response: Response, data: T, code: number = 200): Response

  // Trata erro de aplicação (ApplicationError) ou erro interno
  // code = status para ApplicationError (default: 400)
  // Se error.cause !== "Application handled error" → chama sendInternalServerError
  public sendErrorJson(response: Response, error: any, code: number = 400): Response

  // Retorna erro interno (500)
  // Em produção: apenas { message: "Internal Server Error" }
  // Fora de produção: inclui error.message e error.stack
  public sendInternalServerError(response: Response, error?: any): Response

  // Retorna 400 com { isValid, message, errors }
  public sendBadRequest(response: Response, failedValidationResult: InputValidationResult): Response

  // Retorna 204 (sem body)
  public sendNoContent(response: Response): Response

  // Retorna 401 { message: "Unauthorized" }
  public sendUnauthorized(response: Response): Response

  // Retorna 403 { message: error?.message || "Forbidden" }
  public sendForbidden(response: Response, error?: any): Response

  // Retorna 404 {}  (em produção sem detalhes)
  public sendNotFoundError(response: Response, error?: any): Response
}
```

> **ATENÇÃO:** Os métodos são `sendJson`, `sendErrorJson`, `sendBadRequest`, etc. — **NÃO** `ok`, `created`, `accepted`, `notFound` etc. Não use esses nomes.

### Como `sendErrorJson` funciona

```typescript
public sendErrorJson(response: Response, error: any, code: number = 400): Response {
  // Se NÃO é erro de aplicação → 500
  if (error instanceof Error && error.cause !== "Application handled error") {
    return this.sendInternalServerError(response, error);
  }
  // É erro de aplicação → usa code (default 400)
  const message = error?.details ?? error?.message ?? error ?? "Unexpected Error";
  return response.status(code).json({ message });
}
```

Implicação: **todos os `ApplicationError` retornam HTTP 400 por padrão**, exceto quando o controller passa um `code` diferente.

Exemplo: `sendErrorJson(res, error, 404)` → todos os ApplicationErrors retornam 404.

---

## ApplicationError e subclasses

**Localização:** `src/core/errors/index.ts`

```typescript
export class ApplicationError extends Error {
  constructor(message: string) {
    super(message);
    this.cause = "Application handled error";  // ← identificador para BaseController
    this.name = "ApplicationError";
  }
  // NÃO tem statusCode nem code como propriedades
}
```

**Subclasses (todos herdam de ApplicationError):**

```typescript
// src/core/errors/index.ts
class EntityNotFoundError extends ApplicationError
class ValidationError extends ApplicationError  // tem campo .details: Record<string, string[]>
class UnauthorizedError extends ApplicationError  // message padrão: "Unauthorized"
class ForbiddenAccessError extends ApplicationError  // message padrão: "Forbidden"

// src/modules/users/errors/index.ts
class InvalidCredentialsError   // "Email ou senha inválidos"
class UserBlockedError          // "Usuário bloqueado"
class UserInactiveError         // "Usuário inativo"
class InvalidRefreshTokenError  // "Refresh token inválido ou expirado"
class UserAlreadyExistsError    // "Usuário já cadastrado com este email"
class InvalidConfirmTokenError  // "Link de confirmação inválido ou expirado"
class InvalidResetTokenError    // "Link de redefinição de senha inválido ou expirado"

// src/modules/bookings/errors/index.ts
class SlotUnavailableError      // "SLOT_UNAVAILABLE" (tratado manualmente com 409)
class InsufficientCreditsError  // "INSUFFICIENT_CREDITS" (tratado manualmente com 422)
```

**Todos** têm `this.cause = "Application handled error"` herdado de `ApplicationError`.

### HTTP status real por erro

| Erro | HTTP code | Como |
|------|-----------|------|
| InvalidCredentialsError | 400 | `sendErrorJson(res, e)` default |
| UserBlockedError | 400 | `sendErrorJson(res, e)` default |
| UserAlreadyExistsError | 400 | `sendErrorJson(res, e)` default |
| InvalidConfirmTokenError | 400 | `sendErrorJson(res, e)` default |
| UnauthorizedError | 400 | `sendErrorJson(res, e)` default |
| ForbiddenAccessError (booking) | 404 | `sendErrorJson(res, e, 404)` |
| SlotUnavailableError | 409 | tratamento manual no controller |
| InsufficientCreditsError | 422 | tratamento manual no controller |
| Erros internos (não-ApplicationError) | 500 | `sendInternalServerError` |

---

## Dependency Injection (RSDI)

**Biblioteca:** `rsdi`  
**Sintaxe:** `object(Class).construct(use("Dep1"), use("Dep2"))`

### Configuração (`src/shared/di.ts`)

```typescript
import DIContainer, { object, use } from "rsdi";

const configureDI = () => {
  const container = new DIContainer();
  container.add({
    // Config
    Sequelize: sequelize,                // instância direta (not singleton)
    CloudinaryConfig: cloudinaryConfig,

    // Providers
    TokenProvider: object(TokenProvider).construct(),
    EmailSender: process.env.RESEND_API_KEY
      ? object(ResendEmailSender).construct()
      : object(NoOpEmailSender).construct(),

    // Repositories (recebem dependências via use())
    UsersRepository: object(SequelizeUsersRepository).construct(use("Sequelize")),
    WalletRepository: object(SequelizeWalletRepository).construct(use("Sequelize")),
    BillingRepository: object(SequelizeBillingRepository).construct(use("Sequelize")),
    BookingRepository: object(SequelizeBookingRepository).construct(use("Sequelize")),
    DashboardRepository: object(SequelizeDashboardRepository).construct(use("Sequelize")),
    ReviewRepository: object(SequelizeReviewRepository).construct(use("Sequelize")),
    WaitlistRepository: object(SequelizeWaitlistRepository).construct(use("Sequelize")),
    AddressRepository: object(SequelizeAddressRepository).construct(use("Sequelize")),
    StudentRepository: object(SequelizeStudentRepository).construct(use("Sequelize")),
    AuditLogRepository: object(ConsoleAuditLogRepository).construct(),
    DomainEndpointsRepository: object(SequelizeDomainEndpointsRepository).construct(use("Sequelize")),
    FileUploadRepository: object(CloudinaryFileUploadRepository).construct(use("CloudinaryConfig")),

    // Use Cases e Controllers de cada módulo (via di.ts por módulo)
    ...healthControllers, ...healthUseCases,
    ...usersControllers,  ...usersUseCases,
    ...filesControllers,  ...filesUseCases,
    ...walletControllers, ...walletUseCases,
    ...billingControllers,...billingUseCases,
    ...bookingControllers,...bookingUseCases,
    ...dashboardControllers,...dashboardUseCases,
    ...reviewControllers, ...reviewUseCases,
    ...waitlistControllers,...waitlistUseCases,
  });
  return container;
};
```

### Acesso ao container nas rotas

```typescript
// Exemplo: billing routes
billingRoutes.post("/billing/credits/quote", rateLimitMiddleware, authenticateMiddleware,
  (req, res) => req.container?.get(BillingController.name).quote(req, res)
);
```

O container é acessado por `req.container.get(ClassName.name)`.

### Por requisição, não singleton

```typescript
// src/app/middleware/initSession.ts
export const initSession = (req, res, next) => {
  req.container = configureDI();  // ← NOVO container a cada requisição
  next();
};
```

> **ATENÇÃO:** `configureDI()` é chamado a cada requisição. Existe uma classe `DISingleton` no código, mas ela **não é usada** pelo `initSession`. Container é recriado por request.

---

## Padrão de Validação de Input

```typescript
// src/presentation/contracts/InputValidator.ts
export interface InputValidationResult {
  isValid: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface InputValidator<T> {
  validate(input: T | unknown): InputValidationResult;
}
```

Validators usam **Zod** e mapeiam erros:
```typescript
function mapError(error: z.ZodError): InputValidationResult {
  const errors: Record<string, string[]> = {};
  for (const issue of error.errors) {
    const key = issue.path.join(".") || "root";
    if (!errors[key]) errors[key] = [];
    errors[key].push(issue.message);
  }
  return { isValid: false, message: "Dados inválidos", errors };
}
```

---

## Padrão Use Case

Cada use case recebe dependências via construtor (injeção pelo DI):

```typescript
export class BillingUseCase {
  constructor(
    private readonly billingRepository: BillingRepository,
    private readonly walletRepository: WalletRepository,
    private readonly studentRepository: StudentRepository,
    private readonly auditLogRepository: AuditLogRepository,
    private readonly sequelize: Sequelize  // para transações
  ) {}
}
```

---

## Transações Sequelize

Usadas em operações atômicas:

```typescript
await this.sequelize.transaction(async (transaction) => {
  // Todas as queries passam { transaction } ou a própria instância
  const slot = await createAvailabilitySlot({ ..., transaction });
  const booking = await createBooking({ ..., transaction });
  await decreaseBalance(walletId, credits, transaction);
  // Rollback automático se qualquer linha lançar exceção
});
```

**Onde são usadas:**
- `BookingUseCase.confirm()` — cria slot + booking + debita carteira
- `BookingUseCase.cancel()` — cancela booking + reembolsa carteira
- `BillingUseCase.registerWebhook()` — credita carteira + atualiza checkout + cria transação

---

## Configuração do Servidor Express

```typescript
// src/server.ts

// CORS deve vir antes do helmet
server.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
}));

server.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false,
}));

server.use(express.json({ limit: "10mb" }));
server.use(express.urlencoded({ extended: true, limit: "10mb" }));
server.use(initSession);  // DI container por requisição

// Endpoint raiz
server.get("/", (req, res) => res.status(200).send("Easydrive API"));

// Rotas
server.use(healthRoutes);
server.use(userRoutes);
server.use(fileRoutes);
server.use(walletRoutes);
server.use(billingRoutes);
server.use(bookingRoutes);    // inclui /instructors/:id/schedule e /availability
server.use(dashboardRoutes);
server.use(reviewRoutes);
server.use(waitlistRoutes);   // inclui /instructors/waitlist

// 404 handler
server.use("*", (req, res) => res.status(404).json({ message: "Not found" }));

// Error handler global (não é o BaseController — é fallback Express)
server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});
```

---

## TokenProvider

**Localização:** `src/app/providers/TokenProvider/TokenProvider.ts`

```typescript
interface TokenPayload { userId: number; userUuid: string; email: string; }
interface TokenPair { accessToken: string; refreshToken: string; }  // camelCase

class TokenProvider {
  generateAccessToken(payload): string
  generateRefreshToken(payload): string
  generateTokenPair(payload): TokenPair   // { accessToken, refreshToken } camelCase
  verifyAccessToken(token): TokenPayload
  verifyRefreshToken(token): TokenPayload
  decodeToken(token): TokenPayload | null  // sem verificar assinatura
}
```

> `generateTokenPair` retorna `{ accessToken, refreshToken }` em camelCase.  
> Os use cases convertem para snake_case `{ access_token, refresh_token }` no response.

---

## Helper.ts

```typescript
// src/app/utils/Helper.ts
export const isProduction = (): boolean => process.env.APP_ENV === "production";
export const isLocal = (): boolean => process.env.APP_ENV === "local";
export const getCurrentDateTime = (): Date => new Date();
```

`isProduction()` é usada por `BaseController.sendInternalServerError` para decidir incluir stack trace.

---

## AuditLogRepository

Implementação atual: **console.log** (sem persistência em banco).

```typescript
// ConsoleAuditLogRepository.ts
class ConsoleAuditLogRepository implements AuditLogRepository {
  async log(event: string, data: object): Promise<void> {
    console.log(`[AUDIT] ${event}`, JSON.stringify(data));
  }
}
```

Eventos logados:
- `billing.checkout.created`
- `billing.webhook.received`
- `booking.confirmed`
- `booking.canceled`
- `review.created`
- `waitlist.created`

---

## Módulo por Módulo: di.ts

Cada módulo tem um `di.ts` que exporta `{ controllers, useCases }`:

```typescript
// Exemplo: src/modules/billing/di.ts
export const useCases = {
  BillingUseCase: object(BillingUseCase).construct(
    use("BillingRepository"),
    use("WalletRepository"),
    use("StudentRepository"),
    use("AuditLogRepository"),
    use("Sequelize")
  )
};

export const controllers = {
  BillingController: object(BillingController).construct(
    use("BillingUseCase"),
    use("BillingValidator")
  ),
  BillingValidator: object(BillingValidator).construct()
};
```
