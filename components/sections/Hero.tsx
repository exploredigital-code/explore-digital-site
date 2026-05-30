'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'

const WHATSAPP = 'https://wa.me/5585910430670'

// ── Place your video at public/videos/hero.mp4
// ── Recommended: 1920×1080, H.264, 10–30s loop, muted

const wordVariant = {
  hidden: { y: '105%', opacity: 0 },
  visible: (i: number) => ({
    y: 0, opacity: 1,
    transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1], delay: 0.3 + i * 0.1 },
  }),
}

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98], delay },
})

export function Hero() {
  const t = useTranslations('hero')
  const line1 = t('line1').split(' ')
  const line2 = t('line2')
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-g-dark"
    >
      {/* ── Video background ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero.mp4"
      />

      {/* ── Overlays (readability + brand color) ── */}
      {/* Primary dark overlay */}
      <div className="absolute inset-0 bg-g-dark/72" />
      {/* Directional green gradient — left side stronger */}
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(27,48,37,0.90)_0%,rgba(27,48,37,0.55)_60%,rgba(27,48,37,0.20)_100%)]" />
      {/* Top + bottom fade */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-g-dark/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-g-dark to-transparent" />

      {/* ── Noise texture ── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-screen-xl mx-auto w-full px-6 sm:px-10 lg:px-16 pt-28 pb-20">

        {/* Eyebrow */}
        <motion.div {...fadeIn(0.1)} className="flex items-center gap-3 mb-10">
          <div className="w-5 h-px bg-g-mid shrink-0" />
          <span className="text-g-light text-[11px] font-bold tracking-[0.2em] uppercase">
            {t('eyebrow')}
          </span>
        </motion.div>

        {/* Headline */}
        <div className="mb-7">
          <h1 className="leading-[0.92] tracking-[-0.03em] text-[clamp(52px,8.5vw,128px)]">
            <span className="flex flex-wrap items-end gap-x-[0.18em]">
              {line1.map((word, i) => (
                <span key={i} className="word-clip">
                  <motion.span className="inline-block text-white" variants={wordVariant} initial="hidden" animate="visible" custom={i}>
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
            <span className="word-clip block">
              <motion.span className="inline-block text-g-light" variants={wordVariant} initial="hidden" animate="visible" custom={line1.length}>
                {line2}
              </motion.span>
            </span>
          </h1>
        </div>

        {/* Sub + CTAs */}
        <div className="max-w-[520px]">
          <motion.p {...fadeIn(0.9)} className="text-white/55 text-[16px] leading-[1.8] mb-10">
            {t('sub')}
          </motion.p>
          <motion.div {...fadeIn(1.1)} className="flex flex-wrap gap-3">
            <Button href="#portfolio" size="lg" variant="primary">{t('cta_primary')}</Button>
            <Button href={WHATSAPP} size="lg" variant="outline" target="_blank" rel="noopener noreferrer">{t('cta_secondary')}</Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div {...fadeIn(1.6)} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}
