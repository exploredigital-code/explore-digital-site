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
/**
 * Satoshi — corpo. Auto-hospedada.
 *
 * Vinha da Fontshare por CDN e era o maior gargalo de renderização da página:
 * 1.056ms de bloqueio, medidos pelo Lighthouse, porque uma folha de estilo de
 * terceiro trava a primeira pintura até baixar. Servida daqui, o custo cai
 * para o mesmo do resto do CSS e o preload entra de graça.
 */
export const satoshi = localFont({
  src: [
    { path: '../public/fonts/satoshi-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/satoshi-500.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/satoshi-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})

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
