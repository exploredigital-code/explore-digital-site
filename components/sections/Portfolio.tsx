'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { projects, type Category } from '@/data/portfolio'
import { getLocalizedProject } from '@/data/portfolio-content'

type Filter = 'all' | Category

const FILTERS: { key: Filter; labelKey: string }[] = [
  { key: 'all',         labelKey: 'filter_all' },
  { key: 'web',        labelKey: 'filter_web' },
  { key: 'social',     labelKey: 'filter_social' },
  { key: 'performance',labelKey: 'filter_performance' },
]

const CATEGORY_LABELS: Record<Category, string> = {
  branding:    'Branding',
  web:         'Web Design',
  social:      'Social Media',
  performance: 'Performance',
}

const SECTOR_KEY: Record<string, string> = {
  'Beach Club': 'sector_beach_club',
  'Hotelaria': 'sector_hotelaria',
  'Turismo': 'sector_turismo',
  'Esporte & Experiência': 'sector_esporte',
  'Real Estate': 'sector_real_estate',
  'Gastronomia': 'sector_gastronomia',
}

function ProjectCard({ project, seeCase, locale, getSector, getTagline }: {
  project: typeof projects[0]; seeCase: string; locale: string
  getSector: (s: string) => string
  getTagline: (slug: string, fallback: string) => string
}) {
  const tagline = getTagline(project.slug, project.tagline)
  return (
    <Link
      href={`/${locale}/portfolio/${project.slug}`}
      className="portfolio-card group relative overflow-hidden rounded-2xl cursor-pointer bg-s2 border border-white/[0.07] hover:border-g-light/20 transition-all duration-300 block"
    >
      {/* Visual */}
      <div className="w-full aspect-[4/3] relative overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.client}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Sector */}
        <div className="absolute top-4 left-4">
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-g-light/80">
            · {getSector(project.sector)}
          </span>
        </div>

        {/* Year */}
        <div className="absolute top-4 right-4 text-[10px] font-bold tracking-widest text-g-light/50 uppercase">
          {project.year}
        </div>

        {/* Category tags */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
          {project.categories.map(cat => (
            <span key={cat}
              className="text-[9px] font-bold tracking-[0.14em] uppercase text-g-light/70 border border-g-light/25 px-2 py-0.5 rounded-sm backdrop-blur-sm">
              {CATEGORY_LABELS[cat]}
            </span>
          ))}
        </div>
      </div>

      {/* Hover overlay */}
      <div className="card-overlay absolute inset-0 bg-g-dark/95 flex flex-col justify-end p-6">
        {/* Sector in hover */}
        <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-g-mid mb-2">{getSector(project.sector)}</div>
        <div className="text-[20px] font-bold text-white leading-tight mb-1">{project.client}</div>
        <div className="text-[13px] text-white/55 mb-3">{project.location}</div>
        <div className="text-[14px] text-g-light mb-5 leading-snug">{tagline}</div>
        <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-g-light/70 group-hover:text-g-light transition-colors">
          {seeCase}
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
        </span>
      </div>

      {/* Bottom info */}
      <div className="p-5">
        <div className="font-bold text-[16px] text-white">{project.client}</div>
        <div className="text-[11px] text-white/50 mt-0.5 tracking-wide uppercase">{getSector(project.sector)} · {project.location}</div>
        <div className="mt-2 text-[12px] text-g-mid/70 font-medium line-clamp-1 md:hidden">{tagline}</div>
      </div>
    </Link>
  )
}

export function Portfolio() {
  const t = useTranslations('portfolio')
  const locale = useLocale()
  const [active, setActive] = useState<Filter>('all')

  const getSector = (sector: string) => {
    const key = SECTOR_KEY[sector]
    return key ? t(key as Parameters<typeof t>[0]) : sector
  }

  const getTagline = (slug: string, fallback: string) =>
    getLocalizedProject(locale, slug)?.tagline ?? fallback

  const visible = projects.filter(p => !p.hidden)
  const filtered = active === 'all' ? visible : visible.filter(p => p.categories.includes(active as Category))
  const displayed = filtered.slice(0, 6)
  const remaining = filtered.length - displayed.length

  return (
    <section id="portfolio" className="bg-g-pale py-24 lg:py-32">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <AnimateIn className="mb-4">
          <SectionEyebrow light>{t('eyebrow')}</SectionEyebrow>
        </AnimateIn>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <AnimateIn delay={0.05}>
            <h2 className="text-[clamp(30px,4.5vw,52px)] font-bold leading-[1.05] tracking-[-0.025em] text-g-dark max-w-[560px]">
              {t('title')}
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <p className="text-g-dark/45 text-[15px] leading-[1.7] max-w-[380px]">{t('subtitle')}</p>
          </AnimateIn>
        </div>

        {/* Filter buttons — rectangular, uppercase, decisive */}
        <AnimateIn delay={0.12} className="flex flex-wrap gap-2 mb-12">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={cn(
                'px-5 py-2.5 text-[11px] font-bold tracking-[0.1em] uppercase transition-all duration-200 rounded-sm',
                active === f.key
                  ? 'bg-g-dark text-g-pale shadow-sm'
                  : 'bg-white text-g-dark/45 border border-g-dark/14 hover:border-g-dark/35 hover:text-g-dark'
              )}
            >
              {t(f.labelKey)}
            </button>
          ))}
        </AnimateIn>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {displayed.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={cn(project.featured && displayed.length > 2 && 'sm:col-span-2 lg:col-span-1')}
              >
                <ProjectCard project={project} seeCase={t('see_case')} locale={locale} getSector={getSector} getTagline={getTagline} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Ver mais */}
        {remaining > 0 && (
          <AnimateIn className="mt-10 text-center">
            <Link
              href={`/${locale}/portfolio`}
              className="inline-flex items-center gap-2 border border-g-dark/20 hover:border-g-mid/50 text-g-dark/70 hover:text-g-dark font-bold text-[14px] px-8 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
            >
              {t('see_more')} {remaining} {remaining === 1 ? t('project_singular') : t('project_plural')}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </Link>
          </AnimateIn>
        )}
      </div>
    </section>
  )
}
