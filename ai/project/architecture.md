# ⚠️ DOCUMENTO OBSOLETO

Esta documentação foi substituída por [`architecture-simplified.md`](architecture-simplified.md).

**Mantenha este arquivo apenas para referência histórica.**

---

# 🏗️ Arquitetura do Projeto

Este documento define as regras de arquitetura e organização do código no projeto EasyDrive.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Linguagem**: TypeScript (Strict Mode)
- **Estilo**: Tailwind CSS v4 + RetroUI Design System
- **Banco de Dados**: Supabase (PostgreSQL)
- **Validação**: Zod
- **Data Fetching**: React Query
- **Autenticação**: Supabase Auth

## Path Aliases

O projeto utiliza os seguintes aliases para importações limpas:

```typescript
"@/*"           → "./"
"@features/*"   → "./features/*"
"@components/*" → "./components/*"
"@lib/*"        → "./lib/*"
```

## Convenções de Nomenclatura

- **Pages**: `page.tsx`
- **Layouts**: `layout.tsx`
- **API Routes**: `route.ts`
- **Components**: `PascalCase.tsx`
- **Services**: `*.service.ts`
- **DTOs**: `*.dto.ts`
- **Schemas**: `*.schema.ts`
- **Types**: `*.types.ts`

## Estrutura de Pastas Completa

```
easy-drive/
├── app/                    # Next.js App Router
│   ├── (marketing)/       # Grupo de rotas públicas
│   ├── auth/              # Autenticação
│   │   ├── login/
│   │   ├── sign-up/
│   │   ├── forgot-password/
│   │   └── update-password/
│   └── protected/         # Rotas protegidas
├── features/              # Features modulares (Feature-based architecture)
│   ├── auth/
│   │   ├── components/
│   │   │   ├── client/
│   │   │   ├── server/
│   │   │   └── shared/
│   │   ├── queries/
│   │   │   ├── queries.ts
│   │   │   └── mutations.ts
│   │   ├── api/
│   │   ├── dtos/
│   │   ├── types/
│   │   ├── validations/
│   │   ├── services/
│   │   └── index.ts      # Barrel export
│   ├── marketing/
│   └── [feature-name]/   # Template para novas features
├── components/
│   ├── retroui/          # Design System RetroUI
│   └── supabase/         # Componentes Supabase reutilizáveis
├── lib/
│   ├── supabase/         # Clientes Supabase (client.ts, server.ts)
│   └── utils.ts          # Utilitários gerais
├── supabase/
│   ├── schemas/          # ⚠️ SCHEMAS DECLARATIVOS AQUI
│   │   ├── tables/
│   │   ├── functions/
│   │   └── policies/
│   └── migrations/       # Gerado automaticamente pelo CLI
└── ai/                   # 📚 DOCUMENTAÇÃO PRINCIPAL
```

## Feature-Based Architecture

Cada feature deve seguir a estrutura modular:

```
features/[feature-name]/
├── components/
│   ├── client/           # Client Components com 'use client'
│   ├── server/           # Server Components (padrão)
│   └── shared/           # Componentes compartilhados
├── queries/
│   ├── queries.ts        # React Query queries
│   └── mutations.ts      # React Query mutations
├── api/                  # API Routes específicas da feature
│   └── [route]/
│       └── route.ts
├── dtos/                 # Data Transfer Objects
│   ├── [entity].dto.ts
│   └── index.ts
├── types/                # TypeScript types e interfaces
│   ├── [feature].types.ts
│   └── index.ts
├── validations/          # Zod schemas
│   ├── [feature].schema.ts
│   └── index.ts
├── services/             # Lógica de negócio
│   ├── [feature].service.ts
│   └── index.ts
└── index.ts              # Barrel export da feature
```

## Barrel Exports

Use [`index.ts`](./features/auth/index.ts) para exportar as partes públicas de cada módulo:

```typescript
// features/auth/index.ts
export * from "./components/client/LoginForm";
export * from "./components/server/AuthButton";
export * from "./types/auth.types";
export * from "./validations/auth.schema";
```

## Criando uma Nova Feature

1. Consulte [`../README.md`](../README.md) seção "Workflow Completo"
2. Crie a estrutura em `features/[feature-name]/`
3. Siga o padrão de organização acima
4. Implemente os componentes respeitando Server/Client separation
5. Crie DTOs para todas as entidades
6. Defina validações Zod para inputs
7. Crie o barrel export em [`index.ts`](./features/auth/index.ts)

## API Routes

API Routes devem ser criadas dentro da feature correspondente:

```typescript
// features/users/api/profile/route.ts
import { z } from "zod";
import { NextResponse } from "next/server";

const updateProfileSchema = z.object({
  name: z.string(),
  phone: z.string(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const result = updateProfileSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  // Processar dados validados
  const userPublicDTO = await updateUserProfile(result.data);

  return NextResponse.json({ data: userPublicDTO });
}
```

## Queries e Mutations (React Query)

Organize queries e mutations por feature:

```typescript
// features/users/queries/queries.ts
import { useQuery } from "@tanstack/react-query";

export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ["user", "profile", userId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}`);
      return response.json(); // Retorna UserPublicDTO
    },
  });
}
```

```typescript
// features/users/queries/mutations.ts
import { useMutation } from "@tanstack/react-query";

export function useUpdateProfile() {
  return useMutation({
    mutationFn: async (data: UpdateProfileInput) => {
      const response = await fetch("/api/users/profile", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    },
  });
}
```

## Princípios Arquiteturais

1. **Modularidade**: Cada feature é independente e autocontida
2. **Separação de Responsabilidades**: Componentes, lógica e dados separados
3. **Type Safety**: TypeScript strict mode, sem uso de `any`
4. **Validação**: Toda entrada validada com Zod
5. **Encapsulamento**: DTOs protegem a estrutura interna do banco
6. **Reusabilidade**: Componentes compartilhados em [`components/`](./components/)
