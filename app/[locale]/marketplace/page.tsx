'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { AnimateIn, AnimateStagger, itemVariants } from '@/components/ui/AnimateIn'

const WHATSAPP_BASE = 'https://wa.me/5585910430670?text='

function waLink(plan: string) {
  return WHATSAPP_BASE + encodeURIComponent(`Olá! Vim pelo site e tenho interesse no plano: ${plan}. Podemos conversar?`)
}

/* ─── SVG Stickers alinhados com a identidade visual ─── */
function IconSocial() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="21" cy="6" r="2.5"/><circle cx="7" cy="14" r="2.5"/><circle cx="21" cy="22" r="2.5"/>
      <line x1="9.35" y1="15.6" x2="18.68" y2="20.4"/><line x1="18.66" y1="7.6" x2="9.34" y2="12.4"/>
    </svg>
  )
}
function IconTraffic() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 20 9 13 15 16 25 8"/>
      <polyline points="20 8 25 8 25 13"/>
    </svg>
  )
}
function IconSites() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="22" height="16" rx="2"/>
      <line x1="10" y1="25" x2="18" y2="25"/>
      <line x1="14" y1="21" x2="14" y2="25"/>
      <line x1="3" y1="9" x2="25" y2="9"/>
      <circle cx="6.5" cy="7" r="0.8" fill="currentColor"/>
      <circle cx="9.5" cy="7" r="0.8" fill="currentColor"/>
    </svg>
  )
}
function IconSetup() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3L17 10H24L18.5 14.5L20.5 21.5L14 17.5L7.5 21.5L9.5 14.5L4 10H11L14 3Z"/>
    </svg>
  )
}
function IconBranding() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="14" r="10"/>
      <path d="M10 18l4-12 4 12"/><line x1="11.5" y1="15" x2="16.5" y2="15"/>
    </svg>
  )
}
function IconVideo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="17" height="14" rx="2"/>
      <path d="M19 11l7-4v14l-7-4"/>
    </svg>
  )
}
function IconDesign() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4L24 8L10 22H6V18L20 4Z"/>
      <line x1="17" y1="7" x2="21" y2="11"/>
    </svg>
  )
}
function IconCamera() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9a2 2 0 012-2h3l2-3h6l2 3h3a2 2 0 012 2v13a2 2 0 01-2 2H4a2 2 0 01-2-2z"/>
      <circle cx="14" cy="15" r="4"/>
    </svg>
  )
}
function IconDrone() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="11" y="11" width="6" height="6" rx="1"/>
      <path d="M11 11L6 6"/><path d="M17 11L22 6"/><path d="M11 17L6 22"/><path d="M17 17L22 22"/>
      <circle cx="5" cy="5" r="2"/><circle cx="23" cy="5" r="2"/>
      <circle cx="5" cy="23" r="2"/><circle cx="23" cy="23" r="2"/>
    </svg>
  )
}

interface PlanCard {
  name: string
  price: string
  period: 'monthly' | 'once'
  features: string[]
}

function PricingCard({ plan, monthly, once, whatsappCta }: {
  plan: PlanCard
  monthly: string
  once: string
  whatsappCta: string
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="relative flex flex-col overflow-hidden transition-all duration-300 rounded-2xl bg-white border border-g-dark/10 hover:border-g-mid/35 hover:-translate-y-1"
    >
      <div className="p-7 flex flex-col flex-1">
        <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 pb-4 border-b text-g-mid border-g-dark/8">
          {plan.name}
        </div>
        <div className="mb-7">
          <div className="text-[46px] font-semibold leading-none tracking-[-0.025em] text-g-dark">
            {plan.price}
          </div>
          <div className="text-[12px] font-bold tracking-[0.08em] uppercase mt-2 text-g-dark/50">
            {plan.period === 'monthly' ? monthly : once}
          </div>
        </div>
        <ul className="flex flex-col gap-3.5 mb-8 flex-1">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="shrink-0 mt-[3px] text-[14px] leading-none select-none text-g-mid/60">—</span>
              <span className="text-[14px] leading-[1.55] text-g-dark/58">{f}</span>
            </li>
          ))}
        </ul>
        <a
          href={waLink(`${plan.name} (${plan.price})`)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-[13px] tracking-[0.04em] transition-all duration-200 bg-g-dark text-g-pale hover:bg-s2 hover:-translate-y-0.5"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {whatsappCta}
        </a>
      </div>
    </motion.div>
  )
}

