'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { blogContent } from '@/data/blog-content'

/* ── shared posts meta (same list as blog/page.tsx) ── */
const G = {
  a: 'from-[#1B3025] via-[#2D5238] to-[#345E3F]',
  b: 'from-[#0F2018] via-[#1B3025] to-[#243D2D]',
  c: 'from-[#162B20] via-[#243D2D] to-[#345E3F]',
  d: 'from-[#243D2D] via-[#1B3025] to-[#0F2018]',
  e: 'from-[#1B3025] via-[#2A4F35] to-[#0F2018]',
  f: 'from-[#0F2018] via-[#243D2D] to-[#2D5238]',
}

const posts = [
  { slug: 'site-escola-kitesurf-ceara', category: 'Web Design', title: 'Por que sua escola de kitesurf precisa de um site profissional para atrair alunos no Ceará', excerpt: 'A maioria das escolas de kitesurf no Ceará perde alunos antes mesmo do primeiro contato — por falta de presença digital.', date: '28 Mai 2026', readTime: '6 min', gradient: G.a },
  { slug: 'site-pousada-jericoacoara', category: 'Web Design', title: 'Como um site bem feito aumenta reservas diretas de pousadas em Jericoacoara', excerpt: 'Pousadas em Jericoacoara que dependem exclusivamente do Booking e Airbnb perdem até 30% da receita em comissão.', date: '22 Mai 2026', readTime: '7 min', gradient: G.b },
  { slug: 'landing-page-kite-cumbuco', category: 'Web Design', title: 'Landing page para escolas de kite em Cumbuco: como converter visitantes em alunos', excerpt: 'Uma landing page focada em conversão pode triplicar a taxa de matrícula online para escolas de kitesurf em Cumbuco.', date: '15 Mai 2026', readTime: '5 min', gradient: G.c },
  { slug: 'site-beach-club-litoral-ceara', category: 'Web Design', title: 'Site para beach clubs no litoral cearense: o que não pode faltar para vender experiência online', excerpt: 'Vender a experiência de um beach club antes da visita é um desafio — e o site é a única ferramenta que você controla 100%.', date: '10 Mai 2026', readTime: '6 min', gradient: G.d },
  { slug: 'site-wingfoil-fortaleza-cumbuco', category: 'Web Design', title: 'Como criar um site para wingfoil que converte turistas em alunos em Fortaleza e Cumbuco', excerpt: 'O wingfoil é a modalidade que mais cresce no litoral cearense — e a maioria das escolas ainda não tem presença digital à altura.', date: '05 Mai 2026', readTime: '5 min', gradient: G.e },
  { slug: 'site-pousada-pipa-turistas-sudeste', category: 'Web Design', title: 'Site para pousadas em Pipa: como atrair turistas do sudeste sem depender de OTA', excerpt: 'Pipa atrai turistas de São Paulo e Rio de Janeiro o ano todo — e um site bem posicionado no Google é a diferença entre lotar e depender do Booking.', date: '28 Abr 2026', readTime: '6 min', gradient: G.a },
  { slug: 'seo-local-pousada-jericoacoara', category: 'Web Design', title: 'SEO local para pousadas em Jericoacoara: como aparecer no topo do Google quando o turista pesquisa', excerpt: 'As primeiras posições concentram mais de 70% dos cliques. Veja como otimizar para dominar esses resultados.', date: '20 Abr 2026', readTime: '7 min', gradient: G.b },
  { slug: 'elementos-site-escola-kite-wingfoil', category: 'Web Design', title: '7 elementos que todo site de escola de kite e wingfoil precisa ter para converter', excerpt: 'O checklist completo que usamos na Explore Digital para sites que realmente geram matrículas.', date: '12 Abr 2026', readTime: '5 min', gradient: G.c },
  { slug: 'site-para-experiencias-litoral-ceara', category: 'Web Design', title: 'Site para experiências turísticas no litoral do Ceará: como vender antes do contato', excerpt: 'Passeios, aulas, experiências gastronômicas — cada negócio precisa de um site que convença o turista antes do primeiro contato.', date: '05 Abr 2026', readTime: '6 min', gradient: G.d },
  { slug: 'google-meu-negocio-pousadas-escolas-ceara', category: 'Web Design', title: 'Google Meu Negócio para pousadas e escolas no litoral cearense: guia completo', excerpt: 'Uma ficha do Google Meu Negócio bem otimizada aparece antes do site nos resultados locais.', date: '06 Fev 2026', readTime: '5 min', gradient: G.b },
  { slug: 'google-ads-escola-kitesurf-ceara', category: 'Tráfego Pago', title: 'Google Ads para escolas de kitesurf no Ceará: como aparecer quando o aluno está pesquisando', excerpt: 'Quem pesquisa "aula de kitesurf no Ceará" está pronto para comprar. O Google Ads coloca sua escola no momento exato da intenção.', date: '26 Mai 2026', readTime: '6 min', gradient: G.e },
  { slug: 'meta-ads-pousadas-jericoacoara', category: 'Tráfego Pago', title: 'Meta Ads para pousadas em Jericoacoara: como atrair turistas nacionais e internacionais', excerpt: 'O Meta Ads permite segmentar exatamente quem você quer: brasileiros de viagem, europeus interessados em kite, aventureiros de qualquer lugar.', date: '19 Mai 2026', readTime: '7 min', gradient: G.f },
  { slug: 'anuncios-instagram-beach-club-cumbuco', category: 'Tráfego Pago', title: 'Como anunciar seu beach club em Cumbuco no Instagram e lotar aos fins de semana', excerpt: 'Com a segmentação certa no Instagram Ads, é possível lotar o fim de semana com antecedência e consistência.', date: '13 Mai 2026', readTime: '5 min', gradient: G.a },
  { slug: 'trafego-pago-wingfoil-ceara', category: 'Tráfego Pago', title: 'Tráfego pago para wingfoil: como escolas no Ceará estão captando alunos online', excerpt: 'O custo por clique no wingfoil ainda é mais baixo que no kite — a oportunidade de se posicionar é enorme.', date: '07 Mai 2026', readTime: '5 min', gradient: G.b },
  { slug: 'google-ads-pousadas-canoa-quebrada', category: 'Tráfego Pago', title: 'Google Ads para pousadas em Canoa Quebrada: guia prático de reservas diretas', excerpt: 'O Google Ads bem configurado é o que separa quem aparece na frente das OTAs de quem paga comissão o ano todo.', date: '30 Abr 2026', readTime: '7 min', gradient: G.c },
  { slug: 'reduzir-ota-trafego-pago-ceara', category: 'Tráfego Pago', title: 'Como reduzir a dependência das OTAs em hotéis do litoral cearense com tráfego pago', excerpt: 'Hotéis cearenses que inverteram o modelo com tráfego pago próprio aumentaram a margem em até 25% no primeiro ano.', date: '23 Abr 2026', readTime: '8 min', gradient: G.d },
  { slug: 'meta-ads-kite-wingfoil-segmentacao', category: 'Tráfego Pago', title: 'Meta Ads para kite e wingfoil: como segmentar para atrair o aluno certo sem desperdiçar verba', excerpt: 'Com a segmentação correta, o custo por matrícula cai drasticamente — interesses, comportamento e lookalike de alunos.', date: '16 Abr 2026', readTime: '6 min', gradient: G.e },
  { slug: 'remarketing-escola-kitesurf', category: 'Tráfego Pago', title: 'Remarketing para escolas de kitesurf: como recuperar visitantes que não se matricularam', excerpt: 'Só 2% dos visitantes convertem na primeira visita. O remarketing recupera os outros 98%.', date: '09 Abr 2026', readTime: '5 min', gradient: G.f },
  { slug: 'campanhas-alta-temporada-kite-ceara', category: 'Tráfego Pago', title: 'Como preparar suas campanhas de tráfego pago para a alta temporada de kite no Ceará', excerpt: 'Escolas que preparam as campanhas com 60 dias de antecedência chegam na temporada com agenda cheia.', date: '02 Abr 2026', readTime: '7 min', gradient: G.a },
  { slug: 'google-ads-meta-ads-pousadas-litoral', category: 'Tráfego Pago', title: 'Google Ads vs Meta Ads para pousadas no litoral cearense: qual usar para cada objetivo', excerpt: 'Google captura quem já quer ir; Meta cria o desejo de ir. A estratégia vencedora combina as duas.', date: '25 Mar 2026', readTime: '8 min', gradient: G.b },
  { slug: 'trafego-pago-pipa-turistas-rio-sp', category: 'Tráfego Pago', title: 'Tráfego pago para pousadas em Pipa: como atrair turistas do Rio e de São Paulo', excerpt: 'Com Meta Ads segmentado, é possível lotar a agenda de hóspedes de alto valor antes mesmo da temporada começar.', date: '18 Mar 2026', readTime: '6 min', gradient: G.c },
  { slug: 'reels-kitesurf-atrair-alunos-ceara', category: 'Social Media', title: 'Reels para kitesurf: como criar vídeos que atraem alunos para o litoral cearense', excerpt: 'Um reel bem editado com vento, mar e estilo de vida pode gerar dezenas de pedidos de informação em um único dia.', date: '24 Mai 2026', readTime: '5 min', gradient: G.d },
  { slug: 'instagram-pousadas-jericoacoara-agenda', category: 'Social Media', title: 'Instagram para pousadas em Jericoacoara: o que postar para lotar a agenda o ano todo', excerpt: 'A diferença entre lista de espera e dependência do Booking está no que postar, quando e para quem.', date: '17 Mai 2026', readTime: '6 min', gradient: G.e },
  { slug: 'conteudo-redes-sociais-wingfoil', category: 'Social Media', title: 'Como produzir conteúdo para redes sociais que vende experiências de wingfoil', excerpt: 'O conteúdo que converte seguidores em alunos conta uma história: liberdade, progressão, comunidade.', date: '10 Mai 2026', readTime: '5 min', gradient: G.f },
  { slug: 'social-media-beach-clubs-alta-temporada', category: 'Social Media', title: 'Social media para beach clubs no litoral cearense: estratégia completa para a alta temporada', excerpt: 'Os beach clubs que enchem de quinta a domingo construíram audiência 3 meses antes da temporada.', date: '03 Mai 2026', readTime: '6 min', gradient: G.a },
  { slug: 'calendario-editorial-pousadas-beach-clubs-ceara', category: 'Social Media', title: 'Como criar um calendário editorial para pousadas e beach clubs no litoral do Ceará', excerpt: 'Um calendário editorial garante consistência, variedade e alinhamento com os picos de demanda turística.', date: '26 Abr 2026', readTime: '5 min', gradient: G.b },
  { slug: 'tiktok-kitesurf-ceara-alunos', category: 'Social Media', title: 'TikTok para kitesurf no Ceará: como escolas estão viralizando e atraindo alunos novos', excerpt: 'Um vídeo viral pode trazer centenas de pedidos de informação sem gastar nada em anúncios.', date: '19 Abr 2026', readTime: '5 min', gradient: G.c },
  { slug: 'stories-reels-escolas-kite-wingfoil', category: 'Social Media', title: 'Stories vs Reels: o que funciona melhor para escolas de kite e wingfoil no Instagram', excerpt: 'Stories criam proximidade; Reels geram descoberta. A combinação certa define se o Instagram é canal de vendas ou portfólio.', date: '12 Abr 2026', readTime: '4 min', gradient: G.d },
  { slug: 'crescer-instagram-kitesurf-cumbuco-paracuru', category: 'Social Media', title: 'Como crescer no Instagram com conteúdo de kitesurf orgânico em Cumbuco e Paracuru', excerpt: 'Escolas em Cumbuco e Paracuru que aplicam esses princípios chegam a triplicar o engajamento em três meses.', date: '05 Abr 2026', readTime: '6 min', gradient: G.e },
  { slug: 'gestao-redes-sociais-temporada-kite', category: 'Social Media', title: 'Gestão de redes sociais para escolas de esporte: como manter consistência na temporada', excerpt: 'Na temporada a escola está cheia — e o Instagram fica abandonado exatamente quando mais pessoas pesquisam.', date: '29 Mar 2026', readTime: '5 min', gradient: G.f },
  { slug: 'conteudo-pipa-turistas-sudeste', category: 'Social Media', title: 'Conteúdo para redes sociais em Pipa: como atrair turistas do Rio e de São Paulo', excerpt: 'A estratégia de conteúdo certa comunica estilo de vida, não apenas estrutura de hospedagem.', date: '22 Mar 2026', readTime: '5 min', gradient: G.a },
  { slug: 'setup-instagram-escola-kitesurf-zero', category: 'Social Media', title: 'Setup de Instagram para escolas de kitesurf: como começar do zero da forma certa', excerpt: 'Bio estratégica, destaques organizados, link na bio funcionando — é assim que uma escola lança o perfil profissionalmente.', date: '06 Mar 2026', readTime: '5 min', gradient: G.d },
  { slug: 'perfil-instagram-pousada-litoral-ceara', category: 'Social Media', title: 'Como estruturar o perfil do Instagram da sua pousada no litoral cearense do zero', excerpt: 'Detalhes que convertem visita em seguidor e seguidor em hóspede.', date: '27 Fev 2026', readTime: '4 min', gradient: G.e },
  { slug: 'setup-redes-sociais-beach-club-ceara', category: 'Social Media', title: 'Setup de redes sociais para novos beach clubs no Ceará: checklist completo', excerpt: 'Abrir sem presença digital estruturada é deixar dinheiro na mesa desde o dia um.', date: '20 Fev 2026', readTime: '5 min', gradient: G.f },
  { slug: 'link-bio-escola-kite-wingfoil-converter', category: 'Social Media', title: 'Como configurar o link na bio para escolas de kite e wingfoil e converter seguidores', excerpt: 'Um link na bio bem estruturado pode dobrar o número de pedidos de informação.', date: '13 Fev 2026', readTime: '4 min', gradient: G.a },
  { slug: 'branding-escolas-kitesurf-estilo-vida', category: 'Branding', title: 'Branding para escolas de kitesurf no Ceará: como criar uma marca que vende estilo de vida', excerpt: 'As escolas que entendem isso cobram mais, retêm alunos e viram referência.', date: '20 Mai 2026', readTime: '7 min', gradient: G.b },
  { slug: 'identidade-visual-pousadas-litoral-ceara', category: 'Branding', title: 'Identidade visual para pousadas no litoral cearense: como comunicar experiência antes da reserva', excerpt: 'Uma identidade fraca comunica amadorismo; uma identidade forte vende antes do contato.', date: '14 Mai 2026', readTime: '6 min', gradient: G.c },
  { slug: 'naming-escola-wingfoil-memoravel', category: 'Branding', title: 'Como criar um naming para sua escola de wingfoil que seja memorável e internacional', excerpt: 'Para escolas que querem atrair alunos internacionais, o naming é o primeiro ativo estratégico.', date: '08 Mai 2026', readTime: '5 min', gradient: G.d },
  { slug: 'branding-beach-club-cumbuco-referencia', category: 'Branding', title: 'Branding para beach clubs em Cumbuco: a diferença entre uma marca genérica e uma referência', excerpt: 'O que separa o cheio do vazio não é a estrutura: é a marca.', date: '01 Mai 2026', readTime: '6 min', gradient: G.e },
  { slug: 'identidade-visual-impacta-matriculas-kite', category: 'Branding', title: 'Por que a identidade visual da sua escola de kite impacta diretamente nas matrículas', excerpt: 'Alunos julgam a qualidade da aula pela qualidade da marca — antes de qualquer contato.', date: '24 Abr 2026', readTime: '5 min', gradient: G.f },
  { slug: 'manual-de-marca-negocio-turistico-ceara', category: 'Branding', title: 'Manual de marca para negócios turísticos no Ceará: por que você precisa de um', excerpt: 'Sem manual de marca, a identidade visual se perde ao longo do tempo em todos os canais.', date: '17 Abr 2026', readTime: '5 min', gradient: G.a },
  { slug: 'rebranding-pousadas-litoral-ceara', category: 'Branding', title: 'Rebranding para pousadas no litoral do Ceará: quando renovar a identidade e como fazer certo', excerpt: 'Pousadas que passaram por rebranding relatam aumento imediato no ticket médio.', date: '10 Abr 2026', readTime: '7 min', gradient: G.b },
  { slug: 'branding-wingfoil-premium-ceara', category: 'Branding', title: 'Branding para experiências de wingfoil: como posicionar sua escola como premium no Ceará', excerpt: 'Uma marca premium alinhada ao posicionamento permite cobrar um ticket condizente com a experiência.', date: '03 Abr 2026', readTime: '6 min', gradient: G.c },
  { slug: 'cumbuco-capital-kitesurf-ceara', category: 'Kitesurf & Wingfoil', title: 'Cumbuco: por que a capital do kitesurf cearense é também a maior oportunidade de negócio do litoral', excerpt: 'Quem se posiciona digitalmente agora vai dominar o mercado na próxima temporada.', date: '27 Mai 2026', readTime: '6 min', gradient: G.d },
  { slug: 'temporada-vento-ceara-marketing', category: 'Kitesurf & Wingfoil', title: 'Temporada de vento no Ceará: como escolas de kite e wingfoil devem se preparar digitalmente', excerpt: 'Escolas que começam as campanhas com 90 dias de antecedência chegam com agenda esgotada.', date: '21 Mai 2026', readTime: '7 min', gradient: G.e },
  { slug: 'jericoacoara-kitesurf-marketing', category: 'Kitesurf & Wingfoil', title: 'Jericoacoara e o kitesurf: como negócios do destino mais icônico do Ceará podem crescer no digital', excerpt: 'Veja como transformar o poder da marca Jeri em reservas e matrículas reais.', date: '14 Mai 2026', readTime: '6 min', gradient: G.f },
  { slug: 'wingfoil-crescimento-litoral-ceara-2026', category: 'Kitesurf & Wingfoil', title: 'Wingfoil no litoral cearense em 2026: o esporte que cresce e a oportunidade que poucos estão vendo', excerpt: 'Quem chegar primeiro vai dominar o segmento por anos.', date: '07 Mai 2026', readTime: '5 min', gradient: G.a },
  { slug: 'paracuru-icarai-kite-mkt', category: 'Kitesurf & Wingfoil', title: 'Paracuru e Icaraí de Amontada: como escolas de kite nesses destinos atraem alunos do mundo todo', excerpt: 'Escolas nesses locais têm acesso a um público premium que precisa de marketing digital para ser encontrado.', date: '30 Abr 2026', readTime: '6 min', gradient: G.b },
  { slug: 'como-escola-kite-virou-referencia-nacional', category: 'Kitesurf & Wingfoil', title: 'Como uma escola de kitesurf do Ceará virou referência nacional com estratégia digital', excerpt: 'Da presença zero ao reconhecimento nacional em 18 meses. Veja o caminho que funciona.', date: '23 Abr 2026', readTime: '8 min', gradient: G.c },
  { slug: 'drone-captacao-kitesurf-marketing', category: 'Captações', title: 'Drone e captação aérea para kitesurf: como vídeos épicos transformam o marketing das escolas', excerpt: 'Imagens aéreas viralizam, geram compartilhamentos e enchem a agenda.', date: '18 Mai 2026', readTime: '5 min', gradient: G.d },
  { slug: 'fotografia-profissional-pousadas-reservas', category: 'Captações', title: 'Fotografia profissional para pousadas no litoral do Ceará: como imagens vendem antes da visita', excerpt: 'Imagens profissionais geram reservas antes de qualquer conversa.', date: '11 Mai 2026', readTime: '5 min', gradient: G.e },
  { slug: 'video-kite-wingfoil-gera-leads', category: 'Captações', title: 'Como vídeos de kitesurf e wingfoil captados no Ceará geram leads qualificados nas redes', excerpt: 'Vídeos captados durante aulas reais valem mais do que qualquer anúncio.', date: '04 Mai 2026', readTime: '6 min', gradient: G.f },
  { slug: 'o-que-filmar-escola-esporte-redes', category: 'Captações', title: 'Produção de vídeo para escolas de esporte: o que filmar para atrair alunos nas redes sociais', excerpt: 'Este guia prático mostra o que produzir para cada etapa do funil de matrículas.', date: '27 Mar 2026', readTime: '5 min', gradient: G.a },
  { slug: 'captacao-profissional-roi-pousada-jeri', category: 'Captações', title: 'Por que investir em captação profissional é o melhor ROI para pousadas em Jericoacoara', excerpt: 'Uma sessão gera banco de conteúdo para meses de posts, anúncios e campanhas.', date: '20 Mar 2026', readTime: '5 min', gradient: G.b },
  { slug: 'bastidores-escola-kite-conteudo-autentico', category: 'Captações', title: 'Bastidores da escola de kite: como conteúdo autêntico gera mais matrícula do que anúncio', excerpt: 'Conteúdo autêntico cria uma conexão que nenhum anúncio consegue replicar.', date: '13 Mar 2026', readTime: '5 min', gradient: G.c },
  { slug: 'crm-escola-kitesurf-matriculas', category: 'Sistemas', title: 'CRM para escolas de kitesurf: como organizar leads e nunca perder uma matrícula', excerpt: 'Um CRM bem configurado garante que nenhum aluno em potencial escorregue.', date: '30 Jan 2026', readTime: '6 min', gradient: G.d },
  { slug: 'automacao-whatsapp-pousadas-ceara', category: 'Sistemas', title: 'Automação de WhatsApp para pousadas no litoral cearense: como responder 24h sem equipe', excerpt: 'Automações de WhatsApp garantem que sua pousada nunca perca uma oportunidade.', date: '22 Jan 2026', readTime: '5 min', gradient: G.e },
  { slug: 'sistema-interno-escola-kite-matriculas', category: 'Sistemas', title: 'Como um sistema interno ajudou uma escola de kite a dobrar as matrículas sem contratar', excerpt: 'Um sistema interno resolve o caos operacional e libera o instrutor para focar no que importa: ensinar.', date: '15 Jan 2026', readTime: '6 min', gradient: G.f },
  { slug: 'crm-relacionamento-hospedes-hotel', category: 'Sistemas', title: 'Gestão de relacionamento com hóspedes: como um CRM muda o jogo para pousadas cearenses', excerpt: 'Hóspede fidelizado não precisa ser captado de novo — e custa muito menos.', date: '08 Jan 2026', readTime: '6 min', gradient: G.a },
  { slug: 'automacao-marketing-pousadas-escala', category: 'Sistemas', title: 'Automação de marketing para pousadas e escolas no litoral cearense: como ganhar escala', excerpt: 'Automações simples elevam a experiência do cliente e geram avaliações sem esforço manual.', date: '01 Jan 2026', readTime: '5 min', gradient: G.a },
]

