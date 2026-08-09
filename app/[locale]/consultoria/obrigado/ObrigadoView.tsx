'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { projects } from '@/data/portfolio'

const WHATSAPP_NUMBER = '+5585991043067'
const WA_BASE = `https://wa.me/${WHATSAPP_NUMBER}?text=`
const EMAIL = 'agencia.exploredigital@gmail.com'
const WA_STORAGE_KEY = 'ed_consultoria_wa'

const NOISE_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`

type Step = { label: string; desc: string }

/**
 * Tipo de negócio do formulário para setor do portfólio.
 *
 * O formulário grava `tipo` no sessionStorage; aqui ele vira um case do mesmo
 * segmento para a pessoa ver enquanto o relatório não sai. Sem upsell: é um
 * case, não uma oferta.
 *
 * Duas opções ficam de fora de propósito. Gastronomia só tem case oculto, e
 * "Outro" não tem segmento. Nos dois a seção cai para o link do portfólio
 * inteiro em vez de mostrar um case de segmento errado.
 */
const SETOR_POR_TIPO: Record<string, string> = {
  'Hotel / Resort': 'Hotelaria',
  'Pousada / Hostel': 'Hotelaria',
  'Beach Club': 'Beach Club',
  'Escola de esporte': 'Esporte & Experiência',
  'Experiências e passeios': 'Esporte & Experiência',
}

function caseDoSegmento(tipo: string | undefined) {
  const setor = tipo ? SETOR_POR_TIPO[tipo] : undefined
  if (!setor) return undefined
  return projects.find(p => !p.hidden && p.sector === setor)
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2,5 12,13 22,5" />
    </svg>
  )
}

export function ObrigadoView() {
  const t = useTranslations('consultoria')
  const locale = useLocale()
  const steps = t.raw('ty_steps') as Step[]
  // Os mesmos cinco itens da auditoria. Dizer O QUE a pessoa vai receber da
  // peso concreto sem criar promessa de tempo, que foi o que saiu do site.
  const relatorio = t.raw('relatorio_items') as { num: string; title: string; desc: string }[]

  const fallbackMessage = t('ty_email_subject')
  const [waUrl, setWaUrl] = useState(WA_BASE + encodeURIComponent(fallbackMessage))
  const [mailUrl, setMailUrl] = useState(
    `mailto:${EMAIL}?subject=${encodeURIComponent(t('ty_email_subject'))}`
  )
  const [blocked, setBlocked] = useState(false)
  const [tipo, setTipo] = useState<string | undefined>()

  // O case sai do tipo de negocio que a pessoa marcou no passo 1 do formulario.
  const destaque = caseDoSegmento(tipo)

  // O formulário grava link + texto puro antes de redirecionar para cá.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(WA_STORAGE_KEY)
      if (!raw) return
      const saved = JSON.parse(raw) as { url?: string; message?: string; blocked?: boolean; tipo?: string }
      if (saved.url) setWaUrl(saved.url)
      if (saved.tipo) setTipo(saved.tipo)
      if (saved.message) {
        // o mesmo conteúdo do WhatsApp, sem os asteriscos de negrito
        const body = saved.message.replace(/\*/g, '').replace(/_/g, '')
        setMailUrl(`mailto:${EMAIL}?subject=${encodeURIComponent(t('ty_email_subject'))}&body=${encodeURIComponent(body)}`)
      }
      setBlocked(Boolean(saved.blocked))
    } catch {
      /* storage indisponível — seguimos com os links padrão */
    }
  }, [t])

  return (
    <div className="min-h-screen bg-verde flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_25%,#2D5238,transparent_65%)] opacity-50 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: NOISE_BG, backgroundSize: '200px' }} />

      <header className="relative z-10 px-6 lg:px-14 py-6">
        <Link href={`/${locale}`} className="inline-flex items-center" aria-label="Explore Digital">
          <Image src="/images/logo.png" alt="Explore Digital" width={182} height={46} className="h-[38px] w-auto" priority />
        </Link>
      </header>

      {/* O <main> comeca aqui e nao na raiz. Antes ele embrulhava tambem o
          cabecalho e o rodape, e um <header>/<footer> dentro de <main> perde a
          condicao de landmark: o leitor de tela ficava sem banner e sem
          contentinfo nesta tela. */}
      <main id="conteudo" className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center max-w-[720px] mx-auto"
          >
            <div className="w-[72px] h-[72px] rounded-full bg-verde-luz/15 border border-verde-luz/30 flex items-center justify-center mb-7">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#A9CDB2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-luz/75 mb-4">{t('ty_eyebrow')}</div>

            <h1 className="text-[clamp(30px,4.5vw,54px)] leading-[1.05] tracking-[-0.03em] text-menta mb-5">
              {t('ty_title')}
            </h1>

            <p className="text-menta-fraca text-[15.5px] sm:text-[16px] leading-[1.75] mb-8">{t('ty_desc')}</p>

            {blocked && (
              <p className="text-[13px] text-menta-clara bg-verde-card border border-verde-linha rounded-2xl px-5 py-3 mb-8 leading-relaxed">
                {t('ty_wa_fallback')}
              </p>
            )}

            {/* dois caminhos, mesma informação */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-sol text-verde font-bold px-7 py-4 rounded-full hover:bg-sol-forte hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
              >
                <WhatsAppIcon />
                {t('ty_wa_button')}
              </a>
              <a
                href={mailUrl}
                className="inline-flex items-center justify-center gap-2.5 bg-white/[0.07] border border-verde-borda text-menta font-semibold px-7 py-4 rounded-full hover:bg-white/[0.12] hover:border-white/35 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
              >
                <MailIcon />
                {t('ty_email_button')}
              </a>
            </div>

            <p className="text-[13px] text-menta-fraca mt-5">{t('ty_channels_note')}</p>

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
              {steps.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex flex-col gap-2 p-5 rounded-2xl bg-white/[0.06] border border-white/[0.1] text-left"
                >
                  <span className="text-[11px] font-bold tracking-[0.15em] text-verde-luz/80">0{i + 1}</span>
                  <span className="text-[14px] font-bold text-menta leading-snug">{step.label}</span>
                  <span className="text-[13px] text-menta-fraca leading-[1.6]">{step.desc}</span>
                </motion.div>
              ))}
            </div>

            {/* O que vem no relatorio. Cinco leituras, as mesmas da
                auditoria. Dizer O QUE a pessoa vai receber da peso concreto
                sem criar promessa de tempo, que foi o que saiu do site. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 w-full text-left"
            >
              <div className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-verde-luz/75 mb-2">
                {t('ty_lista_eyebrow')}
              </div>
              <h2 className="text-[17px] font-bold text-menta leading-snug mb-5">{t('ty_lista_title')}</h2>

              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3.5">
                {relatorio.map(item => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="shrink-0 text-[11px] font-bold tabular-nums text-verde-luz/75 mt-[3px]">{item.num}</span>
                    <span className="min-w-0">
                      <span className="block text-[14.5px] font-bold text-menta leading-snug">{item.title}</span>
                      <span className="block text-[13px] leading-[1.6] text-menta-fraca mt-0.5">{item.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Enquanto o relatório não sai. Sem oferta: a consultoria paga só
                entra depois, por WhatsApp, quando o relatório for entregue.
                Vender antes de entregar faz a auditoria parecer isca. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-12 w-full text-left"
            >
              <div className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-verde-luz/75 mb-4">
                {t('ty_espera_eyebrow')}
              </div>

              {destaque ? (
                <Link
                  href={`/${locale}/portfolio/${destaque.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 p-6 rounded-2xl bg-white/[0.06] border border-white/[0.1] hover:bg-white/[0.09] hover:border-verde-borda transition-all duration-200"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-verde-luz/75 mb-1.5">{destaque.sector} · {destaque.location}</div>
                    <div className="text-[17px] font-bold text-menta leading-snug mb-1">{destaque.client}</div>
                    <p className="text-[13.5px] text-menta-fraca leading-[1.6]">{t('ty_espera_desc')}</p>
                  </div>
                  <span className="shrink-0 inline-flex items-center gap-2 text-[13px] font-bold text-verde-luz group-hover:text-menta transition-colors">
                    {t('ty_espera_cta')}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M2 7h10M8 3l4 4-4 4" />
                    </svg>
                  </span>
                </Link>
              ) : (
                /* Sem segmento casado, o portfólio inteiro é melhor resposta
                   que um case do setor errado. */
                <Link
                  href={`/${locale}/portfolio`}
                  className="inline-flex items-center gap-2 text-[14px] font-bold text-verde-luz hover:text-menta border-b border-verde-borda hover:border-menta pb-0.5 transition-colors"
                >
                  {t('ty_espera_todos')}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M2 7h10M8 3l4 4-4 4" />
                  </svg>
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/[0.08] py-6">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href={`/${locale}`} className="inline-flex items-center min-h-[44px] text-[13px] text-menta-fraca hover:text-menta transition-colors">
            ← {t('ty_home')}
          </Link>
          <a href={`mailto:${EMAIL}`} className="inline-flex items-center min-h-[44px] text-[13px] text-menta-fraca hover:text-menta transition-colors">
            {EMAIL}
          </a>
        </div>
      </footer>
    </div>
  )
}
