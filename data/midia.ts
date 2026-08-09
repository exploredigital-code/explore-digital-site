/**
 * ══════════════════════════════════════════════════════════════════════════
 *  REGISTRO DE MÍDIA
 *  Todo slot de imagem e vídeo do site mora aqui. Um arquivo, uma lista.
 * ══════════════════════════════════════════════════════════════════════════
 *
 * COMO PREENCHER
 *
 *   1. Coloque o arquivo em  public/midia/
 *   2. Ache a linha do slot aqui embaixo pelo rótulo
 *   3. Escreva o nome do arquivo no campo `arquivo`
 *
 *      antes:  { id: 'fotografia-quarto', arquivo: '',              rotulo: 'Quarto ou área comum em luz natural' }
 *      depois: { id: 'fotografia-quarto', arquivo: 'quarto-101.jpg', rotulo: 'Quarto ou área comum em luz natural' }
 *
 *   Só isso. Não precisa mexer em componente nenhum.
 *
 * VÍDEO OU IMAGEM
 *
 *   O mesmo campo aceita os dois. Quem decide é a extensão:
 *   .mp4 e .webm entram como vídeo em loop e sem som, o resto como imagem.
 *   Se for vídeo, dá para apontar um quadro de capa em `capa`.
 *
 * ENQUANTO ESTIVER VAZIO
 *
 *   O site mostra o placeholder tracejado com o rótulo, dizendo o que entra
 *   ali. Nada quebra e nada some.
 *
 * FORMATO
 *
 *   v916  vertical 9:16, reel e story        (o padrão do acervo)
 *   v45   vertical 4:5, carrossel e feed
 *   q11   quadrado 1:1
 *   h169  horizontal 16:9                    (só painel e site em desktop)
 */

export type Formato = 'v916' | 'v45' | 'q11' | 'h169'

export interface Slot {
  /** Chave estável. Não mudar depois de preenchido. */
  id: string
  /** Nome do arquivo dentro de public/midia. Vazio = ainda não temos. */
  arquivo: string
  /** O que entra aqui. Aparece no placeholder e vira o alt da imagem. */
  rotulo: string
  formato: Formato
  /** Só para vídeo: quadro de capa, também dentro de public/midia. */
  capa?: string
}

export const PASTA = '/midia/'

/* ────────────────────────────── HOME ────────────────────────────── */
const home: Slot[] = [
  { id: 'home-estudio-time-captacao', arquivo: '', rotulo: 'Time em captação no destino', formato: 'v45' },
  { id: 'home-estudio-bastidor',      arquivo: '', rotulo: 'Bastidor de gravação',        formato: 'v45' },
  { id: 'home-estudio-time-foto',     arquivo: '', rotulo: 'Foto do time',                formato: 'v45' },
]

/* ──────────────────────────── DESTINOS ───────────────────────────
   Um slot por destino da seção da home. O rótulo diz o que procurar no
   acervo: paisagem que identifique a praia de longe, não foto de hóspede
   nem peça de cliente. Vazio, cada card mostra o placeholder tracejado
   com essa frase, que é exatamente o briefing de quem vai captar.       */
const destinos: Slot[] = [
  { id: 'destino-joao-pessoa',     arquivo: '', rotulo: 'João Pessoa: orla da capital, hotel de frente para o mar',       formato: 'h169' },
  { id: 'destino-pipa',            arquivo: '', rotulo: 'Pipa: falésia, vila ou praia cheia em dia de sol',               formato: 'h169' },
  { id: 'destino-cumbuco',         arquivo: '', rotulo: 'Cumbuco: kite na água ou lagoa em dia de vento',                 formato: 'h169' },
  { id: 'destino-taiba',           arquivo: '', rotulo: 'Taíba: duna, vento e casa de temporada',                         formato: 'h169' },
  { id: 'destino-prea',            arquivo: '', rotulo: 'Preá: praia em alta temporada, com kite no fundo',               formato: 'h169' },
  { id: 'destino-jericoacoara',    arquivo: '', rotulo: 'Jericoacoara: duna do pôr do sol ou rua de areia',               formato: 'h169' },
  { id: 'destino-ilha-do-guajiru', arquivo: '', rotulo: 'Ilha do Guajirú: água rasa, escola de kite ou pousada',          formato: 'h169' },
]

