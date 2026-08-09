import type { MetadataRoute } from 'next'
import { LOCALES, SITE_URL, languageAlternates } from '@/lib/site'
import { projects } from '@/data/portfolio'
import { produtos } from '@/data/services'
import { blogPosts } from '@/data/blog-posts'

/**
 * Mapa do site para os três idiomas.
 *
 * O blog EN/ES fica de fora enquanto os 60 posts existirem só em português:
 * publicar a mesma URL traduzida na interface mas com o texto em PT é conteúdo
 * duplicado e desperdiça orçamento de rastreio.
 */

/**
 * Caminhos que respondem 301 (ver next.config.ts). Um sitemap que anuncia URL
 * redirecionada gasta orçamento de rastreio e contradiz o próprio redirect.
 * A lista é uma rede de segurança: nenhuma rota daqui entra no mapa, mesmo que
 * o dado que a gera ainda exista.
 */
const REDIRECIONADAS = new Set([
  '/solucoes', '/vagas', '/marketplace', '/servicos/naming', '/servicos/sistemas',
  // Catálogo de 2026: sete rotas de serviço saíram do catálogo e respondem 301.
  '/servicos/captacoes', '/servicos/meta-ads', '/servicos/google-ads',
  '/servicos/sistemas-internos', '/servicos/conteudo-serie',
  '/servicos/motion-anuncio', '/servicos/motion',
])

type Entry = {
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  /** Fora do sitemap em EN/ES (conteúdo ainda não traduzido). */
  ptOnly?: boolean
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticPages: Entry[] = [
    { path: '',            priority: 1.0,  changeFrequency: 'weekly'  },
    { path: '/consultoria', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/servicos',   priority: 0.9,  changeFrequency: 'monthly' },
    { path: '/servicos/sob-demanda', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/portfolio',  priority: 0.8,  changeFrequency: 'monthly' },
    { path: '/sobre',      priority: 0.6,  changeFrequency: 'yearly'  },
    { path: '/blog',       priority: 0.7,  changeFrequency: 'weekly', ptOnly: true },
    { path: '/carreiras',  priority: 0.4,  changeFrequency: 'monthly' },
  ]

  // Cases ocultos (`hidden`) devolvem 404 — não podem entrar no mapa.
  const projectPages: Entry[] = projects
    .filter(p => !p.hidden)
    .map(p => ({ path: `/portfolio/${p.slug}`, priority: 0.7, changeFrequency: 'monthly' }))

  // As disciplinas continuam existindo como estrutura interna de `services.ts`,
  // mas deixaram de ter rota. Quem entra no mapa agora é o produto, que é o
  // que a pessoa procura e o que ela compra.
  //
  // O recorrente entra com prioridade acima do pontual: são dois produtos e
  // representam a receita que se repete.
  const servicePages: Entry[] = produtos.map(p => ({
    path: `/servicos/${p.slug}`,
    priority: p.period === 'monthly' ? 0.85 : 0.8,
    changeFrequency: 'monthly',
  }))

  const blogPages: Entry[] = blogPosts.map(p => ({
    path: `/blog/${p.slug}`,
    priority: 0.6,
    changeFrequency: 'monthly',
    ptOnly: true,
  }))

  const all = [...staticPages, ...projectPages, ...servicePages, ...blogPages]
    .filter(e => !REDIRECIONADAS.has(e.path))

  return all.flatMap(entry =>
    LOCALES
      .filter(locale => !entry.ptOnly || locale === 'pt')
      .map(locale => ({
        url: `${SITE_URL}/${locale}${entry.path}`,
        lastModified,
        changeFrequency: entry.changeFrequency,
        priority: entry.priority,
        ...(entry.ptOnly ? {} : { alternates: { languages: languageAlternates(entry.path) } }),
      }))
  )
}
