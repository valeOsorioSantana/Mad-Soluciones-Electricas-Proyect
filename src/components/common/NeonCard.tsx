import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

interface NeonCardProps extends ComponentProps<'div'> {
  /** Color del borde luminoso. */
  tone?: 'blue' | 'yellow'
  /** Eleva la tarjeta al pasar el cursor. */
  interactive?: boolean
}

/** Contenedor con borde luminoso: base visual de tarjetas y marcos. */
export function NeonCard({ tone = 'blue', interactive, className, ...props }: NeonCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-navy-800/55 backdrop-blur-sm',
        tone === 'blue' ? 'shadow-neon' : 'shadow-neon-brand',
        interactive && 'transition-all duration-300 hover:-translate-y-1 hover:bg-navy-800/90',
        className,
      )}
      {...props}
    />
  )
}
