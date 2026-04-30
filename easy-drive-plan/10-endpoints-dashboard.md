# 10 — Endpoints: Módulo Dashboard

Base path: `/dashboard`

**Middleware geral:** `rateLimitMiddleware`, `authenticateMiddleware` (todos os endpoints)

---

## GET /dashboard/instructors

Lista instrutores ativos ordenados por rating.

**Lógica:**
- `Instructor.findAll()` com include `User` (atributos: `uuid`, `name`)
- WHERE `isActive = true` (implícito no `listInstructors`)
- ORDER BY `rating DESC`
- LIMIT 50

**Response 200:**
```json
{
  "items": [
    {
      "id": "inst-uuid-abc-123",
      "name": "Carlos Andrade",
      "rating": 4.85,
      "carModel": "Direção defensiva e automáticos"
    },
    {
      "id": "inst-uuid-def-456",
      "name": "Maria Santos",
      "rating": 4.70,
      "carModel": "N/A"
    }
  ]
}
```

> **ATENÇÃO:** Retorna apenas 4 campos por instrutor: `id` (uuid), `name`, `rating`, `carModel`.  
> `carModel` é mapeado de `instructor.specialty`. Se `specialty` for null → `"N/A"`.  
> **Não retorna** `photoUrl`, `age`, `totalReviews`, `yearsOfExperience`, etc.

---

## GET /dashboard/scheduled-classes

Retorna as aulas confirmadas do aluno autenticado.

**Lógica:**
- Busca Student pelo userId
- `Booking.findAll()` WHERE `studentId`, `status = 'confirmed'`
- Include: Instructor → User (`name`), BookingSlot
- ORDER BY `createdAt DESC`
- LIMIT 50

**Response 200:**
```json
{
  "items": [
    {
      "id": "booking-uuid-abc",
      "startsAt": "2026-03-10T08:00:00.000Z",
      "instructorName": "Carlos Andrade"
    }
  ]
}
```

> **ATENÇÃO:** Retorna apenas 3 campos: `id` (uuid do booking), `startsAt`, `instructorName`.  
> `startsAt` vem de `booking.slots[0].startAt` se existir, senão usa `booking.createdAt`.  
> `instructorName` fallback: `"Instructor"` se não carregado.  
> **Não retorna** `status`, `creditsUsed`, `endAt`, `instructorPhotoUrl`, `instructorId`.

---

## GET /dashboard/my-schedule

Retorna aulas agrupadas por data (agenda pessoal).

**Lógica:**
1. Chama `listScheduledClassesByStudentId(studentId)` (mesma query de scheduled-classes)
2. Agrupa por data (slice do `startsAt` para `YYYY-MM-DD`)
3. Conta quantas aulas por dia

**Response 200:**
```json
{
  "items": [
    {
      "date": "2026-03-10",
      "classes": 1
    },
    {
      "date": "2026-03-12",
      "classes": 2
    }
  ]
}
```

> **ATENÇÃO:** Não é uma lista de aulas individuais. É um agrupamento de `{ date, classes: count }` por dia.

---

## GET /dashboard/week-classes

Retorna contagem de aulas por dia da semana (visualização semanal).

**Lógica:**
1. Chama `listMyScheduleByStudentId(studentId)` (retorno do my-schedule)
2. Para cada item da agenda, identifica o `getDay()` da data
3. Converte: `dayIndex === 0 ? 6 : dayIndex - 1` (transforma de Dom=0 para Seg=0)
4. Soma os totais por dia da semana

**Response 200:**
```json
{
  "week": "current",
  "classes": [
    { "day": "Monday",    "total": 1 },
    { "day": "Tuesday",   "total": 0 },
    { "day": "Wednesday", "total": 2 },
    { "day": "Thursday",  "total": 0 },
    { "day": "Friday",    "total": 1 },
    { "day": "Saturday",  "total": 0 },
    { "day": "Sunday",    "total": 0 }
  ]
}
```

> **ATENÇÃO:** `week` é sempre a string `"current"`, não datas ISO.  
> `classes` é um array de 7 elementos com nomes em inglês.  
> **Não** usa `weekStart`/`weekEnd` como query params.  
> **Não** retorna a estrutura `{ weekStart, weekEnd, items }` documentada antes.

---

## GET /dashboard/history

Retorna o histórico de bookings do aluno (todos os status).

**Lógica:**
- `Booking.findAll()` WHERE `studentId` (sem filtro de status)
- Atributos: `uuid`, `status`, `createdAt`
- ORDER BY `createdAt DESC`
- LIMIT 100

**Response 200:**
```json
{
  "items": [
    {
      "id": "booking-uuid-xyz",
      "type": "BOOKING_COMPLETED",
      "createdAt": "2026-02-28T10:00:00.000Z"
    },
    {
      "id": "booking-uuid-def",
      "type": "BOOKING_CANCELED",
      "createdAt": "2026-02-21T10:00:00.000Z"
    },
    {
      "id": "booking-uuid-ghi",
      "type": "BOOKING_CONFIRMED",
      "createdAt": "2026-03-10T08:00:00.000Z"
    }
  ]
}
```

**Mapeamento de tipo:**
| `booking.status` | `type` retornado |
|-----------------|-----------------|
| `'completed'` | `"BOOKING_COMPLETED"` |
| `'canceled'` | `"BOOKING_CANCELED"` |
| qualquer outro | `"BOOKING_CONFIRMED"` |

> **ATENÇÃO:** Não inclui `instructorName`, `completedAt`, `creditsUsed`, nem `review`. Apenas `id`, `type`, `createdAt`.

---

## Resumo dos Campos Retornados por Endpoint

| Endpoint | Campos |
|----------|--------|
| `/dashboard/instructors` | `id`, `name`, `rating`, `carModel` |
| `/dashboard/scheduled-classes` | `id`, `startsAt`, `instructorName` |
| `/dashboard/my-schedule` | `date`, `classes` (count) |
| `/dashboard/week-classes` | `week`, `classes[].day`, `classes[].total` |
| `/dashboard/history` | `id`, `type`, `createdAt` |
