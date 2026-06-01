'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { servicesData } from '@/data/services'

/* ─── Imagem de capa por sub-serviço (Unsplash) ─── */
const CARD_IMAGE: Record<string, string> = {
  'naming':                'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=600&q=80',
  'identidade-visual':     'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
  'branding-completo':     'https://images.unsplash.com/photo-1511140973288-19bf21d7e771?w=600&q=80',
  'landing-page':          'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80',
  'website-institucional': 'https://images.unsplash.com/photo-1610465299993-e6675c9f9efa?w=600&q=80',
  'producao-conteudo':     'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80',
  'captacoes':             'https://images.unsplash.com/photo-1532272278764-53cd1fe53f72?w=600&q=80',
  'setup':                 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&q=80',
  'meta-ads':              'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
  'google-ads':            'https://images.unsplash.com/photo-1557838923-2985c318be48?w=600&q=80',
  'sistemas-internos':     'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
  'automacoes':            'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&q=80',
  'crm':                   'https://images.unsplash.com/photo-1579403124614-197f69d8187b?w=600&q=80',
}

/* ─── Gradiente fallback por sub-serviço ─── */
const CARD_GRADIENT: Record<string, string> = {
  'naming':               'from-[#1B3025] via-[#2D5238] to-[#3D7A4E]',
  'identidade-visual':    'from-[#243D2D] via-[#2D5238] to-[#1B3025]',
  'branding-completo':    'from-[#0F2018] via-[#1B3025] to-[#2D5238]',
  'landing-page':         'from-[#162B20] via-[#243D2D] to-[#2A4F35]',
  'website-institucional':'from-[#1B3025] via-[#162B20] to-[#243D2D]',
  'producao-conteudo':    'from-[#243D2D] via-[#345E3F] to-[#1B3025]',
  'captacoes':            'from-[#0F2018] via-[#243D2D] to-[#2D5238]',
  'setup':                'from-[#162B20] via-[#1B3025] to-[#345E3F]',
  'meta-ads':             'from-[#1B3025] via-[#2D5238] to-[#162B20]',
  'google-ads':           'from-[#243D2D] via-[#0F2018] to-[#1B3025]',
  'sistemas-internos':    'from-[#0F2018] via-[#162B20] to-[#243D2D]',
  'automacoes':           'from-[#1B3025] via-[#0F2018] to-[#162B20]',
  'crm':                  'from-[#162B20] via-[#243D2D] to-[#0F2018]',
}

/* ─── Ícone por pilar ─── */
const PILLAR_ICONS: Record<string, React.ReactNode> = {
  branding: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M10 18l4-12 4 12"/><line x1="11.5" y1="15" x2="16.5" y2="15"/>
    </svg>
  ),
  web: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  social: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  ),
  performance: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
      <polyline points="16 7 22 7 22 13"/>
    </svg>
  ),
  sistemas: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="7" height="7" rx="1"/><rect x="15" y="3" width="7" height="7" rx="1"/>
      <rect x="2" y="14" width="7" height="7" rx="1"/><rect x="15" y="14" width="7" height="7" rx="1"/>
      <line x1="9" y1="6.5" x2="15" y2="6.5"/><line x1="9" y1="17.5" x2="15" y2="17.5"/>
      <line x1="12" y1="9" x2="12" y2="14"/>
    </svg>
  ),
}

