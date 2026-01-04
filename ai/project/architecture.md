# 🏗️ Arquitetura do Projeto EasyDrive

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Linguagem**: TypeScript (Strict Mode)
- **Estilo**: Tailwind CSS v4 + RetroUI Design System
- **Banco de Dados**: Supabase (PostgreSQL)
- **Validação**: Zod
- **Data Fetching**: Server Actions + React Query (quando necessário)
- **Autenticação**: Supabase Auth

## Path Aliases

```typescript
"@/*"           → "./"
"@components/*" → "./components/*"
"@shared/*"     → "./shared/*"
```

## Princípios da Arquitetura

1. **Alinhamento com Next.js** - Seguir padrões nativos do App Router
2. **Colocation** - Manter código relacionado próximo de onde é usado
3. **Server-First** - Preferir Server Components e Server Actions
4. **Shared quando necessário** - Compartilhar apenas o que é realmente reutilizado
5. **Simplicidade** - Menos níveis de profundidade, mais clareza

---

## 📁 Estrutura de Pastas

```
easy-drive/
├── app/                           # Next.js App Router
│   ├── (public)/                 # 🌐 Grupo: Rotas públicas
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx
│   │   ├── _components/          # Componentes privados
│   │   └── _hooks/               # Hooks customizados
│   │
│   ├── (authenticated)/          # 🔐 Grupo: Rotas autenticadas
│   │   ├── layout.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx       # Loading UI (Suspense)
│   │   │   ├── _components/      # Componentes específicos do dashboard
│   │   │   ├── _hooks/           # Hooks do dashboard
│   │   │   └── _actions.ts       # Server Actions do dashboard
│   │   │
│   │   ├── profile/
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx       # Loading state
│   │   │   ├── _components/
│   │   │   │   ├── ProfileForm.tsx       # 'use client' (apenas UI)
│   │   │   │   └── ProfileHeader.tsx     # Server Component
│   │   │   ├── _hooks/           # useProfileForm(), useProfileValidation()
│   │   │   ├── _actions.ts
│   │   │   └── _types.ts         # Types específicos (se necessário)
│   │   │
│   │   ├── instructors/
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx       # Loading state
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   ├── _components/
│   │   │   │   └── _hooks/
│   │   │   ├── _components/
│   │   │   ├── _hooks/           # useInstructorList(), useInstructorFilters()
│   │   │   ├── _actions.ts
│   │   │   └── _queries.ts       # React Query hooks (quando necessário)
│   │   │
│   │   └── lessons/
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       ├── new/
│   │       ├── [id]/
│   │       ├── _components/
│   │       ├── _hooks/
│   │       └── _actions.ts
│   │
│   ├── auth/                     # 🔑 Autenticação
│   │   ├── login/
│   │   │   ├── page.tsx
│   │   │   ├── _components/
│   │   │   └── _hooks/           # useLoginForm()
│   │   ├── sign-up/
│   │   └── _components/          # Componentes compartilhados de auth
│   │
│   └── api/                      # 🔌 API Routes (apenas quando necessário)
│       ├── webhooks/             # Webhooks externos
│       │   └── supabase/
│       └── users/
│           └── me/
│
├── components/
│   ├── retroui/                  # 🎨 Design System (RetroUI)
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   │
│   ├── shared/                   # Componentes realmente compartilhados
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── UserAvatar.tsx
│   │
│   └── layouts/                  # Layouts reutilizáveis
│       └── AuthLayout/
│
├── shared/
│   ├── supabase/                 # Cliente Supabase
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   │
│   ├── validations/              # Schemas Zod compartilhados
│   │   ├── user.ts
│   │   ├── auth.ts
│   │   ├── lessons.ts
│   │   ├── instructors.ts
│   │   ├── reviews.ts
│   │   └── availability.ts
│   │
│   ├── types/                    # Types globais
│   │   └── auth.ts
│   │
│   ├── dtos/                     # DTOs compartilhados
│   │   ├── user.dto.ts
│   │   ├── instructor.dto.ts
│   │   ├── instructor-profile.dto.ts
│   │   └── address.dto.ts
│   │
│   └── utils.ts                  # Utilitários
│
├── types/
│   └── supabase.ts               # Types gerados do Supabase
│
└── supabase/
    ├── schemas/                  # ⚠️ SCHEMAS DECLARATIVOS AQUI
    │   ├── tables/
    │   ├── functions/
    │   └── policies/
    └── migrations/               # Gerado automaticamente pelo CLI
```

