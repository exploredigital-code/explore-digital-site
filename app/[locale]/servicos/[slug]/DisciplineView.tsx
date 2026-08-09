'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/sections/Navbar'
import { SkipLink } from '@/components/ui/SkipLink'
import { Footer } from '@/components/sections/Footer'
import { GradeDoRegistro } from '@/components/ui/SlotMidia'
import type { ServiceData } from '@/data/services'
import { getLocalizedService, getLocalizedSubService } from '@/data/services-content'

const WA_BASE = 'https://wa.me/+5585991043067?text='

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  )
}

export function DisciplineView({ discipline }: { discipline: ServiceData }) {
  const t = useTranslations('service_detail')
  const tServicos = useTranslations('servicos')
  const locale = useLocale()

  const loc = getLocalizedService(locale, discipline.slug)
  const titulo = loc?.title ?? discipline.title
  const tagline = loc?.tagline ?? discipline.tagline
  const descricao = loc?.description ?? discipline.description
  const oQueE = loc?.what ?? discipline.what
  const comoFazemos = loc?.how ?? discipline.how
  const paraQuem = loc?.whoFor ?? discipline.whoFor
  const entregas = loc?.deliverables ?? discipline.deliverables

  const wa = WA_BASE + encodeURIComponent(tServicos('wa_item', { item: titulo }))

  return (
    <>
      <SkipLink />
      <Navbar />

      {/* ── Abertura ── */}
      <section className={cn('relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-br', discipline.gradient)}>
        <div className="relative z-10 max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
            <Link href={`/${locale}/servicos`} className="inline-flex items-center gap-2 text-[12.5px] font-medium text-menta-fraca hover:text-menta transition-colors mb-8">
              ← {t('see_all_services')}
            </Link>
            <h1 className="text-[clamp(34px,6vw,76px)] leading-[0.96] tracking-[-0.035em] text-menta max-w-[900px] mb-5">
              {titulo}
            </h1>
            <p className="text-[clamp(17px,2.2vw,24px)] leading-[1.4] text-verde-luz max-w-[640px] mb-4">{tagline}</p>
            <p className="text-[15.5px] leading-[1.75] text-menta-fraca max-w-[640px]">{descricao}</p>
          </motion.div>
        </div>
      </section>

      <main id="conteudo" className="bg-white">
        <div className="max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24">

          {/* ── O que é + para quem ── */}
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 pb-14 border-b border-tinta-16">
            <div>
              <h2 className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-verde-medio mb-4">{t('about_service')}</h2>
              <p className="text-[16.5px] leading-[1.8] text-tinta-70">{oQueE}</p>
            </div>
            <div>
              <h2 className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-tinta-50 mb-4">{t('for_whom')}</h2>
              <ul className="flex flex-col gap-2.5">
                {paraQuem.map(q => (
                  <li key={q} className="flex items-start gap-2.5 text-[14.5px] leading-[1.6] text-tinta-70">
                    <span className="mt-[9px] w-1 h-1 rounded-full bg-verde-medio/60 shrink-0" />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Grade de mídia (placeholder até o acervo chegar) ── */}
          {(
            <section className="py-14 border-b border-tinta-16">
              <h2 className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-tinta-50 mb-6">{t('media_label')}</h2>
              <GradeDoRegistro chave={discipline.slug} rotulo={tServicos('trilho_label', { disciplina: titulo })} />
            </section>
          )}

          {/* ── Como fazemos ── */}
          <section className="py-14 border-b border-tinta-16">
            <h2 className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-verde-medio mb-8">{t('how_label')}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {comoFazemos.map((passo, i) => (
                <motion.div
                  key={passo.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px 0px' }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <div className="text-[11px] font-bold tabular-nums text-verde-medio mb-2">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="text-[16px] font-bold text-verde leading-tight mb-2">{passo.title}</h3>
                  <p className="text-[13.5px] leading-[1.65] text-tinta-50">{passo.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── Sub-serviços ── */}
          <section className="py-14 border-b border-tinta-16">
            <h2 className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-verde-medio mb-8">{t('whats_included')}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {discipline.subServices.map((sub, i) => {
                const ls = getLocalizedSubService(locale, sub.slug)
                return (
                  <motion.div
                    key={sub.slug}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px 0px' }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <Link
                      href={`/${locale}/servicos/${sub.slug}`}
                      className="group h-full flex flex-col p-6 rounded-2xl border border-tinta-16 bg-white hover:border-verde-medio/45 hover:shadow-md transition-all duration-300"
                    >
                      <h3 className="text-[17.5px] font-bold text-verde leading-tight mb-2">{ls?.name ?? sub.name}</h3>
                      <p className="text-[13.5px] leading-[1.6] text-tinta-70 mb-5 flex-1">{ls?.tagline ?? sub.tagline}</p>
                      <span className="inline-flex items-center gap-2 text-[12.5px] font-bold text-verde-medio transition-all duration-200 group-hover:gap-2.5">
                        {t('see_details')}
                        <ArrowIcon />
                      </span>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </section>

          {/* ── Entregas ── */}
          <section className="py-14">
            <h2 className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-tinta-50 mb-6">{t('you_receive')}</h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
              {entregas.map(e => (
                <li key={e} className="flex items-start gap-2.5 text-[14.5px] leading-[1.6] text-tinta-70">
                  <span className="mt-[9px] w-1 h-1 rounded-full bg-verde-medio/60 shrink-0" />
                  {e}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      {/* ── CTA ── */}
      <section className="bg-verde relative overflow-hidden py-20 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_120%,#2D5238,transparent_65%)] opacity-50 pointer-events-none" />
        <div className="relative z-10 max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16 max-w-[680px]">
          <h2 className="text-[clamp(26px,4vw,48px)] leading-[1.05] tracking-[-0.03em] text-menta mb-5">
            {t('cta_title', { discipline: titulo })}
          </h2>
          <p className="text-menta-fraca text-[15.5px] leading-[1.75] mb-8">{t('cta_desc')}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/${locale}/consultoria`}
              className="inline-flex items-center justify-center gap-2.5 bg-sol text-verde font-medium px-7 py-4 rounded-full text-[15px] hover:bg-sol-forte hover:-translate-y-0.5 transition-all duration-200"
            >
              {t('cta_button')}
              <ArrowIcon />
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-verde-borda text-menta font-medium px-7 py-4 rounded-full text-[15px] hover:border-menta hover:-translate-y-0.5 transition-all duration-200"
            >
              {t('cta_secondary')}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
