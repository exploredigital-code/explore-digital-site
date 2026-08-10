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
 *
 * Passou a ser o único caminho para o wordmark. Antes havia seis `<Image>`
 * soltos repetindo src, alt e proporção, e cada um deles era um lugar onde o
 * dia de usar fundo claro passaria batido. Os seis declaravam proporção errada
 * também: `182x46` e `169x43` contra os `800x200` reais do arquivo. Não mudava
 * o desenho, porque `w-auto` com altura fixa faz o navegador usar a proporção
 * real, mas o Next reservava espaço de layout pela conta errada.
 *
 * A altura vem por `className` e sobrescreve o padrão, porque `cn` é
 * `twMerge`: `h-[38px]` ganha de `h-[42px]` sem depender de ordem no CSS.
 */
export function Logo({
  tone = 'light',
  className,
  priority = false,
  alt = 'Explore Digital',
}: {
  /** `light` = wordmark claro, para fundo escuro. `dark` = o inverso. */
  tone?: 'light' | 'dark'
  className?: string
  priority?: boolean
  /**
   * `alt=""` para quem já dá o nome acessível por fora, como o `/bio`, que
   * põe o wordmark dentro do `h1` com um `sr-only` ao lado. Sem isso o leitor
   * de tela anunciaria "Explore Digital" duas vezes seguidas.
   */
  alt?: string
}) {
  return (
    <Image
      src={tone === 'dark' ? '/images/logo-dark.png' : '/images/logo.png'}
      alt={alt}
      width={800}
      height={200}
      className={cn('h-[42px] w-auto', className)}
      priority={priority}
    />
  )
}
