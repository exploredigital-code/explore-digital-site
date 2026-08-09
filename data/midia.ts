/**
 * ══════════════════════════════════════════════════════════════════════════
 *  REGISTRO DE MÍDIA
 *  Todo slot de imagem e vídeo do site mora aqui. Um arquivo, uma lista.
 * ══════════════════════════════════════════════════════════════════════════
 *
 * COMO PREENCHER
 *
 *   1. Coloque o arquivo em  public/midia/
 *   2. Ache a linha do slot aqui embaixo pelo rótulo
 *   3. Escreva o nome do arquivo no campo `arquivo`
 *
 *      antes:  { id: 'home-estudio-1', arquivo: '',                rotulo: 'Time em captação' }
 *      depois: { id: 'home-estudio-1', arquivo: 'time-captacao.jpg', rotulo: 'Time em captação' }
 *
 *   Só isso. Não precisa mexer em componente nenhum.
 *
 * VÍDEO OU IMAGEM
 *
 *   O mesmo campo aceita os dois. Quem decide é a extensão:
 *   .mp4 e .webm entram como vídeo em loop e sem som, o resto como imagem.
 *   Se for vídeo, dá para apontar um quadro de capa em `capa`.
 *
 * ENQUANTO ESTIVER VAZIO
 *
 *   O site mostra o placeholder tracejado com o rótulo, dizendo o que entra
 *   ali. Nada quebra e nada some.
 *
 * FORMATO
 *
 *   v916  vertical 9:16, reel e story        (o padrão do acervo)
 *   v45   vertical 4:5, carrossel e feed
 *   q11   quadrado 1:1
 *   h169  horizontal 16:9                    (só painel e site em desktop)
 */

export type Formato = 'v916' | 'v45' | 'q11' | 'h169'

export interface Slot {
  /** Chave estável. Não mudar depois de preenchido. */
  id: string
  /** Nome do arquivo dentro de public/midia. Vazio = ainda não temos. */
  arquivo: string
  /** O que entra aqui. Aparece no placeholder e vira o alt da imagem. */
  rotulo: string
  formato: Formato
  /** Só para vídeo: quadro de capa, também dentro de public/midia. */
  capa?: string
}

export const PASTA = '/midia/'

/* ────────────────────────────── HOME ────────────────────────────── */
const home: Slot[] = [
  { id: 'home-estudio-1', arquivo: '', rotulo: 'Time em captação no destino', formato: 'v45' },
  { id: 'home-estudio-2', arquivo: '', rotulo: 'Bastidor de gravação',        formato: 'v45' },
  { id: 'home-estudio-3', arquivo: '', rotulo: 'Foto do time',                formato: 'v45' },
]

/* ───────────────────────────── SOBRE ────────────────────────────── */
const sobre: Slot[] = [
  { id: 'sobre-origem-1', arquivo: '', rotulo: 'Operação antiga: hostel ou pousada', formato: 'v45' },
  { id: 'sobre-origem-2', arquivo: '', rotulo: 'Escola de kite em aula',             formato: 'v45' },
  { id: 'sobre-origem-3', arquivo: '', rotulo: 'Time em captação no destino',        formato: 'v45' },
]

/* ─────────────── DISCIPLINAS (hub e página de disciplina) ────────────────
   Os mesmos slots servem os dois lugares. Antes a lista estava duplicada
   em dois componentes e saía do lugar quando um dos dois era editado.      */
