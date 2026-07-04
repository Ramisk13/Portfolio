import { useRef, useEffect } from 'react'

interface TiltOptions {
  max?: number
  scale?: number
}

export function useTilt<T extends HTMLElement>({ max = 10, scale = 1.02 }: TiltOptions = {}) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let frame = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height

      const rotateX = (0.5 - py) * max * 2
      const rotateY = (px - 0.5) * max * 2

      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`

        const glow = el.querySelector<HTMLElement>('[data-tilt-glow]')
        if (glow) {
          glow.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(139,92,246,0.25), transparent 60%)`
        }
      })
    }

    const handleMouseLeave = () => {
      cancelAnimationFrame(frame)
      el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
      const glow = el.querySelector<HTMLElement>('[data-tilt-glow]')
      if (glow) glow.style.background = 'transparent'
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(frame)
    }
  }, [max, scale])

  return ref
}
