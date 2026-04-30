# Histórias de Usuário — Autenticação e Conta

---

## US-001 — Criar conta de aluno

**Como** visitante sem conta  
**Quero** me cadastrar na plataforma informando meu nome, e-mail e senha  
**Para** ter acesso às funcionalidades de aluno e poder reservar aulas

### Critérios de Aceitação

- [ ] CA-01: O sistema aceita nome, e-mail e senha como dados obrigatórios no cadastro
- [ ] CA-02: Após cadastro bem-sucedido, o sistema retorna automaticamente um par de tokens JWT (access e refresh) e os dados básicos do usuário, sem exigir login separado
- [ ] CA-03: Um e-mail de confirmação é enviado automaticamente para o endereço cadastrado com link de ativação válido por 24 horas
- [ ] CA-04: O e-mail é armazenado sempre em letras minúsculas, independentemente do que o usuário digitar
- [ ] CA-05: Se o e-mail já estiver cadastrado, o sistema informa o erro e não cria duplicata
- [ ] CA-06: A senha é armazenada com hash bcrypt (nunca em texto puro)
- [ ] CA-07: O sistema cria automaticamente um perfil de aluno e uma carteira de créditos zerada vinculados à conta

### Regras de Negócio

- RN-01: E-mails são normalizados para lowercase antes de salvar
- RN-02: Senha sofre hash com bcrypt (salt rounds: 10) via hook `beforeCreate` do model
- RN-03: Carteira de créditos é criada com `availableCredits = 0` no momento do cadastro
- RN-04: O access token expira em 15 minutos; o refresh token expira em 7 dias

### Notas Técnicas

- Endpoint: `POST /users/signup`
- Response 200: `{ access_token, refresh_token, user: { id, name, email, ... } }`
- Erro de e-mail duplicado: HTTP 400 (`UserAlreadyExistsError`)
- O link no e-mail aponta para: `{FRONTEND_URL}/auth/confirm?token={token}`

---

## US-002 — Confirmar e-mail após cadastro

**Como** aluno recém-cadastrado  
**Quero** clicar no link de confirmação enviado para meu e-mail  
**Para** verificar minha conta e garantir que meu e-mail é válido

### Critérios de Aceitação

- [ ] CA-01: O link de confirmação contém um token único de 64 caracteres hexadecimais
- [ ] CA-02: O token é válido por 24 horas a partir do envio
- [ ] CA-03: Após confirmação bem-sucedida, o sistema retorna um novo par de tokens JWT e os dados do usuário (assim como no login)
- [ ] CA-04: O token é invalidado após o primeiro uso (campo `emailConfirmToken` é zerado)
- [ ] CA-05: Se o token estiver expirado ou inválido, o sistema retorna erro 400
- [ ] CA-06: Após confirmação, o campo `emailVerifiedAt` é preenchido com a data/hora atual

### Regras de Negócio

- RN-01: Token gerado com `crypto.randomBytes(32).toString('hex')` (64 caracteres hex)
- RN-02: Expiração: `Date.now() + 24 * 60 * 60 * 1000` (24 horas)
- RN-03: Após confirmação: `emailConfirmToken = null`, `emailConfirmTokenExpiresAt = null`

### Notas Técnicas

- Endpoint: `POST /users/confirm-email` com body `{ token }`
- Response 200: `{ access_token, refresh_token, user }` (igual ao login)
- Erro: HTTP 400 (`InvalidConfirmTokenError`)

---

## US-003 — Entrar na conta (login)

**Como** aluno cadastrado  
**Quero** fazer login com meu e-mail e senha  
**Para** acessar minha conta e todas as funcionalidades autenticadas

### Critérios de Aceitação

- [ ] CA-01: O sistema aceita e-mail e senha e verifica as credenciais
- [ ] CA-02: O e-mail é comparado em lowercase (case-insensitive)
- [ ] CA-03: Login bem-sucedido retorna par de tokens JWT e dados completos do usuário
- [ ] CA-04: Se o e-mail ou a senha estiverem incorretos, o sistema retorna erro genérico (sem indicar qual campo está errado)
- [ ] CA-05: Conta com status `BLOCKED` ou `INACTIVE` não consegue fazer login, recebendo erro informativo
- [ ] CA-06: O endpoint possui limite de taxa de 30 requisições por minuto por IP

