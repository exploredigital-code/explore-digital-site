'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import { servicesData } from '@/data/services'
import { onDemandItems, formatPrice, formatDays } from '@/data/on-demand'

const WA_BASE = 'https://wa.me/+5585991043067?text='
const ON_DEMAND_ID = 'sob-demanda'

type OnDemandCopy = { slug: string; name: string; tagline: string; includes: string[] }

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 22c-1.78 0-3.52-.48-5.03-1.38l-.36-.214-3.741.982.998-3.648-.235-.374A9.86 9.86 0 0 1 2.157 11.9C2.16 6.45 6.595 2.016 12.047 2.016c2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994C21.925 17.358 17.49 21.79 12.05 22" />
    </svg>
  )
}

export function SolucoesView() {
  const t = useTranslations('solucoes')
  const locale = useLocale()

  const onDemandCopy = t.raw('on_demand_items') as OnDemandCopy[]
  const totalProjetos = servicesData.reduce((n, s) => n + s.subServices.length, 0)

  // Porta 1 primeiro: converte rápido e tem preço. Projetos vêm depois.
  const secoes = [ON_DEMAND_ID, ...servicesData.map(s => s.slug)]
  const [ativo, setAtivo] = useState(secoes[0])
  const refs = useRef<Record<string, HTMLElement | null>>({})

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

  const waFor = (nome: string) => WA_BASE + encodeURIComponent(t('wa_item').replace('{item}', nome))

  // Trilho em dois grupos, espelhando as duas portas.
  const grupos = [
    { label: t('rail_ondemand'), itens: [{ id: ON_DEMAND_ID, num: '01', label: t('od_eyebrow'), count: onDemandItems.length }] },
    {
      label: t('rail_projects'),
      itens: servicesData.map((s, i) => ({
        id: s.slug,
        num: String(i + 2).padStart(2, '0'),
        label: s.title,
        count: s.subServices.length,
      })),
    },
  ]
  const trilhoFlat = grupos.flatMap(g => g.itens)

  return (
    <>
      <Navbar />

      {/* ───────────────────────── ABERTURA ───────────────────────── */}
      <section className="page-hero relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_15%_0%,#2D5238,transparent_65%)] opacity-55 pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-g-light" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-light">{t('doors_eyebrow')}</span>
            </div>

            <h1 className="text-[clamp(34px,6vw,80px)] leading-[0.96] tracking-[-0.035em] text-white max-w-[900px] mb-10">
              {t('title')}
            </h1>

            {/* As duas portas, lado a lado */}
            <div className="grid md:grid-cols-2 gap-4 max-w-[900px]">
              {[
                { label: t('door1_label'), title: t('door1_title'), desc: t('door1_desc'), cta: t('door1_cta'), onClick: () => irPara(ON_DEMAND_ID), destaque: true },
                { label: t('door2_label'), title: t('door2_title'), desc: t('door2_desc'), cta: t('door2_cta'), onClick: () => irPara(servicesData[0].slug), destaque: false },
              ].map(porta => (
                <button
                  key={porta.label}
                  onClick={porta.onClick}
                  className={cn(
                    'group text-left p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1',
                    porta.destaque
                      ? 'bg-g-light/[0.09] border-g-light/25 hover:border-g-light/50'
                      : 'bg-white/[0.03] border-white/[0.09] hover:border-white/20'
                  )}
                >
                  <div className={cn('text-[10.5px] font-bold tracking-[0.2em] uppercase mb-3', porta.destaque ? 'text-g-light' : 'text-white/40')}>
                    {porta.label}
                  </div>
                  <div className="text-[19px] leading-snug text-white font-bold mb-2.5">{porta.title}</div>
                  <p className="text-[14px] leading-[1.7] text-white/50 mb-5">{porta.desc}</p>
                  <span className={cn(
                    'inline-flex items-center gap-2 text-[13px] font-bold transition-all duration-200 group-hover:gap-2.5',
                    porta.destaque ? 'text-g-light' : 'text-white/65'
                  )}>
                    {porta.cta}
                    <ArrowIcon />
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────────────── TRILHO + CONTEÚDO ───────────────────── */}
      <main className="bg-white">
        {/* trilho horizontal no mobile */}
        <div className="lg:hidden sticky top-[68px] z-30 bg-white/95 backdrop-blur-md border-b border-g-dark/10">
          <div className="flex gap-1 overflow-x-auto px-5 py-3 no-scrollbar">
            {trilhoFlat.map(f => (
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

            {/* trilho fixo no desktop, agora em dois grupos */}
            <aside className="hidden lg:block">
              <div className="sticky top-[120px] py-20">
                {grupos.map((grupo, gi) => (
                  <div key={grupo.label} className={cn(gi > 0 && 'mt-8')}>
                    <div className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-g-dark/30 mb-4">
                      {grupo.label}
                    </div>
                    <nav className="flex flex-col">
                      {grupo.itens.map(f => {
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
                ))}
              </div>
            </aside>

            {/* conteúdo */}
            <div className="py-14 lg:py-20">

              {/* ═══════ PORTA 1 — SOB DEMANDA ═══════ */}
              <section
                id={ON_DEMAND_ID}
                ref={el => { refs.current[ON_DEMAND_ID] = el }}
                className="scroll-mt-32"
              >
                <motion.header
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-90px 0px' }}
                  transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="pb-8 border-b border-g-dark/12"
                >
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-[11px] font-bold tabular-nums text-g-mid">01</span>
                    <h2 className="text-[clamp(28px,4.5vw,52px)] leading-[1] tracking-[-0.03em] text-g-dark">
                      {t('od_eyebrow')}
                    </h2>
                  </div>
                  <p className="text-[clamp(17px,2vw,22px)] leading-[1.45] text-g-dark/70 max-w-[620px] mb-4">
                    {t('od_title')}
                  </p>
                  <p className="text-[15px] leading-[1.75] text-g-dark/50 max-w-[620px]">{t('od_sub')}</p>
                </motion.header>

                {/* Gancho de temporada — a janela de captação é agosto a dezembro */}
                <motion.aside
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-70px 0px' }}
                  transition={{ duration: 0.45 }}
                  className="mt-8 rounded-2xl bg-g-dark p-8 lg:p-10 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_90%_at_100%_0%,#2D5238,transparent_65%)] opacity-55 pointer-events-none" />
                  <div className="relative z-10 max-w-[640px]">
                    <span className="inline-block text-[10px] font-bold tracking-[0.18em] uppercase bg-g-light text-g-dark px-3 py-1 rounded-full mb-5">
                      {t('od_season_badge')}
                    </span>
                    <h3 className="text-[clamp(20px,2.8vw,30px)] leading-[1.15] tracking-[-0.02em] text-white mb-4">
                      {t('od_season_title')}
                    </h3>
                    <p className="text-[15px] leading-[1.75] text-white/55">{t('od_season_desc')}</p>
                  </div>
                </motion.aside>

                {/* Cards: preço, prazo, o que inclui e pedido direto no WhatsApp */}
                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                  {onDemandItems.map((item, i) => {
                    const copy = onDemandCopy.find(c => c.slug === item.slug)
                    if (!copy) return null
                    return (
                      <motion.article
                        key={item.slug}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px 0px' }}
                        transition={{ duration: 0.45, delay: i * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="flex flex-col p-7 rounded-2xl border border-g-dark/10 hover:border-g-mid/45 bg-white hover:shadow-md transition-all duration-300"
                      >
                        <h3 className="text-[20px] leading-tight tracking-[-0.015em] text-g-dark font-bold mb-2">
                          {copy.name}
                        </h3>
                        <p className="text-[14px] leading-[1.6] text-g-dark/55 mb-5">{copy.tagline}</p>

                        {/* preço e prazo lado a lado — é o que decide a compra */}
                        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 pb-5 mb-5 border-b border-g-dark/10">
                          <div>
                            <div className="text-[9.5px] font-bold tracking-[0.16em] uppercase text-g-dark/35 mb-0.5">{t('od_from')}</div>
                            <div className="text-[22px] font-bold text-g-dark tabular-nums leading-none">
                              {formatPrice(item.priceFrom, locale)}
                            </div>
                          </div>
                          <div>
                            <div className="text-[9.5px] font-bold tracking-[0.16em] uppercase text-g-dark/35 mb-0.5">{t('od_delivery')}</div>
                            <div className="text-[15px] font-semibold text-g-mid leading-none pt-1.5">
                              {formatDays(item.deliveryDays, t('od_days_to'))} {t('od_days')}
                            </div>
                          </div>
                        </div>

                        <div className="text-[9.5px] font-bold tracking-[0.16em] uppercase text-g-dark/35 mb-3">
                          {t('od_includes')}
                        </div>
                        <ul className="flex flex-col gap-2 mb-6 flex-1">
                          {copy.includes.map(f => (
                            <li key={f} className="flex items-start gap-2.5 text-[13.5px] leading-[1.55] text-g-dark/60">
                              <span className="mt-[7px] w-1 h-1 rounded-full bg-g-mid/60 shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>

                        {item.onSite && (
                          <div className="text-[11.5px] text-g-dark/40 mb-4 leading-snug">{t('od_onsite')}</div>
                        )}

                        <div className="flex flex-wrap items-center gap-3 mt-auto">
                          <a
                            href={waFor(copy.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-5 py-2.5 rounded-full text-[13.5px] hover:bg-[#1FAD54] hover:-translate-y-0.5 transition-all duration-200"
                          >
                            <WhatsAppIcon />
                            {t('od_cta')}
                          </a>
                          {item.detailSlug && (
                            <Link
                              href={`/${locale}/servicos/${item.detailSlug}`}
                              className="text-[13px] font-bold text-g-dark/60 border-b border-g-dark/20 pb-0.5 hover:text-g-mid hover:border-g-mid transition-colors duration-200"
                            >
                              {t('od_details')}
                            </Link>
                          )}
                        </div>
                      </motion.article>
                    )
                  })}
                </div>

                <p className="text-[13px] leading-[1.7] text-g-dark/45 mt-6 max-w-[620px]">
                  {t('od_season_note')}
                </p>
              </section>

              {/* ═══════ PORTA 2 — PROJETOS ═══════ */}
              <section id="projetos" className="scroll-mt-32 mt-24 lg:mt-32">
                <motion.header
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-90px 0px' }}
                  transition={{ duration: 0.5 }}
                  className="pb-2"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-px bg-g-mid" />
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-mid">{t('proj_eyebrow')}</span>
                  </div>
                  <h2 className="text-[clamp(26px,4vw,44px)] leading-[1.05] tracking-[-0.03em] text-g-dark max-w-[620px] mb-4">
                    {t('proj_title')}
                  </h2>
                  <p className="text-[15px] leading-[1.75] text-g-dark/50 max-w-[620px] mb-2">{t('proj_sub')}</p>
                  <span className="text-[12px] font-bold tracking-[0.18em] uppercase text-g-dark/30">
                    {t('count', { n: totalProjetos, p: servicesData.length })}
                  </span>
                </motion.header>

                {servicesData.map((frente, fi) => (
                  <section
                    key={frente.slug}
                    id={frente.slug}
                    ref={el => { refs.current[frente.slug] = el }}
                    className="scroll-mt-32 mt-16 lg:mt-20"
                  >
                    <motion.header
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-90px 0px' }}
                      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="pb-8 border-b border-g-dark/12"
                    >
                      <div className="flex items-baseline gap-4 mb-4">
                        <span className="text-[11px] font-bold tabular-nums text-g-mid">{String(fi + 2).padStart(2, '0')}</span>
                        <h3 className="text-[clamp(26px,4vw,44px)] leading-[1] tracking-[-0.03em] text-g-dark">
                          {frente.title}
                        </h3>
                      </div>
                      <p className="text-[clamp(16px,1.9vw,21px)] leading-[1.45] text-g-dark/70 max-w-[620px] mb-4">
                        {frente.tagline}
                      </p>
                      <p className="text-[15px] leading-[1.75] text-g-dark/50 max-w-[620px]">
                        {frente.description}
                      </p>
                    </motion.header>

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
                          <div>
                            <h4 className="text-[22px] lg:text-[26px] leading-tight tracking-[-0.015em] text-g-dark font-bold mb-2">
                              {sol.name}
                            </h4>
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
