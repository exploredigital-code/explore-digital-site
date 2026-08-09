/**
 * Bateria de verificacao pre-merge.
 *
 * Roda contra o servidor de PRODUCAO (`npm run build && npm run start`), e nao
 * contra o `next dev`: o dev nao aplica as mesmas otimizacoes e os dois
 * dividem o `.next`, entao medir em cima do dev mede outra coisa.
 *
 *   node verify-bateria.mjs
 */
import { chromium } from 'playwright'

const BASE = 'http://localhost:3000'
const linha = (n, v) => console.log('  ' + String(n).padEnd(44) + v)

const rotas = [
  '/pt', '/pt/servicos', '/pt/portfolio', '/pt/sobre', '/pt/carreiras',
  '/pt/consultoria', '/pt/consultoria/obrigado', '/pt/obrigado',
  '/pt/plano-de-acao', '/pt/bio', '/pt/blog',
  '/pt/servicos/producao-conteudo', '/pt/servicos/gestao-de-trafego',
  '/pt/servicos/cobertura-de-evento', '/pt/servicos/fotografia',
  // As duas de web entram porque sao as unicas do catalogo que mostram preco,
  // e uma guarda de preco que nao visita a pagina com preco nao guarda nada.
  '/pt/servicos/website-institucional', '/pt/servicos/landing-page',
  '/pt/portfolio/villa-conduru',
]

const b = await chromium.launch()

/* ───────────── 1. sitemap ───────────── */
console.log('\n█ SITEMAP')
const xml = await (await fetch(BASE + '/sitemap.xml')).text()
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
const caminhos = locs.map(u => new URL(u).pathname)
linha('URLs no sitemap', locs.length)
const p = await b.newPage()
const quebradas = [], redirecionadas = []
for (const c of [...new Set(caminhos)]) {
  const r = await fetch(BASE + c, { redirect: 'manual' })
  if (r.status >= 300 && r.status < 400) redirecionadas.push(c + ' -> ' + r.status)
  else if (r.status !== 200) quebradas.push(c + ' -> ' + r.status)
}
linha('URLs que nao respondem 200', quebradas.length ? quebradas.join(', ') : 'nenhuma')
linha('URLs do sitemap que redirecionam', redirecionadas.length ? redirecionadas.join(', ') : 'nenhuma')
for (const nova of ['/pt/servicos/cobertura-de-evento', '/pt/servicos/producao-conteudo', '/pt/servicos/gestao-de-trafego', '/pt/plano-de-acao']) {
  linha('rota nova esta no sitemap: ' + nova, caminhos.includes(nova) ? 'sim' : 'NAO')
}

/* ───────────── 2. links internos ───────────── */
console.log('\n█ LINKS INTERNOS')
const todos = new Set()
for (const r of rotas) {
  await p.goto(BASE + r, { waitUntil: 'domcontentloaded', timeout: 120000 }); await p.waitForTimeout(900)
  for (const h of await p.$$eval('a[href]', as => as.map(a => a.getAttribute('href'))))
    if (h && h.startsWith('/')) todos.add(h.split('#')[0])
}
const ruins = []
for (const h of [...todos].filter(Boolean)) {
  const r = await fetch(BASE + h, { redirect: 'manual' })
  if (r.status !== 200) ruins.push(`${h} -> ${r.status}` + (r.headers.get('location') ? ' -> ' + r.headers.get('location') : ''))
}
linha('links internos distintos', todos.size)
linha('apontando para 3xx ou erro', ruins.length ? '\n     ' + ruins.join('\n     ') : 'nenhum')

/* ───────────── 3. R$ fora do permitido ───────────── */
console.log('\n█ VALORES EM R$')
const achados = []
for (const r of rotas) {
  await p.goto(BASE + r, { waitUntil: 'domcontentloaded', timeout: 120000 }); await p.waitForTimeout(900)
  const t = await p.evaluate(() => document.body.innerText)
  const vals = [...new Set(t.match(/R\$\s?[\d.,]+/g) || [])]
  if (vals.length) achados.push([r, vals])
}
if (!achados.length) linha('nenhum valor em R$ em rota nenhuma', '')
// A regra e preco de projeto fora do site, com a /plano-de-acao como unica
// pagina de preco. As duas de web sao a excecao declarada: o que aparece la e
// manutencao mensal, valor baixo, e preco visivel em servico pequeno gera
// confianca. O valor do projeto continua fora, porque depende do diagnostico,
// entao a excecao vem com um teto: se aparecer numero acima de R$ 200 numa
// delas, deixou de ser manutencao e a guarda tem que reclamar.
const MANUTENCAO_TETO = 200
const excecaoWeb = ['/pt/servicos/website-institucional', '/pt/servicos/landing-page']
for (const [r, v] of achados) {
  let permitido = r === '/pt/plano-de-acao' || r === '/pt/servicos/gestao-de-trafego'
  if (excecaoWeb.includes(r)) {
    const acima = v.filter(x => Number(x.replace(/[^\d,]/g, '').replace(',', '.')) > MANUTENCAO_TETO)
    permitido = acima.length === 0
    if (!permitido) linha('TETO DE MANUTENCAO ESTOURADO ' + r, acima.join(', '))
  }
  linha((permitido ? 'ok (permitido) ' : 'FORA DA REGRA ') + r, v.join(', '))
}

/* ───────────── 4. em-dash na tela ───────────── */
console.log('\n█ EM-DASH NA TELA')
const comTravessao = []
for (const r of [...rotas, '/pt/blog/site-pousada-jericoacoara']) {
  await p.goto(BASE + r, { waitUntil: 'domcontentloaded', timeout: 120000 }); await p.waitForTimeout(900)
  const n = await p.evaluate(() => (document.body.innerText.match(/—/g) || []).length)
  const titulo = await p.title()
  if (n || titulo.includes('—')) comTravessao.push(`${r}: ${n} no corpo${titulo.includes('—') ? ', e no <title>' : ''}`)
}
linha('rotas com em-dash', comTravessao.length ? '\n     ' + comTravessao.join('\n     ') : 'nenhuma')

/* ───────────── 5. alturas no celular ───────────── */
console.log('\n█ ALTURA NO CELULAR (390x844)')
const m = await b.newPage({ viewport: { width: 390, height: 844 } })
for (const r of rotas) {
  await m.goto(BASE + r, { waitUntil: 'domcontentloaded', timeout: 120000 }); await m.waitForTimeout(1200)
  await m.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await m.waitForTimeout(700)
  const d = await m.evaluate(() => ({
    h: document.documentElement.scrollHeight,
    estoura: document.documentElement.scrollWidth > window.innerWidth + 1,
    largura: document.documentElement.scrollWidth,
  }))
  linha(r, `${d.h}px` + (d.estoura ? `  ⚠ ROLA NA HORIZONTAL (${d.largura}px)` : ''))
}

await b.close()
