import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPost } from '@/data/blog-posts'
import { blogContent } from '@/data/blog-content'
import { canonical } from '@/lib/site'
import { slot, PASTA } from '@/data/midia'
import { BlogPostView } from './BlogPostView'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

// Os meses dos posts estão abreviados em português: `new Date('07 Ago 2026')`
// devolve Invalid Date, e o publishedTime saía vazio em 8 dos 12 meses.
const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

/** "07 Ago 2026" → "2026-08-07T00:00:00.000Z". undefined se não for legível. */
function toIso(date: string): string | undefined {
  const m = /^(\d{1,2})\s+(\p{L}{3})\p{L}*\s+(\d{4})$/u.exec(date.trim())
  if (!m) return undefined
  const month = MESES.indexOf(m[2].toLowerCase())
  if (month < 0) return undefined
  return new Date(Date.UTC(+m[3], month, +m[1])).toISOString()
}

/**
 * Cada post precisa do próprio título e da própria descrição.
 *
 * Enquanto a página era `'use client'` ela não podia gerar metadata, então os
 * 60 posts herdavam o `<title>` da home — todos idênticos. Somado ao canonical
 * fixo que o layout declarava, nenhum deles tinha como rankear.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const post = getBlogPost(slug)
  if (!post) return { title: 'Post não encontrado · Explore Digital' }

  const capa = slot(`blog-${slug}`)
  const title = `${post.title} · Explore Digital`
  const isPt = locale === 'pt'

  return {
    title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: canonical(locale, `/blog/${slug}`) },
    // Os 60 posts existem só em português. Servir a mesma URL em /en e /es com
    // o texto em PT é conteúdo duplicado — fica fora do índice até traduzir.
    robots: { index: isPt, follow: true },
    openGraph: {
      title,
      description: post.excerpt,
      type: 'article',
      // post.date vem como "01 Jan 2026"; OG espera ISO.
      publishedTime: toIso(post.date),
      // A capa vem do registro de mídia. Enquanto o slot estiver vazio, o OG
      // fica sem imagem em vez de apontar para um arquivo que não existe.
      images: capa?.arquivo ? [PASTA + capa.arquivo] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  if (!getBlogPost(slug) || !blogContent[slug]) notFound()

  return <BlogPostView />
}
