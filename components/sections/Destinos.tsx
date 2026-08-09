'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { Button } from '@/components/ui/Button'
import { CapaMidia } from '@/components/ui/SlotMidia'
import { destinos, slotDoDestino } from '@/data/destinos'

const WA_BASE = 'https://wa.me/+5585991043067?text='

/**
 * O litoral que a gente conhece.
 *
 * Entra no lugar do feed "Agora", que migrou para /sobre. O motivo é de
 * página, não de conteúdo: o Agora é prova de atividade recente e interessa a
 * quem já está avaliando a agência, que é público de /sobre. Na home, na
 * dobra depois dos gargalos, o que responde a próxima pergunta do visitante é
 * geografia: "vocês conhecem a minha praia?".
 *
 * A seção é INFORMATIVA. Os cards não levam a lugar nenhum: nove links para o
 * mesmo WhatsApp, mudando só uma palavra na mensagem, davam nove saídas para a
 * mesma conversa e faziam a seção parecer um menu de contratação por praia,
 * que não é o que ela é. A única saída é a chamada do rodapé.
 *
 * Toda string sai de `t()`, nunca de `t.raw()` com `.replace()` por cima. O
 * `.replace()` já falhou duas vezes neste código, sempre que a string vinha
 * fora do ICU. As descrições vêm de `t.raw` porque são um mapa por slug, mas
 * nenhuma delas tem placeholder, então não passam perto do problema.
 */
export function Destinos() {
  const t = useTranslations('home')
  const itens = t.raw('destinos_itens') as Record<string, string>

  return (
    <section id="destinos" className="bg-white py-20 lg:py-28">
      <div className="max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16">

        <AnimateIn className="mb-10">
          <SectionEyebrow light>{t('destinos_eyebrow')}</SectionEyebrow>
          <h2 className="text-[clamp(26px,3.8vw,42px)] leading-[1.05] tracking-[-0.03em] text-verde mt-2 max-w-[620px]">
            {t('destinos_title')}
          </h2>
          <p className="text-[15px] leading-[1.75] text-tinta-70 max-w-[620px] mt-4">
            {t('destinos_sub')}
          </p>
        </AnimateIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {destinos.map((d, i) => (
            <motion.div
              key={d.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              // Vertical apenas. `'-60px'` sozinho encolheria os quatro lados,
              // e no celular um card colado na borda esquerda nunca dispara o
              // observer: fica invisível só no telefone.
              viewport={{ once: true, margin: '-60px 0px' }}
              transition={{ duration: 0.38, delay: Math.min(i, 5) * 0.05 }}
            >
              <div className="h-full flex flex-col rounded-2xl border border-tinta-16 bg-white overflow-hidden">
                {/* Horizontal, e não o 4:5 do resto do acervo. Sete slots
                    verticais vazios enfileirados viravam uma parede tracejada
                    que engolia a dobra inteira. Paisagem de praia também é
                    naturalmente horizontal, então o registro pede h169. */}
                {/* Mais alto no celular, onde a coluna tem metade da largura:
                    em 16:9 a caixa ficava baixa demais e o rótulo do
                    placeholder cortava no meio da terceira linha. Placeholder
                    ilegível é pior que placeholder visível. */}
                <div className="relative aspect-[4/3] sm:aspect-video w-full overflow-hidden">
                  <CapaMidia id={slotDoDestino(d.slug)} />
                </div>
                <div className="flex flex-col flex-1 p-4">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-[15.5px] font-bold leading-tight tracking-[-0.01em] text-verde">
                      {d.nome}
                    </h3>
                    <span className="text-[10.5px] font-bold tracking-[0.12em] uppercase text-tinta-70">
                      {d.uf}
                    </span>
                  </div>
                  <p className="text-[12.5px] leading-[1.55] text-tinta-70 mt-1.5 flex-1">
                    {itens[d.slug]}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* A única saída da seção, e um pedido direto no lugar do convite
            genérico que estava aqui. Nove cards fechados diriam, sem querer,
            "só atendemos aqui". */}
        <AnimateIn className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-2xl border border-tinta-16 bg-menta-clara px-6 py-6">
            <div className="max-w-[560px]">
              <h3 className="text-[16px] font-bold leading-tight text-verde mb-1.5">
                {t('destinos_outro_title')}
              </h3>
              <p className="text-[13.5px] leading-[1.6] text-tinta-70">
                {t('destinos_outro_desc')}
              </p>
            </div>
            <Button
              href={WA_BASE + encodeURIComponent(t('destinos_wa_outro'))}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline-light"
              size="md"
              className="shrink-0 self-start sm:self-auto"
            >
              {t('destinos_outro_cta')}
            </Button>
          </div>
        </AnimateIn>

      </div>
    </section>
  )
}
