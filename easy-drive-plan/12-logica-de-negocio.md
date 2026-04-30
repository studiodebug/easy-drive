# 12 — Lógica de Negócio

Todas as regras de negócio reais do sistema EasyDrive, extraídas diretamente do código.

---

## Sistema de Créditos

### Preço dos créditos

```typescript
const unitPrice = 50;  // unidades de moeda por crédito
const subtotal = credits * unitPrice;
```

### Bônus de créditos

```typescript
const bonusCredits = credits >= 20 ? Math.floor(credits * 0.1) : 0;
const totalCredits = credits + bonusCredits;
```

**Exemplos:**
| Compra | Bônus | Total | Preço |
|--------|-------|-------|-------|
| 10 | 0 | 10 | 500 |
| 20 | 2 | 22 | 1000 |
| 50 | 5 | 55 | 2500 |
| 100 | 10 | 110 | 5000 |

### Custo de uma aula (bookings/quote)

```typescript
// BookingUseCase.quote()
return { slotCount, creditsRequired: slotCount * 2 };
```

**Custo: 2 créditos por slot** (não 10 como pode parecer por `creditsRequired` default no confirm).

### creditsRequired no confirm

```typescript
// BookingValidator confirmSchema
creditsRequired: z.coerce.number().int().min(1).max(20).default(10)
```

O campo `creditsRequired` no confirm é passado pelo cliente (default 10, max 20). O quote retorna `slotCount * 2`, mas o confirm aceita qualquer valor entre 1 e 20.

---

## Webhook de Pagamento — Crédito Creditado

```typescript
// BillingUseCase.registerWebhook()
await this.walletRepository.increaseBalance(wallet.id, 10, transaction);
await this.walletRepository.applyTransaction({
  amount: 10,   // ← FIXO: 10 créditos, independente do valor da quote
  ...
});
```

**O webhook sempre credita 10 créditos**, independente do `totalCredits` da quote. Isso é um comportamento atual do código — a integração real precisaria buscar `quote.totalCredits`.

---

## Fluxo de Confirmação de Reserva

```typescript
// 1. Verifica se instrutor trabalha naquele horário (InstructorWeeklySchedule)
const scheduleSlot = await bookingRepository.findWeeklyScheduleSlot(
  instructor.id,
  startAt.getDay(),        // dia da semana (0–6)
  `${startTime}:00`        // HH:MM → HH:MM:00
);
if (!scheduleSlot) throw new SlotUnavailableError();

// 2. Verifica se já tem reserva naquele horário (SELECT FOR UPDATE)
const existing = await bookingRepository.findBookedSlotAt(
  instructor.id, startAt, endAt, transaction
);
if (existing) throw new SlotUnavailableError();

// 3. Verifica saldo
const debited = await walletRepository.decreaseBalance(wallet.id, creditsRequired, transaction);
if (!debited) throw new InsufficientCreditsError();

// 4. Cria slot como 'booked' (não busca slot aberto pré-existente!)
const slot = await bookingRepository.createAvailabilitySlot({
  instructorId, startAt, endAt, slotStatus: "booked", transaction
});
```

**Ponto importante:** O sistema usa `InstructorWeeklySchedule` para saber se o instrutor trabalha naquele dia/hora. Se o instrutor não tiver agenda semanal cadastrada, qualquer reserva será `SlotUnavailableError`.

---

## Formato de Datas nas Reservas

```typescript
// startTime/endTime chegam como "HH:MM" (validado com regex /^\d{2}:\d{2}$/)
const startAt = new Date(`${date}T${startTime}:00`);  // vira "HH:MM:00"
const endAt   = new Date(`${date}T${endTime}:00`);

// Para buscar no schedule:
findWeeklyScheduleSlot(instructorId, startAt.getDay(), `${startTime}:00`)
// → busca startTime = "08:00:00" no banco (TIME field)
```

---

## Cancelamento de Reserva

```typescript
// Ao cancelar, libera o slot:
markAvailabilitySlotOpen(slot.availabilitySlotId, transaction)
// InstructorAvailabilitySlot.slotStatus = 'open'

// Reembolso (se applyRefund = true):
increaseBalance(wallet.id, booking.requiredCredits, transaction)
applyTransaction({ type: "refund", amount: booking.requiredCredits, ... })
```

Status no response: `"CANCELLED"` (grafia britânica).

---

## Sistema de Avaliações

**Quem pode avaliar:** Qualquer aluno com booking (sem verificação de status `'completed'`).

**Limite:** Uma review por booking (verificado por `existsByBookingId`).

**Rating do instrutor:** **NÃO é atualizado** pelo código atual de `ReviewUseCase`. O campo `instructor.rating` permanece com o valor inicial e só pode ser atualizado manualmente.