/* ───────────────────────────── SOBRE ────────────────────────────── */
const sobre: Slot[] = [
  { id: 'sobre-origem-hostel',       arquivo: '', rotulo: 'Operação antiga: hostel ou pousada', formato: 'v45' },
  { id: 'sobre-origem-escola-kite',  arquivo: '', rotulo: 'Escola de kite em aula',             formato: 'v45' },
  { id: 'sobre-origem-captacao',     arquivo: '', rotulo: 'Time em captação no destino',        formato: 'v45' },
]

/* ─────────────── DISCIPLINAS (hub e página de disciplina) ────────────────
   Os mesmos slots servem os dois lugares. Antes a lista estava duplicada
   em dois componentes e saía do lugar quando um dos dois era editado.      */
/**
 * Um grupo por PRODUTO, não mais por disciplina.
 *
 * As disciplinas deixaram de existir como conceito de tela, e enquanto a
 * chave era a disciplina-pai a página de Fotografia herdava quatro reels de
 * Social Media, que é o oposto do que ela vende.
 *
 * O id diz o produto e o que entra, nesta ordem, para dar para achar o slot
 * por varredura visual sem abrir o site.
 */
const produtos: Slot[] = [
  // Produção de conteúdo (recorrente) — vinha de social-media-1 a -4
  { id: 'producao-conteudo-reel-pousada',     arquivo: '', rotulo: 'Reel de pousada, hóspede em cena',   formato: 'v916' },
  { id: 'producao-conteudo-reel-beach-club',  arquivo: '', rotulo: 'Reel de beach club no fim de tarde', formato: 'v916' },
  { id: 'producao-conteudo-story-bastidor',   arquivo: '', rotulo: 'Story de bastidor da operação',      formato: 'v916' },
  { id: 'producao-conteudo-reel-cafe',        arquivo: '', rotulo: 'Reel de café da manhã',              formato: 'v916' },

  // Gestão de tráfego (recorrente) — vinha de performance-ads-1, -2 e motion-4
  { id: 'gestao-de-trafego-criativo-vertical', arquivo: '', rotulo: 'Criativo vertical de campanha',      formato: 'v916' },
  { id: 'gestao-de-trafego-painel-resultado',  arquivo: '', rotulo: 'Painel de resultado do gerenciador', formato: 'h169' },
  { id: 'gestao-de-trafego-criativo-animado',  arquivo: '', rotulo: 'Criativo animado de anúncio',        formato: 'v916' },

  // Website institucional — vinha de web-design-1 e -2
  { id: 'website-institucional-celular', arquivo: '', rotulo: 'Site aberto no celular',        formato: 'v916' },
  { id: 'website-institucional-desktop', arquivo: '', rotulo: 'Site em desktop, dobra inicial', formato: 'h169' },

  // Identidade visual — vinha de branding-1 a -3
  { id: 'identidade-visual-papelaria', arquivo: '', rotulo: 'Aplicação de marca em papelaria', formato: 'v45' },
  { id: 'identidade-visual-paleta',    arquivo: '', rotulo: 'Paleta e tipografia',             formato: 'v45' },
  { id: 'identidade-visual-fachada',   arquivo: '', rotulo: 'Fachada ou sinalização',          formato: 'v45' },

  // Peças animadas — vinha de motion-1 e -3
  { id: 'pecas-animadas-vinheta',     arquivo: '', rotulo: 'Vinheta de abertura',         formato: 'v916' },
  { id: 'pecas-animadas-lower-third', arquivo: '', rotulo: 'Lower third aplicado em reel', formato: 'v916' },

  // Automações — vinha de motion-2 (peça em série) e automatizacoes-2 (painel)
  { id: 'automacoes-story-mare',     arquivo: '', rotulo: 'Story de maré gerado em série', formato: 'v916' },
  { id: 'automacoes-painel-reserva', arquivo: '', rotulo: 'Painel de reserva e ocupação',  formato: 'h169' },

  // CRM — vinha de automatizacoes-1. A resposta automática de WhatsApp mora
  // aqui e não em Automações: o valor dela é não perder o contato.
  { id: 'crm-resposta-whatsapp', arquivo: '', rotulo: 'Resposta automática no WhatsApp', formato: 'v916' },

  // Fotografia — slots novos. Sem eles a página herdava reel de terceiro.
  { id: 'fotografia-quarto',       arquivo: '', rotulo: 'Quarto ou área comum em luz natural',   formato: 'v45' },
  { id: 'fotografia-fachada',      arquivo: '', rotulo: 'Fachada ou piscina no fim de tarde',    formato: 'v45' },
  { id: 'fotografia-gastronomia',  arquivo: '', rotulo: 'Prato ou detalhe do café da manhã',     formato: 'v45' },

  // Captação de vídeo — slots novos
  { id: 'captacao-video-bastidor', arquivo: '', rotulo: 'Bastidor de captação, câmera em uso',   formato: 'v916' },
  { id: 'captacao-video-drone',    arquivo: '', rotulo: 'Take de drone sobre a propriedade',     formato: 'v916' },
  { id: 'captacao-video-hospede',  arquivo: '', rotulo: 'Hóspede em cena, movimento de câmera',  formato: 'v916' },

  // Edição de vídeo — slots novos
  { id: 'edicao-video-antes-depois', arquivo: '', rotulo: 'Antes e depois de correção de cor',   formato: 'v916' },
  { id: 'edicao-video-reel-final',   arquivo: '', rotulo: 'Reel finalizado com legenda e trilha', formato: 'v916' },
  // Cobertura de evento
  { id: 'cobertura-de-evento-story',  arquivo: '', rotulo: 'Story publicado durante o evento, tela do celular', formato: 'v916' },
  { id: 'cobertura-de-evento-pista',  arquivo: '', rotulo: 'Pista ou público em movimento, fim de noite',       formato: 'v916' },
  { id: 'cobertura-de-evento-palco',  arquivo: '', rotulo: 'Palco ou line-up visto de longe',                   formato: 'h169' },
]

