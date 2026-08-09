# Explore Digital · spec de implementação

Referência visual e estrutural para portar este HTML estático para o Next.js de produção (somosexplore.com). Cada `.html` desta pasta é a fonte de verdade do layout. O sistema visual está em `assets/explore.css` e o comportamento em `assets/explore.js`.

## 1. Tokens

Verdes extraídos do logo e dos prints do site atual. Laranja amostrado do pôr do sol da própria foto do Cabaré du Vento (matiz 29 a 32 graus, saturação 0,67).

| Token | Hex | Uso |
|---|---|---|
| `--verde` | `#1B3025` | fundo padrão e seções escuras |
| `--verde-card` | `#2A4233` | cards, faixas de CTA, slots de mídia |
| `--verde-linha` | `#334C3D` | divisórias sobre escuro |
| `--verde-borda` | `#4E6A59` | borda de botão secundário sobre escuro |
| `--verde-fundo-rodape` | `#152419` | rodapé |
| `--verde-luz` | `#A9CDB2` | TEXTO de destaque sobre fundo escuro |
| `--verde-medio` | `#2F5E4A` | TEXTO de destaque sobre fundo claro |
| `--menta` | `#FFFFFF` | texto principal sobre escuro |
| `--menta-fraca` | `rgba(255,255,255,.62)` | texto secundário sobre escuro |
| `--menta-clara` | `#E3F3E6` | fundo das seções claras |
| `--tinta-70` / `--tinta-50` | `rgba(27,48,37,.70)` | texto sobre fundo claro |
| `--sol` | `#E2762F` | ACENTO ÚNICO, só ação e detalhe |
| `--sol-forte` | `#EC8B48` | hover do acento (clareia, não escurece) |

## 2. Regras de cor que não podem ser quebradas

1. **Laranja nunca é texto de conteúdo.** Ele existe em: botão cheio, filtro ativo, botão de play, WhatsApp flutuante, linha do eyebrow, marcador de lista, barra do depoimento, ícone do FAQ aberto e estados de hover. Todo destaque textual é verde.
2. **Texto sobre laranja é `--verde`, não branco.** Branco sobre `#E2762F` dá 2,87 de contraste e reprova. Verde escuro dá 4,59.
3. **O hover do botão laranja clareia.** Como o texto é escuro, escurecer o fundo derruba o contraste.
4. **Um botão cheio por dobra.** Os demais são `.btn-linha` ou `.btn-linha-claro`. Exceção legítima: listas de ações equivalentes, como a lista de vagas.
5. **Botão cheio muda com o fundo.** Seção escura usa `.btn-sol`. Seção clara usa `.btn-verde`.
6. **O verde do WhatsApp (`#25D366`) não existe mais no site.**
7. **Preto puro não é fundo de seção.** O hero usa `--verde` com véu em gradiente sobre o vídeo.

Contrastes verificados por cálculo WCAG: branco sobre verde 14,04 · secundário sobre verde 6,33 · verde-luz sobre verde 8,06 · verde sobre laranja 4,59 · hover 5,58 · verde sobre menta clara 12,18 · secundário sobre menta clara 5,02 · verde-médio sobre menta clara 6,46. Todos passam em AA.

## 3. Tipografia

- Display: **Quanta Grotesk Pro** (400, 500, 700, 800), já em WOFF2 em `assets/`. Só título, número, rótulo caixa alta e nome de case. Nunca parágrafo: a razão x-height/caixa-alta é 0,714 e o `o` é bem mais largo que o `n`, o que cansa em texto corrido.
- Corpo: **Satoshi** (Fontshare, gratuita para uso comercial). Alternativa: Switzer.
- **Pendência jurídica:** confirmar licença de webfont da Quanta antes do deploy. Licença desktop não cobre site.

## 4. Rotas

| Arquivo | Rota no Next | Observação |
|---|---|---|
| `index.html` | `/[locale]` | hero em vídeo |
| `servicos.html` | `/[locale]/servicos` | substitui `/solucoes`, redirect 301 |
| `servico-producao-de-conteudo.html` | `/[locale]/servicos/[slug]` | template de detalhe, com preço |
| `servico-automatizacoes.html` | `/[locale]/servicos/[slug]` | mesma estrutura, sem preço |
| `portfolio.html` | `/[locale]/portfolio` | filtro por setor |
| `case-cabare-du-vento.html` | `/[locale]/portfolio/[slug]` | template de case |
| `sobre.html` | `/[locale]/sobre` | |
| `carreiras.html` | `/[locale]/carreiras` | substitui `/vagas`, redirect 301 |
| `blog.html` | `/[locale]/blog` | |
| `contato.html` | `/[locale]/contato` | |

Nav final: Portfólio, Serviços, Sobre, Carreiras, Blog, mais o CTA. "Planos" deixa de existir. Nav e rodapé usam o mesmo nome para a mesma coisa.

## 5. Escopo de negócio

O site fala **só de hotelaria e experiências**. Real estate foi removido de nav, filtros, formulários, portfólio, copy e rodapé. Naming saiu de Branding.

