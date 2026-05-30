'use client'

import { useTranslations } from 'next-intl'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { AnimateIn } from '@/components/ui/AnimateIn'

const MARKETS = [
  { flag: '🇧🇷', label: 'Brasil' },
  { flag: '🇵🇹', label: 'Portugal' },
  { flag: '🌎', label: 'Internacional' },
]

export function About() {
  const t = useTranslations('about')

  const differentials = [
    { title: t('d1_title'), desc: t('d1_desc') },
    { title: t('d2_title'), desc: t('d2_desc') },
    { title: t('d3_title'), desc: t('d3_desc') },
  ]

  return (
    <section id="about" className="bg-white py-24 lg:py-32">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Título e subtítulo */}
        <AnimateIn className="text-center mb-12 lg:mb-16">
          <SectionEyebrow light>{t('eyebrow')}</SectionEyebrow>
          <h2 className="text-[clamp(30px,4.5vw,52px)] font-bold leading-[1.05] tracking-[-0.025em] text-g-dark mt-2 mb-5 max-w-[680px] mx-auto">
            {t('title')}
          </h2>
          <p className="text-g-dark/55 text-[16px] leading-[1.8] max-w-[560px] mx-auto">
            {t('description')}
          </p>
        </AnimateIn>

        {/* Bloco compacto: vídeo + cards lado a lado */}
        <div className="grid lg:grid-cols-2 gap-5 lg:gap-6 items-start">

          {/* Coluna esquerda: vídeo vertical */}
          <AnimateIn>
            <div className="relative w-full max-w-[300px] mx-auto lg:mx-0">
              <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-g-dark border border-g-dark/10 shadow-xl">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,#2D5238,#0F2018)]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-6">
                  <div className="w-16 h-16 rounded-full border-2 border-g-light/30 flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white" className="translate-x-0.5 opacity-70">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-[12px] text-g-light/40 tracking-widest uppercase leading-[1.6]">
                    Vídeo institucional<br />Explore Digital
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Coluna direita: cards de diferenciais */}
          <div className="flex flex-col gap-4">
            {differentials.map((d, i) => (
              <AnimateIn key={i} delay={i * 0.1}>
                <div className="group p-6 rounded-2xl border border-g-dark/10 hover:border-g-mid/40 bg-g-pale/60 hover:bg-g-pale transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-g-mid/15 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-g-mid/25 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-g-mid" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[17px] text-g-dark mb-2">{d.title}</h3>
                      <p className="text-[14px] text-g-dark/55 leading-[1.7]">{d.desc}</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

        </div>

        {/* Onde atuamos — centralizado na parte inferior */}
        <AnimateIn className="mt-12 text-center">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-mid mb-4">
            Onde atuamos
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {MARKETS.map((m) => (
              <div
                key={m.label}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-g-pale border border-g-dark/8 hover:border-g-mid/30 transition-colors"
              >
                <span className="text-[18px] leading-none">{m.flag}</span>
                <span className="text-[13px] font-bold text-g-dark/70">{m.label}</span>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-g-dark/40 mt-4 leading-[1.7] max-w-[420px] mx-auto border-l-2 border-g-mid/30 pl-3 text-left">
            {t('markets')}
          </p>
        </AnimateIn>

      </div>
    </section>
  )
}
