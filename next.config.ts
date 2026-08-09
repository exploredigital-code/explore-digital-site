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

  // Estes dois apontavam para páginas de disciplina, que estão saindo do
  // catálogo. Repontados agora para o destino FINAL: se ficassem como estavam,
  // o redirect da disciplina viraria um segundo salto em cima do primeiro.
  // Naming é entrega de estratégia de marca, então o destino é Branding
  // Completo e não Identidade Visual.
  ['/servicos/naming',     '/servicos/branding-completo'],
  ['/servicos/sistemas',   '/servicos/automacoes'],

  /* ── Catálogo de 2026: seis disciplinas viraram treze produtos ──────────
     Cada rota morta aponta para o produto que herdou o assunto dela, nunca
     para o hub: mandar tudo para /servicos jogaria fora o histórico de cada
     página e devolveria ao visitante uma lista em vez de uma resposta.     */

  // Captações se dividiu em três produtos. O `detailSlug` do antigo item de
  // vídeo já apontava para cá, o que prova que esta rota sempre foi captação
  // de vídeo; fotografia e edição são desmembramentos novos.
  ['/servicos/captacoes',         '/servicos/captacao-video'],

  // Meta e Google viraram um produto só.
  ['/servicos/meta-ads',          '/servicos/gestao-de-trafego'],
  ['/servicos/google-ads',        '/servicos/gestao-de-trafego'],

  // Sistemas internos e conteúdo em série saíram. Os dois eram operação, que
  // é o que Automações resolve.
  ['/servicos/sistemas-internos', '/servicos/automacoes'],
  ['/servicos/conteudo-serie',    '/servicos/automacoes'],

  // Motion deixou de ser disciplina. Peças animadas é o único produto de
  // motion que sobreviveu, e a disciplina inteira foi absorvida por Produção.
  ['/servicos/motion-anuncio',    '/servicos/pecas-animadas'],
  ['/servicos/motion',            '/servicos/producao-conteudo'],

  // As cinco disciplinas restantes. Entram agora, e nao na etapa anterior,
  // porque ate aqui o hub, a home e o Gargalos ainda linkavam para elas: um
  // 301 partindo de casa e pior que a rota viva por mais uma etapa.
  ['/servicos/social-media',      '/servicos/producao-conteudo'],
  ['/servicos/web-design',        '/servicos/website-institucional'],
  ['/servicos/branding',          '/servicos/identidade-visual'],
  ['/servicos/performance-ads',   '/servicos/gestao-de-trafego'],
  ['/servicos/automatizacoes',    '/servicos/automacoes'],

  // 'Sob demanda' era o nome velho de 'pontual'. A rota nasceu ha tres dias e
  // nao tem historico, entao o hub e o destino certo.
  ['/servicos/sob-demanda',       '/servicos'],
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
