import type { Metadata } from 'next'
import { notFound }    from 'next/navigation'
import { projects }    from '@/data/portfolio'
import { canonical, languageAlternates } from '@/lib/site'
import { ProjectView } from './ProjectView'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const project = projects.find(p => p.slug === slug)
  if (!project || project.hidden) return { title: 'Projeto não encontrado' }

  return {
    title: `${project.client} · Explore Digital`,
    description: project.tagline,
    alternates: {
      canonical: canonical(locale, `/portfolio/${slug}`),
      languages: languageAlternates(`/portfolio/${slug}`),
    },
    openGraph: {
      title: `${project.client} · Explore Digital`,
      description: project.tagline,
      type: 'article',
      images: [project.imageUrl],
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find(p => p.slug === slug)
  if (!project || project.hidden) notFound()

  const visible = projects.filter(p => !p.hidden)
  const idx  = visible.findIndex(p => p.slug === slug)
  const next = visible[(idx + 1) % visible.length]
  const prev = visible[(idx - 1 + visible.length) % visible.length]

  return <ProjectView project={project} next={next} prev={prev} />
}
