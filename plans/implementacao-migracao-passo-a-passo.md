# 📋 Plano de Implementação: Migração da Arquitetura - Passo a Passo

## 🎯 Objetivo

Migrar a arquitetura atual (feature-based) para a nova arquitetura simplificada (route-based) seguindo os padrões do Next.js 14+ App Router.

## ⚠️ Pré-requisitos

Antes de iniciar:

- ✅ Arquitetura finalizada e documentada
- ✅ Review técnica aprovada (nota 4.6/5)
- ✅ Planos criados e documentados
- ⏳ Commit atual do projeto (segurança para rollback)

## 📝 Fases da Migração

### Fase 0: Preparação e Backup ✅

**Checklist:**

- [x] Criar plano de migração detalhado (este documento)
- [ ] Criar branch de migração: `feat/architecture-refactor`
- [ ] Commit estado atual: "chore: checkpoint before architecture migration"
- [ ] Backup do projeto (opcional mas recomendado)
- [ ] Revisar docs: [`ai/project/architecture-simplified.md`](../ai/project/architecture-simplified.md)

**Comandos:**

```bash
# Criar branch
git checkout -b feat/architecture-refactor

# Commit atual
git add .
git commit -m "chore: checkpoint before architecture migration"

# (Opcional) Backup
tar -czf ../easy-drive-backup-$(date +%Y%m%d).tar.gz .
```

---

### Fase 1: Renomeação `lib/` → `shared/` 📦

**Objetivo:** Aplicar mudança semântica conforme documentado em [`plans/nota-renomeacao-lib-para-shared.md`](nota-renomeacao-lib-para-shared.md)

**Passos:**

#### 1.1 Renomear Pasta

```bash
mv lib shared
```

#### 1.2 Atualizar `tsconfig.json`

