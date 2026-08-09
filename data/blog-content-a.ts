export type PostContent = {
  sections: { heading: string; paragraphs: string[] }[]
  pullQuote?: string
  cta: { heading: string; label: string; href: string }
}

export const contentA: Record<string, PostContent> = {

  /* ── WEB DESIGN ── */

  'site-escola-kitesurf-ceara': {
    sections: [
      {
        heading: 'A escola existe. O aluno em potencial não te encontra.',
        paragraphs: [
          'Para a maioria das escolas de kitesurf no Ceará, o problema não está na qualidade das aulas nem nas condições de vento, está na invisibilidade digital. O turista que planeja uma viagem para Cumbuco ou Jericoacoara começa a pesquisa no Google semanas antes de embarcar. Se sua escola não aparece com presença profissional nesses canais, ela simplesmente não existe para esse público no momento em que ele decide onde vai estudar.',
          'Um site bem construído vai muito além de uma página no Wix ou de um perfil no Instagram. É uma estrutura completa pensada para captar o visitante no exato momento da intenção de compra, apresentar os pacotes com clareza, mostrar provas sociais reais e conduzir o interessado até a matrícula, de forma orgânica, sem depender 100% de anúncios pagos a cada ciclo.',
        ],
      },
      {
        heading: 'O que um site profissional faz pela sua escola',
        paragraphs: [
          'Um site bem construído funciona como um vendedor que nunca tira férias. Às 2h da manhã, quando um viajante europeu está pesquisando destinos de kite para o verão, seu site aparece no Google, apresenta os pacotes com clareza, exibe vídeos das condições de vento e tem um botão direto para o WhatsApp. A venda começa antes de você acordar.',
          'Além disso, SEO local bem aplicado faz sua escola aparecer nas primeiras posições para buscas como "aula de kitesurf Cumbuco" ou "escola de kite no Ceará". Captação orgânica, sem custo por clique, que se acumula ao longo das temporadas e cria uma vantagem competitiva difícil de reverter pelos concorrentes.',
        ],
      },
      {
        heading: 'O que não pode faltar no site da sua escola',
        paragraphs: [
          'Pacotes e preços claros, fotos profissionais das aulas em ação, depoimentos reais com nome e origem dos alunos, integração direta com WhatsApp, velocidade de carregamento adequada para mobile e versão em inglês para turistas internacionais, esses são os elementos que separam um site que converte de um que apenas existe na internet.',
          'A qualidade visual do site também comunica a qualidade das aulas. Um design descuidado transmite a mesma mensagem que um equipamento mal conservado: amadorismo. O aluno em potencial vai escolher a escola que parece mais profissional online, mesmo sem ter pisado na praia ainda.',
        ],
      },
    ],
    pullQuote: 'Um site bem construído é o único vendedor que trabalha por você 24 horas, em qualquer idioma, sem folga e sem comissão.',
    cta: { heading: 'Seu site precisa trabalhar por você 24h.', label: 'Quero um site profissional', href: '/servicos/website-institucional' },
  },

  'site-pousada-jericoacoara': {
    sections: [
      {
        heading: 'Quanto você está pagando de comissão todo mês?',
        paragraphs: [
          'Pousadas em Jericoacoara que dependem exclusivamente do Booking.com e do Airbnb pagam entre 15% e 20% de comissão sobre cada hospedagem. Em uma pousada com ticket médio de R$ 600 por diária e 70% de ocupação durante 8 meses, essa comissão ultrapassa facilmente R$ 100.000 por ano, dinheiro que sai diretamente da sua margem.',
          'Um site próprio bem estruturado, com motor de reservas integrado ou contato direto via WhatsApp, permite captar hóspedes sem pagar nada aos intermediários. O custo de construir um site profissional se paga na primeira reserva direta capturada, e o retorno se acumula a cada temporada seguinte.',
        ],
      },
      {
        heading: 'Por que o site de pousada precisa ser diferente',
        paragraphs: [
          'Um site de pousada não é o mesmo que um site institucional comum. Ele precisa vender uma experiência antes da chegada: transmitir o clima, o cuidado nos detalhes, a vista do quarto, o café da manhã. Fotos e vídeos profissionais são o coração desse processo: são eles que criam o desejo de reservar antes de qualquer conversa.',
          'Além das imagens, o site precisa ter disponibilidade clara, processo de contato simples e depoimentos reais. Em Jericoacoara, onde a concorrência é intensa e o viajante compara várias pousadas antes de decidir, esses elementos fazem a diferença entre uma reserva direta e uma comissão para o Booking.',
        ],
      },
      {
        heading: 'O retorno vem na primeira temporada',
        paragraphs: [
          'Pousadas em Jeri que investem em site profissional com boas fotos e SEO local começam a ver reservas orgânicas nos primeiros 60 a 90 dias. As posições no Google para buscas como "pousada em Jericoacoara" melhoram progressivamente, e o tráfego orgânico não cobra nada por clique.',
          'O investimento em um site bem feito é, na prática, uma redução de dependência das OTAs. A cada reserva direta capturada, a comissão que seria paga ao Booking vira lucro. Para a maioria das pousadas, o payback acontece antes do final da primeira temporada.',
        ],
      },
    ],
    pullQuote: 'Cada reserva direta capturada pelo seu site é uma comissão que ficou no seu bolso, não no do Booking.',
    cta: { heading: 'Reduza sua dependência das OTAs com um site que converte.', label: 'Quero um site para minha pousada', href: '/servicos/website-institucional' },
  },

  'landing-page-kite-cumbuco': {
    sections: [
      {
        heading: 'Site institucional vs landing page: qual usar para converter',
        paragraphs: [
          'Um site institucional apresenta tudo que sua escola oferece: história, equipe, múltiplos pacotes. Uma landing page tem um único objetivo: converter o visitante em lead ou em matrícula. Para campanhas de tráfego pago em Cumbuco, a landing page vence porque elimina a distração e conduz o usuário por um caminho único até o CTA.',
          'O visitante que chega via Google Ads buscando "aula de kitesurf em Cumbuco" não quer navegar por menus: quer confirmar que chegou ao lugar certo, ver prova social, entender o pacote e entrar em contato. Uma landing page bem estruturada entrega exatamente isso em menos de 60 segundos.',
        ],
      },
      {
        heading: 'Os elementos que fazem uma landing page converter',
        paragraphs: [
          'Headline claro que confirma a proposta, foto de alta qualidade ou vídeo de alunos em ação, depoimentos com resultados específicos, pacotes com preços transparentes e CTAs em múltiplos pontos, esses blocos transformam visitante em lead. Cada elemento resolve uma objeção antes que ela apareça na cabeça do visitante.',
          'A velocidade de carregamento no mobile é crítica: mais de 70% dos acessos em campanhas de kitesurf vêm de smartphones. Uma landing page que demora mais de 3 segundos para carregar perde metade dos visitantes antes de exibir qualquer conteúdo. Performance técnica não é detalhe, é pré-requisito.',
        ],
      },
      {
        heading: 'Como uma landing page se paga rapidamente',
        paragraphs: [
          'Para escolas que investem em anúncios, a landing page determina diretamente o custo de aquisição de cada aluno. Uma página com taxa de conversão de 8% (acima da média do setor) transforma R$ 1.000 em anúncios em 8 leads, enquanto uma página ruim com 2% gera apenas 2, com o mesmo orçamento.',
          'Escolas em Cumbuco que migraram de sites genéricos para landing pages otimizadas relatam redução de 40% a 60% no custo por matrícula nas primeiras semanas. O investimento na página se paga antes do fim da primeira campanha.',
        ],
      },
    ],
    pullQuote: 'Uma landing page com taxa de conversão de 8% gera 4x mais alunos com o mesmo investimento em anúncios.',
    cta: { heading: 'Transforme seu tráfego pago em matrículas com uma landing page profissional.', label: 'Quero uma landing page', href: '/servicos/landing-page' },
  },

  'site-beach-club-litoral-ceara': {
    sections: [
      {
        heading: 'O site como primeiro drink servido',
        paragraphs: [
          'A experiência de um beach club começa muito antes da visita, começa no momento em que alguém abre o Instagram ou digita no Google. O que o visitante encontra nesse primeiro contato define se ele reserva mesa ou segue para o próximo resultado. O site é o primeiro drink que você serve, e ele precisa criar desejo imediato.',
          'Beach clubs no litoral cearense que têm sites bem construídos vendem a experiência antes da chegada: o pôr do sol, a gastronomia, a música ao vivo, a estrutura à beira-mar. Quem não tem site profissional deixa essa narrativa para o cliente construir por conta própria, com fotos antigas e avaliações desatualizadas.',
        ],
      },
      {
        heading: 'O que o site de um beach club precisa ter',
        paragraphs: [
          'Cardápio visual atualizado, galeria de fotos e vídeos profissionais, informações claras de reserva ou entrada, localização com mapa integrado, horários e eventos em destaque, e velocidade. Um site de beach club que demora para carregar perde o cliente para o concorrente que responde primeiro no Instagram.',
          'A integração com reservas ou listas VIP é um diferencial que está se tornando padrão no segmento. Beach clubs que oferecem reserva online pelo site criam um canal de receita previsível e constroem uma base de dados de clientes que pode ser trabalhada com marketing direto ao longo do ano.',
        ],
      },
      {
        heading: 'Alcançando o público certo no litoral cearense',
        paragraphs: [
          'O litoral cearense recebe turistas do Brasil inteiro e de outros países. Um site bilíngue amplia o alcance do beach club para o público internacional que chega sem indicação local e pesquisa tudo online antes de sair do hotel.',
          'Para beach clubs com eventos sazonais, o site também é o canal mais eficiente para divulgação: uma página de evento otimizada aparece no Google para quem busca "o que fazer em Cumbuco no fim de semana" e converte tráfego orgânico em reservas sem custo adicional.',
        ],
      },
    ],
    pullQuote: 'O site é o primeiro drink servido pelo seu beach club, e precisa criar desejo antes mesmo da primeira visita.',
    cta: { heading: 'Venda sua experiência antes da visita com um site profissional.', label: 'Quero um site para meu beach club', href: '/servicos/website-institucional' },
  },

  'site-wingfoil-fortaleza-cumbuco': {
    sections: [
      {
        heading: 'O esporte cresce. A presença digital ainda não.',
        paragraphs: [
          'O wingfoil é a modalidade de maior crescimento no litoral cearense, com mais alunos, instrutores e escolas surgindo a cada temporada. Mas a maioria dessas escolas ainda não tem presença digital à altura do esporte: sites improvisados, perfis de Instagram desatualizados e nenhuma estratégia para captar alunos de fora do Ceará.',
          'Esse gap é uma oportunidade. Escolas que se posicionarem digitalmente agora, com site profissional, SEO bem feito e conteúdo consistente, vão dominar as buscas orgânicas por anos antes que os concorrentes percebam. O custo de esperar é medido em alunos que escolheram a escola que apareceu primeiro.',
        ],
      },
      {
        heading: 'O que o aluno de wingfoil busca online',
        paragraphs: [
          'O público de wingfoil tende a ser mais qualificado que o de kitesurf iniciante: adultos com renda acima da média, que já praticam outros esportes, que pesquisam muito antes de decidir e que valorizam qualidade sobre preço. Um site que comunica profissionalismo, segurança e expertise técnica converte esse público com mais eficiência do que qualquer anúncio genérico.',
          'Informações sobre equipamento, nível de exigência física, progressão esperada por módulo e certificação dos instrutores são diferenciais que esse público valoriza e busca ativamente. Uma escola que responde a essas perguntas no site, antes mesmo do primeiro contato, já está na frente.',
        ],
      },
      {
        heading: 'Captando alunos internacionais em Fortaleza e Cumbuco',
        paragraphs: [
          'Jericoacoara, Cumbuco e Paracuru atraem kitesurfistas e wingfoilistas de todo o mundo, especialmente da Europa e da América do Norte. Um site em inglês com fotos das condições de vento coloca sua escola no radar de quem planeja uma viagem de esporte aquático ao Ceará com meses de antecedência.',
          'Escolas com presença em inglês aparecem nas buscas de viajantes que pesquisam "wingfoil lessons Ceará", um nicho ainda pouco disputado, com alta intenção de compra e ticket médio superior ao aluno local. A oportunidade de capturar esse público está disponível agora.',
        ],
      },
    ],
    pullQuote: 'O wingfoil ainda não tem a saturação digital do kitesurf, quem aparecer primeiro no Google vai colher os frutos por anos.',
    cta: { heading: 'Posicione sua escola de wingfoil como referência no Ceará.', label: 'Quero um site para minha escola', href: '/servicos/website-institucional' },
  },

  'site-pousada-pipa-turistas-sudeste': {
    sections: [
      {
        heading: 'O turista do sudeste pesquisa tudo antes de chegar',
        paragraphs: [
          'O viajante de São Paulo ou do Rio que escolhe Pipa para as férias não toma essa decisão por impulso. Ele pesquisa no Google, compara pousadas, lê avaliações, olha fotos, visita sites e só então decide. Para pousadas em Pipa, isso significa uma coisa: o site é o primeiro e mais importante ponto de contato com o hóspede de maior poder aquisitivo do país.',
          'Pousadas sem site profissional perdem esse hóspede para concorrentes que investiram em presença digital. A concorrência em Pipa é acirrada, e o viajante do sudeste está disposto a pagar mais por uma experiência premium, mas só confia nessa percepção se o site transmite essa qualidade desde o primeiro clique.',
        ],
      },
      {
        heading: 'Como aparecer no Google quando o turista pesquisa',
        paragraphs: [
          'SEO para pousadas em Pipa exige trabalho técnico e de conteúdo: velocidade do site, estrutura de páginas bem definida, termos certos nos textos e integração com o Google Meu Negócio. Pousadas que aparecem na primeira página para "pousada em Pipa" captam hóspedes orgânicos sem pagar por cada clique.',
          'Esse tráfego orgânico é o mais valioso: o turista que chega pelo Google já está decidido a ir para Pipa e está escolhendo onde ficar. A taxa de conversão desse tráfego é muito superior à de qualquer campanha de mídia paga, e o custo de aquisição cai drasticamente ao longo do tempo.',
        ],
      },
      {
        heading: 'O site que convence antes da ligação',
        paragraphs: [
          'Um site de pousada em Pipa que converte precisa de fotos profissionais que comuniquem clima e personalidade, depoimentos reais com origem do hóspede, informações claras sobre acomodações e um processo de reserva sem fricção. O objetivo é que o hóspede chegue ao WhatsApp já decidido, não em dúvida.',
          'Pousadas que investiram em site profissional relatam aumento imediato na qualidade dos contatos: menos "quanto custa a diária?" e mais "quero reservar para o período X". A qualificação começa no site, e isso reduz o tempo da equipe de reservas e aumenta a taxa de fechamento.',
        ],
      },
    ],
    pullQuote: 'O turista do sudeste decide onde ficar em Pipa antes de sair de casa, e ele decide pelo site.',
    cta: { heading: 'Atraia turistas de São Paulo e Rio sem depender do Booking.', label: 'Quero um site que converte', href: '/servicos/website-institucional' },
  },

  'seo-local-pousada-jericoacoara': {
    sections: [
      {
        heading: '70% dos cliques vão para os 3 primeiros resultados',
        paragraphs: [
          'Quando alguém digita "pousada em Jericoacoara" no Google, as três primeiras posições orgânicas concentram mais de 70% de todos os cliques. Estar na quarta posição já significa receber menos da metade do tráfego que o terceiro lugar captura. Para pousadas em Jeri, onde cada reserva importa, não aparecer no topo é uma perda real e mensurável de receita.',
          'SEO local, a otimização do seu site para buscas geograficamente específicas, é o que determina essa posição. Não é um processo mágico: é técnico, consistente e progressivo. Pousadas que começam cedo constroem autoridade antes dos concorrentes e mantêm as posições por anos com manutenção mínima.',
        ],
      },
      {
        heading: 'Google Meu Negócio: a peça que a maioria ignora',
        paragraphs: [
          'O Google Meu Negócio (GMB) é a ficha que aparece no Google Maps quando alguém busca sua pousada. Uma ficha bem otimizada, com fotos profissionais atualizadas, horário correto, respostas a avaliações e atributos preenchidos, aparece nas buscas locais com muito mais frequência do que uma ficha básica.',
          'Pousadas em Jericoacoara com GMB bem otimizado aparecem no "pacote local" do Google, os três resultados com mapa que surgem antes dos resultados orgânicos para buscas como "pousada Jeri". Essa posição gera ligações e visitas ao site sem custo por clique.',
        ],
      },
      {
        heading: 'O que fazer para subir no Google',
        paragraphs: [
          'As ações mais impactantes de SEO local são: velocidade do site acima de 90 no PageSpeed Mobile, textos com as palavras-chave certas em posições estratégicas, estrutura de páginas com URLs limpas e link building consistente. Cada ação contribui para a autoridade do domínio aos olhos do Google.',
          'O processo não é imediato: resultados orgânicos consistentes aparecem em 60 a 120 dias. Mas são duradouros, diferente do tráfego pago, que para no momento em que a verba acaba. Pousadas que começam o SEO agora estarão colhendo resultados enquanto os concorrentes ainda pagam por cada clique.',
        ],
      },
    ],
    pullQuote: '70% dos cliques ficam nos 3 primeiros resultados. SEO é a diferença entre estar lá e pagar comissão para o Booking.',
    cta: { heading: 'Apareça no topo do Google quando o turista pesquisar sua pousada.', label: 'Quero um site otimizado para SEO', href: '/servicos/website-institucional' },
  },

  'elementos-site-escola-kite-wingfoil': {
    sections: [
      {
        heading: 'Os 7 elementos que todo site de escola de kite precisa ter',
        paragraphs: [
          'Na Explore Digital, analisamos dezenas de sites de escolas de kitesurf e wingfoil. Os que mais convertem têm 7 elementos em comum: (1) headline claro com proposta de valor, (2) fotos profissionais de aulas em ação, (3) depoimentos reais com nome e origem do aluno, (4) pacotes com preços explícitos, (5) botão de WhatsApp visível, (6) integração com Google Maps, (7) carregamento rápido no mobile.',
          'Cada elemento resolve uma objeção específica do visitante. As fotos profissionais eliminam a dúvida sobre a qualidade. Os depoimentos com origem geográfica confirmam que a escola atende turistas de fora. Os preços claros evitam o ciclo de troca de mensagens. Juntos, esses elementos guiam o visitante até a matrícula.',
        ],
      },
      {
        heading: 'O que os sites que não convertem têm em comum',
        paragraphs: [
          'Sites de escolas de kite que não geram matrículas geralmente têm um ou mais desses problemas: fotos de celular com qualidade ruim, pacotes vagos sem preço, nenhum depoimento com credibilidade, menu com muitas páginas e pouco foco, e carregamento lento no mobile. Cada um desses problemas custa matrículas reais.',
          'O mais crítico é a ausência de prova social. Em um mercado onde o aluno está prestes a colocar um equipamento de kite no corpo pela primeira vez, em ventos de 20 a 30 nós, a confiança no instrutor e na escola é o primeiro requisito de compra. Depoimentos reais constroem essa confiança antes do primeiro contato.',
        ],
      },
      {
        heading: 'Como aplicar o checklist na sua escola',
        paragraphs: [
          'A boa notícia é que a maioria desses elementos não exige tecnologia sofisticada. Um site bem construído com fotos profissionais (investimento de uma sessão por temporada), depoimentos coletados sistematicamente de alunos satisfeitos e integração com WhatsApp já coloca sua escola na frente de 80% dos concorrentes.',
          'O que exige mais atenção é a versão mobile: mais de 70% dos visitantes chegam pelo celular. Testar o site no próprio smartphone, em conexão 4G, é o teste mais simples e revelador que existe, e expõe imediatamente os problemas que estão custando matrículas.',
        ],
      },
    ],
    pullQuote: 'Um site que converte não é mais caro, é mais estratégico. Os 7 elementos certos fazem mais do que 70 páginas desnecessárias.',
    cta: { heading: 'Seu site tem os elementos que convertem visitantes em alunos?', label: 'Quero um site que converte', href: '/servicos/website-institucional' },
  },

  'site-para-experiencias-litoral-ceara': {
    sections: [
      {
        heading: 'Vender experiência online é mais difícil, e mais lucrativo',
        paragraphs: [
          'Passeios de buggy, aulas de surfe, mergulho em recifes, jantares à beira-mar, todos esses negócios têm em comum: vendem uma promessa, não um produto físico. O desafio do site é tornar essa promessa tangível o suficiente para o turista reservar antes de sentir, provar ou viver a experiência.',
          'O potencial de conversão é enorme: turistas que planejam viagens ao litoral cearense pesquisam ativamente "o que fazer em Jericoacoara" ou "passeios em Cumbuco". Um site bem posicionado para essas buscas captura demanda real e recorrente, sem precisar de anúncios pagos para cada visitante.',
        ],
      },
      {
        heading: 'O que faz uma experiência vender online',
        paragraphs: [
          'Para experiências turísticas, o site precisa resolver três perguntas em menos de 10 segundos: o que é essa experiência, para quem é e como reservar. Vídeo de 30 segundos mostrando a experiência ao vivo, lista do que está incluído, faixa de preço e botão de reserva, essa estrutura funciona para a maioria das experiências do litoral cearense.',
          'Depoimentos com resultados específicos ("foi a melhor experiência da minha viagem para o Ceará") são mais eficazes do que depoimentos genéricos. Para experiências de aventura, informações sobre segurança e nível de dificuldade também reduzem objeções antes do contato.',
        ],
      },
      {
        heading: 'SEO para experiências turísticas: capturando a busca certa',
        paragraphs: [
          '"Passeios em Jericoacoara", "o que fazer em Cumbuco com crianças", "experiências de aventura no litoral cearense", são buscas reais feitas por milhares de turistas todo mês. Um site otimizado para essas palavras-chave aparece nesses resultados sem custo por clique.',
          'Criar páginas específicas para cada experiência, com título e texto otimizados para cada termo de busca, multiplica as oportunidades de aparecer no Google. Uma operadora com 5 experiências pode ter 5 páginas ranqueando para 5 grupos de palavras-chave distintos, gerando tráfego orgânico diversificado e contínuo.',
        ],
      },
    ],
    pullQuote: 'O turista que busca "o que fazer em Jericoacoara" já está pronto para reservar, falta só o seu site aparecer.',
    cta: { heading: 'Coloque sua experiência turística no Google e venda antes do primeiro contato.', label: 'Quero uma landing page para minha experiência', href: '/servicos/landing-page' },
  },

  'google-meu-negocio-pousadas-escolas-ceara': {
    sections: [
      {
        heading: 'A ficha que aparece antes do seu site',
        paragraphs: [
          'O Google Meu Negócio (GMB) é o que aparece quando alguém busca sua pousada ou escola pelo nome, ou quando pesquisa "pousada perto de mim" no litoral cearense. É uma das ferramentas de marketing local mais poderosas que existem, completamente gratuita e subutilizada pela maioria dos negócios da região.',
          'Uma ficha bem otimizada aparece no "pacote local", aqueles três resultados com mapa que surgem antes de todos os outros no Google. Para pousadas em Jericoacoara e escolas de kite em Cumbuco, aparecer nesse pacote pode significar dezenas de ligações e visitas ao site todos os meses, sem custo por clique.',
        ],
      },
      {
        heading: 'Como otimizar sua ficha do Google',
        paragraphs: [
          'As ações mais impactantes são: preencher todos os campos da ficha (categoria, descrição, horários, site, telefone), adicionar fotos profissionais atualizadas regularmente, responder a todas as avaliações, positivas e negativas, e publicar posts sobre promoções ou eventos sazonais.',
          'A quantidade e a qualidade das avaliações também influenciam diretamente na posição da ficha. Criar um processo sistemático para solicitar avaliações de hóspedes e alunos satisfeitos, via WhatsApp, com link direto para o Google, é a ação que mais impacta os resultados em menos tempo.',
        ],
      },
      {
        heading: 'GMB + Site: a combinação que domina os resultados locais',
        paragraphs: [
          'GMB e site profissional não são concorrentes, são complementares. O GMB aparece para quem já conhece o negócio ou faz buscas locais genéricas; o site captura o visitante que quer saber mais, compara preços e toma a decisão de reservar. Juntos, eles cobrem os dois momentos mais importantes da jornada de compra do turista.',
          'Pousadas e escolas que investem em ambos, GMB otimizado e site profissional com SEO, têm uma presença digital completa que cobre as buscas locais, as buscas por nome e as buscas por destino. Essa combinação é o que separa os negócios que dependem de indicação dos que geram receita recorrente pelo digital.',
        ],
      },
    ],
    pullQuote: 'O Google Meu Negócio é a ferramenta de marketing local mais poderosa do mundo, e a maioria dos negócios do litoral cearense ainda não a usa direito.',
    cta: { heading: 'Monte uma presença digital completa e apareça no Google de várias formas.', label: 'Quero um site com SEO local', href: '/servicos/website-institucional' },
  },

  /* ── TRÁFEGO PAGO ── */

  'google-ads-escola-kitesurf-ceara': {
    sections: [
      {
        heading: 'O público mais qualificado que existe está no Google',
        paragraphs: [
          'Quem pesquisa "aula de kitesurf no Ceará" no Google já tomou a decisão de praticar kite, só está escolhendo onde. Esse é o público com maior intenção de compra que existe: ele não precisa ser convencido de que quer aprender, apenas de qual escola é a melhor opção. O Google Ads coloca sua escola na frente desse público no exato momento da decisão.',
          'Diferente do Meta Ads, que interrompe o usuário enquanto ele rola o feed, o Google Ads aparece quando alguém procura ativamente pelo que você oferece. A taxa de conversão de campanhas de pesquisa no Google para escolas de kitesurf tende a ser 2 a 3 vezes maior do que anúncios de redes sociais, exatamente porque o nível de intenção é incomparavelmente superior.',
        ],
      },
      {
        heading: 'Como estruturar uma campanha eficiente',
        paragraphs: [
          'A base de uma campanha eficiente começa nas palavras-chave certas. Os grupos mais relevantes incluem termos de localização ("kitesurf Cumbuco", "escola kite Jericoacoara"), termos de ação ("aula de kitesurf", "curso kite iniciante") e termos de comparação ("melhor escola kitesurf Ceará"). Cada grupo precisa de anúncios e landing pages específicos para maximizar a relevância.',
          'Palavras-chave negativas são tão importantes quanto as positivas. Termos como "vídeo kitesurf", "equipamento kitesurf barato" ou "campeonato kitesurf" trazem cliques sem intenção de matrícula, e custam o mesmo que os cliques qualificados. Uma campanha bem gerenciada exclui sistematicamente esse tráfego e concentra o orçamento nos termos que convertem.',
        ],
      },
      {
        heading: 'Quanto investir e o que esperar',
        paragraphs: [
          'O custo por clique para termos de kitesurf no Ceará varia entre R$ 3 e R$ 15, dependendo da sazonalidade e da concorrência. Com um investimento de R$ 1.500 por mês e uma landing page com boa taxa de conversão, é possível gerar entre 10 e 25 leads qualificados por mês.',
          'O resultado real depende da qualidade da landing page que recebe o clique. Uma campanha de Google Ads excelente direcionada para um site ruim desperdiça orçamento. A equação completa, palavra-chave certa, anúncio relevante e landing page que converte, é o que determina o custo real por matrícula.',
        ],
      },
    ],
    pullQuote: 'Quem pesquisa "aula de kitesurf no Ceará" já decidiu aprender, o Google Ads garante que é a sua escola que aparece.',
    cta: { heading: 'Apareça no Google quando o aluno está procurando pela sua escola.', label: 'Quero anunciar no Google Ads', href: '/servicos/gestao-de-trafego' },
  },

  'meta-ads-pousadas-jericoacoara': {
    sections: [
      {
        heading: 'O Meta Ads cria o desejo de ir a Jericoacoara',
        paragraphs: [
          'O Google Ads captura quem já decidiu ir para Jeri e está escolhendo a pousada. O Meta Ads, Facebook e Instagram, cria o desejo de ir antes que a decisão exista. Para pousadas em Jericoacoara, as duas plataformas têm papéis complementares: o Meta constrói o sonho, o Google captura a intenção.',
          'A vantagem do Meta Ads é a segmentação sofisticada: é possível atingir brasileiros que seguem páginas de viagem e kitesurf, europeus com interesse em esportes aquáticos, ou pessoas que viajaram para destinos similares nos últimos 12 meses. Esse nível de precisão é impossível no Google Ads, e é o que faz o Meta indispensável para pousadas que querem crescer.',
        ],
      },
      {
        heading: 'Segmentação que funciona para Jericoacoara',
        paragraphs: [
          'O público que vai a Jericoacoara tem perfil bem definido: adultos entre 25 e 45 anos com interesse em ecoturismo, esportes de aventura e experiências exclusivas. No Meta Ads, é possível construir um público que combina esses interesses com comportamentos reais, como "viajou para o exterior nos últimos 6 meses" ou perfis com ticket de consumo elevado.',
          'Além dos públicos baseados em interesses, o lookalike audience é o recurso mais poderoso para pousadas com histórico de hóspedes. Ao fazer upload da lista de e-mails de hóspedes anteriores, o Meta encontra novos usuários com perfil semelhante no Brasil e no mundo, e entrega seus anúncios exatamente para quem tem mais chance de reservar.',
        ],
      },
      {
        heading: 'Criativo que converte para pousada',
        paragraphs: [
          'Vídeos curtos (15 a 30 segundos) mostrando o pôr do sol de Jericoacoara, o café da manhã à beira-mar ou os momentos de relaxamento na pousada têm desempenho muito superior a fotos estáticas. O formato Reels do Instagram é o mais eficiente, e o custo por resultado tende a ser 30% a 50% menor do que nos formatos tradicionais.',
          'A frequência de atualização dos criativos é crítica: um mesmo anúncio perde eficiência depois de 7 a 14 dias de veiculação. Pousadas que mantêm um banco de fotos e vídeos profissionais atualizados têm a matéria-prima para renovar os criativos sem custo adicional de produção, e mantêm o custo por resultado baixo ao longo do tempo.',
        ],
      },
    ],
    pullQuote: 'O Meta Ads não captura demanda existente, ele cria o desejo de ir a Jericoacoara em quem ainda não sabe que quer ir.',
    cta: { heading: 'Atraia turistas nacionais e internacionais para sua pousada em Jericoacoara.', label: 'Quero anunciar no Meta Ads', href: '/servicos/gestao-de-trafego' },
  },

  'anuncios-instagram-beach-club-cumbuco': {
    sections: [
      {
        heading: 'O público certo está do lado de casa',
        paragraphs: [
          'Cumbuco fica a menos de uma hora de Fortaleza, o que significa que o público mais qualificado para o seu beach club mora praticamente na vizinhança. Com a segmentação certa no Instagram Ads, é possível atingir moradores de Fortaleza entre 22 e 40 anos com interesse em gastronomia, música e estilo de vida praia, exatamente o perfil que lota os fins de semana.',
          'A proximidade geográfica é uma vantagem competitiva que muitos beach clubs de Cumbuco ainda não exploram digitalmente. Enquanto destinos distantes precisam convencer o turista a viajar, você só precisa convencer alguém a fazer uma hora de carro para um fim de semana perfeito, e o Instagram Ads é o canal ideal para criar esse desejo.',
        ],
      },
      {
        heading: 'Como estruturar campanhas que lotam o fim de semana',
        paragraphs: [
          'A estrutura que funciona para beach clubs em Cumbuco: campanha de reconhecimento com vídeos do ambiente (quinta-feira), campanha de conversão com oferta específica de fim de semana (sexta-feira). Esse funil simples, em dois dias, em duas etapas, é suficiente para criar urgência e lotar a agenda consistentemente ao longo da temporada.',
          'O criativo precisa transmitir o que o visitante vai sentir: o som do mar, a qualidade da gastronomia, a qualidade da vista. Vídeos curtos com som ambiente, trilha envolvente e cortes dinâmicos têm custo por resultado muito inferior a fotos estáticas, e criam o desejo de estar lá muito mais rapidamente.',
        ],
      },
      {
        heading: 'Métricas que importam para beach clubs',
        paragraphs: [
          'Custo por reserva ou custo por chegada são as métricas que realmente importam, não curtidas ou alcance. Um beach club que gasta R$ 800 em anúncios para lotar 40 mesas em um fim de semana tem um custo de aquisição de R$ 20 por mesa, um retorno excelente para um ticket médio de R$ 150 a R$ 300.',
          'A consistência das campanhas é o que transforma resultados pontuais em previsibilidade de receita. Beach clubs que anunciam de forma contínua, e não apenas em semanas específicas, constroem audiências progressivamente maiores e reduzem o custo por resultado ao longo do tempo.',
        ],
      },
    ],
    pullQuote: 'Com a segmentação certa no Instagram Ads, Cumbuco deixa de ser "destino para quem conhece" e vira destino de fim de semana para toda Fortaleza.',
    cta: { heading: 'Lote seu beach club em Cumbuco com campanhas no Instagram.', label: 'Quero anunciar no Meta Ads', href: '/servicos/gestao-de-trafego' },
  },

  'trafego-pago-wingfoil-ceara': {
    sections: [
      {
        heading: 'O CPC mais baixo e o nicho mais promissor do litoral',
        paragraphs: [
          'O wingfoil ainda não tem o volume de buscas do kitesurf, o que, na prática, significa menos concorrência nos leilões do Google Ads e do Meta Ads. Custo por clique mais baixo, menor disputa por palavras-chave, e uma audiência que cresce a cada temporada. Para escolas que entram agora, o timing não poderia ser mais favorável.',
          'À medida que o wingfoil se populariza, o custo por clique vai subir, assim como aconteceu com o kitesurf ao longo dos anos. Escolas que constroem histórico de campanhas e autoridade de domínio agora vão chegar na fase de maior concorrência com vantagem de custo e de posicionamento.',
        ],
      },
      {
        heading: 'Como atrair o perfil certo de aluno',
        paragraphs: [
          'O aluno de wingfoil tem perfil distinto: geralmente já pratica esportes de aventura, tem maior renda disponível e é mais exigente na escolha da escola. No Meta Ads, esse público pode ser segmentado por interesses em esportes aquáticos, kitesurf, SUP ou windsurf, públicos com sobreposição natural com o wingfoil.',
          'No Google Ads, os termos de wingfoil ainda têm volume mais baixo, mas a intenção de quem busca é altíssima. Uma escola que aparece para "aula de wingfoil Ceará" ou "wingfoil school Cumbuco" está na frente de um mercado que ainda não tem muita concorrência paga, e o custo por matrícula tende a ser muito abaixo da média do setor.',
        ],
      },
      {
        heading: 'Estratégia combinada: Meta para criar interesse, Google para capturar',
        paragraphs: [
          'A combinação ideal para escolas de wingfoil é usar o Meta Ads para criar reconhecimento e despertar o interesse, vídeos de wingfoil em ação no litoral cearense, com legendas que comuniquem a facilidade de aprendizado, e o Google Ads para capturar quem já pesquisou e está pronto para matricular.',
          'Esse modelo de funil integrado garante que o potencial aluno seja impactado em diferentes momentos da jornada: primeiro descobre o esporte, depois considera a escola, finalmente decide. E cada etapa tem o canal e o formato certos para maximizar a eficiência do orçamento.',
        ],
      },
    ],
    pullQuote: 'O wingfoil tem o menor custo por clique e o maior potencial de crescimento do litoral cearense, e o momento de agir é agora.',
    cta: { heading: 'Capture alunos de wingfoil com tráfego pago antes que a concorrência chegue.', label: 'Quero anunciar para wingfoil', href: '/servicos/gestao-de-trafego' },
  },

  'google-ads-pousadas-canoa-quebrada': {
    sections: [
      {
        heading: 'Canoa Quebrada e a disputa pelos cliques no Google',
        paragraphs: [
          'Canoa Quebrada tem uma das maiores concentrações de pousadas do litoral cearense, e isso significa concorrência intensa nos resultados do Google. Sem uma estratégia de anúncios bem estruturada, sua pousada aparece abaixo das OTAs, dos comparadores e dos concorrentes que investem em Google Ads. O espaço orgânico gratuito vai diminuindo a cada ano.',
          'Para pousadas em Canoa Quebrada, o Google Ads é especialmente eficiente porque a intenção de compra dos usuários é alta: quem pesquisa "pousada em Canoa Quebrada" ou "hotel Canoa Quebrada" já está em modo de reserva. Aparecer nessa busca com um anúncio relevante e uma landing page que converte é o caminho mais direto para reservas sem comissão de OTA.',
        ],
      },
      {
        heading: 'Aparecendo na frente das OTAs',
        paragraphs: [
          'O Booking.com e o Trivago investem pesado em Google Ads para aparecer nas buscas de destinos turísticos. Mas pousadas que anunciam diretamente também aparecem, e com a vantagem de cobrar tarifa direta, sem comissão. Um anúncio que comunica "reserva direta, melhores preços garantidos" cria um motivo claro para o turista clicar na pousada em vez do comparador.',
          'A taxa de conversão de quem clica diretamente na pousada tende a ser superior à de quem entra pelo Booking, porque o usuário já escolheu o destino e está avaliando especificamente aquela pousada. Isso significa que o custo por reserva direta via Google Ads muitas vezes é inferior ao custo de aquisição via OTA.',
        ],
      },
      {
        heading: 'Sazonalidade e budget: como planejar',
        paragraphs: [
          'Canoa Quebrada tem picos de demanda bem definidos, julho, fevereiro/carnaval e feriados prolongados. Concentrar o orçamento de Google Ads nesses períodos, com campanhas ativas 30 a 45 dias antes dos picos, garante que sua pousada apareça exatamente quando o turista está decidindo onde ficar.',
          'Fora dos picos, campanhas com orçamento reduzido mantêm a visibilidade para o turista que viaja fora de temporada e tem mais flexibilidade, geralmente um público de maior poder aquisitivo que paga tarifa plena e gera margem superior.',
        ],
      },
    ],
    pullQuote: 'Em Canoa Quebrada, o Google Ads é a ferramenta que separa quem aparece na frente das OTAs de quem paga comissão o ano todo.',
    cta: { heading: 'Gere reservas diretas para sua pousada em Canoa Quebrada sem pagar comissão.', label: 'Quero anunciar no Google Ads', href: '/servicos/gestao-de-trafego' },
  },

  'reduzir-ota-trafego-pago-ceara': {
    sections: [
      {
        heading: 'A sangria silenciosa das comissões de OTA',
        paragraphs: [
          'Pagar 15% a 20% de comissão para o Booking.com sobre cada reserva é uma das maiores perdas de margem invisíveis na hotelaria. Para um hotel no litoral cearense com faturamento de R$ 1.500.000 por ano, isso representa entre R$ 225.000 e R$ 300.000 pagos em comissão: sem retorno acumulado, sem base de dados, sem relacionamento direto com o hóspede.',
          'A alternativa não é sair das OTAs de uma vez, elas têm função de vitrine. A estratégia inteligente é usar as OTAs para exposição, mas converter cada hóspede em cliente direto. Tráfego pago bem estruturado, direcionado para o site próprio com reserva direta, é o que inverte progressivamente essa equação.',
        ],
      },
      {
        heading: 'Como o tráfego pago reduz a dependência das OTAs',
        paragraphs: [
          'A lógica é simples: em vez de pagar 18% de comissão por cada reserva ao Booking, o hotel investe parte desse valor em Google Ads e Meta Ads, direciona o tráfego para o seu próprio site e captura a reserva sem comissão. Se o custo de aquisição via anúncios próprios for inferior a 18%, a operação é mais eficiente.',
          'Na prática, hotéis e pousadas cearenses que estruturaram essa operação relatam custo de aquisição via tráfego pago entre 6% e 12% da receita da reserva, metade ou menos do que pagam para as OTAs. A diferença vai direto para a margem do negócio.',
        ],
      },
      {
        heading: 'O modelo que funciona na prática',
        paragraphs: [
          'O modelo começa com um site profissional com motor de reservas integrado (ou sistema de contato direto via WhatsApp), campanhas de Google Ads focadas em termos de destino e nome do hotel, e campanhas de Meta Ads para remarketing, atingindo quem visitou o site mas não reservou.',
          'Hotéis que implementam esse modelo consistentemente ao longo de 12 meses costumam atingir 40% a 60% de reservas diretas, contra 10% a 20% de quem não investe em canais próprios. O resultado é margens maiores, base de dados própria e relacionamento direto com o hóspede.',
        ],
      },
    ],
    pullQuote: 'Cada reserva direta capturada é uma comissão que ficou na margem do negócio, e o tráfego pago é o motor que faz isso acontecer.',
    cta: { heading: 'Reduza a dependência do Booking e aumente sua margem com tráfego pago.', label: 'Quero uma estratégia de tráfego pago', href: '/servicos/gestao-de-trafego' },
  },

  'meta-ads-kite-wingfoil-segmentacao': {
    sections: [
      {
        heading: 'O erro mais comum: anunciar para todo mundo',
        paragraphs: [
          'A maioria das escolas de kite e wingfoil que tenta anunciar no Meta Ads comete o mesmo erro: segmentação ampla demais. "Pessoas entre 18 e 55 anos no Brasil interessadas em esportes" pode parecer um público relevante, mas na prática significa gastar orçamento em pessoas que nunca vão para o Ceará, não têm interesse real em kite e não têm o perfil de aluno.',
          'Com a segmentação correta, interesses específicos, comportamentos de viagem e dados de alunos anteriores, o custo por lead qualificado cai drasticamente. A diferença entre uma segmentação bem feita e uma ampla pode ser de 3x a 5x no custo por matrícula.',
        ],
      },
      {
        heading: 'Como segmentar para atrair o aluno certo',
        paragraphs: [
          'Para escolas de kitesurf e wingfoil no Ceará, os melhores públicos no Meta incluem: pessoas com interesse em kitesurf, wingsurf, stand-up paddle e esportes aquáticos; viajantes que foram ao Ceará nos últimos 12 meses; e usuários que interagiram com perfis de kitesurf ou escolas de esporte. Esses públicos têm intenção real e são muito menores, mas muito mais eficientes.',
          'O lookalike audience baseado em matrículas anteriores é o segredo das campanhas mais eficientes. Ao fazer upload de uma lista de alunos que já se matricularam, o Meta encontra outros usuários com perfil semelhante no Brasil e no mundo. A taxa de conversão desse público tende a ser 2 a 4 vezes superior à de públicos baseados em interesse.',
        ],
      },
      {
        heading: 'Criativos que funcionam para kite e wingfoil',
        paragraphs: [
          'Para escolas de kite e wingfoil, o conteúdo mais eficiente nos anúncios é autêntico e dinâmico: vídeos de alunos em progresso, captações aéreas com drone em Cumbuco ou Jericoacoara, e depoimentos curtos de alunos satisfeitos. Esses formatos geram alto engajamento e baixo custo por resultado.',
          'Testar múltiplos criativos, pelo menos 3 a 5 variações de vídeo ou imagem, é essencial para encontrar o que ressoa com o público. O Meta otimiza automaticamente para os criativos que performam melhor; o papel do gestor de campanhas é fornecer matéria-prima suficiente e renovar quando a performance cai.',
        ],
      },
    ],
    pullQuote: 'Anunciar para todo mundo é o caminho mais caro para matrículas. A segmentação certa é o que separa campanhas eficientes de orçamento desperdiçado.',
    cta: { heading: 'Atraia o aluno certo de kite e wingfoil sem desperdiçar verba de anúncios.', label: 'Quero uma estratégia de Meta Ads', href: '/servicos/gestao-de-trafego' },
  },

  'remarketing-escola-kitesurf': {
    sections: [
      {
        heading: '98% dos visitantes vão embora sem matricular. O remarketing recupera.',
        paragraphs: [
          'Só 2% dos visitantes de um site de escola de kitesurf se convertem na primeira visita. Os outros 98% saem por algum motivo, distração, necessidade de comparar, falta de tempo, e raramente voltam por conta própria. O remarketing é a estratégia que mantém sua escola presente para esses visitantes e os traz de volta quando estão prontos para decidir.',
          'A lógica é simples: quem visitou seu site já demonstrou interesse. É um público muito mais qualificado do que qualquer público frio, e o custo para impactá-lo novamente com anúncios é significativamente menor. Recuperar 1% dos 98% que foram embora pode dobrar o número de matrículas mensais.',
        ],
      },
      {
        heading: 'Como configurar remarketing para escola de kitesurf',
        paragraphs: [
          'O ponto de partida é instalar o Pixel do Meta no site da escola. Com ele ativo, o Meta registra cada visitante e cria audiences automáticos de remarketing. O passo seguinte é criar campanhas específicas para esses públicos, com criativos diferentes dos anúncios de prospecção, focados em superar as objeções mais comuns de quem ainda não matriculou.',
          'As mensagens mais eficientes no remarketing para kitesurf são: depoimentos de alunos que tiveram as mesmas dúvidas, ofertas com urgência real (vagas limitadas na temporada, preço especial por tempo determinado) e demonstrações de resultado, vídeos de alunos que começaram do zero e saíram voando.',
        ],
      },
      {
        heading: 'Remarketing no Google para buscas subsequentes',
        paragraphs: [
          'Além do Meta, o Google Ads permite remarketing de display, mostrar banners da sua escola para quem visitou o site enquanto ele navega em outros sites e apps. Esse formato mantém a escola visível durante toda a fase de consideração do aluno, criando familiaridade que facilita a decisão final.',
          'A combinação de remarketing no Meta (redes sociais) e no Google (display) cria uma presença de marca que acompanha o potencial aluno onde quer que ele vá, um efeito de "ser grande" sem precisar de orçamento de marca grande.',
        ],
      },
    ],
    pullQuote: 'O remarketing recupera os 98% que foram embora sem matricular, e é o investimento mais eficiente que uma escola de kite pode fazer.',
    cta: { heading: 'Recupere os visitantes que saíram sem matricular e converta mais com o mesmo tráfego.', label: 'Quero uma estratégia de remarketing', href: '/servicos/gestao-de-trafego' },
  },

  'campanhas-alta-temporada-kite-ceara': {
    sections: [
      {
        heading: 'A janela de vento é previsível. A preparação tem que ser também.',
        paragraphs: [
          'O Ceará tem um dos ventos mais consistentes do mundo para kitesurf, e essa consistência torna a demanda por aulas igualmente previsível. A alta temporada concentrada entre julho e fevereiro representa a maior parte do faturamento anual de escolas de kite. Escolas que preparam as campanhas com 60 a 90 dias de antecedência chegam na temporada com agenda cheia, as que esperam brigam por sobras.',
          'O comportamento do aluno de temporada também é previsível: ele começa a pesquisar a viagem com 2 a 3 meses de antecedência, faz a matrícula online com 4 a 6 semanas antes da data e confirma o pagamento nas semanas finais. Campanhas ativas durante todo o período de pesquisa garantem que sua escola esteja presente em cada etapa dessa jornada.',
        ],
      },
      {
        heading: 'Como preparar as campanhas com antecedência',
        paragraphs: [
          'A preparação começa com a definição do orçamento por período: a alocação certa é concentrar 60% do orçamento mensal nos 45 dias anteriores ao pico e 40% durante a temporada ativa. Essa distribuição garante presença no momento de pesquisa e conversão, sem desperdício fora dos períodos de maior demanda.',
          'Os criativos da temporada precisam comunicar urgência real: vagas limitadas, janela de vento específica, condições ideais de julho a setembro. Um vídeo de drone em Cumbuco com kites no ar e a mensagem "vagas abertas para a temporada 2026" gera mais conversão do que qualquer anúncio genérico.',
        ],
      },
      {
        heading: 'O que fazer antes, durante e depois da temporada',
        paragraphs: [
          'Antes: ativar campanhas de Google Ads para termos de intenção alta ("aula de kite julho Ceará"), lançar Meta Ads com vídeos da temporada anterior e criar lista de espera para vagas. Durante: manter campanhas ativas, usar depoimentos de alunos da temporada corrente como social proof em tempo real.',
          'Depois: usar a base de dados de alunos da temporada para campanhas de fidelização e indicação. Alunos que aprenderam em julho são leads naturais para a temporada seguinte, e custam zero para reativar com uma sequência de e-mail ou WhatsApp bem estruturada.',
        ],
      },
    ],
    pullQuote: 'Escolas que preparam as campanhas com 90 dias de antecedência chegam na temporada com agenda cheia, as outras brigam por sobras.',
    cta: { heading: 'Prepare sua escola para dominar a alta temporada de kite no Ceará.', label: 'Quero planejar minha campanha de temporada', href: '/servicos/gestao-de-trafego' },
  },

  'google-ads-meta-ads-pousadas-litoral': {
    sections: [
      {
        heading: 'Dois canais, dois momentos do funil',
        paragraphs: [
          'Google Ads e Meta Ads não são concorrentes, são complementares. O Google captura quem já decidiu ir para o litoral cearense e está escolhendo a pousada: alta intenção, alto custo por clique, alta taxa de conversão. O Meta cria o desejo de ir antes que a decisão exista: custo menor, alcance maior, resultado que se constrói ao longo do tempo.',
          'Para pousadas no litoral cearense, a estratégia mais eficiente combina as duas plataformas em momentos diferentes da jornada do hóspede. O Meta trabalha a consciência e o desejo; o Google captura a intenção. Quem usa apenas uma das duas cobre metade do funil, e perde reservas que poderiam ter sido suas.',
        ],
      },
      {
        heading: 'Quando usar cada plataforma',
        paragraphs: [
          'Use Google Ads quando o objetivo é capturar demanda existente: turistas que já pesquisam "pousada em Jericoacoara" ou "hotel em Cumbuco". A palavra-chave define a intenção, e o anúncio, a landing page e o processo de reserva é o que determina se essa intenção vira receita.',
          'Use Meta Ads quando o objetivo é criar demanda ou reativar hóspedes: mostrar o destino para quem ainda não planejou a viagem, fazer remarketing para quem visitou o site mas não reservou, ou criar campanhas de fidelização para hóspedes anteriores. O Meta trabalha com imagem e emoção, perfeito para vender a experiência antes da chegada.',
        ],
      },
      {
        heading: 'O orçamento ideal entre as duas plataformas',
        paragraphs: [
          'A distribuição ideal para pousadas no litoral cearense varia com a sazonalidade. Na alta temporada, quando a demanda já existe e a urgência é real, concentrar 60% no Google Ads e 40% no Meta faz mais sentido. Na baixa temporada, inverter a proporção, mais Meta para criar demanda, menos Google para capturar uma demanda menor.',
          'Independente da distribuição, o importante é manter ambas as plataformas ativas o ano todo, com orçamentos variáveis conforme a demanda, mas nunca zerados. Pousadas que desligam os anúncios na baixa temporada perdem visibilidade exatamente quando os viajantes de perfil mais qualificado (que viajam fora do pico) estão pesquisando.',
        ],
      },
    ],
    pullQuote: 'Google captura quem já quer ir. Meta cria o desejo de ir. Para lotação o ano todo, você precisa dos dois.',
    cta: { heading: 'Monte uma estratégia completa de tráfego pago para sua pousada.', label: 'Quero uma estratégia integrada de anúncios', href: '/servicos/gestao-de-trafego' },
  },

  'trafego-pago-pipa-turistas-rio-sp': {
    sections: [
      {
        heading: 'Pipa e o público do sudeste: perfeitos para Meta Ads',
        paragraphs: [
          'Pipa é o destino favorito de um perfil muito específico de viajante: moradores do Rio de Janeiro e de São Paulo com renda acima da média, entre 28 e 45 anos, que buscam praias com personalidade, gastronomia de qualidade e menos multidão. Esse perfil é imensamente segmentável no Meta Ads, e responde muito bem a conteúdo visual que comunica estilo de vida.',
          'A vantagem geográfica do Meta Ads para pousadas em Pipa é poder criar campanhas específicas para Rio e São Paulo, cidades com milhões de habitantes dentro do perfil ideal. Com orçamento relativamente pequeno, é possível impactar dezenas de milhares de pessoas do público certo toda semana.',
        ],
      },
      {
        heading: 'O criativo que converte para Pipa',
        paragraphs: [
          'O turista do sudeste que escolhe Pipa não busca sol e praia genérica, busca autenticidade, boas experiências e uma dose de aventura. O criativo que converte para esse público comunica personalidade: a falésia ao pôr do sol, a gastronomia local de qualidade, a pousada com charme e cuidado no detalhe, as trilhas e a natureza preservada.',
          'Vídeos com 20 a 45 segundos que mostram a Pipa de forma autêntica, sem filtro excessivo, com som ambiente, com pessoas reais curtindo, têm performance muito superior a fotos estáticas estilizadas. O público do sudeste tem olho bem calibrado para "forçado" e reage melhor ao que parece real.',
        ],
      },
      {
        heading: 'Sazonalidade e como trabalhar a baixa temporada',
        paragraphs: [
          'A demanda por Pipa do sudeste tem picos em julho, dezembro-janeiro e feriados prolongados. Mas a baixa temporada tem um potencial subestimado: o perfil de viajante que vai a Pipa fora do pico tem renda mais alta, tolera preço maior e é exatamente o tipo de hóspede que gera melhor margem para a pousada.',
          'Campanhas de Meta Ads na baixa temporada com mensagem de exclusividade, "Pipa fora de temporada: a melhor versão do destino", funcionam muito bem para esse público. Menos movimento, melhores preços e uma experiência mais intimista são argumentos que ressoam perfeitamente com o viajante do sudeste.',
        ],
      },
    ],
    pullQuote: 'O turista do Rio e de São Paulo quer Pipa, e o Meta Ads é o canal mais eficiente para lembrá-lo disso antes que ele escolha outro destino.',
    cta: { heading: 'Atraia turistas do Rio e de São Paulo para sua pousada em Pipa.', label: 'Quero anunciar no Meta Ads', href: '/servicos/gestao-de-trafego' },
  },
}
