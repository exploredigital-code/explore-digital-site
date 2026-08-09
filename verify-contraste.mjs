import { chromium, devices } from 'playwright'

/**
 * Varredura de CONTRASTE, na tela, nas duas larguras.
 *
 * Existe porque os dois ultimos defeitos de contraste do projeto so apareciam
 * no celular, atras de `md:hidden`, e as conferencias eram feitas no desktop:
 * os chips do hub, e a chamada do card de portfolio a 1,9:1. Conferir a olho
 * numa largura so ja falhou duas vezes.
 *
 * Roda contra o servidor de PRODUCAO (`next build` e depois `next start`),
 * pelo mesmo motivo da verify-bateria: o `next dev` divide o `.next` com o
 * build e serve outra coisa.
 *
 * Rola a pagina inteira antes de medir. Sem isso metade das secoes esta em
 * opacidade zero esperando o AnimateIn, e o calculo mede fundo contra fundo.
 *
 * Criterio da WCAG AA: 4,5:1 no texto corrido e 3:1 no texto grande, que e
 * 24px ou 18,66px em negrito.
 *
 * Uso:  node verify-contraste.mjs [rota ...]
 *       BASE=http://localhost:3111 node verify-contraste.mjs
 */

const BASE = process.env.BASE ?? 'http://localhost:3000'

const PADRAO = [
  'pt', 'pt/servicos', 'pt/portfolio', 'pt/sobre', 'pt/plano-de-acao',
  'pt/consultoria', 'pt/blog', 'pt/carreiras',
  'pt/servicos/website-institucional', 'pt/servicos/landing-page',
  'pt/servicos/producao-conteudo', 'pt/servicos/fotografia',
]

const rotas = process.argv.slice(2).length ? process.argv.slice(2) : PADRAO

let reprovas = 0
const b = await chromium.launch()

for (const rota of rotas) {
  for (const [nome, opts] of [['390', devices['iPhone 13']], ['1440', { viewport: { width: 1440, height: 900 } }]]) {
    const ctx = await b.newContext(opts)
    const p = await ctx.newPage()
    await p.goto(BASE + '/' + rota, { waitUntil: 'networkidle' })
    await p.waitForTimeout(1200)

    await p.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60))
      }
      window.scrollTo(0, 0)
    })
    await p.waitForTimeout(700)

    const ruins = await p.evaluate(() => {
      const lum = ([r, g, b]) => {
        const f = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4) }
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
      }
      const parse = s => (s.match(/[\d.]+/g) || []).slice(0, 4).map(Number)
      const mistura = (fg, bg) => {
        const a = fg.length === 4 ? fg[3] : 1
        return [0, 1, 2].map(i => fg[i] * a + bg[i] * (1 - a))
      }
      // Sobe COMPONDO as camadas, e nao pulando as semitransparentes.
      //
      // Pular era o comportamento anterior e produzia falso positivo grave: a
      // etiqueta de categoria do blog tem fundo `verde/60`, alfa abaixo do
      // corte, entao a camada era ignorada e o branco do texto era medido
      // contra o branco da pagina. Dava 1:1, "texto invisivel", numa etiqueta
      // que na tela esta perfeitamente legivel.
      //
      // Agora cada camada semitransparente entra na conta na ordem certa, de
      // dentro para fora, ate encontrar a primeira opaca.
      const fundoDe = el => {
        const camadas = []
        let n = el
        while (n && n !== document.documentElement) {
          const bg = parse(getComputedStyle(n).backgroundColor)
          const a = bg.length === 4 ? bg[3] : (bg.length === 3 ? 1 : 0)
          if (a > 0.001) {
            camadas.push(bg.slice(0, 3).concat(a))
            if (a > 0.99) break
          }
          n = n.parentElement
        }
        // Da camada mais externa para a mais interna, empilhando.
        let acc = [255, 255, 255]
        for (const c of camadas.reverse()) acc = [0, 1, 2].map(i => c[i] * c[3] + acc[i] * (1 - c[3]))
        return acc
      }

      const out = []
      // `button` faltava, e a falta escondeu metade de um defeito real: a cor
      // fraca do seletor de idioma esta no botao, entao so o caret, que mora
      // num span filho, era medido. A sigla do idioma reprovava junto e a
      // varredura dizia que estava tudo bem. `label`, `strong`, `em`, `td` e
      // `th` entram pelo mesmo motivo: texto que ninguem estava olhando.
      for (const el of document.querySelectorAll('p, span, h1, h2, h3, h4, li, a, div, button, label, strong, em, td, th, summary, figcaption')) {
        // So o texto proprio do elemento. Sem isso o contêiner herda o texto
        // dos filhos e a mesma frase e medida em cada nivel da arvore.
        const txt = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join('')
        if (!txt) continue

        const cs = getComputedStyle(el)
        if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) < 0.9) continue
        // Recortado para fora da tela e devolvido no :focus, que e como o skip
        // link se esconde sem sair da ordem de tabulacao. Medir a cor dele no
        // estado escondido da 1:1 e nao quer dizer nada.
        if (cs.clipPath.startsWith('inset(50%') || cs.clip === 'rect(0px, 0px, 0px, 0px)') continue

        const r = el.getBoundingClientRect()
        if (!r.width || !r.height) continue

        const bg = fundoDe(el)
        const fg = mistura(parse(cs.color), bg)
        const L1 = lum(fg), L2 = lum(bg)
        const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)

        const px = parseFloat(cs.fontSize)
        const grande = px >= 24 || (px >= 18.66 && Number(cs.fontWeight) >= 700)
        const minimo = grande ? 3 : 4.5
        if (ratio < minimo) out.push({ txt: txt.slice(0, 46), ratio: +ratio.toFixed(2), minimo, px, cor: cs.color })
      }
      return out
    })

    reprovas += ruins.length
    console.log(rota.padEnd(36), nome.padEnd(5), ruins.length ? 'REPROVA ' + JSON.stringify(ruins.slice(0, 6)) : 'contraste ok')
    await ctx.close()
  }
}

await b.close()
console.log('\ntotal de pontos abaixo do minimo:', reprovas)
process.exit(reprovas ? 1 : 0)
