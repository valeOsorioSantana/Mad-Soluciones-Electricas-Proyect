import { ZoomIn } from 'lucide-react'
import { OptimizedImage } from '@/components/common/OptimizedImage'
import { Reveal } from '@/components/common/Reveal'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { cn } from '@/lib/utils'
import { GalleryLightbox } from './GalleryLightbox'
import { categoryLabels, galleryImageUrl, galleryItems } from './data'
import { useGallery, type CategoryFilter } from './useGallery'

const filters: { value: CategoryFilter; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  ...Object.entries(categoryLabels).map(([value, label]) => ({ value: value as CategoryFilter, label })),
]

export function GallerySection() {
  const gallery = useGallery(galleryItems)

  return (
    <Section id="trabajos" traces="left">
      <SectionHeading
        title="Trabajos"
        highlight="realizados"
        description="Proyectos reales de MAD Soluciones Eléctricas: tableros, instalaciones, iluminación y más."
      />

      <div role="group" aria-label="Filtrar por categoría" className="mb-8 flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => gallery.changeCategory(f.value)}
            aria-pressed={gallery.category === f.value}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              gallery.category === f.value
                ? 'border-brand bg-brand text-navy-950'
                : 'border-neon/40 text-ink/90 hover:border-brand hover:text-brand',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {gallery.visible.map((item, index) => (
          <li key={item.id}>
            <Reveal delay={(index % 4) * 0.05}>
              <button
                type="button"
                onClick={() => gallery.open(index)}
                aria-label={`Ampliar: ${item.title}`}
                className="group relative block w-full overflow-hidden rounded-xl shadow-neon transition-transform duration-300 hover:-translate-y-1"
              >
                <OptimizedImage
                  src={galleryImageUrl(item.id, 'thumb')}
                  alt={item.alt}
                  width={480}
                  height={360}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-navy-950/95 to-transparent px-3 pb-2 pt-8 text-left text-sm font-semibold text-white">
                  {item.title}
                  <ZoomIn className="size-4 shrink-0 text-brand opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
                </span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      <GalleryLightbox
        item={gallery.current}
        position={gallery.selected}
        total={gallery.visible.length}
        onClose={gallery.close}
        onNext={gallery.next}
        onPrev={gallery.prev}
      />
    </Section>
  )
}
