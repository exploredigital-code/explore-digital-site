'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'

const WHATSAPP = 'https://wa.me/+5585991043067'

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
  const videoRef = useRef<HTMLVideoElement | null>(null)

  /* O autoplay declarativo continua sendo o caminho principal, e sem JS o
     vídeo toca do mesmo jeito. Isto aqui cobre os dois casos em que o Safari
     do iPhone não honra o atributo:

     · modo de baixo consumo, que bloqueia autoplay mesmo mudo — a promessa de
       play() é rejeitada, ficamos no poster, e tentamos de novo no primeiro
       toque, que é o gesto que libera a reprodução;
     · reduced-motion, onde o CSS esconde o vídeo mas o autoplay seguia
       decodificando atrás do display:none. Agora pausa de verdade. */
  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.pause()
      return
    }

    const tentar = () => {
      const p = el.play()
      if (p) p.catch(() => {})
    }

    tentar()
    document.addEventListener('touchstart', tentar, { once: true, passive: true })
    return () => document.removeEventListener('touchstart', tentar)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-g-dark"
    >
      {/* ── Base: gradient ──
          Pinta antes de qualquer byte de mídia chegar, em toda largura. Fica
          por baixo do poster e do vídeo, então é o que se vê no primeiro
          frame e o que sobra se a rede engasgar. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_60%_-10%,#2D5238,#0D1A12)]" />

      {/* ── Vídeo local ──
          Era um iframe do Vimeo: DNS, handshake TLS e o player inteiro antes do
          primeiro frame, tudo no caminho crítico da página mais visitada.
          Agora é um mp4 local em H.264 (2,6 MB, faststart, sem áudio), com o
          poster como primeiro frame. O HEVC de 16 MB que estava em public/
          nunca chegou a ser usado e não tocava de forma confiável em Firefox
          nem em parte dos Chrome.

          O contêiner era `hidden lg:block`, herdado da época do HEVC de 16 MB,
          e por isso o vídeo nunca existiu abaixo de 1024px: no iPhone não era
          autoplay bloqueado, era display:none. O arquivo atual já atende o que
          o Safari exige (playsinline + muted + autoplay, H.264 High@4.0 yuv420p,
          moov na frente do mdat), então basta deixar de escondê-lo. */}
      <div className="hero-media absolute inset-0 pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          className="hero-video absolute inset-0 h-full w-full object-cover"
          poster="/images/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Véu sobre o vídeo. Verde, não preto: nenhuma seção usa preto puro. */}
        <div className="absolute inset-0 bg-verde/45" />
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
