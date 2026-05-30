'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Navbar }  from '@/components/sections/Navbar'
import { Footer }  from '@/components/sections/Footer'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'

const CATEGORIES = ['Todos', 'Web Design', 'Tráfego Pago', 'Social Media', 'Branding', 'Kitesurf & Wingfoil', 'Captações', 'Sistemas']
const PER_PAGE = 12

interface Post {
  slug: string
  category: string
  title: string
  excerpt: string
  date: string
  readTime: string
  featured?: boolean
  gradient: string
  keywords: string[]
}

const G = {
  a: 'from-[#1B3025] via-[#2D5238] to-[#345E3F]',
  b: 'from-[#0F2018] via-[#1B3025] to-[#243D2D]',
  c: 'from-[#162B20] via-[#243D2D] to-[#345E3F]',
  d: 'from-[#243D2D] via-[#1B3025] to-[#0F2018]',
  e: 'from-[#1B3025] via-[#2A4F35] to-[#0F2018]',
  f: 'from-[#0F2018] via-[#243D2D] to-[#2D5238]',
}

const posts: Post[] = [
  /* ── WEB DESIGN (9 posts) ── */
  {
    slug: 'site-escola-kitesurf-ceara',
    category: 'Web Design',
    title: 'Por que sua escola de kitesurf precisa de um site profissional para atrair alunos no Ceará',
    excerpt: 'A maioria das escolas de kitesurf no Ceará perde alunos antes mesmo do primeiro contato — por falta de presença digital. Um site bem construído trabalha por você 24h e converte o turista curioso em aluno matriculado.',
    date: '28 Mai 2026', readTime: '6 min', featured: true,
    gradient: G.a,
    keywords: ['site escola kitesurf ceará', 'marketing digital kitesurf', 'site kite cumbuco'],
  },
  {
    slug: 'site-pousada-jericoacoara',
    category: 'Web Design',
    title: 'Como um site bem feito aumenta reservas diretas de pousadas em Jericoacoara',
    excerpt: 'Pousadas em Jericoacoara que dependem exclusivamente do Booking e Airbnb perdem até 30% da receita em comissão. Um site próprio e bem otimizado muda esse jogo — e o retorno vem na primeira temporada.',
    date: '22 Mai 2026', readTime: '7 min',
    gradient: G.b,
    keywords: ['site pousada jericoacoara', 'reservas diretas jeri', 'marketing digital hotelaria ceará'],
  },
  {
    slug: 'landing-page-kite-cumbuco',
    category: 'Web Design',
    title: 'Landing page para escolas de kite em Cumbuco: como converter visitantes em alunos',
    excerpt: 'Uma landing page focada em conversão é diferente de um site institucional. Para escolas de kitesurf em Cumbuco, uma página bem estruturada com prova social e CTA claro pode triplicar a taxa de matrícula online.',
    date: '15 Mai 2026', readTime: '5 min',
    gradient: G.c,
    keywords: ['landing page kitesurf cumbuco', 'site kite cumbuco', 'converter leads kite ceará'],
  },
  {
    slug: 'site-beach-club-litoral-ceara',
    category: 'Web Design',
    title: 'Site para beach clubs no litoral cearense: o que não pode faltar para vender experiência online',
    excerpt: 'Vender a experiência de um beach club antes da visita é um desafio — e o site é a única ferramenta que você controla 100%. Entenda o que os melhores sites de beach clubs têm em comum e o que você precisa implementar.',
    date: '10 Mai 2026', readTime: '6 min',
    gradient: G.d,
    keywords: ['site beach club ceará', 'marketing beach club litoral', 'web design beach club cearense'],
  },
  {
    slug: 'site-wingfoil-fortaleza-cumbuco',
    category: 'Web Design',
    title: 'Como criar um site para wingfoil que converte turistas em alunos em Fortaleza e Cumbuco',
    excerpt: 'O wingfoil é a modalidade que mais cresce no litoral cearense — mas a maioria das escolas ainda não tem presença digital à altura do esporte. Veja como um site bem construído posiciona sua escola como referência.',
    date: '05 Mai 2026', readTime: '5 min',
    gradient: G.e,
    keywords: ['site wingfoil fortaleza', 'wingfoil cumbuco escola', 'marketing wingfoil ceará'],
  },
  {
    slug: 'site-pousada-pipa-turistas-sudeste',
    category: 'Web Design',
    title: 'Site para pousadas em Pipa: como atrair turistas do sudeste sem depender de OTA',
    excerpt: 'Pipa atrai turistas de São Paulo e Rio de Janeiro o ano todo — mas a disputa pelo clique orgânico é acirrada. Um site bem posicionado no Google e com boa experiência mobile é a diferença entre lotar e depender do Booking.',
    date: '28 Abr 2026', readTime: '6 min',
    gradient: G.a,
    keywords: ['site pousada pipa rn', 'turismo pipa natal', 'reservas diretas pousada pipa'],
  },
  {
    slug: 'seo-local-pousada-jericoacoara',
    category: 'Web Design',
    title: 'SEO local para pousadas em Jericoacoara: como aparecer no topo do Google quando o turista pesquisa',
    excerpt: 'Quando alguém digita "pousada em Jericoacoara" no Google, as primeiras posições concentram mais de 70% dos cliques. Veja como otimizar o seu site e o Google Meu Negócio para dominar esses resultados.',
    date: '20 Abr 2026', readTime: '7 min',
    gradient: G.b,
    keywords: ['seo pousada jericoacoara', 'google meu negócio jeri', 'aparecer no google jericoacoara'],
  },
  {
    slug: 'elementos-site-escola-kite-wingfoil',
    category: 'Web Design',
    title: '7 elementos que todo site de escola de kite e wingfoil precisa ter para converter',
    excerpt: 'Fotos de qualidade, depoimentos de alunos, integração com WhatsApp, pacotes de aula claros — existem elementos que toda escola de esporte precisa ter no site. Aqui está o checklist completo que usamos na Explore Digital.',
    date: '12 Abr 2026', readTime: '5 min',
    gradient: G.c,
    keywords: ['site escola kite wingfoil', 'como criar site escola kite', 'web design esporte aquático'],
  },
  {
    slug: 'site-para-experiencias-litoral-ceara',
    category: 'Web Design',
    title: 'Site para experiências turísticas no litoral do Ceará: como vender antes do contato',
    excerpt: 'Passeios de buggy, aulas de surfe, experiências gastronômicas à beira-mar — cada um desses negócios precisa de um site que convença o turista antes que ele ligue ou mande mensagem. Veja como estruturar isso.',
    date: '05 Abr 2026', readTime: '6 min',
    gradient: G.d,
    keywords: ['site experiências turísticas ceará', 'marketing turismo litoral cearense', 'site turismo ceará'],
  },

  /* ── TRÁFEGO PAGO (11 posts) ── */
  {
    slug: 'google-ads-escola-kitesurf-ceara',
    category: 'Tráfego Pago',
    title: 'Google Ads para escolas de kitesurf no Ceará: como aparecer quando o aluno está pesquisando',
    excerpt: 'Quem pesquisa "aula de kitesurf no Ceará" está pronto para comprar. Esse é o público mais qualificado que existe — e o Google Ads coloca sua escola na frente dele no momento exato da intenção.',
    date: '26 Mai 2026', readTime: '6 min',
    gradient: G.e,
    keywords: ['google ads kitesurf ceará', 'anúncios google escola kite', 'tráfego pago kite ceará'],
  },
  {
    slug: 'meta-ads-pousadas-jericoacoara',
    category: 'Tráfego Pago',
    title: 'Meta Ads para pousadas em Jericoacoara: como atrair turistas nacionais e internacionais',
    excerpt: 'Jericoacoara atrai turistas do mundo inteiro — e o Meta Ads permite segmentar exatamente quem você quer: brasileiros que seguem páginas de viagem, europeus interessados em kite, ou aventureiros de qualquer lugar.',
    date: '19 Mai 2026', readTime: '7 min',
    gradient: G.f,
    keywords: ['meta ads pousada jericoacoara', 'facebook ads hotelaria ceará', 'anúncios instagram jeri'],
  },
  {
    slug: 'anuncios-instagram-beach-club-cumbuco',
    category: 'Tráfego Pago',
    title: 'Como anunciar seu beach club em Cumbuco no Instagram e lotar aos fins de semana',
    excerpt: 'Cumbuco fica a menos de uma hora de Fortaleza — o que significa que o público certo está do lado de casa. Com a segmentação certa no Instagram Ads, é possível lotar o fim de semana com antecedência e consistência.',
    date: '13 Mai 2026', readTime: '5 min',
    gradient: G.a,
    keywords: ['anúncios instagram beach club cumbuco', 'instagram ads cumbuco', 'tráfego pago beach club'],
  },
  {
    slug: 'trafego-pago-wingfoil-ceara',
    category: 'Tráfego Pago',
    title: 'Tráfego pago para wingfoil: como escolas no Ceará estão captando alunos online',
    excerpt: 'O wingfoil cresce rápido, mas o volume de busca ainda é menor que o kite — o que significa que o custo por clique é mais baixo e a oportunidade de se posicionar como referência nacional é enorme.',
    date: '07 Mai 2026', readTime: '5 min',
    gradient: G.b,
    keywords: ['tráfego pago wingfoil', 'anúncios escola wingfoil ceará', 'google ads wingfoil'],
  },
  {
    slug: 'google-ads-pousadas-canoa-quebrada',
    category: 'Tráfego Pago',
    title: 'Google Ads para pousadas em Canoa Quebrada: guia prático de reservas diretas',
    excerpt: 'Canoa Quebrada tem uma das maiores concentrações de pousadas do litoral cearense. O Google Ads bem configurado é o que separa quem aparece na frente das OTAs de quem paga comissão o ano todo.',
    date: '30 Abr 2026', readTime: '7 min',
    gradient: G.c,
    keywords: ['google ads canoa quebrada', 'pousada canoa quebrada reservas', 'marketing digital canoa quebrada'],
  },
  {
    slug: 'reduzir-ota-trafego-pago-ceara',
    category: 'Tráfego Pago',
    title: 'Como reduzir a dependência das OTAs em hotéis do litoral cearense com tráfego pago',
    excerpt: 'Pagar 15% a 20% de comissão para o Booking em toda reserva é uma sangria silenciosa. Hotéis e pousadas cearenses que inverteram esse modelo com tráfego pago próprio aumentaram a margem em até 25% no primeiro ano.',
    date: '23 Abr 2026', readTime: '8 min',
    gradient: G.d,
    keywords: ['reduzir ota hotel ceará', 'reservas diretas hotel litoral', 'tráfego pago hotelaria cearense'],
  },
  {
    slug: 'meta-ads-kite-wingfoil-segmentacao',
    category: 'Tráfego Pago',
    title: 'Meta Ads para kite e wingfoil: como segmentar para atrair o aluno certo sem desperdiçar verba',
    excerpt: 'Anunciar para "todo mundo" é o erro mais comum nas escolas de esporte. Com a segmentação correta no Meta Ads — interesses, comportamento e lookalike de alunos — o custo por matrícula cai drasticamente.',
    date: '16 Abr 2026', readTime: '6 min',
    gradient: G.e,
    keywords: ['meta ads escola kite wingfoil', 'segmentação facebook kite', 'anúncios esporte aquático'],
  },
  {
    slug: 'remarketing-escola-kitesurf',
    category: 'Tráfego Pago',
    title: 'Remarketing para escolas de kitesurf: como recuperar visitantes que não se matricularam',
    excerpt: 'Só 2% dos visitantes se convertem na primeira visita ao site. O remarketing bem estruturado recupera os outros 98% — lembrando sua escola no momento certo, com a mensagem certa.',
    date: '09 Abr 2026', readTime: '5 min',
    gradient: G.f,
    keywords: ['remarketing escola kitesurf', 'pixel facebook kite', 'retargeting escola esporte'],
  },
  {
    slug: 'campanhas-alta-temporada-kite-ceara',
    category: 'Tráfego Pago',
    title: 'Como preparar suas campanhas de tráfego pago para a alta temporada de kite no Ceará',
    excerpt: 'A janela de vento no Ceará concentra a maioria das matrículas entre julho e fevereiro. Escolas que preparam as campanhas com 60 dias de antecedência chegam na temporada com agenda cheia — as outras brigam por sobras.',
    date: '02 Abr 2026', readTime: '7 min',
    gradient: G.a,
    keywords: ['temporada kite ceará', 'campanhas alta temporada kitesurf', 'marketing temporada vento ceará'],
  },
  {
    slug: 'google-ads-meta-ads-pousadas-litoral',
    category: 'Tráfego Pago',
    title: 'Google Ads vs Meta Ads para pousadas no litoral cearense: qual usar para cada objetivo',
    excerpt: 'Google captura quem já quer ir; Meta cria o desejo de ir. Para pousadas no litoral cearense, a estratégia vencedora combina as duas plataformas em momentos diferentes do funil — e o resultado é reservas o ano todo.',
    date: '25 Mar 2026', readTime: '8 min',
    gradient: G.b,
    keywords: ['google ads meta ads pousada ceará', 'tráfego pago hotelaria comparativo', 'anúncios hotel litoral'],
  },
  {
    slug: 'trafego-pago-pipa-turistas-rio-sp',
    category: 'Tráfego Pago',
    title: 'Tráfego pago para pousadas em Pipa: como atrair turistas do Rio e de São Paulo',
    excerpt: 'Pipa é o destino favorito de quem mora no sudeste e quer praia com personalidade. Com Meta Ads segmentado por interesse e geolocalização, é possível lotar a agenda de hóspedes de alto valor antes mesmo da temporada começar.',
    date: '18 Mar 2026', readTime: '6 min',
    gradient: G.c,
    keywords: ['tráfego pago pousada pipa', 'turistas rio são paulo pipa', 'meta ads pipa rn'],
  },

  /* ── SOCIAL MEDIA (10 posts) ── */
  {
    slug: 'reels-kitesurf-atrair-alunos-ceara',
    category: 'Social Media',
    title: 'Reels para kitesurf: como criar vídeos que atraem alunos para o litoral cearense',
    excerpt: 'O algoritmo do Instagram prioriza vídeos que geram desejo de imediato. Para escolas de kite no Ceará, um reel bem editado com vento, mar e estilo de vida pode gerar dezenas de pedidos de informação em um único dia.',
    date: '24 Mai 2026', readTime: '5 min',
    gradient: G.d,
    keywords: ['reels kitesurf ceará', 'vídeos instagram kite', 'conteúdo kitesurf redes sociais'],
  },
  {
    slug: 'instagram-pousadas-jericoacoara-agenda',
    category: 'Social Media',
    title: 'Instagram para pousadas em Jericoacoara: o que postar para lotar a agenda o ano todo',
    excerpt: 'Pousadas em Jericoacoara que postam com consistência e estratégia têm lista de espera — as que postam de vez em quando dependem do Booking. A diferença está no que postar, quando e para quem.',
    date: '17 Mai 2026', readTime: '6 min',
    gradient: G.e,
    keywords: ['instagram pousada jericoacoara', 'o que postar pousada', 'social media hotelaria jeri'],
  },
  {
    slug: 'conteudo-redes-sociais-wingfoil',
    category: 'Social Media',
    title: 'Como produzir conteúdo para redes sociais que vende experiências de wingfoil',
    excerpt: 'Wingfoil vende visualmente — mas não basta ter imagens bonitas. O conteúdo que converte seguidores em alunos conta uma história: a liberdade, a progressão, a comunidade. Veja como estruturar essa narrativa.',
    date: '10 Mai 2026', readTime: '5 min',
    gradient: G.f,
    keywords: ['conteúdo social media wingfoil', 'instagram escola wingfoil', 'marketing wingfoil redes sociais'],
  },
  {
    slug: 'social-media-beach-clubs-alta-temporada',
    category: 'Social Media',
    title: 'Social media para beach clubs no litoral cearense: estratégia completa para a alta temporada',
    excerpt: 'A alta temporada no litoral cearense dura meses — mas os beach clubs que enchem de quinta a domingo são os que construíram audiência antes disso. A estratégia começa três meses antes do primeiro reel de temporada.',
    date: '03 Mai 2026', readTime: '6 min',
    gradient: G.a,
    keywords: ['social media beach club ceará', 'redes sociais temporada kite', 'marketing beach club litoral cearense'],
  },
  {
    slug: 'calendario-editorial-pousadas-beach-clubs-ceara',
    category: 'Social Media',
    title: 'Como criar um calendário editorial para pousadas e beach clubs no litoral do Ceará',
    excerpt: 'Publicar sem planejamento é a diferença entre presença e ruído nas redes sociais. Um calendário editorial bem montado garante consistência, variedade e alinhamento com os picos de demanda turística no Ceará.',
    date: '26 Abr 2026', readTime: '5 min',
    gradient: G.b,
    keywords: ['calendário editorial pousada ceará', 'planejamento conteúdo hotelaria', 'social media hotelaria litoral'],
  },
  {
    slug: 'tiktok-kitesurf-ceara-alunos',
    category: 'Social Media',
    title: 'TikTok para kitesurf no Ceará: como escolas estão viralizando e atraindo alunos novos',
    excerpt: 'O TikTok democratizou o alcance orgânico — e para escolas de kitesurf no Ceará, um vídeo viral pode trazer centenas de pedidos de informação sem gastar nada em anúncios. O segredo está na autenticidade e no ritmo.',
    date: '19 Abr 2026', readTime: '5 min',
    gradient: G.c,
    keywords: ['tiktok kitesurf ceará', 'viral kite tiktok', 'conteúdo tiktok escola kite'],
  },
  {
    slug: 'stories-reels-escolas-kite-wingfoil',
    category: 'Social Media',
    title: 'Stories vs Reels: o que funciona melhor para escolas de kite e wingfoil no Instagram',
    excerpt: 'Stories criam proximidade; Reels geram descoberta. Para escolas de esporte aquático, a combinação certa das duas ferramentas define se o Instagram é um canal de vendas ou apenas um portfólio bonito.',
    date: '12 Abr 2026', readTime: '4 min',
    gradient: G.d,
    keywords: ['stories reels instagram escola kite', 'instagram escola kitesurf', 'estratégia instagram kite'],
  },
  {
    slug: 'crescer-instagram-kitesurf-cumbuco-paracuru',
    category: 'Social Media',
    title: 'Como crescer no Instagram com conteúdo de kitesurf orgânico em Cumbuco e Paracuru',
    excerpt: 'Crescimento orgânico exige consistência, qualidade e uma estratégia de hashtags e localização. Escolas em Cumbuco e Paracuru que aplicam esses princípios chegam a triplicar o engajamento em três meses.',
    date: '05 Abr 2026', readTime: '6 min',
    gradient: G.e,
    keywords: ['instagram orgânico kitesurf cumbuco', 'crescer instagram kite', 'paracuru kitesurf instagram'],
  },
  {
    slug: 'gestao-redes-sociais-temporada-kite',
    category: 'Social Media',
    title: 'Gestão de redes sociais para escolas de esporte: como manter consistência na temporada',
    excerpt: 'Na temporada, a escola está cheia de aulas e o Instagram fica abandonado — exatamente quando mais pessoas estão pesquisando. Veja como estruturar a gestão para que o conteúdo rode mesmo no dia mais corrido.',
    date: '29 Mar 2026', readTime: '5 min',
    gradient: G.f,
    keywords: ['gestão redes sociais escola kite temporada', 'social media temporada kitesurf', 'conteúdo escola kite ceará'],
  },
  {
    slug: 'conteudo-pipa-turistas-sudeste',
    category: 'Social Media',
    title: 'Conteúdo para redes sociais em Pipa: como atrair turistas do Rio e de São Paulo',
    excerpt: 'O público de alto poder aquisitivo do sudeste busca destinos com personalidade — e Pipa tem isso de sobra. A estratégia de conteúdo certa comunica estilo de vida, não apenas estrutura de hospedagem.',
    date: '22 Mar 2026', readTime: '5 min',
    gradient: G.a,
    keywords: ['conteúdo instagram pipa', 'social media pousada pipa', 'turistas sudeste pipa rn'],
  },

  /* ── BRANDING (8 posts) ── */
  {
    slug: 'branding-escolas-kitesurf-estilo-vida',
    category: 'Branding',
    title: 'Branding para escolas de kitesurf no Ceará: como criar uma marca que vende estilo de vida',
    excerpt: 'Kitesurf não é só um esporte — é um estilo de vida. As escolas que entendem isso e constroem uma marca à altura dessa identidade cobram mais, retêm alunos e viram referência. As que vendem "aula de kite" disputam por preço.',
    date: '20 Mai 2026', readTime: '7 min',
    gradient: G.b,
    keywords: ['branding escola kitesurf ceará', 'marca kitesurf estilo de vida', 'identidade visual escola kite'],
  },
  {
    slug: 'identidade-visual-pousadas-litoral-ceara',
    category: 'Branding',
    title: 'Identidade visual para pousadas no litoral cearense: como comunicar experiência antes da reserva',
    excerpt: 'A primeira reserva começa no momento em que o viajante vê a identidade visual da pousada — logo, cores, tipografia. Uma identidade fraca comunica amadorismo; uma identidade forte vende antes do contato.',
    date: '14 Mai 2026', readTime: '6 min',
    gradient: G.c,
    keywords: ['identidade visual pousada ceará', 'branding pousada litoral', 'logo pousada cearense'],
  },
  {
    slug: 'naming-escola-wingfoil-memoravel',
    category: 'Branding',
    title: 'Como criar um naming para sua escola de wingfoil que seja memorável e internacional',
    excerpt: 'Um nome bem escolhido facilita o boca a boca, funciona em qualquer idioma e resiste ao tempo. Para escolas de wingfoil no Ceará que querem atrair alunos internacionais, o naming é o primeiro ativo estratégico.',
    date: '08 Mai 2026', readTime: '5 min',
    gradient: G.d,
    keywords: ['naming escola wingfoil', 'nome escola kite wingfoil', 'branding esporte aquático ceará'],
  },
  {
    slug: 'branding-beach-club-cumbuco-referencia',
    category: 'Branding',
    title: 'Branding para beach clubs em Cumbuco: a diferença entre uma marca genérica e uma referência',
    excerpt: 'Cumbuco tem dezenas de beach clubs — e todos têm sol, praia e drink. O que separa o cheio do vazio não é a estrutura: é a marca. Veja como construir uma identidade que gera desejo antes mesmo da visita.',
    date: '01 Mai 2026', readTime: '6 min',
    gradient: G.e,
    keywords: ['branding beach club cumbuco', 'identidade visual beach club ceará', 'marca beach club litoral'],
  },
  {
    slug: 'identidade-visual-impacta-matriculas-kite',
    category: 'Branding',
    title: 'Por que a identidade visual da sua escola de kite impacta diretamente nas matrículas',
    excerpt: 'Alunos em potencial julgam a qualidade da aula pela qualidade da marca — antes de qualquer contato. Uma identidade visual profissional transmite confiança, segurança e competência técnica mesmo que ninguém tenha feito a primeira aula.',
    date: '24 Abr 2026', readTime: '5 min',
    gradient: G.f,
    keywords: ['identidade visual escola kite matrículas', 'branding impacto vendas kitesurf', 'marca escola kite'],
  },
  {
    slug: 'manual-de-marca-negocio-turistico-ceara',
    category: 'Branding',
    title: 'Manual de marca para negócios turísticos no Ceará: por que você precisa de um',
    excerpt: 'Sem um manual de marca, cada post tem uma cor diferente, cada material tem uma logo distorcida, e a identidade visual se perde ao longo do tempo. O manual de marca é o que garante consistência em tudo que você publica.',
    date: '17 Abr 2026', readTime: '5 min',
    gradient: G.a,
    keywords: ['manual de marca turismo ceará', 'brand book negócio turístico', 'identidade visual consistente ceará'],
  },
  {
    slug: 'rebranding-pousadas-litoral-ceara',
    category: 'Branding',
    title: 'Rebranding para pousadas no litoral do Ceará: quando renovar a identidade e como fazer certo',
    excerpt: 'Uma marca velha comunica abandono — mesmo que a experiência seja excelente. Pousadas cearenses que passaram por rebranding relatam aumento imediato no ticket médio e na percepção de valor pelos hóspedes.',
    date: '10 Abr 2026', readTime: '7 min',
    gradient: G.b,
    keywords: ['rebranding pousada ceará', 'renovar identidade visual hotelaria', 'rebranding litoral cearense'],
  },
  {
    slug: 'branding-wingfoil-premium-ceara',
    category: 'Branding',
    title: 'Branding para experiências de wingfoil: como posicionar sua escola como premium no Ceará',
    excerpt: 'Wingfoil é naturalmente exclusivo — o equipamento é caro, a curva de aprendizado é real, e o público é seleto. Uma marca premium alinhada a esse posicionamento permite cobrar um ticket condizente com a experiência.',
    date: '03 Abr 2026', readTime: '6 min',
    gradient: G.c,
    keywords: ['branding wingfoil premium ceará', 'escola wingfoil posicionamento', 'marca wingfoil litoral'],
  },

  /* ── KITESURF & WINGFOIL (6 posts) ── */
  {
    slug: 'cumbuco-capital-kitesurf-ceara',
    category: 'Kitesurf & Wingfoil',
    title: 'Cumbuco: por que a capital do kitesurf cearense é também a maior oportunidade de negócio do litoral',
    excerpt: 'Cumbuco concentra o maior número de alunos, instrutores e escolas de kitesurf do Ceará — e ainda assim há espaço para crescer. Quem se posiciona digitalmente agora vai dominar o mercado na próxima temporada.',
    date: '27 Mai 2026', readTime: '6 min',
    gradient: G.d,
    keywords: ['cumbuco kitesurf negócio', 'marketing kitesurf cumbuco', 'escola kite cumbuco ceará'],
  },
  {
    slug: 'temporada-vento-ceara-marketing',
    category: 'Kitesurf & Wingfoil',
    title: 'Temporada de vento no Ceará: como escolas de kite e wingfoil devem se preparar digitalmente',
    excerpt: 'A janela de vento no Ceará é previsível — o que significa que a preparação do marketing também deve ser. Escolas que começam as campanhas com 90 dias de antecedência chegam na temporada com agenda esgotada.',
    date: '21 Mai 2026', readTime: '7 min',
    gradient: G.e,
    keywords: ['temporada vento ceará kitesurf', 'marketing temporada kite', 'preparação digital escola kite'],
  },
  {
    slug: 'jericoacoara-kitesurf-marketing',
    category: 'Kitesurf & Wingfoil',
    title: 'Jericoacoara e o kitesurf: como negócios do destino mais icônico do Ceará podem crescer no digital',
    excerpt: 'Jericoacoara tem um posicionamento natural de destino premium — mas muitas escolas e pousadas ainda não exploram isso digitalmente. Veja como transformar o poder da marca Jeri em reservas e matrículas reais.',
    date: '14 Mai 2026', readTime: '6 min',
    gradient: G.f,
    keywords: ['jericoacoara kitesurf marketing', 'marketing digital jeri ceará', 'escola kite jericoacoara'],
  },
  {
    slug: 'wingfoil-crescimento-litoral-ceara-2026',
    category: 'Kitesurf & Wingfoil',
    title: 'Wingfoil no litoral cearense em 2026: o esporte que cresce e a oportunidade que poucos estão vendo',
    excerpt: 'O wingfoil ainda não tem a saturação de mercado do kitesurf — o que representa uma janela de oportunidade para escolas que se posicionarem digitalmente agora. Quem chegar primeiro vai dominar o segmento por anos.',
    date: '07 Mai 2026', readTime: '5 min',
    gradient: G.a,
    keywords: ['wingfoil ceará 2026', 'escola wingfoil oportunidade', 'wingfoil litoral cearense crescimento'],
  },
  {
    slug: 'paracuru-icarai-kite-mkt',
    category: 'Kitesurf & Wingfoil',
    title: 'Paracuru e Icaraí de Amontada: como escolas de kite nesses destinos atraem alunos do mundo todo',
    excerpt: 'Paracuru e Icaraí são destinos cult entre kitesurfistas internacionais. Escolas nesses locais têm acesso a um público premium — mas precisam de marketing digital para ser encontradas por quem está do outro lado do mundo planejando a viagem.',
    date: '30 Abr 2026', readTime: '6 min',
    gradient: G.b,
    keywords: ['kitesurf paracuru', 'escola kite icaraí de amontada', 'marketing kite destinos ceará'],
  },
  {
    slug: 'como-escola-kite-virou-referencia-nacional',
    category: 'Kitesurf & Wingfoil',
    title: 'Como uma escola de kitesurf do Ceará virou referência nacional com estratégia digital',
    excerpt: 'Da presença zero ao reconhecimento nacional em 18 meses — esse é o resultado do que acontece quando uma escola de kite investe em site, tráfego pago e conteúdo com estratégia. Veja o caminho que funciona.',
    date: '23 Abr 2026', readTime: '8 min',
    gradient: G.c,
    keywords: ['escola kite referência nacional', 'case marketing kitesurf ceará', 'estratégia digital escola kite'],
  },

  /* ── CAPTAÇÕES (6 posts) ── */
  {
    slug: 'drone-captacao-kitesurf-marketing',
    category: 'Captações',
    title: 'Drone e captação aérea para kitesurf: como vídeos épicos transformam o marketing das escolas',
    excerpt: 'Um vídeo de drone sobre Cumbuco ou Jericoacoara com kites no ar não é apenas bonito — é a ferramenta de marketing mais poderosa que uma escola pode ter. Imagens assim viralizam, geram compartilhamentos e enchem a agenda.',
    date: '18 Mai 2026', readTime: '5 min',
    gradient: G.d,
    keywords: ['drone kitesurf ceará', 'captação aérea kite', 'vídeo drone escola kite marketing'],
  },
  {
    slug: 'fotografia-profissional-pousadas-reservas',
    category: 'Captações',
    title: 'Fotografia profissional para pousadas no litoral do Ceará: como imagens vendem antes da visita',
    excerpt: 'Fotos amadoras afastam hóspedes de alto valor — mesmo que a pousada seja excelente. Imagens profissionais que comunicam o clima, o conforto e a personalidade do espaço geram reservas antes de qualquer conversa.',
    date: '11 Mai 2026', readTime: '5 min',
    gradient: G.e,
    keywords: ['fotografia profissional pousada ceará', 'fotos pousada litoral', 'captação foto hotel cearense'],
  },
  {
    slug: 'video-kite-wingfoil-gera-leads',
    category: 'Captações',
    title: 'Como vídeos de kitesurf e wingfoil captados no Ceará geram leads qualificados nas redes',
    excerpt: 'Conteúdo audiovisual autêntico é o que mais converte nas redes sociais para escolas de esporte. Vídeos captados durante aulas reais, com alunos felizes e condições incríveis de vento, valem mais do que qualquer anúncio.',
    date: '04 Mai 2026', readTime: '6 min',
    gradient: G.f,
    keywords: ['vídeo kitesurf ceará leads', 'captação vídeo escola kite', 'conteúdo audiovisual kite wingfoil'],
  },
  {
    slug: 'o-que-filmar-escola-esporte-redes',
    category: 'Captações',
    title: 'Produção de vídeo para escolas de esporte: o que filmar para atrair alunos nas redes sociais',
    excerpt: 'Não falta cena bonita em uma escola de kite ou wingfoil — falta saber o que filmar, como editar e quando publicar. Este guia prático mostra o que produzir para cada etapa do funil de matrículas.',
    date: '27 Mar 2026', readTime: '5 min',
    gradient: G.a,
    keywords: ['vídeo escola kite wingfoil', 'o que filmar escola kite', 'produção conteúdo esporte aquático'],
  },
  {
    slug: 'captacao-profissional-roi-pousada-jeri',
    category: 'Captações',
    title: 'Por que investir em captação profissional é o melhor ROI para pousadas em Jericoacoara',
    excerpt: 'Uma sessão de fotografia e vídeo profissional gera banco de conteúdo para meses de posts, anúncios e campanhas. Para pousadas em Jericoacoara, esse investimento se paga na primeira reserva gerada pelas novas imagens.',
    date: '20 Mar 2026', readTime: '5 min',
    gradient: G.b,
    keywords: ['roi captação profissional pousada jeri', 'investimento foto vídeo hotelaria', 'captação pousada jericoacoara'],
  },
  {
    slug: 'bastidores-escola-kite-conteudo-autentico',
    category: 'Captações',
    title: 'Bastidores da escola de kite: como conteúdo autêntico gera mais matrícula do que anúncio',
    excerpt: 'Mostrar o dia a dia da escola — o instrutor preparando o equipamento, o aluno decolando pela primeira vez, o pôr do sol em Cumbuco — cria uma conexão que nenhum anúncio consegue replicar. Veja como produzir isso.',
    date: '13 Mar 2026', readTime: '5 min',
    gradient: G.c,
    keywords: ['bastidores escola kite conteúdo', 'conteúdo autêntico kitesurf', 'captação dia a dia escola kite'],
  },

  /* ── SISTEMAS (5 posts) ── */
  {
    slug: 'crm-escola-kitesurf-matriculas',
    category: 'Sistemas',
    title: 'CRM para escolas de kitesurf: como organizar leads e nunca perder uma matrícula',
    excerpt: 'Uma escola de kite que gerencia leads por WhatsApp e planilha perde matrículas por esquecimento todo dia. Um CRM bem configurado registra cada contato, define follow-up automático e garante que nenhum aluno em potencial escorregue.',
    date: '30 Jan 2026', readTime: '6 min',
    gradient: G.d,
    keywords: ['crm escola kitesurf', 'gestão leads escola kite', 'crm escola esporte ceará'],
  },
  {
    slug: 'automacao-whatsapp-pousadas-ceara',
    category: 'Sistemas',
    title: 'Automação de WhatsApp para pousadas no litoral cearense: como responder 24h sem equipe',
    excerpt: 'O turista pesquisa pousada às 23h, manda mensagem no WhatsApp e espera resposta. Se a concorrente responde primeiro, a reserva vai embora. Automações de WhatsApp garantem que sua pousada nunca perca uma oportunidade.',
    date: '22 Jan 2026', readTime: '5 min',
    gradient: G.e,
    keywords: ['automação whatsapp pousada ceará', 'chatbot pousada litoral', 'resposta automática hotel ceará'],
  },
  {
    slug: 'sistema-interno-escola-kite-matriculas',
    category: 'Sistemas',
    title: 'Como um sistema interno ajudou uma escola de kite a dobrar as matrículas sem contratar',
    excerpt: 'Controlar agendamento de aulas, histórico de alunos, progresso por nível e emissão de certificados em planilhas é ineficiente e propenso a erros. Um sistema interno resolve isso — e libera o instrutor para focar no que importa: ensinar.',
    date: '15 Jan 2026', readTime: '6 min',
    gradient: G.f,
    keywords: ['sistema interno escola kite', 'gestão escola kitesurf sistema', 'software escola esporte ceará'],
  },
  {
    slug: 'crm-relacionamento-hospedes-hotel',
    category: 'Sistemas',
    title: 'Gestão de relacionamento com hóspedes: como um CRM muda o jogo para pousadas cearenses',
    excerpt: 'Hóspede fidelizado não precisa ser captado de novo — e custa muito menos. Um CRM que registra preferências, datas e histórico de estadias permite criar campanhas de retorno que enchem a agenda na baixa temporada.',
    date: '08 Jan 2026', readTime: '6 min',
    gradient: G.a,
    keywords: ['crm pousada ceará', 'fidelização hóspedes hotel', 'gestão relacionamento hotelaria cearense'],
  },
  {
    slug: 'automacao-marketing-pousadas-escala',
    category: 'Sistemas',
    title: 'Automação de marketing para pousadas e escolas no litoral cearense: como ganhar escala',
    excerpt: 'E-mail automático pós-reserva, sequência de WhatsApp antes do check-in, lembrete de avaliação após a estadia — são automações simples que elevam a experiência do cliente e geram avaliações positivas sem esforço manual.',
    date: '01 Jan 2026', readTime: '5 min',
    gradient: G.a,
    keywords: ['automação marketing pousada ceará', 'escala marketing hotelaria', 'automação escola kite wingfoil'],
  },

  /* ── SOCIAL MEDIA — Setup (4 posts) ── */
  {
    slug: 'setup-instagram-escola-kitesurf-zero',
    category: 'Social Media',
    title: 'Setup de Instagram para escolas de kitesurf: como começar do zero da forma certa',
    excerpt: 'Começar errado no Instagram custa meses de retrabalho. Bio estratégica, destaques organizados, link na bio funcionando e as primeiras postagens já com identidade visual — é assim que uma escola de kite lança o perfil profissionalmente.',
    date: '06 Mar 2026', readTime: '5 min',
    gradient: G.d,
    keywords: ['setup instagram escola kitesurf', 'criar instagram escola kite', 'instagram do zero escola kite'],
  },
  {
    slug: 'perfil-instagram-pousada-litoral-ceara',
    category: 'Social Media',
    title: 'Como estruturar o perfil do Instagram da sua pousada no litoral cearense do zero',
    excerpt: 'Um perfil bem estruturado faz a pousada parecer estabelecida e confiável desde o primeiro acesso. Bio clara, destaques organizados por categoria e foto de perfil da marca — são detalhes que convertem visita em seguidor e seguidor em hóspede.',
    date: '27 Fev 2026', readTime: '4 min',
    gradient: G.e,
    keywords: ['instagram pousada litoral ceará estrutura', 'perfil instagram pousada', 'setup redes sociais hotelaria'],
  },
  {
    slug: 'setup-redes-sociais-beach-club-ceara',
    category: 'Social Media',
    title: 'Setup de redes sociais para novos beach clubs no Ceará: checklist completo',
    excerpt: 'Abrir um beach club sem presença digital estruturada é deixar dinheiro na mesa desde o dia um. Este checklist cobre tudo: criação de perfis, configuração de anúncios, primeiros posts e estratégia de lançamento.',
    date: '20 Fev 2026', readTime: '5 min',
    gradient: G.f,
    keywords: ['setup redes sociais beach club ceará', 'checklist marketing beach club', 'lançamento digital beach club cearense'],
  },
  {
    slug: 'link-bio-escola-kite-wingfoil-converter',
    category: 'Social Media',
    title: 'Como configurar o link na bio para escolas de kite e wingfoil e converter seguidores',
    excerpt: 'O link na bio é a ponte entre o seguidor e a matrícula — e a maioria das escolas de esporte o usa de forma errada. Um link na bio bem estruturado com opções claras pode dobrar o número de pedidos de informação.',
    date: '13 Fev 2026', readTime: '4 min',
    gradient: G.a,
    keywords: ['link na bio escola kite', 'linktree escola kitesurf', 'converter instagram escola kite'],
  },
  {
    slug: 'google-meu-negocio-pousadas-escolas-ceara',
    category: 'Web Design',
    title: 'Google Meu Negócio para pousadas e escolas no litoral cearense: guia completo',
    excerpt: 'Uma ficha do Google Meu Negócio bem otimizada aparece antes do site nos resultados locais. Para pousadas em Jericoacoara e escolas de kite em Cumbuco, essa é uma das fontes de reservas e matrículas mais baratas que existem.',
    date: '06 Fev 2026', readTime: '5 min',
    gradient: G.b,
    keywords: ['google meu negócio pousada ceará', 'google maps kitesurf ceará', 'ficha google hotel litoral'],
  },
]

