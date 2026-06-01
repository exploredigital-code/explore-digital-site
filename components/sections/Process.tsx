'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { Button } from '@/components/ui/Button'

const WHATSAPP = 'https://wa.me/+5585991043067?text=Ol%C3%A1!%20Gostaria%20de%20uma%20consultoria%20gratuita.'

export function Process() {
  const t = useTranslations('process')

  const steps = [
    { n: '01', title: t('s1_title'), desc: t('s1_desc') },
    { n: '02', title: t('s2_title'), desc: t('s2_desc') },
    { n: '03', title: t('s3_title'), desc: t('s3_desc') },
  ]

  return (
    <section className="bg-g-pale py-24 lg:py-32 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: header + CTA */}
          <AnimateIn>
            <SectionEyebrow light>{t('eyebrow')}</SectionEyebrow>
            <h2 className="text-[clamp(30px,4.5vw,52px)] font-bold leading-[1.05] tracking-[-0.025em] text-g-dark mt-2 mb-6">
              {t('title')}
            </h2>
            <p className="text-g-dark/55 text-[16px] leading-[1.8] mb-10">
              {t('subtitle')}
            </p>
            <Button href={WHATSAPP} variant="primary" size="lg" target="_blank" rel="noopener noreferrer"
              className="!bg-g-dark !text-g-pale hover:!bg-s2">
              {t('cta')}
            </Button>
          </AnimateIn>

          {/* Right: steps */}
          <div className="flex flex-col gap-0 relative">
            {/* Vertical connecting line */}
            <div className="absolute left-[27px] top-10 bottom-10 w-px bg-g-mid/25 hidden sm:block" />

            {steps.map((step, i) => (
              <AnimateIn key={i} delay={i * 0.1}>
                <motion.div
                  className="flex gap-5 py-7 group"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Number circle */}
                  <div className="shrink-0 w-14 h-14 rounded-full border-2 border-g-mid/30 bg-white flex items-center justify-center group-hover:border-g-mid group-hover:bg-g-pale transition-colors duration-300 z-10">
                    <span className="text-[13px] font-bold text-g-mid tracking-widest">{step.n}</span>
                  </div>

                  {/* Content */}
                  <div className="pt-1">
                    <h3 className="font-bold text-[18px] text-g-dark mb-1.5">{step.title}</h3>
                    <p className="text-[14px] text-g-dark/55 leading-[1.7]">{step.desc}</p>
                  </div>
                </motion.div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
