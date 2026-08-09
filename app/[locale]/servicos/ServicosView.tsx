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
import { gruposDoCatalogo, type SubService } from '@/data/services'
import { getLocalizedSubService } from '@/data/services-content'

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

  // Nome e chamada saem do conteudo localizado; o dado em services.ts e o
  // fallback em portugues.
  const nomeDe = (p: SubService) => getLocalizedSubService(locale, p.slug)?.name ?? p.name
  const taglineDe = (p: SubService) => getLocalizedSubService(locale, p.slug)?.tagline ?? p.tagline

  // Só as disciplinas: sob demanda tem rota própria.
  const secoes = gruposDoCatalogo.map(g => g.grupo)
  const [ativo, setAtivo] = useState(secoes[0])
  const refs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      entradas => {
        const visivel = entradas
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visivel) setAtivo(visivel.target.id as typeof secoes[number])
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
  // O trilho lateral acompanha os cinco grupos do catalogo.
  const grupos = [
    {
      label: t('catalogo_eyebrow'),
      itens: gruposDoCatalogo.map((g, i) => ({
        id: g.grupo,
        num: String(i + 1).padStart(2, '0'),
        label: t(`grupo_${g.grupo}`),
        count: g.itens.length,
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
                // As duas portas agora sao os dois eixos do catalogo, e nao duas
                // rotas: /servicos/sob-demanda deixou de existir e o eixo
                // antigo dividia por 'sabe o que precisa' contra 'sabe o
                // problema', misturando projeto com mensalidade dentro da
                // mesma porta.
                { label: t('door1_label'), title: t('door1_title'), desc: t('door1_desc'), cta: t('door1_cta'), href: '#marca', destaque: true },
                { label: t('door2_label'), title: t('door2_title'), desc: t('door2_desc'), cta: t('door2_cta'), href: '#mensal', destaque: false },
              ].map(porta => (
                <Link
                  key={porta.label}
                  href={porta.href}
                  scroll={porta.href.startsWith('#') ? false : undefined}
                  onClick={porta.href.startsWith('#') ? e => { e.preventDefault(); irPara(porta.href.slice(1)) } : undefined}
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
      <main id="conteudo" tabIndex={-1} className="bg-white">
        {/* trilho horizontal no mobile.
            O chip inativo era `bg-g-pale/70 text-g-dark/60`: 3,8:1, reprovado.
            O Lighthouse dava 100 nesta pagina porque o preset desktop nunca
            renderiza este controle. `menta-clara` cheia com `tinta-70` da
            4,65:1 sem inventar token. */}
        <div className="lg:hidden sticky top-[68px] z-30 bg-white/95 backdrop-blur-md border-b border-g-dark/10">
          <div className="flex gap-1 overflow-x-auto px-5 py-3 no-scrollbar">
            {trilhoFlat.map(f => (
              <button
                key={f.id}
                onClick={() => irPara(f.id)}
                className={cn(
                  'shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors duration-200',
                  ativo === f.id ? 'bg-g-dark text-g-pale' : 'bg-menta-clara text-tinta-70'
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
                            <span className={cn('text-[10.5px] font-bold tabular-nums transition-colors duration-200', on ? 'text-verde-medio' : 'text-tinta-70')}>
                              {f.num}
                            </span>
                            <span className={cn(
                              'text-[15px] leading-snug transition-all duration-200',
                              on ? 'font-bold text-verde' : 'font-medium text-tinta-70 group-hover:text-verde'
                            )}>
                              {f.label}
                            </span>
                            <span className={cn('ml-auto text-[11px] tabular-nums transition-colors duration-200', on ? 'text-verde-medio' : 'text-tinta-70')}>
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
              {/* ───────── OS TREZE PRODUTOS ─────────
                  Cinco grupos por problema que resolvem, nao por modalidade
                  de contrato. Pontual e mensal viraram etiqueta dentro do
                  cartao: a informacao continua na hora de decidir, mas para
                  de organizar a leitura da pagina.

                  Cartao compacto: nome, chamada, etiqueta e link. Prazo e o
                  que inclui sao resposta da pagina do produto. */}
              <section id="catalogo" className="scroll-mt-32 mt-24 lg:mt-32">
                <motion.header
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-90px 0px' }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-px bg-verde-medio" />
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-medio">{t('catalogo_eyebrow')}</span>
                  </div>
                  <h2 className="text-[clamp(26px,4vw,44px)] leading-[1.05] tracking-[-0.03em] text-verde max-w-[620px] mb-4">
                    {t('catalogo_title')}
                  </h2>
                  <p className="text-[15px] leading-[1.75] text-tinta-70 max-w-[620px]">{t('catalogo_sub')}</p>
                </motion.header>

                {gruposDoCatalogo.map(g => (
                  <section key={g.grupo} id={g.grupo} className="scroll-mt-32 mt-12 lg:mt-14 first:mt-10">
                    <div className="flex items-baseline gap-3 mb-1.5">
                      <h3 className="text-[17px] font-bold text-verde tracking-[-0.01em]">{t(`grupo_${g.grupo}`)}</h3>
                      <span className="text-[11px] font-bold tabular-nums text-tinta-70">{String(g.itens.length).padStart(2, '0')}</span>
                    </div>
                    {/* O `_sub` do mensal dizia a mesma coisa que a abertura,
                        na linha de cima. Uma frase por grupo. */}
                    {g.grupo !== 'mensal' && (
                      <p className="text-[13.5px] leading-[1.6] text-tinta-70 mb-5 max-w-[520px]">{t(`grupo_${g.grupo}_sub`)}</p>
                    )}

                    {/* ───────── OS RECORRENTES ─────────
                        Os dois mensais saem da grade compacta e ganham cartão
                        próprio. O compacto tem nome, chamada e link, e isso
                        basta para escolher entre uma fotografia e uma edição
                        de vídeo. Não basta para decidir uma mensalidade: aí a
                        pergunta é o que chega todo mês e se é para você.

                        A superfície é `menta-clara` com borda `verde-medio`,
                        as mesmas dos placeholders e das faixas claras. Nenhum
                        token novo: o destaque vem de tamanho, fundo e do que o
                        cartão diz, não de uma cor inventada para ele. */}
                    {g.grupo === 'mensal' ? (
                      <>
                        <p className="text-[15px] leading-[1.7] text-verde font-bold mb-5 max-w-[560px] mt-2">
                          {t('mensal_abertura')}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {g.itens.map((p, i) => {
                            const c = getLocalizedSubService(locale, p.slug)
                            const entrega = (c?.features ?? p.features).slice(0, 4)
                            const paraQuem = (c?.forWhom ?? p.forWhom)[0]
                            return (
                              <motion.div
                                key={p.slug}
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px 0px' }}
                                transition={{ duration: 0.4, delay: i * 0.06 }}
                              >
                                <Link
                                  href={`/${locale}/servicos/${p.slug}`}
                                  className="group h-full flex flex-col p-6 lg:p-7 rounded-2xl border border-verde-medio/30 bg-menta-clara hover:border-verde-medio/60 hover:shadow-md transition-all duration-300"
                                >
                                  <div className="flex items-start justify-between gap-3 mb-2">
                                    <h4 className="text-[20px] leading-tight tracking-[-0.015em] text-verde font-bold">
                                      {nomeDe(p)}
                                    </h4>
                                    <span className="shrink-0 rounded-full border border-verde-medio/40 px-2.5 py-[3px] text-[9.5px] font-bold uppercase tracking-[0.08em] text-verde-medio">
                                      {t('etiqueta_mensal')}
                                    </span>
                                  </div>
                                  <p className="text-[13.5px] leading-[1.6] text-tinta-70 mb-4">{taglineDe(p)}</p>

                                  <div className="text-[10.5px] font-bold tracking-[0.16em] uppercase text-verde-medio mb-2">
                                    {t('mensal_entrega')}
                                  </div>
                                  <ul className="flex flex-col gap-1.5 mb-4">
                                    {entrega.map(f => (
                                      <li key={f} className="flex items-start gap-2 text-[13px] leading-[1.5] text-tinta-70">
                                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-verde-medio" aria-hidden />
                                        {f}
                                      </li>
                                    ))}
                                  </ul>

                                  <div className="text-[10.5px] font-bold tracking-[0.16em] uppercase text-verde-medio mb-1.5">
                                    {t('mensal_para_quem')}
                                  </div>
                                  <p className="text-[13px] leading-[1.55] text-tinta-70 mb-5 flex-1">{paraQuem}</p>

                                  <span className="inline-flex items-center gap-2 text-[13px] font-bold text-verde-medio transition-all duration-200 group-hover:gap-2.5">
                                    {t('ver_produto')}
                                    <ArrowIcon />
                                  </span>
                                </Link>
                              </motion.div>
                            )
                          })}
                        </div>
                      </>
                    ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {g.itens.map((p, i) => (
                        <motion.div
                          key={p.slug}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-50px 0px' }}
                          transition={{ duration: 0.35, delay: Math.min(i, 4) * 0.04 }}
                        >
                          <Link
                            href={`/${locale}/servicos/${p.slug}`}
                            className="group h-full flex flex-col p-5 rounded-2xl border border-tinta-16 bg-white hover:border-verde-medio/45 hover:shadow-md transition-all duration-300"
                          >
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <h4 className="text-[16.5px] leading-tight tracking-[-0.01em] text-verde font-bold">
                                {nomeDe(p)}
                              </h4>
                              {/* A etiqueta, nao mais a divisao da pagina */}
                              <span className="shrink-0 rounded-full border border-tinta-16 px-2 py-[2px] text-[9.5px] font-bold uppercase tracking-[0.08em] text-tinta-70">
                                {p.period === 'monthly' ? t('etiqueta_mensal') : t('etiqueta_pontual')}
                              </span>
                            </div>
                            <p className="text-[13px] leading-[1.55] text-tinta-70 mb-4 flex-1">{taglineDe(p)}</p>
                            <span className="inline-flex items-center gap-2 text-[12px] font-bold text-verde-medio transition-all duration-200 group-hover:gap-2.5">
                              {t('ver_produto')}
                              <ArrowIcon />
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                    )}
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