---

## 📐 Convenções

### 1. Prefixo `_` para Arquivos/Pastas Privadas

Arquivos e pastas com `_` **não criam rotas** no Next.js:

```
app/(authenticated)/dashboard/
  ├── page.tsx                # ✅ Cria rota: /dashboard
  ├── _components/            # ❌ Não cria rota (privado) - UI
  ├── _hooks/                 # ❌ Não cria rota (privado) - Lógica
  ├── _actions.ts             # ❌ Não cria rota (privado) - Server Actions
  └── _types.ts               # ❌ Não cria rota (privado) - Types
```

**Use `_` para:**

- **\_components/** - Componentes específicos da rota (apenas UI/apresentação)
- **\_hooks/** - Hooks customizados (lógica separada da UI)
- **\_actions.ts** - Server Actions
- **\_types.ts** - Types/interfaces específicos
- Utilities/helpers locais

### 2. Server Actions > API Routes

**✅ Preferir Server Actions:**

```typescript
// app/(authenticated)/profile/_actions.ts
"use server";

import { createClient } from "@/shared/supabase/server";
import { updateProfileSchema } from "@/shared/validations/user";
import { toUserPublicDTO } from "@/shared/dtos/user.dto";

export async function updateProfile(formData: FormData) {
  const data = Object.fromEntries(formData);
  const validated = updateProfileSchema.parse(data);

  const supabase = await createClient();
  const { data: updated } = await supabase
    .from("users")
    .update(validated)
    .select()
    .single();

  return toUserPublicDTO(updated);
}
```

**Uso no componente:**

```typescript
// app/(authenticated)/profile/_components/ProfileForm.tsx
"use client";

import { updateProfile } from "../_actions";

export function ProfileForm({ user }) {
  return <form action={updateProfile}>{/* form fields */}</form>;
}
```

**❌ API Routes apenas para:**

- Webhooks externos (Stripe, Supabase Webhooks)
- Cron jobs
- Integrações third-party que requerem HTTP endpoints

### 3. Colocation de Componentes

**Regra:** Mantenha componentes próximos de onde são usados.

```
✅ Componente usado apenas no dashboard:
app/(authenticated)/dashboard/
  └── _components/
      └── DashboardStats.tsx

✅ Componente usado apenas na página de instrutor:
app/(authenticated)/instructors/[id]/
  └── _components/
      └── InstructorDetails.tsx

✅ Componente usado em 3+ lugares diferentes:
components/shared/
  └── UserAvatar.tsx
```

**Rule of Three:** Extrair para `components/shared/` apenas após usar em **3 ou mais lugares**.

### 4. Nomenclatura

- **Pages**: `page.tsx`
- **Layouts**: `layout.tsx`
- **Server Actions**: `_actions.ts` ou `_actions/file.ts`
- **Componentes**: `PascalCase.tsx`
- **Types locais**: `_types.ts`
- **DTOs**: `*.dto.ts`
- **Schemas**: `*.ts` (em `shared/validations/`)

### 5. Server vs Client Components

**Regra:** Server Components por padrão, Client Components quando necessário.

```typescript
// ✅ Server Component (padrão - sem diretiva)
// app/(authenticated)/instructors/_components/InstructorList.tsx
import { getInstructors } from "../_actions";

export async function InstructorList() {
  const instructors = await getInstructors();
  return <div>{/* render */}</div>;
}

// ✅ Client Component (quando precisa de interatividade)
// app/(authenticated)/instructors/_components/InstructorCard.tsx
("use client");

import { useState } from "react";

export function InstructorCard({ instructor }) {
  const [isLiked, setIsLiked] = useState(false);
  return <div onClick={() => setIsLiked(!isLiked)}>{/* render */}</div>;
}
```

**Use Client Components quando precisar de:**

- `useState`, `useEffect`, hooks do React
- Event handlers (`onClick`, `onChange`)
- Browser APIs (`localStorage`, `window`)
- Bibliotecas client-side (Charts, Maps)

---

## 🎯 Padrões de Implementação

### Padrão 1: Página com Dados (Server Component)

```typescript
// app/(authenticated)/instructors/page.tsx
import { getInstructors } from "./_actions";
import { InstructorCard } from "./_components/InstructorCard";

