'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { AnimateIn } from '@/components/ui/AnimateIn'

type Gargalo = { num: string; title: string; desc: string; slug: string }

/**
 * Os três gargalos, ditos com a palavra do cliente e não com a nossa.
 *
 * Cada um aponta para a disciplina que resolve. O terceiro, "minha operação
 * vive no improviso", é o que puxa para automatizações.
 */
export function Gargalos() {
  const t = useTranslations('home')
  const locale = useLocale()
  const itens = t.raw('gargalos_items') as Gargalo[]

  return (
    <section id="gargalos" className="bg-menta-clara py-20 lg:py-28">
      <div className="max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16">
        <AnimateIn className="mb-10 lg:mb-12">
          <SectionEyebrow light>{t('gargalos_eyebrow')}</SectionEyebrow>
          <h2 className="text-[clamp(28px,4.2vw,48px)] leading-[1.05] tracking-[-0.03em] text-verde mt-2 max-w-[620px]">
            {t('gargalos_title')}
          </h2>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-4">
          {itens.map((g, i) => (
            <motion.div
              key={g.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px 0px' }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <Link
                href={`/${locale}/servicos/${g.slug}`}
                className="group h-full flex flex-col p-7 rounded-2xl border border-tinta-16 bg-white hover:border-verde-medio/45 hover:shadow-md transition-all duration-300"
              >
                <span className="text-[11px] font-bold tabular-nums text-verde-medio mb-3">{g.num}</span>
                <h3 className="text-[18px] leading-snug tracking-[-0.015em] text-verde font-bold mb-3">
                  {g.title}
                </h3>
                <p className="text-[14px] leading-[1.7] text-tinta-70 mb-6 flex-1">{g.desc}</p>
                <span className="inline-flex items-center gap-2 text-[12.5px] font-bold text-verde-medio transition-all duration-200 group-hover:gap-2.5">
                  {t('gargalos_cta')}
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                    <path d="M2 7h10M8 3l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
