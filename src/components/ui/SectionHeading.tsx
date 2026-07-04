import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '@/lib/motion'

interface SectionHeadingProps {
  eyebrow: string
  heading: string
  align?: 'left' | 'center'
}

export default function SectionHeading({ eyebrow, heading, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan-400"
      >
        // {eyebrow}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        custom={1}
        className="font-display text-4xl font-semibold text-white sm:text-5xl"
      >
        {heading}
      </motion.h2>
    </div>
  )
}
