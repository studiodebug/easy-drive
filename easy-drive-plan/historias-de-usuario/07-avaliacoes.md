# Histórias de Usuário — Avaliações

---

## US-024 — Avaliar o instrutor após uma aula

**Como** aluno autenticado que realizou uma reserva  
**Quero** dar uma nota e deixar um comentário sobre o instrutor  
**Para** ajudar outros alunos a escolherem bem e dar feedback ao instrutor

### Critérios de Aceitação

- [ ] CA-01: O aluno pode avaliar qualquer booking que seja seu, independentemente do status da aula
- [ ] CA-02: A nota (`rating`) deve ser um número inteiro entre 1 e 5
- [ ] CA-03: O comentário é opcional e pode ter no máximo 1.000 caracteres
- [ ] CA-04: Cada booking só pode receber uma avaliação — tentar avaliar novamente retorna erro 404
- [ ] CA-05: Se o booking não pertencer ao aluno autenticado, o sistema retorna erro 404 (sem revelar que o booking existe)
- [ ] CA-06: A resposta inclui o ID da avaliação criada, o ID do booking, a nota e o comentário

### Regras de Negócio

- RN-01: Sem verificação de status: qualquer booking do aluno pode ser avaliado (não exige `status = 'completed'`)
- RN-02: Unicidade: `existsByBookingId(booking.id)` → `ForbiddenAccessError` se já existe
- RN-03: O rating do instrutor (`instructor.rating`) **não é atualizado** automaticamente pelo sistema atual; campo permanece com valor inicial após review criada
- RN-04: Todos os erros de avaliação retornam HTTP 404 (via `sendErrorJson(res, error, 404)`)

### Notas Técnicas

- Endpoint: `POST /bookings/:bookingId/review`
- Middleware: `rateLimitMiddleware`, `authenticateMiddleware`
- Path param: `bookingId` — UUID do booking
- Body: `{ rating: 5, comment?: "..." }`
- Response 201: `{ reviewId, bookingId, rating, comment }`
- Campos **não** retornados: `id`, `createdAt`, `studentId`, `instructorId`
- Erro de booking não encontrado ou já avaliado: HTTP 404
