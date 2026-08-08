export type Category = 'branding' | 'web' | 'social' | 'performance'
export type Sector = 'Beach Club' | 'Hotelaria' | 'Esporte & Experiência' | 'Real Estate' | 'Gastronomia' | 'Turismo'

export interface Project {
  id: number
  slug: string
  client: string
  location: string
  sector: Sector
  categories: Category[]
  result: string
  /** false = metrica ainda nao confirmada pelo cliente. O card entra sem ela. */
  resultConfirmado?: boolean
  year: string
  gradient: string
  imageUrl: string
  featured?: boolean
  hidden?: boolean
  tagline: string
  description: string
  services: string[]
  videoIds: string[]
}

/** Quantos cases publicados justificam existir filtro. */
const MINIMO_PARA_FILTRAR = 6

/**
 * O filtro de categoria só aparece quando ajuda a navegar.
 *
 * Com quatro cases publicados, "social" e "performance" mostram os quatro,
 * ou seja, o mesmo que "todos". Filtro que sempre devolve quase tudo é ruído
 * disfarçado de navegação: ocupa uma faixa da tela e não muda nada.
 *
 * A regra é auto-corretiva. Quando o portfólio crescer e pelo menos duas
 * categorias passarem a recortar de verdade, o filtro volta sozinho.
 */
