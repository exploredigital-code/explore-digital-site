'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'

const NICHES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: 'Hotelaria',
    desc: 'Pousadas, hotéis, hostels e resorts que precisam de uma presença digital à altura da experiência que entregam.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: 'Experiências & Esportes',
    desc: 'Escolas de kite, surf, experiências gastronômicas, beach clubs e destinos de aventura no litoral.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: 'Real Estate',
    desc: 'Imobiliárias e incorporadoras que vendem estilo de vida no litoral para investidores nacionais e internacionais.',
  },
]

export function Stats() {
  return (
    <section className="bg-g-dark border-b border-white/[0.07]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">

        <AnimateIn className="mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-px bg-g-light shrink-0" />
            <span className="text-g-light text-[11px] font-bold tracking-[0.2em] uppercase">
              Nichos que atuamos
            </span>
          </div>
          <h2 className="text-[clamp(26px,3.5vw,42px)] font-bold text-white leading-[1.05] tracking-tight max-w-[480px]">
            Mais que uma agência de marketing, uma parceria digital
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {NICHES.map((n, i) => (
            <AnimateIn key={i} delay={i * 0.1}>
              <div className="group p-8 rounded-2xl border border-white/[0.07] hover:border-g-mid/40 bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-g-mid/15 flex items-center justify-center text-g-light mb-6 group-hover:bg-g-mid/25 transition-colors">
                  {n.icon}
                </div>
                <h3 className="text-[20px] font-bold text-white mb-3 leading-tight">{n.title}</h3>
                <p className="text-[14px] text-white/45 leading-[1.75]">{n.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  )
}
