'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { OptionGroup } from '@/components/ui/OptionGroup'
import { AnimateIn, AnimateStagger, itemVariants } from '@/components/ui/AnimateIn'

const WA_BASE = 'https://wa.me/+5585991043067?text='
const FORMSPREE = 'https://formspree.io/f/mlgkrjng'
const EMAIL = 'agencia.exploredigital@gmail.com'
const WA_STORAGE_KEY = 'ed_consultoria_wa'

const NOISE_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`

type Item = { title: string; desc: string }
type NumItem = { num: string; title: string; desc: string }
type Cred = { value: string; label: string }
type Faq = { q: string; a: string }

const scrollToForm = () =>
  document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

/* ────────────────────────────── ícones ────────────────────────────── */

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={className} aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  )
}

/* ─────────────────────────── header enxuto ─────────────────────────── */

function LpHeader() {
  const t = useTranslations('consultoria')
  const locale = useLocale()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'flex items-center justify-between px-6 lg:px-14 h-[68px]',
        scrolled ? 'bg-g-dark/95 backdrop-blur-md border-b border-white/[0.06]' : 'bg-transparent'
      )}
    >
      <Link href={`/${locale}`} className="flex items-center shrink-0" aria-label="Explore Digital">
        <Image src="/images/logo.png" alt="Explore Digital" width={182} height={46} className="h-[38px] w-auto" priority />
      </Link>

      <div className="flex items-center gap-5">
        <Link href={`/${locale}`} className="hidden sm:block text-[13px] text-white/45 hover:text-white/80 transition-colors">
          {t('nav_site')}
        </Link>
        {/* no mobile o formulário já está no topo e a barra fixa assume o CTA */}
        <button
          onClick={scrollToForm}
          className="hidden sm:inline-flex items-center gap-2 whitespace-nowrap bg-g-light text-g-dark font-bold px-5 py-2.5 text-[13px] rounded-full hover:bg-g-pale hover:-translate-y-0.5 transition-all duration-200"
        >
          {t('nav_cta')}
        </button>
      </div>
    </header>
  )
}

/* ──────────────────────── barra fixa no mobile ──────────────────────── */

function StickyBar() {
  const t = useTranslations('consultoria')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 900)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden p-3 bg-g-dark/95 backdrop-blur-md border-t border-white/10"
        >
          <button
            onClick={scrollToForm}
            className="w-full bg-g-light text-g-dark font-bold py-3.5 rounded-full text-[15px] active:scale-[0.98] transition-transform"
          >
            {t('sticky_cta')}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ───────────────────────────── formulário ───────────────────────────── */

const inputClass = cn(
  'w-full px-4 py-3 rounded-xl',
  'bg-white border border-g-dark/12',
  'text-[15px] text-g-dark placeholder:text-g-dark/40',
  'focus:outline-none focus:border-g-mid/60 focus:ring-2 focus:ring-g-mid/10',
  'transition-all duration-200'
)

const labelClass = 'block text-[11px] font-bold tracking-[0.12em] uppercase text-g-dark/45 mb-2'

const emptyForm = {
  type: '',
  business: '',
  city: '',
  size: '',
  challenge: '',
  adspend: '',
  instagram: '',
  site: '',
  name: '',
  phone: '',
  email: '',
  time: '',
}

function ConsultForm() {
  const t = useTranslations('consultoria')
  const locale = useLocale()
  const router = useRouter()

  const BUSINESS_TYPES = t.raw('business_types') as string[]
  const SIZES = t.raw('size_options') as string[]
  const CHALLENGES = t.raw('challenges') as string[]
  const ADSPEND = t.raw('adspend_options') as string[]
  const TIMES = t.raw('time_options') as string[]
  const LABELS = t.raw('wa_labels') as Record<string, string>

  const [step, setStep] = useState(1)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const set = (key: keyof typeof emptyForm, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
    if (error) setError('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    set(e.target.name as keyof typeof emptyForm, e.target.value)

  // O campo já mostra o "@" fixo — se a pessoa colar o perfil inteiro ou digitar
  // outro @, limpamos para sobrar só o usuário.
  const handleInstagram = (e: React.ChangeEvent<HTMLInputElement>) =>
    set('instagram', e.target.value
      .replace(/^\s*(https?:\/\/)?(www\.)?instagram\.com\//i, '')
      .replace(/^@+/, '')
      .replace(/\s/g, '')
      .replace(/\/+$/, ''))

  const validate = (target: number) => {
    if (target === 1 && (!form.type || !form.business.trim())) return t('err_required')
    if (target === 2 && (!form.challenge || !form.instagram.trim())) return t('err_required')
    if (target === 3) {
      if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) return t('err_required')
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return t('err_email')
    }
    return ''
  }

  const goNext = () => {
    const message = validate(step)
    if (message) {
      setError(message)
      return
    }
    setError('')
    setStep(s => s + 1)
  }

  const buildWaMessage = () => {
    // `null` = campo opcional vazio (some da mensagem);
    // `''` = linha em branco proposital, separando os blocos.
    const optional = (label: string, value: string) => (value.trim() ? `*${label}:* ${value.trim()}` : null)

    const lines: (string | null)[] = [
      `*${t('wa_header')}*`,
      '',
      `*${LABELS.name}:* ${form.name.trim()}`,
      `*${LABELS.phone}:* ${form.phone.trim()}`,
      `*${LABELS.email}:* ${form.email.trim()}`,
      optional(LABELS.time, form.time),
      '',
      `*${LABELS.type}:* ${form.type}`,
      `*${LABELS.business}:* ${form.business.trim()}`,
      optional(LABELS.city, form.city),
      optional(LABELS.size, form.size),
      '',
      `*${LABELS.challenge}:* ${form.challenge}`,
      optional(LABELS.adspend, form.adspend),
      `*${LABELS.instagram}:* instagram.com/${form.instagram.trim()}`,
      optional(LABELS.site, form.site),
      '',
      `_${t('wa_footer')}_`,
    ]
    return lines.filter(line => line !== null).join('\n')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (sending) return

    if (step < 3) {
      goNext()
      return
    }

    const message = validate(3)
    if (message) {
      setError(message)
      return
    }

    setSending(true)
    const waMessage = buildWaMessage()
    const waUrl = WA_BASE + encodeURIComponent(waMessage)

    // 1. abre o WhatsApp ainda dentro do gesto do usuário — depois de um await
    //    o navegador trata como popup e bloqueia.
    const waTab = window.open(waUrl, '_blank')
    if (waTab) waTab.opener = null

    // 2. guarda link e texto puro — a página de obrigado reabre o WhatsApp se foi
    //    bloqueado e monta o mesmo conteúdo em e-mail para quem preferir
    try {
      sessionStorage.setItem(WA_STORAGE_KEY, JSON.stringify({ url: waUrl, message: waMessage, blocked: !waTab }))
    } catch {
      /* modo privado / storage indisponível */
    }

    // 3. registra o lead por e-mail — keepalive sobrevive à navegação seguinte
    fetch(FORMSPREE, {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...form,
        _subject: `Consultoria gratuita — ${form.name} · ${form.business || form.type}`,
      }),
    }).catch(() => {
      /* o lead já seguiu pelo WhatsApp */
    })

    router.push(`/${locale}/consultoria/obrigado`)
  }

  const stepLabel = t('form_step_of', { current: step, total: 3 })

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-[20px] border border-g-dark/8 shadow-[0_20px_60px_rgba(0,0,0,0.28)] p-6 sm:p-7"
    >
      {/* progresso */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-g-mid">{stepLabel}</span>
          <span className="text-[11px] text-g-dark/35">{step === 3 ? '~30s' : '~2min'}</span>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-1 flex-1 rounded-full bg-g-dark/10 overflow-hidden">
              <motion.div
                className="h-full bg-g-mid rounded-full"
                initial={false}
                animate={{ width: i <= step ? '100%' : '0%' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.22 }}
          className="flex flex-col gap-5"
        >
          <div>
            <h3 className="text-[20px] font-bold text-g-dark leading-tight">{t(`s${step}_title`)}</h3>
            <p className="text-[13px] text-g-dark/50 mt-1">{t(`s${step}_sub`)}</p>
          </div>

          {step === 1 && (
            <>
              <div>
                <label className={labelClass}>{t('f_type')} *</label>
                <OptionGroup name="tipo" label={t('f_type')} options={BUSINESS_TYPES} value={form.type} onSelect={v => set('type', v)} />
              </div>
              <div>
                <label className={labelClass} htmlFor="business">{t('f_business')} *</label>
                <input id="business" name="business" value={form.business} onChange={handleChange} placeholder={t('f_business_ph')} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="city">{t('f_city')}</label>
                <input id="city" name="city" value={form.city} onChange={handleChange} placeholder={t('f_city_ph')} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="size">{t('f_size')}</label>
                <select
                  id="size"
                  value={form.size}
                  onChange={e => set('size', e.target.value)}
                  className={cn(inputClass, 'cursor-pointer', !form.size && 'text-g-dark/40')}
                >
                  <option value="">{t('f_select')}</option>
                  {SIZES.map(s => <option key={s} value={s} className="text-g-dark">{s}</option>)}
                </select>
                <p className="text-[11px] text-g-dark/45 leading-relaxed mt-1.5">{t('f_size_note')}</p>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className={labelClass}>{t('f_challenge')} *</label>
                <OptionGroup name="desafio" label={t('f_challenge')} options={CHALLENGES} value={form.challenge} onSelect={v => set('challenge', v)} columns={1} />
              </div>
              <div>
                <label className={labelClass}>{t('f_adspend')}</label>
                <OptionGroup name="verba" label={t('f_adspend')} options={ADSPEND} value={form.adspend} onSelect={v => set('adspend', v)} />
              </div>
              <div>
                <label className={labelClass} htmlFor="instagram">{t('f_instagram')} *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px] font-medium text-g-dark/45 pointer-events-none select-none">@</span>
                  <input
                    id="instagram"
                    name="instagram"
                    value={form.instagram}
                    onChange={handleInstagram}
                    placeholder={t('f_instagram_ph')}
                    className={cn(inputClass, 'pl-9')}
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass} htmlFor="site">{t('f_site')}</label>
                <input
                  id="site"
                  name="site"
                  value={form.site}
                  onChange={handleChange}
                  placeholder={t('f_site_ph')}
                  className={inputClass}
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                />
                <p className="text-[11px] text-g-dark/45 leading-relaxed mt-1.5">{t('f_site_note')}</p>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className={labelClass} htmlFor="name">{t('f_name')} *</label>
                <input id="name" name="name" value={form.name} onChange={handleChange} placeholder={t('f_name_ph')} className={inputClass} autoComplete="name" />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} htmlFor="phone">{t('f_phone')} *</label>
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder={t('f_phone_ph')} className={inputClass} autoComplete="tel" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="email">{t('f_email')} *</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder={t('f_email_ph')} className={inputClass} autoComplete="email" />
                </div>
              </div>
              <div>
                <label className={labelClass}>{t('f_time')}</label>
                <div className="grid grid-cols-3 gap-2">
                  {TIMES.map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => set('time', opt)}
                      aria-pressed={form.time === opt}
                      className={cn(
                        'px-3 py-2.5 rounded-xl border text-[13px] transition-all duration-200',
                        form.time === opt
                          ? 'bg-g-dark border-g-dark text-white font-semibold'
                          : 'bg-white border-g-dark/12 text-g-dark/70 hover:border-g-mid/50'
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {error && <p className="text-[13px] text-red-500 mt-4">{error}</p>}

      {/* ações */}
      <div className="flex items-center gap-3 mt-6">
        {step > 1 && (
          <button
            type="button"
            onClick={() => { setError(''); setStep(s => s - 1) }}
            className="px-5 py-3.5 rounded-full text-[14px] font-semibold text-g-dark/55 border border-g-dark/12 hover:text-g-dark hover:border-g-dark/30 transition-all duration-200"
          >
            {t('btn_back')}
          </button>
        )}
        <button
          type="submit"
          disabled={sending}
          className={cn(
            'flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-bold transition-all duration-200',
            step === 3
              ? 'bg-sol text-verde hover:bg-sol-forte hover:shadow-[0_8px_24px_rgba(226,118,47,0.3)]'
              : 'bg-g-dark text-g-pale hover:bg-s2 hover:shadow-[0_8px_28px_rgba(27,48,37,0.18)]',
            'hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0'
          )}
        >
          {step === 3 ? (
            sending ? t('btn_sending') : <><WhatsAppIcon size={18} />{t('btn_submit')}</>
          ) : (
            <>{t('btn_next')}<ArrowIcon /></>
          )}
        </button>
      </div>

      <p className="text-[11px] text-g-dark/35 leading-relaxed mt-4 text-center">{t('form_disclaimer')}</p>
    </form>
  )
}

/* ───────────────────────────────  FAQ  ─────────────────────────────── */

function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} className="bg-white rounded-2xl border border-g-dark/8 overflow-hidden">
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
          >
            <span className="text-[15px] sm:text-[16px] font-semibold text-g-dark">{item.q}</span>
            <span className={cn('shrink-0 text-g-mid transition-transform duration-300', open === i && 'rotate-45')}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M9 3v12M3 9h12" />
              </svg>
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-5 text-[14px] leading-[1.75] text-g-dark/60">{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

/* ───────────────────────── para quem é (lista) ───────────────────────── */

function Chevron({ open }: { open: boolean }) {
  return (
    <span className={cn('shrink-0 transition-transform duration-300', open && 'rotate-180')}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 6l4 4 4-4" />
      </svg>
    </span>
  )
}

function AudienceList({
  items,
  notForTitle,
  notForItems,
  notForNote,
}: {
  items: Item[]
  notForTitle: string
  notForItems: string[]
  notForNote: string
}) {
  // O último índice é sempre o bloco "para quem não é".
  const notForIndex = items.length
  const [open, setOpen] = useState<number | null>(0)

  const row = (i: number, dark: boolean, title: string, body: React.ReactNode) => {
    const isOpen = open === i
    return (
      <div key={i} className={cn(dark ? 'bg-g-dark' : 'bg-white')}>
        <button
          type="button"
          onClick={() => setOpen(isOpen ? null : i)}
          aria-expanded={isOpen}
          className={cn(
            'w-full flex items-center gap-4 text-left px-5 sm:px-7 py-5 transition-colors duration-200',
            dark ? 'text-white hover:bg-white/[0.04]' : 'text-g-dark hover:bg-g-pale/40'
          )}
        >
          <span
            className={cn(
              'w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-[11px] font-bold',
              dark ? 'bg-white/10 text-white/60' : 'bg-g-mid/12 text-g-mid'
            )}
          >
            {dark ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <CheckIcon />
            )}
          </span>

          <span className={cn('flex-1 text-[15.5px] sm:text-[17px] font-bold leading-snug', dark && 'text-white')}>
            {title}
          </span>

          <span className={dark ? 'text-white/40' : 'text-g-mid'}>
            <Chevron open={isOpen} />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="overflow-hidden"
            >
              <div className="px-5 sm:px-7 pb-5 pl-[68px] sm:pl-[76px]">{body}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-g-dark/8 overflow-hidden divide-y divide-g-dark/8 shadow-[0_1px_2px_rgba(27,48,37,0.04)]">
      {items.map((a, i) =>
        row(i, false, a.title, <p className="text-[14px] leading-[1.75] text-g-dark/60">{a.desc}</p>)
      )}

      {row(
        notForIndex,
        true,
        notForTitle,
        <>
          <ul className="flex flex-col gap-2.5">
            {notForItems.map(n => (
              <li key={n} className="flex items-start gap-2.5 text-[14px] leading-[1.65] text-white/55">
                <span className="text-white/25 mt-1 shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden>
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </span>
                {n}
              </li>
            ))}
          </ul>
          <p className="text-[12.5px] text-g-light/45 leading-relaxed mt-4 pt-4 border-t border-white/10">{notForNote}</p>
        </>
      )}
    </div>
  )
}

/* ────────────────────────────── página ────────────────────────────── */

export function ConsultoriaView() {
  const t = useTranslations('consultoria')
  const locale = useLocale()

  const HERO_BULLETS = t.raw('hero_bullets') as string[]
  const CRED = t.raw('cred_items') as Cred[]
  const PAINS = t.raw('pain_items') as Item[]
  const DELIVER = t.raw('deliver_items') as NumItem[]
  const AUDIENCE = t.raw('audience_items') as Item[]
  const NOTFOR = t.raw('notfor_items') as string[]
  const HOW = t.raw('how_items') as NumItem[]
  const BADGES = t.raw('free_badges') as string[]
  const FAQ = t.raw('faq_items') as Faq[]
  const TRUST = t.raw('trust') as string[]

  return (
    <>
      <LpHeader />
      <StickyBar />

      {/* ───────── HERO + FORMULÁRIO ───────── */}
      <section id="formulario" className="page-hero relative overflow-hidden pt-28 lg:pt-32 pb-16 lg:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_0%,#2D5238,transparent_65%)] opacity-55 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: NOISE_BG, backgroundSize: '200px' }} />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* No mobile a ordem é: promessa → formulário → provas.
              No desktop as provas voltam para a coluna da esquerda, sob o texto. */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-10 lg:gap-x-16 lg:gap-y-8 items-start">

            <AnimateIn className="lg:pt-6 lg:col-start-1 lg:row-start-1">
              <div className="inline-flex items-center gap-2.5 bg-g-mid/15 border border-g-mid/25 rounded-full pl-2.5 pr-4 py-1.5 mb-7">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-g-light opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-g-light" />
                </span>
                <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-g-light">{t('hero_badge')}</span>
              </div>

              <h1 className="text-[clamp(32px,5.2vw,66px)] leading-[0.98] tracking-[-0.03em] text-white mb-5">
                {t('hero_title')}<br />
                <span className="text-g-light/55">{t('hero_title_accent')}</span>
              </h1>

              <p className="text-white/55 text-[15.5px] sm:text-[17px] leading-[1.7] max-w-[540px]">
                {t('hero_sub')}
              </p>
            </AnimateIn>

            <AnimateIn delay={0.12} y={28} className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <ConsultForm />
            </AnimateIn>

            <AnimateIn delay={0.06} className="lg:col-start-1 lg:row-start-2">
              <ul className="flex flex-col gap-3">
                {HERO_BULLETS.map(b => (
                  <li key={b} className="flex items-center gap-3 text-[15px] text-white/75">
                    <span className="w-5 h-5 rounded-full bg-g-mid/30 border border-g-mid/40 flex items-center justify-center text-g-light shrink-0">
                      <CheckIcon />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="hidden lg:flex items-center gap-3 text-white/30 text-[12px] mt-10">
                <div className="w-8 h-px bg-white/15" />
                {t('hero_scroll')}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ───────── FAIXA DE CREDIBILIDADE ───────── */}
      <section className="bg-s2 border-y border-white/[0.06] py-8">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {CRED.map(c => (
              <div key={c.label} className="flex flex-col gap-1">
                <span className="text-[26px] lg:text-[32px] font-bold text-g-light leading-none tracking-tight">{c.value}</span>
                <span className="text-[12px] text-white/40 leading-snug">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── O PROBLEMA ───────── */}
      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateIn className="max-w-[640px] mb-10 sm:mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-g-mid" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-mid">{t('pain_eyebrow')}</span>
            </div>
            <h2 className="text-[clamp(28px,4vw,50px)] leading-[1.05] tracking-[-0.02em] text-g-dark mb-5">{t('pain_title')}</h2>
            <p className="text-g-dark/55 text-[16px] leading-[1.75]">{t('pain_sub')}</p>
          </AnimateIn>

          <AnimateStagger className="grid md:grid-cols-3 gap-5">
            {PAINS.map((p, i) => (
              <motion.div key={p.title} variants={itemVariants} className="flex flex-col gap-3 p-6 rounded-2xl bg-g-pale/60 border border-g-dark/8">
                <span className="text-[13px] font-bold text-g-mid/70">0{i + 1}</span>
                <h3 className="text-[19px] font-bold text-g-dark leading-snug">{p.title}</h3>
                <p className="text-[14px] leading-[1.7] text-g-dark/55">{p.desc}</p>
              </motion.div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* ───────── O QUE VOCÊ RECEBE ───────── */}
      <section className="bg-g-dark relative overflow-hidden py-14 sm:py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_10%,#2D5238,transparent_65%)] opacity-40 pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateIn className="max-w-[680px] mb-10 sm:mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-g-light" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-light">{t('deliver_eyebrow')}</span>
            </div>
            <h2 className="text-[clamp(28px,4vw,50px)] leading-[1.05] tracking-[-0.02em] text-white mb-5">{t('deliver_title')}</h2>
            <p className="text-white/50 text-[16px] leading-[1.75]">{t('deliver_sub')}</p>
          </AnimateIn>

          <AnimateStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DELIVER.map(d => (
              <motion.div
                key={d.num}
                variants={itemVariants}
                className="flex flex-col gap-3 p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-g-mid/40 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-g-mid/25 border border-g-mid/40 flex items-center justify-center text-[12px] font-bold text-g-light">
                    {d.num}
                  </span>
                </div>
                <h3 className="text-[20px] font-bold text-white leading-snug">{d.title}</h3>
                <p className="text-[14px] leading-[1.75] text-white/50">{d.desc}</p>
              </motion.div>
            ))}
          </AnimateStagger>

          <AnimateIn delay={0.1} className="mt-12 lg:mt-14 flex flex-col items-center">
            <button
              onClick={scrollToForm}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-g-light text-g-dark font-bold px-8 py-4 rounded-full text-[15px] hover:bg-g-pale hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(193,213,189,0.25)] active:scale-[0.98] transition-all duration-200"
            >
              {t('final_cta')}
              <ArrowIcon />
            </button>
            <p className="text-[12.5px] text-white/35 mt-4">{t('final_note')}</p>
          </AnimateIn>
        </div>
      </section>

      {/* ───────── PARA QUEM É ───────── */}
      <section className="bg-g-pale py-14 sm:py-20 lg:py-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateIn className="max-w-[680px] mx-auto mb-10 sm:mb-14 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-5 h-px bg-g-mid" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-mid">{t('audience_eyebrow')}</span>
              <div className="w-5 h-px bg-g-mid" />
            </div>
            <h2 className="text-[clamp(28px,4vw,50px)] leading-[1.05] tracking-[-0.02em] text-g-dark mb-5">{t('audience_title')}</h2>
            <p className="text-g-dark/55 text-[16px] leading-[1.75]">{t('audience_sub')}</p>
          </AnimateIn>

          <AnimateIn delay={0.08} className="max-w-[860px] mx-auto">
            <AudienceList
              items={AUDIENCE}
              notForTitle={t('notfor_title')}
              notForItems={NOTFOR}
              notForNote={t('notfor_note')}
            />
          </AnimateIn>
        </div>
      </section>

      {/* ───────── COMO FUNCIONA ───────── */}
      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateIn className="max-w-[560px] mb-10 sm:mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-g-mid" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-mid">{t('how_eyebrow')}</span>
            </div>
            <h2 className="text-[clamp(28px,4vw,50px)] leading-[1.05] tracking-[-0.02em] text-g-dark">{t('how_title')}</h2>
          </AnimateIn>

          {/* O trilho é desenhado passo a passo conforme a seção entra na tela:
              horizontal no desktop, vertical ligando os números no mobile. */}
          <div className="grid md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
            {HOW.map((s, i) => (
              <motion.div
                key={s.num}
                className="relative flex flex-col gap-4"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px 0px' }}
                transition={{ duration: 0.5, delay: i * 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                {i < HOW.length - 1 && (
                  <motion.div
                    aria-hidden
                    className="md:hidden absolute left-[21px] top-12 -bottom-10 w-px bg-g-mid/30 origin-top"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: '-80px 0px' }}
                    transition={{ duration: 0.5, delay: i * 0.22 + 0.3, ease: 'easeOut' }}
                  />
                )}

                <div className="flex items-center gap-4">
                  <motion.span
                    className="relative z-10 w-11 h-11 shrink-0 rounded-full border border-g-mid/30 bg-g-pale flex items-center justify-center text-[13px] font-bold text-g-mid"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-80px 0px' }}
                    transition={{ type: 'spring', stiffness: 280, damping: 18, delay: i * 0.22 }}
                  >
                    {s.num}
                  </motion.span>
                  <motion.div
                    aria-hidden
                    className="hidden md:block flex-1 h-px bg-g-mid/30 origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: '-80px 0px' }}
                    transition={{ duration: 0.55, delay: i * 0.22 + 0.18, ease: 'easeOut' }}
                  />
                </div>

                <h3 className="text-[19px] font-bold text-g-dark leading-snug">{s.title}</h3>
                <p className="text-[14px] leading-[1.7] text-g-dark/55">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── POR QUE É GRATUITA + PROVA ───────── */}
      <section className="bg-g-dark relative overflow-hidden py-14 sm:py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_0%_50%,#2D5238,transparent_60%)] opacity-35 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: NOISE_BG, backgroundSize: '200px' }} />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <AnimateIn>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-px bg-g-light" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-light">{t('free_eyebrow')}</span>
              </div>
              <h2 className="text-[clamp(28px,4vw,48px)] leading-[1.05] tracking-[-0.02em] text-white mb-6">{t('free_title')}</h2>
              <p className="text-white/55 text-[16px] leading-[1.8] mb-4">{t('free_body')}</p>
              <p className="text-white/55 text-[16px] leading-[1.8] mb-8">{t('free_body_2')}</p>

              <div className="flex flex-wrap gap-2.5">
                {BADGES.map(b => (
                  <span key={b} className="inline-flex items-center gap-2 text-[12.5px] text-g-light/80 bg-white/[0.05] border border-white/10 rounded-full px-4 py-2">
                    <CheckIcon className="text-g-mid" />
                    {b}
                  </span>
                ))}
              </div>
            </AnimateIn>

            <AnimateIn delay={0.12}>
              <div className="relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 lg:p-10">
                <span className="absolute top-6 left-8 text-[80px] leading-none font-display text-g-mid/25 select-none" aria-hidden>“</span>
                <div className="relative pt-10">
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-light/40">{t('proof_eyebrow')}</span>
                  <p className="text-[17px] lg:text-[19px] leading-[1.7] text-white/80 mt-4 mb-7">{t('proof_quote')}</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                    <div className="w-10 h-10 rounded-full bg-g-mid/25 border border-g-mid/35 flex items-center justify-center text-[14px] font-bold text-g-light">
                      {t('proof_author').charAt(0)}
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-white">{t('proof_author')}</div>
                      <div className="text-[12px] text-white/40">{t('proof_role')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="bg-g-pale py-14 sm:py-20 lg:py-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-[380px_1fr] gap-12 lg:gap-20 items-start">
            <AnimateIn className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-px bg-g-mid" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-mid">{t('faq_eyebrow')}</span>
              </div>
              <h2 className="text-[clamp(28px,3.5vw,44px)] leading-[1.05] tracking-[-0.02em] text-g-dark mb-6">{t('faq_title')}</h2>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 min-h-[44px] text-[14px] text-g-mid hover:text-g-dark font-semibold transition-colors"
              >
                {EMAIL}
              </a>
            </AnimateIn>

            <AnimateIn delay={0.1}>
              <FaqList items={FAQ} />
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ───────── CTA FINAL ───────── */}
      <section className="bg-g-dark relative overflow-hidden py-14 sm:py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_120%,#2D5238,transparent_65%)] opacity-50 pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateIn className="flex flex-col items-center text-center">
            <h2 className="text-[clamp(30px,4.5vw,56px)] leading-[1.02] tracking-[-0.03em] text-white max-w-[720px] mb-6">
              {t('final_title')}
            </h2>
            <p className="text-white/50 text-[16px] leading-[1.75] max-w-[520px] mb-10">{t('final_sub')}</p>

            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2.5 bg-g-light text-g-dark font-bold px-8 py-4 rounded-full text-[16px] hover:bg-g-pale hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(193,213,189,0.25)] transition-all duration-200"
            >
              {t('final_cta')}
              <ArrowIcon />
            </button>
            <p className="text-[12.5px] text-white/35 mt-5">{t('final_note')}</p>

            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl">
              {TRUST.map(item => (
                <div key={item} className="flex items-center justify-center gap-2 text-[12px] text-white/35">
                  <CheckIcon className="text-g-mid shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ───────── RODAPÉ MÍNIMO ───────── */}
      <footer className="bg-[#0D1A12] py-10 pb-24 lg:pb-10">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href={`/${locale}`} className="flex items-center min-h-[44px]" aria-label="Explore Digital">
            <Image src="/images/logo.png" alt="Explore Digital" width={140} height={36} className="h-[30px] w-auto opacity-70" />
          </Link>

          <div className="flex items-center gap-6 text-[12.5px] text-white/35">
            <a href={`mailto:${EMAIL}`} className="inline-flex items-center min-h-[44px] hover:text-white/70 transition-colors">{EMAIL}</a>
            <a
              href={WA_BASE + encodeURIComponent(t('nav_cta'))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 min-h-[44px] hover:text-sol transition-colors"
            >
              <WhatsAppIcon size={14} />
              WhatsApp
            </a>
          </div>

          <p className="text-[12px] text-white/25">© {new Date().getFullYear()} Explore Digital</p>
        </div>
      </footer>
    </>
  )
}
