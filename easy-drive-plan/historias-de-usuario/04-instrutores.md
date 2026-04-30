# Histórias de Usuário — Instrutores

---

## US-014 — Descobrir instrutores disponíveis na plataforma

**Como** aluno autenticado  
**Quero** ver uma lista dos instrutores ativos na plataforma, ordenados por avaliação  
**Para** escolher com quem quero fazer minhas aulas

### Critérios de Aceitação

- [ ] CA-01: O sistema lista instrutores ativos ordenados por rating (maior primeiro)
- [ ] CA-02: Cada instrutor exibe: ID (UUID), nome, rating e especialidade/modelo de carro
- [ ] CA-03: Se o instrutor não tem especialidade cadastrada, o campo `carModel` exibe `"N/A"`
- [ ] CA-04: O sistema retorna no máximo 50 instrutores por consulta
- [ ] CA-05: Instrutores inativos (`isActive = false`) não aparecem na listagem

### Regras de Negócio

- RN-01: Campo `carModel` é mapeado de `instructor.specialty`; se null → `"N/A"`
- RN-02: Limite de 50 resultados (LIMIT 50 no banco)
- RN-03: Somente `isActive = true` é listado
- RN-04: Os 4 campos retornados são: `id` (uuid), `name`, `rating`, `carModel`

### Notas Técnicas

- Endpoint: `GET /dashboard/instructors`
- Middleware: `rateLimitMiddleware`, `authenticateMiddleware`
- Response 200: `{ items: [{ id, name, rating, carModel }] }`
- Campos **não** retornados: `photoUrl`, `age`, `totalReviews`, `yearsOfExperience`

---

## US-015 — Consultar os horários de trabalho do instrutor

**Como** visitante ou aluno autenticado  
**Quero** ver os dias e horários em que um instrutor trabalha habitualmente  
**Para** saber em quais janelas posso tentar agendar uma aula

### Critérios de Aceitação

- [ ] CA-01: O sistema retorna a grade semanal recorrente do instrutor (dias da semana e horários de início e fim)
- [ ] CA-02: O dia da semana é representado como número: 0 = domingo, 1 = segunda, ..., 6 = sábado
- [ ] CA-03: Os horários são retornados no formato `HH:MM` (sem segundos)
- [ ] CA-04: Apenas horários de instrutores ativos (`isActive = true`) são exibidos
- [ ] CA-05: O resultado é ordenado por dia da semana (ascendente) e depois por horário de início (ascendente)
- [ ] CA-06: O endpoint é público — não exige autenticação

### Regras de Negócio

- RN-01: `startTime` e `endTime` são fatiados para 5 caracteres (formato `HH:MM`)
- RN-02: Filtra `instructor.isActive = true` AND `schedule.isActive = true`
- RN-03: Ordena por `dayOfWeek ASC`, `startTime ASC`
- RN-04: Os campos `id`, `uuid` e `isActive` **não** são retornados

### Notas Técnicas

- Endpoint: `GET /instructors/:instructorId/schedule`
- Middleware: `rateLimitMiddleware` (sem autenticação)
- `instructorId`: aceita UUID ou ID numérico
- Response 200: `{ items: [{ dayOfWeek, startTime, endTime }] }`

---

## US-016 — Verificar disponibilidade do instrutor em uma semana específica

**Como** aluno autenticado  
**Quero** ver quais horários de um instrutor já estão ocupados em uma determinada semana  
**Para** identificar os slots livres e escolher o melhor horário para a minha aula

### Critérios de Aceitação

- [ ] CA-01: Informando data de início e fim de semana, o sistema retorna apenas os slots ocupados (`booked`) e bloqueados (`blocked`) do instrutor naquele período
- [ ] CA-02: Slots **não presentes** na resposta são considerados disponíveis (livre = ausente da lista)
- [ ] CA-03: Cada slot retorna: ID do slot, data/hora de início, data/hora de fim e status
- [ ] CA-04: Os slots são ordenados por data/hora de início (ascendente)
- [ ] CA-05: Sem filtro de semana, o sistema retorna todos os slots futuros ativos (limite de 300)
- [ ] CA-06: O endpoint é público — não exige autenticação

### Regras de Negócio

- RN-01: Com `weekStart`/`weekEnd`: filtra `slotStatus IN ('booked', 'blocked')` e `startAt >= weekStart AND startAt < weekEnd`
- RN-02: Sem filtro: busca todos os slots com `startAt >= now` e `isActive = true`, limite 300
- RN-03: O campo retornado é `slotId` (não `id` nem `uuid`)
- RN-04: Campos **não** retornados: `isActive`, `timezone`, `uuid`

### Notas Técnicas

- Endpoint: `GET /instructors/:instructorId/availability`
- Middleware: `rateLimitMiddleware` (sem autenticação)
- Query params: `weekStart` (YYYY-MM-DD), `weekEnd` (YYYY-MM-DD) — ambos opcionais
- Response 200: `{ items: [{ slotId, startAt, endAt, status }] }`
- Datas em ISO 8601 (UTC)
