# Booking e Creditos

## Decisoes de produto

- Moeda principal: creditos.
- Preco por aula: varia por instrutor (source-of-truth no backend via quote).
- Autenticacao: usuario pode selecionar horarios como guest, mas so confirma apos login; a selecao deve persistir no redirect.
- Semantica de UX: nao existe carrinho para aulas/slots; o fluxo correto e revisar e confirmar agendamento.

## Regras de precificacao

- Cada instrutor define um valor em creditos por aula.
- O calculo do total deve ser feito pelo backend (quote) para evitar divergencia.
- O frontend exibe apenas o resultado do quote e o breakdown por slot quando disponivel.

## Confirmacao e login

- Se o usuario nao estiver logado, a acao de confirmar agendamento deve redirecionar para login.
- A selecao de slots deve ser mantida em localStorage durante o login.
- Apos login, o fluxo retorna para o resumo e refaz o quote.

## Disponibilidade e mensagens

- Sem hold/reserva, nunca prometer que o horario esta garantido antes da confirmacao.
- Se algum slot ficar indisponivel, mostrar erro e permitir remover/atualizar a selecao.

## Estados de erro (API)

- AUTH_REQUIRED: usuario precisa logar para confirmar.
- SLOT_UNAVAILABLE: um ou mais horarios nao estao mais disponiveis.
- INSUFFICIENT_CREDITS: saldo insuficiente com missingCredits.

