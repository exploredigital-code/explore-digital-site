# Prompt para o Claude Code · redesign do somosexplore.com

> Copie tudo abaixo da linha e cole no Claude Code, dentro do repositório do site.
> Antes de colar, copie a pasta `explore-digital-site/` para `reference/redesign/` na raiz do projeto.

---

Você vai implementar o redesign do site da Explore Digital neste repositório Next.js. A referência completa está em `reference/redesign/`, com nove páginas HTML estáticas, o CSS do design system (`assets/explore.css`), o JS de comportamento (`assets/explore.js`), os assets já otimizados e o `SPEC.md` com todas as decisões.

**Leia `reference/redesign/SPEC.md` inteiro antes de escrever qualquer código.** Ele tem os tokens, as regras de cor, o sistema de mídia e a lista de correções técnicas. O HTML é a fonte de verdade do layout; o SPEC é a fonte de verdade das regras.

## Antes de começar

Faça um levantamento e me mostre antes de alterar nada:

1. Estrutura de rotas atual, incluindo como o i18n de PT, EN e ES está montado.
2. Onde vivem os textos: arquivos de tradução, CMS, ou hardcoded no componente.
3. De onde vêm os dados de portfólio, serviços e blog.
4. Como o formulário de contato está implementado hoje e para onde ele envia (e-mail e WhatsApp).
5. Onde estão os tokens de estilo hoje: Tailwind config, CSS global, styled-components.

Não comece a implementar antes de me mostrar esse levantamento e eu confirmar.

## Regras que não podem ser quebradas

- **Nada de em-dash em texto de interface.** Use vírgula, ponto ou dois pontos.
- **Português do Brasil** como idioma base. Todo texto novo entra pelo sistema de i18n existente, com chaves, nunca hardcoded. EN e ES ficam como TODO marcado, não invente tradução.
- **Não quebre as três línguas.** Se uma chave existe em PT, precisa existir em EN e ES, mesmo que temporariamente com o texto em PT e um comentário de pendência.
- **Preserve as URLs que já rankeiam.** Toda rota que mudar precisa de redirect 301 em `next.config`.
- **Não instale dependência nova sem me perguntar.** O CSS de referência é vanilla e não depende de nada.
- **Commits pequenos e descritivos**, um por fase. Não faça um commit gigante no final.

## Fase 1 · Fundação visual

Migre os tokens do SPEC seção 1 para onde o projeto já guarda estilo (Tailwind config ou CSS global, o que existir).

Instale as fontes:
- `assets/quanta-{400,500,700,800}.woff2` vão para a pasta de fontes públicas, carregadas com `next/font/local`, `display: swap`.
- Satoshi vem da Fontshare por CDN. Se preferir auto-hospedar, baixe e me avise.
- **Quanta só em título, número e rótulo caixa alta. Nunca em parágrafo.** Isso está justificado no SPEC seção 3.

Aplique as sete regras de cor do SPEC seção 2. As mais importantes, porque contrariam o que está no site hoje:
- Laranja `#E2762F` é acento único, só ação e detalhe. Todo destaque textual é verde.
- Texto sobre laranja é `#1B3025`, não branco. Branco reprova no contraste.
- O hover do botão laranja **clareia** para `#EC8B48`.
- O verde do WhatsApp `#25D366` sai do site inteiro, incluindo o botão flutuante.
- Nenhuma seção usa preto puro. O hero passa a ser verde com véu sobre o vídeo.

**Critério de aceite:** nenhum `#25D366`, `#030303` ou laranja como cor de texto sobrou no código. Rode uma busca para confirmar.

## Fase 2 · Correções técnicas urgentes

Estas independem do redesign e valem por si.

1. **Vídeo do hero.** O arquivo em produção é HEVC de 16 MB com áudio, e não toca de forma confiável em Firefox nem em parte dos Chrome. Substitua por `assets/hero.mp4` (H.264, 1280px, sem áudio, 2,6 MB, faststart) com `assets/hero-poster.jpg` como poster. Atributos: `autoplay muted loop playsinline preload="metadata"`. Esconda o vídeo em `prefers-reduced-motion`.

2. **Indexação.** O domínio não retorna resultado em busca pelo próprio nome. Investigue `robots.txt`, meta `noindex`, `next-sitemap` e o status no Search Console. Me reporte o que encontrar antes de mexer.

3. **Logo em fundo claro.** O wordmark é claro e desaparece sobre `#E3F3E6`. Gere e use uma variante escura nas seções claras.

## Fase 3 · Arquitetura de rotas

| De | Para | Ação |
|---|---|---|
| `/solucoes` | `/servicos` | redirect 301 |
| `/vagas` | `/carreiras` | redirect 301 |
| `/consultoria` | `/contato` | avaliar, pode manter |

