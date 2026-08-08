'use client'

import { useTranslations } from 'next-intl'

/**
 * Pular para o conteúdo.
 *
 * Fica invisível até receber foco. Sem ele, quem navega por teclado atravessa
 * o logo, os cinco links da nav, o seletor de idioma e o CTA em toda página
 * antes de chegar no conteúdo.
 *
 * Não usa `hidden` nem `display: none`: elemento escondido assim sai da ordem
 * de tabulação e o link nunca receberia foco. A técnica é tirá-lo da tela com
 * posicionamento e trazê-lo de volta no `:focus`.
 */
export function SkipLink() {
  const t = useTranslations('nav')

  return (
    <a
      href="#conteudo"
      className="
        sr-only
        focus:not-sr-only
        focus:fixed focus:top-3 focus:left-3 focus:z-[100]
        focus:bg-sol focus:text-verde focus:font-bold
        focus:px-5 focus:py-3 focus:rounded-full focus:text-[14px]
        focus:outline-2 focus:outline-offset-2 focus:outline-menta
      "
    >
      {t('skip')}
    </a>
  )
}