export default async function InstructorsPage() {
  const instructors = await getInstructors();

  return (
    <div>
      <h1>Instrutores</h1>
      <div className="grid grid-cols-3 gap-4">
        {instructors.map((instructor) => (
          <InstructorCard key={instructor.id} instructor={instructor} />
        ))}
      </div>
    </div>
  );
}
```

### Padrão 2: Server Actions

```typescript
// app/(authenticated)/instructors/_actions.ts
"use server";

import { createClient } from "@/shared/supabase/server";
import { toInstructorPublicDTOs } from "@/shared/dtos/instructor.dto";

export async function getInstructors() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("instructors")
    .select("*")
    .order("rating", { ascending: false });

  if (error) throw error;

  return toInstructorPublicDTOs(data);
}

export async function bookInstructor(instructorId: string, date: Date) {
  // lógica de agendamento
}
```

### Padrão 3: Formulários com Server Actions

```typescript
// app/(authenticated)/profile/_components/ProfileForm.tsx
"use client";

import { updateProfile } from "../_actions";
import { Button } from "@/components/retroui/Button";
import { Input } from "@/components/retroui/Input";
import { useTransition } from "react";

export function ProfileForm({ user }) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        startTransition(async () => {
          await updateProfile(formData);
        });
      }}
    >
      <Input name="name" defaultValue={user.name} />
      <Input name="phone" defaultValue={user.phone} />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Salvando..." : "Salvar"}
      </Button>
    </form>
  );
}
```

### Padrão 4: Separação de Lógica com Hooks

**Regra:** Componentes devem conter apenas JSX/UI, lógica fica em hooks customizados.

```typescript
// app/(authenticated)/profile/_hooks/useProfileForm.ts
"use client";

import { useState, useTransition } from "react";
import { updateProfile } from "../_actions";
import { toast } from "sonner";

export function useProfileForm(initialData) {
  const [formData, setFormData] = useState(initialData);
  const [isPending, startTransition] = useTransition();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await updateProfile(formData);
        toast.success("Perfil atualizado!");
      } catch (error) {
        toast.error("Erro ao atualizar");
      }
    });
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isPending,
  };
}
```

```typescript
// app/(authenticated)/profile/_components/ProfileForm.tsx
("use client");

import { useProfileForm } from "../_hooks/useProfileForm";
import { Input } from "@/components/retroui/Input";
import { Button } from "@/components/retroui/Button";

export function ProfileForm({ user }) {
  const { formData, handleChange, handleSubmit, isPending } =
    useProfileForm(user);

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <Input
        value={formData.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Salvando..." : "Salvar"}
      </Button>
    </form>
  );
}
```

**Benefícios:**

- ✅ Componente limpo e focado em UI
- ✅ Lógica reutilizável e testável
- ✅ Fácil manutenção e debug

### Padrão 5: Loading States com Suspense

**Regra:** Use `loading.tsx` para loading states automáticos (preferível) ou Suspense boundaries manual.

#### Opção 1: `loading.tsx` (Recomendado)

```typescript
//app/(authenticated)/profile/loading.tsx
import { Loader } from "@/components/retroui/Loader";

export default function ProfileLoading() {
  return (
    <div className="container mx-auto py-8">
      <Loader />
    </div>
  );
}
```

**Benefícios:**

- ✅ Automático - Next.js mostra enquanto `page.tsx` carrega
- ✅ Sem código extra no componente
- ✅ Streaming nativo

#### Opção 2: Suspense Boundaries (Manual)

```typescript
// app/(authenticated)/profile/page.tsx
import { Suspense } from "react";
import { ProfileForm } from "./_components/ProfileForm";
import { ProfileStats } from "./_components/ProfileStats";
import { Loader } from "@/components/retroui/Loader";

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<Loader />}>
        <ProfileHeader />
      </Suspense>

      <div className="grid grid-cols-2 gap-8">
        <Suspense fallback={<Loader />}>
          <ProfileForm />
        </Suspense>

        <Suspense fallback={<Loader />}>
          <ProfileStats />
        </Suspense>
      </div>
    </div>
  );
}
```

**Quando usar cada opção:**

```typescript
✅ loading.tsx:
- Loading da página inteira
- Estrutura simples
- Menos código

