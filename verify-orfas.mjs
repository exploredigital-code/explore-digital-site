import fs from 'fs'
import path from 'path'

/**
 * Varredura de chaves orfas, presa ao NAMESPACE.
 *
 * Duas armadilhas que a varredura ingenua nao pega, e que o cliente ja viu
 * morder duas vezes:
 *
 *  1. Chave montada por template. `s${step}_title` no wizard da consultoria
 *     faz qualquer coisa terminada em `_title` parecer usada. Os padroes
 *     dinamicos sao resolvidos aqui, com os valores reais, e presos ao
 *     namespace onde vivem.
 *
 *  2. Mesmo nome de folha em namespaces diferentes. `cta_title` existe em
 *     cinco namespaces; quatro renderizam e o de `service_detail` nao. Procurar
 *     a string solta diria que todos estao vivos.
 *
 * Entao: para cada ARQUIVO, descobre-se qual variavel aponta para qual
 * namespace, e so as chamadas daquela variavel contam para aquele namespace.
 */

const msgs = JSON.parse(fs.readFileSync('messages/pt.json', 'utf8'))
const folhas = (o, p = []) => Object.entries(o).flatMap(([k, v]) =>
  v && typeof v === 'object' && !Array.isArray(v) ? folhas(v, [...p, k]) : [[...p, k]])
const todas = folhas(msgs)

const arquivos = []
const varre = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
  const f = path.join(d, e.name)
  if (e.isDirectory()) { if (!['node_modules', '.next', '.git'].includes(e.name)) varre(f) }
  else if (/\.(tsx?|mjs)$/.test(e.name)) arquivos.push(f)
})
for (const d of ['app', 'components', 'lib', 'data']) varre(d)

/** namespace -> Set de chaves relativas citadas por alguma variavel dele */
const citadas = {}
const cita = (ns, chave, onde) => {
  (citadas[ns] ??= new Map()).set(chave, (citadas[ns].get(chave) ?? new Set()).add(onde))
}

const servicosTs = fs.readFileSync('data/services.ts', 'utf8')
const grupos = [...servicosTs.matchAll(/GRUPO_ORDER: Grupo\[\] = \[([^\]]+)\]/g)]
  .flatMap(m => [...m[1].matchAll(/'([\w-]+)'/g)].map(x => x[1]))
const slugsMensais = [...servicosTs.matchAll(/slug: '([\w-]+)',[\s\S]{0,400}?period: 'monthly'/g)].map(m => m[1])
const nSub = (servicosTs.match(/^\s{8}slug: '/gm) || []).length
const nGrupo = (servicosTs.match(/^\s{8}grupo: '/gm) || []).length

for (const f of arquivos) {
  const src = fs.readFileSync(f, 'utf8')
  // variavel -> namespace
  const vars = new Map()
  for (const m of src.matchAll(/(?:const|let)\s+(\w+)\s*=\s*(?:await\s+)?useTranslations\(\s*['"]([\w.]+)['"]\s*\)/g)) vars.set(m[1], m[2])
  for (const m of src.matchAll(/(?:const|let)\s+(\w+)\s*=\s*await\s+getTranslations\(\{[^}]*namespace:\s*['"]([\w.]+)['"][^}]*\}\)/g)) vars.set(m[1], m[2])
  // Toda string literal do arquivo conta para TODO namespace que ele liga.
  //
  // Grosseiro de proposito. A chave chega a `t()` por indirecao em vários
  // lugares (`t(p.roleKey)` com `roleKey: 'f1_role'` numa const, `t(k)` a
  // partir de um mapa de setor, `labelKey` numa lista de filtros), e exigir a
  // chamada direta apagaria copy viva. O erro fica para o lado de deixar
  // sobrando, que se conserta, e nao para o de apagar, que quebra a tela.
  const literaisDoArquivo = [...src.matchAll(/['"`]([\w.-]+)['"`]/g)].map(m => m[1])
  for (const [, ns] of vars) for (const lit of literaisDoArquivo) cita(ns, lit, f)

  for (const [v, ns] of vars) {
    // v('chave')  |  v.raw('chave')  |  v(`chave`)
    for (const m of src.matchAll(new RegExp(`\\b${v}(?:\\.raw)?\\(\\s*['"\`]([\\w.-]+)['"\`]`, 'g'))) cita(ns, m[1], f)
    // v(`prefixo${...}sufixo`) -> resolve com os valores reais
    for (const m of src.matchAll(new RegExp(`\\b${v}(?:\\.raw)?\\(\\s*\`([^\`]*\\$\\{[^\`]*)\``, 'g'))) {
      const tpl = m[1]
      if (ns === 'servicos' && /^grupo_\$\{/.test(tpl)) {
        const sufixo = tpl.replace(/^grupo_\$\{[^}]*\}/, '')
        for (const g of grupos) cita(ns, `grupo_${g}${sufixo}`, f)
        // `?? 'recorrente'` so alcanca algo se existir produto sem `grupo`
        const fallback = tpl.match(/\?\?\s*'([\w-]+)'/)
        if (fallback && nSub !== nGrupo) cita(ns, `grupo_${fallback[1]}${sufixo}`, f)
      } else if (ns === 'recorrente' && /^produtos\.\$\{/.test(tpl)) {
        for (const s of slugsMensais) cita(ns, `produtos.${s}`, f)
      } else if (ns === 'consultoria' && /^s\$\{/.test(tpl)) {
        const sufixo = tpl.replace(/^s\$\{[^}]*\}/, '')
        for (const n of [1, 2, 3, 4, 5]) cita(ns, `s${n}${sufixo}`, f)
      } else {
        cita(ns, '__TEMPLATE_NAO_RESOLVIDO__:' + tpl, f)
      }
    }
  }
}

const naoResolvidos = Object.entries(citadas).flatMap(([ns, m]) =>
  [...m.keys()].filter(k => k.startsWith('__TEMPLATE')).map(k => ns + ' -> ' + k))

const usada = caminho => {
  const ns = caminho[0]
  const rel = caminho.slice(1).join('.')
  const set = citadas[ns]
  if (!set) return null
  if (set.has(rel)) return 'direta'
  // o codigo pode ler o objeto/array inteiro e iterar
  for (let i = 1; i < caminho.length; i++) {
    const pai = caminho.slice(1, i).join('.')
    if (pai && set.has(pai)) return 'via pai `' + pai + '`'
  }
  return null
}

const orfas = todas.filter(c => !usada(c)).map(c => c.join('.'))
const porNs = {}
for (const o of orfas) (porNs[o.split('.')[0]] ??= []).push(o)

console.log('produtos:', nSub, '| com `grupo`:', nGrupo, '=> fallback `?? recorrente` e codigo', nSub === nGrupo ? 'MORTO' : 'VIVO')
console.log('grupos reais:', grupos.join(', '))
console.log('namespaces com consumidor:', Object.keys(citadas).sort().join(', '))
const semConsumidor = Object.keys(msgs).filter(ns => !citadas[ns])
console.log('namespaces SEM consumidor nenhum:', semConsumidor.length ? semConsumidor.join(', ') : 'nenhum')
if (naoResolvidos.length) console.log('\n!! templates nao resolvidos (revisar a mao):\n  ' + naoResolvidos.join('\n  '))
console.log('\nfolhas totais:', todas.length, '| orfas:', orfas.length, '\n')
for (const [ns, ks] of Object.entries(porNs).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`── ${ns} (${ks.length})`)
  for (const k of ks) console.log('   ' + k)
}
fs.writeFileSync('.suspeitas.json', JSON.stringify(orfas, null, 1))
