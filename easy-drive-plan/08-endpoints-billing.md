# 08 — Endpoints: Módulo Billing (Pagamentos)

Base path: `/billing`

---

## POST /billing/credits/quote

Gera uma cotação para compra de créditos (sem criar pagamento).

**Middleware:** `rateLimitMiddleware` (30 req/min), `authenticateMiddleware`

**Body:**
```json
{
  "credits": 20
}
```

**Validação (Zod):**
- `credits`: number coercível, inteiro, min 1, max 500

**Lógica de preço:**
```typescript
const unitPrice = 50;
const subtotal = credits * unitPrice;
const bonusCredits = credits >= 20 ? Math.floor(credits * 0.1) : 0;
const totalCredits = credits + bonusCredits;
const expiresAt = new Date(Date.now() + 15 * 60 * 1000);  // +15min
```

**Lógica:**
1. `getStudentIdFromUserId(userId)` — lança `UnauthorizedError` se sem perfil de aluno
2. Calcula valores
3. Cria `CreditQuote` no banco com `status: 'active'`

**Response 200:**
```json
{
  "quoteId": "990e8400-e29b-41d4-a716-446655440000",
  "credits": 20,
  "bonusCredits": 2,
  "unitPrice": 50,
  "subtotal": 1000,
  "fees": 0,
  "total": 1000,
  "expiresAt": "2026-03-02T14:45:00.000Z"
}
```

---

## POST /billing/credits/checkout

Cria uma sessão de checkout para pagamento.

**Middleware:** `rateLimitMiddleware` (30 req/min), `authenticateMiddleware`

**Body:**
```json
{
  "credits": 20,
  "provider": "mock"
}
```

**Validação (Zod):**
```typescript
const checkoutSchema = z.object({
  credits: z.coerce.number().int().min(1).max(500),
  provider: z.enum(["stripe", "mercadopago", "mock"]).optional()  // default: "mock"
});
```

**Lógica:**
1. `getStudentIdFromUserId(userId)`
2. Calcula créditos e bônus (mesma fórmula do quote)
3. Cria `CreditQuote`
4. Gera `providerSessionId = "${provider}_sess_${Date.now()}"`
5. Gera `checkoutUrl = "https://payments.example/${provider}/checkout/${Date.now()}"` *(hardcoded, não é URL real do provider)*
6. Cria `CheckoutSession` com `status: 'pending'`
7. Log de auditoria

**Response 201:**
```json
{
  "sessionId": "aa0e8400-e29b-41d4-a716-446655440000",
  "status": "PENDING",
  "credits": 20,
  "checkoutUrl": "https://payments.example/mock/checkout/1740924000000"
}
```

> **ATENÇÃO:** `checkoutUrl` é gerada como `https://payments.example/${provider}/checkout/${Date.now()}` — é um placeholder, não URL de provider real. Integração real precisa ser implementada por provider.

> **ATENÇÃO:** `credits` retorna o valor base (sem bônus).

---

## GET /billing/credits/checkout/:sessionId/status

Verifica o status de uma sessão de checkout.

**Middleware:** `rateLimitMiddleware`, `authenticateMiddleware`

**Path param:** `sessionId` — UUID da CheckoutSession

**Lógica:**
1. `getStudentIdFromUserId(userId)`
2. `findCheckoutByUuidAndStudent(sessionId, studentId)` — verifica posse
3. Se não encontrado → `ForbiddenAccessError` → retorna **404**

**Response 200:**
```json
{
  "sessionId": "aa0e8400-...",
  "status": "SUCCEEDED"
}
```

**Status possíveis (uppercase):**
| Status retornado | Origem no DB |
|-----------------|--------------|
| `"PENDING"` | `'pending'` |
| `"SUCCEEDED"` | `'succeeded'` |
| `"FAILED"` | `'failed'` |
| `"CANCELED"` | `'canceled'` |

---

## POST /billing/webhooks/:provider

Recebe e processa webhooks de pagamento.

**Middleware:** `rateLimitMiddleware`, `webhookSignatureMiddleware`

**Path param:** `provider` — `stripe` | `mercadopago` | `mock`

**Headers:**
```
X-Webhook-Signature: <hmac-sha256-hex>
Content-Type: application/json
```

### Esquema do payload (genérico — mesmo para todos os providers)

