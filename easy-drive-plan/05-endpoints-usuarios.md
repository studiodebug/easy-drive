# 05 — Endpoints: Módulo Users

Base path: `/users`

---

## POST /users/signup

Cria nova conta de usuário (aluno).

**Middleware:** nenhum

**Body (JSON):**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "MinhaS3nha!"
}
```

**Validação (Zod):**
- `name`: string, min 1 char, obrigatório
- `email`: string email válido, obrigatório
- `password`: string, mínimo 6 chars, obrigatório

**Lógica:**
1. Verifica se e-mail já existe → `UserAlreadyExistsError`
2. Cria `User` (bcrypt hash automático via Sequelize hook)
3. Gera `emailConfirmToken = crypto.randomBytes(32).toString('hex')` (64 chars)
4. `emailConfirmTokenExpiresAt = now + 24h`
5. Salva token no user via `update()`
6. Envia e-mail com link: `${FRONTEND_URL}/auth/confirm?token=${emailConfirmToken}`
7. Gera access_token e refresh_token via `tokenProvider.generateTokenPair()`

**Response 200:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "email": "joao@example.com",
    "name": "João Silva",
    "avatar_url": null
  }
}
```

**Erros (todos via `sendErrorJson` → status 400):**
- `UserAlreadyExistsError`: `{ "message": "Usuário já cadastrado com este email" }`
- `400` Validação: campos inválidos

---

## POST /users/login

Autentica usuário existente.

**Middleware:** nenhum (rate limit: 30 req/min)

**Body:**
```json
{
  "email": "joao@example.com",
  "password": "MinhaS3nha!"
}
```

**Validação (Zod):**
- `email`: email válido
- `password`: min 1 char

**Lógica:**
1. Busca user por e-mail → `InvalidCredentialsError` se não encontrado
2. `user.comparePassword(password)` (bcrypt) → `InvalidCredentialsError` se inválida
3. Checa `user.status`:
   - `'BLOCKED'` → `UserBlockedError`
   - `'INACTIVE'` → `UserInactiveError`
4. Gera `tokenProvider.generateTokenPair({ userId, userUuid, email })`

**Response 200:**
```json
{
  "access_token": "eyJhbGci...",
  "refresh_token": "eyJhbGci...",
  "user": {
    "id": 1,
    "uuid": "550e8400-...",
    "email": "joao@example.com",
    "name": "João Silva",
    "avatar_url": "https://res.cloudinary.com/..."
  }
}
```

**Erros:**
- `400` InvalidCredentialsError: `{ "message": "Email ou senha inválidos" }`
- `400` UserBlockedError / UserInactiveError
- `429` Rate limit excedido

---

## POST /users/refresh-token

Renova o access token usando o refresh token.

**Middleware:** nenhum

**Body:**
```json
{
  "refresh_token": "eyJhbGci..."
}
```

**Lógica:**
1. `tokenProvider.verifyRefreshToken(refresh_token)` → `InvalidRefreshTokenError` se inválido
2. Busca user por userId → `InvalidRefreshTokenError` se não encontrado
3. Checa `user.status`: BLOCKED → `UserBlockedError`, INACTIVE → `UserInactiveError`
4. Gera novo token pair

**Response 200** _(retorna user completo, não só tokens)_:
```json
{
  "access_token": "eyJhbGci...",
  "refresh_token": "eyJhbGci...",
  "user": {
    "id": 1,
    "uuid": "550e8400-...",
    "email": "joao@example.com",
    "name": "João Silva",
    "avatar_url": null
  }
}
```

---

## POST /users/confirm-email

Confirma o e-mail usando o token enviado no signup.

**Middleware:** nenhum

**Body:**
```json
{
  "token": "a3f8b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1"
}
```

**Lógica:**
1. Busca user por `emailConfirmToken`
2. Se não encontrado → `InvalidConfirmTokenError`
3. Se `emailConfirmTokenExpiresAt < now` → `InvalidConfirmTokenError`
4. Atualiza: `emailVerifiedAt = now`, limpa campos de token
5. Gera novo token pair

**Response 200** _(retorna tokens + user, não apenas mensagem)_:
```json
{
  "access_token": "eyJhbGci...",
  "refresh_token": "eyJhbGci...",
  "user": {
    "id": 1,
    "uuid": "550e8400-...",
    "email": "joao@example.com",
    "name": "João Silva",
    "avatar_url": null
  }
}
```

**Erros:**
- `400` InvalidConfirmTokenError: `{ "message": "Link de confirmação inválido ou expirado" }`

---

## POST /users/forgot-password

Inicia o fluxo de recuperação de senha.

**Middleware:** nenhum

**Body:**
```json
{
  "email": "joao@example.com"
}
```

