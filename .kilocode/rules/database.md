# 🗄️ Regras de Banco de Dados

Este arquivo define as regras OBRIGATÓRIAS para alterações no banco de dados Supabase.

## 🚨 Workflow Declarativo (OBRIGATÓRIO)

O EasyDrive utiliza um **workflow declarativo** para gerenciar o schema do banco de dados.

### Regras Absolutas

- ❌ **NUNCA** crie migrations manualmente em `supabase/migrations/`
- ❌ **NUNCA** edite migrations existentes
- ✅ **SEMPRE** crie/edite schemas em `supabase/schemas/`
- ✅ **SEMPRE** use `supabase db diff` para gerar migrations
- ✅ **SEMPRE** consulte [`./ai/supabase-declarative-database-schema.md`](./ai/supabase-declarative-database-schema.md) antes de qualquer alteração

## 📚 Documentação Completa

**LEIA ANTES de qualquer alteração no banco de dados:**

- [`./ai/supabase-declarative-database-schema.md`](./ai/supabase-declarative-database-schema.md) - Workflow declarativo completo (5 passos)
- [`./ai/supabase-create-migration.md`](./ai/supabase-create-migration.md) - Guia de criação de migrations
- [`./ai/supabase-postgres.md`](./ai/supabase-postgres.md) - Referência PostgreSQL

## 🔒 Row Level Security (RLS)

**TODAS as tabelas DEVEM ter RLS habilitado.**

Detalhes completos em [`./ai/supabase-declarative-database-schema.md`](./ai/supabase-declarative-database-schema.md)

## ⚠️ Lembrete

**ANTES** de qualquer alteração no banco de dados:

1. ✅ Leia [`./ai/supabase-declarative-database-schema.md`](./ai/supabase-declarative-database-schema.md)
2. ✅ Crie/edite em `supabase/schemas/`
3. ✅ Use `supabase db diff` para gerar migration
4. ✅ Revise e teste com `supabase db reset`
5. ✅ NUNCA edite `supabase/migrations/` manualmente
