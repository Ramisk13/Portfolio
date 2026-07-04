import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import blogData from '@/data/blog.json'
import type { BlogPost } from '@/types/content'
import SectionHeading from '@/components/ui/SectionHeading'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

const data = blogData as BlogPost[]

export default function Blog() {
  if (data.length === 0) return null

  return (
    <section id="blog" className="relative bg-ink-950 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Writing" heading="Notes & Articles" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 sm:grid-cols-2"
        >
          {data.map((post, i) => (
            <motion.a
              key={post.title}
              href={post.url}
              target={post.url.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              data-cursor-hover
              variants={fadeUp}
              custom={i}
              className="group rounded-2xl border border-white/10 bg-ink-800/50 p-6 transition-colors hover:border-violet-500/40"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-semibold text-white">{post.title}</h3>
                <ArrowUpRight
                  size={18}
                  className="mt-1 shrink-0 text-white/40 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cyan-400"
                />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{post.excerpt}</p>
              <div className="mt-4 flex gap-3 font-mono text-xs text-white/40">
                <span>{post.date}</span>
                <span>&middot;</span>
                <span>{post.readTime}</span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
