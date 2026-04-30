# 11 — Endpoints: Reviews e Waitlist

---

## Módulo Reviews (Avaliações)

### POST /bookings/:bookingId/review

Cria uma avaliação para uma aula.

**Middleware:** `rateLimitMiddleware`, `authenticateMiddleware`

**Path param:** `bookingId` — UUID do booking

**Body:**
```json
{
  "rating": 5,
  "comment": "Excelente instrutor! Muito paciente e didático."
}
```

**Validação (Zod):**
```typescript
const schema = z.object({
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().max(1000).optional().nullable()
});
```

**Lógica:**
```typescript
1. getStudentIdFromUserId(userId)
2. findBookingByUuidAndStudent(bookingUuid, studentId)
   → ForbiddenAccessError ("Booking not found") se não encontrado → retorna 404

3. existsByBookingId(booking.id)
   → ForbiddenAccessError ("Booking already reviewed") se já existe → retorna 404

4. reviewRepository.create({
     bookingId: booking.id,
     studentId: booking.studentId,
     instructorId: booking.instructorId,
     rating,
     comment: comment ?? null
   })

5. Log de auditoria: "review.created"
```

> **ATENÇÃO:** O código atual **NÃO recalcula o rating do instrutor** após criar a avaliação. O campo `instructor.rating` e `instructor.totalReviews` **não são atualizados**. Isso precisaria ser implementado separadamente.

> **ATENÇÃO:** Não verifica se booking está com status `'completed'`. Qualquer booking do aluno pode ser avaliado (desde que não tenha review).

**Response 201:**
```json
{
  "reviewId": "rev-uuid-abc-123",
  "bookingId": "booking-uuid-xyz",
  "rating": 5,
  "comment": "Excelente instrutor! Muito paciente e didático."
}
```

> Campos retornados: `reviewId` (uuid da review), `bookingId` (uuid do booking), `rating`, `comment`.  
> **Não** retorna `id`, `createdAt`, `studentId`, `instructorId`.

**Erros** (todos via `sendErrorJson(res, error, 404)`):
- Booking não encontrado → 404
- Booking já avaliado → 404

---

## Módulo Waitlist (Lista de Espera de Instrutores)

### POST /instructors/waitlist

Registra um candidato a instrutor na lista de espera.

**Middleware:** `rateLimitMiddleware`  
**Autenticação:** NÃO requerida (público)

**Body:**
```json
{
  "name": "Ricardo Pereira",
  "email": "ricardo@example.com",
  "phone": "+5511987654321",
  "city": "São Paulo",
  "state": "SP",
  "notes": "Tenho 10 anos de experiência em direção defensiva."
}
```

**Validação (Zod):**
```typescript
const schema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email(),
  phone: z.string().max(30).optional().nullable(),
  city: z.string().min(2).max(120),
  state: z.string().length(2),
  notes: z.string().max(2000).optional().nullable()
});
```

**Lógica:**
```typescript
1. Validar body
2. waitlistRepository.create(input)   // cria InstructorWaitlistEntry
3. auditLogRepository.log("waitlist.created", { waitlistUuid, email })
4. Retorna dados
```

**Response 201:**
```json
{
  "waitlistId": "wl-uuid-abc-123",
  "status": "PENDING",
  "name": "Ricardo Pereira",
  "email": "ricardo@example.com"
}
```

> Campos retornados: `waitlistId` (uuid da entry), `status` (sempre `"PENDING"`), `name`, `email`.  
> **Não** retorna `id`, `createdAt`, `phone`, `city`, `state`, `notes`.

---

## Resumo

| Módulo | Método | Path | Auth | Resposta chave |
|--------|--------|------|------|----------------|
| Reviews | POST | `/bookings/:bookingId/review` | Sim | `{ reviewId, bookingId, rating, comment }` |
| Waitlist | POST | `/instructors/waitlist` | Não | `{ waitlistId, status, name, email }` |

---

## Notas sobre erros

O `ReviewController.create` usa `sendErrorJson(res, error, 404)` — o segundo argumento override coloca status HTTP 404 para todos os erros de aplicação (ForbiddenAccessError, UnauthorizedError). Mesmo "Booking already reviewed" retorna 404.

O `WaitlistController.create` usa `sendErrorJson(res, error)` — default 400.
