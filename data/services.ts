export type ServicePillar = 'branding' | 'web' | 'social' | 'performance' | 'automatizacoes' | 'motion'

export interface ServiceStep { number: string; title: string; desc: string }

/**
 * Agrupamento visual do hub, por problema que o produto resolve e não por
 * quem executa. Só o pontual agrupa: o recorrente tem dois itens e vive em
 * bloco próprio.
 */
export type Grupo = 'marca' | 'presenca' | 'producao' | 'operacao'

export interface SubService {
  slug: string
  pillar: ServicePillar
  name: string
  /** `once` é pontual, `monthly` é recorrente. O eixo do catálogo sai daqui. */
  period: 'once' | 'monthly'
  /** Ausente no recorrente, que não agrupa. */
  grupo?: Grupo
  /** Prazo em dias úteis, herdado do antigo `on-demand.ts`. */
  prazoDias?: number | [number, number]
  /** Exige deslocamento até a propriedade. */
  onSite?: boolean
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
  portfolioCategory: 'branding' | 'web' | 'social' | 'performance' | 'automatizacoes' | 'motion'
}

export const servicesData: ServiceData[] = [
  {
    slug: 'branding',
    pillar: 'branding',
    title: 'Branding',
    tagline: 'Identidade que gera desejo antes do primeiro contato.',
    description: 'Construímos marcas que comunicam valor, geram conexão emocional e posicionam o seu negócio exatamente onde ele precisa estar.',
    gradient: 'from-[#1B3025] via-[#2D5238] to-[#345E3F]',
    what: 'Branding é o conjunto de elementos visuais, verbais e estratégicos que definem como a sua marca é percebida. É a diferença entre ser lembrado e ser esquecido, entre atrair o cliente certo e disputar preço com qualquer concorrente.',
    how: [
      { number: '01', title: 'Imersão & Diagnóstico', desc: 'Mergulhamos fundo no seu negócio, mercado e concorrência para entender o que torna a sua marca única.' },
      { number: '02', title: 'Estratégia de Marca', desc: 'Definimos posicionamento, personalidade, tom de voz e os pilares que vão guiar todas as decisões criativas.' },
      { number: '03', title: 'Criação Visual', desc: 'Desenvolvemos logotipo, paleta de cores, tipografia e todos os elementos que compõem a identidade visual.' },
      { number: '04', title: 'Manual & Entrega', desc: 'Entregamos um manual de marca completo para garantir consistência em todas as aplicações.' },
    ],
    whoFor: [
      'Pousadas e hotéis que querem se posicionar como referência premium',
      'Beach clubs em fase de lançamento ou que precisam de rebrand',
      'Restaurantes de frente para o mar que cobram mais que o vizinho',
      'Operadoras de experiências que querem comunicar diferenciação',
    ],
    deliverables: ['Logotipo principal e variações', 'Paleta de cores oficial', 'Tipografia da marca', 'Elementos gráficos', 'Mockups de aplicação', 'Manual de identidade visual (PDF)'],
    portfolioCategory: 'branding',
    subServices: [
      {
        slug: 'identidade-visual',
        pillar: 'branding',
        name: 'Identidade Visual',
        period: 'once',
        grupo: 'marca',
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
        period: 'once',
        grupo: 'marca',
        tagline: 'Do posicionamento até a identidade visual.',
        recommended: true,
        description: 'Do zero ao completo. Construímos sua marca de dentro para fora: do propósito e posicionamento até a identidade visual aplicada. Para marcas que querem ser referência no setor. Não apenas mais uma opção no mercado.',
        forWhom: ['Novos negócios que querem começar com tudo definido', 'Marcas em processo de reinvenção estratégica', 'Hotéis, pousadas e experiências de alto padrão'],
        features: [
          'Definição de propósito, missão, visão e valores',
          'Arquitetura de marca e posicionamento competitivo',
          'Tom de voz e personalidade da marca',
          'Identidade visual completa (logo, cores, tipografia, elementos)',
          'Estudo de mercado e análise de concorrência',
          'Guia de aplicação da marca (brand book)',
          'Apresentação estratégica final',
        ],
        result: 'Marca completa do zero: estratégia + identidade visual',
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
    what: 'Um bom site é o melhor vendedor da sua marca. Trabalha 24h por dia, comunica credibilidade antes de qualquer conversa e guia o visitante exatamente para onde você quer que ele vá. Sites ruins perdem clientes silenciosamente.',
    how: [
      { number: '01', title: 'Briefing & Estratégia', desc: 'Entendemos o seu negócio, público e objetivos para definir a arquitetura e o fluxo ideal do site.' },
      { number: '02', title: 'UX & Prototipagem', desc: 'Criamos wireframes e protótipos navegáveis antes de qualquer linha de código.' },
      { number: '03', title: 'Design & Desenvolvimento', desc: 'Desenvolvemos o design final e construímos o site em código, rápido, responsivo e otimizado.' },
      { number: '04', title: 'Lançamento & Suporte', desc: 'Configuramos domínio, hospedagem, SEO básico e entregamos o site pronto para receber clientes.' },
    ],
    whoFor: [
      'Hotéis e pousadas que dependem de reservas diretas (sem OTA)',
      'Beach clubs com presença digital no nível da experiência física',
      'Operadoras de experiências que vendem passeio e aula',
      'Marcas que nunca tiveram um site profissional',
    ],
    deliverables: ['Site institucional completo', 'Design responsivo (mobile + desktop)', 'Configuração de SEO', 'Integração com WhatsApp e formulários', 'Domínio e hospedagem configurados', 'Painel de edição simples'],
    portfolioCategory: 'web',
    subServices: [
      {
        slug: 'landing-page',
        pillar: 'web',
        name: 'Landing Page',
        period: 'once',
        grupo: 'presenca',
        prazoDias: [10, 15],
        tagline: 'Focada em converter visitantes em clientes.',
        description: 'Uma página criada com um único objetivo: converter. Seja para gerar leads, vender uma experiência ou capturar reservas diretas. O design e o copy trabalham juntos para guiar o visitante até a ação.',
        forWhom: ['Lançamentos de produtos ou serviços', 'Campanhas de tráfego pago', 'Negócios que precisam de uma página rápida e eficiente'],
        features: [
          'Design premium focado em conversão',
          'Copy estratégico orientado para ação',
          'Integração com WhatsApp ou formulário',
          'Otimização completa para mobile e desktop',
          'Desenvolvida em código, sem mensalidade de plataforma',
          'SEO básico configurado',
        ],
        result: 'Página que converte visitantes em leads e reservas',
      },
      {
        slug: 'website-institucional',
        pillar: 'web',
        name: 'Website Institucional',
        period: 'once',
        grupo: 'presenca',
        tagline: 'Presença digital completa da sua marca.',
        description: 'Seu site é o único ativo digital que você realmente controla. Construímos sites que representam a experiência que o cliente vai ter: rápidos, bonitos e otimizados para gerar reservas diretas sem depender de OTAs.',
        forWhom: ['Hotéis, pousadas e resorts', 'Experiências e destinos turísticos', 'Beach clubs, restaurantes e operadoras de experiência'],
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
    description: 'Gerenciamos as redes sociais da sua marca com estratégia, consistência e criatividade, construindo audiência qualificada e gerando resultados mensuráveis.',
    gradient: 'from-[#162B20] via-[#243D2D] to-[#345E3F]',
    what: 'Social media para hotelaria e experiências não é sobre postar fotos bonitas. É sobre contar histórias que geram desejo, construir comunidade que confia na marca e criar conteúdo que direciona o cliente para a compra.',
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
      'Beach clubs com evento e programação para divulgar',
    ],
    deliverables: ['Calendário editorial mensal', 'Reels e vídeos verticais', 'Artes para feed e stories', 'Gestão da comunidade', 'Relatório mensal de performance', 'Grupo exclusivo de acompanhamento'],
    portfolioCategory: 'social',
    subServices: [
      {
        slug: 'producao-conteudo',
        pillar: 'social',
        name: 'Produção de Conteúdo',
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
        slug: 'fotografia',
        pillar: 'social',
        name: 'Fotografia',
        period: 'once',
        grupo: 'producao',
        prazoDias: 7,
        onSite: true,
        tagline: 'Imagem parada que mostra o padrão da casa.',
        description: 'Ensaio no local para alimentar site, redes e material de venda. A foto é o que o hóspede vê antes de decidir, e ela precisa dizer o nível da casa sem que ninguém explique.',
        forWhom: ['Pousadas e hotéis que ainda usam foto de celular', 'Beach clubs e restaurantes de frente para o mar', 'Quem vai lançar site ou perfil e não tem banco de imagem'],
        features: [
          'Ensaio no local, com direção de cena',
          'Quartos, áreas comuns, fachada e gastronomia',
          'Tratamento de cor e luz em todas as selecionadas',
          'Entrega em alta resolução e em corte para redes',
          'Direção alinhada com a identidade da marca',
        ],
        result: 'Banco de fotos próprio, pronto para site, redes e OTA',
      },
      {
        slug: 'captacao-video',
        pillar: 'social',
        name: 'Captação de vídeo',
        period: 'once',
        grupo: 'producao',
        prazoDias: 7,
        onSite: true,
        tagline: 'Movimento, som e drone no destino.',
        description: 'Diária de captação na propriedade para gerar material de vídeo em quantidade. Sai daqui o bruto que alimenta reels, anúncio e site pelos meses seguintes.',
        forWhom: ['Quem precisa de volume de vídeo para manter constância', 'Operações com vista, piscina ou orla que a foto não entrega', 'Escolas e experiências onde a ação é o produto'],
        features: [
          'Diária de captação com direção no local',
          'Tomada aérea com drone quando o lugar pede',
          'Áudio ambiente e depoimento, quando houver',
          'Bruto organizado e entregue por pasta',
          'Roteiro de cenas definido antes da diária',
        ],
        result: 'Material bruto suficiente para meses de conteúdo',
      },
      {
        // Veio da disciplina Motion, que deixou de existir. Continua como
        // produto pontual e ao mesmo tempo entra no pacote de Produção de
        // conteúdo, que é recorrente.
        slug: 'pecas-animadas',
        pillar: 'social',
        name: 'Peças animadas',
        period: 'once',
        grupo: 'producao',
        tagline: 'Vinheta, selo e assinatura em movimento.',
        description: 'O kit de movimento da marca: abertura, selo, assinatura e lower third para reels. É o que dá acabamento ao conteúdo que você já produz, sem depender de quem edita.',
        forWhom: ['Marcas com identidade pronta e conteúdo sem acabamento', 'Quem publica reels toda semana', 'Operações que trocam de editor e perdem o padrão'],
        features: [
          'Vinheta de abertura',
          'Selo e assinatura em movimento',
          'Lower third para reels',
          'Entrega principal em ProRes 4444',
          'Entrega secundária em WebM VP9 com alpha',
          // O CapCut não lê alpha de forma confiável. Sem esta versão, o editor
          // do cliente recebe um arquivo que simplesmente não abre direito.
          'Versão com fundo chapado para quem edita no CapCut',
        ],
        result: 'Conteúdo com acabamento de marca, independente de quem edita',
      },
      {
        slug: 'edicao-video',
        pillar: 'social',
        name: 'Edição de vídeo',
        period: 'once',
        grupo: 'producao',
        prazoDias: 3,
        tagline: 'O bruto vira peça pronta para publicar.',
        description: 'Montagem, corte, cor, legenda e trilha a partir de material que já existe. Serve tanto para o que a gente captou quanto para o que você já tem parado no celular.',
        forWhom: ['Quem tem material captado e nunca publicou', 'Operações que gravam sozinhas e precisam de acabamento', 'Quem vai anunciar e precisa de corte por formato'],
        features: [
          'Montagem e corte a partir do seu material',
          'Correção de cor e tratamento de áudio',
          'Legenda queimada, para quem assiste sem som',
          'Trilha licenciada',
          'Entrega em vertical, quadrado e horizontal',
        ],
        result: 'Peças finalizadas e prontas para publicar',
      },
      {
        // O slug segue `setup`. A rota tem histórico e o nome exibido é o que
        // a pessoa lê, então renomear custaria 301 e quatro CTAs de artigo por
        // ganho nenhum. Mesma decisão que valeu para a /consultoria.
        slug: 'setup',
        pillar: 'social',
        name: 'Construção de perfil',
        period: 'once',
        grupo: 'presenca',
        tagline: 'O perfil sai do zero já parecendo profissional.',
        description: 'Montagem completa do perfil antes de começar a publicar: bio, destaques, links e os doze primeiros conteúdos. Quem chega no perfil vazio vai embora, e a primeira impressão só acontece uma vez.',
        forWhom: ['Negócios abrindo agora, antes da primeira temporada', 'Perfis parados que precisam recomeçar', 'Quem nunca teve identidade aplicada nas redes'],
        features: [
          'Doze conteúdos iniciais, publicados no perfil',
          'Capas de destaque no padrão da marca',
          'Bio escrita para converter, não para descrever',
          'Link na bio com os caminhos de reserva e contato',
          'Perfil configurado como conta comercial',
        ],
        result: 'Perfil pronto para receber visita e converter',
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
    what: 'Performance Ads é marketing com accountability total. Não trabalhamos com "parece que está indo bem". Trabalhamos com dados, métricas e metas claras. Cada campanha é gerenciada para gerar o máximo de retorno com o mínimo de desperdício.',
    how: [
      { number: '01', title: 'Setup & Rastreamento', desc: 'Configuramos pixels, tags e todos os eventos necessários para rastrear conversões com precisão.' },
      { number: '02', title: 'Estratégia & Segmentação', desc: 'Definimos públicos, objetivos e estrutura de campanhas para cada etapa do funil.' },
      { number: '03', title: 'Criação & Lançamento', desc: 'Desenvolvemos os criativos e lançamos as campanhas com estrutura de testes A/B.' },
      { number: '04', title: 'Otimização Contínua', desc: 'Monitoramos diariamente e ajustamos lances, públicos e criativos para maximizar ROI.' },
    ],
    whoFor: [
      'Hotéis e pousadas que querem reduzir dependência das OTAs',
      'Operadoras que precisam gerar leads qualificados em volume',
      'Escolas de esporte que precisam encher turma',
      'Negócios que já investem em tráfego mas não veem resultado',
    ],
    deliverables: ['Configuração completa de campanhas', 'Criativos (imagens e vídeos)', 'Otimização diária', 'Relatório mensal unificado', 'Análise de concorrência', 'Dashboard de acompanhamento'],
    portfolioCategory: 'performance',
    subServices: [
      // Meta e Google eram dois produtos. Vender separado obriga o cliente a
      // escolher canal antes do diagnóstico, e escolher canal é parte do que
      // a Explore entrega.
      {
        slug: 'gestao-de-trafego',
        pillar: 'performance',
        name: 'Gestão de tráfego',
        period: 'monthly',
        tagline: 'Meta, Google ou os dois, decidido no diagnóstico.',
        description: 'Campanha pensada pela pergunta que o hóspede faz, não pela plataforma. Quem já sabe onde quer ficar procura no Google; quem ainda não decidiu o destino descobre no Instagram. O canal sai do diagnóstico, e muda quando a temporada muda.',
        forWhom: ['Pousadas e hotéis que querem reduzir dependência de OTA', 'Beach clubs e restaurantes com alta e baixa temporada bem marcadas', 'Escolas e experiências que precisam encher agenda em janela curta'],
        features: [
          'Definição de canal e verba a partir do diagnóstico',
          'Campanhas no Meta, no Google ou nos dois',
          'Segmentação por intenção e por origem do hóspede',
          'Teste de criativo e de gancho ao longo do mês',
          'Acompanhamento e ajuste durante a temporada',
          'Relatório mensal e grupo de WhatsApp direto com quem opera',
        ],
        result: 'Reserva direta entrando por canal escolhido com critério',
      },
    ],
  },
  {
    slug: 'automatizacoes',
    pillar: 'automatizacoes',
    title: 'Automatizações',
    tagline: 'Tecnologia que automatiza e escala o seu negócio.',
    description: 'Desenvolvemos sistemas internos e automações que eliminam processos manuais, reduzem erros e liberam sua equipe para o que realmente importa.',
    gradient: 'from-[#0F2018] via-[#162B20] to-[#1B3025]',
    what: 'Sistemas e automações bem implementados são o diferencial que permite escalar sem aumentar proporcionalmente a equipe. Desde CRMs personalizados até integrações automáticas entre plataformas. Construímos a infraestrutura tecnológica do seu negócio.',
    how: [
      { number: '01', title: 'Diagnóstico & Mapeamento', desc: 'Entendemos os processos atuais, identificamos gargalos e mapeamos as oportunidades de automação.' },
      { number: '02', title: 'Arquitetura da Solução', desc: 'Desenhamos a solução técnica ideal para o seu contexto, sem over-engineering.' },
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
    portfolioCategory: 'automatizacoes',
    subServices: [
      {
        slug: 'automacoes',
        pillar: 'automatizacoes',
        name: 'Automações',
        period: 'once',
        grupo: 'operacao',
        tagline: 'Resolve esforço: o que a operação refaz toda semana passa a sair sozinho.',
        description: 'Automações cuidam do trabalho repetitivo da operação: fluxo de atendimento, publicação no horário e peça que se repete toda semana, como tábua de maré e programação. Se o que você procura é não perder contato de quem pediu orçamento, o produto é CRM, não este.',
        forWhom: ['Operações que refazem a mesma arte ou a mesma planilha toda semana', 'Times pequenos que perdem hora com tarefa manual', 'Negócios com alto volume de atendimento repetitivo'],
        features: [
          'Mapeamento do que a operação repete',
          'Fluxos no Make, n8n ou Zapier',
          'Peça de série ligada à fonte de dados, publicada no horário',
          'Integração entre as ferramentas que você já usa',
          'Documentação dos fluxos, para não depender de quem montou',
        ],
        result: 'Menos hora gasta em tarefa que não precisa de gente',
      },
      {
        slug: 'crm',
        pillar: 'automatizacoes',
        name: 'CRM',
        period: 'once',
        grupo: 'operacao',
        tagline: 'Resolve receita: nenhum contato se perde no caminho.',
        description: 'Implementamos e configuramos o CRM ideal para o seu negócio, organizando leads, histórico de atendimento, follow-ups e pipeline de vendas em um único lugar.',
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

/**
 * Ordem de exibição das disciplinas.
 *
 * O array acima está na ordem em que as frentes foram criadas. Reordenar os
 * blocos moveria centenas de linhas e poluiria o diff sem ganho nenhum, então
 * a ordem de tela é declarada aqui, num lugar só.
 */
export const DISCIPLINE_ORDER: string[] = [
  'social-media',
  'performance-ads',
  'web-design',
  'automatizacoes',
  'branding',
]

/** As disciplinas na ordem em que aparecem no site. */
export const disciplines: ServiceData[] = DISCIPLINE_ORDER
  .map(slug => servicesData.find(s => s.slug === slug))
  .filter((s): s is ServiceData => Boolean(s))

/** Uma disciplina pelo slug. `/servicos/[slug]` resolve disciplina antes de sub-serviço. */
export function findDiscipline(slug: string): ServiceData | undefined {
  return servicesData.find(s => s.slug === slug)
}

export function findSubService(slug: string): SubService | undefined {
  for (const service of servicesData) {
    const sub = service.subServices.find(s => s.slug === slug)
    if (sub) return sub
  }
  return undefined
}

/* ────────────────────────── o catálogo de produtos ─────────────────────────

   A partir daqui o site deixa de vender disciplina e passa a vender produto.
   O eixo é como o cliente pensa em dinheiro: gasto uma vez ou gasto todo mês.

   `servicesData` continua existindo porque carrega gradiente, conteúdo
   traduzido e a categoria de portfólio de cada produto. Ela virou estrutura
   interna: nenhuma disciplina tem rota própria.

   ────────────────────────────────────────────────────────────────────────── */

/** Ordem dos grupos do pontual na tela. */
export const GRUPO_ORDER: Grupo[] = ['presenca', 'marca', 'producao', 'operacao']

/**
 * Ordem dos produtos dentro de cada grupo, e do bloco recorrente.
 *
 * Declarada aqui pelo mesmo motivo de `DISCIPLINE_ORDER`: os produtos moram
 * espalhados por `servicesData` na ordem em que as frentes nasceram, e
 * reordenar os blocos moveria centenas de linhas sem ganho.
 */
export const PRODUTO_ORDER: string[] = [
  // pontual · presença
  'website-institucional', 'landing-page', 'setup',
  // pontual · marca
  'identidade-visual', 'branding-completo',
  // pontual · produção
  'fotografia', 'captacao-video', 'edicao-video', 'pecas-animadas',
  // pontual · operação
  'crm', 'automacoes',
  // recorrente
  'producao-conteudo', 'gestao-de-trafego',
]

const todosOsProdutos: SubService[] = servicesData.flatMap(d => d.subServices)

/** Os treze produtos, na ordem de tela. */
export const produtos: SubService[] = PRODUTO_ORDER
  .map(slug => todosOsProdutos.find(p => p.slug === slug))
  .filter((p): p is SubService => Boolean(p))

/** Os onze pontuais, agrupados por problema que resolvem. */
export const pontualPorGrupo: { grupo: Grupo; itens: SubService[] }[] = GRUPO_ORDER
  .map(grupo => ({ grupo, itens: produtos.filter(p => p.period === 'once' && p.grupo === grupo) }))
  .filter(g => g.itens.length > 0)

/** Os dois recorrentes. Não agrupam: são dois. */
export const recorrentes: SubService[] = produtos.filter(p => p.period === 'monthly')

/** A disciplina que carrega o conteúdo de um produto (gradiente, portfólio). */
export function disciplinaDoProduto(slug: string): ServiceData | undefined {
  return servicesData.find(d => d.subServices.some(s => s.slug === slug))
}
