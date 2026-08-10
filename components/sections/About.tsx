'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { VideoLightbox } from '@/components/ui/VideoLightbox'

const ABOUT_VIDEO_ID = '1197006693'

const MARKETS = [
  { flag: '🇧🇷', label: 'Português' },
  { flag: '🇬🇧', label: 'English' },
  { flag: '🇪🇸', label: 'Español' },
]

export function About() {
  const t = useTranslations('about')
  const [thumbnail, setThumbnail] = useState<string | undefined>(undefined)
  const videoRef = useRef<HTMLDivElement | null>(null)

  // A capa vem de uma chamada ao oembed do Vimeo. Ela rodava no mount, ou seja,
  // toda visita à home batia em vimeo.com antes mesmo de o visitante chegar
  // nesta seção, que fica lá embaixo. Agora só dispara quando a seção se
  // aproxima da viewport: quem não rola até aqui nunca toca no terceiro.
  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    let cancelado = false
    const buscar = () => {
      fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${ABOUT_VIDEO_ID}&width=640`)
        .then(r => r.json())
        .then(d => { if (!cancelado) setThumbnail(d.thumbnail_url) })
        .catch(() => {})
    }

    const observer = new IntersectionObserver(
      entradas => {
        if (entradas.some(e => e.isIntersecting)) {
          observer.disconnect()
          buscar()
        }
      },
      { rootMargin: '400px 0px' }
    )
    observer.observe(el)
    return () => { cancelado = true; observer.disconnect() }
  }, [])

  const differentials = [
    { title: t('d1_title'), desc: t('d1_desc') },
    { title: t('d2_title'), desc: t('d2_desc') },
    { title: t('d3_title'), desc: t('d3_desc') },
  ]

  return (
    <section id="about" className="bg-white py-24 lg:py-32">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Título e subtítulo centralizados */}
        <AnimateIn className="text-center mb-14 lg:mb-18">
          <SectionEyebrow light>{t('eyebrow')}</SectionEyebrow>
          <h2 className="text-[clamp(30px,4.5vw,52px)] font-bold leading-[1.05] tracking-[-0.025em] text-g-dark mt-2 mb-5 max-w-[680px] mx-auto">
            {t('title')}
          </h2>
          <p className="text-tinta-70 text-[16px] leading-[1.8] max-w-[560px] mx-auto">
            {t('description')}
          </p>
        </AnimateIn>

        {/* Bloco central: vídeo à esquerda + cards à direita */}
        <div className="max-w-[960px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">

            {/* Coluna esquerda: vídeo vertical */}
            <AnimateIn className="flex justify-center">
              <div ref={videoRef} className="w-full max-w-[280px] shadow-2xl shadow-g-dark/20 rounded-2xl overflow-hidden">
                <VideoLightbox
                  src={`https://player.vimeo.com/video/${ABOUT_VIDEO_ID}?autoplay=1&title=0&byline=0&portrait=0`}
                  thumbnail={thumbnail}
                  aspect="9/16"
                  label="Explore Digital"
                  placeholderClass="bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,#2D5238,#0F2018)]"
                />
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
                        <p className="text-[14px] text-tinta-70 leading-[1.7]">{d.desc}</p>
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>

          </div>
        </div>

        {/* Onde atuamos — centralizado na parte inferior */}
        <AnimateIn className="mt-14 text-center">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-medio mb-4">
            {t('where_eyebrow')}
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
          <p className="text-[12px] text-tinta-70 mt-4 leading-[1.7] max-w-[420px] mx-auto border-l-2 border-g-mid/30 pl-3 text-left">
            {t('markets')}
          </p>
        </AnimateIn>

      </div>
    </section>
  )
}