function SubServiceCard({ sub, localePrefix, seeMore, recommended }: {
  sub: { slug: string; name: string; tagline: string; recommended?: boolean }
  localePrefix: string
  seeMore: string
  recommended: string
}) {
  const imgSrc = CARD_IMAGE[sub.slug]
  const gradient = CARD_GRADIENT[sub.slug] ?? 'from-[#1B3025] to-[#2D5238]'

  return (
    <Link href={`/${localePrefix}/servicos/${sub.slug}`} className="shrink-0 w-[240px]">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group relative flex flex-col rounded-2xl overflow-hidden border border-g-dark/10 hover:border-g-mid/50 bg-g-pale hover:bg-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
      >
        {/* Foto — metade superior */}
        <div className="relative h-[120px] shrink-0 overflow-hidden">
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={sub.name}
              fill
              sizes="240px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className={cn('absolute inset-0 bg-gradient-to-br', gradient)} />
          )}
          <div className="absolute inset-0 bg-g-dark/20 group-hover:bg-g-dark/10 transition-colors duration-300" />
          {sub.recommended && (
            <div className="absolute top-3 left-3 z-10">
              <span className="text-[8px] font-bold tracking-[0.15em] uppercase bg-g-mid text-white px-2 py-0.5 rounded-full">
                {recommended}
              </span>
            </div>
          )}
        </div>

        {/* Conteúdo — metade inferior */}
        <div className="p-5 flex flex-col gap-2 flex-1">
          <div className="text-[12px] font-bold tracking-[0.1em] uppercase text-g-mid">
            {sub.name}
          </div>
          <p className="text-[12px] text-g-dark/55 leading-[1.6] flex-1" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '2.4em' }}>
            {sub.tagline}
          </p>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-g-mid/70 group-hover:text-g-mid group-hover:gap-1.5 transition-all duration-200 mt-auto pt-2">
            {seeMore}
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          </span>
        </div>
      </motion.div>
    </Link>
  )
}

interface ServiceItem {
  number: string
  title: string
  description: string
  tags: string[]
}

export function Services() {
  const t = useTranslations('services')
  const locale = useLocale()
  const [open, setOpen] = useState<number | null>(null)
  const items = (t.raw('items') as ServiceItem[])

  const pillarOrder = ['social', 'performance', 'web', 'sistemas', 'branding'] as const

  return (
    <section id="services" className="bg-g-dark py-24 lg:py-32">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16 lg:mb-20">
          <AnimateIn>
            <SectionEyebrow>{t('eyebrow')}</SectionEyebrow>
            <h2 className="text-[clamp(30px,4.5vw,52px)] font-bold leading-[1.05] tracking-[-0.025em] text-white mt-2">
              {t('title')}
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.1} className="lg:flex lg:items-end">
            <p className="text-white/45 text-[16px] leading-[1.75]">
              {t('subtitle')}
            </p>
          </AnimateIn>
        </div>

        {/* Accordion list */}
        <div className="divide-y divide-white/[0.08]">
          {items.map((item, i) => {
            const isOpen = open === i
            const pillar = pillarOrder[i]
            const svcData = servicesData.find(s => s.pillar === pillar)

            return (
              <AnimateIn key={i} delay={i * 0.06}>
                <div>
                  {/* ─── Row header ─── */}
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full text-left flex items-center gap-5 py-7 group transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    {/* Number */}
                    <span className="text-[11px] font-bold tracking-[0.15em] text-g-mid uppercase shrink-0 w-7">
                      {item.number}
                    </span>

                    {/* Icon box */}
                    <div className={cn(
                      'shrink-0 w-10 h-10 rounded-lg border flex items-center justify-center transition-colors duration-200',
                      isOpen
                        ? 'bg-g-mid/20 border-g-mid/40 text-g-light'
                        : 'bg-white/[0.05] border-white/10 text-white/50 group-hover:border-g-mid/30 group-hover:text-g-light/70'
                    )}>
                      {PILLAR_ICONS[pillar]}
                    </div>

                    {/* Title */}
                    <h3 className={cn(
                      'flex-1 text-[clamp(24px,3.5vw,42px)] font-bold tracking-[-0.02em] transition-colors duration-200',
                      isOpen ? 'text-g-light' : 'text-white group-hover:text-g-light/80'
                    )}>
                      {item.title}
                    </h3>

                    {/* Expand icon */}
                    <span className={cn(
                      'text-[20px] text-white/45 transition-all duration-300 shrink-0',
                      isOpen && 'rotate-45 text-g-light'
                    )}>
                      +
                    </span>
                  </button>

                  {/* ─── Expanded: horizontal card strip ─── */}
                  <AnimatePresence>
                    {isOpen && svcData && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pb-10 pl-[30px] sm:pl-[88px]">
                          {/* Horizontal scrollable row */}
                          <div className="flex gap-4 overflow-x-auto pb-2 -mr-6 pr-6 sm:-mr-10 sm:pr-10 lg:-mr-16 lg:pr-16" style={{ scrollbarWidth: 'none' }}>
                            {svcData.subServices.map(sub => (
                              <SubServiceCard key={sub.slug} sub={sub} localePrefix={locale} seeMore={t('see_more')} recommended={t('recommended')} />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimateIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
