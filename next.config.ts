import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

const LOCALES = 'pt|en|es'

/**
 * Rotas antigas, todas em 301. Nunca 410: a página já acumulou histórico e
 * jogar isso fora não devolve nada.
 *
 * Cada par entra duas vezes: uma com o prefixo de idioma, que é como as URLs
 * existem hoje, e outra sem prefixo, para quem tiver salvo o link cru. Sem a
 * segunda, `/solucoes` passaria pelo middleware do next-intl até `/pt/solucoes`
 * e só então cairia no redirect, gastando dois saltos.
 */
const MOVED: [from: string, to: string][] = [
  ['/solucoes',            '/servicos'],
  ['/vagas',               '/carreiras'],
  // /marketplace era a aba de Planos e já apontava para /solucoes. Encadear
  // deixaria dois saltos, então vai direto ao destino final.
  ['/marketplace',         '/servicos'],
  // Naming saiu de Branding e Sistemas virou Automatizações. Enquanto a fase 5
  // não cria as páginas de disciplina, o destino é a âncora da disciplina no
  // hub: um salto só e sem 404. Quando /servicos/branding existir, é só tirar
  // o `#`.
  ['/servicos/naming',     '/servicos#branding'],
  ['/servicos/sistemas',   '/servicos#automatizacoes'],
]

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  async redirects() {
    return MOVED.flatMap(([from, to]) => [
      {
        source: `/:locale(${LOCALES})${from}`,
        destination: `/:locale${to}`,
        // 301 explícito, não `permanent: true`. O atalho do Next emite 308,
        // que preserva o método HTTP. Para página é 301 que se espera.
        statusCode: 301,
      },
      {
        source: from,
        destination: `/pt${to}`,
        // 301 explícito, não `permanent: true`. O atalho do Next emite 308,
        // que preserva o método HTTP. Para página é 301 que se espera.
        statusCode: 301,
      },
    ])
  },
}

export default withNextIntl(nextConfig)
