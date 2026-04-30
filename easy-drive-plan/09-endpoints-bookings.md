# 09 — Endpoints: Módulo Bookings (Agendamentos)

---

## GET /instructors/:instructorId/schedule

Retorna a agenda semanal recorrente do instrutor.

**Middleware:** `rateLimitMiddleware`  
**Autenticação:** NÃO requerida

**Path param:** `instructorId` — UUID ou ID numérico do instrutor

**Validação:** `instructorId` deve ser string não-vazia.

**Lógica:**
- Busca `InstructorWeeklySchedule` WHERE `instructor.isActive = true` AND `schedule.isActive = true`
- Aceita UUID ou ID numérico como `instructorId`
- Ordena por `dayOfWeek ASC`, `startTime ASC`
- Fatia `startTime`/`endTime` para formato `HH:MM` (5 chars)

**Response 200:**
```json
{
  "items": [
    {
      "dayOfWeek": 1,
      "startTime": "08:00",
      "endTime": "17:00"
    },
    {
      "dayOfWeek": 3,
      "startTime": "09:00",
      "endTime": "18:00"
    }
  ]
}
```

> **ATENÇÃO:** `startTime` e `endTime` são retornados no formato `HH:MM` (5 chars), sem segundos. Campos `id`, `uuid`, `isActive` **não são incluídos** na resposta.

---

## GET /instructors/:instructorId/availability

Retorna os slots de disponibilidade do instrutor.

**Middleware:** `rateLimitMiddleware`  
**Autenticação:** NÃO requerida

**Path param:** `instructorId` — UUID ou ID numérico

**Query params (ambos opcionais):**
| Param | Tipo | Descrição |
|-------|------|-----------|
| `weekStart` | string | Data ISO (YYYY-MM-DD) |
| `weekEnd` | string | Data ISO (YYYY-MM-DD) |

**Lógica com `weekStart` e `weekEnd`:**
- Busca `InstructorAvailabilitySlot` WHERE:
  - `instructor.isActive = true`
  - `slot.isActive = true`
  - `slotStatus IN ('booked', 'blocked')` — **apenas slots ocupados/bloqueados**
  - `startAt >= weekStart AND startAt < weekEnd`
- Ordena por `startAt ASC`

**Lógica SEM `weekStart`/`weekEnd`:**
- Busca todos os slots do instrutor WHERE `isActive = true` AND `startAt >= now`
- Limit: 300 resultados

**Response 200:**
```json
{
  "items": [
    {
      "slotId": 1,
      "startAt": "2026-03-10T08:00:00.000Z",
      "endAt": "2026-03-10T09:00:00.000Z",
      "status": "booked"
    },
    {
      "slotId": 2,
      "startAt": "2026-03-10T10:00:00.000Z",
      "endAt": "2026-03-10T11:00:00.000Z",
      "status": "blocked"
    }
  ]
}
```

> **ATENÇÃO:** Com `weekStart`/`weekEnd`, retorna **apenas slots booked e blocked** (não os open). O campo é `slotId` (não `id` ou `uuid`). Campo `isActive`, `timezone`, `uuid` **não são retornados**.

---

## POST /bookings/quote

Calcula quantos créditos serão necessários para um número de slots.

**Middleware:** `rateLimitMiddleware`, `authenticateMiddleware`

**Body:**
```json
{
  "slotCount": 2
}
```

**Validação (Zod):**
- `slotCount`: number coercível, inteiro, min 1, max 12

**Lógica:**
```typescript
return { slotCount, creditsRequired: slotCount * 2 };
```

> **ATENÇÃO:** O custo é **2 créditos por slot**, não 10. Não há `quoteValidUntil` na resposta.

**Response 200:**
```json
{
  "slotCount": 2,
  "creditsRequired": 4
}
```

---

## POST /bookings/confirm

Confirma uma reserva de aula (debita créditos da carteira).

**Middleware:** `rateLimitMiddleware` (30 req/min), `authenticateMiddleware`

**Body:**
```json
{
  "instructorId": "abc-def-123-456",
  "date": "2026-03-10",
  "startTime": "08:00",
  "endTime": "09:00",
  "creditsRequired": 10
}
```

**Validação (Zod):**
```typescript
const confirmSchema = z.object({
  instructorId: z.string().min(1),
  date: z.string().min(1),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),   // formato HH:MM
  endTime: z.string().regex(/^\d{2}:\d{2}$/),     // formato HH:MM
  creditsRequired: z.coerce.number().int().min(1).max(20).default(10),
});
```

> **ATENÇÃO:** `startTime` e `endTime` devem estar no formato `HH:MM`, **não** `HH:MM:SS`.

**Lógica (dentro de `sequelize.transaction` com `LOCK.UPDATE`):**

