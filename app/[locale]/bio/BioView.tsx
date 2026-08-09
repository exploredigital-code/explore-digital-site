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

type BioItem = { key: string; title: string; desc: string; badge?: string }

/* ─────────────────────────────── página ─────────────────────────────── */

export function BioView() {
  const t = useTranslations('bio')
  const locale = useLocale()
  const items = t.raw('items') as BioItem[]

  // Mês corrente no idioma do visitante — o card de reserva se atualiza sozinho
  // todo mês, sem precisar mexer nos arquivos de tradução.
  const month = new Intl.DateTimeFormat(locale, { month: 'long' }).format(new Date())
  // `items` vem de t.raw(), que não passa por ICU — a troca aqui é na mão.
  const withMonth = (s: string) => s.replace('{month}', month)

  /**
   * Link interno já sai marcado com a origem.
   *
   * Não há analytics instalado ainda, e o parâmetro não muda comportamento
   * nenhum: existe para que, quando entrar, o tráfego do link da bio do
   * Instagram já esteja separado do resto sem precisar mexer nesta página.
   *
   * O WhatsApp fica de fora de propósito. O `wa.me` só aceita `text`, e
   * pendurar um marcador ali sujaria a mensagem que a pessoa envia. A origem
   * já é identificável de outro jeito: a mensagem da agenda é exclusiva daqui.
   */
  const comOrigem = (caminho: string) => `${caminho}?origem=bio`

  const hrefFor = (key: string) => {
    switch (key) {
      case 'auditoria': return comOrigem(`/${locale}/consultoria`)
      case 'portfolio': return comOrigem(`/${locale}/portfolio`)
      case 'whatsapp': return WA_BASE + encodeURIComponent(t('wa_message_reserva', { month }))
      default: return comOrigem(`/${locale}`)
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
    <main className="min-h-[100dvh] bg-verde relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_0%,#2D5238,transparent_65%)] opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_100%,#2A4233,transparent_70%)] opacity-50 pointer-events-none" />
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
          <span className="text-[13px] font-semibold tracking-wide text-verde-luz">{t('handle')}</span>
          <p className="text-[14.5px] leading-[1.55] text-menta-fraca mt-2.5 max-w-[300px]">{t('tagline')}</p>
        </motion.div>

        {/* ── links ──
            Lista simples, não cards de site em miniatura. Sem ícone: lupa,
            quadradinho e calendário são genéricos, não distinguem um item do
            outro e comem largura numa tela de 390px.

            O primeiro tem destaque, mas por borda e não por preenchimento
            laranja: cheio, ele pesava tanto que os outros dois pareciam
            desativados. Os três precisam parecer clicáveis. */}
        <nav className="flex flex-col gap-2.5">
          {items.map((item, i) => {
            const destaque = item.key === 'auditoria'
            const href = hrefFor(item.key)
            const externo = href.startsWith('http')

            const conteudo = (
              <>
                <span className="flex-1 min-w-0">
                  <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span className="text-[16px] font-bold leading-tight text-menta">
                      {withMonth(item.title)}
                    </span>
                    {item.badge && (
                      <span className="shrink-0 rounded-full bg-verde/60 px-2.5 py-[3px] text-[10px] font-semibold uppercase tracking-[0.06em] text-verde-luz">
                        {withMonth(item.badge)}
                      </span>
                    )}
                  </span>
                  {item.desc && (
                    <span className="block text-[13px] leading-snug text-menta-fraca mt-1">
                      {item.desc}
                    </span>
                  )}
                </span>
              </>
            )

            const classe = cn(
              'group flex items-center w-full rounded-2xl px-5 py-4 min-h-[64px]',
              'border transition-all duration-200 active:scale-[0.985]',
              destaque
                ? 'bg-sol/[0.14] border-sol/55 hover:bg-sol/20 hover:border-sol'
                : 'bg-white/[0.06] border-white/[0.14] hover:bg-white/[0.11] hover:border-white/30'
            )

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.12 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
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
                className="w-11 h-11 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-menta-fraca hover:text-menta hover:bg-white/[0.1] hover:border-white/25 active:scale-95 transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <p className="text-[11.5px] text-menta-fraca tracking-wide text-center">
            © {new Date().getFullYear()} Explore Digital · {t('rights')}
          </p>
        </motion.div>
      </div>
    </main>
  )
}
