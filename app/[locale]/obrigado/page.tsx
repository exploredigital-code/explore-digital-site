'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/sections/Navbar'
import { SkipLink } from '@/components/ui/SkipLink'
import { Footer } from '@/components/sections/Footer'

const WHATSAPP = 'https://wa.me/+5585991043067'

/** Mesma chave que o Contact.tsx grava ao enviar. */
const WA_STORAGE_KEY = 'explore_wa_pending'

const NOISE_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`

export default function ObrigadoPage() {
  const t = useTranslations('obrigado')
  const locale = useLocale()

  // O Contact abre o WhatsApp já com os dados. Se o navegador barrar o popup,
  // a aba não abre e o visitante fica sem saber: aqui o link é reoferecido com
  // exatamente a mesma mensagem.
  const [waUrl, setWaUrl] = useState(WHATSAPP)
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(WA_STORAGE_KEY)
      if (!raw) return
      const saved = JSON.parse(raw) as { url?: string; blocked?: boolean }
      if (saved.url) setWaUrl(saved.url)
      setBlocked(Boolean(saved.blocked))
      sessionStorage.removeItem(WA_STORAGE_KEY)
    } catch {
      /* storage indisponível: o link genérico continua valendo */
    }
  }, [])

  const steps = [
    { num: '01', label: t('step1_label'), desc: t('step1_desc') },
    { num: '02', label: t('step2_label'), desc: t('step2_desc') },
    { num: '03', label: t('step3_label'), desc: t('step3_desc') },
  ]

  return (
    <>
      <SkipLink />
      <Navbar />

      <main id="conteudo" className="min-h-[calc(100vh-80px)] bg-g-dark flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,#2D5238,transparent_65%)] opacity-45 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: NOISE_BG, backgroundSize: '200px' }} />

        <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            {/* Check icon */}
            <div className="w-20 h-20 rounded-full bg-g-mid/20 border border-g-mid/30 flex items-center justify-center mb-8">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C1D5BD" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-light/40 mb-4">
              {t('eyebrow')}
            </div>

            <h1 className="text-[clamp(36px,5vw,64px)] font-bold leading-[1.0] tracking-[-0.03em] text-white mb-6 max-w-[580px]">
              {t('title')}
            </h1>

            <p className="text-white/50 text-[17px] leading-[1.75] max-w-[480px] mb-12">
              {t('desc')}
            </p>

            {blocked && (
              <p className="text-[13.5px] text-sol mb-6 max-w-[420px]">{t('wa_blocked')}</p>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-sol text-verde font-bold px-7 py-4 rounded-full hover:bg-sol-forte hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t('wa_button')}
              </a>
              <Link
                href={`/${locale}`}
                className="inline-flex items-center gap-2 text-white/60 hover:text-white font-medium px-7 py-4 rounded-full border border-white/15 hover:border-white/30 transition-all duration-200"
              >
                ← {t('home_button')}
              </Link>
            </div>

            {/* Steps */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex flex-col gap-2 p-5 rounded-2xl bg-white/[0.04] border border-white/[0.07] text-left"
                >
                  <span className="text-[11px] font-bold tracking-[0.15em] text-g-mid/60">{step.num}</span>
                  <span className="text-[14px] font-bold text-white">{step.label}</span>
                  <span className="text-[13px] text-white/40 leading-[1.6]">{step.desc}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  )
}
