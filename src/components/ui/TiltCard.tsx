import { ReactNode } from 'react'
import { useTilt } from '@/hooks/useTilt'

interface TiltCardProps {
  children: ReactNode
  className?: string
  max?: number
}

export default function TiltCard({ children, className = '', max = 8 }: TiltCardProps) {
  const ref = useTilt<HTMLDivElement>({ max })

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-ink-800/60 backdrop-blur-sm transition-shadow duration-300 will-change-transform ${className}`}
    >
      <div data-tilt-glow className="pointer-events-none absolute inset-0 transition-all duration-300" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
