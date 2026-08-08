# Bundle do redesign · Explore Digital

## Como usar

1. Copie a pasta `reference/` inteira para a raiz do repositório do site.
2. Abra o Claude Code na raiz do projeto.
3. Cole o conteúdo de `PROMPT-CLAUDE-CODE.md` (tudo abaixo da linha divisória).

Estrutura esperada depois do passo 1:

```
seu-repo/
├── app/  (ou pages/)
├── public/
├── next.config.js
└── reference/
    └── redesign/
        ├── SPEC.md            <- regras e decisões
        ├── index.html         <- layout de referência
        ├── servicos.html
        ├── servico-producao-de-conteudo.html
        ├── servico-automatizacoes.html
        ├── portfolio.html
        ├── case-cabare-du-vento.html
        ├── sobre.html
        ├── carreiras.html
        ├── blog.html
        ├── contato.html
        └── assets/
            ├── explore.css    <- design system completo
            ├── explore.js     <- comportamento
            ├── quanta-400.woff2
            ├── quanta-500.woff2
            ├── quanta-700.woff2
            ├── quanta-800.woff2
            ├── logo.png
            ├── hero.mp4       <- H.264, 2,6 MB, substitui o HEVC de 16 MB
            └── hero-poster.jpg
```

## Sobre a pasta reference

Ela é material de consulta, não código de produção. Depois que o redesign estiver implementado e aprovado, pode ser removida do repositório ou movida para uma branch de documentação. Enquanto o trabalho estiver em andamento, mantenha, porque o Claude Code consulta o SPEC e o HTML a cada etapa.

Se quiser evitar que ela vá para o build, adicione ao `.gitignore` do deploy ou deixe fora do `public/`. Ela não é importada por nenhum código.

## Assets prontos para produção

Os arquivos abaixo podem ir direto para `public/` quando o Claude Code chegar na fase 2:

- `hero.mp4` e `hero-poster.jpg`
- `quanta-*.woff2` (quatro pesos, 85 KB no total)

O `logo.png` é o atual. Ainda falta a variante escura para uso em seção de fundo claro.
