'use client'

import { useTranslations } from 'next-intl'

/**
 * Pular para o conteúdo.
 *
 * Sem ele, quem navega por teclado atravessa o logo, os cinco links da nav, o
 * seletor de idioma e o CTA em toda página antes de chegar no conteúdo.
 *
 * O estado escondido vem de `style` inline, não de classe utilitária. Motivo:
 * a folha de estilo chega depois do HTML, e nessa janela uma classe como
 * `sr-only` ainda não existe. O link aparecia por cima do logo até o CSS
 * carregar. Estilo inline vale desde a primeira pintura.
 *
 * Não usa `display: none` nem `visibility: hidden`: os dois tiram o elemento
 * da ordem de tabulação e matam a função dele. A técnica é tirá-lo da tela
 * recortando a área visível, e devolvê-lo no `:focus`.
 */
const ESCONDIDO: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
  border: 0,
}

export function SkipLink() {
  const t = useTranslations('nav')

  return (
    <a href="#conteudo" className="skip-link" style={ESCONDIDO}>
      {t('skip')}
    </a>
  )
}