```typescript
const webhookSchema = z.object({
  id: z.string().min(1),               // providerEventId — OBRIGATÓRIO
  eventType: z.string().optional(),    // tipo do evento
  status: z.enum(["pending", "succeeded", "failed", "canceled"]).optional(),
  sessionId: z.string().optional()     // UUID da CheckoutSession para localizar o registro
});
```

**ATENÇÃO:** O sistema usa um schema genérico, não schemas específicos de Stripe/MercadoPago. O frontend/integração deve adaptar o payload para esse formato.

### Lógica de processamento (dentro de transação Sequelize):

```typescript
1. Validar payload com webhookSchema
2. providerEventId = String(payload.id)
   → Se vazio: ForbiddenAccessError
3. Verificar idempotência:
   findWebhookEventByProviderEvent(provider, providerEventId)
   → Se já existe: retorna { accepted: true, idempotent: true }

4. eventType = String(payload.eventType || "checkout.session.updated")
5. status = String(payload.status || "pending") as CheckoutStatus
6. sessionId = payload.sessionId (string ou null)

7. Se sessionId: findCheckoutByProviderSessionId(provider, sessionId)

8. (Dentro de sequelize.transaction)
   a. Criar PaymentWebhookEvent:
      - status = status === "succeeded" ? "processed" : "pending"
      - processedAt = status === "succeeded" ? now : null

   b. Se checkout encontrado AND status === "succeeded" AND checkout.status !== "succeeded":
      i.  updateCheckoutStatus(checkout.id, "succeeded", now)
      ii. getOrCreateForStudent(checkout.studentId)
      iii. increaseBalance(wallet.id, 10)     ← FIXO: 10 créditos, não o valor da quote!
      iv. Criar WalletTransaction: type='credit', amount=10
          description: "Credits purchase confirmed by webhook"
```

> **ATENÇÃO CRÍTICA:** O webhook credita **sempre 10 créditos** independente do valor da quote. Isso é um comportamento fixo no código atual. Integração real precisa corrigir isso para usar `quote.totalCredits`.

**Response 202:**
```json
{
  "accepted": true,
  "provider": "mock",
  "providerEventId": "evt_mock_12345",
  "idempotent": false
}
```

---

## Formato do Webhook Mock (para testar)

```json
{
  "id": "evt_mock_12345",
  "eventType": "payment.succeeded",
  "status": "succeeded",
  "sessionId": "aa0e8400-e29b-41d4-a716-446655440000"
}
```

**Gerar assinatura HMAC-SHA256:**
```bash
BODY='{"id":"evt_mock_1","eventType":"payment.succeeded","status":"succeeded","sessionId":"SESSION_UUID"}'
SECRET="mock-webhook-secret"
SIG=$(echo -n "$BODY" | openssl dgst -sha256 -hmac "$SECRET" | awk '{print $2}')

curl -X POST http://localhost:3333/billing/webhooks/mock \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Signature: $SIG" \
  -d "$BODY"
```

**Nota:** O middleware verifica a assinatura de `JSON.stringify(req.body)`. Se o secret não estiver configurado (env var ausente), retorna **401** "Webhook signature is not configured".

---

## Fluxo Completo de Compra

```
Aluno → POST /billing/credits/checkout { credits: 20, provider: "mock" }
      ← { sessionId: "uuid", status: "PENDING", checkoutUrl: "https://payments.example/..." }

[Integração real: redirecionar aluno para checkoutUrl]
[Mock: fazer POST /billing/webhooks/mock manualmente]

Provider → POST /billing/webhooks/mock { id: "evt_1", status: "succeeded", sessionId: "uuid" }
         ← 202 { accepted: true }

Sistema:
  - CheckoutSession.status = 'succeeded'
  - wallet.availableCredits += 10  (fixo no momento)
  - WalletTransaction type='credit', amount=10 criada

Aluno → GET /billing/credits/checkout/:sessionId/status
      ← { status: "SUCCEEDED" }

Aluno → GET /wallet/summary
      ← { balance: 10, ... }
```

---

## Tabela de Bônus de Créditos

| Compra | Bônus (10%) | Total recebido | Preço (unitPrice=50) |
|--------|-------------|----------------|----------------------|
| 10 | 0 | 10 | 500 |
| 20 | 2 | 22 | 1000 |
| 50 | 5 | 55 | 2500 |
| 100 | 10 | 110 | 5000 |
| 500 | 50 | 550 | 25000 |
