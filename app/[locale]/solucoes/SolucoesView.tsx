'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import { servicesData } from '@/data/services'

const WA_BASE = 'https://wa.me/+5585991043067?text='
const EXTRAS_ID = 'avulsos'

type Extra = { name: string; desc: string }

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  )
}

export function SolucoesView() {
  const t = useTranslations('solucoes')
  const locale = useLocale()

  const totalSolucoes = servicesData.reduce((n, s) => n + s.subServices.length, 0)
  const extras = t.raw('extras_items') as Extra[]

  // Âncoras: as 5 frentes + o bloco de avulsos.
  const secoes = [...servicesData.map(s => s.slug), EXTRAS_ID]
  const [ativo, setAtivo] = useState(secoes[0])
  const refs = useRef<Record<string, HTMLElement | null>>({})

  // Destaca no trilho a frente que está sendo lida.
  useEffect(() => {
    const observer = new IntersectionObserver(
      entradas => {
        const visivel = entradas
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visivel) setAtivo(visivel.target.id)
      },
      { rootMargin: '-140px 0px -55% 0px', threshold: 0 }
    )
    secoes.forEach(id => {
      const el = refs.current[id]
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const irPara = (id: string) => {
    const el = refs.current[id]
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 110
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  const trilho = [
    ...servicesData.map((s, i) => ({
      id: s.slug,
      num: String(i + 1).padStart(2, '0'),
      label: s.title,
      count: s.subServices.length,
    })),
    { id: EXTRAS_ID, num: '06', label: t('extras_title'), count: extras.length },
  ]

  return (
    <>
      <Navbar />

      {/* ───────────────────────── ABERTURA ───────────────────────── */}
      <section className="page-hero relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_15%_0%,#2D5238,transparent_65%)] opacity-55 pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-g-light" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-light">{t('eyebrow')}</span>
            </div>

            <h1 className="text-[clamp(34px,6vw,80px)] leading-[0.96] tracking-[-0.035em] text-white max-w-[900px] mb-7">
              {t('title')}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-14">
              <p className="text-white/55 text-[16px] leading-[1.75] max-w-[440px]">{t('sub')}</p>
              <span className="text-[12px] font-bold tracking-[0.18em] uppercase text-g-light/45 shrink-0 sm:pb-1">
                {t('count', { n: totalSolucoes, p: servicesData.length })}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────────────── TRILHO + SOLUÇÕES ───────────────────── */}
      <main className="bg-white">
        {/* trilho horizontal no mobile */}
        <div className="lg:hidden sticky top-[68px] z-30 bg-white/95 backdrop-blur-md border-b border-g-dark/10">
          <div className="flex gap-1 overflow-x-auto px-5 py-3 no-scrollbar">
            {trilho.map(f => (
              <button
                key={f.id}
                onClick={() => irPara(f.id)}
                className={cn(
                  'shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors duration-200',
                  ativo === f.id ? 'bg-g-dark text-g-pale' : 'bg-g-pale/70 text-g-dark/60'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-[220px_1fr] gap-0 lg:gap-16">

            {/* trilho fixo no desktop */}
            <aside className="hidden lg:block">
              <div className="sticky top-[120px] py-20">
                <div className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-g-dark/30 mb-6">
                  {t('rail_label')}
                </div>
                <nav className="flex flex-col">
                  {trilho.map(f => {
                    const on = ativo === f.id
                    return (
                      <button
                        key={f.id}
                        onClick={() => irPara(f.id)}
                        className="group flex items-baseline gap-3 py-2.5 text-left"
                      >
                        <span className={cn('text-[10.5px] font-bold tabular-nums transition-colors duration-200', on ? 'text-g-mid' : 'text-g-dark/25')}>
                          {f.num}
                        </span>
                        <span className={cn(
                          'text-[15px] leading-snug transition-all duration-200',
                          on ? 'font-bold text-g-dark' : 'font-medium text-g-dark/45 group-hover:text-g-dark/75'
                        )}>
                          {f.label}
                        </span>
                        <span className={cn('ml-auto text-[11px] tabular-nums transition-colors duration-200', on ? 'text-g-mid' : 'text-g-dark/20')}>
                          {f.count}
                        </span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </aside>

            {/* conteúdo */}
            <div className="py-14 lg:py-20">
              {servicesData.map((frente, fi) => (
                <section
                  key={frente.slug}
                  id={frente.slug}
                  ref={el => { refs.current[frente.slug] = el }}
                  className={cn('scroll-mt-32', fi > 0 && 'mt-20 lg:mt-28')}
                >
                  {/* cabeçalho da frente */}
                  <motion.header
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-90px 0px' }}
                    transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="pb-8 border-b border-g-dark/12"
                  >
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="text-[11px] font-bold tabular-nums text-g-mid">{String(fi + 1).padStart(2, '0')}</span>
                      <h2 className="text-[clamp(28px,4.5vw,52px)] leading-[1] tracking-[-0.03em] text-g-dark">
                        {frente.title}
                      </h2>
                    </div>
                    <p className="text-[clamp(17px,2vw,22px)] leading-[1.45] text-g-dark/70 max-w-[620px] mb-4">
                      {frente.tagline}
                    </p>
                    <p className="text-[15px] leading-[1.75] text-g-dark/50 max-w-[620px]">
                      {frente.description}
                    </p>
                  </motion.header>

                  {/* soluções da frente — linhas, não cards */}
                  <div className="divide-y divide-g-dark/10">
                    {frente.subServices.map((sol, si) => (
                      <motion.article
                        key={sol.slug}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-70px 0px' }}
                        transition={{ duration: 0.45, delay: si * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="group grid md:grid-cols-[1fr_1fr] gap-6 md:gap-12 py-9 lg:py-11"
                      >
                        {/* esquerda: nome, tagline, descrição */}
                        <div>
                          <h3 className="text-[22px] lg:text-[26px] leading-tight tracking-[-0.015em] text-g-dark font-bold mb-2">
                            {sol.name}
                          </h3>
                          <p className="text-[15px] leading-[1.55] text-g-mid font-medium mb-4">{sol.tagline}</p>
                          <p className="text-[14.5px] leading-[1.75] text-g-dark/55 mb-6">{sol.description}</p>

                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {sol.forWhom.slice(0, 3).map(q => (
                              <span key={q} className="text-[11.5px] leading-snug text-g-dark/50 bg-g-pale/70 rounded-full px-3 py-1.5">
                                {q}
                              </span>
                            ))}
                          </div>

                          <Link
                            href={`/${locale}/servicos/${sol.slug}`}
                            className="inline-flex items-center gap-2 text-[13.5px] font-bold text-g-dark border-b border-g-dark/25 pb-0.5 hover:border-g-mid hover:text-g-mid transition-colors duration-200"
                          >
                            {t('details')}
                            <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
                          </Link>
                        </div>

                        {/* direita: entregas e resultado */}
                        <div className="md:pt-1">
                          <div className="text-[10.5px] font-bold tracking-[0.18em] uppercase text-g-dark/35 mb-3.5">
                            {t('includes')}
                          </div>
                          <ul className="flex flex-col gap-2 mb-6">
                            {sol.features.map(f => (
                              <li key={f} className="flex items-start gap-2.5 text-[14px] leading-[1.6] text-g-dark/60">
                                <span className="mt-[9px] w-1 h-1 rounded-full bg-g-mid/60 shrink-0" />
                                {f}
                              </li>
                            ))}
                          </ul>

                          <div className="flex items-start gap-3 pt-4 border-t border-g-dark/8">
                            <span className="text-[10.5px] font-bold tracking-[0.18em] uppercase text-g-mid shrink-0 mt-[3px]">
                              {t('result')}
                            </span>
                            <span className="text-[14px] leading-[1.6] text-g-dark font-medium">{sol.result}</span>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </section>
              ))}

              {/* ───────── AVULSOS ───────── */}
              <section
                id={EXTRAS_ID}
                ref={el => { refs.current[EXTRAS_ID] = el }}
                className="scroll-mt-32 mt-20 lg:mt-28"
              >
                <motion.header
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-90px 0px' }}
                  transition={{ duration: 0.5 }}
                  className="pb-8 border-b border-g-dark/12"
                >
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-[11px] font-bold tabular-nums text-g-mid">06</span>
                    <h2 className="text-[clamp(28px,4.5vw,52px)] leading-[1] tracking-[-0.03em] text-g-dark">
                      {t('extras_title')}
                    </h2>
                  </div>
                  <p className="text-[clamp(17px,2vw,22px)] leading-[1.45] text-g-dark/70 max-w-[620px] mb-4">
                    {t('extras_tagline')}
                  </p>
                  <p className="text-[15px] leading-[1.75] text-g-dark/50 max-w-[620px]">{t('extras_desc')}</p>
                </motion.header>

                <div className="divide-y divide-g-dark/10">
                  {extras.map((e, i) => (
                    <motion.div
                      key={e.name}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px 0px' }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="grid md:grid-cols-[1fr_1fr] gap-2 md:gap-12 py-6"
                    >
                      <h3 className="text-[17px] font-bold text-g-dark">{e.name}</h3>
                      <p className="text-[14.5px] leading-[1.7] text-g-dark/55">{e.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* ───────────────────────── CTA FINAL ───────────────────────── */}
      <section className="bg-g-dark relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_120%,#2D5238,transparent_65%)] opacity-50 pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px 0px' }}
            transition={{ duration: 0.55 }}
            className="max-w-[680px]"
          >
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-light/45 mb-4">
              {t('cta_eyebrow')}
            </div>
            <h2 className="text-[clamp(28px,4.5vw,54px)] leading-[1.02] tracking-[-0.03em] text-white mb-5">
              {t('cta_title')}
            </h2>
            <p className="text-white/50 text-[16px] leading-[1.75] mb-9">{t('cta_desc')}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/${locale}/consultoria`}
                className="inline-flex items-center justify-center gap-2.5 bg-g-light text-g-dark font-bold px-7 py-4 rounded-full text-[15px] hover:bg-g-pale hover:-translate-y-0.5 transition-all duration-200"
              >
                {t('cta_button')}
                <ArrowIcon />
              </Link>
              <a
                href={WA_BASE + encodeURIComponent(t('wa_message'))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 font-semibold px-7 py-4 rounded-full text-[15px] hover:border-white/40 hover:text-white hover:-translate-y-0.5 transition-all duration-200"
              >
                {t('cta_secondary')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}
