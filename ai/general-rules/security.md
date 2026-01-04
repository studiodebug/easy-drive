# 🔒 Segurança e Privacidade de Dados

Este documento define as regras de segurança e proteção de dados sensíveis no projeto EasyDrive.

## 🚨 Dados Sensíveis - NUNCA Exponha

O sistema lida com informações sensíveis que **JAMAIS** devem ser expostas de forma completa. Siga estas regras rigorosamente:

### 1. Senhas e Hashes

❌ **NUNCA** retorne senhas ou hashes de senha em APIs ou componentes:

```typescript
// ❌ NUNCA faça isso
export interface User {
  id: string;
  email: string;
  password: string; // PROIBIDO
  password_hash: string; // PROIBIDO
}

// ✅ SEMPRE omita campos de senha
export interface UserPublicDTO {
  id: string;
  email: string;
  // password NÃO EXISTE aqui
}
```

### 2. CPF - Sempre Mascarado

Ao exibir CPF, **SEMPRE** mascare a maior parte:

```typescript
// ❌ NUNCA exponha CPF completo
const cpf = "12345678901";

// ✅ SEMPRE mascare: XXX.XXX.XXX-XX
function maskCPF(cpf: string): string {
  return `XXX.XXX.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
}

// Resultado: XXX.XXX.890-01
```

### 3. Tokens de Autenticação

❌ **NUNCA** inclua tokens em DTOs ou logs:

```typescript
// ❌ NUNCA faça isso
export interface AuthResponse {
  user: User;
  accessToken: string; // PROIBIDO em DTOs públicos
  refreshToken: string; // PROIBIDO em DTOs públicos
}

// ✅ SEMPRE use httpOnly cookies ou headers seguros
// Tokens devem ser gerenciados pelo Supabase Auth
```

### 4. Telefones - Mascaramento Parcial

Ao exibir números de telefone, mascare quando necessário:

```typescript
// ❌ NUNCA exponha telefone completo em contextos públicos
const phone = "11987654321";

// ✅ SEMPRE mascare quando apropriado: (XX) XXXXX-XXXX
function maskPhone(phone: string): string {
  return `(${phone.slice(0, 2)}) XXXXX-${phone.slice(7)}`;
}

// Resultado: (11) XXXXX-4321
```

### 5. Dados Financeiros

❌ **NUNCA** armazene dados de cartão de crédito diretamente no banco:

```typescript
// ❌ PROIBIDO - dados de cartão no banco
interface Payment {
  cardNumber: string; // NUNCA
  cvv: string; // NUNCA
  expirationDate: string; // NUNCA
}

// ✅ Use serviços terceirizados (Stripe, PagSeguro, etc.)
interface Payment {
  paymentIntentId: string; // Referência externa
  status: string;
  amount: number;
}
```

## 🛡️ Autenticação e Autorização

### Rotas Protegidas

SEMPRE proteja rotas que requerem autenticação:

```typescript
// app/protected/layout.tsx
import { redirect } from "next/navigation";
import { createServerClient } from "@/shared/supabase/server";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return <>{children}</>;
}
```

### Verificação de Papéis

SEMPRE verifique permissões antes de permitir ações:

```typescript
// Exemplo: apenas instrutores podem avaliar alunos
export async function evaluateStudent(evaluatorId: string, studentId: string) {
  const evaluator = await getUserById(evaluatorId);

  if (evaluator.role !== "instructor") {
    throw new Error("Apenas instrutores podem avaliar alunos");
  }

  // Prosseguir com avaliação...
}
```

## 🔐 Row Level Security (RLS)

**TODAS as tabelas DEVEM ter RLS habilitado** no Supabase:

```sql
-- Habilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Política: usuários podem ver apenas seus próprios dados
CREATE POLICY "Users can view own data"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

-- Política: apenas admins podem ver todos os usuários
CREATE POLICY "Admins can view all users"
  ON users
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'admin'
    )
  );
```

## 📋 Checklist de Segurança

Antes de expor qualquer dado, verifique:

- ✅ DTOs escondem campos sensíveis?
- ✅ Senhas/hashes foram omitidos?
- ✅ CPF está mascarado?
- ✅ Tokens de autenticação não estão no DTO?
- ✅ Telefones estão protegidos quando necessário?
- ✅ Dados financeiros usam serviços externos?
- ✅ RLS está habilitado na tabela?
- ✅ Políticas de acesso estão corretas?
- ✅ Apenas usuários autorizados podem acessar?

## 🚫 Dados que NUNCA Devem Ser Expostos

**Lista absoluta de campos proibidos em DTOs públicos:**

1. `password`
2. `password_hash`
3. `access_token`
4. `refresh_token`
5. `api_key`
6. `secret_key`
7. `private_key`
8. `card_number`
9. `cvv`
10. `cpf` (sem mascaramento)

## ⚠️ Lembrete Final

Segurança não é opcional. Em caso de dúvida sobre expor um dado:

1. ✅ Consulte [`../README.md`](../README.md) - Guia completo
2. ✅ Use DTOs para filtrar dados sensíveis (veja [`./dto.md`](./dto.md))
3. ✅ Aplique mascaramento quando necessário
4. ✅ Verifique políticas RLS (veja [`../libs/supabase-postgres.md`](../libs/supabase-postgres.md))
5. ✅ **Quando em dúvida, NÃO exponha**
