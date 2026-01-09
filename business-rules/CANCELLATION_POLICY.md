# Política de Cancelamento de Aulas

## Visão Geral

A política de cancelamento é calculada dinamicamente com base no tempo restante até o início da aula agendada. Quanto mais próximo do horário da aula, maior será a taxa de cancelamento.

## Regras de Reembolso

### 🟢 Cancelamento Gratuito (Mais de 24 horas)
- **Reembolso**: 100% dos créditos
- **Taxa**: 0%
- **Mensagem**: "Cancelamento gratuito"
- **Descrição**: "Seus créditos serão devolvidos integralmente."

### 🟡 Taxa Baixa (4h a 24h antes)
- **Reembolso**: 90% dos créditos
- **Taxa**: 10%
- **Mensagem**: "Taxa de cancelamento: 10%"
- **Descrição**: "90% dos créditos serão devolvidos para sua conta."

### 🟠 Taxa Média (2h a 4h antes)
- **Reembolso**: 70% dos créditos
- **Taxa**: 30%
- **Mensagem**: "Taxa de cancelamento: 30%"
- **Descrição**: "70% dos créditos serão devolvidos para sua conta."

### 🔴 Taxa Alta (1h a 2h antes)
- **Reembolso**: 50% dos créditos
- **Taxa**: 50%
- **Mensagem**: "Taxa de cancelamento: 50%"
- **Descrição**: "Apenas 50% dos créditos serão devolvidos."

### ⛔ Sem Reembolso (Menos de 1h antes)
- **Reembolso**: 0% dos créditos
- **Taxa**: 100%
- **Mensagem**: "Sem direito a reembolso"
- **Descrição**: "Os créditos não poderão ser devolvidos."

## Implementação Técnica

A função `getCancellationPolicy()` calcula automaticamente:
1. Tempo restante até a aula (em horas)
2. Porcentagem de reembolso aplicável
3. Severidade da ação (para UI feedback)
4. Mensagens apropriadas para o usuário

## UX Writing - Princípios Aplicados

### 1. Transparência
- Usuário vê claramente quanto receberá de volta
- Breakdown visual de créditos devolvidos vs. taxa

### 2. Clareza
- Linguagem simples e direta
- Sem jargões técnicos
- Foco no impacto prático

### 3. Feedback Visual
- Cores indicam severidade (azul → vermelho)
- Ícones consistentes (AlertTriangle)
- Badges coloridos para status

### 4. Justiça
- Política escalonada (não é binário)
- Sempre há possibilidade de algum reembolso (exceto <1h)
- Regras claras antes da confirmação

### 5. Reversibilidade
- Botão "Voltar" sempre disponível
- Nenhuma ação definitiva sem confirmação explícita
- Loading states durante processamento

## Fluxo de Cancelamento

```
1. Usuário clica "Cancelar Aula"
   ↓
2. Overlay de confirmação aparece
   - Mostra política aplicável
   - Exibe breakdown de créditos
   - Alerta especial se crítico
   ↓
3. Usuário pode:
   - "Voltar" → Retorna à tela anterior
   - "Sim, cancelar aula" → Executa cancelamento
   ↓
4. Durante cancelamento:
   - Botões ficam disabled
   - Texto muda para "Cancelando..."
   ↓
5. Após conclusão:
   - Modal fecha automaticamente
   - Créditos são processados conforme política
```

## Melhorias Futuras Sugeridas

1. **Notificação de sucesso**: Toast confirmando cancelamento e créditos devolvidos
2. **Histórico de cancelamentos**: Mostrar cancelamentos anteriores
3. **Sugestão de reagendamento**: Oferecer horários alternativos
4. **Grace period**: Permitir desfazer cancelamento em X minutos
5. **Notificação ao instrutor**: Sistema de aviso automático
6. **Razão do cancelamento**: Campo opcional para feedback
