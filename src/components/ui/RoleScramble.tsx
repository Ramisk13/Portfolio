import { useEffect, useState, useRef } from 'react'

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#'

interface RoleScrambleProps {
  roles: string[]
  className?: string
}

export default function RoleScramble({ roles, className = '' }: RoleScrambleProps) {
  const [display, setDisplay] = useState(roles[0] ?? '')
  const indexRef = useRef(0)
  const revealRef = useRef(0)

  useEffect(() => {
    if (roles.length === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(roles[0])
      return
    }

    let holdTimeout: ReturnType<typeof setTimeout>
    let holding = false

    const tick = () => {
      if (holding) return

      const target = roles[indexRef.current]
      revealRef.current += 1

      if (revealRef.current > target.length) {
        setDisplay(target)
        holding = true
        holdTimeout = setTimeout(() => {
          indexRef.current = (indexRef.current + 1) % roles.length
          revealRef.current = 0
          holding = false
        }, 1600)
        return
      }

      const scrambled = target
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          if (i < revealRef.current) return char
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        })
        .join('')

      setDisplay(scrambled)
    }

    const interval = setInterval(tick, 45)
    return () => {
      clearInterval(interval)
      clearTimeout(holdTimeout)
    }
  }, [roles])

  return <span className={`font-mono ${className}`}>{display}</span>
}
