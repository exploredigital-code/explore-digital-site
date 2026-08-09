'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { cn } from '@/lib/utils'
import { gruposDoCatalogo } from '@/data/services'
import { getLocalizedSubService } from '@/data/services-content'

const WHATSAPP_BASE = 'https://wa.me/+5585991043067?text='
const FORMSPREE = 'https://formspree.io/f/mlgkrjng'

/** Mesma chave que a página /obrigado lê para reabrir o WhatsApp se o popup cair. */
const WA_STORAGE_KEY = 'explore_wa_pending'


const inputClass = cn(
  'w-full px-4 py-3.5 rounded-xl',
  'bg-white/[0.05] border border-white/10',
  'text-[15px] text-white placeholder:text-white/40',
  'focus:outline-none focus:border-g-mid/70 focus:bg-white/[0.08]',
  'transition-all duration-200'
)

const selectClass = cn(
  inputClass,
  'appearance-none cursor-pointer pr-10'
)

function SelectArrow() {
  return (
    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M3 5l4 4 4-4" />
      </svg>
    </div>
  )
}

export function Contact() {
  const t = useTranslations('contact')
  const tServicos = useTranslations('servicos')
  const locale = useLocale()
  const router = useRouter()
  const BUSINESS_TYPES = t.raw('business_types') as string[]

  /**
   * O seletor oferecia Web Design, Social Media, Performance Ads e Setup:
   * quatro nomes do catálogo antigo, nenhum deles à venda. A pessoa escolhia
   * o que a Explore não vende e o lead chegava pedindo catálogo morto.
   *
   * A lista sai do próprio catálogo, agrupada como no hub, e não de uma
   * cópia em `messages`. Produto novo entra aqui sozinho, e o nome é sempre
   * o mesmo que a pessoa acabou de ler na outra página.
   */
  const GRUPOS = gruposDoCatalogo.map(g => ({
    label: tServicos(`grupo_${g.grupo}`),
    itens: g.itens.map(p => getLocalizedSubService(locale, p.slug)?.name ?? p.name),
  }))
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    instagram: '',
    businessType: '',
    service: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  /** Mesmo formato do wizard da consultoria, para o time ler as duas do mesmo jeito. */
  const buildWaMessage = () => {
    const linhas = [
      t('whatsapp_greeting'),
      '',
      `*${t('wa_field_name')}:* ${form.name}`,
      `*${t('wa_field_email')}:* ${form.email}`,
      form.phone && `*${t('form_phone')}:* ${form.phone}`,
      `*Instagram:* instagram.com/${form.instagram.replace(/^@/, '')}`,
      form.businessType && `*${t('wa_field_business')}:* ${form.businessType}`,
      form.service && `*${t('wa_field_service')}:* ${form.service}`,
      form.message && `*${t('wa_field_message')}:* ${form.message}`,
    ].filter(Boolean)
    return linhas.join('\n')
  }

  /**
   * A copy sempre prometeu que a mensagem chega por e-mail e WhatsApp ao mesmo
   * tempo, e a /obrigado dizia que o WhatsApp já tinha sido aberto. Nada disso
   * acontecia: o formulário só postava no Formspree. Agora faz o mesmo que o
   * wizard da consultoria.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')

    const waMessage = buildWaMessage()
    const waUrl = WHATSAPP_BASE + encodeURIComponent(waMessage)

    // 1. abre o WhatsApp ainda dentro do gesto do usuário. Depois de um await
    //    o navegador trata como popup e bloqueia.
    const waTab = window.open(waUrl, '_blank')
    if (waTab) waTab.opener = null

    // 2. guarda para a /obrigado reabrir caso o popup tenha sido barrado
    try {
      sessionStorage.setItem(WA_STORAGE_KEY, JSON.stringify({ url: waUrl, message: waMessage, blocked: !waTab }))
    } catch {
      /* modo privado ou storage indisponível */
    }

    // 3. registra o lead por e-mail. keepalive sobrevive à navegação seguinte.
    fetch(FORMSPREE, {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...form,
        _subject: `Novo contato · ${form.name} · ${form.businessType || 'sem tipo'}`,
      }),
    }).catch(() => {
      /* o lead já seguiu pelo WhatsApp */
    })

    router.push(`/${locale}/obrigado`)
  }

  return (
    <section id="contact" className="bg-g-dark py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_0%_50%,#2D5238,transparent_60%)] opacity-35 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px' }} />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left */}
          <div>
            <AnimateIn>
              <SectionEyebrow>{t('eyebrow')}</SectionEyebrow>
              <h2 className="text-[clamp(32px,5vw,64px)] font-bold leading-[1.0] tracking-[-0.03em] text-white mt-2 mb-6">
                {t('title')}
              </h2>
              <p className="text-white/50 text-[16px] leading-[1.75] mb-10">
                {t('description')}
              </p>

              <a
                href={WHATSAPP_BASE + encodeURIComponent(t('whatsapp_intro'))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-sol text-verde font-bold px-7 py-4 rounded-full hover:bg-[#20ba5a] hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto justify-center sm:justify-start"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t('whatsapp')}
              </a>

              <div className="mt-6 flex items-center gap-3 text-white/45">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[12px] tracking-widest">{t('email_label')}</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              <a href={`mailto:${t('email')}`} className="block mt-4 text-[14px] text-g-light/70 hover:text-g-light transition-colors">
                {t('email')}
              </a>

              {/* Trust signals */}
              <div className="mt-10 grid grid-cols-2 gap-3">
                {[
                  { icon: '⚡', label: t('trust_1') },
                  { icon: '✦', label: t('trust_2') },
                  { icon: '🔒', label: t('trust_3') },
                  { icon: '🌎', label: t('trust_4') },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-[12px] text-white/40">
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>

          {/* Right: Form */}
          <AnimateIn delay={0.15}>
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div key="success" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                  <div className="w-16 h-16 rounded-full bg-g-mid/20 flex items-center justify-center mb-5">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C1D5BD" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-[22px] font-bold text-white mb-2">{t('form_success')}</h3>
                  <p className="text-white/45 text-[15px]">{t('success_sub')}</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
                  <input type="text" name="name" placeholder={t('form_name') + ' *'} required value={form.name} onChange={handleChange} className={inputClass} />
                  <input type="email" name="email" placeholder={t('form_email') + ' *'} required value={form.email} onChange={handleChange} className={inputClass} />
                  <input type="tel" name="phone" placeholder={t('form_phone')} value={form.phone} onChange={handleChange} className={inputClass} />

                  {/* O @ do negócio é o campo que permite auditar o perfil
                      antes da conversa. Obrigatório, como na consultoria. */}
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-white/40">@</span>
                    <input
                      type="text"
                      name="instagram"
                      inputMode="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      placeholder={t('form_instagram') + ' *'}
                      required
                      value={form.instagram}
                      onChange={handleChange}
                      className={cn(inputClass, 'pl-9')}
                    />
                  </div>

                  <div className="relative">
                    <select name="businessType" aria-label={t('form_business')} value={form.businessType} onChange={handleChange}
                      className={cn(selectClass, !form.businessType && 'text-white/40')}>
                      <option value="" disabled>{t('form_business')}</option>
                      {BUSINESS_TYPES.map(b => <option key={b} value={b} className="text-g-dark bg-white">{b}</option>)}
                    </select>
                    <SelectArrow />
                  </div>

                  <div className="relative">
                    <select name="service" aria-label={t('form_service')} value={form.service} onChange={handleChange}
                      className={cn(selectClass, !form.service && 'text-white/40')}>
                      <option value="" disabled>{t('form_service')}</option>
                      {GRUPOS.map(g => (
                        <optgroup key={g.label} label={g.label} className="text-g-dark bg-white">
                          {g.itens.map(s => <option key={s} value={s} className="text-g-dark bg-white">{s}</option>)}
                        </optgroup>
                      ))}
                      <option value={t('services_unsure')} className="text-g-dark bg-white">{t('services_unsure')}</option>
                    </select>
                    <SelectArrow />
                  </div>

                  <textarea name="message" rows={3} placeholder={t('form_message')} value={form.message} onChange={handleChange}
                    className={cn(inputClass, 'resize-none')} />

                  {status === 'error' && (
                    <p className="text-[13px] text-red-400">{t('form_error')}</p>
                  )}

                  <button type="submit" disabled={status === 'sending'}
                    className={cn(
                      'mt-1 px-7 py-4 rounded-full text-[15px] font-bold transition-all duration-200',
                      'bg-g-light text-g-dark hover:bg-g-pale hover:-translate-y-0.5',
                      'hover:shadow-[0_8px_28px_rgba(193,213,189,0.2)]',
                      'disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0'
                    )}>
                    {status === 'sending' ? t('form_sending') : t('form_submit')}
                  </button>
                  <p className="text-[11px] text-white/30 text-center">
                    {t('form_disclaimer')}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </AnimateIn>

        </div>
      </div>
    </section>
  )
}