**Antes:**

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**Depois:**

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@shared/*": ["./shared/*"]
    }
  }
}
```

#### 1.3 Atualizar Imports em Arquivos TS/TSX

**Buscar e substituir:**

- `@/lib/` → `@/shared/`
- `from "@/lib` → `from "@/shared`
- `"@/lib/` → `"@/shared/`

**Comando automatizado:**

```bash
# Atualizar imports em TypeScript/TSX
find . -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -not -path "./node_modules/*" \
  -not -path "./.next/*" \
  -not -path "./supabase/*" \
  -exec sed -i '' 's|@/lib/|@/shared/|g' {} +

# Verificar mudanças
git diff
```

#### 1.4 Atualizar Documentação

**Arquivos a atualizar:**

- `ai/project/architecture-simplified.md`
- `ai/README.md` (se houver referências a lib/)
- `README.md` (se houver referências a lib/)

**Comandos:**

```bash
# Atualizar documentação
find ./ai -type f -name "*.md" \
  -exec sed -i '' 's|@/lib/|@/shared/|g' {} +

find ./ai -type f -name "*.md" \
  -exec sed -i '' 's|lib/|shared/|g' {} +
```

#### 1.5 Verificar Build

```bash
# Limpar cache
rm -rf .next

# Build de verificação
pnpm build
```

**Checklist Fase 1:**

- [ ] Pasta `lib/` renomeada para `shared/`
- [ ] `tsconfig.json` atualizado com path alias `@shared/*`
- [ ] Todos imports `.ts`/`.tsx` atualizados
- [ ] Documentação atualizada
- [ ] `pnpm build` passou sem erros
- [ ] Commit: "refactor: rename lib/ to shared/"

---

### Fase 2: Renomear Route Groups 🎯

**Objetivo:** Aplicar nomenclatura mais clara: `(marketing)` → `(public)`, `(app)` → `(authenticated)`

**Passos:**

#### 2.1 Renomear `app/(marketing)/` → `app/(public)/`

```bash
mv app/\(marketing\) app/\(public\)
```

#### 2.2 Renomear `app/(app)/` → `app/(authenticated)/`

```bash
mv app/\(app\) app/\(authenticated\)
```

#### 2.3 Atualizar Imports/Referencias

Buscar e substituir em todo projeto:

- `(marketing)` → `(public)`
- `(app)` → `(authenticated)`
- `from "(app)` → `from "(authenticated)`

**Comandos:**

```bash
# Buscar referências
rg "\(marketing\)" --type ts --type tsx
rg "\(app\)" --type ts --type tsx

# Atualizar se necessário (geralmente o Next.js não precisa)
# Route groups não afetam imports diretamente
```

#### 2.4 Atualizar Layouts

Verificar e atualizar se houver referências hardcoded:

- `app/(public)/layout.tsx`
- `app/(authenticated)/layout.tsx`

#### 2.5 Verificar Build

```bash
pnpm build
```

**Checklist Fase 2:**

- [ ] `app/(marketing)/` renomeado para `app/(public)/`
- [ ] `app/(app)/` renomeado para `app/(authenticated)/`
- [ ] Layouts verificados
- [ ] `pnpm build` passou sem erros
- [ ] Commit: "refactor: rename route groups for clarity"

---

### Fase 3: Criar Estrutura Base de `_hooks/` 🪝

**Objetivo:** Adicionar pasta `_hooks/` em rotas principais conforme documentação

**Rotas a adicionar:**

```
app/(public)/
  └── _hooks/          # Criar

app/(authenticated)/dashboard/
  └── _hooks/          # Criar

app/(authenticated)/profile/
  └── _hooks/          # Criar

app/(authenticated)/instructors/
  └── _hooks/          # Criar

app/(authenticated)/lessons/
  └── _hooks/          # Criar

app/auth/login/
  └── _hooks/          # Criar
```

**Comando:**

```bash
mkdir -p app/\(public\)/_hooks
mkdir -p app/\(authenticated\)/dashboard/_hooks
mkdir -p app/\(authenticated\)/profile/_hooks
mkdir -p app/\(authenticated\)/instructors/_hooks
mkdir -p app/\(authenticated\)/lessons/_hooks
mkdir -p app/auth/login/_hooks
mkdir -p app/auth/sign-up/_hooks

# Criar .gitkeep para manter pastas vazias no git
touch app/\(public\)/_hooks/.gitkeep
touch app/\(authenticated\)/dashboard/_hooks/.gitkeep
touch app/\(authenticated\)/profile/_hooks/.gitkeep
touch app/\(authenticated\)/instructors/_hooks/.gitkeep
touch app/\(authenticated\)/lessons/_hooks/.gitkeep
touch app/auth/login/_hooks/.gitkeep
touch app/auth/sign-up/_hooks/.gitkeep
```

**Checklist Fase 3:**

- [ ] Pastas `_hooks/` criadas
- [ ] `.gitkeep` adicionados
- [ ] Commit: "feat: add \_hooks/ structure for logic separation"

---

### Fase 4: Criar `loading.tsx` nas Rotas 🔄

**Objetivo:** Adicionar `loading.tsx` para Suspense automático

**Rotas a adicionar:**

- `app/(public)/loading.tsx`
- `app/(public)/about/loading.tsx`
- `app/(authenticated)/dashboard/loading.tsx`
- `app/(authenticated)/profile/loading.tsx`
- `app/(authenticated)/instructors/loading.tsx`
- `app/(authenticated)/instructors/[id]/loading.tsx`
- `app/(authenticated)/lessons/loading.tsx`

**Template de `loading.tsx`:**

```typescript
// app/(authenticated)/dashboard/loading.tsx
import { Loader } from "@/components/retroui/Loader";

export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader size="lg" />
    </div>
  );
}
```

**Ou com Skeleton:**

```typescript
// app/(authenticated)/profile/loading.tsx
export default function ProfileLoading() {
  return (
    <div className="container mx-auto py-8">
      <div className="h-32 w-full bg-gray-200 animate-pulse rounded mb-8" />
      <div className="grid grid-cols-2 gap-8">
        <div className="h-96 bg-gray-200 animate-pulse rounded" />
        <div className="h-96 bg-gray-200 animate-pulse rounded" />
      </div>
    </div>
  );
}
```

**Checklist Fase 4:**

- [ ] `loading.tsx` criados em rotas principais
- [ ] Loading states testados (simular delay)
- [ ] Commit: "feat: add loading states with Suspense"

---

### Fase 5: Migrar Feature `marketing` → `app/(public)/` 🌐

**Objetivo:** Primeira migração simples para validar padrão

**Estado atual:**

```
features/marketing/
  └── (provavelmente vazio ou poucos arquivos)

app/(public)/
  └── page.tsx (já existe)
```

**Passos:**

#### 5.1 Verificar conteúdo de `features/marketing/`

```bash
ls -la features/marketing/
```

#### 5.2 Mover componentes se existirem

```bash
# Se houver componentes
cp -r features/marketing/components/* app/\(public\)/_components/ 2>/dev/null || true
```

#### 5.3 Atualizar imports em `app/(public)/page.tsx`

#### 5.4 Testar

```bash
pnpm dev
# Acessar http://localhost:3000
```

#### 5.5 Remover `features/marketing/`

```bash
rm -rf features/marketing/
```

**Checklist Fase 5:**

- [ ] Componentes movidos (se existirem)
- [ ] Imports atualizados
- [ ] Landing page testada e funcionando
- [ ] `features/marketing/` removido
- [ ] Commit: "refactor: migrate marketing feature to (public) route"

---

### Fase 6: Migrar Feature `auth` → `app/auth/_components/` 🔑

**Objetivo:** Migrar componentes de autenticação

**Estado atual:**

```
features/auth/
  ├── components/
  │   ├── client/
  │   │   ├── ForgotPasswordForm.tsx
  │   │   ├── LoginForm.tsx
  │   │   ├── LogoutButton.tsx
  │   │   ├── SignUpForm.tsx
  │   │   └── UpdatePasswordForm.tsx
  │   └── server/
  │       └── AuthButton.tsx
  ├── types/
  │   └── auth.types.ts
  └── validations/
      └── auth.schema.ts

components/supabase/
  ├── auth-button.tsx
  ├── forgot-password-form.tsx
  ├── login-form.tsx
  ├── logout-button.tsx
  ├── sign-up-form.tsx
  └── update-password-form.tsx
```

**Destino:**

```
app/auth/
  ├── _components/       # ← Mover tudo aqui
  │   ├── ForgotPasswordForm.tsx
  │   ├── LoginForm.tsx
  │   ├── LogoutButton.tsx
  │   ├── SignUpForm.tsx
  │   ├── UpdatePasswordForm.tsx
  │   └── AuthButton.tsx
  └── _hooks/            # ← Criar se necessário

shared/validations/
  └── auth.ts            # ← Mover auth.schema.ts (renomear)

shared/types/
  └── auth.ts            # ← Mover auth.types.ts (renomear)
```

**Passos:**

#### 6.1 Criar estrutura

```bash
mkdir -p app/auth/_components
mkdir -p app/auth/_hooks
```

#### 6.2 Mover componentes de `features/auth/`

```bash
# Mover client components
cp features/auth/components/client/*.tsx app/auth/_components/

# Mover server components
cp features/auth/components/server/*.tsx app/auth/_components/
```

#### 6.3 Consolidar com `components/supabase/`

Decidir qual versão manter (provavelmente `components/supabase/` está mais atualizada):

```bash
# Mover de components/supabase para app/auth/_components
mv components/supabase/login-form.tsx app/auth/_components/LoginForm.tsx
mv components/supabase/sign-up-form.tsx app/auth/_components/SignUpForm.tsx
mv components/supabase/forgot-password-form.tsx app/auth/_components/ForgotPasswordForm.tsx
mv components/supabase/update-password-form.tsx app/auth/_components/UpdatePasswordForm.tsx
mv components/supabase/logout-button.tsx app/auth/_components/LogoutButton.tsx
mv components/supabase/auth-button.tsx app/auth/_components/AuthButton.tsx
```

#### 6.4 Mover validações e types para `shared/`

```bash
# Validations
mkdir -p shared/validations
cp features/auth/validations/auth.schema.ts shared/validations/auth.ts

# Types
mkdir -p shared/types
cp features/auth/types/auth.types.ts shared/types/auth.ts
```

#### 6.5 Atualizar imports

Buscar em `app/auth/`:

- `@/features/auth/` → `./` ou `@/shared/`
- `@/components/supabase/` → `./_components/`

#### 6.6 Atualizar páginas de auth

Atualizar:

- `app/auth/login/page.tsx`
- `app/auth/sign-up/page.tsx`
- `app/auth/forgot-password/page.tsx`
- `app/auth/update-password/page.tsx`

Exemplo:

```typescript
// app/auth/login/page.tsx
// Antes:
import { LoginForm } from "@/components/supabase/login-form";

// Depois:
import { LoginForm } from "../_components/LoginForm";
```

#### 6.7 Remover pastas antigas

```bash
rm -rf features/auth/
rm -rf components/supabase/
```

**Checklist Fase 6:**

- [ ] Componentes movidos para `app/auth/_components/`
- [ ] Validações em `shared/validations/auth.ts`
- [ ] Types em `shared/types/auth.ts`
- [ ] Imports atualizados em páginas de auth
- [ ] Páginas de auth testadas (login, sign-up, etc)
- [ ] `features/auth/` removido
- [ ] `components/supabase/` removido
- [ ] Commit: "refactor: migrate auth feature to app/auth structure"

---

### Fase 7: Migrar Feature `users` → `shared/` + `app/(authenticated)/profile/` 👤

**Objetivo:** Migrar DTOs/validations compartilhados e componentes específicos de perfil

**Estado atual:**

```
features/users/
  ├── components/
  │   ├── client/
  │   │   └── UserMeApiRequest.tsx
  │   └── server/
  ├── dtos/
  │   └── user.dto.ts
  ├── entities/
  │   └── user.entity.ts
  ├── services/
  │   └── user.service.ts
  ├── types/
  │   └── user.types.ts
  └── validations/
      └── user.schema.ts
```

**Destino:**

```
shared/
  ├── dtos/
  │   └── user.dto.ts          # ← Mover (compartilhado)
  ├── validations/
  │   └── user.ts              # ← Mover user.schema.ts
  └── types/
      └── user.ts              # ← Mover user.types.ts (se necessário)

app/(authenticated)/profile/
  ├── _components/
  │   └── UserMeApiRequest.tsx # ← Mover (específico)
  ├── _hooks/
  ├── _actions.ts              # ← Converter user.service.ts
  └── _types.ts                # ← Types locais (se necessário)
```

**Passos:**

#### 7.1 Mover DTOs

```bash
cp features/users/dtos/user.dto.ts shared/dtos/
```

#### 7.2 Mover Validations

```bash
cp features/users/validations/user.schema.ts shared/validations/user.ts
```

#### 7.3 Verificar necessity de Types

Se `user.types.ts` é usado apenas internamente, mover para `app/(authenticated)/profile/_types.ts`.
Se é compartilhado, mover para `shared/types/user.ts`.

#### 7.4 Converter Services → Server Actions

Criar `app/(authenticated)/profile/_actions.ts`:

```typescript
// app/(authenticated)/profile/_actions.ts
"use server";

import { createClient } from "@/shared/supabase/server";
import { toUserPublicDTO, toUserPrivateDTO } from "@/shared/dtos/user.dto";
import { updateProfileSchema } from "@/shared/validations/user";
import { revalidatePath } from "next/cache";

export async function getCurrentUserProfile() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) throw new Error("Not authenticated");

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", authUser.id)
    .single();

  return toUserPrivateDTO(data);
}

export async function updateCurrentUser(formData: FormData) {
  const rawData = Object.fromEntries(formData);
  const validated = updateProfileSchema.parse(rawData);

  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("users")
    .update(validated)
    .eq("id", authUser.id)
    .select()
    .single();

  if (error) throw error;

  revalidatePath("/profile");
  return toUserPublicDTO(data);
}
```

#### 7.5 Mover componentes

```bash
mkdir -p app/\(authenticated\)/profile/_components
cp features/users/components/client/UserMeApiRequest.tsx app/\(authenticated\)/profile/_components/
```

#### 7.6 Atualizar imports em `app/api/users/me/route.ts`

Se este endpoint usa services de `features/users/`, atualizar para usar `shared/dtos/`.

#### 7.7 Atualizar `app/(authenticated)/dashboard/page.tsx`

Onde usa `UserMeApiRequest`:

```typescript
// Antes:
import { UserMeApiRequest } from "@/features/users/components/client/UserMeApiRequest";

// Depois:
import { UserMeApiRequest } from "../profile/_components/UserMeApiRequest";
// Ou se for compartilhado, mover para components/shared/
```

#### 7.8 Remover `features/users/`

```bash
rm -rf features/users/
```

**Checklist Fase 7:**

- [ ] DTOs movidos para `shared/dtos/user.dto.ts`
- [ ] Validations em `shared/validations/user.ts`
- [ ] Services convertidos em `app/(authenticated)/profile/_actions.ts`
- [ ] Componentes movidos
- [ ] Imports atualizados (`app/api/users/`, `app/(authenticated)/dashboard/`)
- [ ] Endpoint `/api/users/me` funcionando
- [ ] Dashboard funcionando
- [ ] `features/users/` removido
- [ ] Commit: "refactor: migrate users feature - DTOs to shared, profile to route"

---

### Fase 8: Migrar Features Restantes (Instructors, Lessons, etc) 📚

**Objetivo:** Aplicar mesmo padrão para features restantes

**Features a migrar:**

- `features/instructors/` → `app/(authenticated)/instructors/`
- `features/lessons/` → `app/(authenticated)/lessons/`
- `features/availability/` → `app/(authenticated)/availability/` ou `shared/`
- `features/reviews/` → `app/(authenticated)/reviews/` ou `shared/`
- `features/addresses/` → `shared/` (provavelmente)

**Padrão para cada feature:**

#### Passo 1: Análise

```bash
ls -la features/[feature-name]/
```

#### Passo 2: Decisão

**Compartilhado (`shared/`):**

- DTOs usados em múltiplos lugares
- Validations usadas por múltiplas features
- Types globais
- Utilities/helpers

**Específico de rota (`app/(authenticated)/[route]/`):**

- Componentes usados só naquela rota
- Page components
- Server Actions específicos
- Hooks específicos

#### Passo 3: Mover

```bash
# DTOs compartilhados
cp features/[feature]/dtos/*.dto.ts shared/dtos/

# Validations
cp features/[feature]/validations/*.schema.ts shared/validations/[feature].ts

# Componentes para rota
mkdir -p app/\(authenticated\)/[route]/_components
cp -r features/[feature]/components/* app/\(authenticated\)/[route]/_components/

# Converter services → actions
# Criar app/(authenticated)/[route]/_actions.ts manualmente
```

#### Passo 4: Atualizar Imports

#### Passo 5: Testar

#### Passo 6: Remover

```bash
rm -rf features/[feature]/
```

**Checklist por Feature:**

**features/instructors/**

- [ ] DTOs → `shared/dtos/instructor.dto.ts`
- [ ] Validations → `shared/validations/instructor.ts`
- [ ] Components → `app/(authenticated)/instructors/_components/`
- [ ] Services → `app/(authenticated)/instructors/_actions.ts`
- [ ] API routes verificadas (`app/api/instructors/`)
- [ ] Página `/instructors` testada
- [ ] Removido: `features/instructors/`
- [ ] Commit: "refactor: migrate instructors feature"

**features/lessons/**

- [ ] DTOs → `shared/dtos/lesson.dto.ts`
- [ ] Validations → `shared/validations/lesson.ts`
- [ ] Components → `app/(authenticated)/lessons/_components/`
- [ ] Services → `app/(authenticated)/lessons/_actions.ts`
- [ ] API routes verificadas
- [ ] Página `/lessons` testada
- [ ] Removido: `features/lessons/`
- [ ] Commit: "refactor: migrate lessons feature"

**features/availability/**

- [ ] DTOs → `shared/dtos/availability.dto.ts`
- [ ] Validations → `shared/validations/availability.ts`
- [ ] Components (se houver) → rota apropriada
- [ ] API routes verificadas
- [ ] Removido: `features/availability/`
- [ ] Commit: "refactor: migrate availability feature"

**features/reviews/**

- [ ] DTOs → `shared/dtos/review.dto.ts`
- [ ] Validations → `shared/validations/review.ts`
- [ ] Components → rota apropriada
- [ ] API routes verificadas
- [ ] Removido: `features/reviews/`
- [ ] Commit: "refactor: migrate reviews feature"

**features/addresses/**

- [ ] DTOs → `shared/dtos/address.dto.ts`
- [ ] Entidades verificadas
- [ ] Removido: `features/addresses/`
- [ ] Commit: "refactor: migrate addresses feature"

---

### Fase 9: Limpar `app/api/` - Consolidar ou Remover 🔌

**Objetivo:** Revisar API Routes e migrar para Server Actions quando possível

**API Routes atuais:**

```
app/api/
  ├── auth/sync-user/
  ├── availability/
  ├── instructors/
  ├── lessons/
  ├── reviews/
  └── users/
```

**Decisão por rota:**

#### API Routes a MANTER:

- `app/api/auth/sync-user/` - Webhook (ok manter)
- Outros webhooks externos

#### API Routes a CONSIDERAR REMOVER:

Se não são webhooks e são usados apenas internamente, migrar para Server Actions:

- `app/api/availability/` → `app/(authenticated)/availability/_actions.ts`
- `app/api/instructors/` → `app/(authenticated)/instructors/_actions.ts`
- `app/api/lessons/` → `app/(authenticated)/lessons/_actions.ts`
- `app/api/reviews/` → `app/(authenticated)/reviews/_actions.ts`
- `app/api/users/` → `app/(authenticated)/profile/_actions.ts`

**Passos:**

#### 9.1 Identificar uso de cada API Route

```bash
# Buscar referências
rg "/api/availability" --type ts --type tsx
rg "/api/instructors" --type ts --type tsx
rg "/api/lessons" --type ts --type tsx
```

#### 9.2 Para cada rota usada APENAS internamente:

**Converter para Server Action:**

```typescript
// Antes (app/api/instructors/route.ts):
export async function GET() {
  const data = await getInstructors();
  return NextResponse.json(data);
}

// Depois (app/(authenticated)/instructors/_actions.ts):
("use server");
export async function getInstructors() {
  // mesma lógica
  return data; // Retorna direto, não JSON
}
```

#### 9.3 Atualizar componentes client que fazem fetch

```typescript
// Antes:
const response = await fetch("/api/instructors");
const data = await response.json();

// Depois:
import { getInstructors } from "./_actions";
const data = await getInstructors();
```

#### 9.4 Remover API routes desnecessárias

**Checklist Fase 9:**

- [ ] API routes identificadas (manter vs remover)
- [ ] Webhooks mantidos em `app/api/`
- [ ] Rotas internas migradas para Server Actions
- [ ] Components usando fetch atualizados
- [ ] `pnpm build` passou
- [ ] Commit: "refactor: migrate internal API routes to Server Actions"

---

### Fase 10: Remover Pasta `features/` 🗑️

**Objetivo:** Remover completamente a pasta `features/` após migração

**Verificação final:**

```bash
# Verificar se ainda há referências
rg "@/features" --type ts --type tsx
rg "from.*features" --type ts --type tsx

# Listar o que sobrou
ls -la features/
```

**Remover:**

```bash
rm -rf features/
```

**Checklist Fase 10:**

- [ ] Todas features migradas
- [ ] Zero referências a `@/features`
- [ ] Pasta `features/` removida
- [ ] `pnpm build` passou
- [ ] Commit: "refactor: remove features/ folder - migration complete"

---

### Fase 11: Remover Barrel Exports (`index.ts`) 📦

**Objetivo:** Simplificar imports removendo barrel exports desnecessários

**Locais para verificar:**

- `features/*/index.ts` (já removido com features/)
- Outros `index.ts` que exportam múltiplas coisas

**Filosofia:**

- ❌ Barrel exports (`index.ts` com re-exports)
- ✅ Imports diretos

**Exceções (pode manter):**

- `components/retroui/index.ts` (Design System)
- `shared/dtos/index.ts` (se facilitar muito)

**Checklist Fase 11:**

- [ ] Barrel exports revisados
- [ ] Removidos onde desnecessário
- [ ] Imports diretos atualizados
- [ ] Commit: "refactor: remove unnecessary barrel exports"

---

### Fase 12: Atualizar Documentação 📚

**Objetivo:** Sincronizar documentação com estado final

**Arquivos a atualizar:**

- [`ai/project/architecture.md`](../ai/project/architecture.md) - Marcar como obsoleto
- [`ai/README.md`](../ai/README.md) - Apontar para architecture-simplified.md
- [`README.md`](../README.md) - Atualizar se houver referências
- Remover referências a `features/` na documentação

**Passos:**

#### 12.1 Deprecar `architecture.md` antiga

Adicionar no topo:

```markdown
# ⚠️ DOCUMENTO OBSOLETO

