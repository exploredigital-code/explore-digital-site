'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { projects, filtroAjuda, type Category } from '@/data/portfolio'
import { getLocalizedProject } from '@/data/portfolio-content'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { AnimateIn, AnimateStagger, itemVariants } from '@/components/ui/AnimateIn'

const SECTOR_KEY: Record<string, string> = {
  'Beach Club': 'sector_beach_club',
  'Hotelaria': 'sector_hotelaria',
  'Turismo': 'sector_turismo',
  'Esporte & Experiência': 'sector_esporte',
  'Gastronomia': 'sector_gastronomia',
}

const FILTER_KEYS: { key: Category | 'all'; labelKey: string }[] = [
  { key: 'all',         labelKey: 'filter_all' },
  { key: 'branding',    labelKey: 'filter_branding' },
  { key: 'web',         labelKey: 'filter_web' },
  { key: 'social',      labelKey: 'filter_social' },
  { key: 'performance', labelKey: 'filter_performance' },
]

/**
 * Só mostra o filtro de uma categoria que tenha projeto publicado. Um filtro
 * vazio leva ao "em breve, novos projetos" — que anuncia a lacuna em vez de
 * esconder. Volta sozinho quando um case daquela categoria for publicado.
 */
function usableFilters(pool: typeof projects) {
  const present = new Set(pool.flatMap(p => p.categories))
  return FILTER_KEYS.filter(f => f.key === 'all' || present.has(f.key as Category))
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const locale = useLocale()
  const t = useTranslations('portfolio')
  const getSector = (s: string) => { const k = SECTOR_KEY[s]; return k ? t(k as Parameters<typeof t>[0]) : s }
  const localized = getLocalizedProject(locale, project.slug)
  const tagline = localized?.tagline ?? project.tagline
  return (
    <motion.div variants={itemVariants}>
      <Link
        href={`/${locale}/portfolio/${project.slug}`}
        className="group block overflow-hidden rounded-2xl bg-white border border-g-dark/8 hover:border-g-mid/35 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
      >
        {/* Foto real com overlay */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.client}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-g-dark/30" />
          {project.featured && (
            <div className="absolute top-4 left-4 bg-g-mid text-white text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full">
              {t('featured_badge')}
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-g-dark/30 to-transparent" />
          {/* Hover arrow */}
          <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-g-mid/70">
              {getSector(project.sector)}
            </span>
            <span className="text-[10px] text-g-dark/35 tracking-widest">{project.year}</span>
          </div>
          <h3 className="text-[19px] font-bold text-g-dark leading-tight mb-2 group-hover:text-g-mid transition-colors">
            {project.client}
          </h3>
          <p className="text-[13px] text-g-dark/50 leading-[1.65] line-clamp-2 mb-4">
            {tagline}
          </p>
          <div className="pt-4 border-t border-g-dark/6 flex items-center justify-between">
            <span className="text-[12px] text-g-dark/40">{project.location}</span>
            <span className="text-[12px] font-bold text-g-mid/70 group-hover:text-g-mid transition-colors flex items-center gap-1">
              {t('view_project')}
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

const GRID_LIMIT = 8 // featured (1) + grid (8) = 9 cards visíveis por padrão

export function PortfolioView() {
  const t = useTranslations('portfolio')
  const tContact = useTranslations('contact')
  const [active, setActive] = useState<Category | 'all'>('all')
  const [expanded, setExpanded] = useState(false)

  const visible = projects.filter(p => !p.hidden)
  // Filtro só entra quando ajuda a navegar. Ver filtroAjuda em data/portfolio.
  const filters = filtroAjuda(visible) ? usableFilters(visible) : []
  const featured = visible.find(p => p.featured)
  const filtered = active === 'all'
    ? visible.filter(p => !p.featured)
    : visible.filter(p => !p.featured && p.categories.includes(active))

  // Limita apenas no filtro "Todos"; em categorias mostra tudo
  const displayLimit = active === 'all' && !expanded ? GRID_LIMIT : filtered.length
  const displayed = filtered.slice(0, displayLimit)
  const hiddenCount = filtered.length - displayLimit

  // Reset ao trocar filtro
  const handleFilter = (key: Category | 'all') => {
    setActive(key)
    setExpanded(false)
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="page-hero pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_-20%,#2D5238,transparent_70%)] opacity-50 pointer-events-none" />
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <AnimateIn>
            <SectionEyebrow>{t('page_eyebrow')}</SectionEyebrow>
            <h1 className="text-[clamp(36px,5.5vw,72px)] leading-[0.95] tracking-[-0.03em] text-white mt-2 mb-5 max-w-[660px]">
              {t('page_hero_title')}
            </h1>
            <p className="text-g-light/55 text-[16px] leading-[1.75] max-w-[480px]">
              {t('page_hero_sub')}
            </p>
          </AnimateIn>
        </div>
      </section>

      <main className="bg-g-pale">

        {/* Featured project */}
        {featured && (
          <section className="py-16 lg:py-20 border-b border-g-dark/8">
            <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
              <AnimateIn className="mb-8">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-g-mid/65">{t('featured_label')}</span>
              </AnimateIn>
              <AnimateIn>
                <FeaturedProjectCard project={featured} />
              </AnimateIn>
            </div>
          </section>
        )}

        {/* Filter tabs */}
        {filters.length > 1 && (
        <div className="sticky top-[68px] z-30 bg-white border-b border-g-dark/8">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 overflow-x-auto">
            <div className="flex gap-0 min-w-max">
              {filters.map(f => (
                <button
                  key={f.key}
                  onClick={() => handleFilter(f.key)}
                  className={cn(
                    'px-5 py-4 text-[13px] font-bold whitespace-nowrap transition-colors duration-200 border-b-2 -mb-px',
                    active === f.key
                      ? 'text-g-dark border-g-mid'
                      : 'text-g-dark/50 border-transparent hover:text-g-dark/65'
                  )}
                >
                  {t(f.labelKey)}
                </button>
              ))}
            </div>
          </div>
        </div>
        )}

        {/* Projects grid */}
        <section className="py-16 lg:py-24 min-h-[400px]">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {displayed.length > 0 ? (
                  <>
                    <AnimateStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {displayed.map(p => <ProjectCard key={p.id} project={p} />)}
                    </AnimateStagger>

                    {/* Botão "Ver mais" — aparece quando há projetos ocultos */}
                    {hiddenCount > 0 && (
                      <div className="mt-10 text-center">
                        <button
                          onClick={() => setExpanded(true)}
                          className="inline-flex items-center gap-2 border border-g-dark/20 hover:border-g-mid/50 text-g-dark/70 hover:text-g-dark font-bold text-[14px] px-8 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                        >
                          {t('see_more')} {hiddenCount} {hiddenCount === 1 ? t('project_singular') : t('project_plural')}
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M7 2v10M2 7l5 5 5-5"/>
                          </svg>
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-20 text-g-dark/30">
                    <div className="text-[40px] mb-4">✦</div>
                    <p className="text-[15px]">{t('empty_state')}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-g-dark/8 py-16 lg:py-20">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
            <AnimateIn>
              <div className="bg-g-dark rounded-2xl p-10 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_0%_50%,#2D5238,transparent)] opacity-40" />
                <div className="relative z-10">
                  <div className="text-[11px] font-bold tracking-[0.18em] uppercase text-g-light/35 mb-3">{t('cta_eyebrow')}</div>
                  <h3 className="text-[clamp(20px,2.5vw,32px)] text-white max-w-[440px] leading-tight">
                    {t('cta_title')}
                  </h3>
                </div>
                <a
                  href={`https://wa.me/+5585991043067?text=${encodeURIComponent(tContact('whatsapp_intro'))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 shrink-0 inline-flex items-center gap-2 bg-g-light text-g-dark font-bold px-7 py-3.5 rounded-full hover:bg-g-pale hover:-translate-y-0.5 transition-all duration-200 text-[14px]"
                >
                  {t('cta_button')}
                </a>
              </div>
            </AnimateIn>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

function FeaturedProjectCard({ project }: { project: (typeof projects)[0] }) {
  const locale = useLocale()
  const t = useTranslations('portfolio')
  const getSector = (s: string) => { const k = SECTOR_KEY[s]; return k ? t(k as Parameters<typeof t>[0]) : s }
  const localized = getLocalizedProject(locale, project.slug)
  const tagline = localized?.tagline ?? project.tagline
  // Métrica só entra se confirmada pelo cliente. Sem ela o card fica com
  // setor, nome e ano, e a linha some inteira em vez de virar espaço vazio.
  const result = project.resultConfirmado ? (localized?.result ?? project.result) : null
  return (
    <Link
      href={`/${locale}/portfolio/${project.slug}`}
      className="group block overflow-hidden rounded-2xl bg-g-dark border border-white/[0.08] hover:border-g-mid/40 transition-colors duration-300"
    >
      <div className="grid md:grid-cols-2">
        {/* Foto destaque */}
        <div className="relative h-56 md:h-auto min-h-[260px] overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.client}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-g-dark/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-g-dark/60 hidden md:block" />
          <div className="absolute top-5 left-5">
            <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-g-light/80 bg-g-dark/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
              {getSector(project.sector)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[11px] text-g-light/35">{project.location}</span>
              <span className="text-g-light/20">·</span>
              <span className="text-[11px] text-g-light/35">{project.year}</span>
            </div>
            <h2 className="text-[clamp(28px,3.5vw,44px)] text-white leading-[1.05] tracking-tight mb-3 group-hover:text-g-light transition-colors">
              {project.client}
            </h2>
            <p className="text-[15px] text-white/45 leading-[1.75] mb-4">{tagline}</p>
            {result && <div className="text-[13px] font-bold text-g-mid/70">{result}</div>}
          </div>
          <div className="mt-8 inline-flex items-center gap-2 text-[13px] font-bold text-g-light/50 group-hover:text-g-light transition-colors">
            {t('view_full_case')}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
