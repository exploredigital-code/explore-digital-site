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
      //
      // GRADIENTE tambem conta. Ler so `background-color` foi o segundo ponto
      // cego: numa `/portfolio/[slug]` o rotulo do video fica sobre um
      // `radial-gradient` verde, o `background-color` da camada e transparente,
      // o caminhador subia ate o branco da pagina e reportava branco sobre
      // branco, 1:1. O texto esta legivel na tela.
      //
      // Como gradiente nao tem UMA cor, cada parada vira um fundo candidato e
      // no fim vale a PIOR. Errar para o lado de reclamar demais e o lado
      // certo de errar numa guarda de acessibilidade.
      const fundosDe = el => {
        const camadas = []
        let n = el
        while (n && n !== document.documentElement) {
          const cs = getComputedStyle(n)
          const bg = parse(cs.backgroundColor)
          const a = bg.length === 4 ? bg[3] : (bg.length === 3 ? 1 : 0)
          if (a > 0.001) {
            camadas.push([bg.slice(0, 3).concat(a)])
            if (a > 0.99) break
          }
          const bi = cs.backgroundImage
          if (bi && bi !== 'none') {
            const paradas = [...bi.matchAll(/rgba?\(([\d.\s,]+)\)/g)]
              .map(m => m[1].split(',').map(Number))
              .filter(c => c.length >= 3 && (c.length === 3 || c[3] > 0.05))
              .map(c => c.slice(0, 3).concat(c.length === 4 ? c[3] : 1))
            if (paradas.length) {
              camadas.push(paradas)
              if (paradas.every(c => c[3] > 0.99)) break
            }
          }
          n = n.parentElement
        }
        // Produto das alternativas, limitado para nao explodir em gradiente
        // com muitas paradas.
        let acc = [[255, 255, 255]]
        for (const alternativas of camadas.reverse()) {
          const novo = []
          for (const base of acc) for (const c of alternativas) novo.push([0, 1, 2].map(i => c[i] * c[3] + base[i] * (1 - c[3])))
          acc = novo.slice(0, 12)
        }
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
        // `aria-hidden` e decoracao declarada: nao e lida e a WCAG nao cobra
        // contraste dela. A aspa de 64px atras da citacao do blog e o caso: ela
        // PRECISA ser fraca, e cobrar 3:1 de uma marca d'agua so gera ruido.
        if (el.closest('[aria-hidden="true"], [aria-hidden=""]')) continue

        const r = el.getBoundingClientRect()
        if (!r.width || !r.height) continue

        // A pior das paradas do gradiente e a que vale.
        let ratio = Infinity, fundo = null
        for (const bg of fundosDe(el)) {
          const fg = mistura(parse(cs.color), bg)
          const L1 = lum(fg), L2 = lum(bg)
          const r2 = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
          if (r2 < ratio) { ratio = r2; fundo = bg }
        }

        const px = parseFloat(cs.fontSize)
        const grande = px >= 24 || (px >= 18.66 && Number(cs.fontWeight) >= 700)
        const minimo = grande ? 3 : 4.5
        if (ratio < minimo) {
          // Marcado para a CONFIRMACAO NA TELA. A leitura do DOM e so a
          // peneira: ela nao ve veu irmao desenhado por cima do fundo, e por
          // isso reprovava a tagline dos heros, que na tela passa.
          el.dataset.contrasteSuspeito = String(out.length)
          out.push({
            txt: txt.slice(0, 46), ratio: +ratio.toFixed(2), minimo, px, cor: cs.color, peso: cs.fontWeight,
            fundo: '#' + fundo.map(v => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase(),
            token: ((el.className || '').toString().match(/\btext-[\w./\[\]#-]+/g) || []).join(' ') || '(herdado)',
          })
        }
      }
      return out
    })

    // ── CONFIRMACAO NA TELA ──
    //
    // Toda suspeita da peneira e refeita contra o PIXEL: some com o texto,
    // fotografa a caixa dele e tira a cor media do que sobrou. Isso ve
    // gradiente, imagem, veu irmao e qualquer coisa que a leitura de estilo
    // nao alcanca. Sem esta passada a ferramenta acusava a etiqueta do blog e
    // as taglines dos heros, que na tela passam com folga.
    const confirmados = []
    for (let i = 0; i < ruins.length; i++) {
      const loc = p.locator(`[data-contraste-suspeito="${i}"]`).first()
      let media
      try {
        await loc.evaluate(el => el.scrollIntoView({ block: 'center' }))
        await p.waitForTimeout(90)
        await loc.evaluate(el => { el.dataset.contrasteOculto = '1' })
        await p.addStyleTag({ content: '[data-contraste-oculto="1"]{color:transparent !important}' })
        const buf = await loc.screenshot({ timeout: 5000 })
        media = await p.evaluate(async d => {
          const img = new Image()
          await new Promise(r => { img.onload = r; img.onerror = r; img.src = 'data:image/png;base64,' + d })
          const c = document.createElement('canvas'); c.width = img.width; c.height = img.height
          const x = c.getContext('2d'); x.drawImage(img, 0, 0)
          const px = x.getImageData(0, 0, c.width, c.height).data
          let r = 0, g = 0, b = 0, n = 0
          for (let k = 0; k < px.length; k += 4) { r += px[k]; g += px[k + 1]; b += px[k + 2]; n++ }
          return n ? [r / n, g / n, b / n] : null
        }, buf.toString('base64'))
        await loc.evaluate(el => { delete el.dataset.contrasteOculto })
      } catch { media = null }

      if (!media) { confirmados.push({ ...ruins[i], conferido: 'nao deu' }); continue }

      const f2 = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4) }
      const lum2 = ([r, g, b]) => 0.2126 * f2(r) + 0.7152 * f2(g) + 0.0722 * f2(b)
      const cor = (ruins[i].cor.match(/[\d.]+/g) || []).map(Number)
      const a = cor.length === 4 ? cor[3] : 1
      const fg = [0, 1, 2].map(k => cor[k] * a + media[k] * (1 - a))
      const L1 = lum2(fg), L2 = lum2(media)
      const real = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
      if (real < ruins[i].minimo) {
        confirmados.push({ ...ruins[i], ratio: +real.toFixed(2), fundo: '#' + media.map(v => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase() })
      }
    }

    reprovas += confirmados.length
    const desc = confirmados.map(c => ({ t: c.txt.slice(0, 26), r: c.ratio, min: c.minimo, token: c.token, fundo: c.fundo }))
    console.log(rota.padEnd(36), nome.padEnd(5),
      confirmados.length ? `REPROVA ${confirmados.length}/${ruins.length} ` + JSON.stringify(desc.slice(0, 4)) : `contraste ok${ruins.length ? ` (${ruins.length} suspeita(s) descartada(s) na tela)` : ''}`)
    await ctx.close()
  }
}

await b.close()
console.log('\ntotal de pontos abaixo do minimo:', reprovas)
process.exit(reprovas ? 1 : 0)
