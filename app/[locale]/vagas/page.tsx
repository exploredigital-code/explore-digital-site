'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { AnimateIn, AnimateStagger, itemVariants } from '@/components/ui/AnimateIn'

const WA_BASE = 'https://wa.me/5585991043067?text='
const EMAIL = 'agencia.exploredigital@gmail.com'
const FORMSPREE = 'https://formspree.io/f/YOUR_FORM_ID'

type Vaga = { area: string; descricao: string; tipo: string }

const inputClass = cn(
  'w-full px-4 py-3.5 rounded-xl',
  'bg-white border border-g-dark/12',
  'text-[15px] text-g-dark placeholder:text-g-dark/35',
  'focus:outline-none focus:border-g-mid/60 focus:ring-2 focus:ring-g-mid/10',
  'transition-all duration-200'
)
const textareaClass = cn(inputClass, 'resize-none')

export default function VagasPage() {
  const t = useTranslations('vagas')
  const VAGAS = t.raw('positions') as Vaga[]
  const [selected, setSelected] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    vaga: '',
    apresentacao: '',
    portfolio: '',
    motivo: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    const waMsg = t('wa_apply')
      .replace('{vaga}', form.vaga)
      .replace('{name}', form.name)
      .replace('{email}', form.email)
      .replace('{portfolio}', form.portfolio)
      .replace('{apresentacao}', form.apresentacao)
      .replace('{motivo}', form.motivo)
    const waUrl = WA_BASE + encodeURIComponent(waMsg)

    try {
      const res = await fetch(FORMSPREE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: `Candidatura: ${form.vaga} — ${form.name}` }),
      })
      if (res.ok) {
        window.open(waUrl, '_blank')
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      window.open(waUrl, '_blank')
      setStatus('error')
    }
  }

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="page-hero pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_40%_-20%,#2D5238,transparent_70%)] opacity-50 pointer-events-none" />
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <AnimateIn>
            <SectionEyebrow>{t('eyebrow')}</SectionEyebrow>
            <h1 className="text-[clamp(36px,5.5vw,72px)] leading-[0.95] tracking-[-0.03em] text-white mt-2 mb-5 max-w-[660px]">
              {t('title')}
            </h1>
            <p className="text-g-light/55 text-[16px] leading-[1.75] max-w-[500px]">
              {t('subtitle')}
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* VAGAS ABERTAS — white */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateIn className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-5 h-px bg-g-mid" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-mid">{t('positions_eyebrow')}</span>
            </div>
            <h2 className="text-[clamp(26px,3.5vw,42px)] text-g-dark tracking-tight">{t('positions_title')}</h2>
          </AnimateIn>
          <AnimateStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VAGAS.map((v, i) => (
              <motion.div key={i} variants={itemVariants}
                onClick={() => {
                  setSelected(v.area)
                  setForm(prev => ({ ...prev, vaga: v.area }))
                  document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className={cn(
                  'group cursor-pointer flex flex-col gap-3 p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1',
                  selected === v.area
                    ? 'bg-g-dark border-g-dark text-white'
                    : 'bg-g-pale border-g-dark/8 hover:border-g-mid/40 hover:bg-g-pale/60'
                )}>
                <div className={cn('text-[11px] font-bold tracking-[0.12em] uppercase', selected === v.area ? 'text-g-mid' : 'text-g-mid/70')}>
                  {v.tipo}
                </div>
                <h3 className={cn('text-[17px] font-bold', selected === v.area ? 'text-white' : 'text-g-dark')}>{v.area}</h3>
                <p className={cn('text-[13px] leading-[1.6] flex-1', selected === v.area ? 'text-white/55' : 'text-g-dark/50')}>{v.descricao}</p>
                <div className={cn('text-[12px] font-bold flex items-center gap-1 mt-2 transition-colors', selected === v.area ? 'text-g-light' : 'text-g-mid/60 group-hover:text-g-mid')}>
                  {t('apply')}
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
                </div>
              </motion.div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* FORMULÁRIO — g-pale */}
      <section id="application-form" className="bg-g-pale py-20 lg:py-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Left */}
            <AnimateIn>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-5 h-px bg-g-mid" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-mid">{t('form_eyebrow')}</span>
              </div>
              <h2 className="text-[clamp(28px,4vw,48px)] text-g-dark tracking-tight mb-4">{t('form_title')}</h2>
              <p className="text-g-dark/55 text-[15px] leading-[1.75] mb-8">
                {t('form_desc')}
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-g-dark/8">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-g-mid shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <div>
                    <div className="text-[11px] font-bold tracking-wider text-g-dark/40 uppercase">WhatsApp</div>
                    <div className="text-[14px] text-g-dark/65">{t('form_note')}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-g-dark/8">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4E7D57" strokeWidth="2" strokeLinecap="round" className="shrink-0">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/>
                  </svg>
                  <div>
                    <div className="text-[11px] font-bold tracking-wider text-g-dark/40 uppercase">E-mail</div>
                    <div className="text-[14px] text-g-dark/65">{EMAIL}</div>
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* Right: Form */}
            <AnimateIn delay={0.15}>
              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-g-mid/20 flex items-center justify-center mb-5">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4E7D57" strokeWidth="2.5" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="text-[22px] font-bold text-g-dark mb-2">{t('form_success_title')}</h3>
                    <p className="text-g-dark/55 text-[15px]">{t('form_success_desc')}</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white p-8 rounded-2xl border border-g-dark/8 shadow-sm" noValidate>
                    <input type="text" name="name" placeholder={t('form_name')} required value={form.name} onChange={handleChange} className={inputClass} />
                    <input type="email" name="email" placeholder={t('form_email')} required value={form.email} onChange={handleChange} className={inputClass} />

                    <select name="vaga" required value={form.vaga} onChange={handleChange}
                      className={cn(inputClass, 'cursor-pointer', !form.vaga && 'text-g-dark/35')}>
                      <option value="" disabled>{t('form_position')}</option>
                      {VAGAS.map(v => (
                        <option key={v.area} value={v.area}>{v.area}</option>
                      ))}
                    </select>

                    <input type="url" name="portfolio" placeholder={t('form_portfolio')} value={form.portfolio} onChange={handleChange} className={inputClass} />

                    <div>
                      <label className="block text-[11px] font-bold tracking-wider text-g-dark/45 uppercase mb-1.5 pl-1">{t('form_intro_label')}</label>
                      <textarea name="apresentacao" rows={4} placeholder={t('form_intro_placeholder')} required value={form.apresentacao} onChange={handleChange} className={textareaClass} />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold tracking-wider text-g-dark/45 uppercase mb-1.5 pl-1">{t('form_why_label')}</label>
                      <textarea name="motivo" rows={3} placeholder={t('form_why_placeholder')} required value={form.motivo} onChange={handleChange} className={textareaClass} />
                    </div>

                    {status === 'error' && (
                      <p className="text-[13px] text-red-500">
                        {t('form_error')}
                      </p>
                    )}

                    <button type="submit" disabled={status === 'sending'}
                      className={cn(
                        'mt-2 px-7 py-4 rounded-full text-[15px] font-bold transition-all duration-200',
                        'bg-g-dark text-g-pale hover:bg-s2 hover:-translate-y-0.5',
                        'hover:shadow-[0_8px_28px_rgba(27,48,37,0.15)]',
                        'disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0'
                      )}>
                      {status === 'sending' ? t('form_sending') : t('form_submit')}
                    </button>
                    <p className="text-[11px] text-g-dark/35 text-center">
                      {t('form_note')}
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </AnimateIn>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
