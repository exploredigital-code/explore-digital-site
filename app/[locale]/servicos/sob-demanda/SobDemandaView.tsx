'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/sections/Navbar'
import { SkipLink } from '@/components/ui/SkipLink'
import { Footer } from '@/components/sections/Footer'
import { onDemandItems, formatDays } from '@/data/on-demand'

const WA_BASE = 'https://wa.me/+5585991043067?text='

type OnDemandCopy = { slug: string; name: string; tagline: string; includes: string[] }

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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

/**
 * Sob demanda, em rota própria.
 *
 * Saiu do hub porque as duas seções respondiam perguntas de pessoas
 * diferentes na mesma tela. Quem compra sob demanda já sabe o que quer e vai
 * direto ao WhatsApp; quem chega pelas disciplinas tem um problema e ainda
 * vai descobrir o que precisa. Empilhar obrigava o visitante a se classificar
 * antes de entender as opções.
 */
export function SobDemandaView() {
  const t = useTranslations('servicos')
  const locale = useLocale()
  const copy = t.raw('on_demand_items') as OnDemandCopy[]

  const waFor = (nome: string) => WA_BASE + encodeURIComponent(t('wa_item', { item: nome }))

  return (
    <>
      <SkipLink />
      <Navbar />

      {/* ── Abertura ── */}
      <section className="page-hero relative overflow-hidden pt-32 pb-14 lg:pt-40 lg:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_15%_0%,#2D5238,transparent_65%)] opacity-55 pointer-events-none" />
        <div className="relative z-10 max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
            <Link href={`/${locale}/servicos`} className="inline-flex items-center gap-2 text-[12.5px] font-medium text-menta-fraca hover:text-menta transition-colors mb-8">
              ← {t('door2_cta')}
            </Link>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-verde-luz" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-luz">{t('od_eyebrow')}</span>
            </div>
            <h1 className="text-[clamp(34px,6vw,72px)] leading-[0.98] tracking-[-0.035em] text-menta max-w-[820px] mb-5">
              {t('od_title')}
            </h1>
            <p className="text-menta-fraca text-[16px] leading-[1.75] max-w-[520px]">{t('od_sub')}</p>
          </motion.div>
        </div>
      </section>

      <main id="conteudo" className="bg-white">
        <div className="max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16 py-14 lg:py-20">

          {/* Gancho de temporada: a janela de captação é agosto a dezembro */}
          <motion.aside
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px 0px' }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl bg-verde p-8 lg:p-10 relative overflow-hidden mb-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_90%_at_100%_0%,#2D5238,transparent_65%)] opacity-55 pointer-events-none" />
            <div className="relative z-10 max-w-[640px]">
              <span className="inline-block text-[10px] font-bold tracking-[0.18em] uppercase bg-verde-luz text-verde px-3 py-1 rounded-full mb-5">
                {t('od_season_badge')}
              </span>
              <h2 className="text-[clamp(20px,2.8vw,30px)] leading-[1.15] tracking-[-0.02em] text-menta mb-4">
                {t('od_season_title')}
              </h2>
              <p className="text-[15px] leading-[1.75] text-menta-fraca">{t('od_season_desc')}</p>
            </div>
          </motion.aside>

          {/* Os itens */}
          <div className="grid sm:grid-cols-2 gap-4">
            {onDemandItems.map((item, i) => {
              const c = copy.find(x => x.slug === item.slug)
              if (!c) return null
              return (
                <motion.article
                  key={item.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px 0px' }}
                  transition={{ duration: 0.45, delay: i * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="flex flex-col p-7 rounded-2xl border border-tinta-16 bg-white hover:border-verde-medio/45 hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-[20px] leading-tight tracking-[-0.015em] text-verde font-bold mb-2">{c.name}</h3>
                  <p className="text-[14px] leading-[1.6] text-tinta-70 mb-5">{c.tagline}</p>

                  <div className="pb-5 mb-5 border-b border-tinta-16">
                    <div className="text-[9.5px] font-bold tracking-[0.16em] uppercase text-tinta-70 mb-0.5">{t('od_delivery')}</div>
                    <div className="text-[22px] font-bold text-verde tabular-nums leading-none">
                      {formatDays(item.deliveryDays, t('od_days_to'))}{' '}
                      <span className="text-[15px] font-semibold text-verde-medio">{t('od_days')}</span>
                    </div>
                  </div>

                  <div className="text-[9.5px] font-bold tracking-[0.16em] uppercase text-tinta-70 mb-3">{t('od_includes')}</div>
                  <ul className="flex flex-col gap-2 mb-6 flex-1">
                    {c.includes.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-[13.5px] leading-[1.55] text-tinta-70">
                        <span className="mt-[7px] w-1 h-1 rounded-full bg-verde-medio/60 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {item.onSite && <div className="text-[11.5px] text-tinta-50 mb-4 leading-snug">{t('od_onsite')}</div>}

                  <div className="flex flex-wrap items-center gap-3 mt-auto">
                    <a
                      href={waFor(c.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-sol text-verde font-medium px-5 py-2.5 rounded-full text-[13.5px] hover:bg-sol-forte hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <WhatsAppIcon />
                      {t('od_cta')}
                    </a>
                    <Link href={`/${locale}/consultoria`} className="text-[13px] font-medium text-tinta-70 border-b border-tinta-16 pb-0.5 hover:text-verde-medio hover:border-verde-medio transition-colors duration-200">
                      {t('od_orcamento')}
                    </Link>
                    {item.detailSlug && (
                      <Link href={`/${locale}/servicos/${item.detailSlug}`} className="text-[13px] font-medium text-tinta-50 hover:text-verde-medio transition-colors duration-200">
                        {t('od_details')}
                      </Link>
                    )}
                  </div>
                </motion.article>
              )
            })}
          </div>

          <p className="text-[13px] leading-[1.7] text-tinta-50 mt-6 max-w-[620px]">{t('od_season_note')}</p>
        </div>
      </main>

      {/* ── A outra porta ── */}
      <section className="bg-verde relative overflow-hidden py-16 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_120%,#2D5238,transparent_65%)] opacity-50 pointer-events-none" />
        <div className="relative z-10 max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16 max-w-[680px]">
          <div className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-verde-luz/55 mb-4">{t('door2_label')}</div>
          <h2 className="text-[clamp(24px,3.6vw,40px)] leading-[1.05] tracking-[-0.03em] text-menta mb-4">{t('door2_title')}</h2>
          <p className="text-menta-fraca text-[15.5px] leading-[1.75] mb-8">{t('door2_desc')}</p>
          <Link
            href={`/${locale}/servicos`}
            className="inline-flex items-center gap-2.5 border border-verde-borda text-menta font-medium px-7 py-3.5 rounded-full text-[14.5px] hover:border-menta hover:-translate-y-0.5 transition-all duration-200"
          >
            {t('door2_cta')}
            <ArrowIcon />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