**Lógica:**
1. Busca user por e-mail
2. Se não encontrado: retorna a mesma mensagem de sucesso (segurança)
3. Se encontrado:
   - `token = crypto.randomBytes(32).toString('hex')` (64 hex chars)
   - `expiresAt = now + 1h`
   - Salva no user
   - Envia e-mail com link: **`${FRONTEND_URL}/auth/update-password?token=${token}`**

> **ATENÇÃO:** O link de reset usa `/auth/update-password`, **não** `/auth/reset-password`.

**Response 200:**
```json
{
  "message": "Se o email existir, você receberá um link para redefinir sua senha."
}
```

---

## POST /users/reset-password

Redefine a senha usando o token de reset.

**Middleware:** nenhum

**Body:**
```json
{
  "token": "a3f8b2c1d4e5f6a7b8c9...",
  "password": "NovaSenha123!"
}
```

**Lógica:**
1. Busca user por `passwordResetToken`
2. Valida expiração
3. Atualiza `password` (hook Sequelize aplica bcrypt)
4. Limpa campos de token

**Response 200:**
```json
{
  "message": "Senha alterada com sucesso."
}
```

**Erros:**
- `400` InvalidResetTokenError: `{ "message": "Link de redefinição de senha inválido ou expirado" }`

---

## GET /users/profile

Retorna perfil completo do usuário autenticado.

**Middleware:** `authenticateMiddleware`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Lógica:**
1. Busca user por `req.user.userId`
2. Busca Student por userId (pode não existir)
3. Se student tem addressId: busca Address

**Response 200:**
```json
{
  "user": {
    "id": 1,
    "uuid": "550e8400-...",
    "email": "joao@example.com",
    "name": "João Silva",
    "photoUrl": null,
    "phone": null,
    "documentType": null,
    "document": null
  },
  "student": {
    "id": 1,
    "uuid": "660e8400-...",
    "targetLicenseType": null,
    "hasTheoreticalCompleted": false,
    "totalPracticalHours": 0,
    "isActive": true
  },
  "address": null
}
```

> Nota: `user` não retorna `status` nem `emailVerifiedAt`. `student` não retorna `userId` nem `addressId`.

---

## PUT /users/profile/student

Atualiza perfil do aluno (dados pessoais + endereço).

**Middleware:** `authenticateMiddleware`

**Body:**

| Campo | Tipo | Obrigatório | Notas |
|-------|------|-------------|-------|
| `name` | string | **Sim** | min 1 char |
| `photoUrl` | string (URL) | Não | URL válida |
| `phone` | string | Não | |
| `documentType` | enum | Não | `"CPF"` \| `"RG"` \| `"CNH"` |
| `document` | string | Não | |
| `targetLicenseType` | enum | Não | `"A"` \| `"B"` \| `"C"` \| `"D"` \| `"E"` \| `"ACC"` \| `"AB"` |
| `zipcode` | string | Não | |
| `street` | string | Não | |
| `number` | string | Não | |
| `complement` | string | Não | |
| `neighborhood` | string | Não | |
| `city` | string | **Sim** se endereço | |
| `state` | string (2) | **Sim** se endereço | |
| `country` | string | Não | default: `"BRAZIL"` |

**Regra de validação:** Se `zipcode`, `street`, `number` ou `neighborhood` for fornecido, `city` e `state` são obrigatórios.

**Lógica:**
1. Valida body
2. Atualiza User (name, photoUrl, phone, documentType, document)
3. Se dados de endereço com city+state:
   - Student tem addressId → atualiza Address existente
   - Senão → cria novo Address e vincula ao Student
4. Atualiza Student (targetLicenseType, addressId)
5. Se Student não existe ainda → cria

**Response 200:**
```json
{
  "user": {
    "id": 1,
    "uuid": "550e8400-...",
    "email": "joao@example.com",
    "name": "João Silva",
    "photoUrl": null,
    "phone": null,
    "documentType": null,
    "document": null
  },
  "address": {
    "id": 1,
    "uuid": "770e8400-...",
    "zipcode": "01310-100",
    "street": "Avenida Paulista",
    "number": "1578",
    "complement": "Apto 42",
    "neighborhood": "Bela Vista",
    "city": "São Paulo",
    "state": "SP",
    "country": "BRAZIL"
  },
  "student": {
    "id": 1,
    "uuid": "660e8400-...",
    "targetLicenseType": "B",
    "hasTheoreticalCompleted": false,
    "totalPracticalHours": 0,
    "isActive": true
  }
}
```

---

## GET /health

Verificação de saúde do servidor.

**Middleware:** nenhum

**Response 200:**
```json
{
  "message": "OK"
}
```

---

## GET /

Endpoint raiz do servidor.

**Middleware:** nenhum

**Response 200:**
```
Easydrive API
```
(texto plano, não JSON)
