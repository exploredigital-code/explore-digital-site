export type ServiceContent = {
  title: string
  tagline: string
  description: string
  what: string
  how: { title: string; desc: string }[]
  whoFor: string[]
  deliverables: string[]
}

export type SubServiceContent = {
  name: string
  tagline: string
  description: string
  forWhom: string[]
  features: string[]
  result: string
}

type LocaleContent = {
  services: Record<string, ServiceContent>
  subServices: Record<string, SubServiceContent>
}

const content: Record<string, LocaleContent> = {
  pt: {
    services: {
      branding: {
        title: 'Branding',
        tagline: 'Identidade que gera desejo antes do primeiro contato.',
        description: 'Construímos marcas que comunicam valor, geram conexão emocional e posicionam o seu negócio exatamente onde ele precisa estar.',
        what: 'Branding é o conjunto de elementos visuais, verbais e estratégicos que definem como a sua marca é percebida. É a diferença entre ser lembrado e ser esquecido, entre atrair o cliente certo e disputar preço com qualquer concorrente.',
        how: [
          { title: 'Imersão & Diagnóstico', desc: 'Mergulhamos fundo no seu negócio, mercado e concorrência para entender o que torna a sua marca única.' },
          { title: 'Estratégia de Marca', desc: 'Definimos posicionamento, personalidade, tom de voz e os pilares que vão guiar todas as decisões criativas.' },
          { title: 'Criação Visual', desc: 'Desenvolvemos logotipo, paleta de cores, tipografia e todos os elementos que compõem a identidade visual.' },
          { title: 'Manual & Entrega', desc: 'Entregamos um manual de marca completo para garantir consistência em todas as aplicações.' },
        ],
        whoFor: [
          'Pousadas e hotéis que querem se posicionar como referência premium',
          'Beach clubs em fase de lançamento ou que precisam de rebrand',
          'Empreendimentos de real estate que precisam transmitir exclusividade',
          'Operadoras de experiências que querem comunicar diferenciação',
        ],
        deliverables: ['Logotipo principal e variações', 'Paleta de cores oficial', 'Tipografia da marca', 'Elementos gráficos', 'Mockups de aplicação', 'Manual de identidade visual (PDF)'],
      },
      'web-design': {
        title: 'Web Design',
        tagline: 'Sites que convertem visitantes em clientes antes da ligação.',
        description: 'Criamos sites e landing pages que comunicam o valor da sua marca, geram confiança imediata e convertem visitas em reservas e leads qualificados.',
        what: 'Um bom site é o melhor vendedor da sua marca. Trabalha 24h por dia, comunica credibilidade antes de qualquer conversa e guia o visitante exatamente para onde você quer que ele vá. Sites ruins perdem clientes silenciosamente.',
        how: [
          { title: 'Briefing & Estratégia', desc: 'Entendemos o seu negócio, público e objetivos para definir a arquitetura e o fluxo ideal do site.' },
          { title: 'UX & Prototipagem', desc: 'Criamos wireframes e protótipos navegáveis antes de qualquer linha de código.' },
          { title: 'Design & Desenvolvimento', desc: 'Desenvolvemos o design final e construímos o site em código, rápido, responsivo e otimizado.' },
          { title: 'Lançamento & Suporte', desc: 'Configuramos domínio, hospedagem, SEO básico e entregamos o site pronto para receber clientes.' },
        ],
        whoFor: [
          'Hotéis e pousadas que dependem de reservas diretas (sem OTA)',
          'Beach clubs com presença digital no nível da experiência física',
          'Imobiliárias e incorporadoras que vendem imóveis de alto padrão',
          'Marcas que nunca tiveram um site profissional',
        ],
        deliverables: ['Site institucional completo', 'Design responsivo (mobile + desktop)', 'Configuração de SEO', 'Integração com WhatsApp e formulários', 'Domínio e hospedagem configurados', 'Painel de edição simples'],
      },
      'social-media': {
        title: 'Social Media',
        tagline: 'Conteúdo que transforma seguidores em clientes pagantes.',
        description: 'Gerenciamos as redes sociais da sua marca com estratégia, consistência e criatividade, construindo audiência qualificada e gerando resultados mensuráveis.',
        what: 'Social media para hotelaria, experiências e real estate não é sobre postar fotos bonitas. É sobre contar histórias que geram desejo, construir comunidade que confia na marca e criar conteúdo que direciona o cliente para a compra.',
        how: [
          { title: 'Diagnóstico & Planejamento', desc: 'Auditamos as redes existentes, analisamos o mercado e criamos um plano editorial estratégico.' },
          { title: 'Produção de Conteúdo', desc: 'Criamos reels, artes, stories e legendas que comunicam o valor da marca com consistência.' },
          { title: 'Publicação & Gestão', desc: 'Publicamos no horário ideal, respondemos comentários e gerenciamos a comunidade.' },
          { title: 'Análise & Otimização', desc: 'Acompanhamos métricas e ajustamos a estratégia mensalmente com base em dados reais.' },
        ],
        whoFor: [
          'Pousadas e resorts que querem atrair hóspedes diretos pelas redes',
          'Beach clubs com eventos e experiências para divulgar',
          'Escolas de esporte que vendem um estilo de vida',
          'Empreendimentos de real estate em fase de lançamento',
        ],
        deliverables: ['Calendário editorial mensal', 'Reels e vídeos verticais', 'Artes para feed e stories', 'Gestão da comunidade', 'Relatório mensal de performance', 'Grupo exclusivo de acompanhamento'],
      },
      'performance-ads': {
        title: 'Performance Ads',
        tagline: 'Cada real investido rastreado até a reserva.',
        description: 'Gerenciamos campanhas no Google e Meta com foco absoluto em ROI. Você sabe exatamente quanto investiu, quanto gerou e como estamos otimizando para ir mais longe.',
        what: 'Performance Ads é marketing com accountability total. Não trabalhamos com "parece que está indo bem". Trabalhamos com dados, métricas e metas claras. Cada campanha é gerenciada para gerar o máximo de retorno com o mínimo de desperdício.',
        how: [
          { title: 'Setup & Rastreamento', desc: 'Configuramos pixels, tags e todos os eventos necessários para rastrear conversões com precisão.' },
          { title: 'Estratégia & Segmentação', desc: 'Definimos públicos, objetivos e estrutura de campanhas para cada etapa do funil.' },
          { title: 'Criação & Lançamento', desc: 'Desenvolvemos os criativos e lançamos as campanhas com estrutura de testes A/B.' },
          { title: 'Otimização Contínua', desc: 'Monitoramos diariamente e ajustamos lances, públicos e criativos para maximizar ROI.' },
        ],
        whoFor: [
          'Hotéis e pousadas que querem reduzir dependência das OTAs',
          'Operadoras que precisam gerar leads qualificados em volume',
          'Imobiliárias com empreendimentos para vender',
          'Negócios que já investem em tráfego mas não veem resultado',
        ],
        deliverables: ['Configuração completa de campanhas', 'Criativos (imagens e vídeos)', 'Otimização diária', 'Relatório mensal unificado', 'Análise de concorrência', 'Dashboard de acompanhamento'],
      },
      sistemas: {
        title: 'Sistemas',
        tagline: 'Tecnologia que automatiza e escala o seu negócio.',
        description: 'Desenvolvemos sistemas internos e automações que eliminam processos manuais, reduzem erros e liberam sua equipe para o que realmente importa.',
        what: 'Sistemas e automações bem implementados são o diferencial que permite escalar sem aumentar proporcionalmente a equipe. Desde CRMs personalizados até integrações automáticas entre plataformas. Construímos a infraestrutura tecnológica do seu negócio.',
        how: [
          { title: 'Diagnóstico & Mapeamento', desc: 'Entendemos os processos atuais, identificamos gargalos e mapeamos as oportunidades de automação.' },
          { title: 'Arquitetura da Solução', desc: 'Desenhamos a solução técnica ideal para o seu contexto, sem over-engineering.' },
          { title: 'Desenvolvimento', desc: 'Construímos e integramos os sistemas com as ferramentas que você já usa.' },
          { title: 'Implantação & Suporte', desc: 'Treinamos a equipe, documentamos e acompanhamos a operação após o lançamento.' },
        ],
        whoFor: [
          'Agências e empresas com processos repetitivos que tomam tempo',
          'Hotéis e pousadas que precisam centralizar operações',
          'Negócios que querem escalar sem aumentar headcount',
          'Times que dependem de planilhas e processos manuais',
        ],
        deliverables: ['Sistema ou automação configurada', 'Documentação técnica', 'Treinamento da equipe', 'Suporte pós-implantação'],
      },
    },
    subServices: {
      naming: {
        name: 'Naming',
        tagline: 'O nome que define tudo.',
        description: 'O nome é o primeiro ativo da sua marca. Também o mais permanente. Criamos nomes únicos, memoráveis e estratégicos que comunicam o DNA do seu negócio e funcionam tanto no Brasil quanto internacionalmente.',
        forWhom: ['Novos negócios em busca do nome certo', 'Marcas em processo de rebranding', 'Empreendedores que querem um nome com estratégia por trás'],
        features: ['Briefing estratégico aprofundado', 'Pesquisa de mercado e análise da concorrência', 'Geração de 10+ opções de nomes', 'Análise de disponibilidade de domínio e redes sociais', 'Verificação de registro de marca (orientação)', 'Apresentação com justificativa criativa para cada opção'],
        result: 'Nome único e disponível, com estratégia por trás',
      },
      'identidade-visual': {
        name: 'Identidade Visual',
        tagline: 'Logo, cores e elementos que geram reconhecimento.',
        description: 'Sua marca visualmente representada: um sistema coeso de logo, cores, tipografia e elementos gráficos que criam reconhecimento imediato e geram desejo antes mesmo do primeiro contato.',
        forWhom: ['Marcas sem identidade visual definida', 'Negócios que querem profissionalizar a imagem', 'Hotéis, pousadas e espaços que querem transmitir o nível certo'],
        features: ['Logotipo principal + variações (horizontal, ícone, monocromático)', 'Paleta de cores primária e secundária', 'Seleção e aplicação de tipografia', 'Ícones e elementos gráficos exclusivos', 'Mockups de aplicação (papelaria, digital, fachada)', 'Manual de identidade visual em PDF'],
        result: 'Identidade visual completa pronta para aplicação',
      },
      'branding-completo': {
        name: 'Branding Completo',
        tagline: 'Do posicionamento até a identidade visual.',
        description: 'Do zero ao completo. Construímos sua marca de dentro para fora: do propósito e posicionamento até a identidade visual aplicada. Para marcas que querem ser referência no setor. Não apenas mais uma opção no mercado.',
        forWhom: ['Novos negócios que querem começar com tudo definido', 'Marcas em processo de reinvenção estratégica', 'Hotéis, experiências e real estate de alto padrão'],
        features: ['Definição de propósito, missão, visão e valores', 'Arquitetura de marca e posicionamento competitivo', 'Tom de voz e personalidade da marca', 'Identidade visual completa (logo, cores, tipografia, elementos)', 'Estudo de mercado e análise de concorrência', 'Guia de aplicação da marca (brand book)', 'Apresentação estratégica final'],
        result: 'Marca completa do zero: estratégia + identidade visual',
      },
      'landing-page': {
        name: 'Landing Page',
        tagline: 'Focada em converter visitantes em clientes.',
        description: 'Uma página criada com um único objetivo: converter. Seja para gerar leads, vender uma experiência ou capturar reservas diretas. O design e o copy trabalham juntos para guiar o visitante até a ação.',
        forWhom: ['Lançamentos de produtos ou serviços', 'Campanhas de tráfego pago', 'Negócios que precisam de uma página rápida e eficiente'],
        features: ['Design premium focado em conversão', 'Copy estratégico orientado para ação', 'Integração com WhatsApp ou formulário', 'Otimização completa para mobile e desktop', 'Desenvolvida em código, sem mensalidade de plataforma', 'SEO básico configurado'],
        result: 'Página que converte visitantes em leads e reservas',
      },
      'website-institucional': {
        name: 'Website Institucional',
        tagline: 'Presença digital completa da sua marca.',
        description: 'Seu site é o único ativo digital que você realmente controla. Construímos sites que representam a experiência que o cliente vai ter: rápidos, bonitos e otimizados para gerar reservas diretas sem depender de OTAs.',
        forWhom: ['Hotéis, pousadas e resorts', 'Experiências e destinos turísticos', 'Empresas de real estate e construtoras'],
        features: ['Design personalizado com identidade visual', 'Páginas institucionais (home, sobre, serviços, contato)', 'Otimizado para mobile e carregamento rápido', 'Configuração de SEO on-page', 'Integração com WhatsApp e formulário de contato', 'Domínio e hospedagem configurados'],
        result: 'Site que trabalha por você 24h, gerando reservas diretas',
      },
      'producao-conteudo': {
        name: 'Produção de Conteúdo',
        tagline: 'Reels, artes e stories com estratégia e identidade visual.',
        description: 'Produção completa de conteúdo para redes sociais: reels, design, stories e calendário editorial. Tudo alinhado com a identidade visual e os objetivos da sua marca.',
        forWhom: ['Marcas que querem presença ativa nas redes', 'Negócios que precisam de conteúdo consistente', 'Hotéis e pousadas que querem atrair hóspedes diretos'],
        features: ['Calendário editorial mensal', 'Reels e vídeos verticais', 'Artes para feed e stories', 'Legenda com copy estratégico', 'Relatório mensal de performance', 'Grupo exclusivo de acompanhamento'],
        result: 'Conteúdo profissional e consistente todo mês',
      },
      captacoes: {
        name: 'Captações',
        tagline: 'Fotografia e vídeo profissional para redes sociais e identidade de marca.',
        description: 'Captação profissional de fotografia e vídeo para alimentar suas redes sociais, site e materiais de marca. Imagens e vídeos que comunicam o padrão e a personalidade do seu negócio.',
        forWhom: ['Hotéis, pousadas e beach clubs', 'Restaurantes e experiências gastronômicas', 'Marcas que precisam de banco de imagens e vídeos profissional'],
        features: ['Ensaio fotográfico no local', 'Captação de vídeos para reels e conteúdo', 'Edição profissional de fotos e vídeos', 'Entrega em alta resolução e formatos para redes', 'Direção criativa alinhada com a identidade da marca'],
        result: 'Banco de fotos e vídeos profissionais prontos para usar',
      },
      setup: {
        name: 'Setup',
        tagline: 'Configuração completa das redes do zero ao profissional.',
        description: 'Estruturamos do zero as suas redes sociais: bio, destaques, grid inicial, links e tudo que é necessário para sua presença digital começar com o pé direito.',
        forWhom: ['Novos negócios lançando presença digital', 'Marcas que precisam de uma reforma completa', 'Empreendimentos que nunca investiram no digital'],
        features: ['Criação e otimização de perfis', 'Destaques com identidade visual', 'Bio estratégica + links', 'Grid inicial com conteúdos de lançamento', 'Orientação sobre boas práticas'],
        result: 'Redes sociais prontas para crescer',
      },
      'meta-ads': {
        name: 'Meta Ads',
        tagline: 'Campanhas no Instagram e Facebook.',
        description: 'Anúncios no Instagram e Facebook com segmentação precisa para o público certo, no momento certo. Cada real investido é monitorado e otimizado para maximizar leads e reservas.',
        forWhom: ['Marcas que querem aumentar visibilidade', 'Hotéis e pousadas que buscam reservas diretas', 'Experiências que querem alcançar novos públicos'],
        features: ['Criação de campanhas no Instagram e Facebook', 'Segmentação de público por interesse e comportamento', 'Análise e otimização diária das campanhas', 'Testes A/B de criativos', 'Relatório mensal de métricas e performance', 'Grupo de WhatsApp exclusivo'],
        result: 'Mais leads e reservas com custo por aquisição controlado',
      },
      'google-ads': {
        name: 'Google Ads',
        tagline: 'Apareça no momento certo no Google.',
        description: 'Quando alguém busca o que você oferece, sua marca aparece primeiro. Campanhas no Google com foco em intenção de compra. O tráfego mais qualificado que existe.',
        forWhom: ['Hotéis que querem reduzir dependência das OTAs', 'Experiências e destinos turísticos', 'Real estate com imóveis para vender ou alugar'],
        features: ['Criação e gestão de campanhas no Google Ads', 'Pesquisa e seleção de palavras-chave estratégicas', 'Segmentação para públicos específicos', 'Otimização diária das campanhas', 'Relatório mensal de performance', 'Grupo de WhatsApp exclusivo'],
        result: 'Tráfego qualificado com alta intenção de compra',
      },
      'sistemas-internos': {
        name: 'Sistemas Internos',
        tagline: 'Sistemas personalizados para a sua operação.',
        description: 'Desenvolvemos sistemas internos sob medida: CRMs, dashboards, gestão de projetos, portais de cliente e qualquer solução que organize e escale a sua operação.',
        forWhom: ['Agências e prestadores de serviço', 'Hotéis e operadoras turísticas', 'Empresas com fluxos complexos de atendimento'],
        features: ['Levantamento de requisitos', 'Design e desenvolvimento do sistema', 'Integração com ferramentas existentes', 'Painel administrativo', 'Documentação e treinamento'],
        result: 'Operação organizada, centralizada e escalável',
      },
      automacoes: {
        name: 'Automações',
        tagline: 'Processe mais fazendo menos com fluxos automáticos.',
        description: 'Criamos automações que conectam suas ferramentas e eliminam trabalho manual: desde follow-ups automáticos até integrações entre CRM, e-mail, WhatsApp e planilhas.',
        forWhom: ['Times de marketing e vendas', 'Negócios com alto volume de atendimento', 'Empresas que querem reduzir erros operacionais'],
        features: ['Mapeamento de processos automatizáveis', 'Criação de fluxos no Make, n8n ou Zapier', 'Integração entre plataformas (CRM, e-mail, WhatsApp)', 'Testes e validação', 'Documentação dos fluxos'],
        result: 'Processos automáticos que trabalham enquanto você dorme',
      },
      crm: {
        name: 'CRM',
        tagline: 'Gestão de clientes e pipeline de vendas centralizado.',
        description: 'Implementamos e configuramos o CRM ideal para o seu negócio, organizando leads, histórico de atendimento, follow-ups e pipeline de vendas em um único lugar.',
        forWhom: ['Times de vendas que dependem de planilhas', 'Agências e prestadores de serviço com múltiplos clientes', 'Hotéis e operadoras com alto volume de leads'],
        features: ['Escolha e configuração do CRM ideal', 'Migração de dados existentes', 'Criação de pipelines e etapas de venda', 'Automações de follow-up', 'Treinamento da equipe', 'Integrações com WhatsApp, e-mail e formulários'],
        result: 'Pipeline de vendas organizado e follow-up nunca esquecido',
      },
    },
  },

  en: {
    services: {
      branding: {
        title: 'Branding',
        tagline: 'Identity that creates desire before first contact.',
        description: 'We build brands that communicate value, create emotional connection, and position your business exactly where it needs to be.',
        what: 'Branding is the set of visual, verbal, and strategic elements that define how your brand is perceived. It\'s the difference between being remembered and being forgotten, between attracting the right client and competing on price with any competitor.',
        how: [
          { title: 'Immersion & Diagnosis', desc: 'We dive deep into your business, market, and competition to understand what makes your brand unique.' },
          { title: 'Brand Strategy', desc: 'We define positioning, personality, tone of voice, and the pillars that will guide all creative decisions.' },
          { title: 'Visual Creation', desc: 'We develop the logo, color palette, typography, and all elements that make up the visual identity.' },
          { title: 'Brand Book & Delivery', desc: 'We deliver a complete brand manual to ensure consistency across all applications.' },
        ],
        whoFor: [
          'Guesthouses and hotels positioning themselves as premium references',
          'Beach clubs launching or in need of a rebrand',
          'Real estate ventures that need to convey exclusivity',
          'Experience operators wanting to communicate differentiation',
        ],
        deliverables: ['Primary logo and variations', 'Official color palette', 'Brand typography', 'Graphic elements', 'Application mockups', 'Visual identity manual (PDF)'],
      },
      'web-design': {
        title: 'Web Design',
        tagline: 'Sites that convert visitors into clients before the first call.',
        description: 'We create websites and landing pages that communicate your brand\'s value, build immediate trust, and convert visits into bookings and qualified leads.',
        what: 'A great website is your brand\'s best salesperson. It works 24/7, communicates credibility before any conversation, and guides visitors exactly where you want them to go. Bad sites lose clients silently.',
        how: [
          { title: 'Briefing & Strategy', desc: 'We understand your business, audience, and goals to define the ideal site architecture and flow.' },
          { title: 'UX & Prototyping', desc: 'We create wireframes and navigable prototypes before a single line of code.' },
          { title: 'Design & Development', desc: 'We build the final design and code the site, fast, responsive, and optimized.' },
          { title: 'Launch & Support', desc: 'We configure domain, hosting, basic SEO, and deliver the site ready to receive clients.' },
        ],
        whoFor: [
          'Hotels and guesthouses relying on direct bookings (without OTAs)',
          'Beach clubs needing a digital presence that matches the physical experience',
          'Real estate agencies and developers selling premium properties',
          'Brands that never had a professional website',
        ],
        deliverables: ['Complete institutional website', 'Responsive design (mobile + desktop)', 'SEO configuration', 'WhatsApp and form integration', 'Domain and hosting configured', 'Simple editing panel'],
      },
      'social-media': {
        title: 'Social Media',
        tagline: 'Content that turns followers into paying clients.',
        description: 'We manage your brand\'s social media with strategy, consistency, and creativity, building a qualified audience and delivering measurable results.',
        what: 'Social media for hospitality, experiences, and real estate isn\'t about posting pretty photos. It\'s about telling stories that create desire, building a community that trusts the brand, and creating content that drives the client toward purchase.',
        how: [
          { title: 'Diagnosis & Planning', desc: 'We audit existing channels, analyze the market, and create a strategic editorial plan.' },
          { title: 'Content Production', desc: 'We create reels, graphics, stories, and captions that communicate brand value consistently.' },
          { title: 'Publishing & Management', desc: 'We post at the ideal time, respond to comments, and manage the community.' },
          { title: 'Analysis & Optimization', desc: 'We track metrics and adjust strategy monthly based on real data.' },
        ],
        whoFor: [
          'Guesthouses and resorts attracting direct guests through social channels',
          'Beach clubs with events and experiences to promote',
          'Sports schools selling a lifestyle',
          'Real estate ventures launching new developments',
        ],
        deliverables: ['Monthly editorial calendar', 'Reels and vertical videos', 'Feed and story graphics', 'Community management', 'Monthly performance report', 'Exclusive follow-up group'],
      },
      'performance-ads': {
        title: 'Performance Ads',
        tagline: 'Every dollar invested tracked to the booking.',
        description: 'We manage Google and Meta campaigns with an absolute focus on ROI. You know exactly how much was invested, how much was generated, and how we\'re optimizing to go further.',
        what: 'Performance Ads is marketing with total accountability. We don\'t work with "seems like it\'s going well." We work with data, metrics, and clear goals. Every campaign is managed to generate maximum return with minimum waste.',
        how: [
          { title: 'Setup & Tracking', desc: 'We configure pixels, tags, and all events needed to track conversions with precision.' },
          { title: 'Strategy & Targeting', desc: 'We define audiences, objectives, and campaign structure for each stage of the funnel.' },
          { title: 'Creative & Launch', desc: 'We develop creatives and launch campaigns with an A/B testing structure.' },
          { title: 'Continuous Optimization', desc: 'We monitor daily and adjust bids, audiences, and creatives to maximize ROI.' },
        ],
        whoFor: [
          'Hotels and guesthouses reducing OTA dependency',
          'Operators needing to generate qualified leads at volume',
          'Real estate agencies with properties to sell',
          'Businesses already investing in traffic but not seeing results',
        ],
        deliverables: ['Complete campaign setup', 'Creatives (images and videos)', 'Daily optimization', 'Unified monthly report', 'Competitive analysis', 'Tracking dashboard'],
      },
      sistemas: {
        title: 'Systems',
        tagline: 'Technology that automates and scales your business.',
        description: 'We develop internal systems and automations that eliminate manual processes, reduce errors, and free your team to focus on what truly matters.',
        what: 'Well-implemented systems and automations are the differentiator that allows you to scale without proportionally growing your team. From custom CRMs to automatic integrations between platforms. We build the technological infrastructure of your business.',
        how: [
          { title: 'Diagnosis & Mapping', desc: 'We understand current processes, identify bottlenecks, and map automation opportunities.' },
          { title: 'Solution Architecture', desc: 'We design the ideal technical solution for your context, without over-engineering.' },
          { title: 'Development', desc: 'We build and integrate systems with the tools you already use.' },
          { title: 'Deployment & Support', desc: 'We train the team, document everything, and monitor operations after launch.' },
        ],
        whoFor: [
          'Agencies and companies with repetitive processes taking up time',
          'Hotels and guesthouses needing to centralize operations',
          'Businesses wanting to scale without increasing headcount',
          'Teams depending on spreadsheets and manual processes',
        ],
        deliverables: ['System or automation configured', 'Technical documentation', 'Team training', 'Post-deployment support'],
      },
    },
    subServices: {
      naming: {
        name: 'Naming',
        tagline: 'The name that defines everything.',
        description: 'The name is the first asset of your brand, and the most permanent. We create unique, memorable, and strategic names that communicate your business DNA and work both locally and internationally.',
        forWhom: ['New businesses looking for the right name', 'Brands going through a rebrand', 'Entrepreneurs who want a name with strategy behind it'],
        features: ['In-depth strategic briefing', 'Market research and competitive analysis', 'Generation of 10+ name options', 'Domain and social media availability check', 'Trademark registration guidance', 'Presentation with creative rationale for each option'],
        result: 'Unique, available name with strategy behind it',
      },
      'identidade-visual': {
        name: 'Visual Identity',
        tagline: 'Logo, colors and elements that create recognition.',
        description: 'Your brand visually represented: a cohesive system of logo, colors, typography, and graphic elements that create immediate recognition and generate desire even before first contact.',
        forWhom: ['Brands without a defined visual identity', 'Businesses wanting to professionalize their image', 'Hotels, guesthouses, and spaces wanting to convey the right level'],
        features: ['Primary logo + variations (horizontal, icon, monochrome)', 'Primary and secondary color palette', 'Typography selection and application', 'Exclusive icons and graphic elements', 'Application mockups (stationery, digital, signage)', 'Visual identity manual in PDF'],
        result: 'Complete visual identity ready for application',
      },
      'branding-completo': {
        name: 'Complete Branding',
        tagline: 'From positioning to visual identity.',
        description: 'From zero to complete. We build your brand from the inside out: from purpose and positioning to the applied visual identity. For brands that want to be the industry reference, not just another option.',
        forWhom: ['New businesses wanting to start with everything defined', 'Brands in a strategic reinvention process', 'Premium hotels, experiences, and real estate'],
        features: ['Purpose, mission, vision, and values definition', 'Brand architecture and competitive positioning', 'Tone of voice and brand personality', 'Complete visual identity (logo, colors, typography, elements)', 'Market study and competitive analysis', 'Brand application guide (brand book)', 'Final strategic presentation'],
        result: 'Complete brand from scratch: strategy + visual identity',
      },
      'landing-page': {
        name: 'Landing Page',
        tagline: 'Focused on converting visitors into clients.',
        description: 'A page built with a single goal: convert. Whether to generate leads, sell an experience, or capture direct bookings. Design and copy work together to guide the visitor to action.',
        forWhom: ['Product or service launches', 'Paid traffic campaigns', 'Businesses needing a fast and efficient page'],
        features: ['Premium conversion-focused design', 'Strategic action-oriented copy', 'WhatsApp or form integration', 'Full mobile and desktop optimization', 'Built in code: no platform monthly fee', 'Basic SEO configured'],
        result: 'Page that converts visitors into leads and bookings',
      },
      'website-institucional': {
        name: 'Institutional Website',
        tagline: 'Complete digital presence for your brand.',
        description: 'Your website is the only digital asset you truly control. We build sites that represent the experience the client will have: fast, beautiful, and optimized to generate direct bookings without depending on OTAs.',
        forWhom: ['Hotels, guesthouses, and resorts', 'Experiences and tourist destinations', 'Real estate companies and developers'],
        features: ['Custom design with visual identity', 'Institutional pages (home, about, services, contact)', 'Optimized for mobile and fast loading', 'On-page SEO configuration', 'WhatsApp and contact form integration', 'Domain and hosting configured'],
        result: 'Site that works for you 24/7, generating direct bookings',
      },
      'producao-conteudo': {
        name: 'Content Production',
        tagline: 'Reels, graphics and stories with strategy and visual identity.',
        description: 'Complete content production for social media: reels, design, stories, and editorial calendar. Everything aligned with your brand\'s visual identity and objectives.',
        forWhom: ['Brands wanting active presence on social media', 'Businesses needing consistent content', 'Hotels and guesthouses wanting to attract direct guests'],
        features: ['Monthly editorial calendar', 'Reels and vertical videos', 'Feed and story graphics', 'Strategic copy captions', 'Monthly performance report', 'Exclusive follow-up group'],
        result: 'Professional, consistent content every month',
      },
      captacoes: {
        name: 'Photo & Video',
        tagline: 'Professional photography and video for social media and brand identity.',
        description: 'Professional photography and video production to feed your social media, website, and brand materials. Images and videos that communicate your business\'s standard and personality.',
        forWhom: ['Hotels, guesthouses, and beach clubs', 'Restaurants and gastronomic experiences', 'Brands needing a professional image and video library'],
        features: ['On-site photo shoot', 'Video capture for reels and content', 'Professional photo and video editing', 'High-resolution delivery in social media formats', 'Creative direction aligned with brand identity'],
        result: 'Professional photo and video library ready to use',
      },
      setup: {
        name: 'Setup',
        tagline: 'Complete social media setup from zero to professional.',
        description: 'We structure your social media from scratch: bio, highlights, initial grid, links, and everything needed for your digital presence to start on the right foot.',
        forWhom: ['New businesses launching their digital presence', 'Brands needing a complete makeover', 'Ventures that have never invested in digital'],
        features: ['Profile creation and optimization', 'Highlights with visual identity', 'Strategic bio + links', 'Initial grid with launch content', 'Best practices guidance'],
        result: 'Social media ready to grow',
      },
      'meta-ads': {
        name: 'Meta Ads',
        tagline: 'Campaigns on Instagram and Facebook.',
        description: 'Ads on Instagram and Facebook with precise targeting for the right audience at the right time. Every dollar invested is monitored and optimized to maximize leads and bookings.',
        forWhom: ['Brands wanting to increase visibility', 'Hotels and guesthouses seeking direct bookings', 'Experiences wanting to reach new audiences'],
        features: ['Campaign creation on Instagram and Facebook', 'Audience targeting by interest and behavior', 'Daily campaign analysis and optimization', 'Creative A/B testing', 'Monthly metrics and performance report', 'Exclusive WhatsApp group'],
        result: 'More leads and bookings with controlled cost per acquisition',
      },
      'google-ads': {
        name: 'Google Ads',
        tagline: 'Appear at the right moment on Google.',
        description: 'When someone searches for what you offer, your brand appears first. Google campaigns focused on purchase intent. The most qualified traffic there is.',
        forWhom: ['Hotels wanting to reduce OTA dependency', 'Experiences and tourist destinations', 'Real estate with properties to sell or rent'],
        features: ['Google Ads campaign creation and management', 'Strategic keyword research and selection', 'Targeting for specific audiences', 'Daily campaign optimization', 'Monthly performance report', 'Exclusive WhatsApp group'],
        result: 'Qualified traffic with high purchase intent',
      },
      'sistemas-internos': {
        name: 'Internal Systems',
        tagline: 'Custom systems for your operation.',
        description: 'We develop custom internal systems: CRMs, dashboards, project management, client portals, and any solution that organizes and scales your operation.',
        forWhom: ['Agencies and service providers', 'Hotels and tour operators', 'Companies with complex service workflows'],
        features: ['Requirements gathering', 'System design and development', 'Integration with existing tools', 'Admin panel', 'Documentation and training'],
        result: 'Organized, centralized, and scalable operation',
      },
      automacoes: {
        name: 'Automations',
        tagline: 'Process more by doing less with automatic flows.',
        description: 'We create automations that connect your tools and eliminate manual work: from automatic follow-ups to integrations between CRM, email, WhatsApp, and spreadsheets.',
        forWhom: ['Marketing and sales teams', 'Businesses with high service volume', 'Companies wanting to reduce operational errors'],
        features: ['Mapping of automatable processes', 'Flow creation in Make, n8n, or Zapier', 'Platform integrations (CRM, email, WhatsApp)', 'Testing and validation', 'Flow documentation'],
        result: 'Automatic processes that work while you sleep',
      },
      crm: {
        name: 'CRM',
        tagline: 'Centralized client and sales pipeline management.',
        description: 'We implement and configure the ideal CRM for your business, organizing leads, service history, follow-ups, and sales pipeline in one place.',
        forWhom: ['Sales teams depending on spreadsheets', 'Agencies and service providers with multiple clients', 'Hotels and operators with high lead volume'],
        features: ['Selection and configuration of the ideal CRM', 'Migration of existing data', 'Pipeline and sales stage creation', 'Follow-up automations', 'Team training', 'WhatsApp, email, and form integrations'],
        result: 'Organized sales pipeline and follow-up never forgotten',
      },
    },
  },

  es: {
    services: {
      branding: {
        title: 'Branding',
        tagline: 'Identidad que genera deseo antes del primer contacto.',
        description: 'Construimos marcas que comunican valor, generan conexión emocional y posicionan tu negocio exactamente donde necesita estar.',
        what: 'Branding es el conjunto de elementos visuales, verbales y estratégicos que definen cómo se percibe tu marca. Es la diferencia entre ser recordado y ser olvidado, entre atraer al cliente correcto y competir por precio con cualquier competidor.',
        how: [
          { title: 'Inmersión & Diagnóstico', desc: 'Nos sumergimos en tu negocio, mercado y competencia para entender qué hace única a tu marca.' },
          { title: 'Estrategia de Marca', desc: 'Definimos posicionamiento, personalidad, tono de voz y los pilares que guiarán todas las decisiones creativas.' },
          { title: 'Creación Visual', desc: 'Desarrollamos logotipo, paleta de colores, tipografía y todos los elementos que componen la identidad visual.' },
          { title: 'Manual & Entrega', desc: 'Entregamos un manual de marca completo para garantizar consistencia en todas las aplicaciones.' },
        ],
        whoFor: [
          'Posadas y hoteles que quieren posicionarse como referencia premium',
          'Beach clubs en fase de lanzamiento o que necesitan un rebrand',
          'Emprendimientos de real estate que necesitan transmitir exclusividad',
          'Operadoras de experiencias que quieren comunicar diferenciación',
        ],
        deliverables: ['Logotipo principal y variaciones', 'Paleta de colores oficial', 'Tipografía de la marca', 'Elementos gráficos', 'Mockups de aplicación', 'Manual de identidad visual (PDF)'],
      },
      'web-design': {
        title: 'Web Design',
        tagline: 'Sitios que convierten visitantes en clientes antes de la llamada.',
        description: 'Creamos sitios web y landing pages que comunican el valor de tu marca, generan confianza inmediata y convierten visitas en reservas y leads calificados.',
        what: 'Un buen sitio web es el mejor vendedor de tu marca. Trabaja 24 horas al día, comunica credibilidad antes de cualquier conversación y guía al visitante exactamente hacia donde quieres que vaya. Los sitios malos pierden clientes en silencio.',
        how: [
          { title: 'Briefing & Estrategia', desc: 'Entendemos tu negocio, público y objetivos para definir la arquitectura y el flujo ideal del sitio.' },
          { title: 'UX & Prototipado', desc: 'Creamos wireframes y prototipos navegables antes de cualquier línea de código.' },
          { title: 'Diseño & Desarrollo', desc: 'Desarrollamos el diseño final y construimos el sitio en código, rápido, responsivo y optimizado.' },
          { title: 'Lanzamiento & Soporte', desc: 'Configuramos dominio, hosting, SEO básico y entregamos el sitio listo para recibir clientes.' },
        ],
        whoFor: [
          'Hoteles y posadas que dependen de reservas directas (sin OTA)',
          'Beach clubs con presencia digital al nivel de la experiencia física',
          'Inmobiliarias y promotoras que venden propiedades de alto estándar',
          'Marcas que nunca tuvieron un sitio web profesional',
        ],
        deliverables: ['Sitio institucional completo', 'Diseño responsivo (móvil + escritorio)', 'Configuración de SEO', 'Integración con WhatsApp y formularios', 'Dominio y hosting configurados', 'Panel de edición simple'],
      },
      'social-media': {
        title: 'Social Media',
        tagline: 'Contenido que transforma seguidores en clientes que pagan.',
        description: 'Gestionamos las redes sociales de tu marca con estrategia, consistencia y creatividad, construyendo audiencia calificada y generando resultados medibles.',
        what: 'Social media para hotelería, experiencias y real estate no es publicar fotos bonitas. Es contar historias que generan deseo, construir comunidad que confía en la marca y crear contenido que dirige al cliente hacia la compra.',
        how: [
          { title: 'Diagnóstico & Planificación', desc: 'Auditamos las redes existentes, analizamos el mercado y creamos un plan editorial estratégico.' },
          { title: 'Producción de Contenido', desc: 'Creamos reels, artes, stories y leyendas que comunican el valor de la marca con consistencia.' },
          { title: 'Publicación & Gestión', desc: 'Publicamos en el horario ideal, respondemos comentarios y gestionamos la comunidad.' },
          { title: 'Análisis & Optimización', desc: 'Seguimos métricas y ajustamos la estrategia mensualmente con base en datos reales.' },
        ],
        whoFor: [
          'Posadas y resorts que quieren atraer huéspedes directos por las redes',
          'Beach clubs con eventos y experiencias para promocionar',
          'Escuelas de deporte que venden un estilo de vida',
          'Emprendimientos de real estate en fase de lanzamiento',
        ],
        deliverables: ['Calendario editorial mensual', 'Reels y videos verticales', 'Artes para feed y stories', 'Gestión de la comunidad', 'Informe mensual de performance', 'Grupo exclusivo de seguimiento'],
      },
      'performance-ads': {
        title: 'Performance Ads',
        tagline: 'Cada peso invertido rastreado hasta la reserva.',
        description: 'Gestionamos campañas en Google y Meta con foco absoluto en ROI. Sabes exactamente cuánto invertiste, cuánto generaste y cómo estamos optimizando para ir más lejos.',
        what: 'Performance Ads es marketing con total accountability. No trabajamos con "parece que va bien". Trabajamos con datos, métricas y metas claras. Cada campaña se gestiona para generar el máximo retorno con el mínimo desperdicio.',
        how: [
          { title: 'Setup & Seguimiento', desc: 'Configuramos píxeles, tags y todos los eventos necesarios para rastrear conversiones con precisión.' },
          { title: 'Estrategia & Segmentación', desc: 'Definimos audiencias, objetivos y estructura de campañas para cada etapa del embudo.' },
          { title: 'Creativos & Lanzamiento', desc: 'Desarrollamos los creativos y lanzamos las campañas con estructura de pruebas A/B.' },
          { title: 'Optimización Continua', desc: 'Monitoreamos diariamente y ajustamos pujas, audiencias y creativos para maximizar el ROI.' },
        ],
        whoFor: [
          'Hoteles y posadas que quieren reducir dependencia de las OTAs',
          'Operadoras que necesitan generar leads calificados en volumen',
          'Inmobiliarias con proyectos para vender',
          'Negocios que ya invierten en tráfico pero no ven resultados',
        ],
        deliverables: ['Configuración completa de campañas', 'Creativos (imágenes y videos)', 'Optimización diaria', 'Informe mensual unificado', 'Análisis de competencia', 'Dashboard de seguimiento'],
      },
      sistemas: {
        title: 'Sistemas',
        tagline: 'Tecnología que automatiza y escala tu negocio.',
        description: 'Desarrollamos sistemas internos y automatizaciones que eliminan procesos manuales, reducen errores y liberan a tu equipo para lo que realmente importa.',
        what: 'Los sistemas y automatizaciones bien implementados son el diferencial que permite escalar sin aumentar proporcionalmente el equipo. Desde CRMs personalizados hasta integraciones automáticas entre plataformas. Construimos la infraestructura tecnológica de tu negocio.',
        how: [
          { title: 'Diagnóstico & Mapeo', desc: 'Entendemos los procesos actuales, identificamos cuellos de botella y mapeamos las oportunidades de automatización.' },
          { title: 'Arquitectura de la Solución', desc: 'Diseñamos la solución técnica ideal para tu contexto, sin over-engineering.' },
          { title: 'Desarrollo', desc: 'Construimos e integramos los sistemas con las herramientas que ya usas.' },
          { title: 'Implementación & Soporte', desc: 'Entrenamos al equipo, documentamos y acompañamos la operación tras el lanzamiento.' },
        ],
        whoFor: [
          'Agencias y empresas con procesos repetitivos que consumen tiempo',
          'Hoteles y posadas que necesitan centralizar operaciones',
          'Negocios que quieren escalar sin aumentar el headcount',
          'Equipos que dependen de planillas y procesos manuales',
        ],
        deliverables: ['Sistema o automatización configurada', 'Documentación técnica', 'Entrenamiento del equipo', 'Soporte post-implementación'],
      },
    },
    subServices: {
      naming: {
        name: 'Naming',
        tagline: 'El nombre que lo define todo.',
        description: 'El nombre es el primer activo de tu marca, y el más permanente. Creamos nombres únicos, memorables y estratégicos que comunican el ADN de tu negocio y funcionan tanto localmente como internacionalmente.',
        forWhom: ['Nuevos negocios en busca del nombre correcto', 'Marcas en proceso de rebranding', 'Emprendedores que quieren un nombre con estrategia detrás'],
        features: ['Briefing estratégico en profundidad', 'Investigación de mercado y análisis de la competencia', 'Generación de 10+ opciones de nombres', 'Verificación de disponibilidad de dominio y redes sociales', 'Orientación sobre registro de marca', 'Presentación con justificación creativa para cada opción'],
        result: 'Nombre único y disponible, con estrategia detrás',
      },
      'identidade-visual': {
        name: 'Identidad Visual',
        tagline: 'Logo, colores y elementos que generan reconocimiento.',
        description: 'Tu marca representada visualmente: un sistema cohesivo de logo, colores, tipografía y elementos gráficos que crean reconocimiento inmediato y generan deseo incluso antes del primer contacto.',
        forWhom: ['Marcas sin identidad visual definida', 'Negocios que quieren profesionalizar su imagen', 'Hoteles, posadas y espacios que quieren transmitir el nivel correcto'],
        features: ['Logotipo principal + variaciones (horizontal, ícono, monocromático)', 'Paleta de colores primaria y secundaria', 'Selección y aplicación de tipografía', 'Íconos y elementos gráficos exclusivos', 'Mockups de aplicación (papelería, digital, fachada)', 'Manual de identidad visual en PDF'],
        result: 'Identidad visual completa lista para aplicar',
      },
      'branding-completo': {
        name: 'Branding Completo',
        tagline: 'Del posicionamiento a la identidad visual.',
        description: 'De cero a completo. Construimos tu marca de adentro hacia afuera: desde el propósito y el posicionamiento hasta la identidad visual aplicada. Para marcas que quieren ser referencia en el sector, no solo otra opción.',
        forWhom: ['Nuevos negocios que quieren empezar con todo definido', 'Marcas en proceso de reinvención estratégica', 'Hoteles, experiencias y real estate de alto estándar'],
        features: ['Definición de propósito, misión, visión y valores', 'Arquitectura de marca y posicionamiento competitivo', 'Tono de voz y personalidad de la marca', 'Identidad visual completa (logo, colores, tipografía, elementos)', 'Estudio de mercado y análisis de competencia', 'Guía de aplicación de la marca (brand book)', 'Presentación estratégica final'],
        result: 'Marca completa desde cero: estrategia + identidad visual',
      },
      'landing-page': {
        name: 'Landing Page',
        tagline: 'Enfocada en convertir visitantes en clientes.',
        description: 'Una página creada con un único objetivo: convertir. Ya sea para generar leads, vender una experiencia o capturar reservas directas. El diseño y el copy trabajan juntos para guiar al visitante hacia la acción.',
        forWhom: ['Lanzamientos de productos o servicios', 'Campañas de tráfico pago', 'Negocios que necesitan una página rápida y eficiente'],
        features: ['Diseño premium enfocado en conversión', 'Copy estratégico orientado a la acción', 'Integración con WhatsApp o formulario', 'Optimización completa para móvil y escritorio', 'Desarrollada en código: sin mensualidad de plataforma', 'SEO básico configurado'],
        result: 'Página que convierte visitantes en leads y reservas',
      },
      'website-institucional': {
        name: 'Sitio Institucional',
        tagline: 'Presencia digital completa para tu marca.',
        description: 'Tu sitio web es el único activo digital que realmente controlas. Construimos sitios que representan la experiencia que tendrá el cliente: rápidos, atractivos y optimizados para generar reservas directas sin depender de OTAs.',
        forWhom: ['Hoteles, posadas y resorts', 'Experiencias y destinos turísticos', 'Empresas de real estate y constructoras'],
        features: ['Diseño personalizado con identidad visual', 'Páginas institucionales (inicio, nosotros, servicios, contacto)', 'Optimizado para móvil y carga rápida', 'Configuración de SEO on-page', 'Integración con WhatsApp y formulario de contacto', 'Dominio y hosting configurados'],
        result: 'Sitio que trabaja por ti 24/7, generando reservas directas',
      },
      'producao-conteudo': {
        name: 'Producción de Contenido',
        tagline: 'Reels, artes y stories con estrategia e identidad visual.',
        description: 'Producción completa de contenido para redes sociales: reels, diseño, stories y calendario editorial. Todo alineado con la identidad visual y los objetivos de tu marca.',
        forWhom: ['Marcas que quieren presencia activa en redes', 'Negocios que necesitan contenido consistente', 'Hoteles y posadas que quieren atraer huéspedes directos'],
        features: ['Calendario editorial mensual', 'Reels y videos verticales', 'Artes para feed y stories', 'Leyenda con copy estratégico', 'Informe mensual de performance', 'Grupo exclusivo de seguimiento'],
        result: 'Contenido profesional y consistente cada mes',
      },
      captacoes: {
        name: 'Fotografía & Video',
        tagline: 'Fotografía y video profesional para redes sociales e identidad de marca.',
        description: 'Producción profesional de fotografía y video para alimentar tus redes sociales, sitio web y materiales de marca. Imágenes y videos que comunican el estándar y la personalidad de tu negocio.',
        forWhom: ['Hoteles, posadas y beach clubs', 'Restaurantes y experiencias gastronómicas', 'Marcas que necesitan un banco de imágenes y videos profesional'],
        features: ['Sesión fotográfica en el lugar', 'Captura de videos para reels y contenido', 'Edición profesional de fotos y videos', 'Entrega en alta resolución y formatos para redes', 'Dirección creativa alineada con la identidad de la marca'],
        result: 'Banco de fotos y videos profesionales listos para usar',
      },
      setup: {
        name: 'Setup',
        tagline: 'Configuración completa de redes de cero a profesional.',
        description: 'Estructuramos tus redes sociales desde cero: bio, destacados, grid inicial, links y todo lo necesario para que tu presencia digital empiece con el pie derecho.',
        forWhom: ['Nuevos negocios lanzando su presencia digital', 'Marcas que necesitan una renovación completa', 'Emprendimientos que nunca invirtieron en digital'],
        features: ['Creación y optimización de perfiles', 'Destacados con identidad visual', 'Bio estratégica + links', 'Grid inicial con contenidos de lanzamiento', 'Orientación sobre buenas prácticas'],
        result: 'Redes sociales listas para crecer',
      },
      'meta-ads': {
        name: 'Meta Ads',
        tagline: 'Campañas en Instagram y Facebook.',
        description: 'Anuncios en Instagram y Facebook con segmentación precisa para la audiencia correcta en el momento correcto. Cada peso invertido se monitorea y optimiza para maximizar leads y reservas.',
        forWhom: ['Marcas que quieren aumentar su visibilidad', 'Hoteles y posadas que buscan reservas directas', 'Experiencias que quieren alcanzar nuevas audiencias'],
        features: ['Creación de campañas en Instagram y Facebook', 'Segmentación de audiencia por interés y comportamiento', 'Análisis y optimización diaria de campañas', 'Pruebas A/B de creativos', 'Informe mensual de métricas y performance', 'Grupo exclusivo de WhatsApp'],
        result: 'Más leads y reservas con costo por adquisición controlado',
      },
      'google-ads': {
        name: 'Google Ads',
        tagline: 'Aparece en el momento justo en Google.',
        description: 'Cuando alguien busca lo que ofreces, tu marca aparece primero. Campañas en Google enfocadas en intención de compra. El tráfico más calificado que existe.',
        forWhom: ['Hoteles que quieren reducir dependencia de las OTAs', 'Experiencias y destinos turísticos', 'Real estate con propiedades para vender o alquilar'],
        features: ['Creación y gestión de campañas en Google Ads', 'Investigación y selección de palabras clave estratégicas', 'Segmentación para audiencias específicas', 'Optimización diaria de campañas', 'Informe mensual de performance', 'Grupo exclusivo de WhatsApp'],
        result: 'Tráfico calificado con alta intención de compra',
      },
      'sistemas-internos': {
        name: 'Sistemas Internos',
        tagline: 'Sistemas personalizados para tu operación.',
        description: 'Desarrollamos sistemas internos a medida: CRMs, dashboards, gestión de proyectos, portales de cliente y cualquier solución que organice y escale tu operación.',
        forWhom: ['Agencias y prestadores de servicios', 'Hoteles y operadoras turísticas', 'Empresas con flujos complejos de atención'],
        features: ['Levantamiento de requisitos', 'Diseño y desarrollo del sistema', 'Integración con herramientas existentes', 'Panel administrativo', 'Documentación y entrenamiento'],
        result: 'Operación organizada, centralizada y escalable',
      },
      automacoes: {
        name: 'Automatizaciones',
        tagline: 'Procesa más haciendo menos con flujos automáticos.',
        description: 'Creamos automatizaciones que conectan tus herramientas y eliminan el trabajo manual: desde follow-ups automáticos hasta integraciones entre CRM, email, WhatsApp y planillas.',
        forWhom: ['Equipos de marketing y ventas', 'Negocios con alto volumen de atención', 'Empresas que quieren reducir errores operacionales'],
        features: ['Mapeo de procesos automatizables', 'Creación de flujos en Make, n8n o Zapier', 'Integración entre plataformas (CRM, email, WhatsApp)', 'Pruebas y validación', 'Documentación de los flujos'],
        result: 'Procesos automáticos que trabajan mientras duermes',
      },
      crm: {
        name: 'CRM',
        tagline: 'Gestión de clientes y pipeline de ventas centralizado.',
        description: 'Implementamos y configuramos el CRM ideal para tu negocio, organizando leads, historial de atención, follow-ups y pipeline de ventas en un único lugar.',
        forWhom: ['Equipos de ventas que dependen de planillas', 'Agencias y prestadores de servicios con múltiples clientes', 'Hoteles y operadoras con alto volumen de leads'],
        features: ['Selección y configuración del CRM ideal', 'Migración de datos existentes', 'Creación de pipelines y etapas de venta', 'Automatizaciones de follow-up', 'Entrenamiento del equipo', 'Integraciones con WhatsApp, email y formularios'],
        result: 'Pipeline de ventas organizado y follow-up nunca olvidado',
      },
    },
  },
}

export function getLocalizedService(locale: string, slug: string): ServiceContent | undefined {
  const loc = content[locale] ?? content.pt
  return loc.services[slug]
}

export function getLocalizedSubService(locale: string, slug: string): SubServiceContent | undefined {
  const loc = content[locale] ?? content.pt
  return loc.subServices[slug]
}
