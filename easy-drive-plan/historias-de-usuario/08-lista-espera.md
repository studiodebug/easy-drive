# Histórias de Usuário — Lista de Espera de Instrutores

---

## US-025 — Candidatar-me a instrutor na plataforma

**Como** profissional de direção interessado em dar aulas na plataforma  
**Quero** preencher um formulário de interesse para me tornar instrutor  
**Para** ser avaliado pela equipe e, se aprovado, começar a receber alunos

### Critérios de Aceitação

- [ ] CA-01: O formulário aceita: nome, e-mail, telefone, cidade, estado e observações
- [ ] CA-02: Nome, e-mail, cidade e estado são campos obrigatórios
- [ ] CA-03: Telefone e observações são opcionais
- [ ] CA-04: O nome deve ter entre 2 e 255 caracteres
- [ ] CA-05: O e-mail deve ser um endereço válido
- [ ] CA-06: O estado deve conter exatamente 2 caracteres (ex: "SP", "RJ")
- [ ] CA-07: As observações têm limite de 2.000 caracteres
- [ ] CA-08: O endpoint é público — não exige conta ou login na plataforma
- [ ] CA-09: A resposta confirma o registro com um ID, o status `"PENDING"`, o nome e o e-mail fornecidos

### Regras de Negócio

- RN-01: O registro é criado com `status = "pending"` (sem aprovação automática)
- RN-02: Não há transições de status via API pública — a aprovação é gerida internamente
- RN-03: Validações Zod: `name` min 2 / max 255; `email` válido; `phone` max 30; `city` min 2 / max 120; `state` exatamente 2 chars; `notes` max 2000
- RN-04: Um evento de auditoria `"waitlist.created"` é registrado no log

### Notas Técnicas

- Endpoint: `POST /instructors/waitlist`
- Middleware: `rateLimitMiddleware` (sem autenticação)
- Body: `{ name, email, phone?, city, state, notes? }`
- Response 201: `{ waitlistId, status: "PENDING", name, email }`
- Campos **não** retornados: `id`, `createdAt`, `phone`, `city`, `state`, `notes`
