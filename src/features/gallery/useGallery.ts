import { useCallback, useMemo, useState } from 'react'
import type { GalleryCategory, GalleryItem } from './data'

export type CategoryFilter = GalleryCategory | 'todos'

export function filterByCategory(items: GalleryItem[], category: CategoryFilter): GalleryItem[] {
  return category === 'todos' ? items : items.filter((i) => i.category === category)
}

/** Índice circular: permite navegar de la última a la primera y viceversa. */
export function wrapIndex(index: number, length: number): number {
  if (length === 0) return 0
  return ((index % length) + length) % length
}

/** Estado y lógica de la galería: filtro por categoría y navegación del visor. */
export function useGallery(items: GalleryItem[]) {
  const [category, setCategory] = useState<CategoryFilter>('todos')
  const [selected, setSelected] = useState<number | null>(null)

  const visible = useMemo(() => filterByCategory(items, category), [items, category])

  const changeCategory = useCallback((next: CategoryFilter) => {
    setCategory(next)
    setSelected(null)
  }, [])

  const open = useCallback((index: number) => setSelected(index), [])
  const close = useCallback(() => setSelected(null), [])
  const next = useCallback(
    () => setSelected((i) => (i === null ? i : wrapIndex(i + 1, visible.length))),
    [visible.length],
  )
  const prev = useCallback(
    () => setSelected((i) => (i === null ? i : wrapIndex(i - 1, visible.length))),
    [visible.length],
  )

  return {
    category,
    changeCategory,
    visible,
    selected,
    current: selected === null ? undefined : visible[selected],
    open,
    close,
    next,
    prev,
  }
}
