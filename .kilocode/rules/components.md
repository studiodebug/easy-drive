# 🧩 Componentes Server/Client

Este documento define as regras de separação entre Server e Client Components no projeto EasyDrive.

## 🚨 Regra Fundamental

**Separação clara entre Server e Client Components. Use `'use client'` SOMENTE quando necessário.**

## Server vs Client

```typescript
// ✅ Server Component (padrão - NO 'use client')
export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}

// ✅ Client Component (interativo - COM 'use client')
'use client'
export default function InteractiveComponent() {
  const [state, setState] = useState()
  return <button onClick={...}>Click</button>
}
```

## 📂 Organização

```
features/[feature]/components/
├── client/     ← Client Components ('use client')
├── server/     ← Server Components (padrão)
└── shared/     ← Componentes compartilhados
```

## ⚡ Quando Usar Client Components

Use `'use client'` quando precisar de:

1. **Estados**: `useState()`, `useReducer()`
2. **Efeitos**: `useEffect()`, `useLayoutEffect()`
3. **Eventos**: `onClick`, `onChange`, `onSubmit`
4. **Browser APIs**: `window`, `localStorage`, `navigator`
5. **Hooks customizados** que usam hooks de React
6. **Bibliotecas client-side**: React Query hooks, formulários, etc.

## 🎯 Quando Usar Server Components

Use Server Components (padrão sem `'use client'`) quando:

1. **Buscar dados** do servidor
2. **Acessar** resources do backend diretamente
3. **Renderizar** conteúdo estático
4. **Manter** informações sensíveis (tokens, keys) no servidor
5. **Reduzir** bundle JavaScript no cliente

## 📚 Documentação Completa

Para detalhes sobre arquitetura de componentes, consulte:

- [`./ai/AI-GUIDE.md`](./ai/AI-GUIDE.md) - Guia completo de desenvolvimento
- [`./ai/00-project-overview.md`](./ai/00-project-overview.md) - Visão geral do projeto

## ✅ Exemplos Práticos

### Server Component

```typescript
// features/users/components/server/UserProfile.tsx
import { createServerClient } from "@/lib/supabase/server";

export default async function UserProfile({ userId }: { userId: string }) {
  const supabase = createServerClient();
  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  return <div>{user.name}</div>;
}
```

### Client Component

```typescript
// features/users/components/client/EditProfileForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/retroui/Button";

export function EditProfileForm() {
  const [name, setName] = useState("");

  return (
    <form>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <Button type="submit">Salvar</Button>
    </form>
  );
}
```

## ⚠️ Lembrete

- ✅ Server Components são o padrão
- ✅ Adicione `'use client'` apenas quando necessário
- ✅ Organize em `client/` e `server/` por clareza
- ✅ Server Components podem importar Client Components
- ❌ Client Components NÃO podem importar Server Components diretamente