const disciplinas: Slot[] = [
  { id: 'social-media-1',    arquivo: '', rotulo: 'Reel de pousada, hóspede em cena',    formato: 'v916' },
  { id: 'social-media-2',    arquivo: '', rotulo: 'Reel de beach club no fim de tarde',  formato: 'v916' },
  { id: 'social-media-3',    arquivo: '', rotulo: 'Story de bastidor da operação',       formato: 'v916' },
  { id: 'social-media-4',    arquivo: '', rotulo: 'Reel de café da manhã',               formato: 'v916' },

  { id: 'performance-ads-1', arquivo: '', rotulo: 'Criativo vertical de campanha',       formato: 'v916' },
  { id: 'performance-ads-2', arquivo: '', rotulo: 'Painel de resultado do gerenciador',  formato: 'h169' },

  { id: 'web-design-1',      arquivo: '', rotulo: 'Site aberto no celular',              formato: 'v916' },
  { id: 'web-design-2',      arquivo: '', rotulo: 'Site em desktop, dobra inicial',      formato: 'h169' },

  { id: 'motion-1',          arquivo: '', rotulo: 'Vinheta de abertura',                 formato: 'v916' },
  { id: 'motion-2',          arquivo: '', rotulo: 'Story de maré gerado em série',       formato: 'v916' },
  { id: 'motion-3',          arquivo: '', rotulo: 'Lower third aplicado em reel',        formato: 'v916' },
  { id: 'motion-4',          arquivo: '', rotulo: 'Criativo animado de anúncio',         formato: 'v916' },

  { id: 'automatizacoes-1',  arquivo: '', rotulo: 'Resposta automática no WhatsApp',     formato: 'v916' },
  { id: 'automatizacoes-2',  arquivo: '', rotulo: 'Painel de reserva e ocupação',        formato: 'h169' },

  { id: 'branding-1',        arquivo: '', rotulo: 'Aplicação de marca em papelaria',     formato: 'v45' },
  { id: 'branding-2',        arquivo: '', rotulo: 'Paleta e tipografia',                 formato: 'v45' },
  { id: 'branding-3',        arquivo: '', rotulo: 'Fachada ou sinalização',              formato: 'v45' },
]

/* ─────────────────────────── CASE / PORTFÓLIO ───────────────────── */
const cases: Slot[] = [
  { id: 'case-cabare-abertura',  arquivo: '', rotulo: 'Foto ou vídeo de abertura do Cabaré du Vento', formato: 'h169' },
  { id: 'case-cabare-painel',    arquivo: '', rotulo: 'Print do painel com o período visível',        formato: 'h169' },
]

/* ─────────────────────────────── BLOG ────────────────────────────────
   Uma capa por post. Estavam todas no Unsplash, o que colocava imagem de
   banco em 60 páginas indexáveis de uma agência que vende produção própria.
   O rótulo diz que tipo de imagem a capa pede, para dar para preencher em
   lote sem abrir cada artigo.                                            */
