# EasyDrive — Índice Completo da Documentação

> Documentação completa do sistema EasyDrive para replicação integral por IA ou desenvolvedor.
> Cada arquivo abaixo contém uma fatia autônoma do sistema. Leia todos para reconstruí-lo.

---

## Arquivos

| # | Arquivo | Conteúdo |
|---|---------|----------|
| 01 | [01-visao-geral.md](./01-visao-geral.md) | Stack tecnológico, estrutura de pastas, scripts, variáveis de ambiente |
| 02 | [02-banco-de-dados.md](./02-banco-de-dados.md) | Todos os models Sequelize: campos, tipos, constraints, associações, hooks |
| 03 | [03-migrations.md](./03-migrations.md) | Todas as migrations em ordem, DDL completo de cada tabela |
| 04 | [04-autenticacao.md](./04-autenticacao.md) | JWT, bcrypt, middleware de auth, rate limit, webhookSignature |
| 05 | [05-endpoints-usuarios.md](./05-endpoints-usuarios.md) | Módulo users: login, signup, refresh, confirm-email, forgot/reset-password, profile |
| 06 | [06-endpoints-arquivos.md](./06-endpoints-arquivos.md) | Módulo files: upload, transform, delete (Cloudinary) |
| 07 | [07-endpoints-wallet.md](./07-endpoints-wallet.md) | Módulo wallet: summary, transactions |
| 08 | [08-endpoints-billing.md](./08-endpoints-billing.md) | Módulo billing: quote, checkout, status, webhooks (Stripe/MercadoPago/Mock) |
| 09 | [09-endpoints-bookings.md](./09-endpoints-bookings.md) | Módulo bookings: schedule, availability, quote, confirm, cancel |
| 10 | [10-endpoints-dashboard.md](./10-endpoints-dashboard.md) | Módulo dashboard: instructors, scheduled-classes, my-schedule, week-classes, history |
| 11 | [11-endpoints-reviews-waitlist.md](./11-endpoints-reviews-waitlist.md) | Módulo reviews e waitlist |
| 12 | [12-logica-de-negocio.md](./12-logica-de-negocio.md) | Regras de negócio: créditos, preços, agendamentos, avaliações, tokens |
| 13 | [13-arquitetura.md](./13-arquitetura.md) | Clean Architecture, DI container (RSDI), padrão Repository, tratamento de erros |
| 14 | [14-integrações.md](./14-integracoes.md) | Cloudinary, Resend (email), Stripe, MercadoPago, Mock payment |
| 15 | [15-frontend-contexto.md](./15-frontend-contexto.md) | Como o frontend Next.js consome a API (contexto para integração) |

---

## Resumo Executivo

**EasyDrive** é uma plataforma de agendamento de aulas práticas de direção.

- **Alunos** compram créditos (via pagamento online) e usam para reservar horários com instrutores.
- **Instrutores** cadastram sua agenda semanal e slots de disponibilidade.
- **Admin** gerencia candidatos na lista de espera de instrutores.

### Fluxo Principal

```
1. Aluno faz signup → recebe tokens JWT
2. Aluno compra créditos → /billing/credits/quote → /billing/credits/checkout → webhook credita carteira
3. Aluno vê instrutores disponíveis → /dashboard/instructors
4. Aluno vê disponibilidade do instrutor → /instructors/:id/availability
5. Aluno confirma reserva → /bookings/confirm (debita créditos da carteira)
6. Após aula → aluno avalia → /bookings/:id/review
7. Aula aparece no histórico → /dashboard/history
```

### Entidades Centrais

```
User ─── Student ─── StudentWallet ─── WalletTransaction
                 └── CreditQuote ─── CheckoutSession ─── PaymentWebhookEvent
                 └── Booking ─── BookingSlot
                            └── ClassReview

User ─── Instructor ─── InstructorWeeklySchedule
                    └── InstructorAvailabilitySlot
                    └── Booking
```