```typescript
1. getStudentIdFromUserId(userId) → UnauthorizedError se sem perfil

2. findInstructorByRef(instructorId)
   → SlotUnavailableError se não encontrado

3. startAt = new Date(`${date}T${startTime}:00`)  // ← adiciona ":00" para segundos
   endAt   = new Date(`${date}T${endTime}:00`)

4. findWeeklyScheduleSlot(instructor.id, startAt.getDay(), `${startTime}:00`)
   → Verifica se instructor trabalha naquele dayOfWeek e horário
   → SlotUnavailableError se não encontrou schedule

5. findBookedSlotAt(instructor.id, startAt, endAt, transaction)  [SELECT FOR UPDATE]
   → Se já existe slot booked naquele horário: SlotUnavailableError

6. getOrCreateForStudent(studentId)
7. decreaseBalance(wallet.id, creditsRequired, transaction)
   → Se retornar false (sem saldo): InsufficientCreditsError

8. createAvailabilitySlot({ instructorId, startAt, endAt, slotStatus: "booked" })
   ← CRIA um novo slot (não usa slot pré-existente!)

9. createBooking({ studentId, instructorId, requiredCredits, status: "confirmed", confirmedAt: now })

10. createBookingSlot({ bookingId, availabilitySlotId: slot.id, startAt, endAt, credits, status: "confirmed" })

11. applyTransaction({ type: "debit", amount: creditsRequired, description: "Booking confirmation debit" })

12. Log de auditoria
```

> **ATENÇÃO CRÍTICA:** O sistema **CRIA** um novo `InstructorAvailabilitySlot` com `slotStatus: 'booked'` no momento do booking. Ele não verifica se existe um slot com `slotStatus: 'open'` previamente criado. O controle de disponibilidade é feito via `InstructorWeeklySchedule` (instrutor trabalha naquele horário?) + `InstructorAvailabilitySlot` (já tem slot booked naquele horário?).

**Response 201:**
```json
{
  "bookingId": "ee0e8400-e29b-41d4-a716-446655440000",
  "status": "CONFIRMED"
}
```

**Erros específicos (HTTP próprio, não via `sendErrorJson`):**
```typescript
// SlotUnavailableError
HTTP 409: { "code": "SLOT_UNAVAILABLE", "message": "Selected slot is unavailable" }

// InsufficientCreditsError
HTTP 422: { "code": "INSUFFICIENT_CREDITS", "message": "Insufficient credits for booking" }
```

---

## POST /bookings/:bookingId/cancel

Cancela uma reserva, com opção de reembolso.

**Middleware:** `rateLimitMiddleware`, `authenticateMiddleware`

**Path param:** `bookingId` — UUID do booking

**Body:**
```json
{
  "applyRefund": true,
  "reason": "Não poderei comparecer"
}
```

**Validação (Zod):**
```typescript
const cancelSchema = z.object({
  applyRefund: z.boolean().optional(),
  reason: z.string().max(500).optional()
});
```

**Lógica (dentro de `sequelize.transaction`):**
```typescript
1. getStudentIdFromUserId(userId)
2. findBookingByUuidAndStudent(bookingUuid, studentId)
   → ForbiddenAccessError ("Booking not found") se não encontrado → retorna 404

3. updateBookingCancel({ bookingId, reason, when: now })
   → Booking: status='canceled', canceledAt=now, cancelReason=reason

4. updateBookingSlotCancel(booking.id)
   → BookingSlot: status='canceled'

5. findBookingSlotByBookingId(booking.id)
   → Se tem availabilitySlotId:
     markAvailabilitySlotOpen(slot.availabilitySlotId)
     → InstructorAvailabilitySlot: slotStatus='open'

6. Se applyRefund = true:
   a. getOrCreateForStudent(studentId)
   b. increaseBalance(wallet.id, booking.requiredCredits)
   c. applyTransaction({ type: "refund", amount: booking.requiredCredits,
      description: "Booking cancellation refund" })
```

**Response 200:**
```json
{
  "bookingId": "ee0e8400-e29b-41d4-a716-446655440000",
  "status": "CANCELLED",
  "refundApplied": true
}
```

> **ATENÇÃO:** Status retornado é `"CANCELLED"` (grafia inglesa britânica), não `"canceled"`.

---

## Fluxo Completo de Agendamento

```
1. Frontend busca agenda do instrutor:
   GET /instructors/:id/schedule
   ← [{ dayOfWeek: 1, startTime: "08:00", endTime: "17:00" }]

2. Frontend busca slots já ocupados na semana:
   GET /instructors/:id/availability?weekStart=2026-03-09&weekEnd=2026-03-16
   ← [{ slotId, startAt, endAt, status: "booked"|"blocked" }]
   (slots não presentes nessa lista = disponíveis)

3. Aluno consulta custo:
   POST /bookings/quote { slotCount: 1 }
   ← { slotCount: 1, creditsRequired: 2 }

4. Aluno confirma reserva:
   POST /bookings/confirm { instructorId, date, startTime: "08:00", endTime: "09:00", creditsRequired: 2 }
   ← { bookingId: "uuid", status: "CONFIRMED" }
   Sistema: cria slot booked, debita 2 créditos

5. Após a aula, aluno avalia:
   POST /bookings/:id/review { rating: 5, comment: "..." }
   ← { reviewId, bookingId, rating, comment }
```

---

## Classes de Erro

```typescript
class SlotUnavailableError extends ApplicationError {
  // Mensagem default: "SLOT_UNAVAILABLE"
  // HTTP 409 (tratado diretamente no controller)
}

class InsufficientCreditsError extends ApplicationError {
  // Mensagem: "INSUFFICIENT_CREDITS"
  // HTTP 422 (tratado diretamente no controller)
}
```
