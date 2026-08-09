'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { cn } from '@/lib/utils'
import type { SubService, ServiceData } from '@/data/services'
import { getLocalizedSubService } from '@/data/services-content'
import { Navbar } from '@/components/sections/Navbar'
import { SkipLink } from '@/components/ui/SkipLink'
import { Footer } from '@/components/sections/Footer'
import { AnimateIn, AnimateStagger, itemVariants } from '@/components/ui/AnimateIn'
import { GradeDoRegistro } from '@/components/ui/SlotMidia'
import { grade } from '@/data/midia'

const WA_BASE = 'https://wa.me/+5585991043067?text='

/**
 * A página de um produto RECORRENTE.
 *
 * Os outros doze produtos vendem uma entrega, com começo e fim, e para eles
 * `ServiceDetailView` responde a pergunta certa: o que eu recebo. Estes dois
 * vendem uma relação que se repete todo mês, e a pergunta antes de assinar é
 * outra: por quanto tempo eu fico preso, com quem eu falo quando precisar, e
 * como a gente vai saber se está funcionando.
 *
 * Por isso é view própria e não um bloco condicional dentro da outra. A
 * diferença é de estrutura, não de texto: metade desta página não tem
 * equivalente na irmã.
 *
 * O que é comum aos dois recorrentes (prazo, grupo de WhatsApp, leitura de
 * resultado) vem de `recorrente.*`. O que é de cada um (ritmo do mês, verba,
 * volume) vem de `recorrente.produtos.<slug>`, casado pelo slug, no mesmo
 * padrão do resto do site. Nada disso entra em `services.ts`, que já carrega
 * a duplicação mais cara do projeto.
 */

interface Props {
  sub: SubService
  parentService: ServiceData
  locale: string
}

type Etapa = { quando: string; title: string; desc: string }
type Bloco = { title: string; desc: string }

