import { notFound } from 'next/navigation'
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/projects-data'
import CaseStudyHero from '@/components/case-study-hero'
import CaseStudyDataSheet from '@/components/case-study-datasheet'
import CaseStudyNarrative from '@/components/case-study-narrative'
import MetricsTerminal from '@/components/case-study-metrics'
import NextArchive from '@/components/case-study-next-archive'

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} — Case Study | Muhammad Jalal`,
    description: `Case study of ${project.title} for ${project.client}. ${project.role}. Built with ${project.stack.join(', ')}.`,
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <CaseStudyHero
        title={project.title}
        image={project.heroImage}
        viewLiveUrl={project.viewLiveUrl}
        sourceCodeUrl={project.sourceCodeUrl}
      />

      {/* Data Sheet */}
      <CaseStudyDataSheet
        client={project.client}
        role={project.role}
        timeframe={project.timeframe}
        stack={project.stack}
      />

      {/* Narrative Section */}
      <CaseStudyNarrative sections={project.sections} />

      {/* Metrics Terminal */}
      <MetricsTerminal metrics={project.metrics} />

      {/* Next Archive */}
      <NextArchive
        nextProjectSlug={project.nextProject.slug}
        nextProjectName={project.nextProject.name}
      />
    </div>
  )
}
