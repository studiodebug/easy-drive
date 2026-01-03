# 🎨 RetroUI Design System e Tailwind CSS

Este documento define as regras de estilo para o projeto EasyDrive.

## 🎯 Design System

O EasyDrive utiliza o **RetroUI Design System** com Tailwind CSS v4.

## 📦 Componentes Disponíveis

Consulte [`./components/retroui/`](./components/retroui/) para todos os componentes disponíveis:

### Básicos

- Button, Input, Label, Text, Card
- Badge, Avatar, Alert

### Formulários

- Checkbox, Radio, Switch, Select, Slider

### Navegação

- Menu, Breadcrumb, Command

### Feedback

- Dialog, Popover, Tooltip, Loader, Progress

### Data

- Table, Calendar, Accordion

### Charts

- AreaChart, BarChart, LineChart, PieChart

## 🔧 Uso dos Componentes

```typescript
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Input } from "@/components/retroui/Input";

export function MyComponent() {
  return (
    <Card>
      <Input placeholder="Digite algo" />
      <Button variant="primary">Salvar</Button>
    </Card>
  );
}
```

## 🎨 Design Patterns RetroUI

O RetroUI segue padrões visuais específicos:

- **Cor Primária**: Amarelo (#FFD700 ou similar)
- **Bordas**: Grossas e sólidas (border-4)
- **Sombras**: Sólidas e destacadas (não gradientes)
- **Estética**: Retro/vintage com alto contraste

## 📚 Documentação Completa

Para detalhes completos sobre estilo e design, consulte:

- [`./ai/AI-GUIDE.md`](./ai/AI-GUIDE.md) - Guia completo de desenvolvimento
- [`./components/retroui/`](./components/retroui/) - Catálogo de componentes

## ⚠️ Lembrete

- ✅ SEMPRE use componentes RetroUI ao invés de criar do zero
- ✅ Mantenha a consistência visual do design system
- ✅ Use Tailwind CSS v4 para estilos customizados
- ✅ Siga os padrões visuais retro/vintage do projeto
