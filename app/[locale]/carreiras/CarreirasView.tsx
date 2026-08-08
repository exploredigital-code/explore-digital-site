'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/sections/Navbar'
import { SkipLink } from '@/components/ui/SkipLink'
import { Footer } from '@/components/sections/Footer'
import { OptionGroup } from '@/components/ui/OptionGroup'
import { useStepForm } from '@/lib/use-step-form'
import { vagas } from '@/data/vagas'

const FORMSPREE = 'https://formspree.io/f/xqeozpqa'

const inputClass = cn(
  'w-full px-4 py-3.5 rounded-xl bg-white border border-tinta-16',
  'text-[15px] text-verde placeholder:text-tinta-50/60',
  'focus:outline-none focus:border-verde-medio focus:ring-1 focus:ring-verde-medio/30',
  'transition-all duration-200'
)
const labelClass = 'block text-[11px] font-bold tracking-[0.12em] uppercase text-tinta-50 mb-2'

type Item = { title: string; desc: string }
type Passo = { num: string; title: string; desc: string }

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  )
}

const VAZIO = { area: '', experiencia: '', nome: '', email: '', whatsapp: '', portfolio: '' }

function CandidaturaForm() {
  const t = useTranslations('carreiras')
  const locale = useLocale()
  const AREAS = t.raw('areas') as string[]
  const EXPERIENCIAS = t.raw('experiencias') as string[]

  const primeiroCampo = useRef<HTMLDivElement | null>(null)
  const nomeRef = useRef<HTMLInputElement | null>(null)
  const [enviado, setEnviado] = useState(false)

  const w = useStepForm({
    initial: VAZIO,
    total: 3,
    validate: (step, f) => {
      if (step === 1 && !f.area) return t('err_choose')
      if (step === 2 && !f.experiencia) return t('err_choose')
      if (step === 3) {
        if (!f.nome.trim() || !f.email.trim() || !f.portfolio.trim()) return t('err_required')
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return t('err_email')
      }
      return ''
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (w.sending) return
    if (!w.isLast) { w.goNext(); return }
    if (!w.canSubmit()) return

    w.setSending(true)
    fetch(FORMSPREE, {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...w.form, _subject: `Candidatura · ${w.form.nome} · ${w.form.area}` }),
    }).catch(() => { /* silencioso: a confirmação já está na tela */ })

    w.setSending(false)
    setEnviado(true)
  }

  if (enviado) {
    return (
      <div className="p-8 lg:p-10 rounded-2xl border border-tinta-16 bg-white text-center">
        <h3 className="text-[22px] font-bold text-verde mb-3">{t('ok_title')}</h3>
        <p className="text-[15px] leading-[1.7] text-tinta-70 mb-7">{t('ok_desc')}</p>
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-[13.5px] font-bold text-verde-medio">
          ← {t('ok_home')}
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="p-6 lg:p-8 rounded-2xl border border-tinta-16 bg-white">
      <div className="flex items-center justify-between mb-6">
        <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-verde-medio">
          {t('form_step_of', { current: w.step, total: w.total })}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={w.step}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.22 }}
          className="flex flex-col gap-5"
        >
          {w.step === 1 && (
            <div ref={el => { primeiroCampo.current = el; w.registrarFoco(el) }} tabIndex={-1}>
              <label className={labelClass}>{t('f_area')} *</label>
              <OptionGroup name="area" label={t('f_area')} options={AREAS} value={w.form.area} onSelect={v => w.set('area', v)} />
            </div>
          )}

          {w.step === 2 && (
            <div ref={el => w.registrarFoco(el)} tabIndex={-1}>
              <label className={labelClass}>{t('f_experiencia')} *</label>
              <OptionGroup name="experiencia" label={t('f_experiencia')} options={EXPERIENCIAS} value={w.form.experiencia} onSelect={v => w.set('experiencia', v)} />
            </div>
          )}

          {w.step === 3 && (
            <>
              <div>
                <label className={labelClass} htmlFor="nome">{t('f_nome')} *</label>
                <input ref={el => { nomeRef.current = el; w.registrarFoco(el) }} id="nome" value={w.form.nome} onChange={e => w.set('nome', e.target.value)} placeholder={t('f_nome_ph')} className={inputClass} autoComplete="name" />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} htmlFor="email">{t('f_email')} *</label>
                  <input id="email" type="email" value={w.form.email} onChange={e => w.set('email', e.target.value)} placeholder={t('f_email_ph')} className={inputClass} autoComplete="email" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="whatsapp">{t('f_whatsapp')}</label>
                  <input id="whatsapp" type="tel" value={w.form.whatsapp} onChange={e => w.set('whatsapp', e.target.value)} placeholder={t('f_whatsapp_ph')} className={inputClass} autoComplete="tel" />
                </div>
              </div>
              <div>
                <label className={labelClass} htmlFor="portfolio">{t('f_portfolio')} *</label>
                <input id="portfolio" value={w.form.portfolio} onChange={e => w.set('portfolio', e.target.value)} placeholder={t('f_portfolio_ph')} className={inputClass} />
                <p className="text-[11.5px] text-tinta-50 leading-relaxed mt-1.5">{t('f_portfolio_note')}</p>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* aviso: region para o leitor de tela anunciar sem roubar o foco */}
      {w.error && (
        <p role="alert" className="text-[13px] text-sol mt-4">{w.error}</p>
      )}

      <div className="flex items-center gap-3 mt-7">
        {w.step > 1 && (
          <button type="button" onClick={w.goBack} className="px-5 py-3 rounded-full border border-tinta-16 text-[14px] font-medium text-tinta-70 hover:border-verde transition-colors">
            {t('btn_back')}
          </button>
        )}
        <button
          type="submit"
          disabled={w.sending}
          className="inline-flex items-center gap-2 bg-sol text-verde font-medium px-7 py-3.5 rounded-full text-[14.5px] hover:bg-sol-forte hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50"
        >
          {w.sending ? t('btn_sending') : w.isLast ? t('btn_submit') : t('btn_next')}
          <ArrowIcon />
        </button>
      </div>
    </form>
  )
}

