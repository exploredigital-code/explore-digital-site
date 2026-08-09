'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Navbar }  from '@/components/sections/Navbar'
import { SkipLink } from '@/components/ui/SkipLink'
import { Footer }  from '@/components/sections/Footer'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { AnimateIn, AnimateStagger, itemVariants } from '@/components/ui/AnimateIn'
import { GradeDoRegistro } from '@/components/ui/SlotMidia'

const WHATSAPP = 'https://wa.me/+5585991043067'

// Um bloco só, sem separar fundadores do resto — a hierarquia visual saiu de
// propósito. Os parceiros de performance ficam à parte porque tocam as próprias
// agências, não porque estão acima ou abaixo de alguém.
const TEAM = [
  { name: 'João Teixeira',     photo: '/images/team/João.png',       roleKey: 'f1_role',  bioKey: 'f1_bio' },
  { name: 'Pablo Frias',       photo: '/images/team/Pablo.png',      roleKey: 'f2_role',  bioKey: 'f2_bio' },
  { name: 'Esperanza Governa', photo: '/images/team/Esperanza.png',  roleKey: 'ct1_role', bioKey: 'ct1_bio' },
  { name: 'David Marroni',     photo: '/images/team/David.png',      roleKey: 'ct2_role', bioKey: 'ct2_bio' },
] as const

// Parceiros tocam as próprias agências e entram nos projetos por frente.
const PERFORMANCE_PARTNERS = [
  { name: 'Winicius Moreira', photo: '/images/team/Winicius.png',     roleKey: 'pt1_role', bioKey: 'pt1_bio' },
  { name: 'Maya Sampaio',     photo: '/images/team/maya.jpg',         roleKey: 'pt2_role', bioKey: 'pt2_bio' },
] as const

const DESIGN_PARTNERS = [
  { name: 'Styven Elord',     photo: '/images/team/Styven.png',       roleKey: 'ct3_role', bioKey: 'ct3_bio' },
] as const

function MemberCard({ member, dark = false }: {
  member: { name: string; role: string; bio: string; photo: string }
  dark?: boolean
}) {
  return (
    <motion.div variants={itemVariants}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1',
        dark
          ? 'border border-white/[0.07] hover:border-g-mid/40 bg-white/[0.03] hover:bg-white/[0.05]'
          : 'border border-g-dark/8 hover:border-g-mid/35 bg-white hover:shadow-md'
      )}>
      {/* Foto quadrada */}
      <div className="relative aspect-square shrink-0 overflow-hidden">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      {/* Alturas fixas por linha: o cargo pode ocupar duas linhas e a bio até
          três, então cada faixa reserva o seu espaço. Sem isso, os cards ficam
          com alturas diferentes entre as seções. */}
      <div className="p-5 flex flex-col gap-1 flex-1">
        <div className={cn(
          'text-[9px] font-bold tracking-[0.18em] uppercase leading-[1.5] min-h-[2.7em]',
          dark ? 'text-g-mid' : 'text-g-mid/80'
        )}>
          {member.role}
        </div>
        <div className={cn('font-bold text-[16px] leading-tight', dark ? 'text-white' : 'text-g-dark')}>
          {member.name}
        </div>
        <p className={cn(
          'text-[13px] leading-[1.7] mt-1 min-h-[5.1em]',
          dark ? 'text-white/50' : 'text-g-dark/55'
        )}>
          {member.bio}
        </p>
      </div>
    </motion.div>
  )
}

