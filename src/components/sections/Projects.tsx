import { useState } from 'react'
import projectsData from '@/data/projects.json'
import type { ProjectItem } from '@/types/content'
import SectionHeading from '@/components/ui/SectionHeading'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'

const data = projectsData as ProjectItem[]

export default function Projects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const selected = data.find((p) => p.slug === openSlug) ?? null

  return (
    <section id="projects" className="relative bg-ink-900 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Selected Work" heading="Projects" />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} onOpen={setOpenSlug} />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setOpenSlug(null)} />
    </section>
  )
}
