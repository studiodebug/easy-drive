# 07 — Endpoints: Módulo Wallet (Carteira)

Base path: `/wallet`

---

## GET /wallet/summary

Retorna o resumo da carteira do aluno autenticado.

**Middleware:** `rateLimitMiddleware`, `authenticateMiddleware`

**Lógica:**
1. Busca `Student` pelo `userId` do token
2. `walletRepository.getOrCreateForStudent(studentId)` (cria carteira se não existir)
3. Busca todas as `WalletTransaction` da carteira
4. Acumula:
   - `totalCreditsBought`: soma de `amount` onde `type = 'credit'` e `status = 'completed'`
   - `totalCreditsUsed`: soma de `amount` onde `type = 'debit'` e `status = 'completed'`

**Response 200:**
```json
{
  "balance": 50,
  "totalCreditsBought": 110,
  "totalCreditsUsed": 60,
  "currency": "credits"
}
```

> **ATENÇÃO:** `currency` retorna a string `"credits"`, **não** `"BRL"`.

---

## GET /wallet/transactions

Lista o histórico de transações da carteira com paginação.

**Middleware:** `rateLimitMiddleware`, `authenticateMiddleware`

**Query params (validados com Zod):**
| Param | Tipo | Limites | Descrição |
|-------|------|---------|-----------|
| `limit` | number | 1–100, opcional | Máximo de itens (sem default no Zod, default no repo: 50) |
| `offset` | number | ≥0, opcional | Deslocamento |

**Lógica:**
1. Busca Student → `getOrCreateForStudent(studentId)`
2. Lista WalletTransaction com ORDER BY `createdAt DESC`
3. Mapeamento de tipo:
   - `'credit'` → `"CREDIT_PURCHASE"`
   - `'refund'` → `"BOOKING_REFUND"`
   - `'debit'` → `"BOOKING_DEBIT"`
4. **Valor do `amount`:**
   - Para `debit`: **negativo** (`-tx.amount`)
   - Para `credit` e `refund`: positivo (`tx.amount`)

**Response 200:**
```json
{
  "items": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440000",
      "type": "CREDIT_PURCHASE",
      "amount": 110,
      "createdAt": "2026-03-02T14:30:00.000Z",
      "status": "completed",
      "description": "Credits purchase confirmed by webhook"
    },
    {
      "id": "770e8400-e29b-41d4-a716-446655440001",
      "type": "BOOKING_DEBIT",
      "amount": -10,
      "createdAt": "2026-03-03T09:00:00.000Z",
      "status": "completed",
      "description": "Booking confirmation debit"
    },
    {
      "id": "880e8400-e29b-41d4-a716-446655440002",
      "type": "BOOKING_REFUND",
      "amount": 10,
      "createdAt": "2026-03-04T11:00:00.000Z",
      "status": "completed",
      "description": "Booking cancellation refund"
    }
  ]
}
```

> **ATENÇÃO:** `debit` retorna `amount` **negativo**. `credit` e `refund` retornam positivo.

---

## Descrições padrão das transações

| Operação | `description` |
|----------|---------------|
| Compra de créditos (webhook) | `"Credits purchase confirmed by webhook"` |
| Débito de reserva | `"Booking confirmation debit"` |
| Reembolso de cancelamento | `"Booking cancellation refund"` |

---

## Modelo de Transações

| Tipo de evento | `type` no DB | `type` na API |
|---------------|--------------|---------------|
| Créditos creditados via webhook | `'credit'` | `CREDIT_PURCHASE` |
| Reserva confirmada | `'debit'` | `BOOKING_DEBIT` |
| Reserva cancelada com reembolso | `'refund'` | `BOOKING_REFUND` |

---

## Regras de Saldo

- `availableCredits` é `INTEGER UNSIGNED` no banco (nunca negativo)
- Débito usa `UPDATE ... WHERE availableCredits >= credits` (retorna false se insuficiente)
- `walletRepository.decreaseBalance` retorna `boolean`: `true` se debitou, `false` se não tinha saldo suficiente
- `BookingUseCase.confirm` lança `InsufficientCreditsError` (422) se `decreaseBalance` retornar `false`
- `getOrCreateForStudent` cria carteira com saldo 0 se não existir
