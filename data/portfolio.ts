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
    location: 'Ceará, BR',
    sector: 'Beach Club',
    categories: ['social', 'performance'],
    result: 'Presença digital construída do zero',
    year: '2024',
    gradient: 'from-[#1B3025] via-[#2D5238] to-[#3D7A4E]',
    imageUrl: U('1530053969600-caed2596d242'),
    featured: true,
    tagline: 'O beach club que virou referência cultural no litoral cearense.',
    description: 'O Cabaré du Vento é um beach club no litoral do Ceará com proposta cultural única: música ao vivo, gastronomia à beira-mar e uma identidade que mistura irreverência e sofisticação. Desenvolvemos a estratégia de Social Media e as campanhas de Meta Ads que transformaram o espaço em um dos destinos mais comentados do litoral cearense.',
    services: ['Social Media', 'Meta Ads', 'Gestão de Conteúdo', 'Tráfego Pago'],
    videoIds: ['', '', '', '', '', ''],
  },
  {
    id: 2,
    slug: 'villa-conduru',
    client: 'Villa Conduru',
    location: 'Bahia, BR',
    sector: 'Real Estate',
    categories: ['social', 'performance'],
    result: '+180% de leads qualificados',
    year: '2024',
    gradient: 'from-[#0F2018] via-[#1B3025] to-[#243D2D]',
    imageUrl: U('1600596542815-ffad4c1539a9'),
    tagline: 'Uma vila de luxo que precisa ser sentida antes de ser visitada.',
    description: 'Villa Conduru é um empreendimento de real estate de alto padrão no sul da Bahia. O desafio era criar uma presença digital que transmitisse o nível de exclusividade do projeto e gerasse leads qualificados. Através de Social Media estratégico e campanhas de Meta Ads altamente segmentadas, conseguimos aumentar em 180% os leads para a equipe comercial.',
    services: ['Social Media', 'Meta Ads', 'Gestão de Conteúdo', 'Tráfego Pago'],
    videoIds: ['', '', '', '', '', ''],
  },
  {
    id: 3,
    slug: 'looping',
    client: 'Looping',
    location: 'Ceará, BR',
    sector: 'Esporte & Experiência',
    categories: ['web', 'social', 'performance'],
    result: 'Escola referência no kitesurf brasileiro',
    year: '2023',
    gradient: 'from-[#162B20] via-[#243D2D] to-[#345E3F]',
    imageUrl: U('1580628122228-d8013bb23d1b'),
    tagline: 'A escola de kitesurf que transformou a aprendizagem em experiência.',
    description: 'A Looping é uma escola de kitesurf em Cumbuco, Ceará — no destino mais ventoso do Brasil. Desenvolvemos o Web Design do site institucional, a estratégia de Social Media e as campanhas de Meta Ads que posicionaram a Looping como referência no kitesurf brasileiro, captando alunos nacionais e internacionais.',
    services: ['Web Design', 'Social Media', 'Meta Ads', 'Gestão de Conteúdo'],
    videoIds: ['', '', '', '', '', ''],
  },
  {
    id: 4,
    slug: 'barraca-do-kite',
    client: 'Barraca do Kite',
    location: 'Ceará, BR',
    sector: 'Gastronomia',
    categories: ['social', 'performance'],
    result: '+320% de alcance orgânico',
    year: '2023',
    gradient: 'from-[#1B3025] via-[#2A4F35] to-[#162B20]',
    imageUrl: U('1544735716-392fe2489ffa'),
    tagline: 'O ponto de encontro dos kitesurfistas no litoral do Ceará.',
    description: 'A Barraca do Kite é o espaço de gastronomia e convivência que se tornou referência entre kitesurfistas e visitantes no litoral cearense. A estratégia de Social Media e as campanhas de Meta Ads criaram uma comunidade digital fiel que alimenta o movimento presencial com consistência.',
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
    description: 'Maresias do Leme é uma pousada boutique no litoral do Ceará. Desenvolvemos a estratégia completa de Social Media — calendário editorial, produção de conteúdo e gestão das redes — que construiu uma presença orgânica consistente e fidelizou uma base de seguidores qualificados.',
    services: ['Social Media', 'Gestão de Conteúdo', 'Calendário Editorial'],
    videoIds: ['', '', '', '', '', ''],
  },
  {
    id: 6,
    slug: 'no-worries',
    client: 'No Worries',
    location: 'Ceará, BR',
    sector: 'Beach Club',
    categories: ['web', 'social', 'performance'],
    result: 'Lançamento completo com presença full-funnel',
    year: '2024',
    gradient: 'from-[#243D2D] via-[#345E3F] to-[#1B3025]',
    imageUrl: U('1507525428034-b723cf961d3e'),
    tagline: 'O estado de espírito transformado em destino.',
    description: 'No Worries nasceu como mais do que um beach club — é uma filosofia de vida. Desenvolvemos o Web Design do site, a estratégia de Social Media e as campanhas de Meta Ads que construíram a presença digital do espaço do zero, criando uma identidade digital coesa e uma audiência fiel no litoral cearense.',
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
    description: 'Tripz Kite Club é uma escola de kitesurf no litoral cearense com foco em alunos nacionais e internacionais. Desenvolvemos o Web Design do site institucional — otimizado para SEO e conversão — e as campanhas de Meta Ads que captam alunos segmentados por interesse e comportamento de viagem, gerando matrículas consistentes ao longo da temporada.',
    services: ['Web Design', 'Meta Ads', 'Landing Page', 'Tráfego Pago'],
    videoIds: ['', '', '', '', '', ''],
  },
  {
    id: 8,
    slug: 'terra-ventos',
    client: 'Terra Ventos',
    location: 'Ceará, BR',
    sector: 'Esporte & Experiência',
    categories: ['social', 'performance'],
    result: 'Estratégia full-funnel de captação',
    year: '2025',
    gradient: 'from-[#243D2D] via-[#2D5238] to-[#162B20]',
    imageUrl: U('1530870110042-98b2cb110834'),
    tagline: 'Vento, mar e a estratégia digital que enche a agenda o ano todo.',
    description: 'Terra Ventos é um negócio de kitesurf no litoral cearense com presença em múltiplos pontos da costa. Desenvolvemos a estratégia completa de Social Media, as campanhas de Meta Ads para captação de alunos nacionais e internacionais, e o Google Ads para capturar a demanda de busca orgânica — criando uma máquina de captação digital que opera nos três canais simultaneamente.',
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
    tagline: 'A experiência das dunas transformada em audiência fiel.',
    description: 'La Duna Beach Club é um espaço à beira das dunas cearenses que combina gastronomia, música e natureza em uma experiência única. Desenvolvemos a estratégia completa de Social Media — criando conteúdo que comunica a atmosfera do espaço, construindo uma audiência orgânica qualificada e consolidando La Duna como destino de fim de semana no litoral do Ceará.',
    services: ['Social Media', 'Gestão de Conteúdo', 'Calendário Editorial'],
    videoIds: ['', '', '', '', '', ''],
  },
]
