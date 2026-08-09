'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { AnimateIn } from '@/components/ui/AnimateIn'

type Disciplina = { slug: string; label: string; title: string; desc: string }

/**
 * As seis disciplinas na home.
 *
 * Um CTA só, no fim, para /servicos. Seis links repetidos dividiriam o clique
 * em seis e a home não é o lugar de escolher disciplina: é o lugar de entender
 * que existem seis.
 *
 * Linhas, não cards: seis cards empilhariam demais no celular, e a home já é
 * a segunda página mais alta do site.
 */
export function Disciplinas() {
  const t = useTranslations('home')
  const locale = useLocale()
  const itens = t.raw('disc_items') as Disciplina[]

  return (
    <section id="disciplinas" className="bg-verde py-20 lg:py-28">
      <div className="max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16">
          <AnimateIn>
            <SectionEyebrow>{t('disc_eyebrow')}</SectionEyebrow>
            <h2 className="text-[clamp(28px,4.2vw,48px)] leading-[1.05] tracking-[-0.03em] text-menta mt-2 mb-5">
              {t('disc_title')}
            </h2>
            <p className="text-menta-fraca text-[15.5px] leading-[1.75] max-w-[420px]">{t('disc_sub')}</p>
          </AnimateIn>

          <div className="divide-y divide-verde-linha">
            {itens.map((d, i) => (
              <motion.div
                key={d.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px 0px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="grid sm:grid-cols-[140px_1fr] gap-1.5 sm:gap-6 py-5 first:pt-0"
              >
                <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-verde-luz pt-1">
                  {d.label}
                </span>
                <div>
                  <h3 className="text-[16.5px] font-bold text-menta leading-snug mb-1">{d.title}</h3>
                  <p className="text-[13.5px] leading-[1.7] text-menta-fraca">{d.desc}</p>
                </div>
              </motion.div>
            ))}

            <AnimateIn className="pt-7">
              <Link
                href={`/${locale}/servicos`}
                className="inline-flex items-center gap-2.5 bg-sol text-verde font-medium px-7 py-3.5 rounded-full text-[14.5px] hover:bg-sol-forte hover:-translate-y-0.5 transition-all duration-200"
              >
                {t('disc_cta')}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </Link>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  )
}
