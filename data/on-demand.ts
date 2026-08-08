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
  /** Piso do preço em BRL. O site sempre exibe como "a partir de". */
  priceFrom: number
  /** Prazo de entrega em dias úteis, contado a partir da captação ou do briefing. */
  deliveryDays: number | [number, number]
  /** Exige deslocamento até a propriedade — entra na agenda de captação por destino. */
  onSite?: boolean
  /** Rota de detalhe, quando o item também existe como sub-serviço. */
  detailSlug?: string
}

export const onDemandItems: OnDemandItem[] = [
  { slug: 'fotografia',   priceFrom: 800,  deliveryDays: 7,        onSite: true },
  { slug: 'video',        priceFrom: 800,  deliveryDays: 7,        onSite: true, detailSlug: 'captacoes' },
  { slug: 'drone',        priceFrom: 1000, deliveryDays: 5,        onSite: true },
  { slug: 'edicao-video', priceFrom: 300,  deliveryDays: 3 },
  { slug: 'design',       priceFrom: 100,  deliveryDays: 2 },
  { slug: 'landing-page', priceFrom: 2000, deliveryDays: [10, 15], detailSlug: 'landing-page' },
]

/** "R$ 800" · "R$ 1.000" — sem centavos, que só poluem um preço-piso. */
export function formatPrice(value: number, locale: string) {
  return new Intl.NumberFormat(locale === 'pt' ? 'pt-BR' : locale, {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value)
}

/** "7" ou "10 a 15", já com o conector traduzido. */
export function formatDays(days: OnDemandItem['deliveryDays'], to: string) {
  return Array.isArray(days) ? `${days[0]} ${to} ${days[1]}` : String(days)
}
