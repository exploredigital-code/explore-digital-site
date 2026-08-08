'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { cn } from '@/lib/utils'
import type { SubService, ServiceData } from '@/data/services'
import { getLocalizedSubService, getLocalizedService } from '@/data/services-content'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import { AnimateIn, AnimateStagger, itemVariants } from '@/components/ui/AnimateIn'

const WA_BASE = 'https://wa.me/+5585991043067?text='

interface Props {
  sub: SubService
  parentService: ServiceData
  locale: string
}

export function ServiceDetailView({ sub, parentService, locale }: Props) {
  const t = useTranslations('service_detail')
  const tContact = useTranslations('contact')
  const currentLocale = useLocale()

  const localizedSub = getLocalizedSubService(currentLocale, sub.slug) ?? {
    name: sub.name,
    tagline: sub.tagline,
    description: sub.description,
    forWhom: sub.forWhom,
    features: sub.features,
    result: sub.result,
  }
  const localizedService = getLocalizedService(currentLocale, parentService.slug) ?? {
    title: parentService.title,
  }

  const waMsg = tContact('service_inquiry').replace('{service}', localizedSub.name)
  const waUrl = WA_BASE + encodeURIComponent(waMsg)

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className={cn('relative min-h-[60vh] flex flex-col justify-end overflow-hidden', 'bg-gradient-to-br', parentService.gradient)}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_30%_20%,rgba(255,255,255,0.04),transparent)]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '200px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0D1A12] to-transparent" />

        <div className="relative z-10 max-w-screen-xl mx-auto w-full px-6 sm:px-10 lg:px-16 pt-36 pb-16">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-10">
            <Link href={`/${locale}#services`} className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-white/40 hover:text-white/70 transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 7H2M6 3L2 7l4 4"/></svg>
              {localizedService.title}
            </Link>
          </motion.div>
          {sub.recommended && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-4">
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase bg-g-mid text-white px-3 py-1.5 rounded-full">
                {t('recommended')}
              </span>
            </motion.div>
          )}
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25, ease: [0.33, 1, 0.68, 1] }}
            className="text-[clamp(48px,8vw,110px)] leading-[0.9] tracking-[-0.04em] text-white mb-6">
            {localizedSub.name}
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="flex flex-wrap items-center gap-6">
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-g-light text-g-dark font-bold px-7 py-3.5 rounded-full hover:bg-g-pale hover:-translate-y-0.5 transition-all duration-200 text-[14px]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {t('hire_whatsapp')}
            </a>
          </motion.div>
        </div>
      </section>

      {/* DESCRIPTION — white */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <AnimateIn className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-5 h-px bg-g-mid" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-mid">{t('about_service')}</span>
              </div>
              <p className="text-[19px] text-g-dark/65 leading-[1.85]">{localizedSub.description}</p>
            </AnimateIn>
            <AnimateIn delay={0.1} className="lg:col-span-5">
              <div className="bg-g-pale rounded-2xl p-8 border border-g-dark/8">
                <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-g-dark/45 mb-5">{t('for_whom')}</div>
                <ul className="flex flex-col gap-4">
                  {localizedSub.forWhom.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-g-mid/20 flex items-center justify-center mt-0.5">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#4E7D57" strokeWidth="2" strokeLinecap="round"><path d="M2 5l2 2 4-4"/></svg>
                      </span>
                      <span className="text-[14px] text-g-dark/65 leading-[1.55]">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* FEATURES — g-pale */}
      <section className="bg-g-pale py-20 lg:py-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateIn className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-5 h-px bg-g-mid" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-mid">{t('whats_included')}</span>
            </div>
            <h2 className="text-[clamp(26px,3.5vw,40px)] text-g-dark tracking-tight">{t('you_receive')}</h2>
          </AnimateIn>
          <AnimateStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {localizedSub.features.map((f, i) => (
              <motion.div key={i} variants={itemVariants}
                className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-g-dark/8 hover:border-g-mid/35 hover:shadow-sm transition-all duration-300">
                <div className="shrink-0 w-8 h-8 rounded-full bg-g-mid/15 flex items-center justify-center mt-0.5">
                  <span className="text-[11px] font-bold text-g-mid">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="text-[14px] text-g-dark/65 leading-[1.6]">{f}</p>
              </motion.div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* RESULT + CTA — g-dark */}
      <section className="bg-g-dark py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_100%_50%,#2D5238,transparent_70%)] opacity-30 pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateIn>
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-g-light/45 mb-4">{t('expected_result')}</div>
            <div className="text-[clamp(22px,3.5vw,42px)] font-semibold text-g-light leading-tight mb-12 max-w-[600px]">
              {localizedSub.result}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-g-light text-g-dark font-bold px-8 py-4 rounded-full hover:bg-g-pale hover:-translate-y-0.5 transition-all duration-200 text-[15px]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                {t('want_service')}
              </a>
              <Link href={`/${locale}/solucoes`}
                className="inline-flex items-center gap-2 border border-white/20 text-white/60 hover:text-white hover:border-white/40 font-bold px-8 py-4 rounded-full transition-all duration-200 text-[15px]">
                {t('see_all_plans')}
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      <Footer />
    </>
  )
}
