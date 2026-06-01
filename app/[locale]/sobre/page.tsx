'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Navbar }  from '@/components/sections/Navbar'
import { Footer }  from '@/components/sections/Footer'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { AnimateIn, AnimateStagger, itemVariants } from '@/components/ui/AnimateIn'

const WHATSAPP = 'https://wa.me/55859910430670'

const founders = [
  {
    name: 'João Teixeira',
    role: 'Co-fundador · Diretor Criativo',
    bio: 'Liderança criativa da equipe de conteúdo da Explore Digital. Especialista em estratégia, posicionamento digital e construção de marcas digitais.',
    photo: '/images/team/João.png',
  },
  {
    name: 'Pablo Frias',
    role: 'Co-fundador · Diretor de Vendas',
    bio: 'Responsável pelo crescimento comercial e pelo relacionamento com os clientes da Explore Digital. Especialista em estratégia de negócios, expansão de mercado e construção de parcerias de longo prazo.',
    photo: '/images/team/Pablo.png',
  },
]

const creativeTeam = [
  {
    name: 'Esperanza Governa',
    role: 'Conteúdo & Storytelling',
    bio: 'Criação de conteúdo estratégico, storytelling e produção visual para as marcas que atendemos.',
    photo: '/images/team/Esperanza.png',
  },
  {
    name: 'David Marroni',
    role: 'Captação & Edição',
    bio: 'Captação, edição e storytelling visual. Especialista em conteúdo para redes sociais.',
    photo: '/images/team/David.png',
  },
  {
    name: 'Styven Lord',
    role: 'Design & Branding',
    bio: 'Designer especialista em branding e marcas que crescem no digital.',
    photo: '/images/team/Styven.png',
  },
]

const performanceTeam = [
  {
    name: 'Winicius Moreira',
    role: 'Performance & Tráfego',
    bio: 'Gestão de tráfego pago no Google e Meta. Focado em ROI e geração de leads qualificados.',
    photo: '/images/team/Winicius.png',
  },
]

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
      {/* Info — altura fixa para padronizar todos os cards */}
      <div className="p-5 flex flex-col gap-1 flex-1">
        <div className={cn('text-[9px] font-bold tracking-[0.18em] uppercase', dark ? 'text-g-mid' : 'text-g-mid/80')}>
          {member.role}
        </div>
        <div className={cn('font-bold text-[16px]', dark ? 'text-white' : 'text-g-dark')}>
          {member.name}
        </div>
        <p className={cn('text-[13px] leading-[1.7] mt-1', dark ? 'text-white/50' : 'text-g-dark/55')}>
          {member.bio}
        </p>
      </div>
    </motion.div>
  )
}

export default function SobrePage() {
  const t = useTranslations('about_page')
  const locale = useLocale()

  const values = [
    { title: t('v1_title'), desc: t('v1_desc') },
    { title: t('v2_title'), desc: t('v2_desc') },
    { title: t('v3_title'), desc: t('v3_desc') },
  ]

  return (
    <>
      <Navbar />

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
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-mid">Nossa História</span>
              </div>
              <p className="text-[18px] text-g-dark/65 leading-[1.85] mb-6">{t('story')}</p>
              <p className="text-[18px] text-g-dark/65 leading-[1.85]">{t('story2')}</p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <div className="relative rounded-3xl overflow-hidden bg-g-dark p-10 h-full min-h-[300px] flex flex-col justify-end">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_-20%,#2D5238,transparent)]" />
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '200px' }} />
                <div className="relative z-10">
                  <div className="text-[clamp(56px,8vw,80px)] font-semibold text-g-light leading-none mb-2">5+</div>
                  <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-g-light/35">Anos de expertise</div>
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    {[['+30', 'Marcas'], ['3', 'Países'], ['100%', 'Foco']].map(([v, l]) => (
                      <div key={l}>
                        <div className="text-[22px] font-semibold text-white">{v}</div>
                        <div className="text-[10px] text-white/45 tracking-widest uppercase mt-0.5">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ══ VALORES — g-pale ══ */}
      <section className="bg-g-pale py-24 lg:py-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateIn className="mb-12">
            <SectionEyebrow light>{t('values_eyebrow')}</SectionEyebrow>
            <h2 className="text-[clamp(26px,3.5vw,40px)] text-g-dark tracking-tight mt-2">O que nos move todos os dias.</h2>
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

      {/* ══ FUNDADORES — white ══ */}
      <section className="bg-white py-24 lg:py-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateIn className="mb-12">
            <SectionEyebrow light>Os Fundadores</SectionEyebrow>
            <h2 className="text-[clamp(26px,3.5vw,40px)] text-g-dark tracking-tight mt-2">Quem está por trás da Explore.</h2>
            <p className="text-g-dark/55 text-[15px] mt-3 max-w-[480px] leading-[1.7]">
              A Explore Digital foi fundada por pessoas que vieram do setor e entendem, de dentro, o que marcas de hotelaria, experiências e real estate precisam.
            </p>
          </AnimateIn>
          <AnimateStagger className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl items-stretch">
            {founders.map((member, i) => (
              <MemberCard key={i} member={member} dark={false} />
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* ══ TIME CRIATIVO — g-dark ══ */}
      <section className="bg-g-dark py-24 lg:py-32">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">

          {/* Time Criativo */}
          <AnimateIn className="mb-12">
            <SectionEyebrow>Time Criativo</SectionEyebrow>
            <h2 className="text-[clamp(26px,3.5vw,42px)] text-white tracking-tight mt-2 mb-3">Os criadores por trás das marcas.</h2>
            <p className="text-white/55 text-[15px] max-w-[460px]">Design, conteúdo e storytelling visual que transformam marcas em referências.</p>
          </AnimateIn>
          <AnimateStagger className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16 items-stretch">
            {creativeTeam.map((member, i) => (
              <MemberCard key={i} member={member} dark />
            ))}
          </AnimateStagger>

          {/* Time de Performance */}
          <AnimateIn className="mb-12">
            <SectionEyebrow>Time de Performance</SectionEyebrow>
            <h2 className="text-[clamp(26px,3.5vw,42px)] text-white tracking-tight mt-2 mb-3">Resultados mensuráveis. Sempre.</h2>
            <p className="text-white/55 text-[15px] max-w-[460px]">Especialistas em tráfego pago que entendem a linguagem do seu setor.</p>
          </AnimateIn>
          <AnimateStagger className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16 items-stretch">
            {performanceTeam.map((member, i) => (
              <MemberCard key={i} member={member} dark />
            ))}
          </AnimateStagger>

          {/* CTA vagas */}
          <AnimateIn>
            <div className="rounded-2xl bg-[#0D1A12] border border-white/[0.06] p-10 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_0%_50%,#2D5238,transparent)] opacity-35" />
              <div className="relative z-10">
                <div className="text-[11px] font-bold tracking-[0.18em] uppercase text-g-light/45 mb-3">Faça parte do time</div>
                <h3 className="text-[clamp(20px,2.5vw,30px)] text-white leading-tight max-w-[440px]">
                  Buscamos profissionais apaixonados pelo que fazem.
                </h3>
                <p className="text-white/45 text-[14px] mt-3 max-w-[400px]">
                  Temos vagas abertas para design, social media, tráfego pago, vendas e mais.
                </p>
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href={`/${locale}/vagas`}
                  className="inline-flex items-center gap-2 bg-g-light text-g-dark font-bold px-7 py-3.5 rounded-full hover:bg-g-pale hover:-translate-y-0.5 transition-all duration-200 text-[14px]"
                >
                  Ver vagas abertas →
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <Footer />
    </>
  )
}
