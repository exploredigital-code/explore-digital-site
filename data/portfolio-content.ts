export type ProjectContent = {
  tagline: string
  description: string
  result: string
  services: string[]
}

const content: Record<string, Record<string, ProjectContent>> = {
  pt: {
    'cabare-du-vento': {
      tagline: 'Três empresas em uma: Pousada, Beach Club e Restaurante à beira-mar no Preá.',
      description: 'Cabaré du Vento é um beach club beira-mar diretamente na Praia do Preá, Cruz (CE), um dos melhores spots de kitesurf do mundo, com ventos de até 40 nós. Com Pousada de frente para o mar, drinks autorais, música ao vivo todos os fins de semana e gastronomia regional e internacional, o espaço se tornou o destino mais desejado da região. Desenvolvemos a estratégia de Social Media e as campanhas de Meta Ads que ampliaram o alcance para o público nacional e internacional.',
      result: '40 mil seguidores · 100% de crescimento em 1 ano',
      services: ['Social Media', 'Meta Ads', 'Gestão de Conteúdo', 'Tráfego Pago'],
    },
    'villa-conduru': {
      tagline: 'Casas de temporada em condomínio na Praia do Preá, o maior spot de kitesurf do mundo, a 14 km de Jericoacoara.',
      description: 'Villa Conduru é um condomínio fechado de 36 casas mobiliadas na Praia do Preá, Cruz, Ceará: a 14 km de Jericoacoara. As casas de 2 e 3 quartos combinam conforto premium com acesso direto à meca mundial do kitesurf. O empreendimento atende o mercado de aluguel de temporada e investidores em busca de alta valorização no litoral cearense. As estratégias de Social Media e Meta Ads posicionaram a marca no radar do público de kitesurfistas da região.',
      result: 'Marca referência para o público de kitesurf no Preá',
      services: ['Social Media', 'Meta Ads', 'Gestão de Conteúdo', 'Tráfego Pago'],
    },
    'looping': {
      tagline: 'Escola de kitesurf na Ilha do Guajirú, Itarema · CE.',
      description: 'Looping Kite School está na Ilha do Guajirú, Itarema (CE): uma das lagoas mais planas e ventosas do mundo, com ventos alísios de 20 a 30 nós de julho a janeiro. Com certificação IKO e ABK, equipamentos premium Duotone e North, sistema de rádio subaquático nas aulas e equipe multilíngue (PT/EN/ES/FR), a Looping já treinou alunos de mais de 40 países. Desenvolvemos a estratégia de Social Media e as campanhas de Meta Ads que fortaleceram e profissionalizaram a presença digital da escola.',
      result: 'Fortalecimento e profissionalização da marca no digital',
      services: ['Web Design', 'Social Media', 'Meta Ads', 'Gestão de Conteúdo'],
    },
    'barraca-do-kite': {
      tagline: 'O ponto de encontro dos kitesurfistas na Ilha do Guajirú.',
      description: 'Barraca do Kite é um lodge e restaurante à beira da Lagoa do Guajirú, em Itarema (CE): considerada uma das melhores lagoas do mundo para kitesurf. Com quartos de frente para a lagoa, restaurante com pizzas e jantares completos, bar com coquetéis e suporte técnico na praia para kitesurfistas, o espaço conquistou o Travelers\' Choice do TripAdvisor (4.4/5, 44 avaliações). A estratégia de Social Media e Meta Ads criou uma comunidade digital fiel que alimenta o movimento presencial.',
      result: '+320% de alcance orgânico',
      services: ['Social Media', 'Meta Ads', 'Gestão de Conteúdo', 'Tráfego Pago'],
    },
    'maresias-do-leme': {
      tagline: 'O hostel carioca que virou comunidade, com fila de espera na alta temporada.',
      description: 'Maresias do Leme é um hostel no Rio de Janeiro com a proposta de experiência carioca para seus hóspedes. Desenvolvemos a estratégia completa de produção de conteúdo através de vídeos dinâmicos com alta conversão, vendendo e construindo uma comunidade forte e única, crescendo a presença orgânica de forma consciente ao longo do tempo. Hoje o hostel conta com fila de espera na alta temporada, feriados e eventos.',
      result: 'Instagram +400% em 2 anos: de 27 mil para 110 mil seguidores',
      services: ['Social Media', 'Produção de Conteúdo'],
    },
    'no-worries': {
      tagline: 'Hostel e suítes na Praia da Pipa, RN, presença digital construída do zero.',
      description: 'No Worries Suites é um hostel no centro de Pipa, Rio Grande do Norte, a poucos passos das praias do Centro e do Amor. Com suítes privativas e atmosfera de conexão entre viajantes e natureza, o espaço atende surfistas, aventureiros e nômades digitais. Desenvolvemos o Web Design do site, a estratégia de Social Media e as campanhas de Meta Ads que construíram a presença digital do espaço do zero.',
      result: 'Crescimento de 50% em 6 meses nas redes sociais',
      services: ['Web Design', 'Social Media', 'Meta Ads', 'Gestão de Conteúdo'],
    },
    'tripz-kite-club': {
      tagline: 'Onde o vento encontra a tecnologia para encher a agenda.',
      description: 'Tripz Kite Club é uma escola de kitesurf no litoral cearense com foco em alunos nacionais e internacionais. Desenvolvemos o Web Design do site institucional: otimizado para SEO e conversão, e as campanhas de Meta Ads que captam alunos segmentados por interesse e comportamento de viagem, gerando matrículas consistentes ao longo da temporada de vento.',
      result: 'Captação digital estruturada do zero',
      services: ['Web Design', 'Meta Ads', 'Landing Page', 'Tráfego Pago'],
    },
    'terra-ventos': {
      tagline: 'Projeto de real estate na Praia do Preá: imóveis de luxo no maior spot de kitesurf do mundo.',
      description: 'Terra Ventos é uma imobiliária especializada em curadoria de imóveis de luxo e investimentos no litoral do Ceará, com foco em Preá, Tatajuba e Bitupitá. Atende investidores nacionais e internacionais que buscam propriedades de alto padrão associadas ao kitesurf e ao turismo premium. Desenvolvemos a estratégia de Social Media, as campanhas de Meta Ads e o Google Ads que posicionaram a marca como referência no segmento imobiliário de luxo do litoral cearense.',
      result: 'Geração de leads para imóveis de luxo no litoral',
      services: ['Social Media', 'Meta Ads', 'Google Ads', 'Gestão de Conteúdo'],
    },
    'la-duna-beach-club': {
      tagline: 'A experiência das dunas cearenses transformada em audiência fiel.',
      description: 'La Duna Beach Club é um espaço à beira das dunas do litoral cearense que combina gastronomia, música e natureza em uma experiência única. Desenvolvemos a estratégia completa de Social Media, criando conteúdo que comunica a atmosfera e singularidade do espaço, construindo uma audiência orgânica qualificada no Instagram e consolidando La Duna como destino de fim de semana no litoral do Ceará.',
      result: 'Comunidade digital criada do zero',
      services: ['Social Media', 'Gestão de Conteúdo', 'Calendário Editorial'],
    },
  },

  en: {
    'cabare-du-vento': {
      tagline: 'Three in one: Guesthouse, Beach Club and Restaurant on the beachfront at Preá.',
      description: 'Cabaré du Vento is a beachfront beach club on Praia do Preá, Cruz (CE), one of the world\'s best kitesurfing spots with winds up to 40 knots. With an ocean-view guesthouse, signature cocktails, live music every weekend and regional and international gastronomy, the space became the most coveted destination in the region. We developed the Social Media strategy and Meta Ads campaigns that expanded reach to national and international audiences.',
      result: '40k followers · 100% growth in 1 year',
      services: ['Social Media', 'Meta Ads', 'Content Management', 'Paid Traffic'],
    },
    'villa-conduru': {
      tagline: 'Vacation homes in a gated condominium on Praia do Preá, the world\'s top kitesurfing spot, 14 km from Jericoacoara.',
      description: 'Villa Conduru is a gated condominium with 36 furnished homes on Praia do Preá, Cruz, Ceará: 14 km from Jericoacoara. The 2- and 3-bedroom homes combine premium comfort with direct access to the world\'s kitesurfing mecca. The development serves the vacation rental market and investors seeking high appreciation on the Ceará coast. The Social Media and Meta Ads strategies positioned the brand on the radar of kitesurfers in the region.',
      result: 'Reference brand for the kitesurfing community in Preá',
      services: ['Social Media', 'Meta Ads', 'Content Management', 'Paid Traffic'],
    },
    'looping': {
      tagline: 'Kitesurfing school on Ilha do Guajirú, Itarema · CE.',
      description: 'Looping Kite School is on Ilha do Guajirú, Itarema (CE): one of the flattest and windiest lagoons in the world, with trade winds from 20 to 30 knots from July to January. With IKO and ABK certification, premium Duotone and North equipment, an underwater radio system in lessons and a multilingual team (PT/EN/ES/FR), Looping has trained students from more than 40 countries. We developed the Social Media strategy and Meta Ads campaigns that strengthened and professionalized the school\'s digital presence.',
      result: 'Strengthened and professionalized brand in the digital space',
      services: ['Web Design', 'Social Media', 'Meta Ads', 'Content Management'],
    },
    'barraca-do-kite': {
      tagline: 'The meeting point for kitesurfers on Ilha do Guajirú.',
      description: 'Barraca do Kite is a lodge and restaurant on the shores of Lagoa do Guajirú, in Itarema (CE): considered one of the best lagoons in the world for kitesurfing. With lake-view rooms, a restaurant serving pizzas and full dinners, a cocktail bar and beach technical support for kitesurfers, the space earned TripAdvisor\'s Travelers\' Choice (4.4/5, 44 reviews). The Social Media and Meta Ads strategy built a loyal digital community that drives in-person movement.',
      result: '+320% organic reach',
      services: ['Social Media', 'Meta Ads', 'Content Management', 'Paid Traffic'],
    },
    'maresias-do-leme': {
      tagline: 'The Rio hostel that became a community, with a waitlist every high season.',
      description: 'Maresias do Leme is a hostel in Rio de Janeiro offering an authentic Rio experience for its guests. We developed a complete content production strategy through dynamic, high-converting videos that sell the lifestyle and build a strong, unique community, growing organic presence consciously over time. Today the hostel has a waitlist during high season, holidays and events.',
      result: 'Instagram +400% in 2 years: from 27k to 110k followers',
      services: ['Social Media', 'Content Production'],
    },
    'no-worries': {
      tagline: 'Hostel and suites in Praia da Pipa, RN, digital presence built from scratch.',
      description: 'No Worries Suites is a hostel in the heart of Pipa, Rio Grande do Norte, steps from Praia do Centro and Praia do Amor. With private suites and an atmosphere of connection between travelers and nature, the space welcomes surfers, adventurers and digital nomads. We developed the website design, Social Media strategy and Meta Ads campaigns that built the space\'s digital presence from scratch.',
      result: '50% social media growth in 6 months',
      services: ['Web Design', 'Social Media', 'Meta Ads', 'Content Management'],
    },
    'tripz-kite-club': {
      tagline: 'Where wind meets technology to fill the schedule.',
      description: 'Tripz Kite Club is a kitesurfing school on the Ceará coast focused on national and international students. We developed the institutional website design, SEO-optimized and conversion-focused, and Meta Ads campaigns that attract students segmented by interest and travel behavior, generating consistent enrollments throughout the wind season.',
      result: 'Digital lead generation structured from scratch',
      services: ['Web Design', 'Meta Ads', 'Landing Page', 'Paid Traffic'],
    },
    'terra-ventos': {
      tagline: 'Real estate project on Praia do Preá: luxury properties at the world\'s top kitesurfing spot.',
      description: 'Terra Ventos is a real estate agency specializing in curating luxury properties and investments on the Ceará coast, focusing on Preá, Tatajuba and Bitupitá. It serves national and international investors seeking premium properties associated with kitesurfing and premium tourism. We developed the Social Media strategy, Meta Ads and Google Ads campaigns that positioned the brand as a reference in the luxury coastal real estate segment.',
      result: 'Lead generation for luxury coastal properties',
      services: ['Social Media', 'Meta Ads', 'Google Ads', 'Content Management'],
    },
    'la-duna-beach-club': {
      tagline: 'The Ceará dunes experience transformed into a loyal audience.',
      description: 'La Duna Beach Club is a space on the dunes of the Ceará coast combining gastronomy, music and nature in a unique experience. We developed a complete Social Media strategy, creating content that communicates the atmosphere and uniqueness of the space, building a qualified organic audience on Instagram and establishing La Duna as a weekend destination on the Ceará coast.',
      result: 'Digital community created from scratch',
      services: ['Social Media', 'Content Management', 'Editorial Calendar'],
    },
  },

  es: {
    'cabare-du-vento': {
      tagline: 'Tres en uno: Posada, Beach Club y Restaurante frente al mar en Preá.',
      description: 'Cabaré du Vento es un beach club frente al mar en la Playa del Preá, Cruz (CE), uno de los mejores spots de kitesurf del mundo con vientos de hasta 40 nudos. Con posada de frente al mar, cócteles de autor, música en vivo todos los fines de semana y gastronomía regional e internacional, el espacio se convirtió en el destino más deseado de la región. Desarrollamos la estrategia de Social Media y las campañas de Meta Ads que ampliaron el alcance al público nacional e internacional.',
      result: '40k seguidores · 100% de crecimiento en 1 año',
      services: ['Social Media', 'Meta Ads', 'Gestión de Contenido', 'Tráfico Pago'],
    },
    'villa-conduru': {
      tagline: 'Casas de vacaciones en condominio en la Playa del Preá, el mejor spot de kitesurf del mundo, a 14 km de Jericoacoara.',
      description: 'Villa Conduru es un condominio cerrado de 36 casas amuebladas en la Playa del Preá, Cruz, Ceará: a 14 km de Jericoacoara. Las casas de 2 y 3 habitaciones combinan confort premium con acceso directo a la meca mundial del kitesurf. El emprendimiento atiende el mercado de alquiler vacacional e inversores que buscan alta valorización en el litoral de Ceará. Las estrategias de Social Media y Meta Ads posicionaron la marca en el radar de los kitesurfistas de la región.',
      result: 'Marca referencia para el público de kitesurf en Preá',
      services: ['Social Media', 'Meta Ads', 'Gestión de Contenido', 'Tráfico Pago'],
    },
    'looping': {
      tagline: 'Escuela de kitesurf en la Isla del Guajirú, Itarema · CE.',
      description: 'Looping Kite School está en la Isla del Guajirú, Itarema (CE): una de las lagunas más planas y ventosas del mundo, con vientos alisios de 20 a 30 nudos de julio a enero. Con certificación IKO y ABK, equipos premium Duotone y North, sistema de radio subacuática en las clases y equipo multilingüe (PT/EN/ES/FR), Looping ya ha entrenado alumnos de más de 40 países. Desarrollamos la estrategia de Social Media y las campañas de Meta Ads que fortalecieron y profesionalizaron la presencia digital de la escuela.',
      result: 'Marca fortalecida y profesionalizada en el entorno digital',
      services: ['Web Design', 'Social Media', 'Meta Ads', 'Gestión de Contenido'],
    },
    'barraca-do-kite': {
      tagline: 'El punto de encuentro de los kitesurfistas en la Isla del Guajirú.',
      description: 'Barraca do Kite es un lodge y restaurante a orillas de la Laguna del Guajirú, en Itarema (CE): considerada una de las mejores lagunas del mundo para el kitesurf. Con habitaciones frente a la laguna, restaurante con pizzas y cenas completas, bar con cócteles y soporte técnico en la playa para kitesurfistas, el espacio ganó el Travelers\' Choice de TripAdvisor (4.4/5, 44 reseñas). La estrategia de Social Media y Meta Ads creó una comunidad digital fiel que impulsa el movimiento presencial.',
      result: '+320% de alcance orgánico',
      services: ['Social Media', 'Meta Ads', 'Gestión de Contenido', 'Tráfico Pago'],
    },
    'maresias-do-leme': {
      tagline: 'El hostel carioca que se convirtió en comunidad, con lista de espera en temporada alta.',
      description: 'Maresias do Leme es un hostel en Río de Janeiro que ofrece una experiencia carioca auténtica para sus huéspedes. Desarrollamos una estrategia completa de producción de contenido a través de videos dinámicos con alta conversión, vendiendo el estilo de vida y construyendo una comunidad fuerte y única, haciendo crecer la presencia orgánica de forma consciente a lo largo del tiempo. Hoy el hostel tiene lista de espera en temporada alta, feriados y eventos.',
      result: 'Instagram +400% en 2 años: de 27k a 110k seguidores',
      services: ['Social Media', 'Producción de Contenido'],
    },
    'no-worries': {
      tagline: 'Hostel y suites en Praia da Pipa, RN, presencia digital construida desde cero.',
      description: 'No Worries Suites es un hostel en el centro de Pipa, Rio Grande do Norte, a pocos pasos de las playas del Centro y del Amor. Con suites privadas y un ambiente de conexión entre viajeros y naturaleza, el espacio acoge surfistas, aventureros y nómadas digitales. Desarrollamos el diseño web del sitio, la estrategia de Social Media y las campañas de Meta Ads que construyeron la presencia digital del espacio desde cero.',
      result: 'Crecimiento del 50% en redes sociales en 6 meses',
      services: ['Web Design', 'Social Media', 'Meta Ads', 'Gestión de Contenido'],
    },
    'tripz-kite-club': {
      tagline: 'Donde el viento se encuentra con la tecnología para llenar la agenda.',
      description: 'Tripz Kite Club es una escuela de kitesurf en el litoral de Ceará enfocada en alumnos nacionales e internacionales. Desarrollamos el diseño del sitio institucional, optimizado para SEO y conversión, y las campañas de Meta Ads que captan alumnos segmentados por interés y comportamiento de viaje, generando matrículas consistentes a lo largo de la temporada de viento.',
      result: 'Captación digital estructurada desde cero',
      services: ['Web Design', 'Meta Ads', 'Landing Page', 'Tráfico Pago'],
    },
    'terra-ventos': {
      tagline: 'Proyecto inmobiliario en Playa del Preá: propiedades de lujo en el mejor spot de kitesurf del mundo.',
      description: 'Terra Ventos es una inmobiliaria especializada en la curaduría de propiedades de lujo e inversiones en el litoral de Ceará, con foco en Preá, Tatajuba y Bitupitá. Atiende inversores nacionales e internacionales que buscan propiedades de alto estándar asociadas al kitesurf y al turismo premium. Desarrollamos la estrategia de Social Media, las campañas de Meta Ads y Google Ads que posicionaron la marca como referencia en el segmento inmobiliario de lujo en el litoral cearense.',
      result: 'Generación de leads para propiedades de lujo en el litoral',
      services: ['Social Media', 'Meta Ads', 'Google Ads', 'Gestión de Contenido'],
    },
    'la-duna-beach-club': {
      tagline: 'La experiencia de las dunas cearenses transformada en audiencia fiel.',
      description: 'La Duna Beach Club es un espacio a orillas de las dunas del litoral cearense que combina gastronomía, música y naturaleza en una experiencia única. Desarrollamos una estrategia completa de Social Media, creando contenido que comunica la atmósfera y singularidad del espacio, construyendo una audiencia orgánica calificada en Instagram y consolidando La Duna como destino de fin de semana en el litoral de Ceará.',
      result: 'Comunidad digital creada desde cero',
      services: ['Social Media', 'Gestión de Contenido', 'Calendario Editorial'],
    },
  },
}

export function getLocalizedProject(locale: string, slug: string): ProjectContent | undefined {
  const loc = content[locale] ?? content.pt
  return loc[slug]
}
