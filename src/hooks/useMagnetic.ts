import { useRef, useEffect } from 'react'

interface MagneticOptions {
  strength?: number
}

export function useMagnetic<T extends HTMLElement>({ strength = 0.35 }: MagneticOptions = {}) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let frame = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const relX = e.clientX - (rect.left + rect.width / 2)
      const relY = e.clientY - (rect.top + rect.height / 2)

      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${relX * strength}px, ${relY * strength}px, 0)`
      })
    }

    const handleMouseLeave = () => {
      cancelAnimationFrame(frame)
      el.style.transform = 'translate3d(0, 0, 0)'
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(frame)
    }
  }, [strength])

  return ref
}