✅ Suspense Boundaries:
- Loading parcial (componentes independentes)
- Dados de múltiplas fontes
- UX otimizada (progressive loading)
```

### Padrão 6: React Query - Quando Usar

**Regra:** React Query apenas quando Server Actions + Suspense não são suficientes.

#### ❌ NÃO Use React Query Para:

```typescript
// ❌ Forms simples (use Server Actions)
function ProfileForm() {
  const mutation = useMutation({ mutationFn: updateProfile });
  // Complexidade desnecessária
}

// ✅ Melhor: Server Action direto
function ProfileForm() {
  return <form action={updateProfile}></form>;
}

// ❌ Fetch único (use Server Component)
function UserList() {
  const { data } = useQuery({ queryFn: getUsers });
  // Server Component é mais simples
}

// ✅ Melhor: Server Component
async function UserList() {
  const users = await getUsers();
  return <div>{users.map(...)}</div>;
}
```

#### ✅ USE React Query Para:

**1. Dados compartilhados entre múltiplos CLIENT components**
**2. Polling/Refetching automático**
**3. Optimistic updates complexos**
**4. Infinite scroll / Pagination**
**5. Dados que precisam de invalidação complexa**

#### Estrutura de Arquivos com React Query:

```
app/(authenticated)/lessons/
  ├── page.tsx              # Server Component (dados iniciais)
  ├── _components/
  │   ├── LessonList.tsx    # Client Component (usa React Query)
  │   └── CreateLesson.tsx  # Client Component (mutations)
  ├── _queries.ts           # ✅ React Query hooks
  │   ├── useInfiniteLessons()
  │   ├── useCreateLesson()
  │   └── useUpdateLesson()
  └── _actions.ts           # Server Actions (chamados pelas queries)
```

---

## 📦 Organização de Código Compartilhado

### shared/dtos/ - Data Transfer Objects

```typescript
// shared/dtos/user.dto.ts
import type { Database } from "@/types/supabase";

type UserEntity = Database["public"]["Tables"]["users"]["Row"];

export type UserPublicDTO = {
  id: string;
  name: string;
  email: string;
  role: "student" | "instructor" | "admin";
  createdAt: string;
};

export type UserPrivateDTO = UserPublicDTO & {
  phone: string;
  cpf: string; // mascarado
};

export function toUserPublicDTO(user: UserEntity): UserPublicDTO {
  return {
    id: user.id,
    name: user.full_name,
    email: user.email,
    role: user.role,
    createdAt: user.created_at,
  };
}

export function toUserPublicDTOs(users: UserEntity[]): UserPublicDTO[] {
  return users.map(toUserPublicDTO);
}
```

### shared/validations/ - Schemas Zod

```typescript
// shared/validations/user.ts
import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  phone: z
    .string()
    .regex(/^\d{10,11}$/, "Telefone inválido")
    .optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const createUserSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
  name: z.string().min(2),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
```

### types/ - Types Globais

```typescript
// types/supabase.ts
// Gerado automaticamente: supabase gen types typescript

export type Database = {
  public: {
    Tables: {
      users: { ... },
      instructors: { ... },
      lessons: { ... }
    }
  }
}

// shared/types/auth.ts
export type Role = 'student' | 'instructor' | 'admin';

export type PaginationParams = {
  page: number;
  limit: number;
}

export type ApiResponse<T> = {
  data: T;
  error?: string;
}
```

---

## ⚠️ Regras Importantes

### ✅ DO - Faça

1. **Use Server Actions** para mutações de dados
2. **Coloque componentes próximos** de onde são usados
3. **Compartilhe apenas o necessário** (Rule of Three)
4. **Prefira Server Components** quando possível
5. **Valide com Zod** toda entrada de dados
6. **Use DTOs** para expor dados
7. **Types do banco** gerados automaticamente
8. **Organize por rota** no `app/`

### ❌ DON'T - Não Faça

1. ❌ **Não crie API Routes** para comunicação interna (use Server Actions)
2. ❌ **Não separe** Server/Client em pastas diferentes
3. ❌ **Não crie barrel exports** (`index.ts`) desnecessários
4. ❌ **Não abstraia** antes de usar 3x (evite over-engineering)
5. ❌ **Não use `any`** - sempre defina types
6. ❌ **Não exponha** dados do banco sem DTOs
7. ❌ **Não espalhe** lógica relacionada em múltiplas pastas

---

## 📚 Exemplo Completo: Feature de Perfil

```
app/(authenticated)/profile/
├── page.tsx                      # Página principal
├── loading.tsx                   # Loading state
├── _components/
│   ├── ProfileForm.tsx           # 'use client' - formulário (apenas UI)
│   ├── ProfileHeader.tsx         # Server Component - cabeçalho
│   └── UserMeApiRequest.tsx      # Client Component
├── _hooks/                       # Lógica separada da UI
│   └── .gitkeep
├── _actions.ts                   # Server Actions
└── _types.ts                     # Types específicos (se necessário)

