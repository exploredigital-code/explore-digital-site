'use client'

import { useTranslations } from 'next-intl'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { AnimateIn, AnimateStagger, itemVariants } from '@/components/ui/AnimateIn'
import { motion } from 'framer-motion'

export function Testimonials() {
  const t = useTranslations('testimonials')

  type Item = { quote: string; author: string; role: string; location: string }
  const items = (t.raw('items') as Item[])

  return (
    <section className="bg-g-dark py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,#2D5238,transparent_70%)] opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <AnimateIn className="mb-14">
          <SectionEyebrow>{t('eyebrow')}</SectionEyebrow>
          <h2 className="text-[clamp(30px,4.5vw,52px)] font-bold leading-[1.05] tracking-[-0.025em] text-white mt-2 max-w-[540px]">
            {t('title')}
          </h2>
        </AnimateIn>

        {/* Grid */}
        <AnimateStagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex flex-col p-7 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-g-light/20 transition-colors duration-300 group"
            >
              {/* Large quote mark */}
              <div className="text-[56px] leading-none text-menta-fraca font-bold mb-3 -mt-2 select-none">
                &ldquo;
              </div>

              <blockquote className="text-[15px] text-white/70 leading-[1.8] flex-1 mb-7">
                {item.quote}
              </blockquote>

              <div className="border-t border-white/[0.07] pt-5">
                <div className="font-bold text-[15px] text-white">{item.author}</div>
                <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-verde-luz mt-1">{item.location}</div>
              </div>
            </motion.div>
          ))}
        </AnimateStagger>

      </div>
    </section>
  )
}
