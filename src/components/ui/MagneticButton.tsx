import { ReactNode, RefObject } from 'react'
import { useMagnetic } from '@/hooks/useMagnetic'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  strength?: number
}

const variantStyles = {
  primary:
    'bg-signal-gradient text-ink-950 font-semibold shadow-glow-signal hover:shadow-glow-cyan',
  secondary:
    'border border-violet-500/40 text-white hover:border-cyan-400/60 hover:bg-white/5',
  ghost: 'text-white/80 hover:text-white',
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  strength = 0.4,
}: MagneticButtonProps) {
  const ref = useMagnetic<HTMLElement>({ strength })

  const classes = `group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm tracking-wide transition-colors duration-300 will-change-transform ${variantStyles[variant]} ${className}`

  if (href) {
    return (
      <a
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        data-cursor-hover
        className={classes}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref as RefObject<HTMLButtonElement>}
      onClick={onClick}
      data-cursor-hover
      className={classes}
    >
      {children}
    </button>
  )
}
