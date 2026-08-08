import { cn } from '@/lib/utils'

/**
 * Placeholder de mídia, marcado de propósito até o acervo chegar.
 *
 * Regra do SPEC seção 6: limita-se a LARGURA da coluna, nunca a altura do
 * slot. Travar altura deforma a proporção do próprio material, e o acervo da
 * Explore é majoritariamente vertical. Por isso a proporção vem de
 * `aspect-ratio` e o slot ocupa 100% da coluna.
 *
 * O rótulo diz o que entra ali, para o placeholder ser útil na revisão em vez
 * de virar um retângulo cinza sem contexto.
 */

export type Proporcao = 'v916' | 'v45' | 'q11' | 'h169'

const ASPECTO: Record<Proporcao, string> = {
  v916: 'aspect-[9/16]',
  v45:  'aspect-[4/5]',
  q11:  'aspect-square',
  h169: 'aspect-video',
}

export function SlotMidia({
  proporcao = 'v916',
  rotulo,
  className,
}: {
  proporcao?: Proporcao
  /** O que entra aqui quando o material real chegar. */
  rotulo: string
  className?: string
}) {
  return (
    <figure
      className={cn(
        'relative overflow-hidden rounded-xl border border-dashed border-verde-borda/45 bg-verde-card/40',
        'flex flex-col items-center justify-center gap-2 p-4 text-center',
        // No trilho, cada peça ocupa 62% da largura: sobra borda da próxima à
        // vista, que é o que avisa que dá para arrastar. Fora do trilho volta
        // a ocupar a coluna inteira. Em nenhum dos dois a ALTURA é travada,
        // ela sai da proporção, senão o material vertical deforma.
        'shrink-0 basis-[62vw] snap-start sm:basis-auto sm:w-full',
        ASPECTO[proporcao],
        className
      )}
      data-slot-midia={proporcao}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-verde-luz/45" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <figcaption className="text-[11px] leading-snug text-menta-fraca">{rotulo}</figcaption>
      <span className="text-[9.5px] font-bold tracking-[0.16em] uppercase text-verde-luz/40">{proporcao}</span>
    </figure>
  )
}

/**
 * Grade de mídia.
 *
 * `reels` e `verticais` empacotam peças verticais em colunas estreitas.
 * `destaque` combina uma vertical com uma horizontal ao lado. A virada para
 * trilho horizontal com scroll snap no celular é da fase 6.
 */
export function GradeMidia({
  variante,
  children,
  rotuloTrilho,
}: {
  variante: 'reels' | 'verticais' | 'destaque'
  children: React.ReactNode
  /** Rótulo acessível do trilho, para quem navega por teclado saber onde está. */
  rotuloTrilho?: string
}) {
  return (
    <div
      // No celular a grade vira trilho horizontal: quatro peças 9:16
      // empilhadas geravam mais de 600px por disciplina. `overflow-x-auto` com
      // `snap-x` rola só no eixo X, então o dedo continua levando a página
      // para baixo, e `touch-action: pan-y` garante isso mesmo dentro do
      // trilho. `snap-proximity` em vez de `mandatory` porque o obrigatório
      // prende o dedo entre duas peças; aqui ele sugere, não força.
      className={cn(
        // min-w-0 é obrigatório: item de flex ou de grid nasce com min-width auto e
        // se recusa a encolher abaixo do conteúdo, então o overflow-x nunca
        // dispara e a faixa simplesmente estoura a largura da página, deixando
        // as últimas peças inalcançáveis.
        'flex min-w-0 max-w-full gap-3 overflow-x-auto snap-x snap-proximity no-scrollbar -mx-6 px-6 pb-1 [touch-action:pan-y_pinch-zoom]',
        'sm:mx-0 sm:px-0 sm:overflow-visible sm:grid',
        variante === 'reels' && 'sm:grid-cols-4',
        variante === 'verticais' && 'sm:grid-cols-3',
        variante === 'destaque' && 'sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:items-start'
      )}
      // Trilho rolável precisa ser alcançável e rolável por teclado.
      tabIndex={0}
      role="group"
      aria-label={rotuloTrilho}
    >
      {children}
    </div>
  )
}
