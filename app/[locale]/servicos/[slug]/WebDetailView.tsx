'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { cn } from '@/lib/utils'
import { produtos, type SubService, type ServiceData } from '@/data/services'
import { getLocalizedSubService } from '@/data/services-content'
import { Navbar } from '@/components/sections/Navbar'
import { SkipLink } from '@/components/ui/SkipLink'
import { Footer } from '@/components/sections/Footer'
import { AnimateIn, AnimateStagger, itemVariants } from '@/components/ui/AnimateIn'
import { GradeDoRegistro } from '@/components/ui/SlotMidia'
import { grade } from '@/data/midia'

const WA_BASE = 'https://wa.me/+5585991043067?text='

/**
 * A página de um produto de WEB: website institucional e landing page.
 *
 * Terceira view da mesma rota, pela mesma razão das outras duas. Os produtos
 * de produção vendem uma entrega e `ServiceDetailView` responde o que a pessoa
 * recebe; os recorrentes vendem uma relação e `RecorrenteDetailView` responde
 * como ela funciona. Estes dois vendem um projeto que a Explore executa
 * sozinha, e quem compra chega com perguntas que nenhuma das outras responde:
 * quando começa, o que eu preciso mandar, o que acontece se eu não mandar
 * nada, quanto custa manter, e de quem é o domínio no fim.
 *
 * Metade desta página não tem equivalente nas irmãs, então é estrutura, não
 * texto condicional dentro da outra.
 *
 * `pillar === 'web'` decide, e não uma lista de slugs, no mesmo espírito do
 * `period === 'monthly'` que roteia os recorrentes. Um terceiro produto de web
 * cai aqui só por nascer com o pilar certo em `services.ts`.
 *
 * O que é comum aos dois (como começa, material, manutenção, domínio) vem de
 * `web.*`. O que é de cada um vem de `web.produtos.<slug>`, e os blocos que só
 * existem num deles moram lá dentro: o bônus de sistema visual, o caminho de
 * reserva e o argumento do blog são do site e não da landing, e a ausência da
 * chave é o que decide, sem bandeira booleana em arquivo de tradução.
 */

interface Props {
  sub: SubService
  parentService: ServiceData
  locale: string
}

type Etapa = { title: string; desc: string }
type Plano = { nome: string; preco: string; recomendado?: boolean; itens: string[] }
type BlocoBonus = { eyebrow: string; title: string; desc: string; itens: string[] }
type BlocoReserva = { eyebrow: string; title: string; desc: string; credibilidade: string }
type BlocoBlog = { eyebrow: string; title: string; desc: string }

type DoProduto = {
  hero_prazo: string
  troca_title: string
  troca_desc: string
  troca_cta: string
  planos: Plano[]
  bonus?: BlocoBonus
  reserva?: BlocoReserva
  blog?: BlocoBlog
}