shared/
├── dtos/
│   └── user.dto.ts               # DTOs compartilhados
└── validations/
    └── user.ts                   # Validações compartilhadas
```

**Código:**

```typescript
// app/(authenticated)/profile/page.tsx
import { getCurrentUser } from "./_actions";
import { ProfileHeader } from "./_components/ProfileHeader";
import { ProfileForm } from "./_components/ProfileForm";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <div className="container mx-auto py-8">
      <ProfileHeader user={user} />
      <ProfileForm user={user} />
    </div>
  );
}

// app/(authenticated)/profile/_actions.ts
("use server");

import { createClient } from "@/shared/supabase/server";
import { toUserPrivateDTO, toUserPublicDTO } from "@/shared/dtos/user.dto";
import { updateProfileSchema } from "@/shared/validations/user";
import { revalidatePath } from "next/cache";

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) throw new Error("Não autenticado");

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", authUser.id)
    .single();

  return toUserPrivateDTO(data);
}

export async function updateProfile(formData: FormData) {
  const rawData = Object.fromEntries(formData);
  const validated = updateProfileSchema.parse(rawData);

  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) throw new Error("Não autenticado");

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

// app/(authenticated)/profile/_components/ProfileForm.tsx
("use client");

import { updateProfile } from "../_actions";
import { Button } from "@/components/retroui/Button";
import { Input } from "@/components/retroui/Input";
import { Card } from "@/components/retroui/Card";
import { useTransition } from "react";
import { toast } from "sonner";

export function ProfileForm({ user }) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        await updateProfile(formData);
        toast.success("Perfil atualizado com sucesso!");
      } catch (error) {
        toast.error("Erro ao atualizar perfil");
      }
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Editar Perfil</h2>
      <form action={handleSubmit} className="space-y-4">
        <Input name="name" label="Nome" defaultValue={user.name} required />
        <Input name="phone" label="Telefone" defaultValue={user.phone} />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </form>
    </Card>
  );
}
```

---

## 🎨 Comparação com Arquitetura Antiga

### Antes (Complexo - Feature-based)

```
features/users/
  ├── components/
  │   ├── client/
  │   │   └── UserForm.tsx              → 6 níveis
  │   ├── server/
  │   │   └── UserList.tsx              → 6 níveis
  │   └── shared/
  ├── api/
  ├── dtos/
  ├── types/
  ├── validations/
  ├── services/
  ├── entities/
  └── index.ts                          → 9 subpastas!
```

### Agora (Simples - Colocation)

```
app/(authenticated)/profile/
  ├── page.tsx                          → 3 níveis
  ├── _components/
  │   ├── ProfileForm.tsx               → 4 níveis
  │   └── ProfileHeader.tsx             → 4 níveis
  └── _actions.ts                       → 3 níveis

shared/
  ├── dtos/
  │   └── user.dto.ts                   → 3 níveis
  └── validations/
      └── user.ts                       → 3 níveis
```

**Redução: 9 subpastas → 2 pastas principais + 2 arquivos**

---

## 📖 Referências

- [Next.js App Router](https://nextjs.org/docs/app)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Private Folders](https://nextjs.org/docs/app/building-your-application/routing/colocation#private-folders)
- [Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)
- [Project Organization](https://nextjs.org/docs/getting-started/project-structure)

---

## 💡 Lembre-se

Esta arquitetura foi projetada para:

- ✅ **Simplicidade** - Código próximo de onde é usado
- ✅ **Produtividade** - Menos decisões, mais implementação
- ✅ **Manutenibilidade** - Fácil encontrar e modificar código
- ✅ **Type Safety** - TypeScript strict + Zod validation
- ✅ **Performance** - Server Components por padrão
- ✅ **Alinhamento** - Seguir padrões do Next.js 14+
