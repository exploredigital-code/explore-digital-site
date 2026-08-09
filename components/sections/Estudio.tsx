'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { GradeDoRegistro } from '@/components/ui/SlotMidia'

/**
 * O estúdio.
 *
 * "Geriu hostel, pousada e escola de kite antes de virar agência" é o
 * argumento mais forte que a Explore tem contra qualquer concorrente de
 * marketing hoteleiro, porque nenhum deles pode dizer o mesmo. Por isso a
 * frase é a manchete da seção e vem em destaque, não uma linha perdida no
 * meio de um parágrafo institucional.
 */
export function Estudio() {
  const t = useTranslations('home')
  const locale = useLocale()

  return (
    <section id="estudio" className="bg-verde py-20 lg:py-28">
      <div className="max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">
          <AnimateIn>
            <SectionEyebrow>{t('estudio_eyebrow')}</SectionEyebrow>
            <h2 className="text-[clamp(28px,4.2vw,50px)] leading-[1.05] tracking-[-0.03em] text-menta mt-2 mb-6">
              {t('estudio_title')}{' '}
              <span className="text-verde-luz">{t('estudio_destaque')}</span>{' '}
              {t('estudio_titulo_fim')}
            </h2>
            <p className="text-menta-fraca text-[15.5px] leading-[1.8] max-w-[560px] mb-9">
              {t('estudio_desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/${locale}/sobre`}
                className="inline-flex items-center justify-center gap-2.5 bg-sol text-verde font-medium px-7 py-3.5 rounded-full text-[14.5px] hover:bg-sol-forte hover:-translate-y-0.5 transition-all duration-200"
              >
                {t('estudio_cta')}
              </Link>
              <Link
                href={`/${locale}/carreiras`}
                className="inline-flex items-center justify-center gap-2 border border-verde-borda text-menta font-medium px-7 py-3.5 rounded-full text-[14.5px] hover:border-menta hover:-translate-y-0.5 transition-all duration-200"
              >
                {t('estudio_cta2')}
              </Link>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <GradeDoRegistro chave="home-estudio" rotulo={t('estudio_eyebrow')} />
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