Esta documentação foi substituída por [`architecture-simplified.md`](architecture-simplified.md).

**Mantenha este arquivo apenas para referência histórica.**
```

#### 12.2 Atualizar `ai/README.md`

Atualizar links para a nova arquitetura.

#### 12.3 Atualizar path aliases documentation

**Checklist Fase 12:**

- [ ] `ai/project/architecture.md` deprecado
- [ ] `ai/README.md` atualizado
- [ ] `README.md` atualizado (se necessário)
- [ ] Commit: "docs: update documentation for new architecture"

---

### Fase 13: Testes Finais e QA 🧪

**Objetivo:** Garantir que tudo funciona

**Checklist de Testes:**

#### Build e Type Check

```bash
# Clean build
rm -rf .next
pnpm build

# Type check
pnpm tsc --noEmit
```

- [ ] Build passou sem erros
- [ ] Zero erros de type
- [ ] Zero warnings críticos

#### Testes Funcionais

**Autenticação:**

- [ ] Login funcionando (`/auth/login`)
- [ ] Sign up funcionando (`/auth/sign-up`)
- [ ] Logout funcionando
- [ ] Forgot password funcionando (`/auth/forgot-password`)
- [ ] Update password funcionando (`/auth/update-password`)

**Landing Page:**

- [ ] Landing acessível (`/`)
- [ ] About page acessível (`/about` se existir)
- [ ] Sem erros no console

**Dashboard:**

- [ ] Dashboard carrega (`/dashboard`)
- [ ] Dados do usuário aparecem
- [ ] Sem erros no console

**Perfil:**

- [ ] Página de perfil carrega (`/profile`)
- [ ] Form de edição funciona
- [ ] Atualização de dados funciona

**Instrutores:**

- [ ] Lista de instrutores (`/instructors`)
- [ ] Detalhes de instrutor (`/instructors/[id]`)
- [ ] Loading states funcionando

**Aulas:**

- [ ] Lista de aulas (`/lessons`)
- [ ] Criar aula (`/lessons/new`)
- [ ] Detalhes de aula (`/lessons/[id]`)

#### Performance

```bash
pnpm dev
# Lighthouse no Chrome

