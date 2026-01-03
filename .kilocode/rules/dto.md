# 📦 DTOs (Data Transfer Objects)

Este documento define a regra **NÃO-NEGOCIÁVEL** sobre o uso de DTOs no projeto EasyDrive.

## 🚨 Regra Crítica (NÃO-NEGOCIÁVEL)

**NUNCA exponha entidades do banco de dados diretamente. SEMPRE use DTOs.**

### Por Quê?

- **Segurança**: Protege dados sensíveis (senhas, tokens, etc.)
- **Encapsulamento**: Separa estrutura do banco da API pública
- **Flexibilidade**: Permite mudar o schema sem quebrar APIs
- **Privacidade**: Controla exatamente quais dados são expostos

## ✅ Padrão Correto

```typescript
// ❌ NUNCA faça isso
export function getUser() {
  return supabase.from("users").select("*");
}

// ✅ SEMPRE use DTOs
export async function getUser(): Promise<UserPublicDTO> {
  const user = await supabase.from("users").select("*").single();
  return toUserPublicDTO(user);
}
```

## 📋 Variantes de DTOs

### Public DTO

Expostas publicamente (ex: perfil de usuário visível por outros):

```typescript
export interface UserPublicDTO {
  id: string;
  name: string;
  role: "student" | "instructor" | "admin";
  // CPF mascarado, email omitido, etc.
}
```

### Private DTO

Expostas apenas para o próprio usuário (ex: visualizando seu próprio perfil):

```typescript
export interface UserPrivateDTO {
  id: string;
  name: string;
  email: string; // Email completo permitido
  phone: string;
  cpf: string; // CPF mascarado mesmo no private
  role: "student" | "instructor" | "admin";
  // NUNCA inclua password ou password_hash
}
```

## 🔒 Campos Sempre Proibidos

**NUNCA inclua em nenhum DTO:**

1. `password`
2. `password_hash`
3. `access_token`
4. `refresh_token`
5. `api_key`
6. `secret_key`

## 🏗️ Organização

DTOs são organizados por feature:

```
features/[feature]/dtos/
├── [entity].dto.ts
└── index.ts
```

**Exemplo:**

```typescript
// features/users/dtos/user.dto.ts
export interface UserPublicDTO {
  id: string;
  name: string;
  role: string;
}

export interface UserPrivateDTO extends UserPublicDTO {
  email: string;
  phone: string;
  cpf: string; // Mascarado
}

// Função de transformação
export function toUserPublicDTO(user: DatabaseUser): UserPublicDTO {
  return {
    id: user.id,
    name: user.name,
    role: user.role,
  };
}
```

## 📚 Documentação Completa

Para detalhes completos sobre DTOs e segurança de dados:

- [`./ai/AI-GUIDE.md`](./ai/AI-GUIDE.md) - Guia completo de desenvolvimento
- [`security.md`](./security.md) - Regras de segurança e dados sensíveis

## ⚠️ Lembrete

1. ✅ SEMPRE use DTOs para expor dados
2. ✅ NUNCA retorne `select('*')` diretamente
3. ✅ SEMPRE omita campos sensíveis
4. ✅ Use Public/Private conforme o contexto
5. ✅ Mascare dados pessoais (CPF, telefone)