### Regras de Negócio

- RN-01: A senha é verificada com `bcrypt.compare()` contra o hash armazenado
- RN-02: Contas `BLOCKED` → `UserBlockedError` (HTTP 400)
- RN-03: Contas `INACTIVE` → `UserInactiveError` (HTTP 400)
- RN-04: Rate limit: 30 req/min para `/users/login`

### Notas Técnicas

- Endpoint: `POST /users/login` com body `{ email, password }`
- Response 200: `{ access_token, refresh_token, user: { id, uuid, name, email, status, emailVerifiedAt, ... } }`
- Erro de credenciais: HTTP 400 (`InvalidCredentialsError`: "Email ou senha inválidos")

---

## US-004 — Manter sessão ativa automaticamente

**Como** aluno autenticado com access token próximo de expirar  
**Quero** que minha sessão seja renovada automaticamente com o refresh token  
**Para** não ser deslogado no meio de uma tarefa

### Critérios de Aceitação

- [ ] CA-01: Enviando um refresh token válido, o sistema retorna um novo par de tokens e os dados atualizados do usuário
- [ ] CA-02: Se o refresh token estiver expirado ou inválido, o sistema retorna erro 400
- [ ] CA-03: Conta `BLOCKED` ou `INACTIVE` não renova tokens mesmo com refresh token válido
- [ ] CA-04: O access token tem validade de 15 minutos; o refresh token tem validade de 7 dias

### Regras de Negócio

- RN-01: O refresh token é verificado com `JWT_REFRESH_SECRET` (chave separada do access token)
- RN-02: A renovação também valida o status da conta no banco de dados

### Notas Técnicas

- Endpoint: `POST /users/refresh-token` com body `{ refresh_token }`
- Response 200: `{ access_token, refresh_token, user }` (mesmo formato do login)
- Erro: HTTP 400 (`InvalidRefreshTokenError`)

---

## US-005 — Solicitar redefinição de senha esquecida

**Como** aluno que esqueceu sua senha  
**Quero** informar meu e-mail para receber um link de redefinição  
**Para** recuperar o acesso à minha conta sem precisar criar uma nova

### Critérios de Aceitação

- [ ] CA-01: O sistema aceita o e-mail e, se o e-mail estiver cadastrado, envia um link de redefinição por e-mail
- [ ] CA-02: O link é válido por 1 hora a partir do envio
- [ ] CA-03: O sistema responde com sucesso mesmo se o e-mail não for encontrado (não revela se o e-mail existe)
- [ ] CA-04: O token gerado é único e de 64 caracteres hexadecimais

### Regras de Negócio

- RN-01: Token: `crypto.randomBytes(32).toString('hex')`
- RN-02: Expiração: 1 hora a partir da geração
- RN-03: O link no e-mail aponta para `{FRONTEND_URL}/auth/update-password?token={token}` (não `/reset-password`)

### Notas Técnicas

- Endpoint: `POST /users/forgot-password` com body `{ email }`
- Response 200: `{ message: "..." }`

---

## US-006 — Redefinir senha com token recebido por e-mail

**Como** aluno que solicitou redefinição de senha  
**Quero** definir uma nova senha usando o link recebido no e-mail  
**Para** recuperar o acesso à minha conta com credenciais novas

### Critérios de Aceitação

- [ ] CA-01: O sistema aceita o token e a nova senha e atualiza as credenciais se o token for válido
- [ ] CA-02: O token é invalidado após o primeiro uso
- [ ] CA-03: Se o token estiver expirado ou inválido, o sistema retorna erro 400
- [ ] CA-04: A nova senha é armazenada com hash bcrypt automaticamente
- [ ] CA-05: Após redefinição bem-sucedida, a conta pode ser acessada com a nova senha imediatamente

### Regras de Negócio

- RN-01: Após redefinição: `passwordResetToken = null`, `passwordResetTokenExpiresAt = null`
- RN-02: O hash é aplicado via hook `beforeUpdate` do model quando `user.changed("password") === true`

### Notas Técnicas

- Endpoint: `POST /users/reset-password` com body `{ token, password }`
- Response 200: `{ message: "..." }`
- Erro: HTTP 400 (`InvalidResetTokenError`)
