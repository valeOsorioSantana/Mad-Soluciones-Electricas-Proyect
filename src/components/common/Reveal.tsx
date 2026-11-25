import { m, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Retraso en segundos (útil para escalonar elementos). */
  delay?: number
  /** Dirección de entrada. */
  from?: 'up' | 'left' | 'right'
}

const offsets = { up: { y: 24, x: 0 }, left: { x: -32, y: 0 }, right: { x: 32, y: 0 } }

/** Anima la entrada de su contenido al hacer scroll. Respeta prefers-reduced-motion. */
export function Reveal({ children, className, delay = 0, from = 'up' }: RevealProps) {
  const reduce = useReducedMotion()
  // Con las tarjetas apiladas (pantallas < lg) el desplazamiento lateral se vería recortado: solo sube.
  const sideways = useMediaQuery('(min-width: 1024px)')
  const direction = sideways ? from : 'up'
  if (reduce) return <div className={className}>{children}</div>
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
    >
      {children}
    </m.div>
  )
}