/* ─────────────────────────── CASE / PORTFÓLIO ───────────────────── */
const cases: Slot[] = [
  { id: 'case-cabare-abertura',  arquivo: '', rotulo: 'Foto ou vídeo de abertura do Cabaré du Vento', formato: 'h169' },
  { id: 'case-cabare-painel',    arquivo: '', rotulo: 'Print do painel com o período visível',        formato: 'h169' },
]

/* ─────────────────────────────── BLOG ────────────────────────────────
   Uma capa por post. Estavam todas no Unsplash, o que colocava imagem de
   banco em 60 páginas indexáveis de uma agência que vende produção própria.
   O rótulo diz que tipo de imagem a capa pede, para dar para preencher em
   lote sem abrir cada artigo.                                            */
const blog: Slot[] = [
  { id: 'blog-site-escola-kitesurf-ceara', arquivo: '', rotulo: 'Capa de "Por que sua escola de kitesurf precisa de um...": site de cliente aberto no celular ou no desktop', formato: 'h169' },
  { id: 'blog-site-pousada-jericoacoara', arquivo: '', rotulo: 'Capa de "Como um site bem feito aumenta reservas...": site de cliente aberto no celular ou no desktop', formato: 'h169' },
  { id: 'blog-landing-page-kite-cumbuco', arquivo: '', rotulo: 'Capa de "Landing page para escolas de kite em Cumbuco:...": site de cliente aberto no celular ou no desktop', formato: 'h169' },
  { id: 'blog-site-beach-club-litoral-ceara', arquivo: '', rotulo: 'Capa de "Site para beach clubs no litoral cearense: o...": site de cliente aberto no celular ou no desktop', formato: 'h169' },
  { id: 'blog-site-wingfoil-fortaleza-cumbuco', arquivo: '', rotulo: 'Capa de "Como criar um site para wingfoil que converte...": site de cliente aberto no celular ou no desktop', formato: 'h169' },
  { id: 'blog-site-pousada-pipa-turistas-sudeste', arquivo: '', rotulo: 'Capa de "Site para pousadas em Pipa: como atrair...": site de cliente aberto no celular ou no desktop', formato: 'h169' },
  { id: 'blog-seo-local-pousada-jericoacoara', arquivo: '', rotulo: 'Capa de "SEO local para pousadas em Jericoacoara: como...": site de cliente aberto no celular ou no desktop', formato: 'h169' },
  { id: 'blog-elementos-site-escola-kite-wingfoil', arquivo: '', rotulo: 'Capa de "7 elementos que todo site de escola de kite e...": site de cliente aberto no celular ou no desktop', formato: 'h169' },
  { id: 'blog-site-para-experiencias-litoral-ceara', arquivo: '', rotulo: 'Capa de "Site para experiências turísticas no litoral...": site de cliente aberto no celular ou no desktop', formato: 'h169' },
  { id: 'blog-google-meu-negocio-pousadas-escolas-ceara', arquivo: '', rotulo: 'Capa de "Google Meu Negócio para pousadas e escolas no...": site de cliente aberto no celular ou no desktop', formato: 'h169' },
  { id: 'blog-google-ads-escola-kitesurf-ceara', arquivo: '', rotulo: 'Capa de "Google Ads para escolas de kitesurf no Ceará:...": painel de campanha ou criativo de anúncio', formato: 'h169' },
  { id: 'blog-meta-ads-pousadas-jericoacoara', arquivo: '', rotulo: 'Capa de "Meta Ads para pousadas em Jericoacoara: como...": painel de campanha ou criativo de anúncio', formato: 'h169' },
  { id: 'blog-anuncios-instagram-beach-club-cumbuco', arquivo: '', rotulo: 'Capa de "Como anunciar seu beach club em Cumbuco no...": painel de campanha ou criativo de anúncio', formato: 'h169' },
  { id: 'blog-trafego-pago-wingfoil-ceara', arquivo: '', rotulo: 'Capa de "Tráfego pago para wingfoil: como escolas no...": painel de campanha ou criativo de anúncio', formato: 'h169' },
  { id: 'blog-google-ads-pousadas-canoa-quebrada', arquivo: '', rotulo: 'Capa de "Google Ads para pousadas em Canoa Quebrada:...": painel de campanha ou criativo de anúncio', formato: 'h169' },
  { id: 'blog-reduzir-ota-trafego-pago-ceara', arquivo: '', rotulo: 'Capa de "Como reduzir a dependência das OTAs em hotéis...": painel de campanha ou criativo de anúncio', formato: 'h169' },
  { id: 'blog-meta-ads-kite-wingfoil-segmentacao', arquivo: '', rotulo: 'Capa de "Meta Ads para kite e wingfoil: como segmentar...": painel de campanha ou criativo de anúncio', formato: 'h169' },
  { id: 'blog-remarketing-escola-kitesurf', arquivo: '', rotulo: 'Capa de "Remarketing para escolas de kitesurf: como...": painel de campanha ou criativo de anúncio', formato: 'h169' },
  { id: 'blog-campanhas-alta-temporada-kite-ceara', arquivo: '', rotulo: 'Capa de "Como preparar suas campanhas de tráfego pago...": painel de campanha ou criativo de anúncio', formato: 'h169' },
  { id: 'blog-google-ads-meta-ads-pousadas-litoral', arquivo: '', rotulo: 'Capa de "Google Ads vs Meta Ads para pousadas no...": painel de campanha ou criativo de anúncio', formato: 'h169' },
  { id: 'blog-trafego-pago-pipa-turistas-rio-sp', arquivo: '', rotulo: 'Capa de "Tráfego pago para pousadas em Pipa: como...": painel de campanha ou criativo de anúncio', formato: 'h169' },
  { id: 'blog-reels-kitesurf-atrair-alunos-ceara', arquivo: '', rotulo: 'Capa de "Reels para kitesurf: como criar vídeos que...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-instagram-pousadas-jericoacoara-agenda', arquivo: '', rotulo: 'Capa de "Instagram para pousadas em Jericoacoara: o...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-conteudo-redes-sociais-wingfoil', arquivo: '', rotulo: 'Capa de "Como produzir conteúdo para redes sociais que...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-social-media-beach-clubs-alta-temporada', arquivo: '', rotulo: 'Capa de "Social media para beach clubs no litoral...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-calendario-editorial-pousadas-beach-clubs-ceara', arquivo: '', rotulo: 'Capa de "Como criar um calendário editorial para...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-tiktok-kitesurf-ceara-alunos', arquivo: '', rotulo: 'Capa de "TikTok para kitesurf no Ceará: como escolas...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-stories-reels-escolas-kite-wingfoil', arquivo: '', rotulo: 'Capa de "Stories vs Reels: o que funciona melhor para...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-crescer-instagram-kitesurf-cumbuco-paracuru', arquivo: '', rotulo: 'Capa de "Como crescer no Instagram com conteúdo de...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-gestao-redes-sociais-temporada-kite', arquivo: '', rotulo: 'Capa de "Gestão de redes sociais para escolas de...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-conteudo-pipa-turistas-sudeste', arquivo: '', rotulo: 'Capa de "Conteúdo para redes sociais em Pipa: como...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-setup-instagram-escola-kitesurf-zero', arquivo: '', rotulo: 'Capa de "Setup de Instagram para escolas de kitesurf:...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-perfil-instagram-pousada-litoral-ceara', arquivo: '', rotulo: 'Capa de "Como estruturar o perfil do Instagram da sua...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-setup-redes-sociais-beach-club-ceara', arquivo: '', rotulo: 'Capa de "Setup de redes sociais para novos beach clubs...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-link-bio-escola-kite-wingfoil-converter', arquivo: '', rotulo: 'Capa de "Como configurar o link na bio para escolas de...": peça de feed ou story de cliente', formato: 'h169' },
  { id: 'blog-branding-escolas-kitesurf-estilo-vida', arquivo: '', rotulo: 'Capa de "Branding para escolas de kitesurf no Ceará:...": aplicação de marca, paleta ou fachada', formato: 'h169' },
  { id: 'blog-identidade-visual-pousadas-litoral-ceara', arquivo: '', rotulo: 'Capa de "Identidade visual para pousadas no litoral...": aplicação de marca, paleta ou fachada', formato: 'h169' },
  { id: 'blog-naming-escola-wingfoil-memoravel', arquivo: '', rotulo: 'Capa de "Como criar um naming para sua escola de...": aplicação de marca, paleta ou fachada', formato: 'h169' },
  { id: 'blog-branding-beach-club-cumbuco-referencia', arquivo: '', rotulo: 'Capa de "Branding para beach clubs em Cumbuco: a...": aplicação de marca, paleta ou fachada', formato: 'h169' },
  { id: 'blog-identidade-visual-impacta-matriculas-kite', arquivo: '', rotulo: 'Capa de "Por que a identidade visual da sua escola de...": aplicação de marca, paleta ou fachada', formato: 'h169' },
  { id: 'blog-manual-de-marca-negocio-turistico-ceara', arquivo: '', rotulo: 'Capa de "Manual de marca para negócios turísticos no...": aplicação de marca, paleta ou fachada', formato: 'h169' },
  { id: 'blog-rebranding-pousadas-litoral-ceara', arquivo: '', rotulo: 'Capa de "Rebranding para pousadas no litoral do Ceará:...": aplicação de marca, paleta ou fachada', formato: 'h169' },
  { id: 'blog-branding-wingfoil-premium-ceara', arquivo: '', rotulo: 'Capa de "Branding para experiências de wingfoil: como...": aplicação de marca, paleta ou fachada', formato: 'h169' },
  { id: 'blog-cumbuco-capital-kitesurf-ceara', arquivo: '', rotulo: 'Capa de "Cumbuco: por que a capital do kitesurf...": kite ou wingfoil no litoral do CE', formato: 'h169' },
  { id: 'blog-temporada-vento-ceara-marketing', arquivo: '', rotulo: 'Capa de "Temporada de vento no Ceará: como escolas de...": kite ou wingfoil no litoral do CE', formato: 'h169' },
  { id: 'blog-jericoacoara-kitesurf-marketing', arquivo: '', rotulo: 'Capa de "Jericoacoara e o kitesurf: como negócios do...": kite ou wingfoil no litoral do CE', formato: 'h169' },
  { id: 'blog-wingfoil-crescimento-litoral-ceara-2026', arquivo: '', rotulo: 'Capa de "Wingfoil no litoral cearense em 2026: o...": kite ou wingfoil no litoral do CE', formato: 'h169' },
  { id: 'blog-paracuru-icarai-kite-mkt', arquivo: '', rotulo: 'Capa de "Paracuru e Icaraí de Amontada: como escolas...": kite ou wingfoil no litoral do CE', formato: 'h169' },
  { id: 'blog-como-escola-kite-virou-referencia-nacional', arquivo: '', rotulo: 'Capa de "Como uma escola de kitesurf do Ceará virou...": kite ou wingfoil no litoral do CE', formato: 'h169' },
  { id: 'blog-drone-captacao-kitesurf-marketing', arquivo: '', rotulo: 'Capa de "Drone e captação aérea para kitesurf: como...": bastidor de captação, câmera ou drone em uso', formato: 'h169' },
  { id: 'blog-fotografia-profissional-pousadas-reservas', arquivo: '', rotulo: 'Capa de "Fotografia profissional para pousadas no...": bastidor de captação, câmera ou drone em uso', formato: 'h169' },
  { id: 'blog-video-kite-wingfoil-gera-leads', arquivo: '', rotulo: 'Capa de "Como vídeos de kitesurf e wingfoil captados...": bastidor de captação, câmera ou drone em uso', formato: 'h169' },
  { id: 'blog-o-que-filmar-escola-esporte-redes', arquivo: '', rotulo: 'Capa de "Produção de vídeo para escolas de esporte: o...": bastidor de captação, câmera ou drone em uso', formato: 'h169' },
  { id: 'blog-captacao-profissional-roi-pousada-jeri', arquivo: '', rotulo: 'Capa de "Por que investir em captação profissional é o...": bastidor de captação, câmera ou drone em uso', formato: 'h169' },
  { id: 'blog-bastidores-escola-kite-conteudo-autentico', arquivo: '', rotulo: 'Capa de "Bastidores da escola de kite: como conteúdo...": bastidor de captação, câmera ou drone em uso', formato: 'h169' },
  { id: 'blog-crm-escola-kitesurf-matriculas', arquivo: '', rotulo: 'Capa de "CRM para escolas de kitesurf: como organizar...": painel de sistema ou automação em tela', formato: 'h169' },
  { id: 'blog-automacao-whatsapp-pousadas-ceara', arquivo: '', rotulo: 'Capa de "Automação de WhatsApp para pousadas no...": painel de sistema ou automação em tela', formato: 'h169' },
  { id: 'blog-sistema-interno-escola-kite-matriculas', arquivo: '', rotulo: 'Capa de "Como um sistema interno ajudou uma escola de...": painel de sistema ou automação em tela', formato: 'h169' },
  { id: 'blog-crm-relacionamento-hospedes-hotel', arquivo: '', rotulo: 'Capa de "Gestão de relacionamento com hóspedes: como...": painel de sistema ou automação em tela', formato: 'h169' },
  { id: 'blog-automacao-marketing-pousadas-escala', arquivo: '', rotulo: 'Capa de "Automação de marketing para pousadas e...": painel de sistema ou automação em tela', formato: 'h169' },
]

