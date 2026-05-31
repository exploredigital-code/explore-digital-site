'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'

const WHATSAPP = 'https://wa.me/5585910430670'
const VIMEO_ID = '1197034435'

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
  const line2 = t('line2').split(' ')

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-g-dark"
    >
      {/* ── Mobile: gradient ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_60%_-10%,#2D5238,#0D1A12)] lg:hidden" />

      {/* ── Desktop: thumbnail instantâneo + Vimeo iframe ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
        {/* Primeiro frame — carrega instantaneamente do servidor */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-poster.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
        {/* iframe carrega por cima: quando o vídeo inicia, cobre a thumbnail */}
        <iframe
          src={`https://player.vimeo.com/video/${VIMEO_ID}?background=1&autoplay=1&loop=1&muted=1&byline=0&title=0&autopause=0`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 'max(100%, 177.78vh)', height: 'max(100%, 56.25vw)' }}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
        />
        {/* Overlay 30% */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* ── Noise texture ── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-screen-xl mx-auto w-full px-6 sm:px-10 lg:px-16 pt-20 sm:pt-28 pb-16 sm:pb-20 flex flex-col justify-center min-h-screen">

        {/* Headline */}
        <div className="mb-7">
          <h1 className="leading-[0.92] tracking-[-0.03em] text-[clamp(52px,8.5vw,128px)]">
            {/* Linha 1: todas as palavras em branco */}
            <span className="flex flex-wrap items-end gap-x-[0.18em]">
              {line1.map((word, i) => (
                <span key={i} className="word-clip">
                  <motion.span className="inline-block text-white" variants={wordVariant} initial="hidden" animate="visible" custom={i}>
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
            {/* Linha 2: palavras em branco, última em verde */}
            <span className="flex flex-wrap items-end gap-x-[0.18em]">
              {line2.map((word, i) => (
                <span key={i} className="word-clip">
                  <motion.span
                    className={`inline-block ${i === line2.length - 1 ? 'text-g-light' : 'text-white'}`}
                    variants={wordVariant}
                    initial="hidden"
                    animate="visible"
                    custom={line1.length + i}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* Sub + CTAs */}
        <div className="max-w-[520px]">
          <motion.p {...fadeIn(0.9)} className="text-white text-[16px] leading-[1.8] mb-10">
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
