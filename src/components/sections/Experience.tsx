import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import experienceData from '@/data/experience.json'
import type { ExperienceItem } from '@/types/content'
import SectionHeading from '@/components/ui/SectionHeading'
import { fadeUp, viewportOnce } from '@/lib/motion'

const data = experienceData as ExperienceItem[]

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.6'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" className="relative bg-ink-950 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Career Path" heading="Experience" />

        <div ref={containerRef} className="relative mt-16 pl-8 sm:pl-12">
          <div className="absolute left-[7px] top-0 h-full w-px bg-white/10 sm:left-[11px]" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[7px] top-0 w-px bg-signal-gradient sm:left-[11px]"
          />

          <div className="space-y-14">
            {data.map((item, i) => (
              <motion.div
                key={`${item.company}-${i}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                custom={i}
                className="relative"
              >
                <span className="absolute -left-8 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-cyan-400 bg-ink-950 sm:-left-12" />

                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                    {item.role}{' '}
                    <span className="text-white/40">
                      @{' '}
                      {item.companyUrl ? (
                        <a
                          href={item.companyUrl}
                          target="_blank"
                          rel="noreferrer"
                          data-cursor-hover
                          className="text-violet-400 hover:text-cyan-300"
                        >
                          {item.company}
                        </a>
                      ) : (
                        item.company
                      )}
                    </span>
                  </h3>
                  <span className="font-mono text-xs text-white/40">{item.period}</span>
                </div>

                <p className="mt-1 text-sm text-white/40">{item.location}</p>
                <p className="mt-3 text-white/65">{item.description}</p>

                <ul className="mt-4 space-y-2">
                  {item.highlights.map((h, hi) => (
                    <li key={hi} className="flex gap-2 text-sm text-white/60">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-white/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