---

## Tokens de Segurança

### Email Confirmation Token
```typescript
const CONFIRM_TOKEN_EXPIRY_HOURS = 24;
const token = crypto.randomBytes(32).toString("hex");   // 64 hex chars
const expiresAt = new Date();
expiresAt.setHours(expiresAt.getHours() + 24);

// Link: ${FRONTEND_URL}/auth/confirm?token=${token}
```

### Password Reset Token
```typescript
const RESET_TOKEN_EXPIRY_HOURS = 1;
const token = crypto.randomBytes(32).toString("hex");   // 64 hex chars
const expiresAt = new Date();
expiresAt.setHours(expiresAt.getHours() + 1);

// Link: ${FRONTEND_URL}/auth/update-password?token=${token}
// ↑ usa /auth/update-password, NÃO /auth/reset-password
```

---

## Status e Transições

### Booking
```
pending → confirmed   (ao criar via /bookings/confirm)
confirmed → canceled  (via /bookings/:id/cancel)
confirmed → completed (manual/admin, sem endpoint público)
```

### CheckoutSession
```
pending → succeeded  (via webhook com status="succeeded")
pending → failed     (via webhook com status="failed")
pending → canceled   (via webhook com status="canceled")
```

### InstructorAvailabilitySlot
```
[novo]  → booked    (criado diretamente como 'booked' ao confirmar reserva)
booked  → open      (ao cancelar reserva com markAvailabilitySlotOpen)
```

Não há endpoint público para criar slots 'open' manualmente — apenas o fluxo de booking cria slots.

### InstructorWaitlistEntry
```
pending  (sempre criado como pending, sem transições via API pública)
```

---

## Autenticação por Status de Usuário

```typescript
// AuthenticateUserUseCase (login):
if (user.status === "BLOCKED")  throw new UserBlockedError();
if (user.status === "INACTIVE") throw new UserInactiveError();

// RefreshTokenUseCase (refresh):
if (user.status === "BLOCKED")  throw new UserBlockedError();
if (user.status === "INACTIVE") throw new UserInactiveError();
```

`ACTIVE` = login permitido. `BLOCKED` e `INACTIVE` bloqueiam login e refresh. Todos retornam HTTP 400.

---

## Tipos de Licença de Trânsito (ENUM)

```
A   = Motocicleta
B   = Automóvel
C   = Veículo de carga
D   = Transporte de passageiros
E   = Veículo articulado
ACC = Ciclomotor
AB  = Moto + Automóvel
```

---

## Tipos de Documento (ENUM)

```
CPF = Cadastro de Pessoa Física
RG  = Registro Geral
CNH = Carteira Nacional de Habilitação
```

---

## Regras de Carteira

1. `availableCredits` é `INTEGER UNSIGNED` — banco bloqueia negativo
2. `decreaseBalance` usa `WHERE availableCredits >= credits` antes de subtrair:
   ```sql
   UPDATE student_wallets
   SET available_credits = available_credits - {credits}
   WHERE id = {id} AND available_credits >= {credits}
   ```
3. Retorna `affected > 0` — `BookingUseCase` lança `InsufficientCreditsError` se `false`
4. `getOrCreateForStudent` cria carteira zerada se não existir (no signup e nas queries de wallet)

---

## Fusos Horários

- MySQL configurado com `timezone: '-03:00'` (Horário de Brasília)
- Slots armazenam `timezone = 'America/Sao_Paulo'` por padrão (default no model)
- API retorna datas em ISO 8601 via `.toISOString()` (UTC)

---

## Limites e Validações de Entrada

| Endpoint | Campo | Limite |
|----------|-------|--------|
| `/billing/credits/quote` | credits | 1–500 |
| `/billing/credits/checkout` | credits | 1–500 |
| `/bookings/quote` | slotCount | 1–12 |
| `/bookings/confirm` | creditsRequired | 1–20 (default: 10) |
| `/bookings/:id/cancel` | reason | max 500 chars |
| `/bookings/:id/review` | rating | 1–5 (inteiro) |
| `/bookings/:id/review` | comment | max 1000 chars |
| `/instructors/waitlist` | name | min 2, max 255 |
| `/instructors/waitlist` | notes | max 2000 chars |
| `/wallet/transactions` | limit | 1–100 |
| `/wallet/transactions` | offset | ≥0 |
| `UpdateStudentProfile` | name | obrigatório, min 1 |
| `UpdateStudentProfile` | state | exatamente 2 chars |
| Upload de imagem | fileSize | máx 10MB |
| Upload de imagem | mimeType | jpeg, jpg, png, gif, webp |
