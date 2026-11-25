import type { ComponentProps } from 'react'
import { CircuitTraces } from '@/components/common/CircuitTraces'
import { cn } from '@/lib/utils'
import { Container } from './Container'

interface SectionProps extends Omit<ComponentProps<'section'>, 'id'> {
  /** id usado por el menú y el scroll-spy. */
  id: string
  /** Clase para el contenedor interno. */
  containerClassName?: string
  /** Bordes con trazos de circuito luminosos. */
  traces?: 'left' | 'right' | 'both' | 'none'
  /** Línea de neón en el límite superior de la sección. */
  divider?: boolean
}

/** Envoltorio estándar de cada sección: ancla, espaciado, ancho máximo y ambientación. */
export function Section({
  id,
  className,
  containerClassName,
  traces = 'none',
  divider = true,
  children,
  ...props
}: SectionProps) {
  return (
    <section id={id} className={cn('relative overflow-x-clip py-16 sm:py-24', className)} {...props}>
      {divider && <div className="neon-line" aria-hidden="true" />}
      {(traces === 'left' || traces === 'both') && <CircuitTraces side="left" />}
      {(traces === 'right' || traces === 'both') && <CircuitTraces side="right" />}
      <Container className={cn('relative z-10', containerClassName)}>{children}</Container>
    </section>
  )
}
