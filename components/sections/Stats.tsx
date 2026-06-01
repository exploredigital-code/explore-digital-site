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
    desc: 'Reduzimos a dependência de OTAs e construímos audiências que reservam direto.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: 'Experiências & Esportes',
    desc: 'Você vende um estilo de vida. O conteúdo e o anúncio precisam transmitir isso antes da matrícula.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: 'Real Estate',
    desc: 'Imóveis de alto padrão vendem experiência antes de metros quadrados. Fazemos isso.',
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
            Uma agência de marketing. Uma parceira para seu negócio.
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
          {NICHES.map((n, i) => (
            <AnimateIn key={i} delay={i * 0.1} className="h-full">
              <div className="group h-full p-8 rounded-2xl border border-white/[0.07] hover:border-g-mid/40 bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-300 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-g-mid/15 flex items-center justify-center text-g-light mb-6 group-hover:bg-g-mid/25 transition-colors shrink-0">
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
