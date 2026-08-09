'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/sections/Navbar'
import { SkipLink } from '@/components/ui/SkipLink'
import { Footer } from '@/components/sections/Footer'
import { Process } from '@/components/sections/Process'
import { disciplines } from '@/data/services'
import { GradeDoRegistro } from '@/components/ui/SlotMidia'

const WA_BASE = 'https://wa.me/+5585991043067?text='

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  )
}

export function ServicosView() {
  const t = useTranslations('servicos')
  const locale = useLocale()
  const router = useRouter()

  const totalProjetos = disciplines.reduce((n, s) => n + s.subServices.length, 0)

  // Só as disciplinas: sob demanda tem rota própria.
  const secoes = disciplines.map(s => s.slug)
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

  // `/servicos#sob-demanda` virou rota própria.
  //
  // Não dá para fazer 301 disso: o fragmento nunca é enviado ao servidor, só
  // o navegador o conhece. Então o encaminhamento tem de acontecer aqui, e
  // com `replace` para o link antigo não ficar no histórico do botão voltar.
  useEffect(() => {
    if (window.location.hash === '#sob-demanda') {
      router.replace(`/${locale}/servicos/sob-demanda`)
    }
  }, [locale, router])

  const irPara = (id: string) => {
    const el = refs.current[id]
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 110
    window.scrollTo({ top: y, behavior: 'smooth' })
  }


  // O trilho lista só as disciplinas: sob demanda virou rota própria.
  const grupos = [
    {
      label: t('rail_projects'),
      itens: disciplines.map((s, i) => ({
        id: s.slug,
        num: String(i + 1).padStart(2, '0'),
        label: s.title,
        count: s.subServices.length,
      })),
    },
  ]
  const trilhoFlat = grupos.flatMap(g => g.itens)

  return (
    <>
      <SkipLink />
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

            {/* As duas portas.
                Cada uma leva para a própria rota: sob demanda saiu do hub
                porque as duas respondiam perguntas de pessoas diferentes na
                mesma tela, e classificar-se é o trabalho que o site deveria
                fazer pelo visitante. */}
            <div className="grid md:grid-cols-2 gap-4 max-w-[900px]">
              {[
                { label: t('door1_label'), title: t('door1_title'), desc: t('door1_desc'), cta: t('door1_cta'), href: `/${locale}/servicos/sob-demanda`, destaque: true },
                { label: t('door2_label'), title: t('door2_title'), desc: t('door2_desc'), cta: t('door2_cta'), href: `#${disciplines[0].slug}`, destaque: false },
              ].map(porta => (
                <Link
                  key={porta.label}
                  href={porta.href}
                  scroll={porta.href.startsWith('#') ? false : undefined}
                  onClick={porta.href.startsWith('#') ? e => { e.preventDefault(); irPara(disciplines[0].slug) } : undefined}
                  className={cn(
                    'group block text-left p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1',
                    porta.destaque
                      ? 'bg-verde-luz/[0.09] border-verde-luz/25 hover:border-verde-luz/50'
                      : 'bg-white/[0.03] border-white/[0.09] hover:border-white/20'
                  )}
                >
                  <div className={cn('text-[10.5px] font-bold tracking-[0.2em] uppercase mb-3', porta.destaque ? 'text-verde-luz' : 'text-menta-fraca')}>
                    {porta.label}
                  </div>
                  <div className="text-[19px] leading-snug text-menta font-bold mb-2.5">{porta.title}</div>
                  <p className="text-[14px] leading-[1.7] text-menta-fraca mb-5">{porta.desc}</p>
                  <span className={cn(
                    'inline-flex items-center gap-2 text-[13px] font-bold transition-all duration-200 group-hover:gap-2.5',
                    porta.destaque ? 'text-verde-luz' : 'text-menta-fraca'
                  )}>
                    {porta.cta}
                    <ArrowIcon />
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────────────── TRILHO + CONTEÚDO ───────────────────── */}
      <main id="conteudo" className="bg-white">
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
                    <div className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-tinta-70 mb-4">
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
                            <span className={cn('text-[10.5px] font-bold tabular-nums transition-colors duration-200', on ? 'text-g-mid' : 'text-tinta-70')}>
                              {f.num}
                            </span>
                            <span className={cn(
                              'text-[15px] leading-snug transition-all duration-200',
                              on ? 'font-bold text-g-dark' : 'font-medium text-g-dark/45 group-hover:text-g-dark/75'
                            )}>
                              {f.label}
                            </span>
                            <span className={cn('ml-auto text-[11px] tabular-nums transition-colors duration-200', on ? 'text-g-mid' : 'text-tinta-70')}>
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
            <div className="min-w-0 py-14 lg:py-20">

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
                  <span className="text-[12px] font-bold tracking-[0.18em] uppercase text-tinta-70">
                    {t('count', { n: totalProjetos, p: disciplines.length })}
                  </span>
                </motion.header>

                {/* Índice das seis disciplinas.
                    Três colunas fecham duas linhas exatas: com cinco sobrava
                    uma órfã na segunda linha. */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
                  {disciplines.map((d, i) => (
                    <motion.div
                      key={d.slug}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px 0px' }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                    >
                      <Link
                        href={`/${locale}/servicos/${d.slug}`}
                        className="group h-full flex flex-col p-6 rounded-2xl border border-tinta-16 bg-white hover:border-verde-medio/45 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-baseline gap-3 mb-2.5">
                          <span className="text-[10.5px] font-bold tabular-nums text-verde-medio">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <h3 className="text-[19px] leading-tight tracking-[-0.015em] text-verde font-bold">
                            {d.title}
                          </h3>
                        </div>
                        <p className="text-[13.5px] leading-[1.6] text-tinta-70 mb-5 flex-1">{d.tagline}</p>
                        <span className="inline-flex items-center gap-2 text-[12.5px] font-bold text-verde-medio transition-all duration-200 group-hover:gap-2.5">
                          {t('proj_ver_disciplina')}
                          <ArrowIcon />
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {disciplines.map((frente, fi) => (
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
                      <p className="text-[15px] leading-[1.75] text-g-dark/50 max-w-[620px] mb-7">
                        {frente.description}
                      </p>

                      {/* Grade de mídia. Placeholder marcado até o acervo
                          chegar: o rótulo diz o que entra em cada slot. */}
                      <GradeDoRegistro chave={frente.slug} rotulo={t('trilho_label', { disciplina: frente.title })} />

                      <Link
                        href={`/${locale}/servicos/${frente.slug}`}
                        className="inline-flex items-center gap-2 mt-7 text-[13.5px] font-bold text-verde border-b border-tinta-16 pb-0.5 hover:text-verde-medio hover:border-verde-medio transition-colors duration-200"
                      >
                        {t('proj_ver_disciplina')}
                        <ArrowIcon />
                      </Link>
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

                            {/* Chips de "indicado para": 1.457px no celular,
                                três blocos empilhados repetindo o que a
                                descrição logo acima já disse. No desktop ficam,
                                porque ali são varredura rápida em linha.
                                Escondidos por CSS e não por renderização
                                condicional, para o servidor e o cliente
                                produzirem o mesmo HTML. */}
                            <div className="hidden md:flex flex-wrap gap-1.5 mb-6">
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
                            {/* As 84 features dos 15 cards custavam 2.567px no
                                celular, uma coluna empilhada que ninguém lê de
                                cabo a rabo antes de decidir. <details> nativo:
                                teclado e leitor de tela de graça, sem JS. */}
                            <details className="colapso-features mb-6">
                              <summary className="flex items-center justify-between gap-3 min-h-[44px] py-2 text-[10.5px] font-bold tracking-[0.18em] uppercase text-tinta-70 md:mb-3.5 hover:text-g-mid transition-colors">
                                <span>{t('includes')} ({sol.features.length})</span>
                                <svg className="shrink-0 transition-transform duration-200 [details[open]_&]:rotate-180" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                                  <path d="M3 5l4 4 4-4" />
                                </svg>
                              </summary>
                              <ul className="flex flex-col gap-2 pt-1">
                                {sol.features.map(f => (
                                  <li key={f} className="flex items-start gap-2.5 text-[14px] leading-[1.6] text-g-dark/60">
                                    <span className="mt-[9px] w-1 h-1 rounded-full bg-g-mid/60 shrink-0" />
                                    {f}
                                  </li>
                                ))}
                              </ul>
                            </details>

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

      {/* Como começa. Depois das seis disciplinas, a pergunta que sobra é
          qual o primeiro passo. */}
      <Process />

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
