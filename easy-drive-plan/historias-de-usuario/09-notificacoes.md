# Histórias de Usuário — Notificações por E-mail

---

## US-026 — Receber e-mail de confirmação de conta após cadastro

**Como** aluno que acabou de criar uma conta  
**Quero** receber um e-mail com um link para confirmar meu endereço de e-mail  
**Para** verificar que o e-mail informado é válido e ativar minha conta

### Critérios de Aceitação

- [ ] CA-01: O e-mail de confirmação é enviado automaticamente após o cadastro bem-sucedido
- [ ] CA-02: O e-mail contém um link de confirmação único e com prazo de validade de 24 horas
- [ ] CA-03: O link aponta para `{FRONTEND_URL}/auth/confirm?token={token}`
- [ ] CA-04: Se o serviço de e-mail não estiver configurado (sem `RESEND_API_KEY`), o sistema funciona normalmente mas não envia o e-mail (modo silencioso)
- [ ] CA-05: O token é de 64 caracteres hexadecimais gerado com `crypto.randomBytes(32)`

### Regras de Negócio

- RN-01: Provedor de e-mail: Resend (via `ResendEmailSender`); sem API key → `NoOpEmailSender` (descarta silenciosamente)
- RN-02: Template inclui nome do usuário e o link de confirmação
- RN-03: Token expira em 24 horas a partir do envio

### Notas Técnicas

- Acionado por: `POST /users/signup` (sucesso)
- Implementação: `EmailSender.sendEmailConfirmation(email, name, token)`
- Link: `${FRONTEND_URL}/auth/confirm?token=${token}`
- Sem endpoint direto de "reenviar confirmação" no sistema atual

---

## US-027 — Receber e-mail com link para redefinir senha

**Como** aluno que esqueceu sua senha  
**Quero** receber um e-mail com um link seguro para criar uma nova senha  
**Para** recuperar o acesso à minha conta sem precisar entrar em contato com o suporte

### Critérios de Aceitação

- [ ] CA-01: O e-mail de redefinição é enviado após solicitação bem-sucedida de recuperação de senha
- [ ] CA-02: O e-mail contém um link com token único, válido por 1 hora
- [ ] CA-03: O link aponta para `{FRONTEND_URL}/auth/update-password?token={token}` (não `/reset-password`)
- [ ] CA-04: O token é de 64 caracteres hexadecimais
- [ ] CA-05: Após o uso do link para redefinir a senha, o token é invalidado e não pode ser reutilizado
- [ ] CA-06: Se o e-mail solicitado não existir no sistema, nenhum e-mail é enviado, mas o sistema não revela isso ao solicitante

### Regras de Negócio

- RN-01: Token expira em 1 hora (não 24 horas como o token de confirmação de e-mail)
- RN-02: O path do link é `/auth/update-password` — diferente do `/auth/reset-password`
- RN-03: Após redefinição: `passwordResetToken = null`, `passwordResetTokenExpiresAt = null`

### Notas Técnicas

- Acionado por: `POST /users/forgot-password` (sucesso)
- Implementação: `EmailSender.sendPasswordReset(email, name, token)`
- Link: `${FRONTEND_URL}/auth/update-password?token=${token}`