function CategorySection({ title, icon, plans, monthly, once, whatsappCta }: {
  title: string; icon: React.ReactNode; plans: PlanCard[]
  monthly: string; once: string; whatsappCta: string
}) {
  return (
    <div className="mb-20">
      <AnimateIn className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-g-mid">{icon}</span>
          <h2 className="text-[clamp(22px,3vw,32px)] font-bold text-g-dark tracking-tight">{title}</h2>
        </div>
        <div className="h-px bg-g-dark/10 mt-4" />
      </AnimateIn>
      <AnimateStagger className={cn(
        'grid gap-5',
        plans.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
        plans.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-3xl' :
        'grid-cols-1 max-w-xl'
      )}>
        {plans.map((plan, i) => (
          <PricingCard key={i} plan={plan} monthly={monthly} once={once} whatsappCta={whatsappCta} />
        ))}
      </AnimateStagger>
    </div>
  )
}

/* ─── Card de serviço individual ─── */
function IndividualCard({ name, price, icon, waText }: { name: string; price: string; icon: React.ReactNode; waText: string }) {
  return (
    <motion.div variants={itemVariants}
      className="group flex flex-col items-center text-center gap-4 p-7 rounded-2xl bg-white border border-g-dark/8 hover:border-g-mid/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
      <div className="w-14 h-14 rounded-2xl bg-g-pale flex items-center justify-center text-g-mid group-hover:bg-g-mid group-hover:text-g-pale transition-colors duration-300">
        {icon}
      </div>
      <div>
        <div className="text-[15px] font-bold text-g-dark mb-1">{name}</div>
        <div className="text-[22px] font-semibold text-g-mid">{price}</div>
        <div className="text-[11px] text-g-dark/40 mt-0.5 tracking-wide">por entrega</div>
      </div>
      <a
        href={WHATSAPP_BASE + encodeURIComponent(waText)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto w-full py-3 rounded-xl bg-g-dark text-g-pale font-bold text-[13px] hover:bg-s2 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
      >
        Solicitar
      </a>
    </motion.div>
  )
}

export default function MarketplacePage() {
  const t = useTranslations('marketplace_page')
  const monthly = t('monthly')
  const once = t('once')
  const whatsappCta = t('whatsapp_cta')

  const categories = [
    {
      key: 'social',
      title: t('cat_social'),
      icon: <IconSocial />,
      plans: [
        { name: 'Essencial', price: 'R$ 1.700', period: 'monthly' as const, features: ['8 Conteúdos (reels/design)', '10 Artes design', 'Calendário editorial mensal', 'Grupo de WhatsApp exclusivo'] },
        { name: 'Pro', price: 'R$ 2.500', period: 'monthly' as const, features: ['12 Conteúdos (reels/design)', '20 Artes design', 'Calendário editorial mensal', 'Grupo exclusivo no Instagram'] },
        { name: 'Premium', price: 'R$ 3.200', period: 'monthly' as const, features: ['16 Conteúdos (reels/design)', '30 Artes design', 'Calendário editorial mensal', 'Programação no TikTok e YouTube Shorts', 'Grupo exclusivo no WhatsApp'] },
      ],
    },
    {
      key: 'traffic',
      title: t('cat_traffic'),
      icon: <IconTraffic />,
      plans: [
        { name: 'Meta Ads', price: 'R$ 1.200', period: 'monthly' as const, features: ['Criação de campanhas no Instagram e Facebook', 'Análise e otimização diária', 'Relatório de métricas de desempenho', 'Grupo exclusivo no WhatsApp'] },
        { name: 'Google Ads', price: 'R$ 1.200', period: 'monthly' as const, features: ['Criação e gestão de campanhas no Google Ads', 'Segmentação para públicos específicos', 'Otimização diária das campanhas', 'Relatório mensal de performance', 'Grupo exclusivo no WhatsApp'] },
        { name: 'Meta Ads + Google Ads', price: 'R$ 2.200', period: 'monthly' as const, features: ['Campanhas no Instagram, Facebook e Google', 'Segmentação de públicos e testes de criativos', 'Otimização contínua focada em leads e reservas', 'Relatório mensal unificado de performance'] },
      ],
    },
    {
      key: 'sites',
      title: t('cat_sites'),
      icon: <IconSites />,
      plans: [
        { name: 'Landing Page', price: 'R$ 2.000', period: 'once' as const, features: ['Design focado em conversão', 'Copy estratégico orientado à ação', 'Integração com WhatsApp ou formulário', 'Otimização para mobile e desktop', 'Desenvolvida em código — sem mensalidade de plataforma'] },
        { name: 'Website Institucional', price: 'R$ 3.500', period: 'once' as const, features: ['Design personalizado com identidade visual', 'Páginas institucionais (home, sobre, serviços, contato)', 'Otimizado para mobile e carregamento rápido', 'Configuração de SEO', 'Integração com WhatsApp e formulário', 'Domínio e hospedagem configurados'] },
      ],
    },
    {
      key: 'setup',
      title: t('cat_setup'),
      icon: <IconSetup />,
      plans: [
        { name: 'Setup Essencial', price: 'R$ 4.500', period: 'once' as const, features: ['Criação de destaques', 'Otimização biografia + links', '15 conteúdos (reels/design)', '20 artes design'] },
        { name: 'Setup Premium', price: 'R$ 11.000', period: 'once' as const, features: ['Criação de destaques', 'Otimização da biografia + links', '25 conteúdos (reels/design)', '40 artes design', 'Website institucional incluído'] },
      ],
    },
    {
      key: 'branding',
      title: t('cat_branding'),
      icon: <IconBranding />,
      plans: [
        { name: 'Naming', price: 'R$ 1.900', period: 'once' as const, features: ['Briefing estratégico', 'Pesquisa de mercado e concorrência', 'Geração de opções de nomes', 'Análise de disponibilidade de domínio e redes', 'Apresentação com justificativa criativa'] },
        { name: 'Identidade Visual', price: 'R$ 2.800', period: 'once' as const, features: ['Logotipo principal e variações', 'Paleta de cores', 'Tipografia', 'Ícones e elementos gráficos', 'Mockups de aplicação', 'Manual de identidade visual em PDF'] },
        { name: 'Branding Completo', price: 'R$ 7.000', period: 'once' as const, features: ['Definição de propósito, missão, visão e valores', 'Tom de voz e personalidade da marca', 'Identidade visual completa', 'Estudo de mercado', 'Guia de aplicação da marca', 'Apresentação estratégica final'] },
      ],
    },
  ]

  const individualServices = [
    { name: 'Edição de Vídeo', price: 'R$ 300', icon: <IconVideo />, waText: 'Olá! Tenho interesse no serviço de Edição de Vídeo (R$ 300 por entrega).' },
    { name: 'Design', price: 'R$ 100', icon: <IconDesign />, waText: 'Olá! Tenho interesse no serviço de Design (R$ 100 por arte).' },
    { name: 'Captação de Vídeo', price: 'R$ 800', icon: <IconVideo />, waText: 'Olá! Tenho interesse no serviço de Captação de Vídeo (R$ 800 por dia).' },
    { name: 'Fotografia', price: 'R$ 800', icon: <IconCamera />, waText: 'Olá! Tenho interesse no serviço de Fotografia (R$ 800 por sessão).' },
    { name: 'Drone', price: 'R$ 1.000', icon: <IconDrone />, waText: 'Olá! Tenho interesse no serviço de Drone (R$ 1.000 por sessão).' },
  ]

  const [activeTab, setActiveTab] = useState('all')
  const tabs = [
    { key: 'all', label: 'Todos' },
    { key: 'social', label: t('cat_social') },
    { key: 'traffic', label: t('cat_traffic') },
    { key: 'sites', label: t('cat_sites') },
    { key: 'setup', label: t('cat_setup') },
    { key: 'branding', label: t('cat_branding') },
  ]

  const visible = activeTab === 'all' ? categories : categories.filter(c => c.key === activeTab)

  return (
    <>
      <Navbar />

      {/* Page hero */}
      <section className="page-hero pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_-20%,#2D5238,transparent_70%)] opacity-50 pointer-events-none" />
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <AnimateIn>
            <SectionEyebrow>{t('eyebrow')}</SectionEyebrow>
            <h1 className="text-[clamp(36px,5.5vw,72px)] font-semibold leading-[0.95] tracking-[-0.03em] text-white mt-2 mb-5 max-w-[700px]">
              {t('title')}
            </h1>
            <p className="text-g-light/65 text-[16px] leading-[1.75] max-w-[520px]">{t('sub')}</p>
          </AnimateIn>
        </div>
      </section>

      {/* Category filter tabs */}
      <div className="bg-white border-b border-g-dark/10 sticky top-[68px] z-30 overflow-x-auto">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex gap-0 min-w-max">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'px-5 py-4 text-[13px] font-bold whitespace-nowrap transition-colors duration-200 border-b-2 -mb-px',
                  activeTab === tab.key ? 'text-g-dark border-g-mid' : 'text-g-dark/50 border-transparent hover:text-g-dark/65'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing content */}
      <main className="bg-g-pale py-16 lg:py-24 min-h-[60vh]">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {visible.map(cat => (
                <CategorySection
                  key={cat.key}
                  title={cat.title}
                  icon={cat.icon}
                  plans={cat.plans}
                  monthly={monthly}
                  once={once}
                  whatsappCta={whatsappCta}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Serviços individuais */}
          {(activeTab === 'all') && (
            <div className="mt-8 mb-16">
              <AnimateIn className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-g-mid"><IconVideo /></span>
                  <h2 className="text-[clamp(22px,3vw,32px)] font-bold text-g-dark tracking-tight">Serviços Avulsos</h2>
                </div>
                <p className="text-[15px] text-g-dark/55 mt-2 max-w-[480px]">Precisa de um serviço pontual? Contrate separado, sem mensalidade.</p>
                <div className="h-px bg-g-dark/10 mt-4" />
              </AnimateIn>
              <AnimateStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                {individualServices.map((s, i) => (
                  <IndividualCard key={i} name={s.name} price={s.price} icon={s.icon} waText={s.waText} />
                ))}
              </AnimateStagger>
            </div>
          )}

          {/* Bottom CTA */}
          <AnimateIn>
            <div className="rounded-2xl bg-g-dark p-10 lg:p-14 text-center relative overflow-hidden mt-4">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_100%,#2D5238,transparent)] opacity-50" />
              <div className="relative z-10">
                <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-light/40 mb-4">Ficou com dúvidas?</div>
                <h3 className="text-[clamp(24px,3.5vw,40px)] font-bold text-white mb-3">Consultoria gratuita, sem compromisso.</h3>
                <p className="text-white/45 text-[15px] mb-8 max-w-[480px] mx-auto">Fale com a gente e vamos indicar qual serviço faz mais sentido para o seu momento.</p>
                <a
                  href={WHATSAPP_BASE + encodeURIComponent('Olá! Vim pelo site e gostaria de uma consultoria gratuita para entender qual serviço é ideal para mim.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-g-light text-g-dark font-bold px-8 py-4 rounded-full hover:bg-g-pale hover:-translate-y-0.5 transition-all duration-200"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Falar com especialista
                </a>
              </div>
            </div>
          </AnimateIn>
        </div>
      </main>

      <Footer />
    </>
  )
}
