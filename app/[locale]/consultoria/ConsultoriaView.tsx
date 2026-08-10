'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { OptionGroup } from '@/components/ui/OptionGroup'
import { SkipLink } from '@/components/ui/SkipLink'
import { Button } from '@/components/ui/Button'
import { AnimateIn, AnimateStagger, itemVariants } from '@/components/ui/AnimateIn'

const WA_BASE = 'https://wa.me/+5585991043067?text='
const FORMSPREE = 'https://formspree.io/f/mlgkrjng'
const EMAIL = 'agencia.exploredigital@gmail.com'
const WA_STORAGE_KEY = 'ed_consultoria_wa'

const NOISE_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`

type NumItem = { num: string; title: string; desc: string }

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
        scrolled ? 'bg-verde/95 backdrop-blur-md border-b border-verde-linha' : 'bg-transparent'
      )}
    >
      <Link href={`/${locale}`} className="flex items-center shrink-0" aria-label="Explore Digital">
        <Logo priority className="h-[38px]" />
      </Link>

      <div className="flex items-center gap-5">
        <Link href={`/${locale}`} className="hidden sm:block text-[13px] text-menta-fraca hover:text-white/80 transition-colors">
          {t('nav_site')}
        </Link>
        {/* no mobile o formulário já está no topo e a barra fixa assume o CTA */}
        <Button
          variant="primary"
          size="sm"
          onClick={scrollToForm}
          className="hidden sm:inline-flex whitespace-nowrap font-bold"
        >
          {t('nav_cta')}
        </Button>
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
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden p-3 bg-verde/95 backdrop-blur-md border-t border-verde-linha"
        >
          <Button
            variant="primary"
            size="md"
            onClick={scrollToForm}
            className="w-full text-[15px] font-bold active:scale-[0.98]"
          >
            {t('sticky_cta')}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ───────────────────────────── formulário ───────────────────────────── */

const inputClass = cn(
  'w-full px-4 py-3 rounded-xl',
  'bg-white border border-tinta-16',
  'text-[15px] text-verde placeholder:text-tinta-70',
  'focus:outline-none focus:border-verde-medio focus:ring-2 focus:ring-verde-medio/15',
  'transition-all duration-200'
)

const labelClass = 'block text-[11px] font-bold tracking-[0.12em] uppercase text-tinta-70 mb-2'

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
    //    bloqueado e monta o mesmo conteúdo em e-mail para quem preferir.
    //
    //    `tipo` entrou para a tela de obrigado poder oferecer um case do mesmo
    //    segmento enquanto o relatório não sai. A alternativa era ela garimpar
    //    o segmento de dentro do texto da mensagem, que quebraria na primeira
    //    vez que alguém mexesse na copy do WhatsApp.
    try {
      sessionStorage.setItem(WA_STORAGE_KEY, JSON.stringify({ url: waUrl, message: waMessage, blocked: !waTab, tipo: form.type }))
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
      className="bg-white rounded-[20px] border border-tinta-16 shadow-[0_20px_60px_rgba(0,0,0,0.28)] p-6 sm:p-7"
    >
      {/* progresso */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-verde-medio">{stepLabel}</span>
          <span className="text-[11px] text-tinta-70">{step === 3 ? '~30s' : '~2min'}</span>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-1 flex-1 rounded-full bg-verde/12 overflow-hidden">
              <motion.div
                className="h-full bg-verde-medio rounded-full"
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
            {/* h2, não h3. O formulário fica dentro do herói, logo depois do
                h1, e um h3 ali criava o salto que o Lighthouse apontava. Como
                a classe carrega a aparência inteira, trocar a tag não muda um
                pixel. */}
            <h2 className="text-[20px] font-bold text-verde leading-tight">{t(`s${step}_title`)}</h2>
            <p className="text-[13px] text-tinta-70 mt-1">{t(`s${step}_sub`)}</p>
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
                  className={cn(inputClass, 'cursor-pointer', !form.size && 'text-tinta-70')}
                >
                  <option value="">{t('f_select')}</option>
                  {SIZES.map(s => <option key={s} value={s} className="text-verde">{s}</option>)}
                </select>
                <p className="text-[11px] text-tinta-70 leading-relaxed mt-1.5">{t('f_size_note')}</p>
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
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px] font-medium text-tinta-70 pointer-events-none select-none">@</span>
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
                <p className="text-[11px] text-tinta-70 leading-relaxed mt-1.5">{t('f_site_note')}</p>
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
                          ? 'bg-verde border-verde text-menta font-semibold'
                          : 'bg-white border-tinta-16 text-tinta-70 hover:border-verde-medio/50'
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
          <Button
            variant="outline-light"
            size="md"
            type="button"
            onClick={() => { setError(''); setStep(s => s - 1) }}
            className="px-5 py-3.5 text-[14px] font-semibold"
          >
            {t('btn_back')}
          </Button>
        )}
        {/* Continua sendo <button type="submit"> dentro do mesmo
            <form onSubmit={handleSubmit}>: o Button compartilhado repassa
            `type` e `disabled` e renderiza um <button> de verdade. O caminho
            do clique até o window.open não muda, que é o que garante a
            abertura do WhatsApp dentro do gesto do usuário.

            Passo 3 é laranja porque é a ação final. Antes disso o botão é
            verde cheio: o cartão do formulário é uma superfície CLARA, então
            a variante certa é `solid-light` e não `primary`. */}
        <Button
          type="submit"
          variant={step === 3 ? 'primary' : 'solid-light'}
          size="md"
          disabled={sending}
          className={cn(
            'flex-1 px-6 py-3.5 text-[15px] font-bold',
            step === 3
              ? 'hover:shadow-[0_8px_24px_rgba(226,118,47,0.3)]'
              : 'hover:shadow-[0_8px_28px_rgba(27,48,37,0.18)]'
          )}
        >
          {step === 3 ? (
            sending ? t('btn_sending') : <><WhatsAppIcon size={18} />{t('btn_submit')}</>
          ) : (
            <>{t('btn_next')}<ArrowIcon /></>
          )}
        </Button>
      </div>

      <p className="text-[11px] text-tinta-70 leading-relaxed mt-4 text-center">{t('form_disclaimer')}</p>
    </form>
  )
}

export function ConsultoriaView() {
  const t = useTranslations('consultoria')
  const locale = useLocale()

  const HERO_BULLETS = t.raw('hero_bullets') as string[]
  const RELATORIO = t.raw('relatorio_items') as NumItem[]
  const TRUST = t.raw('trust') as string[]

  return (
    <>
      <SkipLink />
      <LpHeader />
      <StickyBar />

      {/* O <main> abre no herói e fecha antes do rodapé. É o alvo do skip link
          e o marco que faltava: sem ele o leitor de tela não tinha como saltar
          o cabeçalho fixo e a barra de CTA. */}
      <main id="conteudo" tabIndex={-1}>

      {/* ───────── HERO + FORMULÁRIO ───────── */}
      <section id="formulario" className="page-hero relative overflow-hidden pt-28 lg:pt-32 pb-16 lg:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_0%,#2D5238,transparent_65%)] opacity-55 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: NOISE_BG, backgroundSize: '200px' }} />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* No mobile a ordem é: promessa → formulário → provas.
              No desktop as provas voltam para a coluna da esquerda, sob o texto. */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-10 lg:gap-x-16 lg:gap-y-8 items-start">

            <AnimateIn className="lg:pt-6 lg:col-start-1 lg:row-start-1">
              <div className="inline-flex items-center gap-2.5 bg-verde-luz/12 border border-verde-luz/25 rounded-full pl-2.5 pr-4 py-1.5 mb-7">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-verde-luz opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-verde-luz" />
                </span>
                <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-verde-luz">{t('hero_badge')}</span>
              </div>

              <h1 className="text-[clamp(32px,5.2vw,66px)] leading-[0.98] tracking-[-0.03em] text-white mb-5">
                {t('hero_title')}<br />
                <span className="text-verde-luz/75">{t('hero_title_accent')}</span>
              </h1>

              <p className="text-menta-fraca text-[15.5px] sm:text-[17px] leading-[1.7] max-w-[540px]">
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
                    <span className="w-5 h-5 rounded-full bg-verde-luz/15 border border-verde-luz/30 flex items-center justify-center text-verde-luz shrink-0">
                      <CheckIcon />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="hidden lg:flex items-center gap-3 text-menta-fraca text-[12px] mt-10">
                <div className="w-8 h-px bg-white/15" />
                {t('hero_scroll')}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ───────── O QUE O RELATÓRIO MOSTRA ───────── */}
      {/* Cada item e uma constatacao, nunca uma instrucao: o relatorio diz
          ONDE o negocio esta, e o que fazer e o produto pago. Se a copy aqui
          escorregar para "e aqui esta como resolver", ela canibaliza a
          /plano-de-acao. */}
      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateIn className="max-w-[640px] mb-10 sm:mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-verde-medio" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-medio">{t('relatorio_eyebrow')}</span>
            </div>
            <h2 className="text-[clamp(28px,4vw,50px)] leading-[1.05] tracking-[-0.02em] text-verde mb-5">{t('relatorio_title')}</h2>
            <p className="text-tinta-70 text-[16px] leading-[1.75]">{t('relatorio_sub')}</p>
          </AnimateIn>

          <AnimateStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {RELATORIO.map(item => (
              <motion.div key={item.title} variants={itemVariants} className="flex flex-col gap-3 p-6 rounded-2xl bg-menta-clara/60 border border-tinta-16">
                <span className="text-[13px] font-bold text-verde-medio">{item.num}</span>
                <h3 className="text-[19px] font-bold text-verde leading-snug">{item.title}</h3>
                <p className="text-[14px] leading-[1.7] text-tinta-70">{item.desc}</p>
              </motion.div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* ───────── SEM ATRITO ─────────
          A auditoria deixou de se diferenciar por velocidade. Promessa de
          prazo que falha uma vez custa mais que a urgencia que ela gera, e o
          que sobra sem ela nao pode ser "auditoria gratuita", que qualquer
          agencia oferece. O diferencial passa a ser nao exigir nada do
          visitante: sem reuniao, sem call de descoberta, sem compromisso. */}
      <section className="bg-verde relative overflow-hidden py-14 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_100%_0%,#2D5238,transparent_65%)] opacity-50 pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateIn className="max-w-[660px]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-verde-luz" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-luz">{t('atrito_eyebrow')}</span>
            </div>
            <h2 className="text-[clamp(28px,4vw,48px)] leading-[1.05] tracking-[-0.02em] text-menta mb-6">{t('atrito_title')}</h2>
            <p className="text-menta-fraca text-[16px] leading-[1.8] mb-4">{t('atrito_body')}</p>
            <p className="text-menta-fraca text-[16px] leading-[1.8]">{t('atrito_body_2')}</p>
          </AnimateIn>
        </div>
      </section>


      {/* ───────── CTA FINAL ───────── */}
      <section className="bg-verde relative overflow-hidden py-14 sm:py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_120%,#2D5238,transparent_65%)] opacity-50 pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateIn className="flex flex-col items-center text-center">
            <h2 className="text-[clamp(30px,4.5vw,56px)] leading-[1.02] tracking-[-0.03em] text-white max-w-[720px] mb-6">
              {t('final_title')}
            </h2>
            <p className="text-menta-fraca text-[16px] leading-[1.75] max-w-[520px] mb-10">{t('final_sub')}</p>

            <Button
              variant="primary"
              size="lg"
              onClick={scrollToForm}
              className="gap-2.5 text-[16px] font-bold hover:shadow-[0_8px_28px_rgba(226,118,47,0.28)]"
            >
              {t('final_cta')}
              <ArrowIcon />
            </Button>
            <p className="text-[12.5px] text-menta-fraca mt-5">{t('final_note')}</p>

            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl">
              {TRUST.map(item => (
                <div key={item} className="flex items-center justify-center gap-2 text-[12px] text-menta-fraca">
                  <CheckIcon className="text-verde-luz shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ───────── O PASSO SEGUINTE ─────────
          A /plano-de-acao estava ORFA: zero links entrantes nas 87 rotas do
          site, alcançável só pelo sitemap. Esta é a porta dela, e fica aqui
          porque as duas são etapas do mesmo funil, não produtos concorrentes.

          Depois do CTA final, e não antes, de propósito. Esta página existe
          para converter na auditoria, e uma oferta paga acima do CTA disputaria
          a conversão que ela veio buscar. Quem chegou até aqui já passou pelo
          botão.

          Link de texto e não botão, pelo mesmo motivo: o único botão desta
          página continua sendo o da auditoria.

          Fora daqui, o lugar natural seria a tela de obrigado, e ela NÃO
          recebe: o comentário de lá registra a decisão de não vender antes de
          entregar, porque isso faz a auditoria parecer isca. E "depois do
          relatório" acontece no WhatsApp, que não é código. */}
      <section className="bg-[#132119] border-t border-verde-linha py-12 sm:py-16">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateIn className="max-w-[680px]">
            <div className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-verde-luz/75 mb-4">
              {t('proximo_eyebrow')}
            </div>
            <h2 className="text-[clamp(20px,2.6vw,30px)] leading-[1.15] tracking-[-0.02em] text-menta mb-4">
              {t('proximo_title')}
            </h2>
            <p className="text-[15px] leading-[1.75] text-menta-fraca mb-6">{t('proximo_desc')}</p>
            <Link
              href={`/${locale}/plano-de-acao`}
              className="inline-flex items-center gap-2 text-[14.5px] font-bold text-verde-luz hover:text-menta transition-colors min-h-[44px]"
            >
              {t('proximo_cta')}
              <ArrowIcon />
            </Link>
          </AnimateIn>
        </div>
      </section>

      </main>

      {/* ───────── RODAPÉ MÍNIMO ───────── */}
      <footer className="bg-[#0D1A12] py-10 pb-24 lg:pb-10">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href={`/${locale}`} className="flex items-center min-h-[44px]" aria-label="Explore Digital">
            <Logo className="h-[30px] opacity-70" />
          </Link>

          <div className="flex items-center gap-6 text-[12.5px] text-menta-fraca">
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

          <p className="text-[12px] text-menta-fraca">© {new Date().getFullYear()} Explore Digital</p>
        </div>
      </footer>
    </>
  )
}
