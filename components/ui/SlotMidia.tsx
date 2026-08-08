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
        'relative w-full overflow-hidden rounded-xl border border-dashed border-verde-borda/45 bg-verde-card/40',
        'flex flex-col items-center justify-center gap-2 p-4 text-center',
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
}: {
  variante: 'reels' | 'verticais' | 'destaque'
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'grid gap-3',
        variante === 'reels' && 'grid-cols-2 sm:grid-cols-4',
        variante === 'verticais' && 'grid-cols-2 sm:grid-cols-3',
        variante === 'destaque' && 'grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-start'
      )}
    >
      {children}
    </div>
  )
}