function getRelated(slug: string, category: string, limit = 3) {
  return posts.filter(p => p.slug !== slug && p.category === category).slice(0, limit)
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const locale = params.locale as string

  const post = posts.find(p => p.slug === slug)
  const content = blogContent[slug]

  if (!post || !content) notFound()

  const related = getRelated(slug, post.category)

  return (
    <>
      <Navbar />

      {/* Hero visual com gradiente do post */}
      <div className={cn('relative w-full h-[340px] sm:h-[420px] bg-gradient-to-br overflow-hidden', post.gradient)}>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(193,213,189,0.08) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-g-dark/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 pb-10">
          <AnimateIn>
            <span className="inline-block text-[10px] font-bold tracking-[0.18em] uppercase text-g-light/70 bg-g-dark/50 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="font-display text-[clamp(22px,3.8vw,48px)] font-normal leading-[1.1] tracking-[-0.025em] text-white max-w-[820px]">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 mt-4 text-[12px] text-g-light/50">
              <span>{post.date}</span>
              <span className="text-g-light/25">·</span>
              <span>{post.readTime} de leitura</span>
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* Corpo do artigo */}
      <main className="bg-white">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24 grid lg:grid-cols-[1fr_320px] gap-16 items-start">

          {/* Coluna principal */}
          <article>
            {/* Excerpt intro */}
            <AnimateIn>
              <p className="text-[18px] text-g-dark/70 leading-[1.85] font-normal mb-10 border-l-4 border-g-mid/40 pl-5">
                {post.excerpt}
              </p>
            </AnimateIn>

            {/* Seções do artigo */}
            {content.sections.map((section, i) => (
              <AnimateIn key={i} delay={i * 0.08} className="mb-10">
                <h2 className="font-sans text-[20px] sm:text-[22px] font-bold text-g-dark leading-[1.3] tracking-tight mb-4">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-[16px] text-g-dark/65 leading-[1.85] mb-4 font-normal">
                    {p}
                  </p>
                ))}
              </AnimateIn>
            ))}

            {/* Pull quote */}
            {content.pullQuote && (
              <AnimateIn>
                <blockquote className="my-12 px-8 py-6 bg-g-pale rounded-2xl border-l-4 border-g-mid relative overflow-hidden">
                  <div className="absolute top-4 right-6 text-[64px] leading-none text-g-mid/10 font-serif select-none">&ldquo;</div>
                  <p className="text-[18px] font-bold text-g-dark leading-[1.5] relative z-10 italic">
                    {content.pullQuote}
                  </p>
                </blockquote>
              </AnimateIn>
            )}

            {/* CTA inline */}
            <AnimateIn>
              <div className="mt-14 rounded-2xl bg-g-dark p-8 lg:p-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_100%_50%,#2D5238,transparent)] opacity-50" />
                <div className="relative z-10">
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-light/40 mb-3">Explore Digital</p>
                  <h3 className="font-display text-[clamp(18px,2.2vw,26px)] font-normal text-white leading-tight mb-6 max-w-[480px]">
                    {content.cta.heading}
                  </h3>
                  <Link
                    href={`/${locale}${content.cta.href}`}
                    className="inline-flex items-center gap-2 bg-g-light text-g-dark font-bold px-6 py-3 rounded-full hover:bg-g-pale hover:-translate-y-0.5 transition-all duration-200 text-[14px]"
                  >
                    {content.cta.label}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
                  </Link>
                </div>
              </div>
            </AnimateIn>
          </article>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28">
            <AnimateIn>
              {/* Card de serviço */}
              <div className="rounded-2xl border border-g-dark/10 bg-g-pale p-6 mb-6">
                <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-g-mid mb-3">Serviço relacionado</p>
                <h4 className="font-sans font-bold text-[16px] text-g-dark leading-snug mb-4">
                  {content.cta.heading}
                </h4>
                <Link
                  href={`/${locale}${content.cta.href}`}
                  className="block text-center bg-g-dark text-white font-bold text-[13px] px-5 py-3 rounded-xl hover:bg-g-mid transition-colors duration-200"
                >
                  {content.cta.label}
                </Link>
              </div>

              {/* WhatsApp direto */}
              <div className="rounded-2xl border border-g-dark/10 bg-white p-6 mb-6">
                <p className="text-[13px] text-g-dark/60 mb-4 leading-[1.6]">
                  Prefere conversar antes? Nossa equipe está no WhatsApp.
                </p>
                <a
                  href="https://wa.me/5585910430670?text=Ol%C3%A1!%20Vi%20o%20blog%20da%20Explore%20Digital%20e%20quero%20saber%20mais."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold text-[13px] px-5 py-3 rounded-xl hover:brightness-95 transition-all duration-200"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  Falar no WhatsApp
                </a>
              </div>

              {/* Posts relacionados */}
              {related.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-g-dark/40 mb-4">Leia também</p>
                  <div className="flex flex-col gap-3">
                    {related.map(r => (
                      <Link
                        key={r.slug}
                        href={`/${locale}/blog/${r.slug}`}
                        className="group flex gap-3 items-start"
                      >
                        <div className={cn('w-12 h-12 rounded-lg bg-gradient-to-br shrink-0', r.gradient)} />
                        <span className="text-[13px] font-semibold text-g-dark/70 leading-snug group-hover:text-g-mid transition-colors line-clamp-2">
                          {r.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </AnimateIn>
          </aside>

        </div>

        {/* Voltar para o blog */}
        <div className="border-t border-g-dark/8 py-8">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-[13px] font-bold text-g-dark/50 hover:text-g-dark transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 3L5 7l4 4"/></svg>
              Voltar para o Blog
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
