'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/sections/Navbar'
import { SkipLink } from '@/components/ui/SkipLink'
import { Footer } from '@/components/sections/Footer'
import { Button } from '@/components/ui/Button'
import { AnimateIn, AnimateStagger, itemVariants } from '@/components/ui/AnimateIn'

const WA_BASE = 'https://wa.me/+5585991043067?text='

type NumItem = { num: string; title: string; desc: string }
type Item = { title: string; desc: string }
type Faq = { q: string; a: string }

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 7h10M8 3l4 4-4 4" />
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

/**
 * Plano de ação, o produto pago.
 *
 * É a única página do site com preço. A regra de "nenhum valor em R$" vale em
 * todo o resto justamente para que aqui o número tenha peso.
 *
 * Nasce sem prova social de propósito: não existe depoimento verificado, e
 * prova social falsa custa mais caro numa página onde há valor na tela. A
 * escassez de três vagas é verdadeira e carrega sozinha.
 */
export function PlanoView() {
  const t = useTranslations('plano')
  const tNav = useTranslations('nav')
  const locale = useLocale()

  const HERO_BULLETS = t.raw('hero_bullets') as string[]
  const PROBLEMA = t.raw('problema_items') as NumItem[]
  const SEMANAS = t.raw('semanas_items') as NumItem[]
  const ENTREGA = t.raw('entrega_items') as string[]
  const QUEM = t.raw('quem_items') as Item[]
  const QUEM_NAO = t.raw('quem_nao_items') as string[]
  const FAQ = t.raw('faq_items') as Faq[]

  const wa = WA_BASE + encodeURIComponent(t('wa_message'))

  return (
    <>
      <SkipLink />
      <Navbar />

      <main id="conteudo" tabIndex={-1}>

        {/* ───────── ABERTURA E PREÇO ───────── */}
        <section className="page-hero relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_15%_0%,#2D5238,transparent_65%)] opacity-55 pointer-events-none" />
          <div className="relative z-10 max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-16 items-start">

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
                <div className="inline-flex items-center gap-2.5 bg-verde-luz/12 border border-verde-luz/25 rounded-full pl-2.5 pr-4 py-1.5 mb-7">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-verde-luz opacity-60 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-verde-luz" />
                  </span>
                  <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-verde-luz">{t('hero_badge')}</span>
                </div>

                <h1 className="text-[clamp(32px,5.2vw,66px)] leading-[0.98] tracking-[-0.03em] text-menta mb-5">
                  {t('hero_title')}<br />
                  <span className="text-verde-luz/75">{t('hero_title_accent')}</span>
                </h1>

                <p className="text-menta-fraca text-[15.5px] sm:text-[17px] leading-[1.7] max-w-[560px] mb-8">{t('hero_sub')}</p>

                <ul className="flex flex-col gap-3">
                  {HERO_BULLETS.map(b => (
                    <li key={b} className="flex items-center gap-3 text-[15px] text-menta-fraca">
                      <span className="w-5 h-5 rounded-full bg-verde-luz/15 border border-verde-luz/30 flex items-center justify-center text-verde-luz shrink-0">
                        <CheckIcon />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* O preço. Única vez no site inteiro. */}
              <motion.aside
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="w-full bg-white rounded-[20px] border border-tinta-16 shadow-[0_20px_60px_rgba(0,0,0,0.28)] p-7 sm:p-8"
              >
                <div className="text-[12.5px] text-tinta-70 line-through mb-1">{t('preco_de')}</div>
                <div className="text-[clamp(40px,6vw,58px)] leading-none font-bold text-verde tracking-[-0.03em] mb-4 tabular-nums">
                  {t('preco_por')}
                </div>
                <p className="text-[13.5px] leading-[1.65] text-tinta-70 pb-6 mb-6 border-b border-tinta-16">{t('preco_nota')}</p>

                <Button variant="primary" size="lg" href={wa} target="_blank" rel="noopener noreferrer" className="w-full font-bold">
                  {t('hero_cta')}
                  <ArrowIcon />
                </Button>
              </motion.aside>
            </div>
          </div>
        </section>

        {/* ───────── QUAL DAS DUAS ─────────
            Primeiro bloco depois do preço, e não no rodapé, porque é a
            primeira pergunta de quem chega: existe auditoria gratuita e existe
            consultoria paga, e a pessoa precisa saber qual das duas resolve o
            problema dela antes de ler mais qualquer coisa.

            As duas aparecem lado a lado, com a etapa atual marcada, porque o
            ponto é que são etapas e não alternativas. O link só vai para a
            auditoria: quem já está aqui não precisa de link para cá. */}
        <section className="bg-white py-14 sm:py-20">
          <div className="max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16">
            <AnimateIn className="max-w-[720px] mb-9">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-px bg-verde-medio" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-medio">{t('degrau_eyebrow')}</span>
              </div>
              <h2 className="text-[clamp(24px,3.4vw,40px)] leading-[1.1] tracking-[-0.02em] text-verde">{t('degrau_title')}</h2>
            </AnimateIn>

            <div className="grid md:grid-cols-2 gap-4 mb-7 max-w-[880px]">
              <AnimateIn>
                <div className="h-full rounded-2xl border border-tinta-16 bg-menta-clara/60 p-7">
                  <div className="flex items-center gap-2.5 mb-3">
                    <h3 className="text-[17px] font-bold text-verde">{t('degrau_auditoria_label')}</h3>
                    <span className="text-[9.5px] font-bold tracking-[0.16em] uppercase bg-verde-medio/15 text-verde-medio px-2.5 py-1 rounded-full">
                      {t('degrau_auditoria_tag')}
                    </span>
                  </div>
                  <p className="text-[14.5px] leading-[1.7] text-tinta-70">{t('degrau_auditoria_desc')}</p>
                </div>
              </AnimateIn>

              <AnimateIn delay={0.08}>
                {/* A etapa em que a pessoa está, marcada pela borda de acento
                    e não por preenchimento: o cartão precisa dizer "você está
                    aqui" sem virar um segundo CTA competindo com o de cima. */}
                <div className="h-full rounded-2xl border border-sol/45 bg-sol-fraco p-7">
                  <div className="flex items-center gap-2.5 mb-3">
                    <h3 className="text-[17px] font-bold text-verde">{t('degrau_consultoria_label')}</h3>
                    {/* Laranja chapado aqui lia como botão e competia com o
                        CTA da própria seção. O acento já está na borda do
                        cartão, então o selo espelha o tom do cartão vizinho e
                        só marca onde a pessoa está. */}
                    <span className="text-[9.5px] font-bold tracking-[0.16em] uppercase bg-sol/20 text-verde px-2.5 py-1 rounded-full">
                      {t('degrau_consultoria_tag')}
                    </span>
                  </div>
                  <p className="text-[14.5px] leading-[1.7] text-tinta-70">{t('degrau_consultoria_desc')}</p>
                </div>
              </AnimateIn>
            </div>

            <AnimateIn className="max-w-[720px]">
              <p className="text-[14.5px] leading-[1.75] text-tinta-70 mb-6">{t('degrau_nota')}</p>
              <Link
                href={`/${locale}/consultoria`}
                className="inline-flex items-center gap-2 border border-verde-medio/45 text-verde-medio hover:bg-verde-medio hover:text-white font-bold px-6 py-3.5 rounded-full transition-all duration-200 text-[14px]"
              >
                {t('degrau_cta')}
                <ArrowIcon />
              </Link>
            </AnimateIn>
          </div>
        </section>

        {/* ───────── O PROBLEMA ───────── */}
        <section className="bg-white py-14 sm:py-20 lg:py-24">
          <div className="max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16">
            <AnimateIn className="max-w-[660px] mb-10 sm:mb-14">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-px bg-verde-medio" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-medio">{t('problema_eyebrow')}</span>
              </div>
              <h2 className="text-[clamp(28px,4vw,50px)] leading-[1.05] tracking-[-0.02em] text-verde mb-5">{t('problema_title')}</h2>
              <p className="text-tinta-70 text-[16px] leading-[1.75]">{t('problema_sub')}</p>
            </AnimateIn>

            <AnimateStagger className="grid md:grid-cols-3 gap-5">
              {PROBLEMA.map(p => (
                <motion.div key={p.title} variants={itemVariants} className="flex flex-col gap-3 p-6 rounded-2xl bg-menta-clara/60 border border-tinta-16">
                  <span className="text-[13px] font-bold text-verde-medio">{p.num}</span>
                  <h3 className="text-[19px] font-bold text-verde leading-snug">{p.title}</h3>
                  <p className="text-[14px] leading-[1.7] text-tinta-70">{p.desc}</p>
                </motion.div>
              ))}
            </AnimateStagger>
          </div>
        </section>

        {/* ───────── AS TRÊS SEMANAS ───────── */}
        <section className="bg-verde relative overflow-hidden py-14 sm:py-20 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_100%_0%,#2D5238,transparent_65%)] opacity-50 pointer-events-none" />
          <div className="relative z-10 max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16">
            <AnimateIn className="max-w-[560px] mb-10 sm:mb-14">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-px bg-verde-luz" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-luz">{t('semanas_eyebrow')}</span>
              </div>
              <h2 className="text-[clamp(28px,4vw,48px)] leading-[1.05] tracking-[-0.02em] text-menta">{t('semanas_title')}</h2>
            </AnimateIn>

            <AnimateStagger className="grid md:grid-cols-3 gap-5">
              {SEMANAS.map(s => (
                <motion.div key={s.num} variants={itemVariants} className="flex flex-col gap-3 p-6 rounded-2xl bg-white/[0.05] border border-verde-linha">
                  <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-verde-luz">{s.num}</span>
                  <h3 className="text-[20px] font-bold text-menta leading-snug">{s.title}</h3>
                  <p className="text-[14px] leading-[1.7] text-menta-fraca">{s.desc}</p>
                </motion.div>
              ))}
            </AnimateStagger>
          </div>
        </section>

        {/* ───────── O QUE IGNORAR ─────────
            Bloco próprio porque é a parte que mais economiza dinheiro e a que
            ninguém mais entrega. Toda lista que chega ao dono de pousada só
            adiciona; esta subtrai. */}
        <section className="bg-sol-fraco py-14 sm:py-20 lg:py-24">
          <div className="max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16">
            <AnimateIn className="max-w-[720px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-px bg-sol" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-medio">{t('ignorar_eyebrow')}</span>
              </div>
              <h2 className="text-[clamp(28px,4vw,50px)] leading-[1.05] tracking-[-0.02em] text-verde mb-6">{t('ignorar_title')}</h2>
              <p className="text-tinta-70 text-[16.5px] leading-[1.8] mb-4">{t('ignorar_body')}</p>
              <p className="text-verde text-[16.5px] leading-[1.8] font-medium">{t('ignorar_body_2')}</p>
            </AnimateIn>
          </div>
        </section>

        {/* ───────── O QUE FICA COM VOCÊ ───────── */}
        <section className="bg-white py-14 sm:py-20 lg:py-24">
          <div className="max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">
              <AnimateIn>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-5 h-px bg-verde-medio" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-medio">{t('entrega_eyebrow')}</span>
                </div>
                <h2 className="text-[clamp(26px,3.5vw,42px)] leading-[1.08] tracking-[-0.02em] text-verde mb-5">{t('entrega_title')}</h2>
                <p className="text-tinta-70 text-[16px] leading-[1.8]">{t('entrega_body')}</p>
              </AnimateIn>

              <AnimateIn delay={0.1}>
                <ul className="flex flex-col gap-3.5 bg-menta-clara rounded-2xl border border-tinta-16 p-7">
                  {ENTREGA.map(e => (
                    <li key={e} className="flex items-start gap-3 text-[15px] leading-[1.6] text-verde">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-verde-medio/15 flex items-center justify-center text-verde-medio mt-0.5">
                        <CheckIcon />
                      </span>
                      {e}
                    </li>
                  ))}
                </ul>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* ───────── PARA QUEM É ───────── */}
        <section className="bg-menta-clara py-14 sm:py-20 lg:py-24">
          <div className="max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16">
            <AnimateIn className="max-w-[600px] mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-px bg-verde-medio" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-medio">{t('quem_eyebrow')}</span>
              </div>
              <h2 className="text-[clamp(28px,4vw,48px)] leading-[1.05] tracking-[-0.02em] text-verde">{t('quem_title')}</h2>
            </AnimateIn>

            <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-10 items-start">
              <AnimateStagger className="grid sm:grid-cols-3 gap-4">
                {QUEM.map(q => (
                  <motion.div key={q.title} variants={itemVariants} className="flex flex-col gap-2.5 p-6 rounded-2xl bg-white border border-tinta-16">
                    <h3 className="text-[16.5px] font-bold text-verde leading-snug">{q.title}</h3>
                    <p className="text-[14px] leading-[1.65] text-tinta-70">{q.desc}</p>
                  </motion.div>
                ))}
              </AnimateStagger>

              <AnimateIn delay={0.12} className="rounded-2xl bg-verde p-7">
                <h3 className="text-[16.5px] font-bold text-menta mb-4">{t('quem_nao_title')}</h3>
                <ul className="flex flex-col gap-2.5 mb-5">
                  {QUEM_NAO.map(n => (
                    <li key={n} className="flex items-start gap-2.5 text-[14px] leading-[1.6] text-menta-fraca">
                      <span className="mt-[9px] w-1 h-1 rounded-full bg-verde-luz shrink-0" />
                      {n}
                    </li>
                  ))}
                </ul>
                <p className="text-[13px] leading-[1.65] text-verde-luz/75 pt-4 border-t border-verde-linha">{t('quem_nao_note')}</p>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* ───────── AS TRÊS VAGAS ───────── */}
        <section className="bg-white py-14 sm:py-20">
          <div className="max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16">
            <AnimateIn className="max-w-[660px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-px bg-verde-medio" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-medio">{t('vagas_eyebrow')}</span>
              </div>
              <h2 className="text-[clamp(24px,3.2vw,38px)] leading-[1.1] tracking-[-0.02em] text-verde mb-5">{t('vagas_title')}</h2>
              <p className="text-tinta-70 text-[16px] leading-[1.8]">{t('vagas_body')}</p>
            </AnimateIn>
          </div>
        </section>

        {/* ───────── ANTES DE DECIDIR ───────── */}
        <section className="bg-menta-clara py-14 sm:py-20">
          <div className="max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16">
            <AnimateIn className="mb-8">
              <h2 className="text-[clamp(26px,3.5vw,42px)] leading-[1.08] tracking-[-0.02em] text-verde">{t('faq_title')}</h2>
            </AnimateIn>

            <div className="grid md:grid-cols-2 gap-5 max-w-[980px]">
              {FAQ.map(f => (
                <AnimateIn key={f.q}>
                  <div className="h-full bg-white rounded-2xl border border-tinta-16 p-6">
                    <h3 className="text-[15.5px] font-bold text-verde leading-snug mb-2.5">{f.q}</h3>
                    <p className="text-[14px] leading-[1.75] text-tinta-70">{f.a}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── CTA FINAL ───────── */}
        <section className="bg-verde relative overflow-hidden py-16 sm:py-20 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_120%,#2D5238,transparent_65%)] opacity-50 pointer-events-none" />
          <div className="relative z-10 max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16">
            <AnimateIn className="flex flex-col items-center text-center">
              <h2 className="text-[clamp(28px,4.5vw,52px)] leading-[1.02] tracking-[-0.03em] text-menta max-w-[720px] mb-5">
                {t('final_title')}
              </h2>
              <p className="text-menta-fraca text-[16px] leading-[1.75] max-w-[520px] mb-9">{t('final_sub')}</p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button variant="primary" size="lg" href={wa} target="_blank" rel="noopener noreferrer" className="font-bold">
                  {t('final_cta')}
                  <ArrowIcon />
                </Button>
                {/* Quem chegou aqui sem estar pronto para pagar tem para onde
                    ir: a auditoria é gratuita e mostra o retrato antes. */}
                <Link
                  href={`/${locale}/consultoria`}
                  className="inline-flex items-center gap-2 text-[14px] font-medium text-menta-fraca hover:text-menta border-b border-verde-borda hover:border-menta pb-0.5 transition-colors"
                >
                  {tNav('consultoria')}
                </Link>
              </div>

              <p className="text-[12.5px] text-menta-fraca mt-6">{t('final_note')}</p>
            </AnimateIn>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
