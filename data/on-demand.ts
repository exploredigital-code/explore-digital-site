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

/*
 * ATENCAO: este arquivo perdeu a razao de existir.
 *
 * Fotografia, captacao e edicao viraram produtos de verdade em services.ts,
 * com rota, conteudo traduzido e prazo. Drone saiu por ser tecnica dentro de
 * captacao, design saiu por ser vago demais para vender e landing-page era
 * duplicata do sub-servico de mesmo slug.
 *
 * O que sobra aqui alimenta so a /servicos/sob-demanda, que morre junto com a
 * reorganizacao do hub. Quando ela sair, o arquivo sai junto.
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
  { slug: 'fotografia',   deliveryDays: 7, onSite: true, detailSlug: 'fotografia' },
  { slug: 'video',        deliveryDays: 7, onSite: true, detailSlug: 'captacao-video' },
  { slug: 'edicao-video', deliveryDays: 3,               detailSlug: 'edicao-video' },
]

/** "7" ou "10 a 15", já com o conector traduzido. */
export function formatDays(days: OnDemandItem['deliveryDays'], to: string) {
  return Array.isArray(days) ? `${days[0]} ${to} ${days[1]}` : String(days)
}
