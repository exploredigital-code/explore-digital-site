import type { Metadata } from 'next'
import { notFound }    from 'next/navigation'
import { projects }    from '@/data/portfolio'
import { ProjectView } from './ProjectView'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find(p => p.slug === slug)
  if (!project) return { title: 'Projeto não encontrado' }

  return {
    title: `${project.client} — Explore Digital`,
    description: project.tagline,
    openGraph: {
      title: `${project.client} — Explore Digital`,
      description: project.tagline,
      type: 'article',
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find(p => p.slug === slug)
  if (!project) notFound()

  const idx  = projects.findIndex(p => p.slug === slug)
  const next = projects[(idx + 1) % projects.length]
  const prev = projects[(idx - 1 + projects.length) % projects.length]

  return <ProjectView project={project!} next={next} prev={prev} />
}