export function filtroAjuda(visiveis: Project[]): boolean {
  if (visiveis.length < MINIMO_PARA_FILTRAR) return false
  const categorias = new Set(visiveis.flatMap(p => p.categories))
  const recortam = [...categorias].filter(
    c => visiveis.filter(p => p.categories.includes(c)).length < visiveis.length
  )
  return recortam.length >= 2
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'cabare-du-vento',
    client: 'Cabaré du Vento',
    location: 'Preá, Cruz · CE',
    sector: 'Beach Club',
    categories: ['social', 'performance'],
    result: '40 mil seguidores · 100% de crescimento em 1 ano',
    resultConfirmado: true,
    year: '2025',
    gradient: 'from-[#1B3025] via-[#2D5238] to-[#3D7A4E]',
    imageUrl: '/images/portfolio/cabare.jpg',
    featured: true,
    tagline: 'Três empresas em uma: Pousada, Beach Club e Restaurante à beira-mar no Preá.',
    description: 'Cabaré du Vento é um beach club beira-mar diretamente na Praia do Preá, Cruz (CE), um dos melhores spots de kitesurf do mundo, com ventos de até 40 nós. Com Pousada de frente para o mar, drinks autorais, música ao vivo todos os fins de semana e gastronomia regional e internacional, o espaço se tornou o destino mais desejado da região. Desenvolvemos a estratégia de Social Media e as campanhas de Meta Ads que ampliaram o alcance para o público nacional e internacional.',
    services: ['Social Media', 'Meta Ads', 'Gestão de Conteúdo', 'Tráfego Pago'],
    videoIds: ['1197039524', '1197039561', '1197039541', '1197039574', '1197039535', '1197038867'],
  },
  {
    id: 2,
    slug: 'villa-conduru',
    client: 'Villa Conduru',
    location: 'Preá, Cruz · CE',
    sector: 'Turismo',
    categories: ['social', 'performance'],
    result: 'Marca referência para o público de kitesurf no Preá',
    year: '2025',
    gradient: 'from-[#0F2018] via-[#1B3025] to-[#243D2D]',
    imageUrl: '/images/portfolio/villaconduru.png',
    tagline: 'Casas de temporada em condomínio na Praia do Preá, o maior spot de kitesurf do mundo, a 14 km de Jericoacoara.',
    description: 'Villa Conduru é um condomínio fechado de 36 casas mobiliadas na Praia do Preá, Cruz, Ceará: a 14 km de Jericoacoara. As casas de 2 e 3 quartos combinam conforto premium com acesso direto à meca mundial do kitesurf. O empreendimento atende o mercado de aluguel de temporada e investidores em busca de alta valorização no litoral cearense. As estratégias de Social Media e Meta Ads posicionaram a marca no radar do público de kitesurfistas da região.',
    services: ['Social Media', 'Meta Ads', 'Gestão de Conteúdo', 'Tráfego Pago'],
    videoIds: ['1197040783', '1197040741', '1197040708', '1197040734', '1197040752', '1197040774'],
  },
  {
    id: 3,
    slug: 'looping',
    client: 'Looping',
    location: 'Ilha do Guajirú, Itarema · CE',
    sector: 'Esporte & Experiência',
    categories: ['web', 'social', 'performance'],
    result: 'Fortalecimento e profissionalização da marca no digital',
    year: '2026',
    gradient: 'from-[#162B20] via-[#243D2D] to-[#345E3F]',
    imageUrl: '/images/portfolio/looping.jpg',
    tagline: 'Escola de kitesurf na Ilha do Guajirú, Itarema · CE.',
    description: 'Looping Kite School está na Ilha do Guajirú, Itarema (CE): uma das lagoas mais planas e ventosas do mundo, com ventos alísios de 20 a 30 nós de julho a janeiro. Com certificação IKO e ABK, equipamentos premium Duotone e North, sistema de rádio subaquático nas aulas e equipe multilíngue (PT/EN/ES/FR), a Looping já treinou alunos de mais de 40 países. Desenvolvemos a estratégia de Social Media e as campanhas de Meta Ads que fortaleceram e profissionalizaram a presença digital da escola.',
    services: ['Web Design', 'Social Media', 'Meta Ads', 'Gestão de Conteúdo'],
    videoIds: ['1197049229', '1197049216', '1197049208', '1197049200', '1197049174', '1197049191'],
  },
  {
    id: 4,
    hidden: true,
    slug: 'barraca-do-kite',
    client: 'Barraca do Kite',
    location: 'Ilha do Guajirú, Itarema · CE',
    sector: 'Gastronomia',
    categories: ['social', 'performance'],
    result: '+320% de alcance orgânico',
    year: '2023',
    gradient: 'from-[#1B3025] via-[#2A4F35] to-[#162B20]',
    imageUrl: '/images/portfolio/barracadokite.jpg',
    tagline: 'O ponto de encontro dos kitesurfistas na Ilha do Guajirú.',
    description: 'Barraca do Kite é um lodge e restaurante à beira da Lagoa do Guajirú, em Itarema (CE): considerada uma das melhores lagoas do mundo para kitesurf. Com quartos de frente para a lagoa, restaurante com pizzas e jantares completos, bar com coquetéis e suporte técnico na praia para kitesurfistas, o espaço conquistou o Travelers\' Choice do TripAdvisor (4.4/5, 44 avaliações). A estratégia de Social Media e Meta Ads criou uma comunidade digital fiel que alimenta o movimento presencial.',
    services: ['Social Media', 'Meta Ads', 'Gestão de Conteúdo', 'Tráfego Pago'],
    videoIds: ['', '', '', '', '', ''],
  },
  {
    id: 5,
    // Ex-cliente e fora do recorte CE/RN. Mantido no arquivo para não perder o
    // histórico — basta remover `hidden` para republicar.
    hidden: true,
    slug: 'maresias-do-leme',
    client: 'Maresias do Leme',
    location: 'Rio de Janeiro · RJ',
    sector: 'Hotelaria',
    categories: ['social'],
    result: 'Instagram +400% em 2 anos: de 27 mil para 110 mil seguidores',
    resultConfirmado: true,
    year: '2023',
    gradient: 'from-[#0F2018] via-[#1B3025] to-[#2D5238]',
    imageUrl: '/images/portfolio/maresiasdoleme.jpg',
    tagline: 'O hostel carioca que virou comunidade, com fila de espera na alta temporada.',
    description: 'Maresias do Leme é um hostel no Rio de Janeiro com a proposta de experiência carioca para seus hóspedes. Desenvolvemos a estratégia completa de produção de conteúdo através de vídeos dinâmicos com alta conversão, vendendo e construindo uma comunidade forte e única, crescendo a presença orgânica de forma consciente ao longo do tempo. Hoje o hostel conta com fila de espera na alta temporada, feriados e eventos.',
    services: ['Social Media', 'Produção de Conteúdo'],
    videoIds: ['1197041325', '1197041336', '1196936642', '1197041368', '1197041358', '1197041399'],
  },
  {
    id: 6,
    slug: 'no-worries',
    client: 'No Worries',
    location: 'Pipa · RN',
    sector: 'Hotelaria',
    categories: ['web', 'social', 'performance'],
    result: 'Crescimento de 50% em 6 meses nas redes sociais',
    year: '2023',
    gradient: 'from-[#243D2D] via-[#345E3F] to-[#1B3025]',
    imageUrl: '/images/portfolio/noworries.jpg',
    tagline: 'Hostel e suítes na Praia da Pipa, RN, presença digital construída do zero.',
    description: 'No Worries Suites é um hostel no centro de Pipa, Rio Grande do Norte, a poucos passos das praias do Centro e do Amor. Com suítes privativas e atmosfera de conexão entre viajantes e natureza, o espaço atende surfistas, aventureiros e nômades digitais. Desenvolvemos o Web Design do site, a estratégia de Social Media e as campanhas de Meta Ads que construíram a presença digital do espaço do zero.',
    services: ['Web Design', 'Social Media', 'Meta Ads', 'Gestão de Conteúdo'],
    videoIds: ['1197042368', '1197042377', '1197042359', '1197042389', '1197042399', '1197042407'],
  },
  {
    id: 7,
    hidden: true,
    slug: 'tripz-kite-club',
    client: 'Tripz Kite Club',
    location: 'Ceará, BR',
    sector: 'Esporte & Experiência',
    categories: ['web', 'performance'],
    result: 'Captação digital estruturada do zero',
    year: '2024',
    gradient: 'from-[#162B20] via-[#1B3025] to-[#2D5238]',
    imageUrl: '/images/portfolio/tripzkite.jpeg',
    tagline: 'Onde o vento encontra a tecnologia para encher a agenda.',
    description: 'Tripz Kite Club é uma escola de kitesurf no litoral cearense com foco em alunos nacionais e internacionais. Desenvolvemos o Web Design do site institucional: otimizado para SEO e conversão, e as campanhas de Meta Ads que captam alunos segmentados por interesse e comportamento de viagem, gerando matrículas consistentes ao longo da temporada de vento.',
    services: ['Web Design', 'Meta Ads', 'Landing Page', 'Tráfego Pago'],
    videoIds: ['', '', '', '', '', ''],
  },
  {
    id: 8,
    // Ex-cliente e real estate, fora do foco em hotelaria.
    hidden: true,
    slug: 'terra-ventos',
    client: 'Terra Ventos',
    location: 'Preá · CE',
    sector: 'Real Estate',
    categories: ['social', 'performance'],
    result: 'Geração de leads para imóveis de luxo no litoral',
    year: '2025',
    gradient: 'from-[#243D2D] via-[#2D5238] to-[#162B20]',
    imageUrl: '/images/portfolio/terraventos.jpeg',
    tagline: 'Projeto de real estate na Praia do Preá: imóveis de luxo no maior spot de kitesurf do mundo.',
    description: 'Terra Ventos é uma imobiliária especializada em curadoria de imóveis de luxo e investimentos no litoral do Ceará, com foco em Preá, Tatajuba e Bitupitá. Atende investidores nacionais e internacionais que buscam propriedades de alto padrão associadas ao kitesurf e ao turismo premium. Desenvolvemos a estratégia de Social Media, as campanhas de Meta Ads e o Google Ads que posicionaram a marca como referência no segmento imobiliário de luxo do litoral cearense.',
    services: ['Social Media', 'Meta Ads', 'Google Ads', 'Gestão de Conteúdo'],
    videoIds: ['1197049930', '1197049950', '1197049918', '1197049945', '1197049963', '1197049906'],
  },
  {
    id: 9,
    hidden: true,
    slug: 'la-duna-beach-club',
    client: 'La Duna Beach Club',
    location: 'Ceará, BR',
    sector: 'Beach Club',
    categories: ['social'],
    result: 'Comunidade digital criada do zero',
    year: '2025',
    gradient: 'from-[#1B3025] via-[#345E3F] to-[#243D2D]',
    imageUrl: '/images/portfolio/laduna.png',
    tagline: 'A experiência das dunas cearenses transformada em audiência fiel.',
    description: 'La Duna Beach Club é um espaço à beira das dunas do litoral cearense que combina gastronomia, música e natureza em uma experiência única. Desenvolvemos a estratégia completa de Social Media, criando conteúdo que comunica a atmosfera e singularidade do espaço, construindo uma audiência orgânica qualificada no Instagram e consolidando La Duna como destino de fim de semana no litoral do Ceará.',
    services: ['Social Media', 'Gestão de Conteúdo', 'Calendário Editorial'],
    videoIds: ['', '', '', '', '', ''],
  },
]
