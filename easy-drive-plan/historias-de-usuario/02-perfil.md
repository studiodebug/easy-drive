# Histórias de Usuário — Perfil do Aluno

---

## US-007 — Visualizar meu perfil completo

**Como** aluno autenticado  
**Quero** ver todos os meus dados cadastrais em um só lugar  
**Para** saber quais informações a plataforma tem sobre mim e identificar o que precisa ser atualizado

### Critérios de Aceitação

- [ ] CA-01: O sistema retorna dados do usuário (nome, e-mail), do perfil de aluno (documento, telefone) e do endereço em uma única chamada
- [ ] CA-02: Apenas o aluno autenticado pode ver seu próprio perfil (via token JWT)
- [ ] CA-03: Se o aluno ainda não preencheu endereço, esse campo retorna vazio/nulo sem erro
- [ ] CA-04: Os campos `status` e `emailVerifiedAt` não são expostos no endpoint de perfil

### Regras de Negócio

- RN-01: O perfil retorna o conjunto `{ user, student, address }` — três entidades relacionadas
- RN-02: A busca usa o `userId` extraído do JWT (`req.user.userId`)

### Notas Técnicas

- Endpoint: `GET /users/profile`
- Middleware: `authenticateMiddleware`
- Response 200: `{ user: { id, uuid, name, email }, student: { ... }, address: { ... } }`
- Os campos `status` e `emailVerifiedAt` são omitidos da resposta de perfil

---

## US-008 — Atualizar dados do meu perfil

**Como** aluno autenticado  
**Quero** editar meu nome, telefone, documento, endereço e outros dados pessoais  
**Para** manter minhas informações atualizadas e corretas na plataforma

### Critérios de Aceitação

- [ ] CA-01: O sistema aceita atualização de nome (obrigatório), telefone, tipo de documento, número do documento e dados de endereço
- [ ] CA-02: O nome não pode ser vazio; deve ter ao menos 1 caractere
- [ ] CA-03: Se qualquer campo de endereço for enviado, os campos `city` e `state` tornam-se obrigatórios
- [ ] CA-04: O estado (`state`) deve conter exatamente 2 caracteres (ex: "SP", "RJ")
- [ ] CA-05: O campo `complement` do endereço é opcional
- [ ] CA-06: O sistema retorna os dados atualizados do aluno e do endereço na resposta
- [ ] CA-07: Se o endereço não existir, o sistema cria um novo; se existir, atualiza

### Regras de Negócio

- RN-01: `name`: obrigatório, min 1 caractere
- RN-02: `state`: exatamente 2 caracteres (validação Zod: `z.string().length(2)`)
- RN-03: Campos de endereço: se qualquer um for enviado, `city` e `state` são obrigatórios
- RN-04: `documentType` é um enum: `CPF`, `RG` ou `CNH`

### Notas Técnicas

- Endpoint: `PUT /users/profile/student`
- Middleware: `authenticateMiddleware`
- Body: `{ name, phone?, documentType?, documentNumber?, street?, number?, complement?, neighborhood?, city?, state?, zipCode?, country? }`
- Response 200: `{ student: { ... }, address: { ... } }`

---

## US-009 — Atualizar minha foto de perfil

**Como** aluno autenticado  
**Quero** fazer upload de uma imagem para usar como minha foto de perfil  
**Para** personalizar minha conta e ser reconhecido pelos instrutores

### Critérios de Aceitação

- [ ] CA-01: O sistema aceita imagens nos formatos JPEG, JPG, PNG, GIF e WebP
- [ ] CA-02: O tamanho máximo do arquivo é 10 MB
- [ ] CA-03: Arquivos em formato não permitido são rejeitados com mensagem de erro clara
- [ ] CA-04: Após upload bem-sucedido, o sistema retorna a URL pública, a URL segura (HTTPS), a URL otimizada e a URL de miniatura da imagem
- [ ] CA-05: A imagem é armazenada no Cloudinary e pode ser acessada via URL permanente
- [ ] CA-06: Arquivos muito grandes (acima de 10 MB) são rejeitados antes do upload

### Regras de Negócio

- RN-01: Upload via `multipart/form-data`, campo `file`
- RN-02: Tamanho máximo: `10 * 1024 * 1024` bytes (10 MB)
- RN-03: Tipos permitidos: `image/jpeg`, `image/jpg`, `image/png`, `image/gif`, `image/webp`
- RN-04: A imagem é convertida para base64 e enviada ao Cloudinary via `uploader.upload()`
- RN-05: A resposta inclui URLs otimizada (`quality: "auto", fetchFormat: "auto"`) e miniatura (200×200, crop: fill, gravity: face)

### Notas Técnicas

- Endpoint: `POST /files/images/upload`
- Middleware: `authenticateMiddleware`, depois `uploadImageMiddleware` (multer, nessa ordem)
- Content-Type: `multipart/form-data`
- Response 200: `{ publicId, url, secureUrl, optimizedUrl, thumbnailUrl, width, height, format, bytes }`
- Query params opcionais: `folder`, `publicId`, `overwrite`
