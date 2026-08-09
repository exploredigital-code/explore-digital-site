import Image from 'next/image'
import { cn } from '@/lib/utils'
import { PASTA, ehVideo, grade, slot, type Formato, type Slot } from '@/data/midia'

/**
 * Um slot de mídia.
 *
 * Enquanto `arquivo` estiver vazio no registro, mostra o placeholder tracejado
 * com o rótulo dizendo o que entra ali. Quando o arquivo aparece, vira a mídia.
 * A troca é dado, não código: ver `data/midia.ts`.
 *
 * Aceita imagem e vídeo no mesmo lugar, porque parte do acervo é reel. Quem
 * decide é a extensão do arquivo.
 *
 * Regra do SPEC seção 6: limita-se a LARGURA da coluna, nunca a altura do
 * slot. Travar altura deforma a proporção do material, e o acervo é
 * majoritariamente vertical. Por isso a proporção vem de `aspect-ratio`.
 */

const ASPECTO: Record<Formato, string> = {
  v916: 'aspect-[9/16]',
  v45:  'aspect-[4/5]',
  q11:  'aspect-square',
  h169: 'aspect-video',
}

/** Largura da peça dentro do trilho do celular, e coluna inteira fora dele. */
const NO_TRILHO = 'shrink-0 basis-[62vw] snap-start sm:basis-auto sm:w-full'

export function SlotMidia({ slot, className }: { slot: Slot; className?: string }) {
  const base = cn('relative overflow-hidden rounded-xl', NO_TRILHO, ASPECTO[slot.formato], className)
  const comum = { 'data-slot-midia': slot.formato, 'data-slot-id': slot.id }

  if (!slot.arquivo) {
    return (
      <figure
        // Superfície OPACA e clara, com texto escuro. A grade aparece sobre
        // fundo branco (disciplina, sub-serviço) e sobre fundo verde (home,
        // /sobre), então uma cor translúcida herdava dois fundos diferentes:
        // sobre branco virava um cinza-verde de meio-tom e o texto claro sumia
        // dentro dele. Com o fundo fixo o par de cores vale nos dois lugares.
        className={cn(
          base,
          'border border-dashed border-verde-medio/30 bg-menta-clara',
          'flex flex-col items-center justify-center gap-2 p-4 text-center'
        )}
        {...comum}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-verde-medio" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <figcaption className="text-[11px] leading-snug text-tinta-70">{slot.rotulo}</figcaption>
        <span className="text-[9.5px] font-bold tracking-[0.16em] uppercase text-verde-medio">{slot.formato}</span>
      </figure>
    )
  }

  const src = PASTA + slot.arquivo

  if (ehVideo(slot.arquivo)) {
    return (
      <figure className={base} {...comum}>
        <video
          className="absolute inset-0 h-full w-full object-cover"
          poster={slot.capa ? PASTA + slot.capa : undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={slot.rotulo}
        >
          <source src={src} />
        </video>
      </figure>
    )
  }

  return (
    <figure className={base} {...comum}>
      <Image src={src} alt={slot.rotulo} fill className="object-cover" sizes="(max-width: 640px) 62vw, 33vw" />
    </figure>
  )
}

/**
 * Grade de mídia.
 *
 * `reels` e `verticais` empacotam peças verticais em colunas estreitas.
 * `destaque` combina uma vertical com uma horizontal ao lado.
 *
 * No celular vira trilho horizontal: quatro peças 9:16 empilhadas geravam
 * mais de 600px por disciplina.
 */
export function GradeMidia({
  variante,
  children,
  rotuloTrilho,
}: {
  variante: 'reels' | 'verticais' | 'destaque'
  children: React.ReactNode
  rotuloTrilho?: string
}) {
  return (
    <div
      // `min-w-0` é obrigatório: item de flex ou de grid nasce com min-width
      // auto e se recusa a encolher abaixo do conteúdo, então o overflow-x
      // nunca dispara e a faixa estoura a largura da página, deixando as
      // últimas peças inalcançáveis.
      //
      // `touch-action: pan-y` garante que o dedo continua levando a página
      // para baixo mesmo começando dentro do trilho, e `snap-proximity`
      // sugere a parada em vez de prender entre duas peças.
      className={cn(
        'flex min-w-0 max-w-full gap-3 overflow-x-auto snap-x snap-proximity no-scrollbar -mx-6 px-6 pb-1 [touch-action:pan-y_pinch-zoom]',
        'sm:mx-0 sm:px-0 sm:overflow-visible sm:grid',
        variante === 'reels' && 'sm:grid-cols-4',
        variante === 'verticais' && 'sm:grid-cols-3',
        variante === 'destaque' && 'sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:items-start'
      )}
      tabIndex={0}
      role="group"
      aria-label={rotuloTrilho}
    >
      {children}
    </div>
  )
}

/**
 * Capa que preenche o contêiner do pai, sem impor proporção.
 *
 * O card do blog já define a própria altura, então aqui o slot não pode
 * carregar `aspect-ratio` nem a largura do trilho. Mesmo registro, mesma
 * regra de vazio, só sem a moldura.
 */
export function CapaMidia({ id, className }: { id: string; className?: string }) {
  const s = slot(id)

  if (!s || !s.arquivo) {
    return (
      <div
        className={cn(
          'absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-4 text-center',
          'border border-dashed border-verde-medio/30 bg-menta-clara',
          className
        )}
        data-slot-id={id}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-verde-medio" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        {s && <span className="text-[10.5px] leading-snug text-tinta-70 line-clamp-3">{s.rotulo}</span>}
      </div>
    )
  }

  const src = PASTA + s.arquivo
  if (ehVideo(s.arquivo)) {
    return (
      <video className={cn('absolute inset-0 h-full w-full object-cover', className)} poster={s.capa ? PASTA + s.capa : undefined} autoPlay muted loop playsInline preload="metadata" aria-label={s.rotulo} data-slot-id={id}>
        <source src={src} />
      </video>
    )
  }
  return <Image src={src} alt={s.rotulo} fill className={cn('object-cover', className)} sizes="(max-width: 640px) 100vw, 33vw" data-slot-id={id} />
}

/**
 * Uma grade inteira a partir da chave do registro.
 *
 * É o que os componentes usam: eles pedem "a grade de social-media" e não
 * sabem quais slots existem nem se já têm arquivo. Antes essa lista estava
 * copiada em dois arquivos e saía do lugar quando um dos dois era editado.
 */
export function GradeDoRegistro({ chave, rotulo }: { chave: string; rotulo?: string }) {
  const g = grade(chave)
  if (!g || g.slots.length === 0) return null
  return (
    <GradeMidia variante={g.variante} rotuloTrilho={rotulo}>
      {g.slots.map(s => <SlotMidia key={s.id} slot={s} />)}
    </GradeMidia>
  )
}
