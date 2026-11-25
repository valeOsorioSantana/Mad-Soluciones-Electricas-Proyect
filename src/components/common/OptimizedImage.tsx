import { useState, type ComponentProps, type SyntheticEvent } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps
  extends Omit<ComponentProps<'img'>, 'width' | 'height' | 'loading' | 'src' | 'alt'> {
  src: string
  alt: string
  /** Tamaño intrínseco real del archivo: evita saltos de diseño (CLS). */
  width: number
  height: number
  /** Imagen crítica (above the fold): carga inmediata y prioridad alta. */
  priority?: boolean
}

const block = (e: SyntheticEvent) => e.preventDefault()

/**
 * Imagen optimizada: dimensiones explícitas, carga perezosa, decodificación asíncrona,
 * fundido al cargar y medidas disuasivas contra guardado/arrastre.
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  ...props
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false)
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      draggable={false}
      onContextMenu={block}
      onDragStart={block}
      ref={(el) => {
        // Si la imagen ya estaba en caché, onLoad puede haber ocurrido antes de hidratar.
        if (el?.complete && el.naturalWidth > 0) setLoaded(true)
      }}
      onLoad={() => setLoaded(true)}
      className={cn(
        'no-save bg-navy-800 transition-opacity duration-500',
        loaded ? 'opacity-100' : 'opacity-0',
        className,
      )}
      {...props}
    />
  )
}