/** Tudo junto, que é o que os componentes consultam. */
export const slots: Slot[] = [...home, ...destinos, ...sobre, ...produtos, ...cases, ...blog]

/**
 * Quais slots pertencem a cada grade, na ordem de exibição.
 *
 * A chave é o slug do PRODUTO, igual ao da rota. Produto sem chave aqui não
 * renderiza seção de mídia nenhuma, que é o comportamento certo enquanto o
 * acervo não chega.
 */
export const GRADES: Record<string, { variante: 'reels' | 'verticais' | 'destaque'; ids: string[] }> = {
  'home-estudio':          { variante: 'verticais', ids: ['home-estudio-time-captacao', 'home-estudio-bastidor', 'home-estudio-time-foto'] },
  'sobre-origem':          { variante: 'verticais', ids: ['sobre-origem-hostel', 'sobre-origem-escola-kite', 'sobre-origem-captacao'] },

  'producao-conteudo':     { variante: 'reels',     ids: ['producao-conteudo-reel-pousada', 'producao-conteudo-reel-beach-club', 'producao-conteudo-story-bastidor', 'producao-conteudo-reel-cafe'] },
  'gestao-de-trafego':     { variante: 'verticais', ids: ['gestao-de-trafego-criativo-vertical', 'gestao-de-trafego-painel-resultado', 'gestao-de-trafego-criativo-animado'] },
  'website-institucional': { variante: 'destaque',  ids: ['website-institucional-celular', 'website-institucional-desktop'] },
  'identidade-visual':     { variante: 'verticais', ids: ['identidade-visual-papelaria', 'identidade-visual-paleta', 'identidade-visual-fachada'] },
  'pecas-animadas':        { variante: 'verticais', ids: ['pecas-animadas-vinheta', 'pecas-animadas-lower-third'] },
  'automacoes':            { variante: 'destaque',  ids: ['automacoes-story-mare', 'automacoes-painel-reserva'] },
  'crm':                   { variante: 'verticais', ids: ['crm-resposta-whatsapp'] },
  'fotografia':            { variante: 'verticais', ids: ['fotografia-quarto', 'fotografia-fachada', 'fotografia-gastronomia'] },
  'captacao-video':        { variante: 'verticais', ids: ['captacao-video-bastidor', 'captacao-video-drone', 'captacao-video-hospede'] },
  'cobertura-de-evento':   { variante: 'verticais', ids: ['cobertura-de-evento-story', 'cobertura-de-evento-pista', 'cobertura-de-evento-palco'] },
  'edicao-video':          { variante: 'verticais', ids: ['edicao-video-antes-depois', 'edicao-video-reel-final'] },
}

const porId = new Map(slots.map(s => [s.id, s]))

export function slot(id: string): Slot | undefined {
  return porId.get(id)
}

export function grade(chave: string) {
  const g = GRADES[chave]
  if (!g) return undefined
  return { variante: g.variante, slots: g.ids.map(id => porId.get(id)).filter((s): s is Slot => Boolean(s)) }
}

/** `.mp4` e `.webm` entram como vídeo; o resto, como imagem. */
export function ehVideo(arquivo: string) {
  return /\.(mp4|webm)$/i.test(arquivo)
}

/** Quantos slots já têm arquivo, para o relatório de pendência. */
export function preenchidos() {
  const total = slots.length
  const cheios = slots.filter(s => s.arquivo).length
  return { total, cheios, vazios: total - cheios }
}
