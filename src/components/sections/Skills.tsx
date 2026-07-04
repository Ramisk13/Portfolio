import { motion } from 'framer-motion'
import skillsData from '@/data/skills.json'
import type { SkillCategory } from '@/types/content'
import SectionHeading from '@/components/ui/SectionHeading'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

const data = skillsData as SkillCategory[]
const allSkills = data.flatMap((c) => c.items)

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-ink-900 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Toolbox" heading="Skills & Stack" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {data.map((category, i) => (
            <motion.div
              key={category.category}
              variants={fadeUp}
              custom={i}
              className="rounded-2xl border border-white/10 bg-ink-800/50 p-6"
            >
              <h3 className="mb-4 font-display text-lg font-semibold text-white">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition-all hover:border-cyan-400/50 hover:text-cyan-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="relative mt-16 flex select-none overflow-hidden border-y border-white/5 py-5">
        <div className="flex shrink-0 animate-marquee gap-10 pr-10">
          {[...allSkills, ...allSkills].map((skill, i) => (
            <span
              key={i}
              className="font-display text-2xl font-semibold text-white/10 sm:text-3xl"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-900 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-900 to-transparent" />
      </div>
    </section>
  )
}
