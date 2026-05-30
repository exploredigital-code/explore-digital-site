export type ServicePillar = 'branding' | 'web' | 'social' | 'performance' | 'sistemas'

export interface ServiceStep { number: string; title: string; desc: string }

export interface SubService {
  slug: string
  pillar: ServicePillar
  name: string
  price: string
  period: 'once' | 'monthly'
  tagline: string
  description: string
  forWhom: string[]
  features: string[]
  result: string
  recommended?: boolean
}

export interface ServiceData {
  slug: string
  pillar: ServicePillar
  title: string
  tagline: string
  description: string
  gradient: string
  what: string
  how: ServiceStep[]
  whoFor: string[]
  deliverables: string[]
  subServices: SubService[]
  portfolioCategory: 'branding' | 'web' | 'social' | 'performance' | 'sistemas'
}

export const servicesData: ServiceData[] = [
  {
    slug: 'branding',
    pillar: 'branding',
    title: 'Branding',
    tagline: 'Identidade que gera desejo antes do primeiro contato.',
    description: 'Construímos marcas que comunicam valor, geram conexão emocional e posicionam o seu negócio exatamente onde ele precisa estar.',
    gradient: 'from-[#1B3025] via-[#2D5238] to-[#345E3F]',
    what: 'Branding é o conjunto de elementos visuais, verbais e estratégicos que definem como a sua marca é percebida. É a diferença entre ser lembrado e ser esquecido — entre atrair o cliente certo e disputar preço com qualquer concorrente.',
    how: [
      { number: '01', title: 'Imersão & Diagnóstico', desc: 'Mergulhamos fundo no seu negócio, mercado e concorrência para entender o que torna a sua marca única.' },
      { number: '02', title: 'Estratégia de Marca', desc: 'Definimos posicionamento, personalidade, tom de voz e os pilares que vão guiar todas as decisões criativas.' },
      { number: '03', title: 'Criação Visual', desc: 'Desenvolvemos logotipo, paleta de cores, tipografia e todos os elementos que compõem a identidade visual.' },
      { number: '04', title: 'Manual & Entrega', desc: 'Entregamos um manual de marca completo para garantir consistência em todas as aplicações.' },
    ],
    whoFor: [
      'Pousadas e hotéis que querem se posicionar como referência premium',
      'Beach clubs em fase de lançamento ou que precisam de rebrand',
      'Empreendimentos de real estate que precisam transmitir exclusividade',
      'Operadoras de experiências que querem comunicar diferenciação',
    ],
    deliverables: ['Logotipo principal e variações', 'Paleta de cores oficial', 'Tipografia da marca', 'Elementos gráficos', 'Mockups de aplicação', 'Manual de identidade visual (PDF)'],
    portfolioCategory: 'branding',
    subServices: [
      {
        slug: 'naming',
        pillar: 'branding',
        name: 'Naming',
        price: 'R$ 1.900',
        period: 'once',
        tagline: 'O nome que define tudo.',
        description: 'O nome é o primeiro ativo da sua marca — e também o mais permanente. Criamos nomes únicos, memoráveis e estratégicos que comunicam o DNA do seu negócio e funcionam tanto no Brasil quanto internacionalmente.',
        forWhom: ['Novos negócios em busca do nome certo', 'Marcas em processo de rebranding', 'Empreendedores que querem um nome com estratégia por trás'],
        features: [
          'Briefing estratégico aprofundado',
          'Pesquisa de mercado e análise da concorrência',
          'Geração de 10+ opções de nomes',
          'Análise de disponibilidade de domínio e redes sociais',
          'Verificação de registro de marca (orientação)',
          'Apresentação com justificativa criativa para cada opção',
        ],
        result: 'Nome único e disponível, com estratégia por trás',
      },
      {
        slug: 'identidade-visual',
        pillar: 'branding',
        name: 'Identidade Visual',
        price: 'R$ 2.800',
        period: 'once',
        tagline: 'Logo, cores e elementos que geram reconhecimento.',
        description: 'Sua marca visualmente representada: um sistema coeso de logo, cores, tipografia e elementos gráficos que criam reconhecimento imediato e geram desejo antes mesmo do primeiro contato.',
        forWhom: ['Marcas sem identidade visual definida', 'Negócios que querem profissionalizar a imagem', 'Hotéis, pousadas e espaços que querem transmitir o nível certo'],
        features: [
          'Logotipo principal + variações (horizontal, ícone, monocromático)',
          'Paleta de cores primária e secundária',
          'Seleção e aplicação de tipografia',
          'Ícones e elementos gráficos exclusivos',
          'Mockups de aplicação (papelaria, digital, fachada)',
          'Manual de identidade visual em PDF',
        ],
        result: 'Identidade visual completa pronta para aplicação',
      },
      {
        slug: 'branding-completo',
        pillar: 'branding',
        name: 'Branding Completo',
        price: 'R$ 7.000',
        period: 'once',
        tagline: 'Do posicionamento à identidade visual.',
        recommended: true,
        description: 'Do zero ao completo. Construímos sua marca de dentro para fora: do propósito e posicionamento à identidade visual aplicada. Para marcas que querem ser referência no setor — não apenas mais uma opção no mercado.',
        forWhom: ['Novos negócios que querem começar com tudo definido', 'Marcas em processo de reinvenção estratégica', 'Hotéis, experiências e real estate de alto padrão'],
        features: [
          'Definição de propósito, missão, visão e valores',
          'Arquitetura de marca e posicionamento competitivo',
          'Tom de voz e personalidade da marca',
          'Identidade visual completa (logo, cores, tipografia, elementos)',
          'Estudo de mercado e análise de concorrência',
          'Guia de aplicação da marca (brand book)',
          'Apresentação estratégica final',
        ],
        result: 'Marca completa do zero — estratégia + identidade visual',
      },
    ],
  },
  {
    slug: 'web-design',
    pillar: 'web',
    title: 'Web Design',
    tagline: 'Sites que convertem visitantes em clientes antes da ligação.',
    description: 'Criamos sites e landing pages que comunicam o valor da sua marca, geram confiança imediata e convertem visitas em reservas e leads qualificados.',
    gradient: 'from-[#0F2018] via-[#1B3025] to-[#243D2D]',
    what: 'Um bom site é o melhor vendedor da sua marca — trabalha 24h por dia, comunica credibilidade antes de qualquer conversa e guia o visitante exatamente para onde você quer que ele vá. Sites ruins perdem clientes silenciosamente.',
    how: [
      { number: '01', title: 'Briefing & Estratégia', desc: 'Entendemos o seu negócio, público e objetivos para definir a arquitetura e o fluxo ideal do site.' },
      { number: '02', title: 'UX & Prototipagem', desc: 'Criamos wireframes e protótipos navegáveis antes de qualquer linha de código.' },
      { number: '03', title: 'Design & Desenvolvimento', desc: 'Desenvolvemos o design final e construímos o site em código — rápido, responsivo e otimizado.' },
      { number: '04', title: 'Lançamento & Suporte', desc: 'Configuramos domínio, hospedagem, SEO básico e entregamos o site pronto para receber clientes.' },
    ],
    whoFor: [
      'Hotéis e pousadas que dependem de reservas diretas (sem OTA)',
      'Beach clubs com presença digital à altura da experiência física',
      'Imobiliárias e incorporadoras que vendem imóveis de alto padrão',
      'Marcas que nunca tiveram um site profissional',
    ],
    deliverables: ['Site institucional completo', 'Design responsivo (mobile + desktop)', 'Configuração de SEO', 'Integração com WhatsApp e formulários', 'Domínio e hospedagem configurados', 'Painel de edição simples'],
    portfolioCategory: 'web',
    subServices: [
      {
        slug: 'landing-page',
        pillar: 'web',
        name: 'Landing Page',
        price: 'R$ 2.000',
        period: 'once',
        tagline: 'Focada em converter visitantes em clientes.',
        description: 'Uma página criada com um único objetivo: converter. Seja para gerar leads, vender uma experiência ou capturar reservas diretas — o design e o copy trabalham juntos para guiar o visitante até a ação.',
        forWhom: ['Lançamentos de produtos ou serviços', 'Campanhas de tráfego pago', 'Negócios que precisam de uma página rápida e eficiente'],
        features: [
          'Design premium focado em conversão',
          'Copy estratégico orientado à ação',
          'Integração com WhatsApp ou formulário',
          'Otimização completa para mobile e desktop',
          'Desenvolvida em código — sem mensalidade de plataforma',
          'SEO básico configurado',
        ],
        result: 'Página que converte visitantes em leads e reservas',
      },
      {
        slug: 'website-institucional',
        pillar: 'web',
        name: 'Website Institucional',
        price: 'R$ 3.500',
        period: 'once',
        tagline: 'Presença digital completa da sua marca.',
        description: 'Seu site é o único ativo digital que você realmente controla. Construímos sites que representam a experiência que o cliente vai ter — rápidos, bonitos e otimizados para gerar reservas diretas sem depender de OTAs.',
        forWhom: ['Hotéis, pousadas e resorts', 'Experiências e destinos turísticos', 'Empresas de real estate e construtoras'],
        features: [
          'Design personalizado com identidade visual',
          'Páginas institucionais (home, sobre, serviços, contato)',
          'Otimizado para mobile e carregamento rápido',
          'Configuração de SEO on-page',
          'Integração com WhatsApp e formulário de contato',
          'Domínio e hospedagem configurados',
        ],
        result: 'Site que trabalha por você 24h, gerando reservas diretas',
      },
    ],
  },
  {
    slug: 'social-media',
    pillar: 'social',
    title: 'Social Media',
    tagline: 'Conteúdo que transforma seguidores em clientes pagantes.',
    description: 'Gerenciamos as redes sociais da sua marca com estratégia, consistência e criatividade — construindo audiência qualificada e gerando resultados mensuráveis.',
    gradient: 'from-[#162B20] via-[#243D2D] to-[#345E3F]',
    what: 'Social media para hotelaria, experiências e real estate não é sobre postar fotos bonitas. É sobre contar histórias que geram desejo, construir comunidade que confia na marca e criar conteúdo que move o cliente em direção à compra.',
    how: [
      { number: '01', title: 'Diagnóstico & Planejamento', desc: 'Auditamos as redes existentes, analisamos o mercado e criamos um plano editorial estratégico.' },
      { number: '02', title: 'Produção de Conteúdo', desc: 'Criamos reels, artes, stories e legendas que comunicam o valor da marca com consistência.' },
      { number: '03', title: 'Publicação & Gestão', desc: 'Publicamos no horário ideal, respondemos comentários e gerenciamos a comunidade.' },
      { number: '04', title: 'Análise & Otimização', desc: 'Acompanhamos métricas e ajustamos a estratégia mensalmente com base em dados reais.' },
    ],
    whoFor: [
      'Pousadas e resorts que querem atrair hóspedes diretos pelas redes',
      'Beach clubs com eventos e experiências para divulgar',
      'Escolas de esporte que vendem um estilo de vida',
      'Empreendimentos de real estate em fase de lançamento',
    ],
    deliverables: ['Calendário editorial mensal', 'Reels e vídeos verticais', 'Artes para feed e stories', 'Gestão da comunidade', 'Relatório mensal de performance', 'Grupo exclusivo de acompanhamento'],
    portfolioCategory: 'social',
    subServices: [
      {
        slug: 'producao-conteudo',
        pillar: 'social',
        name: 'Produção de Conteúdo',
        price: 'R$ 1.700',
        period: 'monthly',
        tagline: 'Reels, artes e stories com estratégia e identidade visual.',
        description: 'Produção completa de conteúdo para redes sociais: reels, design, stories e calendário editorial. Tudo alinhado com a identidade visual e os objetivos da sua marca.',
        forWhom: ['Marcas que querem presença ativa nas redes', 'Negócios que precisam de conteúdo consistente', 'Hotéis e pousadas que querem atrair hóspedes diretos'],
        features: [
          'Calendário editorial mensal',
          'Reels e vídeos verticais',
          'Artes para feed e stories',
          'Legenda com copy estratégico',
          'Relatório mensal de performance',
          'Grupo exclusivo de acompanhamento',
        ],
        result: 'Conteúdo profissional e consistente todo mês',
      },
      {
        slug: 'captacoes',
        pillar: 'social',
        name: 'Captações',
        price: 'R$ 800',
        period: 'once',
        tagline: 'Fotografia e vídeo profissional para redes sociais e identidade de marca.',
        description: 'Captação profissional de fotografia e vídeo para alimentar suas redes sociais, site e materiais de marca. Imagens e vídeos que comunicam o padrão e a personalidade do seu negócio.',
        forWhom: ['Hotéis, pousadas e beach clubs', 'Restaurantes e experiências gastronômicas', 'Marcas que precisam de banco de imagens e vídeos profissional'],
        features: [
          'Ensaio fotográfico no local',
          'Captação de vídeos para reels e conteúdo',
          'Edição profissional de fotos e vídeos',
          'Entrega em alta resolução e formatos para redes',
          'Direção criativa alinhada à identidade da marca',
        ],
        result: 'Banco de fotos e vídeos profissionais prontos para usar',
      },
      {
        slug: 'setup',
        pillar: 'social',
        name: 'Setup',
        price: 'R$ 4.500',
        period: 'once',
        tagline: 'Configuração completa das redes do zero ao profissional.',
        description: 'Estruturamos do zero as suas redes sociais: bio, destaques, grid inicial, links e tudo que é necessário para sua presença digital começar com o pé direito.',
        forWhom: ['Novos negócios lançando presença digital', 'Marcas que precisam de uma reforma completa', 'Empreendimentos que nunca investiram no digital'],
        features: [
          'Criação e otimização de perfis',
          'Destaques com identidade visual',
          'Bio estratégica + links',
          'Grid inicial com conteúdos de lançamento',
          'Orientação sobre boas práticas',
        ],
        result: 'Redes sociais prontas para crescer',
      },
    ],
  },
  {
    slug: 'performance-ads',
    pillar: 'performance',
    title: 'Performance Ads',
    tagline: 'Cada real investido rastreado até a reserva.',
    description: 'Gerenciamos campanhas no Google e Meta com foco absoluto em ROI. Você sabe exatamente quanto investiu, quanto gerou e como estamos otimizando para ir mais longe.',
    gradient: 'from-[#243D2D] via-[#1B3025] to-[#0F2018]',
    what: 'Performance Ads é marketing com accountability total. Não trabalhamos com "parece que está indo bem" — trabalhamos com dados, métricas e metas claras. Cada campanha é gerenciada para gerar o máximo de retorno com o mínimo de desperdício.',
    how: [
      { number: '01', title: 'Setup & Rastreamento', desc: 'Configuramos pixels, tags e todos os eventos necessários para rastrear conversões com precisão.' },
      { number: '02', title: 'Estratégia & Segmentação', desc: 'Definimos públicos, objetivos e estrutura de campanhas para cada etapa do funil.' },
      { number: '03', title: 'Criação & Lançamento', desc: 'Desenvolvemos os criativos e lançamos as campanhas com estrutura de testes A/B.' },
      { number: '04', title: 'Otimização Contínua', desc: 'Monitoramos diariamente e ajustamos lances, públicos e criativos para maximizar ROI.' },
    ],
    whoFor: [
      'Hotéis e pousadas que querem reduzir dependência das OTAs',
      'Operadoras que precisam gerar leads qualificados em volume',
      'Imobiliárias com empreendimentos para vender',
      'Negócios que já investem em tráfego mas não veem resultado',
    ],
    deliverables: ['Configuração completa de campanhas', 'Criativos (imagens e vídeos)', 'Otimização diária', 'Relatório mensal unificado', 'Análise de concorrência', 'Dashboard de acompanhamento'],
    portfolioCategory: 'performance',
    subServices: [
      {
        slug: 'meta-ads',
        pillar: 'performance',
        name: 'Meta Ads',
        price: 'R$ 1.200',
        period: 'monthly',
        tagline: 'Campanhas no Instagram e Facebook.',
        description: 'Anúncios no Instagram e Facebook com segmentação precisa para o público certo — no momento certo. Cada real investido é monitorado e otimizado para maximizar leads e reservas.',
        forWhom: ['Marcas que querem aumentar visibilidade', 'Hotéis e pousadas que buscam reservas diretas', 'Experiências que querem alcançar novos públicos'],
        features: [
          'Criação de campanhas no Instagram e Facebook',
          'Segmentação de público por interesse e comportamento',
          'Análise e otimização diária das campanhas',
          'Testes A/B de criativos',
          'Relatório mensal de métricas e performance',
          'Grupo de WhatsApp exclusivo',
        ],
        result: 'Mais leads e reservas com custo por aquisição controlado',
      },
      {
        slug: 'google-ads',
        pillar: 'performance',
        name: 'Google Ads',
        price: 'R$ 1.200',
        period: 'monthly',
        tagline: 'Apareça no momento certo no Google.',
        description: 'Quando alguém busca o que você oferece, sua marca aparece primeiro. Campanhas no Google com foco em intenção de compra — o tráfego mais qualificado que existe.',
        forWhom: ['Hotéis que querem reduzir dependência das OTAs', 'Experiências e destinos turísticos', 'Real estate com imóveis para vender ou alugar'],
        features: [
          'Criação e gestão de campanhas no Google Ads',
          'Pesquisa e seleção de palavras-chave estratégicas',
          'Segmentação para públicos específicos',
          'Otimização diária das campanhas',
          'Relatório mensal de performance',
          'Grupo de WhatsApp exclusivo',
        ],
        result: 'Tráfego qualificado com alta intenção de compra',
      },
    ],
  },
  {
    slug: 'sistemas',
    pillar: 'sistemas',
    title: 'Sistemas',
    tagline: 'Tecnologia que automatiza e escala o seu negócio.',
    description: 'Desenvolvemos sistemas internos e automações que eliminam processos manuais, reduzem erros e liberam sua equipe para o que realmente importa.',
    gradient: 'from-[#0F2018] via-[#162B20] to-[#1B3025]',
    what: 'Sistemas e automações bem implementados são o diferencial que permite escalar sem aumentar proporcionalmente a equipe. Desde CRMs personalizados até integrações automáticas entre plataformas — construímos a infraestrutura tecnológica do seu negócio.',
    how: [
      { number: '01', title: 'Diagnóstico & Mapeamento', desc: 'Entendemos os processos atuais, identificamos gargalos e mapeamos as oportunidades de automação.' },
      { number: '02', title: 'Arquitetura da Solução', desc: 'Desenhamos a solução técnica ideal para o seu contexto — sem over-engineering.' },
      { number: '03', title: 'Desenvolvimento', desc: 'Construímos e integramos os sistemas com as ferramentas que você já usa.' },
      { number: '04', title: 'Implantação & Suporte', desc: 'Treinamos a equipe, documentamos e acompanhamos a operação após o lançamento.' },
    ],
    whoFor: [
      'Agências e empresas com processos repetitivos que tomam tempo',
      'Hotéis e pousadas que precisam centralizar operações',
      'Negócios que querem escalar sem aumentar headcount',
      'Times que dependem de planilhas e processos manuais',
    ],
    deliverables: ['Sistema ou automação configurada', 'Documentação técnica', 'Treinamento da equipe', 'Suporte pós-implantação'],
    portfolioCategory: 'sistemas',
    subServices: [
      {
        slug: 'sistemas-internos',
        pillar: 'sistemas',
        name: 'Sistemas Internos',
        price: 'Sob consulta',
        period: 'once',
        tagline: 'Sistemas personalizados para a sua operação.',
        description: 'Desenvolvemos sistemas internos sob medida: CRMs, dashboards, gestão de projetos, portais de cliente e qualquer solução que organize e escale a sua operação.',
        forWhom: ['Agências e prestadores de serviço', 'Hotéis e operadoras turísticas', 'Empresas com fluxos complexos de atendimento'],
        features: [
          'Levantamento de requisitos',
          'Design e desenvolvimento do sistema',
          'Integração com ferramentas existentes',
          'Painel administrativo',
          'Documentação e treinamento',
        ],
        result: 'Operação organizada, centralizada e escalável',
      },
      {
        slug: 'automacoes',
        pillar: 'sistemas',
        name: 'Automações',
        price: 'Sob consulta',
        period: 'once',
        tagline: 'Processe mais fazendo menos com fluxos automáticos.',
        description: 'Criamos automações que conectam suas ferramentas e eliminam trabalho manual: desde follow-ups automáticos até integrações entre CRM, e-mail, WhatsApp e planilhas.',
        forWhom: ['Times de marketing e vendas', 'Negócios com alto volume de atendimento', 'Empresas que querem reduzir erros operacionais'],
        features: [
          'Mapeamento de processos automatizáveis',
          'Criação de fluxos no Make, n8n ou Zapier',
          'Integração entre plataformas (CRM, e-mail, WhatsApp)',
          'Testes e validação',
          'Documentação dos fluxos',
        ],
        result: 'Processos automáticos que trabalham enquanto você dorme',
      },
      {
        slug: 'crm',
        pillar: 'sistemas',
        name: 'CRM',
        price: 'Sob consulta',
        period: 'once',
        tagline: 'Gestão de clientes e pipeline de vendas centralizado.',
        description: 'Implementamos e configuramos o CRM ideal para o seu negócio — organizando leads, histórico de atendimento, follow-ups e pipeline de vendas em um único lugar.',
        forWhom: ['Times de vendas que dependem de planilhas', 'Agências e prestadores de serviço com múltiplos clientes', 'Hotéis e operadoras com alto volume de leads'],
        features: [
          'Escolha e configuração do CRM ideal',
          'Migração de dados existentes',
          'Criação de pipelines e etapas de venda',
          'Automações de follow-up',
          'Treinamento da equipe',
          'Integrações com WhatsApp, e-mail e formulários',
        ],
        result: 'Pipeline de vendas organizado e follow-up nunca esquecido',
      },
    ],
  },
]

export function findSubService(slug: string): SubService | undefined {
  for (const service of servicesData) {
    const sub = service.subServices.find(s => s.slug === slug)
    if (sub) return sub
  }
  return undefined
}