const blog: Slot[] = [
  { id: 'blog-site-escola-kitesurf-ceara', arquivo: '', rotulo: 'Capa de "Por que sua escola de kitesurf precisa de um...": site de cliente aberto no celular ou no desktop', formato: 'h169' },
  { id: 'blog-site-pousada-jericoacoara', arquivo: '', rotulo: 'Capa de "Como um site bem feito aumenta reservas...": site de cliente aberto no celular ou no desktop', formato: 'h169' },
  { id: 'blog-landing-page-kite-cumbuco', arquivo: '', rotulo: 'Capa de "Landing page para escolas de kite em Cumbuco:...": site de cliente aberto no celular ou no desktop', formato: 'h169' },
  { id: 'blog-site-beach-club-litoral-ceara', arquivo: '', rotulo: 'Capa de "Site para beach clubs no litoral cearense: o...": site de cliente aberto no celular ou no desktop', formato: 'h169' },
  { id: 'blog-site-wingfoil-fortaleza-cumbuco', arquivo: '', rotulo: 'Capa de "Como criar um site para wingfoil que converte...": site de cliente aberto no celular ou no desktop', formato: 'h169' },
  { id: 'blog-site-pousada-pipa-turistas-sudeste', arquivo: '', rotulo: 'Capa de "Site para pousadas em Pipa: como atrair...": site de cliente aberto no celular ou no desktop', formato: 'h169' },
  { id: 'blog-seo-local-pousada-jericoacoara', arquivo: '', rotulo: 'Capa de "SEO local para pousadas em Jericoacoara: como...": site de cliente aberto no celular ou no desktop', formato: 'h169' },
  { id: 'blog-elementos-site-escola-kite-wingfoil', arquivo: '', rotulo: 'Capa de "7 elementos que todo site de escola de kite e...": site de cliente aberto no celular ou no desktop', formato: 'h169' },
  { id: 'blog-site-para-experiencias-litoral-ceara', arquivo: '', rotulo: 'Capa de "Site para experiências turísticas no litoral...": site de cliente aberto no celular ou no desktop', formato: 'h169' },
  { id: 'blog-google-meu-negocio-pousadas-escolas-ceara', arquivo: '', rotulo: 'Capa de "Google Meu Negócio para pousadas e escolas no...": site de cliente aberto no celular ou no desktop', formato: 'h169' },
  { id: 'blog-google-ads-escola-kitesurf-ceara', arquivo: '', rotulo: 'Capa de "Google Ads para escolas de kitesurf no Ceará:...": painel de campanha ou criativo de anúncio', formato: 'h169' },
  { id: 'blog-meta-ads-pousadas-jericoacoara', arquivo: '', rotulo: 'Capa de "Meta Ads para pousadas em Jericoacoara: como...": painel de campanha ou criativo de anúncio', formato: 'h169' },
  { id: 'blog-anuncios-instagram-beach-club-cumbuco', arquivo: '', rotulo: 'Capa de "Como anunciar seu beach club em Cumbuco no...": painel de campanha ou criativo de anúncio', formato: 'h169' },
  { id: 'blog-trafego-pago-wingfoil-ceara', arquivo: '', rotulo: 'Capa de "Tráfego pago para wingfoil: como escolas no...": painel de campanha ou criativo de anúncio', formato: 'h169' },
  { id: 'blog-google-ads-pousadas-canoa-quebrada', arquivo: '', rotulo: 'Capa de "Google Ads para pousadas em Canoa Quebrada:...": painel de campanha ou criativo de anúncio', formato: 'h169' },
  { id: 'blog-reduzir-ota-trafego-pago-ceara', arquivo: '', rotulo: 'Capa de "Como reduzir a dependência das OTAs em hotéis...": painel de campanha ou criativo de anúncio', formato: 'h169' },
  { id: 'blog-meta-ads-kite-wingfoil-segmentacao', arquivo: '', rotulo: 'Capa de "Meta Ads para kite e wingfoil: como segmentar...": painel de campanha ou criativo de anúncio', formato: 'h169' },
  { id: 'blog-remarketing-escola-kitesurf', arquivo: '', rotulo: 'Capa de "Remarketing para escolas de kitesurf: como...": painel de campanha ou criativo de anúncio', formato: 'h169' },
  { id: 'blog-campanhas-alta-temporada-kite-ceara', arquivo: '', rotulo: 'Capa de "Como preparar suas campanhas de tráfego pago...": painel de campanha ou criativo de anúncio', formato: 'h169' },
  { id: 'blog-google-ads-meta-ads-pousadas-litoral', arquivo: '', rotulo: 'Capa de "Google Ads vs Meta Ads para pousadas no...": painel de campanha ou criativo de anúncio', formato: 'h169' },
  { id: 'blog-trafego-pago-pipa-turistas-rio-sp', arquivo: '', rotulo: 'Capa de "Tráfego pago para pousadas em Pipa: como...": painel de campanha ou criativo de anúncio', formato: 'h169' },
  { id: 'blog-reels-kitesurf-atrair-alunos-ceara', arquivo: '', rotulo: 'Capa de "Reels para kitesurf: como criar vídeos que...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-instagram-pousadas-jericoacoara-agenda', arquivo: '', rotulo: 'Capa de "Instagram para pousadas em Jericoacoara: o...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-conteudo-redes-sociais-wingfoil', arquivo: '', rotulo: 'Capa de "Como produzir conteúdo para redes sociais que...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-social-media-beach-clubs-alta-temporada', arquivo: '', rotulo: 'Capa de "Social media para beach clubs no litoral...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-calendario-editorial-pousadas-beach-clubs-ceara', arquivo: '', rotulo: 'Capa de "Como criar um calendário editorial para...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-tiktok-kitesurf-ceara-alunos', arquivo: '', rotulo: 'Capa de "TikTok para kitesurf no Ceará: como escolas...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-stories-reels-escolas-kite-wingfoil', arquivo: '', rotulo: 'Capa de "Stories vs Reels: o que funciona melhor para...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-crescer-instagram-kitesurf-cumbuco-paracuru', arquivo: '', rotulo: 'Capa de "Como crescer no Instagram com conteúdo de...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-gestao-redes-sociais-temporada-kite', arquivo: '', rotulo: 'Capa de "Gestão de redes sociais para escolas de...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-conteudo-pipa-turistas-sudeste', arquivo: '', rotulo: 'Capa de "Conteúdo para redes sociais em Pipa: como...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-setup-instagram-escola-kitesurf-zero', arquivo: '', rotulo: 'Capa de "Setup de Instagram para escolas de kitesurf:...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-perfil-instagram-pousada-litoral-ceara', arquivo: '', rotulo: 'Capa de "Como estruturar o perfil do Instagram da sua...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-setup-redes-sociais-beach-club-ceara', arquivo: '', rotulo: 'Capa de "Setup de redes sociais para novos beach clubs...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-link-bio-escola-kite-wingfoil-converter', arquivo: '', rotulo: 'Capa de "Como configurar o link na bio para escolas de...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-branding-escolas-kitesurf-estilo-vida', arquivo: '', rotulo: 'Capa de "Branding para escolas de kitesurf no Ceará:...": aplicação de marca, paleta ou fachada', formato: 'h169' },
  { id: 'blog-identidade-visual-pousadas-litoral-ceara', arquivo: '', rotulo: 'Capa de "Identidade visual para pousadas no litoral...": aplicação de marca, paleta ou fachada', formato: 'h169' },
  { id: 'blog-naming-escola-wingfoil-memoravel', arquivo: '', rotulo: 'Capa de "Como criar um naming para sua escola de...": aplicação de marca, paleta ou fachada', formato: 'h169' },
  { id: 'blog-branding-beach-club-cumbuco-referencia', arquivo: '', rotulo: 'Capa de "Branding para beach clubs em Cumbuco: a...": aplicação de marca, paleta ou fachada', formato: 'h169' },
  { id: 'blog-identidade-visual-impacta-matriculas-kite', arquivo: '', rotulo: 'Capa de "Por que a identidade visual da sua escola de...": aplicação de marca, paleta ou fachada', formato: 'h169' },
  { id: 'blog-manual-de-marca-negocio-turistico-ceara', arquivo: '', rotulo: 'Capa de "Manual de marca para negócios turísticos no...": aplicação de marca, paleta ou fachada', formato: 'h169' },
  { id: 'blog-rebranding-pousadas-litoral-ceara', arquivo: '', rotulo: 'Capa de "Rebranding para pousadas no litoral do Ceará:...": aplicação de marca, paleta ou fachada', formato: 'h169' },
  { id: 'blog-branding-wingfoil-premium-ceara', arquivo: '', rotulo: 'Capa de "Branding para experiências de wingfoil: como...": aplicação de marca, paleta ou fachada', formato: 'h169' },
  { id: 'blog-cumbuco-capital-kitesurf-ceara', arquivo: '', rotulo: 'Capa de "Cumbuco: por que a capital do kitesurf...": kite ou wingfoil no litoral do CE', formato: 'h169' },
  { id: 'blog-temporada-vento-ceara-marketing', arquivo: '', rotulo: 'Capa de "Temporada de vento no Ceará: como escolas de...": kite ou wingfoil no litoral do CE', formato: 'h169' },
  { id: 'blog-jericoacoara-kitesurf-marketing', arquivo: '', rotulo: 'Capa de "Jericoacoara e o kitesurf: como negócios do...": kite ou wingfoil no litoral do CE', formato: 'h169' },
  { id: 'blog-wingfoil-crescimento-litoral-ceara-2026', arquivo: '', rotulo: 'Capa de "Wingfoil no litoral cearense em 2026: o...": kite ou wingfoil no litoral do CE', formato: 'h169' },
  { id: 'blog-paracuru-icarai-kite-mkt', arquivo: '', rotulo: 'Capa de "Paracuru e Icaraí de Amontada: como escolas...": kite ou wingfoil no litoral do CE', formato: 'h169' },
  { id: 'blog-como-escola-kite-virou-referencia-nacional', arquivo: '', rotulo: 'Capa de "Como uma escola de kitesurf do Ceará virou...": kite ou wingfoil no litoral do CE', formato: 'h169' },
  { id: 'blog-drone-captacao-kitesurf-marketing', arquivo: '', rotulo: 'Capa de "Drone e captação aérea para kitesurf: como...": bastidor de captação, câmera ou drone em uso', formato: 'h169' },
  { id: 'blog-fotografia-profissional-pousadas-reservas', arquivo: '', rotulo: 'Capa de "Fotografia profissional para pousadas no...": bastidor de captação, câmera ou drone em uso', formato: 'h169' },
  { id: 'blog-video-kite-wingfoil-gera-leads', arquivo: '', rotulo: 'Capa de "Como vídeos de kitesurf e wingfoil captados...": bastidor de captação, câmera ou drone em uso', formato: 'h169' },
  { id: 'blog-o-que-filmar-escola-esporte-redes', arquivo: '', rotulo: 'Capa de "Produção de vídeo para escolas de esporte: o...": bastidor de captação, câmera ou drone em uso', formato: 'h169' },
  { id: 'blog-captacao-profissional-roi-pousada-jeri', arquivo: '', rotulo: 'Capa de "Por que investir em captação profissional é o...": bastidor de captação, câmera ou drone em uso', formato: 'h169' },
  { id: 'blog-bastidores-escola-kite-conteudo-autentico', arquivo: '', rotulo: 'Capa de "Bastidores da escola de kite: como conteúdo...": bastidor de captação, câmera ou drone em uso', formato: 'h169' },
  { id: 'blog-crm-escola-kitesurf-matriculas', arquivo: '', rotulo: 'Capa de "CRM para escolas de kitesurf: como organizar...": painel de sistema ou automação em tela', formato: 'h169' },
  { id: 'blog-automacao-whatsapp-pousadas-ceara', arquivo: '', rotulo: 'Capa de "Automação de WhatsApp para pousadas no...": painel de sistema ou automação em tela', formato: 'h169' },
  { id: 'blog-sistema-interno-escola-kite-matriculas', arquivo: '', rotulo: 'Capa de "Como um sistema interno ajudou uma escola de...": painel de sistema ou automação em tela', formato: 'h169' },
  { id: 'blog-crm-relacionamento-hospedes-hotel', arquivo: '', rotulo: 'Capa de "Gestão de relacionamento com hóspedes: como...": painel de sistema ou automação em tela', formato: 'h169' },
  { id: 'blog-automacao-marketing-pousadas-escala', arquivo: '', rotulo: 'Capa de "Automação de marketing para pousadas e...": painel de sistema ou automação em tela', formato: 'h169' },
]

