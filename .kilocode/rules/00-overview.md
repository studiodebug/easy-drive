# 📋 Visão Geral do Projeto EasyDrive

## Sobre o Projeto

**EasyDrive** é uma plataforma de gerenciamento de autoescola desenvolvida com Next.js 14+, TypeScript e Supabase. O sistema permite que alunos, instrutores e administradores gerenciem aulas, agendamentos e progresso de formação.

## 📚 Documentação Principal (Fonte Única da Verdade)

**SEMPRE consulte a documentação completa antes de qualquer alteração:**

1. **[`./ai/AI-GUIDE.md`](./ai/AI-GUIDE.md)** - GUIA MESTRE com instruções completas
2. **[`./ai/00-project-overview.md`](./ai/00-project-overview.md)** - Contexto detalhado do projeto
3. **[`./ai/supabase-declarative-database-schema.md`](./ai/supabase-declarative-database-schema.md)** - Workflow OBRIGATÓRIO para banco de dados
4. **[`./ai/supabase-create-migration.md`](./ai/supabase-create-migration.md)** - Diretrizes de migração

## 🎯 Papéis de Usuário

O sistema possui três tipos de usuário:

- **Aluno**: Estudante de direção que agenda aulas e acompanha seu progresso
- **Instrutor**: Instrutor certificado que ministra aulas e avalia alunos
- **Admin**: Administrador da plataforma com acesso total ao sistema

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Linguagem**: TypeScript (Strict Mode)
- **Estilo**: Tailwind CSS v4 + RetroUI Design System
- **Banco de Dados**: Supabase (PostgreSQL)
- **Validação**: Zod
- **Data Fetching**: React Query
- **Autenticação**: Supabase Auth

## 🗂️ Path Aliases

O projeto utiliza os seguintes aliases para importações:

```typescript
"@/*"           → "./"
"@features/*"   → "./features/*"
"@components/*" → "./components/*"
"@lib/*"        → "./lib/*"
```

## 🔗 Links Importantes

- **Documentação Completa**: [`./ai/AI-GUIDE.md`](./ai/AI-GUIDE.md)
- **Visão Geral**: [`./ai/00-project-overview.md`](./ai/00-project-overview.md)
- **Workflow Supabase**: [`./ai/supabase-declarative-database-schema.md`](./ai/supabase-declarative-database-schema.md)
- **Migrations**: [`./ai/supabase-create-migration.md`](./ai/supabase-create-migration.md)

## ⚠️ Lembrete

A documentação em [`./ai/`](./ai/) é a FONTE ÚNICA DA VERDADE. Em caso de dúvida, SEMPRE consulte primeiro.