Nav final, em todas as línguas: Portfólio, Serviços, Sobre, Carreiras, Blog, mais o CTA "Fale conosco". O item "Planos" deixa de existir. **Nav e rodapé precisam usar o mesmo nome para a mesma coisa**, o que não acontece hoje: a nav diz "Planos" e o rodapé diz "Serviços".

Rotas dinâmicas: `/servicos/[slug]` e `/portfolio/[slug]`.

## Fase 4 · Escopo de negócio

O site passa a falar **só de hotelaria e experiências**.

- Remova real estate de: nav, filtros de portfólio, opções do formulário, copy institucional, rodapé e metadados.
- Remova o case Terra Ventos e o item Livento do feed.
- Remova Naming da disciplina de Branding.
- Ajuste os contadores: "3 setores" vira "2 setores" onde aparecer.

Se algum desses conteúdos vier de CMS ou de dados, me pergunte antes de deletar registro.

## Fase 5 · Páginas

Implemente nesta ordem, uma por commit, usando o HTML de referência como layout e reaproveitando o que já existe de componente no projeto:

1. `servicos.html` → a página mais importante. Seis disciplinas: social media, performance ads, web design, motion, **automatizações** (nova) e branding. Cada uma com grade de mídia e cards de pacote.
2. `servico-producao-de-conteudo.html` e `servico-automatizacoes.html` → o mesmo template de detalhe. Os outros serviços seguem esse molde.
3. `carreiras.html` → manifesto, como trabalhamos, processo seletivo em quatro etapas com desafio pago, lista de vagas e formulário de candidatura.
4. `index.html`, `portfolio.html`, `case-cabare-du-vento.html`, `sobre.html`, `blog.html`, `contato.html`.

**Automatizações** é disciplina nova e tem três frentes: gestão do negócio, redes sociais e CRM. O conteúdo está pronto em `servico-automatizacoes.html`.

## Fase 6 · Sistema de mídia

Leia o SPEC seção 6 com atenção, porque isso contraria o instinto comum.

O acervo da Explore é majoritariamente **vertical**: reels 9:16 e carrossel 4:5. A grade foi desenhada para isso. Use `.v916` e `.v45` por padrão, e `16:9` só onde o material é horizontal de verdade, que é painel de resultado e site em desktop.

**Limite a largura da coluna, nunca a altura do slot.** Travar altura deforma a proporção do material.

No celular, `.midia.reels` e `.midia.verticais` viram trilho horizontal com scroll snap. Sem isso a página de serviços passa de 15.000px de rolagem.

Os `.slot-midia` são placeholders marcados. Quando eu passar o material real, eles viram componente de vídeo ou imagem. Por enquanto, mantenha os placeholders visíveis, com o rótulo dizendo o que entra ali.

## Fase 7 · Comportamento e acessibilidade

O `assets/explore.js` de referência já implementa tudo. Reescreva como componente React, mantendo o comportamento:

- **Menu mobile.** Abaixo de 600px a nav e o CTA somem e o hambúrguer abre o painel. Fecha no Escape. `aria-expanded` e `aria-label` sincronizados. Cuidado com um detalhe que me custou um bug: `display:flex` vence o atributo `hidden`, então a regra que esconde precisa ser explícita.
- **Formulário em três etapas.** Não avança sem escolher opção nem envia com campo vazio. Mostra aviso e devolve o foco para o campo que falta. As opções são `radiogroup` com `aria-checked`.
- FAQ com `aria-expanded`, filtros com `aria-pressed`, skip link e `<main>` como landmark.

**O formulário mantém a integração atual de e-mail e WhatsApp.** O campo mais importante é o **@ do Instagram do negócio**, que permite auditar o perfil antes da call. Garanta que ele é persistido e chega nas duas notificações.

## O que NÃO fazer

- Não invente depoimento, métrica ou data. Os placeholders estão marcados de propósito.
- Não traga de volta os depoimentos atuais (Rafael M., James K., Sofía R.). Sem sobrenome, empresa ou foto, eles lêem como fictícios e derrubam confiança. Só voltam com dado real.
- Não use imagem de banco em lugar nenhum. É o problema mais grave do site atual.
- Não refatore o que não faz parte deste escopo.
- Não faça deploy. Suba em branch e abra PR.

## Verificação antes de me entregar

Rode e me mostre o resultado:

1. `npm run build` sem erro nem warning novo.
2. Lighthouse nas rotas `/`, `/servicos` e `/contato`. Reporte performance, acessibilidade e SEO.
3. Confirme visualmente em 1440px e 390px que: o menu mobile abre e fecha, o formulário barra etapa vazia, os filtros de portfólio filtram, nenhuma peça vertical está deformada e nenhum botão de play cobre o rótulo.
4. Busca no código por `#25D366`, `#030303`, `real estate`, `Naming` e `Planos`. Todos devem retornar zero.
5. Liste o que ficou como TODO e o que precisa de decisão minha.

Comece pelo levantamento e me mostre antes de tocar em código.
