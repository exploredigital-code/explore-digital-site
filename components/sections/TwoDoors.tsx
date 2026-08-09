'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { servicesData } from '@/data/services'
import { onDemandItems } from '@/data/on-demand'

type OnDemandCopy = { slug: string; name: string }

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
 * Substitui o accordion de Serviços, que repetia na home o catálogo inteiro de
 * /solucoes. Aqui a home só roteia: quem sabe o que quer vai para sob demanda,
 * quem tem um problema para diagnosticar vai para projetos.
 */
export function TwoDoors() {
  const t = useTranslations('servicos')
  const locale = useLocale()

  const copy = t.raw('on_demand_items') as OnDemandCopy[]

  const portas = [
    {
      key: 'on-demand',
      label: t('door1_label'),
      title: t('door1_title'),
      desc: t('door1_desc'),
      cta: t('door1_cta'),
      href: `/${locale}/servicos/sob-demanda`,
      // Onde havia "a partir de R$ X" agora vai a contagem de entregas.
      note: t('od_count', { n: onDemandItems.length }),
      chips: onDemandItems.map(i => copy.find(c => c.slug === i.slug)?.name).filter(Boolean) as string[],
      destaque: true,
    },
    {
      key: 'projects',
      label: t('door2_label'),
      title: t('door2_title'),
      desc: t('door2_desc'),
      cta: t('door2_cta'),
      href: `/${locale}/servicos#projetos`,
      note: t('count', { n: servicesData.reduce((n, s) => n + s.subServices.length, 0), p: servicesData.length }),
      chips: servicesData.map(s => s.title),
      destaque: false,
    },
  ]

  return (
    <section id="como-trabalhamos" className="bg-g-dark py-24 lg:py-32 border-b border-white/[0.07]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">

        <AnimateIn className="mb-12 lg:mb-14 max-w-[720px]">
          <SectionEyebrow>{t('doors_eyebrow')}</SectionEyebrow>
          <h2 className="text-[clamp(30px,4.5vw,52px)] font-bold leading-[1.05] tracking-[-0.025em] text-white mt-2">
            {t('doors_home_title')}
          </h2>
        </AnimateIn>

        <div className="grid md:grid-cols-2 gap-4 items-stretch">
          {portas.map((porta, i) => (
            <AnimateIn key={porta.key} delay={i * 0.1} className="h-full">
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="h-full">
                <Link
                  href={porta.href}
                  className={cn(
                    'group h-full flex flex-col p-8 lg:p-10 rounded-2xl border transition-colors duration-300',
                    porta.destaque
                      ? 'bg-g-light/[0.09] border-g-light/25 hover:border-g-light/50'
                      : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20'
                  )}
                >
                  <div className="flex items-baseline justify-between gap-4 mb-5">
                    <span className={cn(
                      'text-[10.5px] font-bold tracking-[0.2em] uppercase',
                      porta.destaque ? 'text-g-light' : 'text-white/40'
                    )}>
                      {porta.label}
                    </span>
                    <span className={cn(
                      'text-[11px] font-bold tabular-nums tracking-wide shrink-0',
                      porta.destaque ? 'text-g-light/70' : 'text-white/30'
                    )}>
                      {porta.note}
                    </span>
                  </div>

                  <h3 className="text-[clamp(20px,2.6vw,28px)] leading-[1.15] tracking-[-0.02em] text-white font-bold mb-3">
                    {porta.title}
                  </h3>
                  <p className="text-[15px] leading-[1.75] text-white/50 mb-7">{porta.desc}</p>

                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {porta.chips.map(chip => (
                      <span
                        key={chip}
                        className={cn(
                          'text-[11.5px] leading-snug rounded-full px-3 py-1.5',
                          porta.destaque ? 'bg-g-light/10 text-g-light/80' : 'bg-white/[0.05] text-white/45'
                        )}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

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
