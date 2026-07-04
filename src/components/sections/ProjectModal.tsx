import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github } from 'lucide-react'
import type { ProjectItem } from '@/types/content'

interface ProjectModalProps {
  project: ProjectItem | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return

    document.body.style.overflow = 'hidden'
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[150] flex items-center justify-center overflow-y-auto bg-ink-950/80 p-4 backdrop-blur-sm sm:p-8"
        >
          <motion.div
            layoutId={`project-card-${project.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto max-h-full w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-ink-800"
          >
            <button
              onClick={onClose}
              data-cursor-hover
              aria-label="Close"
              className="absolute right-4 top-4 z-20 rounded-full bg-ink-950/60 p-2 text-white transition-colors hover:bg-ink-950 hover:text-cyan-400"
            >
              <X size={20} />
            </button>

            <div
              className="flex h-56 items-center justify-center bg-signal-gradient bg-cover bg-center sm:h-64"
              style={{ backgroundImage: `url(${project.image})` }}
            >
              <div className="flex h-full w-full items-end bg-gradient-to-t from-ink-800 via-ink-800/20 to-transparent p-6 sm:p-8">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">
                    {project.role} &middot; {project.year}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                    {project.title}
                  </h3>
                </div>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-6 sm:p-8">
              <p className="text-white/70">{project.description}</p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-violet-400">
                    The Problem
                  </h4>
                  <p className="text-sm leading-relaxed text-white/60">{project.problem}</p>
                </div>
                <div>
                  <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-cyan-400">
                    The Solution
                  </h4>
                  <p className="text-sm leading-relaxed text-white/60">{project.solution}</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-signal-400">
                  Results
                </h4>
                <ul className="space-y-1.5">
                  {project.results.map((r, i) => (
                    <li key={i} className="flex gap-2 text-sm text-white/70">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/40" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-white/50"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {(project.liveUrl || project.repoUrl) && (
                <div className="mt-8 flex flex-wrap gap-4 border-t border-white/10 pt-6">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor-hover
                      className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200"
                    >
                      <ExternalLink size={16} /> Live Site
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor-hover
                      className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white"
                    >
                      <Github size={16} /> Source Code
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
