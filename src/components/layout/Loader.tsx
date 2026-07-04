import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface LoaderProps {
  onDone: () => void
}

export default function Loader({ onDone }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 18 + 6, 100)
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => setVisible(false), 350)
        }
        return next
      })
    }, 120)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!visible) {
      const t = setTimeout(onDone, 700)
      return () => clearTimeout(t)
    }
  }, [visible, onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.87, 0, 0.13, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-ink-950"
        >
          <div className="font-display text-2xl tracking-tight text-white">
            Rami Eskaf<span className="text-signal-400">.</span>
          </div>
          <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-signal-gradient"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="font-mono text-xs text-white/40">{Math.floor(progress)}%</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
