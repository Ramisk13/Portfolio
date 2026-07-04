import { motion } from 'framer-motion'
import aboutData from '@/data/about.json'
import type { AboutData } from '@/types/content'
import SectionHeading from '@/components/ui/SectionHeading'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

const data = aboutData as AboutData

export default function About() {
  return (
    <section id="about" className="relative bg-ink-950 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Who I Am" heading={data.heading} />

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-5"
          >
            {data.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                custom={i}
                className="text-base leading-relaxed text-white/65 sm:text-lg"
              >
                {p}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-1"
          >
            {data.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                custom={i}
                className="rounded-2xl border border-white/10 bg-ink-800/50 p-6 transition-colors hover:border-violet-500/40"
              >
                <div className="font-display text-3xl font-bold text-white sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