function IconeWhatsApp({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function Check({ tom = 'claro' }: { tom?: 'claro' | 'escuro' }) {
  return (
    <span className={cn('shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5',
      tom === 'claro' ? 'bg-verde-medio/15' : 'bg-verde-luz/15')}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={tom === 'claro' ? '#2F5E4A' : '#A9CDB2'} strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M2 5l2 2 4-4" /></svg>
    </span>
  )
}

export function WebDetailView({ sub, parentService, locale }: Props) {
  const t = useTranslations('web')
  const tDetail = useTranslations('service_detail')
  const tContact = useTranslations('contact')
  const tServicos = useTranslations('servicos')
  const currentLocale = useLocale()

  const c = getLocalizedSubService(currentLocale, sub.slug) ?? {
    name: sub.name,
    tagline: sub.tagline,
    description: sub.description,
    forWhom: sub.forWhom,
    features: sub.features,
    result: sub.result,
  }

  const doProduto = t.raw(`produtos.${sub.slug}`) as DoProduto
  const etapas = t.raw('inicio_etapas') as Etapa[]
  const contaItens = t.raw('conta_itens') as string[]
  const naocontaItens = t.raw('naoconta_itens') as string[]

  // O par. São exatamente dois produtos de web, e o irmão é o outro: descobrir
  // por pilar em vez de escrever o slug mantém o bloco de troca correto se um
  // terceiro entrar, e evita link para a própria página.
  const irmao = produtos.find(p => p.pillar === 'web' && p.slug !== sub.slug)
  const irmaoNome = irmao ? (getLocalizedSubService(currentLocale, irmao.slug)?.name ?? irmao.name) : null

  const temGrade = Boolean(grade(sub.slug))

  const waUrl = WA_BASE + encodeURIComponent(tContact('service_inquiry', { service: c.name }))

  return (
    <>
      <SkipLink />
      <Navbar />

      <main id="conteudo" tabIndex={-1}>

        {/* ═══════════════════════ HERO ═══════════════════════ */}
        <section className={cn('relative flex flex-col justify-end overflow-hidden bg-gradient-to-br', parentService.gradient)}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_30%_20%,rgba(255,255,255,0.04),transparent)]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '200px' }} />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0D1A12] to-transparent" />

          <div className="relative z-10 max-w-screen-xl mx-auto w-full px-6 sm:px-10 lg:px-16 pt-36 pb-16">
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-8">
              <Link
                href={`/${locale}/servicos#${sub.grupo}`}
                className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-menta-fraca hover:text-menta transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M12 7H2M6 3L2 7l4 4" /></svg>
                {tServicos(`grupo_${sub.grupo}`)}
              </Link>
            </motion.div>

            {/* O prazo fica no alto. É a primeira pergunta de quem vai contratar
                projeto, e escondido no rodapé vira surpresa na proposta. */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="flex flex-wrap items-center gap-2 mb-5">
              <span className="text-[9.5px] font-bold tracking-[0.2em] uppercase bg-verde-luz text-verde px-3 py-1.5 rounded-full">
                {tServicos('etiqueta_pontual')}
              </span>
              <span className="text-[9.5px] font-bold tracking-[0.2em] uppercase border border-verde-borda text-menta-fraca px-3 py-1.5 rounded-full">
                {t('prazo_label')}: {doProduto.hero_prazo}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.33, 1, 0.68, 1] }}
              className="text-[clamp(40px,7vw,92px)] leading-[0.94] tracking-[-0.04em] text-menta mb-5 max-w-[900px]"
            >
              {c.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.38 }}
              className="text-[17px] leading-[1.7] text-menta-fraca max-w-[620px] mb-9"
            >
              {c.tagline}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-sol text-verde font-bold px-7 py-3.5 rounded-full hover:bg-sol-forte hover:-translate-y-0.5 transition-all duration-200 text-[14px]">
                <IconeWhatsApp />
                {tDetail('hire_whatsapp')}
              </a>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ O QUE É + PARA QUEM ═══════════════ */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
              <AnimateIn className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px bg-verde-medio" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-medio">{tDetail('about_service')}</span>
                </div>
                <p className="text-[19px] text-tinta-70 leading-[1.85]">{c.description}</p>
              </AnimateIn>
              <AnimateIn delay={0.1} className="lg:col-span-5">
                <div className="bg-menta-clara rounded-2xl p-8 border border-tinta-16">
                  <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-tinta-70 mb-5">{tDetail('for_whom')}</div>
                  <ul className="flex flex-col gap-4">
                    {c.forWhom.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check />
                        <span className="text-[14px] text-tinta-70 leading-[1.55]">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateIn>
            </div>

            {/* ── A TROCA ──
                Alto de propósito. Landing e site respondem perguntas de pessoas
                diferentes, e quem caiu na errada tem que descobrir isso na
                segunda dobra, não depois de ler a página inteira. */}
            {irmao && irmaoNome && (
              <AnimateIn className="mt-16">
                <div className="rounded-2xl border border-tinta-16 bg-menta-clara p-7 sm:p-9 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                  <div className="flex-1">
                    <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-verde-medio mb-2.5">{t('troca_eyebrow')}</div>
                    <h2 className="text-[19px] sm:text-[21px] font-bold leading-snug tracking-[-0.015em] text-verde mb-2">{doProduto.troca_title}</h2>
                    <p className="text-[14.5px] leading-[1.7] text-tinta-70 max-w-[640px]">{doProduto.troca_desc}</p>
                  </div>
                  <Link
                    href={`/${locale}/servicos/${irmao.slug}`}
                    className="shrink-0 inline-flex items-center gap-2 border border-verde-medio/45 text-verde-medio hover:bg-verde-medio hover:text-white font-bold px-6 py-3.5 rounded-full transition-all duration-200 text-[14px]"
                  >
                    {doProduto.troca_cta}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M2 7h10M8 3l4 4-4 4" /></svg>
                  </Link>
                </div>
              </AnimateIn>
            )}
          </div>
        </section>

        {/* ═══════════════ MÍDIA ═══════════════ */}
        {temGrade && (
          <section className="bg-white pb-20 lg:pb-28">
            <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
              <div className="border-t border-tinta-16 pt-14">
                <div className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-tinta-70 mb-6">{tDetail('media_label')}</div>
                <GradeDoRegistro chave={sub.slug} rotulo={tServicos('trilho_label', { produto: c.name })} />
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════ O QUE ENTRA ═══════════════ */}
        <section className="bg-menta-clara py-20 lg:py-28">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
            <AnimateIn className="mb-12">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-5 h-px bg-verde-medio" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-medio">{t('entrega_eyebrow')}</span>
              </div>
              <h2 className="text-[clamp(26px,3.5vw,40px)] text-verde tracking-tight">{t('entrega_title')}</h2>
            </AnimateIn>
            <AnimateStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {c.features.map((f, i) => (
                <motion.div key={i} variants={itemVariants}
                  className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-tinta-16 hover:border-verde-medio/45 hover:shadow-sm transition-all duration-300">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-verde-medio/15 flex items-center justify-center mt-0.5">
                    <span className="text-[11px] font-bold text-verde-medio">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="text-[14px] text-tinta-70 leading-[1.6]">{f}</p>
                </motion.div>
              ))}
            </AnimateStagger>
          </div>
        </section>

        {/* ═══════════════ COMO COMEÇA + MATERIAL ═══════════════ */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
            <AnimateIn className="mb-12 max-w-[640px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-5 h-px bg-verde-medio" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-medio">{t('inicio_eyebrow')}</span>
              </div>
              <h2 className="text-[clamp(26px,3.5vw,40px)] leading-[1.08] tracking-[-0.025em] text-verde mb-4">{t('inicio_title')}</h2>
              <p className="text-[15.5px] leading-[1.75] text-tinta-70">{t('inicio_sub')}</p>
            </AnimateIn>

            <AnimateStagger className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
              {etapas.map((e, i) => (
                <motion.div key={i} variants={itemVariants}
                  className="flex flex-col p-6 rounded-2xl bg-menta-clara border border-tinta-16">
                  <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-verde-medio mb-3">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="text-[15.5px] font-bold leading-tight text-verde mb-2">{e.title}</h3>
                  <p className="text-[13.5px] leading-[1.6] text-tinta-70">{e.desc}</p>
                </motion.div>
              ))}
            </AnimateStagger>

            {/* O bloco que tira o peso das costas do cliente. Escrito como
                diferencial e não como cláusula: dono de pousada não deixa de
                mandar material por má vontade, deixa por falta de tempo, e
                saber que o projeto anda sem ele é alívio de verdade. */}
            <AnimateIn>
              <div className="rounded-2xl bg-verde p-8 sm:p-11 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,#2D5238,transparent_70%)] opacity-40 pointer-events-none" />
                <div className="relative z-10 max-w-[760px]">
                  <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-verde-luz mb-3">{t('material_eyebrow')}</div>
                  <h3 className="text-[clamp(21px,2.8vw,30px)] leading-[1.15] tracking-[-0.02em] text-menta mb-5">{t('material_title')}</h3>
                  <p className="text-[15.5px] leading-[1.8] text-menta-fraca mb-4">{t('material_p1')}</p>
                  <p className="text-[15.5px] leading-[1.8] text-menta-fraca">{t('material_p2')}</p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ═══════════════ BÔNUS DE SISTEMA VISUAL ═══════════════
            Só existe no site. A landing não recebe, e a ausência da chave em
            `web.produtos.landing-page` é o que decide. */}
        {doProduto.bonus && (
          <section className="bg-menta-clara py-20 lg:py-28">
            <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                <AnimateIn className="lg:col-span-7">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-5 h-px bg-verde-medio" />
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-medio">{doProduto.bonus.eyebrow}</span>
                  </div>
                  <h2 className="text-[clamp(26px,3.5vw,40px)] leading-[1.08] tracking-[-0.025em] text-verde mb-5">{doProduto.bonus.title}</h2>
                  <p className="text-[15.5px] leading-[1.8] text-tinta-70">{doProduto.bonus.desc}</p>
                </AnimateIn>
                <AnimateIn delay={0.1} className="lg:col-span-5">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                    {doProduto.bonus.itens.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 rounded-2xl border border-tinta-16 bg-white p-5">
                        <Check />
                        <span className="text-[14.5px] leading-[1.55] text-tinta-70">{b}</span>
                      </li>
                    ))}
                  </ul>
                </AnimateIn>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════ O CAMINHO DA RESERVA ═══════════════
            Também só no site. Sem logo de terceiro e sem a palavra parceiro:
            não há relação formal, e citar sistema com que já se trabalhou é
            fato; chamar de parceria não seria. */}
        {doProduto.reserva && (
          <section className="bg-verde py-20 lg:py-28 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_75%_at_15%_50%,#2D5238,transparent_70%)] opacity-40 pointer-events-none" />
            <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
              <AnimateIn className="max-w-[720px]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-5 h-px bg-verde-luz" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-luz">{doProduto.reserva.eyebrow}</span>
                </div>
                <h2 className="text-[clamp(26px,3.6vw,42px)] leading-[1.06] tracking-[-0.03em] text-menta mb-5">{doProduto.reserva.title}</h2>
                <p className="text-[16px] leading-[1.8] text-menta-fraca mb-8">{doProduto.reserva.desc}</p>
              </AnimateIn>
              <AnimateIn delay={0.1}>
                <div className="rounded-2xl border border-verde-linha bg-verde-card p-7 sm:p-9 max-w-[860px]">
                  <p className="text-[16.5px] leading-[1.75] text-menta">{doProduto.reserva.credibilidade}</p>
                </div>
              </AnimateIn>
            </div>
          </section>
        )}

        {/* ═══════════════ MANUTENÇÃO ═══════════════
            A única exceção à regra de preço fora da /plano-de-acao. Valor baixo
            e visível em serviço pequeno gera confiança; o valor do projeto
            continua fora, porque depende do diagnóstico, e a nota abaixo dos
            cartões diz isso com todas as letras para ninguém ler R$ 99,90 como
            o preço do site. */}
        <section className="bg-menta-clara py-20 lg:py-28">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
            <AnimateIn className="mb-12 max-w-[640px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-5 h-px bg-verde-medio" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-medio">{t('manutencao_eyebrow')}</span>
              </div>
              <h2 className="text-[clamp(26px,3.5vw,40px)] leading-[1.08] tracking-[-0.025em] text-verde">{t('manutencao_title')}</h2>
            </AnimateIn>

            <AnimateStagger className={cn('grid gap-4 mb-6', doProduto.planos.length > 1 ? 'md:grid-cols-2 max-w-[880px]' : 'max-w-[460px]')}>
              {doProduto.planos.map((p, i) => (
                <motion.div key={i} variants={itemVariants}
                  className={cn('relative flex flex-col rounded-2xl p-7 sm:p-8 border',
                    p.recomendado ? 'bg-white border-verde-medio/45 shadow-sm' : 'bg-white border-tinta-16')}>
                  {p.recomendado && (
                    <span className="absolute -top-2.5 left-7 text-[9px] font-bold tracking-[0.18em] uppercase bg-sol text-verde px-3 py-1 rounded-full">
                      {t('recomendado')}
                    </span>
                  )}
                  <h3 className="text-[16px] font-bold text-verde mb-3">{p.nome}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-[clamp(30px,4vw,40px)] font-bold tracking-[-0.03em] text-verde">{p.preco}</span>
                    <span className="text-[13px] font-bold text-tinta-70">{t('manutencao_mes')}</span>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {p.itens.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <Check />
                        <span className="text-[14px] leading-[1.55] text-tinta-70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </AnimateStagger>

            <AnimateIn className="mb-14">
              <p className="text-[13.5px] leading-[1.7] text-tinta-70 max-w-[640px]">{t('manutencao_preco_nota')}</p>
            </AnimateIn>

            {/* O que conta e o que não conta, escrito antes de virar discussão.
                Duas colunas lado a lado porque a comparação é o conteúdo. */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <AnimateIn>
                <div className="h-full rounded-2xl bg-white border border-tinta-16 p-7">
                  <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-verde-medio mb-5">{t('conta_label')}</div>
                  <ul className="flex flex-col gap-3">
                    {contaItens.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check />
                        <span className="text-[14px] leading-[1.55] text-tinta-70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateIn>
              <AnimateIn delay={0.08}>
                <div className="h-full rounded-2xl bg-white border border-tinta-16 p-7">
                  <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-tinta-70 mb-5">{t('naoconta_label')}</div>
                  <ul className="flex flex-col gap-3">
                    {naocontaItens.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-tinta-16 flex items-center justify-center mt-0.5">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="#1B3025" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M1 4h6" /></svg>
                        </span>
                        <span className="text-[14px] leading-[1.55] text-tinta-70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateIn>
            </div>

            <AnimateIn>
              <p className="text-[13.5px] leading-[1.7] text-tinta-70 max-w-[640px] mb-3">{t('conta_nota')}</p>
              <p className="text-[13.5px] leading-[1.7] text-tinta-70 max-w-[640px]">{t('sem_ecommerce')}</p>
            </AnimateIn>

            {/* O argumento do blog. Só onde existe o nível que o inclui: numa
                landing de campanha, blog não faz sentido nenhum. */}
            {doProduto.blog && (
              <AnimateIn className="mt-14">
                <div className="rounded-2xl border border-tinta-16 bg-white p-7 sm:p-9 max-w-[860px]">
                  <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-verde-medio mb-3">{doProduto.blog.eyebrow}</div>
                  <h3 className="text-[19px] sm:text-[22px] font-bold leading-snug tracking-[-0.015em] text-verde mb-3">{doProduto.blog.title}</h3>
                  <p className="text-[14.5px] leading-[1.75] text-tinta-70">{doProduto.blog.desc}</p>
                </div>
              </AnimateIn>
            )}
          </div>
        </section>

        {/* ═══════════════ O DOMÍNIO ═══════════════
            Dito antes de assinar, e não na hora da renovação. */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
              <AnimateIn className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-px bg-verde-medio" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-medio">{t('dominio_eyebrow')}</span>
                </div>
                <h2 className="text-[clamp(24px,3.2vw,36px)] leading-[1.1] tracking-[-0.025em] text-verde">{t('dominio_title')}</h2>
              </AnimateIn>
              <AnimateIn delay={0.1} className="lg:col-span-7">
                <p className="text-[16px] leading-[1.85] text-tinta-70 mb-5">{t('dominio_p1')}</p>
                <p className="text-[16px] leading-[1.85] text-tinta-70">{t('dominio_p2')}</p>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* ═══════════════ RESULTADO + CTA ═══════════════ */}
        <section className="bg-verde py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_100%_50%,#2D5238,transparent_70%)] opacity-30 pointer-events-none" />
          <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
            <AnimateIn>
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-verde-luz/75 mb-4">{tDetail('expected_result')}</div>
              <div className="text-[clamp(22px,3.5vw,42px)] font-semibold text-verde-luz leading-tight mb-12 max-w-[680px]">
                {c.result}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={waUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-sol text-verde font-bold px-8 py-4 rounded-full hover:bg-sol-forte hover:-translate-y-0.5 transition-all duration-200 text-[15px]">
                  <IconeWhatsApp size={18} />
                  {tDetail('want_service')}
                </a>
                <Link href={`/${locale}/servicos`}
                  className="inline-flex items-center gap-2 border border-verde-borda text-menta-fraca hover:text-menta hover:border-menta font-bold px-8 py-4 rounded-full transition-all duration-200 text-[15px]">
                  {tDetail('see_all_services')}
                </Link>
              </div>
            </AnimateIn>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