export function SobreView() {
  const t = useTranslations('about_page')
  const locale = useLocale()

  const values = [
    { title: t('v1_title'), desc: t('v1_desc') },
    { title: t('v2_title'), desc: t('v2_desc') },
    { title: t('v3_title'), desc: t('v3_desc') },
  ]

  const build = (list: readonly { name: string; photo: string; roleKey: string; bioKey: string }[]) =>
    list.map(p => ({ name: p.name, photo: p.photo, role: t(p.roleKey), bio: t(p.bioKey) }))

  const team = build(TEAM)
  const performancePartners = build(PERFORMANCE_PARTNERS)
  const designPartners = build(DESIGN_PARTNERS)

  return (
    <>
      <SkipLink />
      <Navbar />

      <main id="conteudo">

      {/* ══ HERO ══ */}
      <section className="page-hero pt-36 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_-20%,#2D5238,transparent_70%)] opacity-50 pointer-events-none" />
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <AnimateIn>
            <SectionEyebrow>{t('eyebrow')}</SectionEyebrow>
            <h1 className="text-[clamp(36px,5.5vw,72px)] leading-[0.95] tracking-[-0.03em] text-white mt-2 mb-5 max-w-[700px]">
              {t('title')}
            </h1>
            <p className="text-g-light/60 text-[17px] leading-[1.7] max-w-[500px]">{t('sub')}</p>
          </AnimateIn>
        </div>
      </section>

      {/* ══ NOSSA HISTÓRIA — white ══ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24">
            <AnimateIn>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-5 h-px bg-g-mid shrink-0" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-mid">{t('our_history')}</span>
              </div>
              <p className="text-[18px] text-g-dark/65 leading-[1.85] mb-6">{t('story')}</p>
              <p className="text-[18px] text-g-dark/65 leading-[1.85]">{t('story2')}</p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <div className="relative rounded-3xl overflow-hidden bg-g-dark p-10 h-full min-h-[300px] flex flex-col justify-end">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_-20%,#2D5238,transparent)]" />
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '200px' }} />
                {/* Número atribuído a um cliente, não agregado.
                    "+30 marcas · 3 países · 5+ anos · 100%" saiu porque não é
                    auditável se um cliente pedir a fonte. */}
                <div className="relative z-10">
                  <div className="text-[clamp(56px,8vw,80px)] font-semibold text-verde-luz leading-none mb-2">+100%</div>
                  <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-verde-luz/35 leading-[1.5]">{t('years_expertise')}</div>
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    {[[t('stat_seguidores'), t('stat_brands')], ['3', t('stat_countries')], ['CE · RN', t('stat_focus')]].map(([v, l]) => (
                      <div key={l}>
                        <div className="text-[22px] font-semibold text-menta">{v}</div>
                        <div className="text-[10px] text-menta-fraca tracking-widest uppercase mt-0.5">{l}</div>
                      </div>
                    ))}
                  </div>

                  {/* Ano de fundação e clientes ativos ficam marcados como a
                      confirmar. Dava para estimar a partir do "5+ anos" que
                      estava no site antes, mas aquele número era justamente um
                      dos não auditáveis que tiramos. */}
                  <div className="mt-7 pt-6 border-t border-verde-linha grid grid-cols-2 gap-4">
                    {[t('dado_fundacao'), t('dado_clientes')].map(rotulo => (
                      <div key={rotulo}>
                        <div className="inline-flex items-center gap-1.5 text-[12px] font-medium text-verde-luz/45 border border-dashed border-verde-borda/50 rounded-full px-2.5 py-1">
                          {t('dados_pendente')}
                        </div>
                        <div className="text-[10px] text-menta-fraca tracking-widest uppercase mt-1.5">{rotulo}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ══ DE ONDE VIEMOS ══
          O mesmo argumento da home, e não por repetição: /sobre é onde quem
          está avaliando vem confirmar o que leu lá. Ter gerido hostel, pousada
          e escola de kite antes de virar agência é a única coisa que um
          concorrente de marketing hoteleiro não consegue copiar. */}
      <section className="bg-verde py-20 lg:py-28">
        <div className="max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-start">
            <AnimateIn>
              <SectionEyebrow>{t('estudio_eyebrow')}</SectionEyebrow>
              <h2 className="text-[clamp(28px,4.2vw,50px)] leading-[1.05] tracking-[-0.03em] text-menta mt-2 mb-7">
                {t('estudio_title')}{' '}
                <span className="text-verde-luz">{t('estudio_destaque')}</span>{' '}
                {t('estudio_fim')}
              </h2>
              <p className="text-menta-fraca text-[16px] leading-[1.8] max-w-[560px] mb-5">{t('estudio_p1')}</p>
              <p className="text-menta-fraca text-[16px] leading-[1.8] max-w-[560px]">{t('estudio_p2')}</p>
            </AnimateIn>

            <AnimateIn delay={0.1}>
              <GradeDoRegistro chave="sobre-origem" rotulo={t('estudio_eyebrow')} />
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ══ VALORES — g-pale ══ */}
      <section className="bg-g-pale py-24 lg:py-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateIn className="mb-12">
            <SectionEyebrow light>{t('values_eyebrow')}</SectionEyebrow>
            <h2 className="text-[clamp(26px,3.5vw,40px)] text-g-dark tracking-tight mt-2">{t('values_title')}</h2>
          </AnimateIn>
          <AnimateStagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <motion.div key={i} variants={itemVariants}
                className="p-8 rounded-2xl border border-g-dark/10 hover:border-g-mid/40 bg-white hover:shadow-sm transition-all duration-300 group">
                <div className="w-10 h-10 rounded-full bg-g-mid/12 flex items-center justify-center mb-6 group-hover:bg-g-mid/20 transition-colors">
                  <div className="w-3 h-3 rounded-full bg-g-mid" />
                </div>
                <h3 className="text-[17px] text-g-dark mb-3">{v.title}</h3>
                <p className="text-[14px] text-g-dark/50 leading-[1.7]">{v.desc}</p>
              </motion.div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* ══ TIME — bloco único, todo mundo do mesmo tamanho ══ */}
      <section className="bg-white py-24 lg:py-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateIn className="mb-12">
            <SectionEyebrow light>{t('team_eyebrow')}</SectionEyebrow>
            <h2 className="text-[clamp(26px,3.5vw,40px)] text-g-dark tracking-tight mt-2">{t('team_title')}</h2>
            <p className="text-g-dark/55 text-[15px] mt-3 max-w-[520px] leading-[1.7]">
              {t('team_desc')}
            </p>
          </AnimateIn>
          {/* Mesma contagem de colunas dos blocos de parceiros, para que todos
              os cards da página tenham exatamente a mesma largura. */}
          <AnimateStagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
            {team.map((member, i) => (
              <MemberCard key={i} member={member} dark={false} />
            ))}
          </AnimateStagger>

          {/* Convite para carreiras.
              Estava no fim da página, disputando a última dobra com o CTA
              comercial. Aqui, logo depois dos rostos, ele é uma linha e faz
              sentido narrativo: acabou de ver quem é o time. O fim da página
              fica só para a conversa comercial. */}
          <AnimateIn className="mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-t border-tinta-16">
              <p className="text-[14.5px] leading-[1.6] text-tinta-70 max-w-[520px]">
                {t('join_title')}
              </p>
              <Link
                href={`/${locale}/carreiras`}
                className="inline-flex items-center gap-2 shrink-0 text-[13.5px] font-bold text-verde border-b border-tinta-16 pb-0.5 hover:text-verde-medio hover:border-verde-medio transition-colors duration-200"
              >
                {t('join_button')}
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══ PARCEIROS DE PERFORMANCE — g-dark ══ */}
      <section className="bg-g-dark py-24 lg:py-32">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">

          {/* Parceiros de Performance */}
          <AnimateIn className="mb-12">
            <SectionEyebrow>{t('partners_eyebrow')}</SectionEyebrow>
            <h2 className="text-[clamp(26px,3.5vw,42px)] text-white tracking-tight mt-2 mb-3">{t('partners_title')}</h2>
            <p className="text-white/55 text-[15px] max-w-[560px] leading-[1.7]">{t('partners_desc')}</p>
          </AnimateIn>
          <AnimateStagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-20 items-stretch">
            {performancePartners.map((member, i) => (
              <MemberCard key={i} member={member} dark />
            ))}
          </AnimateStagger>

          {/* Parceiros de Design e Branding */}
          <AnimateIn className="mb-12">
            <SectionEyebrow>{t('design_eyebrow')}</SectionEyebrow>
            <h2 className="text-[clamp(26px,3.5vw,42px)] text-white tracking-tight mt-2 mb-3">{t('design_title')}</h2>
            <p className="text-white/55 text-[15px] max-w-[560px] leading-[1.7]">{t('design_desc')}</p>
          </AnimateIn>
          <AnimateStagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-16 items-stretch">
            {designPartners.map((member, i) => (
              <MemberCard key={i} member={member} dark />
            ))}
          </AnimateStagger>

          {/* CTA comercial — precisa vir antes do de vagas.
              Até aqui a única saída da página era "ver vagas abertas": quem
              chegava ao fim de /sobre avaliando contratar a agência só era
              convidado a se candidatar a uma vaga. */}
          <AnimateIn>
            <div className="rounded-2xl bg-g-mid/[0.09] border border-g-mid/25 p-10 lg:p-14 mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_100%_0%,#2D5238,transparent_65%)] opacity-45 pointer-events-none" />
              <div className="relative z-10 max-w-[620px]">
                <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-light/55 mb-4">
                  {t('cta_eyebrow')}
                </div>
                <h3 className="text-[clamp(24px,3.5vw,40px)] leading-[1.05] tracking-[-0.025em] text-white mb-4">
                  {t('cta_title')}
                </h3>
                <p className="text-white/55 text-[15.5px] leading-[1.75] mb-8">
                  {t('cta_desc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/${locale}/consultoria`}
                    className="inline-flex items-center justify-center gap-2 bg-g-light text-g-dark font-bold px-7 py-3.5 rounded-full text-[14px] hover:bg-g-pale hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {t('cta_button')}
                  </Link>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 font-semibold px-7 py-3.5 rounded-full text-[14px] hover:border-white/40 hover:text-white hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {t('cta_secondary')}
                  </a>
                </div>
              </div>
            </div>
          </AnimateIn>

        </div>
      </section>
      </main>


      <Footer />
    </>
  )
}
