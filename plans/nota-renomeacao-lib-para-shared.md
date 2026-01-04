# 📝 Nota: Renomeação de `lib/` para `shared/`

## Contexto

Durante a finalização da arquitetura simplificada, foi solicitado renomear a pasta `lib/` para `shared/`, pois faz mais sentido semanticamente.

## Alterações Necessárias

### 1. Path Alias no [`tsconfig.json`](../tsconfig.json)

```diff
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@components/*": ["./components/*"],
-     "@lib/*": ["./lib/*"]
+     "@shared/*": ["./shared/*"]
    }
  }
}
```

### 2. Estrutura de Pastas

```diff
easy-drive/
├── app/
├── components/
-├── lib/                    # RENOMEAR PARA shared/
-│   ├── supabase/
-│   ├── validations/
-│   ├── types/
-│   ├── dtos/
-│   └── utils/
+├── shared/                 # ✅ NOVO NOME
+│   ├── supabase/           # Cliente Supabase
+│   ├── validations/        # Schemas Zod compartilhados
+│   ├── types/              # Types globais
+│   ├── dtos/               # DTOs compartilhados
+│   └── utils/              # Utilitários
└── supabase/
```

### 3. Atualização de Imports

Substituir em TODOS os arquivos do projeto:

```diff
- import { createClient } from "@/lib/supabase/server";
+ import { createClient } from "@/shared/supabase/server";

- import { updateProfileSchema } from "@/lib/validations/user";
+ import { updateProfileSchema } from "@/shared/validations/user";

- import { toUserPublicDTO } from "@/lib/dtos/user.dto";
+ import { toUserPublicDTO } from "@/shared/dtos/user.dto";

- import type { Database } from "@/lib/types/database";
+ import type { Database } from "@/shared/types/database";
```

### 4. Arquivos do Projeto que Referênciam `lib/`

Atualmente existem referências em:

- [`ai/project/architecture-simplified.md`](../ai/project/architecture-simplified.md) - 13 ocorrências
- Possivelmente em vários arquivos `.ts`/`.tsx` do projeto

## Justificativa da Mudança

🎯 **`shared/` é mais semântico que `lib/`:**

1. **Clareza**: `shared/` deixa explícito que o código é compartilhado entre features
2. **Convenção**: Muitos projetos Next.js usam `lib/` para vendors/third-party, reservando `shared/` para código do projeto
3. **Consistência**: Alinha com `components/shared/` que já existe

## Checklist de Implementação

Quando for implementar (no mode Code):

- [ ] Renomear pasta `lib/` → `shared/`
- [ ] Atualizar [`tsconfig.json`](../tsconfig.json) - path alias
- [ ] Buscar e substituir `@/lib/` → `@/shared/` em todos arquivos
- [ ] Buscar e substituir referências literais `lib/` → `shared/` na documentação
- [ ] Executar `pnpm build` para verificar erros de tipo
- [ ] Executar `pnpm lint` para verificar imports quebrados
- [ ] Testar aplicação

## Script de Migração Sugerido

```bash
# 1. Renomear pasta
mv lib shared

# 2. Atualizar tsconfig.json
sed -i '' 's|"@/lib/\*"|"@/shared/\*"|g' tsconfig.json
sed -i '' 's|"./lib/\*"|"./shared/\*"|g' tsconfig.json

# 3. Atualizar imports em todos arquivos TypeScript
find . -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -not -path "./node_modules/*" \
  -not -path "./.next/*" \
  -exec sed -i '' 's|@/lib/|@/shared/|g' {} +

# 4. Atualizar documentação
find ./ai -type f -name "*.md" \
  -exec sed -i '' 's|lib/|shared/|g' {} +

# 5. Verificar build
pnpm  build
```

## Impacto

✅ **Baixo Risco:**

- Mudança puramente estrutural
- TypeScript vai pegar qualquer import quebrado
- Sem alteração de lógica

⚠️ **Atenção:**

- Verificar se alguma ferramenta externa referencia `lib/`
- Atualizar README ou documentação externa se existir

---

**Status:** 📝 Documentado, aguardando implementação no mode Code

**Criado em:** 2026-01-04
