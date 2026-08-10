'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { AnimateIn } from '@/components/ui/AnimateIn'

const NICHE_ICONS: (() => React.ReactElement)[] = [
  () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
    </svg>
  ),
  () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  ),
]

export function Stats() {
  const t = useTranslations('stats')

  const niches = [
    { title: t('n1_title'), desc: t('n1_desc') },
    { title: t('n2_title'), desc: t('n2_desc') },
    { title: t('n3_title'), desc: t('n3_desc') },
  ]

  return (
    <section className="bg-g-dark border-b border-white/[0.07]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">

        <AnimateIn className="mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-px bg-g-light shrink-0" />
            <span className="text-g-light text-[11px] font-bold tracking-[0.2em] uppercase">
              {t('nichos_eyebrow')}
            </span>
          </div>
          <h2 className="text-[clamp(30px,4.5vw,52px)] font-bold text-white leading-[1.05] tracking-[-0.025em]">
            <span className="block">{t('nichos_title1')}</span>
            <span className="block">{t('nichos_title2')}</span>
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
          {niches.map((n, i) => (
            <AnimateIn key={i} delay={i * 0.1} className="h-full">
              <div className="group h-full p-8 rounded-2xl border border-white/[0.07] hover:border-g-mid/40 bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-300 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-g-mid/15 flex items-center justify-center text-g-light mb-6 group-hover:bg-g-mid/25 transition-colors shrink-0">
                  {NICHE_ICONS[i]()}
                </div>
                <h3 className="text-[20px] font-bold text-white mb-3 leading-tight">{n.title}</h3>
                <p className="text-[14px] text-menta-fraca leading-[1.75]">{n.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  )
}
