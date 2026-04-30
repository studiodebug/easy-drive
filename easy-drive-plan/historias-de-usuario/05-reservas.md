# Histórias de Usuário — Reservas de Aulas

---

## US-017 — Simular custo de reserva antes de confirmar

**Como** aluno autenticado  
**Quero** saber quantos créditos serão debitados para uma quantidade de slots  
**Para** verificar se tenho saldo suficiente antes de confirmar a reserva

### Critérios de Aceitação

- [ ] CA-01: Informando a quantidade de slots, o sistema retorna quantos créditos serão necessários
- [ ] CA-02: Cada slot custa exatamente 2 créditos
- [ ] CA-03: A quantidade de slots deve ser entre 1 e 12
- [ ] CA-04: A resposta retorna apenas `slotCount` e `creditsRequired` (sem data de expiração da cotação)

### Regras de Negócio

- RN-01: Custo: `creditsRequired = slotCount * 2`
- RN-02: Validação Zod: `slotCount` — número inteiro, min 1, max 12
- RN-03: A cotação não tem prazo de validade — é apenas informativa

### Notas Técnicas

- Endpoint: `POST /bookings/quote`
- Middleware: `rateLimitMiddleware`, `authenticateMiddleware`
- Body: `{ slotCount: 2 }`
- Response 200: `{ slotCount: 2, creditsRequired: 4 }`

---

## US-018 — Reservar aula com um instrutor

**Como** aluno autenticado com créditos suficientes  
**Quero** confirmar uma reserva de aula em um horário específico  
**Para** garantir minha vaga com o instrutor escolhido

### Critérios de Aceitação

- [ ] CA-01: O sistema aceita o ID do instrutor, data, horário de início e fim e a quantidade de créditos a debitar
- [ ] CA-02: O horário informado deve estar dentro da grade de trabalho do instrutor naquele dia da semana
- [ ] CA-03: Se já houver reserva confirmada no mesmo horário do instrutor, a operação é recusada com conflito (HTTP 409)
- [ ] CA-04: Se o aluno não tiver créditos suficientes, a operação é recusada com erro específico (HTTP 422)
- [ ] CA-05: A operação de reserva é atômica: cria o slot, o booking, o booking slot e debita créditos em uma única transação de banco de dados
- [ ] CA-06: Em caso de sucesso, o sistema retorna o ID da reserva e status `"CONFIRMED"`
- [ ] CA-07: Os horários devem ser informados no formato `HH:MM` (sem segundos)
- [ ] CA-08: O aluno precisa ter um perfil de aluno cadastrado para fazer reservas

### Regras de Negócio

- RN-01: Validação de disponibilidade: verifica `InstructorWeeklySchedule` para o `dayOfWeek` e `startTime` informados
- RN-02: Verificação de conflito: busca `InstructorAvailabilitySlot` existente com `slotStatus = 'booked'` no mesmo horário (SELECT FOR UPDATE)
- RN-03: O sistema **cria** um novo `InstructorAvailabilitySlot` com `slotStatus = 'booked'` — não reutiliza slots pré-existentes
- RN-04: Débito: `decreaseBalance(wallet.id, creditsRequired)` com `WHERE availableCredits >= creditsRequired`
- RN-05: `creditsRequired`: Zod min 1, max 20, default 10
- RN-06: Rate limit: 30 req/min (endpoint de `/bookings/**`)
- RN-07: Transação criada: `type: "debit"`, `amount: creditsRequired`, `description: "Booking confirmation debit"`

### Fluxo de Validação Interno

```
1. Busca Student pelo userId → UnauthorizedError se não tiver perfil
2. Busca Instructor pelo instructorId → SlotUnavailableError se não encontrado
3. Verifica InstructorWeeklySchedule para o dayOfWeek + startTime → SlotUnavailableError se ausente
4. Verifica conflito de slot (SELECT FOR UPDATE) → SlotUnavailableError se ocupado
5. Debita carteira → InsufficientCreditsError se sem saldo
6. Cria InstructorAvailabilitySlot (booked) + Booking (confirmed) + BookingSlot + WalletTransaction
```

### Notas Técnicas

- Endpoint: `POST /bookings/confirm`
- Middleware: `rateLimitMiddleware` (30/min), `authenticateMiddleware`
- Body: `{ instructorId, date: "YYYY-MM-DD", startTime: "HH:MM", endTime: "HH:MM", creditsRequired: 2 }`
- Response 201: `{ bookingId: "uuid", status: "CONFIRMED" }`
- Erro de slot ocupado: HTTP 409 `{ code: "SLOT_UNAVAILABLE", message: "..." }`
- Erro de saldo insuficiente: HTTP 422 `{ code: "INSUFFICIENT_CREDITS", message: "..." }`

---

## US-019 — Cancelar uma reserva de aula

**Como** aluno autenticado com uma reserva confirmada  
**Quero** cancelar minha reserva, com a opção de receber o reembolso dos créditos  
**Para** liberar o horário e recuperar meus créditos quando não puder comparecer

### Critérios de Aceitação

- [ ] CA-01: O aluno pode cancelar apenas suas próprias reservas (não as de outros alunos)
- [ ] CA-02: Ao cancelar, o sistema marca o booking como cancelado e libera o slot do instrutor (slot fica com status `'open'`)
- [ ] CA-03: Se `applyRefund = true`, o sistema devolve os créditos usados na reserva para a carteira do aluno
- [ ] CA-04: O motivo do cancelamento é opcional e pode ter no máximo 500 caracteres
- [ ] CA-05: A resposta confirma o ID da reserva, o status final `"CANCELLED"` e se o reembolso foi aplicado
- [ ] CA-06: Se a reserva não pertencer ao aluno ou não for encontrada, o sistema retorna HTTP 404
- [ ] CA-07: A operação é atômica: o cancelamento do booking, slot e reembolso ocorrem em uma única transação

### Regras de Negócio

- RN-01: Status após cancelamento: `"CANCELLED"` (grafia britânica, não americana)
- RN-02: Com `applyRefund = true`: `increaseBalance(wallet.id, booking.requiredCredits)` + transação do tipo `"refund"`
- RN-03: O `InstructorAvailabilitySlot` tem `slotStatus` alterado para `'open'`
- RN-04: O `BookingSlot` tem `status` alterado para `'canceled'`
- RN-05: A validação de propriedade usa `findBookingByUuidAndStudent(bookingUuid, studentId)` → `ForbiddenAccessError` retornado como 404

### Notas Técnicas

- Endpoint: `POST /bookings/:bookingId/cancel`
- Middleware: `rateLimitMiddleware`, `authenticateMiddleware`
- Body: `{ applyRefund?: boolean, reason?: string (max 500 chars) }`
- Response 200: `{ bookingId: "uuid", status: "CANCELLED", refundApplied: true }`
- Erro de reserva não encontrada / não pertencente: HTTP 404
