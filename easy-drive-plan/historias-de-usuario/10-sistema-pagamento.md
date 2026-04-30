# Histórias de Usuário — Sistema de Pagamento (Webhook)

---

## US-028 — [Sistema] Processar confirmação de pagamento e creditar carteira do aluno

**Como** sistema de pagamento externo (Stripe, MercadoPago ou Mock)  
**Quero** notificar a plataforma sobre o resultado de uma transação  
**Para** que os créditos sejam creditados automaticamente na carteira do aluno após pagamento confirmado

### Critérios de Aceitação

- [ ] CA-01: O sistema aceita webhooks de três provedores: `stripe`, `mercadopago` e `mock`
- [ ] CA-02: Cada webhook deve conter uma assinatura HMAC-SHA256 no header `X-Webhook-Signature` para ser aceito
- [ ] CA-03: Se a assinatura for inválida, o sistema retorna HTTP 401 e ignora o evento
- [ ] CA-04: Se o `status` do evento for `"succeeded"`, os créditos são creditados na carteira do aluno e a sessão de checkout é marcada como concluída
- [ ] CA-05: Se o `status` for `"failed"` ou `"canceled"`, a sessão de checkout é atualizada mas nenhum crédito é creditado
- [ ] CA-06: Sessões de checkout em status diferente de `"pending"` são ignoradas (idempotência)
- [ ] CA-07: O evento de webhook é registrado no banco de dados
- [ ] CA-08: Toda a operação (atualizar checkout + creditar carteira + registrar transação) é atômica

### Regras de Negócio

- RN-01: Verificação HMAC-SHA256: `crypto.createHmac('sha256', secret).update(JSON.stringify(body)).digest('hex')`
- RN-02: Segredos por provedor via variáveis de ambiente: `STRIPE_WEBHOOK_SECRET`, `MERCADOPAGO_WEBHOOK_SECRET`, `MOCK_WEBHOOK_SECRET`
- RN-03: Créditos creditados ao processar `"succeeded"`: valor fixo de 10 créditos (comportamento atual do código)
- RN-04: Transação criada: `type: "credit"`, `amount: 10`, `description: "Credit purchase"`
- RN-05: Sessão de checkout atualiza: `status = "succeeded"`, `processedAt = now`
- RN-06: Body do webhook aceito: `{ id, eventType?, status?, sessionId? }` (schema genérico, não específico por provedor)

### Fluxo

```
1. POST /billing/webhooks/:provider chega com header X-Webhook-Signature
2. webhookSignatureMiddleware verifica HMAC-SHA256
3. BillingUseCase.registerWebhook():
   a. findCheckoutSessionByExternalId(event.id)
   b. Se session.status != 'pending' → retorna sem processar (idempotência)
   c. updateCheckoutSessionStatus(id, status)
   d. Se status == 'succeeded':
      - getOrCreateForStudent(studentId)
      - increaseBalance(wallet.id, 10)       ← fixo: 10 créditos
      - applyTransaction({ type: "credit", amount: 10 })
4. Log de auditoria: "billing.webhook.received"
```

### Notas Técnicas

- Endpoint: `POST /billing/webhooks/:provider`
- Sem autenticação JWT; usa `webhookSignatureMiddleware`
- Provedores: `stripe`, `mercadopago`, `mock`
- Response 200: `{ message: "Webhook received" }` (independente do resultado)
- Idempotente: não processa sessão que já saiu de `"pending"`
