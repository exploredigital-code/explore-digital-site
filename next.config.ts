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
  // Naming saiu de Branding e Sistemas virou Automatizações. Os destinos são
  // as páginas de disciplina, criadas na fase 5. Até elas existirem o destino
  // era a âncora no hub, para não trocar 301 por 404.
  ['/servicos/naming',     '/servicos/branding'],
  ['/servicos/sistemas',   '/servicos/automatizacoes'],
]

const nextConfig: NextConfig = {
  /**
   * Quem recebe a metadata dentro do <head>, de forma bloqueante.
   *
   * O Next 15 transmite title, description e canonical DEPOIS do shell, para
   * o TTFB não esperar por eles, e só entrega bloqueante para os robôs que
   * não executam JavaScript. O Googlebot não está nessa lista por padrão,
   * porque ele executa.
   *
   * Aqui ele entra. Depois do canonical de layout que deindexou o site
   * inteiro por meses, custo de alguns milissegundos no TTFB do robô é preço
   * baixo por não depender de renderização para o Google ler o título.
   */
  htmlLimitedBots: /Googlebot|bingbot|Applebot|DuckDuckBot|Twitterbot|facebookexternalhit|LinkedInBot|Slackbot|WhatsApp|Discordbot|TelegramBot/i,

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
