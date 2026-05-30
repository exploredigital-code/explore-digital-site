'use client'

import { useRef, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { AnimateIn } from '@/components/ui/AnimateIn'

function Counter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          const num = parseInt(target.replace(/\D/g, ''), 10)
          if (isNaN(num)) { setDisplay(target); return }
          let start = 0
          const duration = 1600
          const step = Math.ceil(num / (duration / 16))
          const timer = setInterval(() => {
            start += step
            if (start >= num) { setDisplay(target); clearInterval(timer) }
            else setDisplay(`${start}${suffix}`)
          }, 16)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix])

  return <span ref={ref}>{display}</span>
}

export function Stats() {
  const t = useTranslations('stats')

  const stats = [
    { value: t('s1_value'), label: t('s1_label') },
    { value: t('s2_value'), label: t('s2_label') },
    { value: t('s3_value'), label: t('s3_label') },
    { value: t('s4_value'), label: t('s4_label') },
  ]

  return (
    <section className="bg-g-dark border-b border-white/[0.07]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
        <AnimateIn className="mb-12">
          <div className="flex items-center gap-3">
            <div className="w-5 h-px bg-g-light shrink-0" />
            <span className="text-g-light text-[11px] font-bold tracking-[0.2em] uppercase">
              {t('eyebrow')}
            </span>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
          {stats.map((stat, i) => (
            <AnimateIn key={i} delay={i * 0.07}>
              <div className="bg-g-dark px-8 py-10 flex flex-col gap-2">
                <div className="text-[clamp(38px,5vw,60px)] font-bold leading-none tracking-[-0.03em] text-g-light">
                  <Counter target={stat.value} />
                </div>
                <div className="text-[12px] font-bold tracking-[0.1em] uppercase text-white/40 leading-snug">
                  {stat.label}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
