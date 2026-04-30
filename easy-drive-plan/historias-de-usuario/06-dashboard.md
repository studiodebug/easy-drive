# Histórias de Usuário — Dashboard do Aluno

---

## US-020 — Ver minhas aulas confirmadas

**Como** aluno autenticado  
**Quero** ver uma lista das minhas aulas que ainda estão confirmadas  
**Para** lembrar os compromissos futuros e acompanhar minha evolução

### Critérios de Aceitação

- [ ] CA-01: O sistema lista apenas as aulas com status `'confirmed'` do aluno autenticado
- [ ] CA-02: Cada aula exibe o ID da reserva, o horário de início e o nome do instrutor
- [ ] CA-03: O horário de início (`startsAt`) é extraído do primeiro slot do booking; se não houver slot, usa a data de criação do booking
- [ ] CA-04: Se o instrutor não puder ser carregado, o nome exibe `"Instructor"` como fallback
- [ ] CA-05: O resultado é ordenado pela data de criação (mais recentes primeiro) com limite de 50 registros

### Regras de Negócio

- RN-01: Filtra `booking.status = 'confirmed'`
- RN-02: `startsAt` = `booking.slots[0].startAt` se existir, senão `booking.createdAt`
- RN-03: Limite: 50 registros
- RN-04: Campos retornados: apenas `id`, `startsAt`, `instructorName`

### Notas Técnicas

- Endpoint: `GET /dashboard/scheduled-classes`
- Middleware: `rateLimitMiddleware`, `authenticateMiddleware`
- Response 200: `{ items: [{ id, startsAt, instructorName }] }`
- Campos **não** retornados: `status`, `creditsUsed`, `endAt`, `instructorPhotoUrl`

---

## US-021 — Ver minha agenda pessoal agrupada por data

**Como** aluno autenticado  
**Quero** ver quantas aulas tenho em cada dia  
**Para** ter uma visão de calendário da minha agenda de aulas

### Critérios de Aceitação

- [ ] CA-01: O sistema retorna um resumo por data, mostrando quantas aulas estão confirmadas em cada dia
- [ ] CA-02: Datas sem aulas não aparecem na lista
- [ ] CA-03: A data é formatada como `YYYY-MM-DD` (sem hora)
- [ ] CA-04: A resposta é uma lista de `{ date, classes: count }` — não lista aulas individuais

### Regras de Negócio

- RN-01: Agrupamento feito em memória: slice dos primeiros 10 chars do `startsAt` (ISO 8601 → `YYYY-MM-DD`)
- RN-02: Baseia-se nos mesmos dados de `GET /dashboard/scheduled-classes` (aulas confirmadas)

### Notas Técnicas

- Endpoint: `GET /dashboard/my-schedule`
- Middleware: `rateLimitMiddleware`, `authenticateMiddleware`
- Response 200: `{ items: [{ date: "2026-03-10", classes: 2 }] }`

---

## US-022 — Ver meu ritmo de aulas por dia da semana

**Como** aluno autenticado  
**Quero** ver como minha frequência de aulas se distribui pelos dias da semana  
**Para** identificar quais dias tenho mais aulas e equilibrar minha rotina

### Critérios de Aceitação

- [ ] CA-01: O sistema retorna 7 registros, um para cada dia da semana, com o total de aulas
- [ ] CA-02: Os dias da semana são exibidos em inglês: `Monday`, `Tuesday`, ..., `Sunday`
- [ ] CA-03: O campo `week` retorna sempre a string `"current"`
- [ ] CA-04: Dias sem aulas aparecem com `total: 0` (lista completa com 7 dias)

### Regras de Negócio

- RN-01: Conversão de dia: `dayIndex === 0 ? 6 : dayIndex - 1` (de DOM=0 para SEG=0)
- RN-02: Soma os totais de aulas por dia da semana com base nos dados da agenda
- RN-03: Não usa `weekStart`/`weekEnd` como parâmetros — é sempre baseado na agenda completa do aluno

### Notas Técnicas

- Endpoint: `GET /dashboard/week-classes`
- Middleware: `rateLimitMiddleware`, `authenticateMiddleware`
- Response 200: `{ week: "current", classes: [{ day: "Monday", total: 1 }, ...] }` (sempre 7 itens)

---

## US-023 — Ver meu histórico completo de atividades

**Como** aluno autenticado  
**Quero** consultar todas as minhas reservas independentemente do status  
**Para** ter uma visão completa do que já aconteceu na minha trajetória de aprendizado

### Critérios de Aceitação

- [ ] CA-01: O sistema lista todos os bookings do aluno, incluindo confirmados, cancelados e concluídos
- [ ] CA-02: Cada registro exibe um tipo descritivo: `BOOKING_COMPLETED`, `BOOKING_CANCELED` ou `BOOKING_CONFIRMED`
- [ ] CA-03: Os registros são ordenados pela data de criação (mais recentes primeiro)
- [ ] CA-04: O limite é de 100 registros por consulta
- [ ] CA-05: Cada item exibe apenas o ID, tipo e data de criação (sem instrutor, créditos ou avaliação)

### Regras de Negócio

- RN-01: Mapeamento de tipo: `'completed'` → `"BOOKING_COMPLETED"` | `'canceled'` → `"BOOKING_CANCELED"` | qualquer outro → `"BOOKING_CONFIRMED"`
- RN-02: Sem filtro de status — todos os bookings do aluno
- RN-03: Limite: 100 registros (ORDER BY `createdAt DESC`)
- RN-04: Campos retornados: `id` (uuid), `type`, `createdAt`

### Notas Técnicas

- Endpoint: `GET /dashboard/history`
- Middleware: `rateLimitMiddleware`, `authenticateMiddleware`
- Response 200: `{ items: [{ id, type, createdAt }] }`
- Campos **não** retornados: `instructorName`, `creditsUsed`, `completedAt`, `review`
