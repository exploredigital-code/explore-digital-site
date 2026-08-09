/**
 * Porta 1 — entregas sob demanda.
 *
 * Escopo e prazo fechados: o cliente sabe o que precisa, pede e recebe. Não
 * passa pelo funil de consultoria, que existe para a Porta 2 (projetos).
 *
 * Só o que não se traduz mora aqui — preço, prazo e a rota de detalhe. Nome,
 * chamada e a lista do que inclui ficam em `messages/*.json`, sob a chave
 * `solucoes.on_demand_items`, casadas por slug.
 */

export interface OnDemandItem {
  slug: string
  /** Prazo de entrega em dias úteis, contado a partir da captação ou do briefing. */
  deliveryDays: number | [number, number]
  /** Exige deslocamento até a propriedade, entra na agenda de captação por destino. */
  onSite?: boolean
  /** Rota de detalhe, quando o item também existe como sub-serviço. */
  detailSlug?: string
}

/**
 * Nenhum item exibe valor. O preço saiu do site inteiro: escopo e prazo
 * qualificam, e o valor é fechado no diagnóstico. Onde havia preço agora há
 * CTA para a consultoria.
 */
export const onDemandItems: OnDemandItem[] = [
  { slug: 'fotografia',   deliveryDays: 7,        onSite: true },
  { slug: 'video',        deliveryDays: 7,        onSite: true, detailSlug: 'captacoes' },
  { slug: 'drone',        deliveryDays: 5,        onSite: true },
  { slug: 'edicao-video', deliveryDays: 3 },
  { slug: 'design',       deliveryDays: 2 },
  { slug: 'landing-page', deliveryDays: [10, 15], detailSlug: 'landing-page' },
]

/** "7" ou "10 a 15", já com o conector traduzido. */
export function formatDays(days: OnDemandItem['deliveryDays'], to: string) {
  return Array.isArray(days) ? `${days[0]} ${to} ${days[1]}` : String(days)
}
