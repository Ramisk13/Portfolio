import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { ProjectItem } from '@/types/content'
import { useTilt } from '@/hooks/useTilt'
import { fadeUp, viewportOnce } from '@/lib/motion'
import { assetUrl } from '@/lib/assetUrl'

interface ProjectCardProps {
  project: ProjectItem
  index: number
  onOpen: (slug: string) => void
}

export default function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const tiltRef = useTilt<HTMLDivElement>({ max: 6, scale: 1.015 })

  return (
    <motion.div
      layoutId={`project-card-${project.slug}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      custom={index}
      onClick={() => onOpen(project.slug)}
      data-cursor-hover
      className="h-full cursor-pointer"
    >
      <div
        ref={tiltRef}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-800/60 will-change-transform"
      >
        <div data-tilt-glow className="pointer-events-none absolute inset-0 z-10 transition-all duration-300" />

        <div
          className="relative h-48 shrink-0 overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${assetUrl(project.image)})` }}
        >
          <div className="absolute inset-0 bg-ink-950/10 transition-opacity group-hover:bg-ink-950/0" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col p-6">
          <div className="mb-2 flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-semibold text-white">{project.title}</h3>
            <ArrowUpRight
              size={20}
              className="mt-1 shrink-0 text-white/40 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cyan-400"
            />
          </div>
          <p className="text-sm leading-relaxed text-white/60">{project.summary}</p>

          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-white/50"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
