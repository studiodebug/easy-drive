# Histórias de Usuário — Créditos e Carteira

---

## US-010 — Verificar saldo da minha carteira

**Como** aluno autenticado  
**Quero** ver o saldo atual de créditos da minha carteira  
**Para** saber quantas aulas ainda posso reservar

### Critérios de Aceitação

- [ ] CA-01: O sistema exibe o saldo disponível de créditos da carteira do aluno
- [ ] CA-02: Se o aluno ainda não tem carteira criada, o sistema cria uma com saldo zero automaticamente e retorna
- [ ] CA-03: A moeda exibida é `"credits"` (não reais)
- [ ] CA-04: O saldo nunca pode ser negativo (banco bloqueia por restrição de inteiro sem sinal)

### Regras de Negócio

- RN-01: A carteira usa `INTEGER UNSIGNED` para `availableCredits` — valor negativo causa erro de banco
- RN-02: `getOrCreateForStudent` cria carteira zerada se não existir
- RN-03: Moeda: `"credits"` (não BRL)

### Notas Técnicas

- Endpoint: `GET /wallet/summary`
- Middleware: `rateLimitMiddleware`, `authenticateMiddleware`
- Response 200: `{ balance: { availableCredits: 22, currency: "credits" } }`

---

## US-011 — Consultar histórico de transações da carteira

**Como** aluno autenticado  
**Quero** ver todas as movimentações (créditos e débitos) da minha carteira  
**Para** acompanhar como meus créditos foram adquiridos e gastos

### Critérios de Aceitação

- [ ] CA-01: O sistema lista transações em ordem decrescente de data (mais recentes primeiro)
- [ ] CA-02: Cada transação exibe tipo (`credit`, `debit`, `refund`), valor e data
- [ ] CA-03: Transações de débito (gasto em aulas) aparecem com valor **negativo**
- [ ] CA-04: A listagem suporta paginação com `limit` (máx 100) e `offset`
- [ ] CA-05: O sistema retorna o total de transações (`total`) junto com os itens
- [ ] CA-06: `limit` padrão do repositório é 50; Zod aceita até 100

### Regras de Negócio

- RN-01: Débitos têm `amount` negativo no retorno da API
- RN-02: Tipos possíveis: `credit` (compra), `debit` (reserva), `refund` (cancelamento)
- RN-03: Limite máximo via Zod: `limit` de 1 a 100; `offset` ≥ 0
- RN-04: Limite padrão no repositório: 50 transações

### Notas Técnicas

- Endpoint: `GET /wallet/transactions`
- Middleware: `rateLimitMiddleware`, `authenticateMiddleware`
- Query params: `limit` (1–100), `offset` (≥0)
- Response 200: `{ items: [{ id, type, amount, description, createdAt }], total }`

---

## US-012 — Simular custo de pacote de créditos antes de comprar

**Como** aluno autenticado  
**Quero** consultar quanto custará e quantos créditos receberei antes de confirmar a compra  
**Para** tomar uma decisão informada sobre o valor a investir

### Critérios de Aceitação

- [ ] CA-01: Informando a quantidade de créditos desejada, o sistema retorna o subtotal e os créditos com bônus
- [ ] CA-02: A compra de 20 ou mais créditos gera 10% de bônus (arredondado para baixo)
- [ ] CA-03: Compras abaixo de 20 créditos não recebem bônus
- [ ] CA-04: O sistema retorna claramente: créditos solicitados, bônus, total de créditos e o valor a pagar
- [ ] CA-05: A quantidade mínima é 1 crédito e a máxima é 500 créditos por transação

### Regras de Negócio

- RN-01: Preço unitário: 50 unidades de moeda por crédito
- RN-02: `subtotal = credits * 50`
- RN-03: `bonusCredits = credits >= 20 ? Math.floor(credits * 0.1) : 0`
- RN-04: `totalCredits = credits + bonusCredits`
- RN-05: Limites: `credits` entre 1 e 500 (Zod)

| Compra | Bônus | Total | Preço |
|--------|-------|-------|-------|
| 10 | 0 | 10 | 500 |
| 20 | 2 | 22 | 1.000 |
| 50 | 5 | 55 | 2.500 |
| 100 | 10 | 110 | 5.000 |

### Notas Técnicas

- Endpoint: `POST /billing/credits/quote`
- Middleware: `rateLimitMiddleware` (30 req/min), `authenticateMiddleware`
- Body: `{ credits: 20 }`
- Response 200: `{ credits, bonusCredits, totalCredits, unitPrice, subtotal, currency }`

---

## US-013 — Comprar créditos online

**Como** aluno autenticado  
**Quero** iniciar o pagamento de um pacote de créditos  
**Para** ter saldo suficiente para reservar aulas

### Critérios de Aceitação

- [ ] CA-01: O sistema aceita a quantidade de créditos e o provedor de pagamento (`stripe`, `mercadopago` ou `mock`)
- [ ] CA-02: O sistema cria uma sessão de checkout e retorna uma URL de pagamento para redirecionar o usuário
- [ ] CA-03: O sistema registra a sessão de checkout com status `"pending"` até o webhook de confirmação
- [ ] CA-04: Após o pagamento bem-sucedido (via webhook), os créditos são creditados automaticamente na carteira
- [ ] CA-05: Sessões de checkout com status diferente de `"pending"` não são reprocessadas pelo webhook
- [ ] CA-06: O campo `credits` na resposta do checkout é a quantidade base (sem bônus)

### Regras de Negócio

- RN-01: O checkout cria um registro `CreditQuote` e um `CheckoutSession`
- RN-02: Status inicial da sessão: `"pending"`
- RN-03: Provedores suportados: `stripe`, `mercadopago`, `mock`
- RN-04: Limites: `credits` entre 1 e 500 (Zod)
- RN-05: O webhook processa o evento e, ao receber `status: "succeeded"`, credita os créditos na carteira
- RN-06: Webhook requer verificação de assinatura HMAC-SHA256 via header `X-Webhook-Signature`

### Notas Técnicas

- Endpoint: `POST /billing/credits/checkout`
- Middleware: `rateLimitMiddleware` (30 req/min), `authenticateMiddleware`
- Body: `{ credits: 20, provider: "stripe" }`
- Response 200: `{ checkoutId, credits, checkoutUrl, status: "PENDING" }`
- Webhook: `POST /billing/webhooks/:provider` (sem autenticação JWT, com assinatura HMAC)
- Ao processar webhook com sucesso: 10 créditos fixos são creditados (comportamento atual do código)
