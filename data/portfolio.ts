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
  featured?: boolean
  tagline: string
  description: string
  services: string[]
  videoIds: string[] // 6 YouTube video IDs — vertical (Shorts/Reels format)
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'cabare-du-vento',
    client: 'Cabaré du Vento',
    location: 'Ceará, BR',
    sector: 'Beach Club',
    categories: ['branding', 'social'],
    result: 'Identidade construída do zero',
    year: '2024',
    gradient: 'from-[#1B3025] via-[#2D5238] to-[#3D7A4E]',
    featured: true,
    tagline: 'O beach club que virou referência cultural no litoral cearense.',
    description: 'O Cabaré du Vento nasceu como um conceito ousado: um beach club com alma de cabaré, música ao vivo e gastronomia à beira-mar. Desenvolvemos do zero a identidade visual e a estratégia de conteúdo que transformaram o espaço em um dos destinos mais desejados do Ceará.',
    services: ['Branding Completo', 'Identidade Visual', 'Social Media', 'Fotografia de Marca'],
    videoIds: ['', '', '', '', '', ''],
  },
  {
    id: 2,
    slug: 'villa-conduru',
    client: 'Villa Conduru',
    location: 'Bahia, BR',
    sector: 'Real Estate',
    categories: ['branding', 'web'],
    result: '+180% de leads qualificados',
    year: '2024',
    gradient: 'from-[#0F2018] via-[#1B3025] to-[#243D2D]',
    tagline: 'Uma vila de luxo que precisa ser sentida antes de ser visitada.',
    description: 'Villa Conduru é um empreendimento de real estate de alto padrão no sul da Bahia. O desafio era criar uma identidade e um site que transmitissem o nível de exclusividade do projeto — atraindo o comprador certo antes mesmo de uma visita presencial.',
    services: ['Branding', 'Web Design', 'Identidade Visual', 'Copywriting'],
    videoIds: ['', '', '', '', '', ''],
  },
  {
    id: 3,
    slug: 'looping',
    client: 'Looping',
    location: 'Ceará, BR',
    sector: 'Esporte & Experiência',
    categories: ['branding', 'web', 'social'],
    result: 'Escola referência no kitesurf brasileiro',
    year: '2023',
    gradient: 'from-[#162B20] via-[#243D2D] to-[#345E3F]',
    tagline: 'A escola de kitesurf que transformou a aprendizagem em experiência.',
    description: 'A Looping é uma escola de kitesurf no coração do Ceará, no destino mais ventoso do Brasil. Construímos uma marca que vai além do esporte — ela comunica liberdade, natureza e uma conexão profunda com o vento e o mar.',
    services: ['Branding', 'Web Design', 'Social Media', 'Performance Ads'],
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
    tagline: 'O ponto de encontro dos kitesurfistas no litoral do Ceará.',
    description: 'A Barraca do Kite é o espaço de gastronomia e convivência que se tornou ponto de referência entre kitesurfistas e visitantes. A estratégia de social media e performance criou uma comunidade digital fiel que alimenta o movimento presencial.',
    services: ['Social Media', 'Performance Ads', 'Gestão de Conteúdo', 'Analytics'],
    videoIds: ['', '', '', '', '', ''],
  },
  {
    id: 5,
    slug: 'maresias-do-leme',
    client: 'Maresias do Leme',
    location: 'Ceará, BR',
    sector: 'Hotelaria',
    categories: ['branding', 'web'],
    result: 'Rebrand completo + novo site',
    year: '2024',
    gradient: 'from-[#0F2018] via-[#1B3025] to-[#2D5238]',
    tagline: 'A pousada que captura a alma do litoral cearense.',
    description: 'Maresias do Leme é uma pousada boutique no litoral do Ceará que precisava de uma identidade à altura da experiência que oferece. O rebrand e o novo site construíram uma presença digital que comunica charme, conforto e pertencimento ao lugar.',
    services: ['Branding', 'Web Design', 'Identidade Visual', 'SEO'],
    videoIds: ['', '', '', '', '', ''],
  },
  {
    id: 6,
    slug: 'no-worries',
    client: 'No Worries',
    location: 'Ceará, BR',
    sector: 'Beach Club',
    categories: ['branding', 'social'],
    result: 'Lançamento de marca do zero',
    year: '2024',
    gradient: 'from-[#243D2D] via-[#345E3F] to-[#1B3025]',
    tagline: 'O estado de espírito transformado em destino.',
    description: 'No Worries nasceu como mais do que um beach club — é uma filosofia de vida. Construímos a identidade visual e a voz de marca que comunicam descontração, sofisticação e uma experiência sem igual à beira-mar.',
    services: ['Branding Completo', 'Social Media', 'Fotografia', 'Copywriting'],
    videoIds: ['', '', '', '', '', ''],
  },
]