/** Tudo junto, que é o que os componentes consultam. */
export const slots: Slot[] = [...home, ...sobre, ...disciplinas, ...cases, ...blog]

/** Quais slots pertencem a cada grade, na ordem de exibição. */
export const GRADES: Record<string, { variante: 'reels' | 'verticais' | 'destaque'; ids: string[] }> = {
  'home-estudio':    { variante: 'verticais', ids: ['home-estudio-1', 'home-estudio-2', 'home-estudio-3'] },
  'sobre-origem':    { variante: 'verticais', ids: ['sobre-origem-1', 'sobre-origem-2', 'sobre-origem-3'] },
  'social-media':    { variante: 'reels',     ids: ['social-media-1', 'social-media-2', 'social-media-3', 'social-media-4'] },
  'performance-ads': { variante: 'destaque',  ids: ['performance-ads-1', 'performance-ads-2'] },
  'web-design':      { variante: 'destaque',  ids: ['web-design-1', 'web-design-2'] },
  'motion':          { variante: 'reels',     ids: ['motion-1', 'motion-2', 'motion-3', 'motion-4'] },
  'automatizacoes':  { variante: 'destaque',  ids: ['automatizacoes-1', 'automatizacoes-2'] },
  'branding':        { variante: 'verticais', ids: ['branding-1', 'branding-2', 'branding-3'] },
}

const porId = new Map(slots.map(s => [s.id, s]))

export function slot(id: string): Slot | undefined {
  return porId.get(id)
}

export function grade(chave: string) {
  const g = GRADES[chave]
  if (!g) return undefined
  return { variante: g.variante, slots: g.ids.map(id => porId.get(id)).filter((s): s is Slot => Boolean(s)) }
}

/** `.mp4` e `.webm` entram como vídeo; o resto, como imagem. */
export function ehVideo(arquivo: string) {
  return /\.(mp4|webm)$/i.test(arquivo)
}

/** Quantos slots já têm arquivo, para o relatório de pendência. */
export function preenchidos() {
  const total = slots.length
  const cheios = slots.filter(s => s.arquivo).length
  return { total, cheios, vazios: total - cheios }
}