```

- [ ] Performance > 70
- [ ] Accessibility > 90
- [ ] Best Practices > 80
- [ ] SEO > 80

#### Lint

```bash
pnpm lint
```

- [ ] Zero erros de lint (ou resolver)

**Checklist Fase 13:**

- [ ] Todos builds passaram
- [ ] Todos testes manuais ok
- [ ] Performance aceitável
- [ ] Lint passou
- [ ] Commit (se houver fixes): "fix: address QA findings"

---

### Fase 14: Merge e Deploy 🚀

**Objetivo:** Integrar mudanças e fazer deploy

**Passos:**

#### 14.1 Review do PR

```bash
# Ver todos commits
git log main..feat/architecture-refactor --oneline

# Criar PR
gh pr create --title "refactor: simplify architecture to Next.js App Router patterns" \
  --body "Migrates project from feature-based to route-based architecture following Next.js 14+ best practices."
```

#### 14.2 Code Review

- [ ] PR criado
- [ ] Código revisado
- [ ] Aprovações obtidas

#### 14.3 Merge

```bash
git checkout main
git merge feat/architecture-refactor
git push origin main
```

#### 14.4 Deploy

```bash
# Vercel (se configurado)
vercel --prod

# Ou deployment manual
```

#### 14.5 Verificação em Produção

- [ ] Deploy bem-sucedido
- [ ] Aplicação acessível
- [ ] Funcionalidade testada em prod

**Checklist Fase 14:**

- [ ] PR criado e aprovado
- [ ] Merged para `main`
- [ ] Deploy em produção
- [ ] Verificações pós-deploy ok

---

## 📊 Resumo por Fase

| Fase | Descrição                   | Estimativa | Status |
| ---- | --------------------------- | ---------- | ------ |
| 0    | Preparação e Backup         | 15min      | ⏳     |
| 1    | Renomear lib/ → shared/     | 30min      | ⏳     |
| 2    | Renomear Route Groups       | 15min      | ⏳     |
| 3    | Criar \_hooks/              | 10min      | ⏳     |
| 4    | Criar loading.tsx           | 20min      | ⏳     |
| 5    | Migrar marketing → (public) | 15min      | ⏳     |
| 6    | Migrar auth                 | 1h         | ⏳     |
| 7    | Migrar users                | 1h         | ⏳     |
| 8    | Migrar features restantes   | 3-4h       | ⏳     |
| 9    | Limpar app/api/             | 1-2h       | ⏳     |
| 10   | Remover features/           | 5min       | ⏳     |
| 11   | Remover barrel exports      | 30min      | ⏳     |
| 12   | Atualizar docs              | 30min      | ⏳     |
| 13   | Testes finais               | 1h         | ⏳     |
| 14   | Merge e Deploy              | 30min      | ⏳     |

**Total Estimado:** 10-12 horas

---

## 🚨 Troubleshooting

### Problema: Erro de build após renomear `lib/`

**Solução:**

```bash
# Limpar cache
rm -rf .next
rm -rf node_modules/.cache

