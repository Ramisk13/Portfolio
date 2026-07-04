import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import heroData from '@/data/hero.json'
import type { HeroData } from '@/types/content'
import MagneticButton from '@/components/ui/MagneticButton'
import RoleScramble from '@/components/ui/RoleScramble'

const HeroScene = lazy(() => import('./HeroScene'))

const data = heroData as HeroData

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-ink-950"
    >
      <div className="absolute inset-0 bg-grid-glow" />

      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/20 via-transparent to-ink-950" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 lg:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl font-bold leading-[1.05] text-white sm:text-7xl lg:text-8xl"
        >
          {data.name.split(' ')[0]}
          <br />
          <span className="bg-signal-gradient bg-clip-text text-transparent">
            {data.name.split(' ').slice(1).join(' ')}
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-white/60 sm:text-xl"
        >
          <RoleScramble roles={data.roles} className="text-cyan-400" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
        >
          {data.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-2 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href={data.ctaPrimary.href} variant="primary">
            {data.ctaPrimary.label}
          </MagneticButton>
          <MagneticButton href={data.ctaSecondary.href} variant="secondary">
            {data.ctaSecondary.label}
          </MagneticButton>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        data-cursor-hover
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/40 transition-colors hover:text-white"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  )
}
