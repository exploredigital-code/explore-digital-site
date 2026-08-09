import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Wordmark da Explore.
 *
 * São dois PNGs porque o arquivo de origem é bitmap: não existe vetor para
 * fazer a versão com `currentColor`. A variante escura é gerada repintando os
 * pixels visíveis do original com o verde da marca, preservando o alfa, então
 * a forma e a suavização das bordas são idênticas.
 *
 * O original é sage claro e sobre `menta-clara` dá 2,25 de contraste, ou seja,
 * some. A variante escura dá 12,18 no mesmo fundo.
 */
export function Logo({
  tone = 'light',
  className,
  priority = false,
}: {
  /** `light` = wordmark claro, para fundo escuro. `dark` = o inverso. */
  tone?: 'light' | 'dark'
  className?: string
  priority?: boolean
}) {
  return (
    <Image
      src={tone === 'dark' ? '/images/logo-dark.png' : '/images/logo.png'}
      alt="Explore Digital"
      width={800}
      height={200}
      className={cn('h-[42px] w-auto', className)}
      priority={priority}
    />
  )
}