# Rebuild
pnpm install
pnpm build
```

### Problema: Imports quebrados após mover arquivos

**Solução:**

Usar busca global no VSCode:

1. Cmd/Ctrl + Shift + F
2. Buscar pelo nome do arquivo movido
3. Atualizar imports manualmente

### Problema: Server Actions não funcionam

**Solução:**

Verificar:

1. `'use server'` no topo do arquivo `_actions.ts`
2. Funções são `async`
3. Não usa hooks (useState, useEffect) em Server Actions

### Problema: Loading estados não aparecem

**Solução:**

Testar com delay artificial:

```typescript
export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 2s delay
  // ...
}
```

---

## 📝 Notas Importantes

### Fazer Commits Frequentes

Commit após cada fase para facilitar rollback se necessário:

```bash
git add .
git commit -m "refactor(fase-X): [descrição]"
```

### Testar Constantemente

Após cada fase:

```bash
pnpm dev
# Teste manual
pnpm build
```

### Documentar Decisões

Se encontrar casos edge, documentar no commit message ou em comentário de código.

---

## ✅ Checklist Master

### Preparação

- [ ] Branch criada: `feat/architecture-refactor`
- [ ] Commit inicial: "checkpoint before migration"
- [ ] Backup criado (opcional)
- [ ] Plano revisado

### Execução

- [ ] Fase 1: lib/ → shared/ ✅
- [ ] Fase 2: Route groups renomeados ✅
- [ ] Fase 3: \_hooks/ criados ✅
- [ ] Fase 4: loading.tsx criados ✅
- [ ] Fase 5: marketing migrado ✅
- [ ] Fase 6: auth migrado ✅
- [ ] Fase 7: users migrado ✅
- [ ] Fase 8: features restantes migradas ✅
- [ ] Fase 9: API routes limpas ✅
- [ ] Fase 10: features/ removida ✅
- [ ] Fase 11: barrel exports removidos ✅
- [ ] Fase 12: docs atualizadas ✅
- [ ] Fase 13: testes finais ok ✅
- [ ] Fase 14: merged e deployed ✅

### Pós-migração

- [ ] Equipe notificada
- [ ] Documentação atualizada
- [ ] Métricas de performance verificadas

---

**Criado em:** 2026-01-04  
**Última atualização:** 2026-01-04  
**Status:** 📝 Pronto para execução
