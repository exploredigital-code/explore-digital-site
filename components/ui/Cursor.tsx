'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

export function Cursor() {
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState(false) // hovering interactive element
  const [hidden, setHidden] = useState(false)  // cursor left viewport

  const rawX = useMotionValue(-120)
  const rawY = useMotionValue(-120)

  // Dot follows instantly
  const dotX = rawX
  const dotY = rawY

  // Ring follows with spring lag
  const ringX = useSpring(rawX, { damping: 40, stiffness: 900, mass: 0.1 })
  const ringY = useSpring(rawY, { damping: 40, stiffness: 900, mass: 0.1 })

  const rafId = useRef<number>(0)

  useEffect(() => {
    // Only on pointer-fine (desktop) devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    document.body.classList.add('custom-cursor')
    setMounted(true)

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(() => {
        rawX.set(e.clientX)
        rawY.set(e.clientY)
      })
    }

    const onLeave  = () => setHidden(true)
    const onEnter  = () => setHidden(false)

    const addHover = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select, label').forEach(el => {
        el.addEventListener('mouseenter', () => setActive(true))
        el.addEventListener('mouseleave', () => setActive(false))
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    addHover()

    // Re-run on DOM changes (for dynamically rendered elements)
    const observer = new MutationObserver(addHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.body.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      observer.disconnect()
      cancelAnimationFrame(rafId.current)
    }
  }, [rawX, rawY])

  if (!mounted) return null

  return (
    <>
      {/* Ring — spring-lagged */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className={cn(
          'fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9998]',
          'rounded-full border transition-all duration-200',
          hidden ? 'opacity-0' : 'opacity-100',
          active
            ? 'w-10 h-10 border-g-light/70 bg-g-mid/10'
            : 'w-7 h-7 border-g-mid/50'
        )}
      />
      {/* Dot — instant */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        className={cn(
          'fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999]',
          'rounded-full transition-all duration-150',
          hidden ? 'opacity-0' : 'opacity-100',
          active ? 'w-1 h-1 bg-g-light' : 'w-1.5 h-1.5 bg-g-light'
        )}
      />
    </>
  )
}
