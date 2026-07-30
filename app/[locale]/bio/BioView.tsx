'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const WA_BASE = 'https://wa.me/+5585991043067?text='
const EMAIL = 'agencia.exploredigital@gmail.com'
const INSTAGRAM = 'https://instagram.com/somosexplore'
const LINKEDIN = 'https://linkedin.com/company/explore-digital'

const NOISE_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`

type BioItem = { key: string; title: string; desc: string }

/* ────────────────────────────── ícones ────────────────────────────── */

// Todos com o mesmo peso de traço e enquadramento, herdando a cor do contêiner
// (paleta Explore) — nenhum usa cor de marca externa.
const strokeProps = {
  width: 21,
  height: 21,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

const icons: Record<string, React.ReactNode> = {
  // lupa com mini gráfico dentro = diagnóstico
  consultoria: (
    <svg {...strokeProps}>
      <circle cx="10.5" cy="10.5" r="6.75" />
      <path d="M15.4 15.4L20.5 20.5" />
      <path d="M8.2 12.3v-1.6M10.5 12.3V9.2M12.8 12.3V7.9" />
    </svg>
  ),
  // balão de conversa com as ondas do telefone
  whatsapp: (
    <svg {...strokeProps}>
      <path d="M3.4 20.6l1.3-4a8.4 8.4 0 113.1 3.1l-4.4.9z" />
      <path d="M9.2 9.1c-.3.9.05 1.9.75 2.75.7.85 1.65 1.4 2.6 1.5.5.05.9-.25 1.15-.7l1.4.85c-.3.75-1 1.3-1.85 1.35-2.1.15-4.6-2.05-5.15-4.1-.2-.8.15-1.6.8-2.05l.9 1.4z" />
    </svg>
  ),
  // globo
  site: (
    <svg {...strokeProps}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.15 2.4 3.35 5.35 3.35 8.5S14.15 18.1 12 20.5C9.85 18.1 8.65 15.15 8.65 12S9.85 5.9 12 3.5z" />
    </svg>
  ),
  // maleta
  vagas: (
    <svg {...strokeProps}>
      <rect x="3" y="7.4" width="18" height="12.6" rx="2.4" />
      <path d="M8.6 7.4V6a2.4 2.4 0 012.4-2.4h2a2.4 2.4 0 012.4 2.4v1.4" />
      <path d="M3 12.6h18" />
    </svg>
  ),
}

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  )
}

/* ─────────────────────────────── página ─────────────────────────────── */

export function BioView() {
  const t = useTranslations('bio')
  const locale = useLocale()
  const items = t.raw('items') as BioItem[]

  const hrefFor = (key: string) => {
    switch (key) {
      case 'consultoria': return `/${locale}/consultoria`
      case 'whatsapp': return WA_BASE + encodeURIComponent(t('wa_message'))
      case 'site': return `/${locale}`
      case 'vagas': return `/${locale}/vagas`
      default: return `/${locale}`
    }
  }

  const socials = [
    { href: INSTAGRAM, label: 'Instagram', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ) },
    { href: LINKEDIN, label: 'LinkedIn', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M4.98 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95C21.4 8.75 22 11 22 14.1V21h-4v-6.1c0-1.45-.03-3.32-2.05-3.32-2.05 0-2.37 1.58-2.37 3.21V21h-3.6z" />
      </svg>
    ) },
    { href: `mailto:${EMAIL}`, label: 'E-mail', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
        <polyline points="3,6 12,13 21,6" />
      </svg>
    ) },
  ]

  return (
    <main className="min-h-[100dvh] bg-g-dark relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_0%,#2D5238,transparent_65%)] opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_100%,#243D2D,transparent_70%)] opacity-50 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: NOISE_BG, backgroundSize: '200px' }} />

      <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-[480px] mx-auto px-5 py-7 sm:py-12">

        {/* ── topo ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center mb-7"
        >
          <Image
            src="/images/logo.png"
            alt="Explore Digital"
            width={220}
            height={56}
            priority
            className="h-[46px] w-auto mb-4"
          />
          <span className="text-[13px] font-semibold tracking-wide text-g-light/60">{t('handle')}</span>
          <p className="text-[14.5px] leading-[1.55] text-white/60 mt-2.5 max-w-[300px]">{t('tagline')}</p>
        </motion.div>

        {/* ── links ── */}
        <nav className="flex flex-col gap-2">
          {items.map((item, i) => {
            const destaque = item.key === 'consultoria'
            const href = hrefFor(item.key)
            const externo = href.startsWith('http')

            const conteudo = (
              <>
                <span
                  className={cn(
                    'w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-colors duration-200',
                    destaque
                      ? 'bg-g-dark/10 text-g-dark'
                      : 'bg-g-mid/20 text-g-light group-hover:bg-g-mid/30'
                  )}
                >
                  {icons[item.key]}
                </span>

                <span className="flex-1 min-w-0 text-left">
                  <span className={cn('block text-[15.5px] font-bold leading-tight', destaque ? 'text-g-dark' : 'text-white')}>
                    {item.title}
                  </span>
                  <span className={cn('block text-[12.5px] leading-snug mt-0.5', destaque ? 'text-g-dark/60' : 'text-white/45')}>
                    {item.desc}
                  </span>
                </span>

                <span className={cn('shrink-0 transition-transform duration-200 group-hover:translate-x-1', destaque ? 'text-g-dark/50' : 'text-white/30')}>
                  <ArrowIcon />
                </span>
              </>
            )

            const classe = cn(
              'group flex items-center gap-3.5 w-full rounded-2xl px-4 py-3.5 min-h-[68px]',
              'border transition-all duration-200 active:scale-[0.985]',
              destaque
                ? 'bg-g-light border-g-light hover:bg-g-pale shadow-[0_6px_24px_rgba(193,213,189,0.16)]'
                : 'bg-white/[0.05] border-white/[0.1] hover:bg-white/[0.09] hover:border-white/25'
            )

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: 0.12 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                {externo ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className={classe}>
                    {conteudo}
                  </a>
                ) : (
                  <Link href={href} className={classe}>
                    {conteudo}
                  </Link>
                )}
              </motion.div>
            )
          })}
        </nav>

        {/* ── rodapé ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-col items-center gap-3.5 mt-7"
        >
          <div className="flex items-center gap-2">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={s.label}
                className="w-11 h-11 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.1] hover:border-white/25 active:scale-95 transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <p className="text-[11.5px] text-white/25 tracking-wide text-center">
            © {new Date().getFullYear()} Explore Digital · {t('rights')}
          </p>
        </motion.div>
      </div>
    </main>
  )
}