**Seis disciplinas:** social media, performance ads, web design, motion, automatizações, branding.

**Automatizações** é a disciplina nova, com três frentes: gestão do negócio (reserva, ocupação, financeiro em painel), redes sociais (conteúdo gerado em série, como a tábua de maré do No Worries) e CRM (resposta automática, histórico, follow-up).

## 6. Sistema de mídia, vertical primeiro

O acervo da Explore é majoritariamente vertical (reels 9:16 e carrossel 4:5). A grade foi desenhada em cima disso, e não o contrário.

| Classe | Proporção | Quando usar |
|---|---|---|
| `.slot-midia.v916` | 9:16 | reels, story, scroll em celular, motion em loop |
| `.slot-midia.v45` | 4:5 | carrossel, grade de perfil, peça de branding |
| `.slot-midia.q11` | 1:1 | post quadrado antigo |
| `.slot-midia.h169` | 16:9 | só onde o material é horizontal de verdade: painel de resultado, site em desktop |

Grades disponíveis:

- `.midia.reels` empacota verticais em colunas estreitas (170 a 220px). Grade padrão de social e motion.
- `.midia.verticais` mesma lógica para 4:5, colunas de 210 a 280px.
- `.midia.destaque` combina uma peça vertical à esquerda com uma horizontal à direita que estica na mesma altura. Usar quando existe prova em painel além da peça social.

**Regra de largura, não de altura.** Vertical não pode ter altura travada, porque isso deforma a proporção do próprio material. Limita-se a largura da coluna. Uma versão anterior travou altura em 440px e quebrou o formato; foi revertida.

**No celular**, `.midia.reels` e `.midia.verticais` viram trilho horizontal com scroll snap, cada peça ocupando 62% da largura. Sem isso, quatro peças 9:16 empilhadas geram mais de 2.000px de rolagem por disciplina. A página de serviços caiu de 15.065px para 12.089px no mobile com essa mudança.

**O play fica acima do rótulo**, nunca sobreposto. O slot é coluna flex.

## 7. Correções técnicas obrigatórias

1. **Vídeo do hero.** O original é HEVC 1920x1080, 16 MB, com áudio, e não toca de forma confiável em Firefox nem em parte dos Chrome. O `assets/hero.mp4` é H.264, 1280px, sem áudio, 2,6 MB, com `+faststart` e poster. Servir com `autoplay muted loop playsinline` e desativar em `prefers-reduced-motion`.
2. **Fotos de banco.** Os cards de serviço do site atual usam imagem genérica. Todo `.slot-midia` marca onde entra material próprio.
3. **Indexação.** O domínio não retorna resultado em busca pelo próprio nome. Verificar `robots.txt`, `noindex`, sitemap e Search Console.
4. **Logo em fundo claro.** O wordmark é claro e some sobre `--menta-clara`. Gerar variante escura.

## 8. Comportamento (implementado em `explore.js`)

- **Menu mobile.** Abaixo de 600px a nav desktop e o CTA somem; o hambúrguer abre `#menu-mobile`. Fecha no Escape, com `aria-expanded` e `aria-label` sincronizados. Atenção: `display:flex` vence o atributo `hidden`, então `.menu-mobile[hidden]{display:none}` é obrigatório.
- **Formulário em 3 etapas.** Não avança sem escolher opção nem envia com campo vazio; mostra `.aviso` e devolve o foco. Grupo de opções é `radiogroup` com `aria-checked`.
- **FAQ** com `aria-expanded`. **Filtros** com `aria-pressed`, filtrando por `[data-setor]`.
- **Skip link** `.pular` e landmark `<main id="conteudo">`.

## 9. Auditoria visual, o que foi corrigido

Rodada em Chromium headless a 1440px e 390px, página por página, com testes de interação.

1. Botão de play sobrepondo o rótulo do slot.
2. Slots 9:16 virando torre no desktop e página de serviços passando de 15.000px no mobile.
3. Bloco de gargalos fora do container, desalinhado 46px do próprio título.
4. Nav mobile: o CTA quebrava em duas linhas e estourava a barra.
5. Botões do hero com larguras diferentes no mobile.
6. Stats em quatro linhas no mobile, agora 2x2.
7. Véu do hero fraco na faixa do texto.
8. Menu mobile inexistente, o que deixava o site sem navegação no celular.
9. `display:flex` vencendo o atributo `hidden`, fazendo o menu nascer aberto.

## 10. Placeholders a preencher antes do deploy

- Todo `.slot-midia`: reels, making of, painel de resultado, loop de motion, story de maré, fotos de time e de case.
- Métricas de Villa Conduru, Looping e Barraca do Kite.
- Preço: só Produção de conteúdo (R$ 1.700/mês) tem valor. O resto é "sob consulta".
- Depoimentos: o bloco `.depo` está vazio de propósito. Os atuais (Rafael M., James K., Sofía R., sem sobrenome nem empresa) lêem como fictícios. Só entram de volta com nome, negócio e foto reais.
- Datas do blog e do feed "Agora".
- Decidir se Maresias do Leme permanece como case histórico, já que saiu da carteira.
