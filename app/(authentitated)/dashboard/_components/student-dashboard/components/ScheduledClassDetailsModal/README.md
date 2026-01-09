# ScheduledClassDetailsModal

Modal componetizada para exibir detalhes de uma aula agendada com fluxo completo de cancelamento.

## 📁 Estrutura de Pastas

```
ScheduledClassDetailsModal/
├── index.tsx                       # Componente principal (orquestrador)
├── types.ts                        # TypeScript types/interfaces
├── CANCELLATION_POLICY.md          # Documentação da política de cancelamento
├── README.md                       # Esta documentação
├── components/                     # Subcomponentes
│   ├── ClassInformation.tsx        # Informações da aula + alerta urgente
│   ├── InstructorDetails.tsx       # Detalhes completos do instrutor
│   ├── CancellationOverlay.tsx     # Overlay de confirmação de cancelamento
│   ├── PolicyCard.tsx              # Card com política de cancelamento
│   ├── RefundBreakdown.tsx         # Breakdown visual de reembolso
│   ├── UrgentAlert.tsx             # Alerta para aulas urgentes
│   └── index.ts                    # Barrel export
└── hooks/
    └── useCancellationPolicy.ts    # Hook para cálculo da política
```

## 🧩 Componentização

### **Componente Principal: `index.tsx`**
- **Responsabilidade**: Orquestração e estado
- **Estado gerenciado**:
  - `showCancelConfirmation`: controla overlay de cancelamento
  - `isCanceling`: loading state durante cancelamento
- **Props**:
  - `scheduledClass`: dados da aula
  - `open`: controle de abertura da modal
  - `onOpenChange`: callback para mudança de estado

### **Subcomponentes**

#### 1. `ClassInformation.tsx`
- Exibe informações principais da aula
- Integra `UrgentAlert` quando necessário
- Props: `scheduledClass`, `canCancel`

#### 2. `UrgentAlert.tsx`
- Alerta visual para aulas próximas (hoje ou amanhã)
- Props: `startsInDays`

#### 3. `InstructorDetails.tsx`
- Todas as informações do instrutor
- Avatar, rating, especialidades, bio
- Cards de veículo e localização
- Props: `instructor` (Instructor type)

#### 4. `CancellationOverlay.tsx`
- Overlay completo de confirmação
- Integra `PolicyCard` e alertas
- Ações de voltar e confirmar
- Props: `classSubject`, `policy`, `isUrgent`, `isCanceling`, `onBack`, `onConfirm`

#### 5. `PolicyCard.tsx`
- Card com política de cancelamento
- Badge dinâmico conforme severidade
- Integra `RefundBreakdown`
- Props: `policy` (CancellationPolicy type)

#### 6. `RefundBreakdown.tsx`
- Breakdown visual de créditos
- Mostra % de devolução e taxa
- Props: `refundPercentage`, `feePercentage`

### **Hook: `useCancellationPolicy.ts`**
- Calcula política baseada no tempo restante
- Retorna: `refundPercentage`, `feePercentage`, `severity`, `message`, `description`
- Input: `classDate` (Date)

## 🎨 Princípios de Design

### **1. Single Responsibility**
Cada componente tem uma responsabilidade clara e única.

### **2. Composition over Inheritance**
Componentes são compostos, não herdados.

### **3. Props Down, Events Up**
Dados fluem para baixo via props, ações sobem via callbacks.

### **4. Colocation**
Código relacionado fica próximo (components, hooks, types na mesma pasta).

### **5. Barrel Exports**
`index.ts` facilita imports limpos.

## 🔄 Fluxo de Dados

```
index.tsx (estado)
    ↓ Props
ClassInformation ← UrgentAlert
    ↓
InstructorDetails
    ↓
Dialog.Footer (ações)
    ↓ onClick
CancellationOverlay
    ↓ Usa hook
useCancellationPolicy → PolicyCard → RefundBreakdown
```

## 📦 Uso

```tsx
import { ScheduledClassDetailsModal } from "./components/ScheduledClassDetailsModal";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ScheduledClassDetailsModal
      scheduledClass={myClass}
      open={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}
```

## 🛠️ Manutenção

### **Para adicionar nova funcionalidade:**
1. Crie novo componente em `components/`
2. Exporte no `index.ts` de components
3. Use no componente principal

### **Para modificar política:**
Edite `useCancellationPolicy.ts` - toda a lógica está centralizada lá.

### **Para ajustar UI:**
Cada componente tem sua própria UI isolada, facilitando mudanças.

## ✅ Vantagens da Componentização

- ✨ **Manutenibilidade**: Código menor e focado
- 🧪 **Testabilidade**: Componentes isolados são fáceis de testar
- ♻️ **Reusabilidade**: Componentes podem ser reutilizados
- 📖 **Legibilidade**: Hierarquia clara e intuitiva
- 🔍 **Debugabilidade**: Bugs isolados em componentes específicos
- 🚀 **Escalabilidade**: Fácil adicionar features sem quebrar o existente

## 🎯 Boas Práticas Aplicadas

1. **TypeScript**: Tipagem forte em todos os componentes
2. **Props Interface**: Interfaces explícitas para todas as props
3. **Documentação JSDoc**: Especialmente no hook
4. **Naming Convention**: Nomes descritivos e consistentes
5. **File Organization**: Estrutura clara e escalável
6. **Barrel Exports**: Imports limpos e organizados
7. **Separation of Concerns**: Lógica, UI e estado separados