function IconeWhatsApp({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function RecorrenteDetailView({ sub, parentService, locale }: Props) {
  const t = useTranslations('recorrente')
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

  // O bloco do produto. `t.raw` porque são listas de objetos; nenhuma delas
  // tem placeholder, então não passa perto do problema de ICU que já mordeu
  // este código duas vezes.
  const doProduto = t.raw(`produtos.${sub.slug}`) as {
    ritmo_title: string
    ritmo_sub: string
    etapas: Etapa[]
    blocos: Bloco[]
  }
  const grupoItens = t.raw('grupo_itens') as string[]
  const medidoItens = t.raw('medido_itens') as string[]

  const temGrade = Boolean(grade(sub.slug))

  const waUrl = WA_BASE + encodeURIComponent(tContact('service_inquiry', { service: c.name }))

  return (
    <>
      <SkipLink />
      <Navbar />

      <main id="conteudo">

        {/* ═══════════════════════ HERO ═══════════════════════ */}
        <section className={cn('relative flex flex-col justify-end overflow-hidden bg-gradient-to-br', parentService.gradient)}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_30%_20%,rgba(255,255,255,0.04),transparent)]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '200px' }} />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0D1A12] to-transparent" />

          <div className="relative z-10 max-w-screen-xl mx-auto w-full px-6 sm:px-10 lg:px-16 pt-36 pb-16">
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-8">
              <Link
                href={`/${locale}/servicos#mensal`}
                className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-menta-fraca hover:text-menta transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M12 7H2M6 3L2 7l4 4" /></svg>
                {tServicos('grupo_mensal')}
              </Link>
            </motion.div>

            {/* As duas informações que mudam a leitura de tudo o que vem
                abaixo: isto se repete, e tem prazo. Ficam no alto e não no
                rodapé, porque escondidas viram surpresa na proposta. */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="flex flex-wrap items-center gap-2 mb-5">
              <span className="text-[9.5px] font-bold tracking-[0.2em] uppercase bg-verde-luz text-verde px-3 py-1.5 rounded-full">
                {t('etiqueta')}
              </span>
              <span className="text-[9.5px] font-bold tracking-[0.2em] uppercase border border-verde-borda text-menta-fraca px-3 py-1.5 rounded-full">
                {t('hero_prazo')}
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
                        <span className="shrink-0 w-5 h-5 rounded-full bg-verde-medio/15 flex items-center justify-center mt-0.5">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#2F5E4A" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M2 5l2 2 4-4" /></svg>
                        </span>
                        <span className="text-[14px] text-tinta-70 leading-[1.55]">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* ═══════════════ RITMO E PROCESSO ═══════════════
            No lugar da grade de "o que está incluído" da página irmã. Quem
            assina algo mensal quer saber o que acontece ao longo do mês, e
            não uma lista de itens sem tempo dentro. */}
        <section className="bg-menta-clara py-20 lg:py-28">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
            <AnimateIn className="mb-12 max-w-[640px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-5 h-px bg-verde-medio" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-medio">{t('ritmo_eyebrow')}</span>
              </div>
              <h2 className="text-[clamp(26px,3.5vw,40px)] leading-[1.08] tracking-[-0.025em] text-verde mb-4">{doProduto.ritmo_title}</h2>
              <p className="text-[15.5px] leading-[1.75] text-tinta-70">{doProduto.ritmo_sub}</p>
            </AnimateIn>

            <AnimateStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {doProduto.etapas.map((e, i) => (
                <motion.div key={i} variants={itemVariants}
                  className="flex flex-col p-6 rounded-2xl bg-white border border-tinta-16">
                  <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-verde-medio mb-3">{e.quando}</div>
                  <h3 className="text-[15.5px] font-bold leading-tight text-verde mb-2">{e.title}</h3>
                  <p className="text-[13.5px] leading-[1.6] text-tinta-70">{e.desc}</p>
                </motion.div>
              ))}
            </AnimateStagger>

            {/* O que a pessoa quer saber e ninguém escreve: volume, verba,
                canal, piso. Bloco corrido, um por assunto. */}
            <div className="grid md:grid-cols-2 gap-4">
              {doProduto.blocos.map((b, i) => (
                <AnimateIn key={i} delay={Math.min(i, 3) * 0.06}>
                  <div className="h-full p-7 rounded-2xl bg-white border border-tinta-16">
                    <h3 className="text-[17px] font-bold leading-snug tracking-[-0.01em] text-verde mb-2.5">{b.title}</h3>
                    <p className="text-[14px] leading-[1.7] text-tinta-70">{b.desc}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ O GRUPO DE WHATSAPP ═══════════════
            Destacado nas duas páginas, sobre fundo escuro. É a resposta
            direta à objeção mais comum do setor. */}
        <section className="bg-verde py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_75%_at_15%_50%,#2D5238,transparent_70%)] opacity-40 pointer-events-none" />
          <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <AnimateIn>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-5 h-px bg-verde-luz" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-luz">{t('grupo_eyebrow')}</span>
                </div>
                <h2 className="text-[clamp(26px,3.6vw,42px)] leading-[1.06] tracking-[-0.03em] text-menta mb-5">{t('grupo_title')}</h2>
                <p className="text-[16px] leading-[1.8] text-menta-fraca">{t('grupo_desc')}</p>
              </AnimateIn>

              <AnimateIn delay={0.1}>
                <ul className="flex flex-col gap-3">
                  {grupoItens.map((g, i) => (
                    <li key={i} className="flex items-start gap-3.5 rounded-2xl border border-verde-linha bg-verde-card p-5">
                      <span className="shrink-0 mt-0.5 text-verde-luz">
                        <IconeWhatsApp size={18} />
                      </span>
                      <span className="text-[14.5px] leading-[1.6] text-menta-fraca">{g}</span>
                    </li>
                  ))}
                </ul>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* ═══════════════ O PRAZO ═══════════════
            Argumento, não cláusula de rodapé. */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
              <AnimateIn className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-5 h-px bg-verde-medio" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-medio">{t('prazo_eyebrow')}</span>
                </div>
                <h2 className="text-[clamp(26px,3.4vw,40px)] leading-[1.08] tracking-[-0.025em] text-verde">{t('prazo_title')}</h2>
              </AnimateIn>
              <AnimateIn delay={0.08} className="lg:col-span-7">
                <p className="text-[18px] leading-[1.8] text-verde font-bold mb-5">{t('prazo_p1')}</p>
                <p className="text-[15.5px] leading-[1.8] text-tinta-70 mb-4">{t('prazo_p2')}</p>
                <p className="text-[15.5px] leading-[1.8] text-tinta-70">{t('prazo_p3')}</p>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* ═══════════════ COMO O RESULTADO É LIDO ═══════════════ */}
        <section className="bg-menta-clara py-20 lg:py-28">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
            <AnimateIn className="mb-10 max-w-[640px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-5 h-px bg-verde-medio" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-verde-medio">{t('resultado_eyebrow')}</span>
              </div>
              <h2 className="text-[clamp(26px,3.5vw,40px)] leading-[1.08] tracking-[-0.025em] text-verde">{t('resultado_title')}</h2>
            </AnimateIn>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <AnimateIn>
                <div className="h-full p-7 rounded-2xl bg-white border border-tinta-16">
                  <div className="text-[10.5px] font-bold tracking-[0.16em] uppercase text-verde-medio mb-4">{t('medido_label')}</div>
                  <ul className="flex flex-col gap-3">
                    {medidoItens.map((m, i) => (
                      <li key={i} className="flex items-baseline gap-3">
                        <span className="text-[11px] font-bold tabular-nums text-verde-medio">{String(i + 1).padStart(2, '0')}</span>
                        <span className="text-[16px] leading-snug text-verde font-bold">{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateIn>
              <AnimateIn delay={0.08}>
                <div className="h-full p-7 rounded-2xl bg-white border border-tinta-16">
                  <div className="text-[10.5px] font-bold tracking-[0.16em] uppercase text-verde-medio mb-4">{t('percebido_label')}</div>
                  <p className="text-[15px] leading-[1.75] text-tinta-70">{t('percebido_desc')}</p>
                </div>
              </AnimateIn>
            </div>

            <AnimateIn>
              <p className="text-[14px] leading-[1.7] text-tinta-70 border-t border-tinta-16 pt-5">
                {t('sem_vaidade')}
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* ═══════════════ MÍDIA ═══════════════ */}
        {temGrade && (
          <section className="bg-white py-20 lg:py-24">
            <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
              <div className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-tinta-70 mb-6">{tDetail('media_label')}</div>
              <GradeDoRegistro chave={sub.slug} rotulo={tServicos('trilho_label', { produto: c.name })} />
            </div>
          </section>
        )}

        {/* ═══════════════ RESULTADO ESPERADO + CTA ═══════════════ */}
        <section className="bg-verde py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_100%_50%,#2D5238,transparent_70%)] opacity-30 pointer-events-none" />
          <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
            <AnimateIn>
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-verde-luz mb-4">{tDetail('expected_result')}</div>
              <div className="text-[clamp(22px,3.5vw,42px)] font-semibold text-verde-luz leading-tight mb-6 max-w-[620px]">
                {c.result}
              </div>
              <p className="text-[14px] leading-[1.7] text-menta-fraca max-w-[520px] mb-11">{t('diagnostico_nota')}</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href={waUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-sol text-verde font-bold px-8 py-4 rounded-full hover:bg-sol-forte hover:-translate-y-0.5 transition-all duration-200 text-[15px]">
                  <IconeWhatsApp size={18} />
                  {tDetail('want_service')}
                </a>
                <Link href={`/${locale}/servicos`}
                  className="inline-flex items-center justify-center gap-2 border border-verde-borda text-menta-fraca hover:text-menta hover:border-menta font-bold px-8 py-4 rounded-full transition-all duration-200 text-[15px]">
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
