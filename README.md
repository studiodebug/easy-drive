# Easy Drive

Uma plataforma de agendamento de aulas de direção desenvolvida com Next.js 16, integrada com Supabase para autenticação e gestão de dados.

## 📋 Descrição do Projeto

Easy Drive é uma aplicação web moderna para gerenciamento de aulas de direção. A plataforma oferece funcionalidades para:

- **Agendamento de Aulas**: Permite que instrutores e alunos agendem aulas com facilidade
- **Gerenciamento de Instrutores**: Perfis de instrutores com disponibilidade de horários
- **Dashboard de Alunos**: Área personalizada para alunos acompanharem seus agendamentos
- **Sistema de Créditos**: Sistema de pagamento e controle de créditos para aulas
- **Autenticação Personalizada**: Flow de autenticação customizado com suporte local

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 16.1.1** - Framework React com SSR e otimizações
- **React 19.2.3** - Biblioteca UI
- **TypeScript 5** - Tipagem estática
- **Tailwind CSS 4** - Styling com utility-first CSS
- **Radix UI** - Componentes acessíveis sem estilos
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **React Query** - Gerenciamento de estado assíncrono
- **Lucide React** - Ícones SVG
- **Recharts** - Gráficos e visualizações

### Backend
- **Supabase** - BaaS (Backend as a Service) para autenticação e database
- **Next.js API Routes** - Endpoints HTTP

### Desenvolvimento
- **ESLint** - Linting de código
- **PostCSS** - Processamento de CSS

## 📁 Estrutura do Projeto

```
easy-drive/
├── app/                      # Next.js App Router
│   ├── (public)/            # Rotas públicas (login, signup, etc)
│   ├── (authentitated)/     # Rotas protegidas por autenticação
│   ├── api/                 # API Routes
│   ├── globals.css          # Estilos globais
│   └── layout.tsx           # Layout raiz
├── components/              # Componentes React reutilizáveis
├── lib/                     # Utilitários e funções auxiliares
├── business-rules/          # Regras de negócio
├── providers/               # Context providers
│   ├── auth/               # Provider de autenticação
│   └── booking/            # Provider de agendamentos
├── mutations/               # Funções para mutações de dados
│   ├── booking/            # Mutações de agendamentos
│   ├── dashboard/          # Mutações do dashboard
│   └── waitlist/           # Mutações de lista de espera
├── types/                   # Definições de tipos TypeScript
├── mutations/               # Lógica de mutações de dados
├── next.config.ts          # Configuração do Next.js
├── tailwind.config.js      # Configuração do Tailwind CSS
├── tsconfig.json           # Configuração do TypeScript
└── package.json            # Dependências do projeto
```

## 🚀 Como Começar

### Pré-requisitos

- **Node.js** 18+ instalado
- **pnpm** (recomendado) ou npm/yarn
- Conta no [Supabase](https://supabase.com)

### Instalação

1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd easy-drive
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   # ou
   npm install
   ```

3. **Configure as variáveis de ambiente**

   Crie um arquivo `.env.local` na raiz do projeto:
   ```bash
   cp .env.example .env.local
   ```

   Atualize o arquivo `.env.local` com suas credenciais do Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sua-chave-publica
   ```

   Você pode encontrar essas credenciais em:
   - Supabase Dashboard → Project Settings → API

### Rodando o Projeto Localmente

#### Modo de Desenvolvimento

```bash
pnpm dev
# ou
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

#### Build para Produção

```bash
pnpm build
pnpm start
```

#### Linting

```bash
pnpm lint
```

## 📊 Fluxo de Autenticação

O projeto utiliza um fluxo de autenticação customizado integrado com Supabase:

1. **Login/Signup** - Usuários podem criar contas ou fazer login
2. **Sessão** - A sessão é mantida através de tokens JWT
3. **Áreas Protegidas** - Rotas em `(authentitated)/` requerem autenticação
4. **Logout** - Limpeza de sessão e redirecionamento

## 🎯 Principais Funcionalidades

### Para Alunos
- Visualizar instrutores disponíveis
- Agendar aulas com instrutores
- Gerenciar créditos e pagamentos
- Acompanhar histórico de aulas

### Para Instrutores
- Gerenciar perfil e disponibilidade
- Visualizar agendamentos de alunos
- Confirmar/cancelar aulas

## 🔧 Configuração do Supabase

Para configurar completamente o projeto com Supabase:

1. Crie um novo projeto em [supabase.com](https://supabase.com)
2. Configure as tabelas necessárias para:
   - Usuários (profiles)
   - Agendamentos (bookings)
   - Instrutores (instructors)
   - Créditos (credits)
3. Configure as políticas de Row Level Security (RLS) conforme necessário
4. Adicione as credenciais no arquivo `.env.local`

## 📚 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `pnpm dev` | Inicia o servidor de desenvolvimento |
| `pnpm build` | Constrói a aplicação para produção |
| `pnpm start` | Inicia o servidor de produção |
| `pnpm lint` | Verifica o código com ESLint |

## 🌐 Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Chave pública/anon do Supabase |

## 📝 Desenvolvimento

### Criando Componentes

Os componentes são organizados em `components/` e utilizam:
- Radix UI para base acessível
- Tailwind CSS para estilos
- TypeScript para tipagem

### Adicionando Rotas

Novas rotas são criadas seguindo o padrão do Next.js App Router em `app/`

### Mutações de Dados

Use os arquivos em `mutations/` para operações de dados (POST, PUT, DELETE)

## 🔐 Segurança

- Credenciais do Supabase nunca devem ser commitadas
- Use `.env.local` para desenvolvimento local
- Variáveis prefixadas com `NEXT_PUBLIC_` são expostas ao cliente (apenas chaves públicas)
- Implemente RLS policies no Supabase para proteção de dados

## 📦 Deploy

A aplicação pode ser facilmente deployada em:
- **Vercel** (recomendado para Next.js)
- **Netlify**
- **Railway**
- Qualquer host que suporte Node.js

## 🐛 Troubleshooting

### Erro de conexão com Supabase
- Verifique se as credenciais em `.env.local` estão corretas
- Confirme se o projeto Supabase está ativo

### Porta 3000 já em uso
```bash
# Use outra porta
pnpm dev -p 3001
```

### Dependências não instaladas
```bash
# Limpe o cache e reinstale
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 📄 Licença

Projeto privado

## 👨‍💻 Contribuição

Para contribuir ao projeto:

1. Crie uma nova branch para sua feature
2. Faça suas alterações
3. Commit com mensagens claras
4. Abra um Pull Request

---

Para mais informações ou dúvidas, entre em contato com o time de desenvolvimento.
