import { cn } from '@/lib/utils'
import { Reveal } from '@/components/common/Reveal'

interface SectionHeadingProps {
  title: string
  /** Parte final del título resaltada en amarillo. */
  highlight?: string
  description?: string
  align?: 'center' | 'left'
  className?: string
}

export function SectionHeading({
  title,
  highlight,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn('mb-10 sm:mb-14', align === 'center' && 'text-center', className)}>
      <h2 className="text-4xl font-bold uppercase text-white sm:text-5xl">
        {title} {highlight && <span className="text-brand">{highlight}</span>}
      </h2>
      <div
        className={cn(
          'mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-brand to-neon',
          align === 'center' && 'mx-auto',
        )}
      />
      {description && (
        <p className={cn('mt-4 max-w-2xl text-muted', align === 'center' && 'mx-auto')}>{description}</p>
      )}
    </Reveal>
  )
}
