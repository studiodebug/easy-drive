# ✅ Validação e Type Safety

Este documento define as regras de validação de dados e segurança de tipos no projeto EasyDrive.

## 🚨 Validação com Zod (OBRIGATÓRIA)

**TODA entrada de dados DEVE ser validada com schemas Zod.**

### Princípio Fundamental

```typescript
// ❌ NUNCA processe dados sem validação
export async function createUser(data: any) {
  // Dados não validados - PROIBIDO
  return await db.insert(data);
}

// ✅ SEMPRE valide com Zod primeiro
export async function createUser(data: unknown) {
  const result = createUserSchema.safeParse(data);

  if (!result.success) {
    throw new Error("Dados inválidos");
  }

  // Dados validados e tipados
  return await db.insert(result.data);
}
```

## 📝 Criando Schemas Zod

### 1. Schemas Básicos

```typescript
import { z } from "zod";

// Schema de login
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

// Extrair tipo TypeScript do schema
export type LoginInput = z.infer<typeof loginSchema>;
```

### 2. Schemas Complexos

```typescript
// Schema com validações customizadas
export const userProfileSchema = z.object({
  name: z.string().min(3, "Nome muito curto").max(100, "Nome muito longo"),
  email: z.string().email("Email inválido"),
  phone: z.string().regex(/^\d{11}$/, "Telefone deve ter 11 dígitos"),
  cpf: z.string().regex(/^\d{11}$/, "CPF inválido"),
  role: z.enum(["student", "instructor", "admin"], {
    errorMap: () => ({ message: "Papel de usuário inválido" }),
  }),
  birthDate: z.string().datetime("Data inválida"),
});

export type UserProfileInput = z.infer<typeof userProfileSchema>;
```

### 3. Schemas com Refinamentos

```typescript
// Validação customizada com refine
export const passwordChangeSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Senhas não correspondem",
    path: ["confirmPassword"],
  });
```

## 🔒 Type Safety (TypeScript Strict Mode)

### 1. NUNCA Use `any`

```typescript
// ❌ PROIBIDO
function processData(data: any) {
  return data.field; // Sem type safety
}

// ✅ CORRETO
function processData(data: UserDTO) {
  return data.field; // Type-safe
}
```

### 2. Use Unknown para Dados Externos

```typescript
// ✅ SEMPRE use unknown para dados não validados
export async function POST(request: Request) {
  const body: unknown = await request.json();

  // Valide antes de usar
  const result = schema.safeParse(body);

  if (!result.success) {
    return Response.json({ error: result.error }, { status: 400 });
  }

  // Agora result.data é tipado e seguro
  const validatedData = result.data;
}
```

### 3. Tipos Estritos

```typescript
// ✅ Use tipos estritos ao invés de strings genéricas
type UserRole = "student" | "instructor" | "admin";

interface User {
  id: string;
  role: UserRole; // Não string
  status: "active" | "inactive"; // Não string
}
```

## 📍 Onde Validar

### 1. API Routes

```typescript
// features/users/api/profile/route.ts
import { z } from "zod";
import { NextResponse } from "next/server";

const updateProfileSchema = z.object({
  name: z.string(),
  phone: z.string(),
});

export async function POST(request: Request) {
  const body: unknown = await request.json();
  const result = updateProfileSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error.format() }, { status: 400 });
  }

  // Processar dados validados
  const data = result.data;
  // ...
}
```

### 2. Server Actions

```typescript
"use server";

import { z } from "zod";

const createLessonSchema = z.object({
  studentId: z.string().uuid(),
  instructorId: z.string().uuid(),
  date: z.string().datetime(),
});

export async function createLesson(formData: FormData) {
  const rawData = {
    studentId: formData.get("studentId"),
    instructorId: formData.get("instructorId"),
    date: formData.get("date"),
  };

  const result = createLessonSchema.safeParse(rawData);

  if (!result.success) {
    return { error: result.error.format() };
  }

  // Processar dados validados
  const lesson = await db.createLesson(result.data);
  return { success: true, lesson };
}
```

### 3. Client-Side Forms

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginInput,
} from "@/features/auth/validations/auth.schema";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    // Dados já validados pelo Zod
    await login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register("password")} type="password" />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Entrar</button>
    </form>
  );
}
```

## 🎯 Padrões de Validação

### 1. safeParse vs parse

```typescript
// ✅ Use safeParse para melhor controle de erros
const result = schema.safeParse(data);

if (!result.success) {
  // Trate erros de validação
  console.error(result.error);
  return;
}

// Acesse dados validados
const validData = result.data;
```

```typescript
// ⚠️ Use parse apenas quando tiver certeza dos dados
try {
  const validData = schema.parse(data); // Lança exceção se inválido
} catch (error) {
  // Trate erro
}
```

### 2. Mensagens de Erro Customizadas

```typescript
export const emailSchema = z
  .string()
  .email("Por favor, insira um email válido");

export const passwordSchema = z
  .string()
  .min(8, "A senha deve ter no mínimo 8 caracteres")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
  .regex(/[0-9]/, "A senha deve conter pelo menos um número");
```

### 3. Schemas Reutilizáveis

```typescript
// Crie schemas base reutilizáveis
export const uuidSchema = z.string().uuid("ID inválido");
export const emailSchema = z.string().email("Email inválido");
export const phoneSchema = z.string().regex(/^\d{11}$/, "Telefone inválido");

// Componha em schemas maiores
export const userSchema = z.object({
  id: uuidSchema,
  email: emailSchema,
  phone: phoneSchema,
});
```

## 📋 Checklist de Validação

Antes de processar qualquer dado:

- ✅ Schema Zod está definido?
- ✅ Validação com `safeParse()` está sendo usada?
- ✅ Erros de validação são tratados adequadamente?
- ✅ Tipos TypeScript extraídos do schema com `z.infer`?
- ✅ Nenhum uso de `any`?
- ✅ Dados externos tratados como `unknown`?
- ✅ Mensagens de erro são claras para o usuário?

## ⚠️ Lembrete

Type safety end-to-end é fundamental:

1. ✅ Valide TODA entrada com Zod
2. ✅ NUNCA use `any`
3. ✅ Use `unknown` para dados externos
4. ✅ Extraia tipos com `z.infer`
5. ✅ Trate erros de validação adequadamente
