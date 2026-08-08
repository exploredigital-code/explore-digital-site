import type { MetadataRoute } from 'next'
import { LOCALES, SITE_URL, languageAlternates } from '@/lib/site'
import { projects } from '@/data/portfolio'
import { servicesData } from '@/data/services'
import { blogPosts } from '@/data/blog-posts'

/**
 * Mapa do site para os três idiomas.
 *
 * O blog EN/ES fica de fora enquanto os 60 posts existirem só em português:
 * publicar a mesma URL traduzida na interface mas com o texto em PT é conteúdo
 * duplicado e desperdiça orçamento de rastreio.
 */

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
    { path: '/solucoes',   priority: 0.9,  changeFrequency: 'monthly' },
    { path: '/portfolio',  priority: 0.8,  changeFrequency: 'monthly' },
    { path: '/sobre',      priority: 0.6,  changeFrequency: 'yearly'  },
    { path: '/blog',       priority: 0.7,  changeFrequency: 'weekly', ptOnly: true },
    { path: '/vagas',      priority: 0.4,  changeFrequency: 'monthly' },
  ]

  // Cases ocultos (`hidden`) devolvem 404 — não podem entrar no mapa.
  const projectPages: Entry[] = projects
    .filter(p => !p.hidden)
    .map(p => ({ path: `/portfolio/${p.slug}`, priority: 0.7, changeFrequency: 'monthly' }))

  const servicePages: Entry[] = servicesData
    .flatMap(s => s.subServices)
    .map(s => ({ path: `/servicos/${s.slug}`, priority: 0.8, changeFrequency: 'monthly' }))

  const blogPages: Entry[] = blogPosts.map(p => ({
    path: `/blog/${p.slug}`,
    priority: 0.6,
    changeFrequency: 'monthly',
    ptOnly: true,
  }))

  const all = [...staticPages, ...projectPages, ...servicePages, ...blogPages]

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
