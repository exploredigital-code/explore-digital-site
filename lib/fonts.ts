import localFont from 'next/font/local'

/**
 * Quanta Grotesk Pro — display.
 *
 * Só título, número e rótulo caixa alta. Nunca parágrafo: a razão
 * x-height/caixa-alta é 0,714 e o `o` é bem mais largo que o `n`, o que cansa
 * em texto corrido. SPEC seção 3.
 *
 * Pendência jurídica antes do deploy: confirmar a licença de webfont. Licença
 * desktop não cobre uso em site.
 */
export const quanta = localFont({
  src: [
    { path: '../public/fonts/quanta-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/quanta-500.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/quanta-700.woff2', weight: '700', style: 'normal' },
    { path: '../public/fonts/quanta-800.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-quanta',
  display: 'swap',
})
