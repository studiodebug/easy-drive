# EasyDrive — Histórias de Usuário

> Histórias de usuário completas do sistema EasyDrive, organizadas por módulo.  
> Baseadas na documentação técnica em `../` e derivadas diretamente do código-fonte.

---

## Atores do Sistema

| Ator | Descrição |
|------|-----------|
| **Aluno** | Usuário principal. Cria conta, compra créditos e reserva aulas |
| **Visitante** | Usuário sem conta. Pode ver agenda/disponibilidade de instrutores e se candidatar como instrutor |
| **Sistema de Pagamento** | Stripe, MercadoPago ou Mock. Envia webhooks para confirmar pagamentos |
| **Instrutor** | Profissional cadastrado internamente (sem endpoints de auto-gerenciamento via API pública) |

---

## Índice de Histórias

### Módulo 1 — Autenticação e Conta
→ [`01-autenticacao.md`](./01-autenticacao.md)

| ID | História | Ator |
|----|----------|------|
| US-001 | Criar conta de aluno | Visitante |
| US-002 | Confirmar e-mail após cadastro | Aluno |
| US-003 | Entrar na conta (login) | Aluno |
| US-004 | Manter sessão ativa automaticamente (refresh token) | Aluno |
| US-005 | Solicitar redefinição de senha esquecida | Visitante / Aluno |
| US-006 | Redefinir senha com token recebido por e-mail | Aluno |

### Módulo 2 — Perfil do Aluno
→ [`02-perfil.md`](./02-perfil.md)

| ID | História | Ator |
|----|----------|------|
| US-007 | Visualizar meu perfil completo | Aluno |
| US-008 | Atualizar dados do meu perfil | Aluno |
| US-009 | Atualizar minha foto de perfil | Aluno |

### Módulo 3 — Créditos e Carteira
→ [`03-creditos-carteira.md`](./03-creditos-carteira.md)

| ID | História | Ator |
|----|----------|------|
| US-010 | Verificar saldo da minha carteira | Aluno |
| US-011 | Consultar histórico de transações da carteira | Aluno |
| US-012 | Simular custo de pacote de créditos antes de comprar | Aluno |
| US-013 | Comprar créditos online | Aluno |

### Módulo 4 — Instrutores
→ [`04-instrutores.md`](./04-instrutores.md)

| ID | História | Ator |
|----|----------|------|
| US-014 | Descobrir instrutores disponíveis na plataforma | Aluno |
| US-015 | Consultar os horários de trabalho do instrutor | Visitante / Aluno |
| US-016 | Verificar disponibilidade do instrutor em uma semana específica | Visitante / Aluno |

### Módulo 5 — Reservas de Aulas
→ [`05-reservas.md`](./05-reservas.md)

| ID | História | Ator |
|----|----------|------|
| US-017 | Simular custo de reserva antes de confirmar | Aluno |
| US-018 | Reservar aula com um instrutor | Aluno |
| US-019 | Cancelar uma reserva de aula | Aluno |

### Módulo 6 — Dashboard
→ [`06-dashboard.md`](./06-dashboard.md)

| ID | História | Ator |
|----|----------|------|
| US-020 | Ver minhas aulas confirmadas | Aluno |
| US-021 | Ver minha agenda pessoal agrupada por data | Aluno |
| US-022 | Ver meu ritmo de aulas por dia da semana | Aluno |
| US-023 | Ver meu histórico completo de atividades | Aluno |

### Módulo 7 — Avaliações
→ [`07-avaliacoes.md`](./07-avaliacoes.md)

| ID | História | Ator |
|----|----------|------|
| US-024 | Avaliar o instrutor após uma aula | Aluno |

### Módulo 8 — Lista de Espera de Instrutores
→ [`08-lista-espera.md`](./08-lista-espera.md)

| ID | História | Ator |
|----|----------|------|
| US-025 | Candidatar-me a instrutor na plataforma | Visitante |

### Módulo 9 — Notificações por E-mail
→ [`09-notificacoes.md`](./09-notificacoes.md)

| ID | História | Ator |
|----|----------|------|
| US-026 | Receber e-mail de confirmação de conta após cadastro | Sistema → Aluno |
| US-027 | Receber e-mail com link para redefinir senha | Sistema → Aluno |

### Módulo 10 — Sistema de Pagamento
→ [`10-sistema-pagamento.md`](./10-sistema-pagamento.md)

| ID | História | Ator |
|----|----------|------|
| US-028 | Processar confirmação de pagamento e creditar carteira | Sistema de Pagamento |

---

## Fluxo Principal — Jornada do Aluno

```
[Visitante]
     │
     ▼
US-001  Criar conta
     │
     ▼
US-002  Confirmar e-mail (opcional mas recomendado)
     │
     ▼
US-012  Simular custo de créditos
     │
     ▼
US-013  Comprar créditos → checkout
     │                         │
     │                    US-028 Sistema processa pagamento
     │                         │
     │◄────────── créditos creditados na carteira ──────────┘
     │
     ▼
US-014  Descobrir instrutores
     │
     ▼
US-015  Ver horários do instrutor
US-016  Ver disponibilidade na semana
     │
     ▼
US-017  Simular custo da reserva
     │
     ▼
US-018  Confirmar reserva (debita créditos)
     │
     ├──► US-020  Ver aulas confirmadas
     ├──► US-021  Ver agenda por data
     ├──► US-022  Ver ritmo semanal
     │
     ▼
[após aula]
     │
     ▼
US-024  Avaliar instrutor
     │
     ▼
US-023  Ver no histórico como BOOKING_COMPLETED
```

---

## Resumo de Comportamentos Críticos

| Comportamento | Detalhe |
|---------------|---------|
| Custo por aula | 2 créditos por slot (`slotCount * 2`) |
| Bônus de créditos | 10% para compras ≥ 20 créditos (arredondado para baixo) |
| Reserva sem agenda | Se instrutor não tem `InstructorWeeklySchedule`, toda reserva falha com `SlotUnavailableError` (409) |
| Slot na reserva | O sistema CRIA um novo slot `booked` — não usa slots `open` existentes |
| Reembolso | Opcional ao cancelar; devolve exatamente os créditos debitados na reserva |
| Rating do instrutor | NÃO é atualizado ao criar avaliação (limitação do código atual) |
| Webhook de pagamento | Credita 10 créditos fixos (não o total da cotação) — comportamento atual |
| Endpoints públicos | `/instructors/:id/schedule`, `/instructors/:id/availability`, `/instructors/waitlist` |
| E-mail de reset | Link aponta para `/auth/update-password` (não `/auth/reset-password`) |
| Status de cancelamento | `"CANCELLED"` (grafia britânica) |
