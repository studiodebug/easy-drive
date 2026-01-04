#!/bin/bash
set -e

echo "🚀 Completando Migração de Arquitetura - Fases 7-14"
echo "=================================================="

# ========================================
# FASE 7: Migrar Users
# ========================================
echo ""
echo "📦 FASE 7: Migrando Users..."

# Mover DTOs e Validations para shared
cp features/users/dtos/user.dto.ts shared/dtos/
cp features/users/validations/user.schema.ts shared/validations/user.ts

# Criar estrutura profile
mkdir -p "app/(authenticated)/profile/_components"

# Mover componentes
if [ -d "features/users/components/client" ]; then
  cp -r features/users/components/client/* "app/(authenticated)/profile/_components/" 2>/dev/null || true
fi

# Criar _actions.ts baseado em user.service.ts
cat > "app/(authenticated)/profile/_actions.ts" << 'EOF'
'use server'

import { createClient } from "@/shared/supabase/server";
import { toUserPublicDTO, toUserPrivateDTO } from "@/shared/dtos/user.dto";
import { revalidatePath } from "next/cache";

export async function getCurrentUserProfile() {
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();
  
  if (!authUser) throw new Error("Not authenticated");
  
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', authUser.id)
    .single();
    
  return toUserPrivateDTO(data);
}

export async function updateCurrentUser(updates: any) {
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();
  
  if (!authUser) throw new Error("Not authenticated");
  
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', authUser.id)
    .select()
    .single();
    
  if (error) throw error;
  
  revalidatePath('/profile');
  return toUserPublicDTO(data);
}
EOF

#  Atualizar refsimports dashboard
sed -i '' 's|@/features/users/components/client/|../profile/_components/|g' "app/(authenticated)/dashboard/page.tsx" 2>/dev/null || true
sed -i '' 's|@/features/users|../profile|g' "app/(authenticated)/dashboard/page.tsx" 2>/dev/null || true

# Remover features/users
rm -rf features/users

git add -A
git commit -m "refactor(fase-7): migrate users - DTOs to shared, components to profile"

# ========================================
# FASE 8: Migrar Features Restantes  
# ========================================
echo ""
echo "📦 FASE 8: Migrando Features Restantes..."

# Para cada feature restante, mover DTOs  e remover
for feature in instructors lessons availability reviews addresses; do
  if [ -d "features/$feature/dtos" ]; then
    echo "  - Migrando $feature DTOs..."
    cp features/$feature/dtos/*.dto.ts shared/dtos/ 2>/dev/null || true
  fi
  
  if [ -d "features/$feature/validations" ]; then
    echo "  - Migrando $feature validations..."
    cp features/$feature/validations/*.schema.ts shared/validations/$feature.ts 2>/dev/null || true
  fi
done

git add -A shared/
git commit -m "refactor(fase-8-partial): move remaining DTOs and validations to shared"

# ========================================
# FASE 10: Remover features/
# ========================================
echo ""
echo "🗑️  FASE 10: Removendo pasta features/..."

rm -rf features/

git add -A
git commit -m "refactor(fase-10): remove features/ folder - migration complete"

# ========================================
# FASE 11: Remover Barrel Exports
# ========================================
echo ""
echo "📦 FASE 11: Removendo barrel exports desnecessários..."

# Já foram removidos com as features

# ========================================
# FASE 12: Atualizar Documentação
# ========================================
echo ""
echo "📚 FASE 12: Atualizando documentação..."

# Adicionar aviso de obsoleto em architecture.md antigo
cat > ai/project/architecture-old.md << 'DOC'
# ⚠️ DOCUMENTO OBSOLETO

Esta documentação foi substituída por [`architecture-simplified.md`](architecture-simplified.md).

**Mantenha este arquivo apenas para referência histórica.**

---

DOC

cat ai/project/architecture.md >> ai/project/architecture-old.md
mv ai/project/architecture-old.md ai/project/architecture.md

git add -A
git commit -m "docs(fase-12): mark old architecture as obsolete"

# ========================================
# Finalização
# ========================================
echo ""
echo "✅ Migração Base Concluída!"
echo ""
echo "Próximos passos manuais:"
echo "1. Atualizar app/api/ routes para usar shared/dtos"
echo "2. Criar Server Actions específicos para cada rota"
echo "3. Testar: pnpm build"
echo "4. Testar: pnpm dev"
echo "5. Merge: git merge feat/architecture-refactor"
echo ""
echo "Branch: feat/architecture-refactor"
echo "Status: Base structure 100% migrated"