export function CarreirasView() {
  const t = useTranslations('carreiras')
  const comoTrabalhamos = t.raw('work_items') as Item[]
  const processo = t.raw('process_items') as Passo[]
  const badges = t.raw('form_badges') as string[]

  return (
    <>
      <SkipLink />
      <Navbar />

      {/* ── Manifesto ── */}
      <section className="page-hero relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_15%_0%,#2D5238,transparent_65%)] opacity-55 pointer-events-none" />
        <div className="relative z-10 max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-verde-luz" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-luz">{t('eyebrow')}</span>
            </div>
            <h1 className="text-[clamp(34px,6vw,76px)] leading-[0.96] tracking-[-0.035em] text-menta max-w-[880px] mb-6">
              {t('title')}
            </h1>
            <p className="text-menta-fraca text-[16.5px] leading-[1.75] max-w-[560px]">{t('sub')}</p>
          </motion.div>
        </div>
      </section>

      <main id="conteudo" className="bg-white">
        {/* ── Como trabalhamos ── */}
        <section className="max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
          <div className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-verde-medio mb-3">{t('work_eyebrow')}</div>
          <h2 className="text-[clamp(26px,4vw,44px)] leading-[1.05] tracking-[-0.03em] text-verde max-w-[620px] mb-10">
            {t('work_title')}
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {comoTrabalhamos.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px 0px' }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="p-7 rounded-2xl border border-tinta-16 bg-menta-clara/40"
              >
                <h3 className="text-[17.5px] font-bold text-verde leading-tight mb-2.5">{item.title}</h3>
                <p className="text-[14px] leading-[1.7] text-tinta-70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Processo seletivo ── */}
        <section className="bg-menta-clara">
          <div className="max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
            <div className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-verde-medio mb-3">{t('process_eyebrow')}</div>
            <h2 className="text-[clamp(26px,4vw,44px)] leading-[1.05] tracking-[-0.03em] text-verde max-w-[620px] mb-10">
              {t('process_title')}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processo.map((p, i) => (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px 0px' }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <div className="text-[11px] font-bold tabular-nums text-verde-medio mb-2">{p.num}</div>
                  <h3 className="text-[16.5px] font-bold text-verde leading-tight mb-2">{p.title}</h3>
                  <p className="text-[13.5px] leading-[1.7] text-tinta-70">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Vagas ── */}
        <section className="max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
          <div className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-verde-medio mb-3">{t('jobs_eyebrow')}</div>
          <h2 className="text-[clamp(26px,4vw,44px)] leading-[1.05] tracking-[-0.03em] text-verde max-w-[620px] mb-10">
            {t('jobs_title')}
          </h2>

          {vagas.length === 0 ? (
            /* Estado vazio explícito. Melhor dizer que não há vaga do que
               anunciar posição inventada e queimar quem se candidata. */
            <div className="p-8 lg:p-10 rounded-2xl border border-dashed border-tinta-16 bg-menta-clara/30 max-w-[680px]">
              <h3 className="text-[19px] font-bold text-verde mb-3">{t('jobs_empty_title')}</h3>
              <p className="text-[14.5px] leading-[1.75] text-tinta-70">{t('jobs_empty_desc')}</p>
            </div>
          ) : (
            <div className="divide-y divide-tinta-16 border-y border-tinta-16">
              {vagas.map(v => (
                <article key={v.slug} className="grid md:grid-cols-[1fr_auto] gap-4 md:gap-10 items-start py-7">
                  <div>
                    <h3 className="text-[19px] font-bold text-verde leading-tight mb-1.5">{v.titulo}</h3>
                    <p className="text-[13.5px] text-tinta-50 mb-2">{v.modelo} · {v.local}</p>
                    <p className="text-[14px] leading-[1.7] text-tinta-70 max-w-[560px]">{v.descricao}</p>
                  </div>
                  <a href="#candidatura" className="inline-flex items-center gap-2 shrink-0 bg-sol text-verde font-medium px-6 py-3 rounded-full text-[13.5px] hover:bg-sol-forte transition-colors">
                    {t('jobs_apply')}
                    <ArrowIcon />
                  </a>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ── Candidatura ── */}
        <section id="candidatura" className="bg-menta-clara scroll-mt-24">
          <div className="max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
              <div>
                <div className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-verde-medio mb-3">{t('form_eyebrow')}</div>
                <h2 className="text-[clamp(26px,4vw,44px)] leading-[1.05] tracking-[-0.03em] text-verde mb-4">
                  {t('form_title')}
                </h2>
                <p className="text-[15.5px] leading-[1.75] text-tinta-70 mb-7">{t('form_sub')}</p>
                <ul className="flex flex-wrap gap-2">
                  {badges.map(b => (
                    <li key={b} className="text-[12px] text-tinta-70 bg-white border border-tinta-16 rounded-full px-3.5 py-1.5">{b}</li>
                  ))}
                </ul>
              </div>
              <CandidaturaForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
