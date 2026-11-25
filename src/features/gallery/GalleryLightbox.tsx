import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect } from 'react'
import { OptimizedImage } from '@/components/common/OptimizedImage'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { categoryLabels, galleryImageUrl, type GalleryItem } from './data'

interface GalleryLightboxProps {
  item: GalleryItem | undefined
  position: number | null
  total: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

/** Visor ampliado de una foto, con navegación por botones y teclado. */
export function GalleryLightbox({ item, position, total, onClose, onNext, onPrev }: GalleryLightboxProps) {
  const open = !!item

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onNext, onPrev])

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="left-1/2 top-1/2 w-[94vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-neon/40 bg-navy-900 p-3 shadow-neon sm:p-4">
        {item && (
          <>
            <div className="flex min-h-[40vh] items-center justify-center">
              <OptimizedImage
                key={item.id}
                src={galleryImageUrl(item.id, 'full')}
                alt={item.alt}
                width={1100}
                height={767}
                className="h-auto max-h-[72vh] w-auto max-w-full rounded-lg object-contain"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 px-1">
              <div>
                <DialogTitle className="text-2xl font-bold uppercase text-white">{item.title}</DialogTitle>
                <DialogDescription className="text-sm text-muted">
                  {categoryLabels[item.category]} · {(position ?? 0) + 1} / {total}
                </DialogDescription>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Foto anterior"
                  className="grid size-10 place-items-center rounded-full border border-neon/50 text-ink transition hover:bg-brand hover:text-navy-950"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Foto siguiente"
                  className="grid size-10 place-items-center rounded-full border border-neon/50 text-ink transition hover:bg-brand hover:text-navy-950"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
