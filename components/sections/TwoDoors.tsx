'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { pontualPorGrupo, recorrentes, type SubService } from '@/data/services'
import { getLocalizedSubService } from '@/data/services-content'

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  )
}

/**
 * As duas portas de compra, logo abaixo do hero.
 *
 * O eixo mudou. Antes dividia por 'sabe o que precisa' contra 'sabe o
 * problema', o que misturava projeto com mensalidade dentro da mesma porta.
 * Agora divide por como o dono pensa em dinheiro: gasto uma vez ou gasto todo
 * mês. Pontual primeiro, porque recorrente é a decisão maior e quem lê onze
 * avulsos entende o 'todo mês' sem rótulo explicando.
 */
export function TwoDoors() {
  const t = useTranslations('servicos')
  const locale = useLocale()

  /**
   * As portas nao listam produto nem grupo.
   *
   * A home ja mostra o trabalho logo acima, na secao de projetos. Listar treze
   * produtos numa bifurcacao obriga a pessoa a processar treze opcoes para
   * tomar uma decisao binaria, que e justamente a decisao que esta secao
   * existe para facilitar. O hub e quem responde "qual deles e o meu".
   *
   * Sem chip e sem contagem, os dois cartoes ficam com altura parecida
   * sozinhos, e some o desequilibrio de onze contra dois.
   */
  const portas = [
    {
      key: 'pontual',
      title: t('door1_title'),
      desc: t('door1_desc'),
      cta: t('door1_cta'),
      href: `/${locale}/servicos#pontual`,
      destaque: true,
    },
    {
      key: 'recorrente',
      title: t('door2_title'),
      desc: t('door2_desc'),
      cta: t('door2_cta'),
      href: `/${locale}/servicos#recorrente`,
      destaque: false,
    },
  ]

  return (
    <section id="como-trabalhamos" className="bg-g-dark py-24 lg:py-32 border-b border-white/[0.07]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">

        <AnimateIn className="mb-10 lg:mb-12 max-w-[720px]">
          <h2 className="text-[clamp(30px,4.5vw,52px)] font-bold leading-[1.05] tracking-[-0.025em] text-white mt-2">
            {t('doors_home_title')}
          </h2>
        </AnimateIn>

        <div className="grid md:grid-cols-2 gap-4 items-start">
          {portas.map((porta, i) => (
            <AnimateIn key={porta.key} delay={i * 0.1}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                <Link
                  href={porta.href}
                  className={cn(
                    'group flex flex-col p-7 lg:p-9 rounded-2xl border transition-colors duration-300',
                    porta.destaque
                      // Distincao por superficie: o pontual em verde-card,
                      // que e o token de cartao sobre escuro, e o recorrente
                      // com borda de acento. Nenhum token novo.
                      ? 'bg-verde-card border-verde-linha hover:border-verde-borda'
                      : 'bg-transparent border-sol/40 hover:border-sol'
                  )}
                >
                  <h3 className="text-[clamp(20px,2.6vw,28px)] leading-[1.15] tracking-[-0.02em] text-white font-bold mb-3">
                    {porta.title}
                  </h3>
                  <p className="text-[15px] leading-[1.75] text-menta-fraca mb-8">{porta.desc}</p>

                  <span className={cn(
                    'inline-flex items-center gap-2 text-[14px] font-bold mt-auto transition-all duration-200 group-hover:gap-3',
                    porta.destaque ? 'text-g-light' : 'text-white/70'
                  )}>
                    {porta.cta}
                    <ArrowIcon />
                  </span>
                </Link>
              </motion.div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
