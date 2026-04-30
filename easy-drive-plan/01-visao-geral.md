# 01 — Visão Geral do Projeto

## Identidade

| Campo | Valor |
|-------|-------|
| Nome | EasyDrive Backend API |
| Tipo | REST API para agendamento de aulas de direção |
| Linguagem | TypeScript |
| Runtime | Node.js 22.x |
| Framework | Express.js 4.21 |
| ORM | Sequelize 6.37 |
| Banco | MySQL |
| Porta padrão | 3333 |

---

## Stack Completa

```
express             4.21    – framework HTTP
sequelize           6.37    – ORM (MySQL)
mysql2              *       – driver MySQL
typescript          5.x     – linguagem
tsx                 *       – execução dev com watch
zod                 3.x     – validação de schemas
bcryptjs            *       – hash de senhas
jsonwebtoken        9.x     – JWT access/refresh tokens
multer              *       – upload de arquivos (form-data)
cloudinary          2.x     – armazenamento de imagens
resend              *       – envio de e-mails transacionais
rsdi                *       – container de injeção de dependências
cors                *       – CORS
helmet              *       – headers de segurança
vitest              *       – testes
prettier / eslint   *       – formatação e linting
```

---

## Estrutura de Pastas

```
easydrive-backend/
├── src/
│   ├── app/
│   │   ├── BaseController.ts           # métodos de resposta HTTP reutilizáveis
│   │   ├── middleware/
│   │   │   ├── authenticate.ts         # verifica JWT Bearer token
│   │   │   ├── initSession.ts          # inicializa DI container por requisição
│   │   │   ├── uploadImage.ts          # multer config (10MB, jpeg/png/gif/webp)
│   │   │   ├── rateLimit.ts            # rate limit em memória por IP+rota
│   │   │   └── webhookSignature.ts     # verifica HMAC-SHA256 de webhooks
│   │   ├── providers/
│   │   │   ├── TokenProvider/          # gera e verifica JWT
│   │   │   └── EmailSender/            # abstração de envio de e-mail
│   │   └── utils/
│   │       └── Helper.ts               # utilitários gerais
│   │
│   ├── config/
│   │   ├── dotenv.ts                   # carrega .env
│   │   ├── database.ts                 # instância Sequelize
│   │   ├── jwtConfig.ts                # constantes JWT
│   │   └── cloudinary.ts              # configuração Cloudinary
│   │
│   ├── core/
│   │   ├── errors/                     # classes de erro base e por domínio
│   │   └── repositories/              # interfaces de repositórios
│   │
│   ├── data/
│   │   ├── models/sequelize/          # definições dos models Sequelize
│   │   └── repositories/
│   │       ├── Sequelize/             # implementações dos repositórios
│   │       └── Cloudinary/            # repositório de upload
│   │
│   ├── modules/
│   │   ├── health/                    # GET /health
│   │   ├── users/                     # auth + profile
│   │   ├── files/                     # upload/transform/delete imagens
│   │   ├── wallet/                    # carteira de créditos do aluno
│   │   ├── billing/                   # compra de créditos + pagamentos
│   │   ├── bookings/                  # agendamento de aulas
│   │   ├── dashboard/                 # dados consolidados para o app
│   │   ├── reviews/                   # avaliações de aulas
│   │   └── waitlist/                  # lista de espera de instrutores
│   │
│   ├── presentation/
│   │   └── contracts/                 # DTOs de entrada com validação
│   │
│   ├── shared/
│   │   └── di.ts                      # montagem do container DI
│   │
│   ├── app.ts                         # entry point
│   └── server.ts                      # configuração do Express
│
├── sequelize/
│   ├── config.js                      # config Sequelize CLI
│   ├── migrations/                    # migrations em ordem cronológica
│   └── seeders/                       # dados de seed (demo)
│
├── dist/                              # output compilado
├── package.json
├── tsconfig.json
└── .env
```

---

## Variáveis de Ambiente

Arquivo `.env` na raiz do projeto:

```env
# Aplicação
APP_ENV=local               # local | staging | production
APP_PORT=3333

# Banco de dados (MySQL)
DATABASE_HOST=localhost
DATABASE_PORT=3309
DATABASE_NAME=easydrive
DATABASE_USERNAME=root
DATABASE_PASSWORD=root
DEBUG_QUERY=false           # loga queries SQL no console

# JWT
JWT_SECRET=<string-secreta-longa>
JWT_REFRESH_SECRET=<outra-string-secreta>
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>

# E-mail (Resend)
RESEND_API_KEY=<resend-api-key>
EMAIL_FROM=EasyDrive <noreply@example.com>   # opcional

# Frontend (links de e-mail)
FRONTEND_URL=http://localhost:3000   # opcional, default: http://localhost:3000

# CORS
CORS_ORIGIN=http://localhost:3000   # opcional

# Webhooks de pagamento (opcionais)
STRIPE_WEBHOOK_SECRET=<stripe-whsec>
MERCADOPAGO_WEBHOOK_SECRET=<mp-secret>
MOCK_WEBHOOK_SECRET=<mock-secret>
```

---

## Scripts NPM

```bash
npm run dev              # executa com tsx --watch (hot reload)
npm run dev:debug        # executa com --inspect para debugger
npm run build            # compila TypeScript → dist/
npm start                # node dist/app.js
npm run lint             # ESLint
npm run lint:fix         # ESLint com autofix
npm run test             # vitest run
npm run test:watch       # vitest --watch
npm run format           # Prettier
npm run migrate          # sequelize-cli db:migrate
npm run migrate:status   # sequelize-cli db:migrate:status
npm run migration:create # sequelize-cli migration:generate
npm run seed             # sequelize-cli db:seed:all
```

---

## Configuração TypeScript

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "dist",
    "rootDir": "src",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

---

## Configuração Sequelize CLI

```js
// sequelize/config.js
module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'mysql',
    pool: { max: 10, min: 1, acquire: 30000, idle: 10000 },
    timezone: '-03:00'
  }
  // staging e production com mesmas variáveis
}
```

---

## Fluxo de Inicialização

```
app.ts
  → carrega dotenv
  → inicia Sequelize (sync ou migrate)
  → cria servidor Express
  → registra middlewares globais (cors, helmet, json, initSession)
  → registra rotas de todos os módulos
  → escuta na porta APP_PORT
```
