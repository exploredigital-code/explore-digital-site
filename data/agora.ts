/**
 * Feed "Agora": o que saiu do estúdio nas últimas semanas.
 *
 * Substitui a fileira de logos. Fato datado prova mais que logo enfileirado,
 * porque diz o que foi feito e quando.
 *
 * ATENÇÃO ao campo `confirmado`. Só o item do No Worries foi confirmado pelo
 * cliente (56 stories de maré, agosto e setembro). Os outros três vieram do
 * HTML de referência e ainda não foram checados contra o que de fato aconteceu.
 * Data errada em feed público é o tipo de coisa que um cliente corrige em
 * conversa, então elas precisam de aval antes do deploy.
 */

export interface ItemAgora {
  data: string
  cliente: string
  local: string
  descricao: string
  tag: string
  /** false = veio da referência e aguarda confirmação do cliente. */
  confirmado: boolean
}

export const agora: ItemAgora[] = [
  {
    data: 'Ago 2026',
    cliente: 'No Worries',
    local: 'Pipa',
    descricao: 'Sistema de stories de maré, 56 peças automatizadas.',
    tag: 'Motion',
    confirmado: true,
  },
  {
    data: 'Jul 2026',
    cliente: 'Looping',
    local: 'Ilha do Guajirú',
    descricao: 'Site novo no ar e campanha de temporada.',
    tag: 'Web · Ads',
    confirmado: false,
  },
  {
    data: 'Jul 2026',
    cliente: 'Cabaré du Vento',
    local: 'Preá',
    descricao: 'Programação semanal gerada em série.',
    tag: 'Automatização',
    confirmado: false,
  },
  {
    data: 'Jun 2026',
    cliente: 'Villa Conduru',
    local: 'Preá',
    descricao: 'Estratégia de mídia paga para a alta temporada.',
    tag: 'Performance',
    confirmado: false,
  },
]
