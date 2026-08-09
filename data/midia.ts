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

/** Tudo junto, que é o que os componentes consultam. */
export const slots: Slot[] = [...home, ...sobre, ...disciplinas, ...cases]

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
