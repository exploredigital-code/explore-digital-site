'use client'

import { useTranslations } from 'next-intl'

const ICON_HOSPITALITY = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 22V12a10 10 0 0 1 20 0v10"/><path d="M6 22V10"/><path d="M18 22V10"/><path d="M2 22h20"/><rect x="10" y="14" width="4" height="8"/>
  </svg>
)
const ICON_EXPERIENCES = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>
)
const ICON_REALESTATE = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)
const ICON_BRANDING = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)
const ICON_WEBDESIGN = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>
  </svg>
)
const ICON_SOCIAL = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
)
const ICON_PERFORMANCE = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
  </svg>
)
const ICON_EXPLORE = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

function MarqueeTrack({ items }: { items: { label: string; icon: React.ReactNode }[] }) {
  const repeated = [...items, ...items, ...items, ...items]
  return (
    <div className="flex items-center gap-0 whitespace-nowrap">
      {repeated.map((item, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-3 px-8 text-[11px] font-bold tracking-[0.22em] uppercase text-g-pale/90"
          aria-hidden={i >= items.length}
        >
          <span className="text-g-pale/55 shrink-0">{item.icon}</span>
          {item.label}
        </span>
      ))}
    </div>
  )
}

export function Marquee() {
  const t = useTranslations('marquee_items')

  const items = [
    { label: t('hospitality'), icon: ICON_HOSPITALITY },
    { label: t('experiences'), icon: ICON_EXPERIENCES },
    { label: 'Real Estate', icon: ICON_REALESTATE },
    { label: 'Branding', icon: ICON_BRANDING },
    { label: 'Web Design', icon: ICON_WEBDESIGN },
    { label: 'Social Media', icon: ICON_SOCIAL },
    { label: 'Performance', icon: ICON_PERFORMANCE },
    { label: 'Explore Digital', icon: ICON_EXPLORE },
  ]

  return (
    <div className="bg-g-mid py-4 overflow-hidden border-y border-white/10 relative">
      <div className="marquee-track">
        <MarqueeTrack items={items} />
        <MarqueeTrack items={items} aria-hidden />
      </div>
    </div>
  )
}
