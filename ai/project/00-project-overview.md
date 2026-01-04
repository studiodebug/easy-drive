# 🚗 EasyDrive - Visão Geral do Projeto

> Plataforma para conectar instrutores de direção com alunos

---

## 📋 O que é o EasyDrive

EasyDrive é uma plataforma web que conecta **pessoas que querem aprender a dirigir** com **instrutores de direção certificados**, oferecendo:

- Busca de instrutores por localização, tipo de veículo e especialidades
- Agendamento de aulas práticas
- Sistema de avaliações e reputação
- Gerenciamento de perfis de instrutores e alunos
- Pagamentos e histórico de aulas

---

## 🎯 Objetivos do Projeto

### Problema Resolvido

- **Alunos**: Dificuldade em encontrar instrutores confiáveis e disponíveis
- **Instrutores**: Falta de visibilidade e gestão de agendamentos

### Solução

Uma plataforma centralizada que:

1. Conecta instrutores verificados com alunos
2. Facilita agendamento e pagamento
3. Constrói confiança através de avaliações
4. Oferece ferramentas de gestão para ambos os lados

---

## 👥 Personas

### 1. Aluno (Learner)

**Necessidades**:

- Encontrar instrutor próximo
- Ver disponibilidade e preços
- Agendar aulas facilmente
- Avaliar experiência
- Acompanhar progresso

**Funcionalidades**:

- Busca e filtros de instrutores
- Agendamento de aulas
- Histórico de aulas
- Sistema de avaliações
- Perfil pessoal

### 2. Instrutor (Instructor)

**Necessidades**:

- Divulgar serviços
- Gerenciar disponibilidade
- Receber agendamentos
- Construir reputação
- Gerenciar faturamento

**Funcionalidades**:

- Perfil profissional
- Gestão de disponibilidade
- Recebimento de solicitações
- Dashboard de aulas
- Gestão financeira

### 3. Administrador (Admin)

**Necessidades**:

- Verificar instrutores
- Moderar plataforma
- Suporte a usuários
- Analytics e métricas

**Funcionalidades**:

- Painel administrativo
- Verificação de documentos
- Moderação de conteúdo
- Relatórios e analytics

---

## 🏗️ Stack Tecnológica

### Frontend

- **Framework**: Next.js 14+ (App Router)
- **Linguagem**: TypeScript (Strict Mode)
- **Estilização**: Tailwind CSS v4
- **UI Components**: RetroUI (custom design system)
- **Validação**: Zod
- **Data Fetching**: Server Actions + React Query (quando necessário)
- **Ícones**: Lucide React

### Backend

- **Runtime**: Next.js Server Actions + API Routes (webhooks, cron)
- **Database**: Supabase (PostgreSQL)
- **Autenticação**: Supabase Auth
- **Validação**: Zod
- **Pagamentos**: Stripe (futuro)

### DevOps & Tools

- **Versionamento**: Git + GitHub
- **Deploy**: Vercel
- **Database Management**: Supabase CLI (declarative schemas)
- **Testes**: Vitest + Playwright (futuro)

---

## 🗂️ Principais Features

### MVP (Minimum Viable Product)

1. **Autenticação**

   - Registro de alunos e instrutores
   - Login/Logout
   - Recuperação de senha
   - Perfis básicos

2. **Instrutores**

   - Listagem pública
   - Perfil detalhado
   - Busca e filtros (cidade, tipo de veículo)
   - Sistema de verificação

3. **Aulas**

   - Solicitação de aula
   - Aprovação/rejeição
   - Histórico
   - Status tracking

4. **Avaliações**
   - Avaliar instrutor após aula
   - Sistema de estrelas e comentários
   - Visualização de avaliações

### Post-MVP

5. **Agendamento Avançado**

   - Calendário interativo
   - Disponibilidade real-time
   - Recorrência de aulas

6. **Pagamentos**

   - Integração Stripe
   - Pagamento na plataforma
   - Histórico financeiro

7. **Comunicação**

   - Chat aluno-instrutor
   - Notificações em tempo real
   - Lembretes automáticos

8. **Analytics**
   - Dashboard para instrutores
   - Progresso do aluno
   - Relatórios de desempenho

---

## 📊 Modelo de Dados Principal

```
Usuario (User)
├── id
├── email
├── senha (hash)
├── nome
├── role (ALUNO | INSTRUTOR | ADMIN)
└── createdAt

Instrutor (Instructor)
├── id
├── userId (FK)
├── bio
├── telefone
├── cpf
├── cidade
├── estado
├── verificado
├── preçoPorHora
├── rating (média)
├── totalAulas
└── veiculo
    ├── tipo (MANUAL | AUTOMATICO)
    ├── modelo
    └── ano

Aula (Lesson)
├── id
├── instrutorId (FK)
├── alunoId (FK)
├── dataHoraInicio
├── dataHoraFim
├── status (PENDENTE | CONFIRMADA | CONCLUIDA | CANCELADA)
├── localizacao
├── objetivos []
├── observacoes
└── preço

Avaliacao (Review)
├── id
├── instrutorId (FK)
├── usuarioId (FK)
├── rating (1-5)
├── comentario
└── createdAt

Disponibilidade (Availability)
├── id
├── instrutorId (FK)
├── diaDaSemana (0-6)
├── horaInicio
├── horaFim
└── reservado
```

---

## 🎨 Design System

### RetroUI

Sistema de componentes com visual retrô/nostálgico:

- **Cores**: Amarelo primário (#ffdb33), preto/branco base
- **Estilo**: Sombras sólidas, bordas definidas (2px)
- **Tipografia**: Archivo Black (headings) + Space Grotesk (body)
- **Componentes**: 30+ componentes prontos

**Exemplos**:

- Botões com sombra sólida que se move ao clicar
- Cards com bordas grossas
- Inputs com estilo "brutalist"

---

## 🔐 Segurança

### Implementações Críticas

1. **DTOs (Data Transfer Objects)**

   - Nunca expor entidades do banco diretamente
   - DTOs públicos (menos dados) vs privados (mais dados)
   - Máscaras para dados sensíveis (CPF, telefone)

2. **Autenticação**

   - JWT tokens
   - Refresh tokens
   - Middleware de autenticação em todas as rotas protegidas

3. **Autorização**

   - RBAC (Role-Based Access Control)
   - Verificação de ownership (usuário só acessa seus dados)
   - Admin tem acesso total

4. **Rate Limiting**

   - Limites diferentes por tipo de endpoint
   - Auth endpoints mais restritivos (5 req/min)
   - API geral moderado (100 req/min)

5. **Validação**

   - Validação de entrada com Zod em TODAS as APIs
   - Sanitização de dados
   - Validação de CPF, telefone, etc.

6. **HTTPS** em produção

---

## 🌍 Fluxos Principais

### Fluxo 1: Aluno Busca Instrutor

```
1. Aluno acessa página de busca
2. Aplica filtros (cidade, tipo de veículo)
3. Visualiza lista de instrutores disponíveis
4. Clica em instrutor para ver perfil detalhado
5. Vê avaliações, disponibilidade, preço
6. Solicita aula
7. Aguarda confirmação do instrutor
8. Recebe notificação de confirmação
9. Realiza a aula
10. Avalia o instrutor
```

### Fluxo 2: Instrutor Recebe Solicitação

```
1. Instrutor recebe notificação de nova solicitação
2. Acessa dashboard
3. Vê detalhes da solicitação
4. Verifica disponibilidade
5. Aprova ou rejeita
6. Se aprovada, aguarda aluno no horário
7. Após aula, marca como concluída
8. Recebe avaliação do aluno
```

### Fluxo 3: Cadastro de Instrutor

```
1. Usuário cria conta como "Instrutor"
2. Preenche formulário detalhado
   - Dados pessoais
   - Informações do veículo
   - Documentos (CNH, etc)
   - Disponibilidade
3. Envia para verificação
4. Admin analisa documentos
5. Admin aprova ou rejeita
6. Se aprovado, perfil fica ativo e visível
```

---

## 📱 Páginas Principais

### Públicas (Não autenticadas)

- `/` - Landing page
- `/auth/login` - Login
- `/auth/sign-up` - Registro
- `/auth/forgot-password` - Recuperação de senha

### Aluno/Instrutor Autenticado

- `/dashboard` - Dashboard (dinâmico por role)
- `/instructors` - Busca de instrutores
- `/instructors/[id]` - Perfil do instrutor
- `/lessons` - Minhas aulas
- `/lessons/[id]` - Detalhes da aula
- `/profile` - Meu perfil

---

## 🎯 Métricas de Sucesso

### Produto

- Número de instrutores ativos
- Número de alunos cadastrados
- Aulas agendadas por mês
- Taxa de conclusão de aulas
- NPS (Net Promoter Score)

### Técnicas

- Tempo de carregamento < 2s
- API response time < 200ms (p95)
- Uptime > 99.5%
- Zero vazamentos de dados

---

## 🚀 Roadmap

### Fase 1: MVP (3-4 semanas)

- Autenticação
- Perfis básicos
- Listagem e busca de instrutores
- Solicitação de aulas
- Avaliações

### Fase 2: Melhorias UX (2 semanas)

- Calendário interativo
- Filtros avançados
- Notificações email
- Dashboard melhorado

### Fase 3: Pagamentos (2 semanas)

- Integração Stripe
- Carteira digital
- Histórico financeiro

### Fase 4: Comunicação (2 semanas)

- Chat em tempo real
- Push notifications
- Lembretes automáticos

---

## 📞 Glossário

| Termo                | Significado                            |
| -------------------- | -------------------------------------- |
| Aluno/Learner        | Pessoa que quer aprender a dirigir     |
| Instrutor/Instructor | Professor de direção certificado       |
| Aula/Lesson          | Sessão de ensino de direção            |
| Slot                 | Horário disponível para aula           |
| Verificado           | Instrutor com documentos aprovados     |
| Rating               | Nota média do instrutor (1-5 estrelas) |

---

## ⚠️ Avisos Importantes

### Para AIs Implementando

1. **SEMPRE use DTOs** - Nunca exponha entities do banco
2. **SEMPRE valide** - Use Zod em toda entrada de dados
3. **SEMPRE autentique** - Proteja rotas sensíveis
4. **SEMPRE use transactions** - Para operações que alteram múltiplas tabelas
5. **SEMPRE teste** - Código sem testes não é código completo

### Dados Sensíveis

Nunca exponha em APIs públicas:

- Senhas (nem hash)
- CPF completo
- Telefone completo (pode mascarar)
- Emails de outros usuários
- Dados financeiros detalhados
- Tokens de autenticação

---

## 🔗 Próximos Passos

Depois de ler este documento:

1. Leia [`architecture.md`](architecture.md) - Arquitetura detalhada e estrutura do código
2. Consulte [`../general-rules/`](../general-rules/) - Todas as regras e convenções de código
3. Explore componentes em [`../../components/retroui/`](../../components/retroui/) - Catálogo de componentes disponíveis
4. Leia [`../libs/supabase-declarative-database-schema.md`](../libs/supabase-declarative-database-schema.md) - Se precisar modificar o database

---

**Última atualização**: 2026-01-04