function FeaturedCard({ post }: { post: Post }) {
  const locale = useLocale()
  return (
    <AnimateIn>
      <Link href={`/${locale}/blog/${post.slug}`}
        className="group block overflow-hidden rounded-2xl bg-g-dark border border-white/[0.08] hover:border-g-mid/40 transition-colors duration-300">
        <div className="grid md:grid-cols-2">
          <div className={cn('h-56 md:h-auto bg-gradient-to-br relative overflow-hidden min-h-[240px]', post.gradient)}>
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(193,213,189,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-g-dark/50 hidden md:block" />
            <div className="absolute top-5 left-5">
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-g-light/70 bg-g-dark/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                {post.category}
              </span>
            </div>
          </div>
          <div className="p-8 lg:p-10 flex flex-col justify-between font-sans">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[11px] text-g-light/40">{post.date}</span>
                <span className="text-g-light/20">·</span>
                <span className="text-[11px] text-g-light/40">{post.readTime} de leitura</span>
              </div>
              <h2 className="font-sans text-[clamp(20px,2.5vw,28px)] font-semibold text-white leading-[1.3] tracking-tight mb-4 group-hover:text-g-light transition-colors">
                {post.title}
              </h2>
              <p className="text-[15px] font-normal text-white/55 leading-[1.8]">{post.excerpt}</p>
            </div>
            <div className="mt-8 inline-flex items-center gap-2 text-[13px] font-bold text-g-mid/60 group-hover:text-g-light transition-colors">
              Ler artigo
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
            </div>
          </div>
        </div>
      </Link>
    </AnimateIn>
  )
}

function PostCard({ post }: { post: Post }) {
  const locale = useLocale()
  return (
    <Link href={`/${locale}/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-g-dark/8 hover:border-g-mid/35 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md">
      <div className={cn('h-44 bg-gradient-to-br relative overflow-hidden shrink-0', post.gradient)}>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(193,213,189,0.1) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
        <div className="absolute top-4 left-4">
          <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-g-light/70 bg-g-dark/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1 font-sans">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] text-g-dark/50">{post.date}</span>
          <span className="text-g-dark/30">·</span>
          <span className="text-[11px] text-g-dark/50">{post.readTime} leitura</span>
        </div>
        <h3 className="font-sans text-[16px] font-semibold text-g-dark leading-[1.4] tracking-tight mb-3 flex-1 group-hover:text-g-mid transition-colors">
          {post.title}
        </h3>
        <p className="text-[13px] font-normal text-g-dark/55 leading-[1.7] line-clamp-3 mb-5">{post.excerpt}</p>
        <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-g-mid/70 group-hover:text-g-mid transition-colors mt-auto">
          Ler artigo
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
        </span>
      </div>
    </Link>
  )
}

function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
  if (total <= 1) return null
  const pages = Array.from({ length: total }, (_, i) => i + 1)
  return (
    <div className="flex items-center justify-center gap-2 mt-14">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="w-9 h-9 rounded-lg border border-g-dark/15 flex items-center justify-center text-g-dark/50 hover:border-g-mid/40 hover:text-g-dark disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Página anterior"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 3L5 7l4 4"/></svg>
      </button>

      {pages.map(p => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={cn(
            'w-9 h-9 rounded-lg text-[13px] font-bold transition-all',
            p === current
              ? 'bg-g-dark text-white'
              : 'border border-g-dark/15 text-g-dark/60 hover:border-g-mid/40 hover:text-g-dark'
          )}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className="w-9 h-9 rounded-lg border border-g-dark/15 flex items-center justify-center text-g-dark/50 hover:border-g-mid/40 hover:text-g-dark disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Próxima página"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 3l4 4-4 4"/></svg>
      </button>
    </div>
  )
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [currentPage, setCurrentPage] = useState(1)

  const featured = posts.find(p => p.featured)
  const filtered = posts
    .filter(p => !p.featured)
    .filter(p => activeCategory === 'Todos' || p.category === activeCategory)

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory])

  const handlePageChange = (p: number) => {
    setCurrentPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Navbar />

      <section className="page-hero pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_-20%,#2D5238,transparent_70%)] opacity-45 pointer-events-none" />
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <AnimateIn>
            <SectionEyebrow>Blog & Insights</SectionEyebrow>
            <h1 className="font-display text-[clamp(36px,5.5vw,72px)] font-normal leading-[0.95] tracking-[-0.03em] text-white mt-2 mb-5 max-w-[640px]">
              Conteúdo para marcas que geram desejo.
            </h1>
            <p className="text-g-light/55 text-[16px] leading-[1.75] max-w-[480px]">
              Marketing digital para kitesurf, wingfoil, pousadas e beach clubs no litoral cearense — sem enrolação.
            </p>
          </AnimateIn>
        </div>
      </section>

      <main className="bg-g-pale">

        {featured && (
          <section className="py-16 lg:py-20 border-b border-g-dark/8">
            <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
              <FeaturedCard post={featured} />
            </div>
          </section>
        )}

        <div className="sticky top-[68px] z-30 bg-white border-b border-g-dark/8">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 overflow-x-auto">
            <div className="flex gap-0 min-w-max">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'px-5 py-4 text-[13px] font-bold whitespace-nowrap transition-colors duration-200 border-b-2 -mb-px',
                    activeCategory === cat
                      ? 'text-g-dark border-g-mid'
                      : 'text-g-dark/50 border-transparent hover:text-g-dark/65'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <section className="py-16 lg:py-24 min-h-[400px]">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${currentPage}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {paginated.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {paginated.map(post => <PostCard key={post.slug} post={post} />)}
                    </div>
                    <Pagination current={currentPage} total={totalPages} onChange={handlePageChange} />
                  </>
                ) : (
                  <div className="text-center py-20 text-g-dark/30">
                    <div className="text-[40px] mb-4">✦</div>
                    <p className="text-[15px]">Em breve, conteúdo sobre {activeCategory}.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <section className="border-t border-g-dark/8 py-16 lg:py-20">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
            <AnimateIn>
              <div className="bg-g-dark rounded-2xl p-10 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_0%_50%,#2D5238,transparent)] opacity-40" />
                <div className="relative z-10">
                  <div className="text-[11px] font-bold tracking-[0.18em] uppercase text-g-light/35 mb-3">Receba antes de todo mundo</div>
                  <h3 className="font-display text-[clamp(20px,2.5vw,30px)] font-normal text-white max-w-[420px] leading-tight">
                    Insights de marketing para kitesurf, wingfoil e turismo no Ceará.
                  </h3>
                </div>
                <a
                  href="https://wa.me/5585910430670?text=Ol%C3%A1!%20Quero%20receber%20conte%C3%BAdo%20da%20Explore%20Digital."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 shrink-0 inline-flex items-center gap-2 bg-g-light text-g-dark font-bold px-7 py-3.5 rounded-full hover:bg-g-pale hover:-translate-y-0.5 transition-all duration-200 text-[14px]"
                >
                  Quero receber →
                </a>
              </div>
            </AnimateIn>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
