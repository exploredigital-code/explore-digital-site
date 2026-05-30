export type Category = 'branding' | 'web' | 'social' | 'performance'
export type Sector = 'Beach Club' | 'Hotelaria' | 'Esporte & Experiência' | 'Real Estate' | 'Gastronomia'

export interface Project {
  id: number
  slug: string
  client: string
  location: string
  sector: Sector
  categories: Category[]
  result: string
  year: string
  gradient: string
  imageUrl: string
  featured?: boolean
  tagline: string
  description: string
  services: string[]
  videoIds: string[]
}

const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=900&h=600&fit=crop&auto=format&q=80`

export const projects: Project[] = [
  {
    id: 1,
    slug: 'cabare-du-vento',
    client: 'Cabaré du Vento',
    location: 'Preá, Cruz — CE',
    sector: 'Beach Club',
    categories: ['social', 'performance'],
    result: '40 mil seguidores e referência no Preá',
    year: '2024',
    gradient: 'from-[#1B3025] via-[#2D5238] to-[#3D7A4E]',
    imageUrl: U('1530053969600-caed2596d242'),
    featured: true,
    tagline: 'O beach bar que virou ponto de encontro da tribo do kite no Preá.',
    description: 'Cabaré du Vento é um beach bar e guest house diretamente na Praia do Preá, Cruz (CE) — um dos melhores spots de kitesurf do mundo, com ventos de até 40 nós. Com 7 quartos de frente para o mar, drinks autorais, música ao vivo e frutos do mar frescos, o espaço se tornou o destino mais desejado da região. Desenvolvemos a estratégia de Social Media e as campanhas de Meta Ads que ampliaram o alcance para o público nacional e internacional.',
    services: ['Social Media', 'Meta Ads', 'Gestão de Conteúdo', 'Tráfego Pago'],
    videoIds: ['', '', '', '', '', ''],
  },
  {
    id: 2,
    slug: 'villa-conduru',
    client: 'Villa Conduru',
    location: 'Preá, Cruz — CE',
    sector: 'Real Estate',
    categories: ['social', 'performance'],
    result: '+180% de leads qualificados',
    year: '2024',
    gradient: 'from-[#0F2018] via-[#1B3025] to-[#243D2D]',
    imageUrl: U('1600596542815-ffad4c1539a9'),
    tagline: 'Casas de alto padrão no maior spot de kitesurf do mundo, a 14 km de Jericoacoara.',
    description: 'Villa Conduru é um condomínio fechado de 36 casas mobiliadas na Praia do Preá, Cruz, Ceará — a 14 km de Jericoacoara. As casas de 2 e 3 quartos combinam conforto premium com acesso direto à meca mundial do kitesurf. O empreendimento atende o mercado de aluguel de temporada e investidores em busca de alta valorização no litoral cearense. As estratégias de Social Media e Meta Ads que desenvolvemos geraram +180% de leads qualificados para a equipe comercial.',
    services: ['Social Media', 'Meta Ads', 'Gestão de Conteúdo', 'Tráfego Pago'],
    videoIds: ['', '', '', '', '', ''],
  },
  {
    id: 3,
    slug: 'looping',
    client: 'Looping',
    location: 'Ilha do Guajirú, Itarema — CE',
    sector: 'Esporte & Experiência',
    categories: ['web', 'social', 'performance'],
    result: 'Alunos de mais de 40 países desde 2016',
    year: '2023',
    gradient: 'from-[#162B20] via-[#243D2D] to-[#345E3F]',
    imageUrl: U('1506905925346-21bda4d32df4'),
    tagline: 'A escola de kitesurf que transformou a Ilha do Guajirú em destino internacional.',
    description: 'Looping Kite School está na Ilha do Guajirú, Itarema (CE) — uma das lagoas mais planas e ventosas do mundo, com ventos alísios de 20 a 30 nós de julho a janeiro. Com certificação IKO e ABK, equipamentos premium Duotone e North, sistema de rádio subaquático nas aulas e equipe multilíngue (PT/EN/ES/FR), a Looping já treinou alunos de mais de 40 países. Desenvolvemos o Web Design do site, a estratégia de Social Media e as campanhas de Meta Ads que consolidaram a escola como referência internacional.',
    services: ['Web Design', 'Social Media', 'Meta Ads', 'Gestão de Conteúdo'],
    videoIds: ['', '', '', '', '', ''],
  },
  {
    id: 4,
    slug: 'barraca-do-kite',
    client: 'Barraca do Kite',
    location: 'Ilha do Guajirú, Itarema — CE',
    sector: 'Gastronomia',
    categories: ['social', 'performance'],
    result: '+320% de alcance orgânico',
    year: '2023',
    gradient: 'from-[#1B3025] via-[#2A4F35] to-[#162B20]',
    imageUrl: U('1544735716-392fe2489ffa'),
    tagline: 'O ponto de encontro dos kitesurfistas na Ilha do Guajirú.',
    description: 'Barraca do Kite é um lodge e restaurante à beira da Lagoa do Guajirú, em Itarema (CE) — considerada uma das melhores lagoas do mundo para kitesurf. Com quartos de frente para a lagoa, restaurante com pizzas e jantares completos, bar com coquetéis e suporte técnico na praia para kitesurfistas, o espaço conquistou o Travelers\' Choice do TripAdvisor (4.4/5, 44 avaliações). A estratégia de Social Media e Meta Ads criou uma comunidade digital fiel que alimenta o movimento presencial.',
    services: ['Social Media', 'Meta Ads', 'Gestão de Conteúdo', 'Tráfego Pago'],
    videoIds: ['', '', '', '', '', ''],
  },
  {
    id: 5,
    slug: 'maresias-do-leme',
    client: 'Maresias do Leme',
    location: 'Ceará, BR',
    sector: 'Hotelaria',
    categories: ['social'],
    result: 'Presença orgânica consolidada',
    year: '2024',
    gradient: 'from-[#0F2018] via-[#1B3025] to-[#2D5238]',
    imageUrl: U('1582719478250-c89cae4dc85b'),
    tagline: 'A pousada que captura a alma do litoral cearense.',
    description: 'Maresias do Leme é uma pousada boutique no litoral cearense com atmosfera intimista e cuidado nos detalhes. Desenvolvemos a estratégia completa de Social Media — calendário editorial, produção de conteúdo e gestão das redes — que construiu uma presença orgânica consistente e uma base de seguidores qualificados alinhada ao perfil do hóspede ideal.',
    services: ['Social Media', 'Gestão de Conteúdo', 'Calendário Editorial'],
    videoIds: ['', '', '', '', '', ''],
  },
  {
    id: 6,
    slug: 'no-worries',
    client: 'No Worries',
    location: 'Pipa, RN',
    sector: 'Hotelaria',
    categories: ['web', 'social', 'performance'],
    result: 'Lançamento completo com presença full-funnel',
    year: '2024',
    gradient: 'from-[#243D2D] via-[#345E3F] to-[#1B3025]',
    imageUrl: U('1507525428034-b723cf961d3e'),
    tagline: 'Suítes boutique no coração de Pipa, onde a natureza é a experiência.',
    description: 'No Worries Suites é uma pousada boutique no centro de Pipa, Rio Grande do Norte — a poucos passos das praias do Centro e do Amor. Com suítes privativas e atmosfera de conexão entre viajantes e natureza, o espaço atende surfistas, aventureiros e nômades digitais. Desenvolvemos o Web Design do site, a estratégia de Social Media e as campanhas de Meta Ads que construíram a presença digital do espaço do zero.',
    services: ['Web Design', 'Social Media', 'Meta Ads', 'Gestão de Conteúdo'],
    videoIds: ['', '', '', '', '', ''],
  },
  {
    id: 7,
    slug: 'tripz-kite-club',
    client: 'Tripz Kite Club',
    location: 'Ceará, BR',
    sector: 'Esporte & Experiência',
    categories: ['web', 'performance'],
    result: 'Captação digital estruturada do zero',
    year: '2024',
    gradient: 'from-[#162B20] via-[#1B3025] to-[#2D5238]',
    imageUrl: U('1544551763-46a013bb70d5'),
    tagline: 'Onde o vento encontra a tecnologia para encher a agenda.',
    description: 'Tripz Kite Club é uma escola de kitesurf no litoral cearense com foco em alunos nacionais e internacionais. Desenvolvemos o Web Design do site institucional — otimizado para SEO e conversão — e as campanhas de Meta Ads que captam alunos segmentados por interesse e comportamento de viagem, gerando matrículas consistentes ao longo da temporada de vento.',
    services: ['Web Design', 'Meta Ads', 'Landing Page', 'Tráfego Pago'],
    videoIds: ['', '', '', '', '', ''],
  },
  {
    id: 8,
    slug: 'terra-ventos',
    client: 'Terra Ventos',
    location: 'Preá — CE',
    sector: 'Real Estate',
    categories: ['social', 'performance'],
    result: 'Geração de leads para imóveis de luxo no litoral',
    year: '2025',
    gradient: 'from-[#243D2D] via-[#2D5238] to-[#162B20]',
    imageUrl: U('1530870110042-98b2cb110834'),
    tagline: 'Curadoria de imóveis de luxo no litoral cearense para quem investe em estilo de vida.',
    description: 'Terra Ventos é uma imobiliária especializada em curadoria de imóveis de luxo e investimentos no litoral do Ceará, com foco em Preá, Tatajuba e Bitupitá. Atende investidores nacionais e internacionais que buscam propriedades de alto padrão associadas ao kitesurf e ao turismo premium. Desenvolvemos a estratégia de Social Media, as campanhas de Meta Ads e o Google Ads que posicionaram a marca como referência no segmento imobiliário de luxo do litoral cearense.',
    services: ['Social Media', 'Meta Ads', 'Google Ads', 'Gestão de Conteúdo'],
    videoIds: ['', '', '', '', '', ''],
  },
  {
    id: 9,
    slug: 'la-duna-beach-club',
    client: 'La Duna Beach Club',
    location: 'Ceará, BR',
    sector: 'Beach Club',
    categories: ['social'],
    result: 'Comunidade digital criada do zero',
    year: '2025',
    gradient: 'from-[#1B3025] via-[#345E3F] to-[#243D2D]',
    imageUrl: U('1519046904884-53103b34b206'),
    tagline: 'A experiência das dunas cearenses transformada em audiência fiel.',
    description: 'La Duna Beach Club é um espaço à beira das dunas do litoral cearense que combina gastronomia, música e natureza em uma experiência única. Desenvolvemos a estratégia completa de Social Media — criando conteúdo que comunica a atmosfera e singularidade do espaço, construindo uma audiência orgânica qualificada no Instagram e consolidando La Duna como destino de fim de semana no litoral do Ceará.',
    services: ['Social Media', 'Gestão de Conteúdo', 'Calendário Editorial'],
    videoIds: ['', '', '', '', '', ''],
  },
]
