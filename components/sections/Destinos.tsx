'use client'

import { useTranslations } from 'next-intl'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { Button } from '@/components/ui/Button'
import { CapaMidia } from '@/components/ui/SlotMidia'
import { destinos, slotDoDestino, type Destino } from '@/data/destinos'

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
 * A seção é INFORMATIVA. Os cards não levam a lugar nenhum: oito links para o
 * mesmo WhatsApp, mudando só uma palavra na mensagem, davam oito saídas para a
 * mesma conversa e faziam a seção parecer um menu de contratação por praia,
 * que não é o que ela é. A única saída é a chamada do rodapé.
 *
 * A faixa rola sozinha. O botão de pausa foi retirado a pedido do cliente, em
 * 09/08/2026. Fica registrado que conteúdo em movimento por mais de cinco
 * segundos deveria ter um controle explícito de parada: quem lê devagar, quem
 * tem dificuldade de rastrear movimento e quem está no celular (onde `:hover`
 * não existe) ficam sem como segurar a faixa.
 *
 * O que sobrou de mitigação, e que continua valendo: para com o mouse em cima,
 * para com o foco de teclado dentro, e some inteiramente sob
 * `prefers-reduced-motion`, virando uma lista que se arrasta com o dedo. Se um
 * dia o botão voltar, é `useState` mais o `data-pausado` que o CSS já lê.
 * A mecânica está em `globals.css`, sob `.destinos-janela` e `.destinos-trilho`.
 *
 * Toda string sai de `t()`, nunca de `t.raw()` com `.replace()` por cima. O
 * `.replace()` já falhou duas vezes neste código, sempre que a string vinha
 * fora do ICU. As descrições vêm de `t.raw` porque são um mapa por slug, mas
 * nenhuma delas tem placeholder, então não passam perto do problema.
 */

function CardDestino({ destino, descricao }: { destino: Destino; descricao: string }) {
  return (
    <div className="w-[236px] sm:w-[280px] shrink-0 h-full flex flex-col rounded-2xl border border-tinta-16 bg-white overflow-hidden">
      {/* Horizontal, e não o 4:5 do resto do acervo: paisagem de praia é
          naturalmente horizontal, e oito slots verticais vazios enfileirados
          viravam uma parede tracejada. */}
      <div className="relative aspect-video w-full overflow-hidden">
        <CapaMidia id={slotDoDestino(destino.slug)} />
      </div>
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-baseline gap-2">
          <h3 className="text-[15.5px] font-bold leading-tight tracking-[-0.01em] text-verde">
            {destino.nome}
          </h3>
          <span className="text-[10.5px] font-bold tracking-[0.12em] uppercase text-tinta-70">
            {destino.uf}
          </span>
        </div>
        <p className="text-[12.5px] leading-[1.55] text-tinta-70 mt-1.5 flex-1">
          {descricao}
        </p>
      </div>
    </div>
  )
}

export function Destinos() {
  const t = useTranslations('home')
  const itens = t.raw('destinos_itens') as Record<string, string>

  /**
   * O respiro entre os cards é `pr` de cada item, e não `gap` do trilho.
   *
   * Não é preciosismo: com `gap`, dezesseis cards têm quinze vãos, e metade da
   * largura total não bate com uma cópia inteira, que tem oito cards e sete
   * vãos. A diferença é meio vão, e a faixa dava um tranco a cada volta. Com o
   * respiro dentro do item, a largura total é exatamente dezesseis vezes a
   * mesma medida, e o `translateX(-50%)` cai em cima da emenda.
   *
   * Pelo mesmo motivo o trilho não tem padding lateral: padding entra na
   * largura e desalinharia o laço. Quem trata a borda é a máscara da janela.
   */
  const item = (d: typeof destinos[number], duplicata: boolean) => (
    <li
      key={(duplicata ? 'dup-' : '') + d.slug}
      className="flex pr-3 sm:pr-4"
      {...(duplicata ? { 'data-duplicata': '', 'aria-hidden': true } : {})}
    >
      <CardDestino destino={d} descricao={itens[d.slug]} />
    </li>
  )

  return (
    <section id="destinos" className="bg-white py-20 lg:py-28 overflow-hidden">

      <div className="max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16">
        <AnimateIn className="mb-10">
          <SectionEyebrow light>{t('destinos_eyebrow')}</SectionEyebrow>
          <h2 className="text-[clamp(26px,3.8vw,42px)] leading-[1.05] tracking-[-0.03em] text-verde max-w-[620px] mt-2">
            {t('destinos_title')}
          </h2>
          <p className="text-[15px] leading-[1.75] text-tinta-70 max-w-[620px] mt-4">
            {t('destinos_sub')}
          </p>
        </AnimateIn>
      </div>

      {/* Fora do contêiner com padding: a faixa vai de borda a borda, que é o
          que faz a rolagem parecer contínua em vez de um carrossel dentro de
          uma caixa. */}
      <AnimateIn>
        <div className="destinos-janela w-full">
          {/* `items-stretch` é o que deixa todos os cards da mesma altura: cada
              <li> cresce até o mais alto da faixa e o card, com `h-full`,
              acompanha. Sem isso o card do Preá, com três linhas de descrição,
              ficava mais alto que o do Guajirú, com duas. */}
          <ul className="destinos-trilho flex items-stretch list-none m-0 p-0">
            {destinos.map(d => item(d, false))}
            {/* Segunda cópia, só para fechar o laço sem emenda. `aria-hidden`
                para o leitor de tela ver oito destinos e não dezesseis. */}
            {destinos.map(d => item(d, true))}
          </ul>
        </div>
      </AnimateIn>

      <div className="max-w-conteudo mx-auto px-6 sm:px-10 lg:px-16">
        {/* A única saída da seção, e um pedido direto no lugar do convite
            genérico que estava aqui. Oito cards fechados diriam, sem querer,
            "só atendemos aqui". */}
        <AnimateIn className="mt-10">
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
