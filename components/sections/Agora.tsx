'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { agora } from '@/data/agora'

/**
 * Feed "Agora", no lugar da fileira de logos.
 *
 * Fato datado prova mais que logo enfileirado: diz o que foi feito, para quem
 * e quando.
 *
 * Renderiza SÓ o que tem `confirmado: true`. Três dos quatro itens que vieram
 * do HTML de referência eram exemplos plausíveis de como o feed funcionaria, e
 * atravessaram a conversa até virar código. Um fato verdadeiro vale mais que
 * quatro plausíveis, e data errada em feed público é o que o cliente corrige
 * na sua frente numa reunião.
 */
export function Agora() {
  const t = useTranslations('home')
  const itens = agora.filter(i => i.confirmado)
  if (itens.length === 0) return null

  return (
    <section id="agora" className="bg-white py-20 lg:py-28">
      <div className="max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16">
        <AnimateIn className="mb-10">
          <SectionEyebrow light>{t('agora_eyebrow')}</SectionEyebrow>
          <h2 className="text-[clamp(26px,3.8vw,42px)] leading-[1.05] tracking-[-0.03em] text-verde mt-2 max-w-[560px]">
            {t('agora_title')}
          </h2>
        </AnimateIn>

        <ol className="divide-y divide-tinta-16 border-y border-tinta-16">
          {itens.map((item, i) => (
            <motion.li
              key={item.cliente + item.data}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px 0px' }}
              transition={{ duration: 0.38, delay: i * 0.05 }}
              className="grid sm:grid-cols-[90px_1fr_auto] gap-1.5 sm:gap-6 items-baseline py-5"
            >
              <time className="text-[11.5px] font-bold tracking-[0.12em] uppercase text-tinta-50 tabular-nums">
                {item.data}
              </time>
              <p className="text-[14.5px] leading-[1.7] text-tinta-70">
                <span className="font-bold text-verde">{item.cliente}</span>
                <span className="text-tinta-50">, {item.local}. </span>
                {item.descricao}
              </p>
              <span className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-verde-medio bg-menta-clara rounded-full px-3 py-1 justify-self-start sm:justify-self-end whitespace-nowrap">
                {item.tag}
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
