import { useEffect, useState } from 'react'

/** Posición (fracción de la altura de la ventana) que se usa como "línea de lectura". */
const READING_LINE = 0.35

/**
 * Elige la sección activa a partir de la posición actual: la última cuyo borde superior
 * ya pasó la línea de lectura. Es una función pura de las posiciones, así que nunca queda
 * desactualizada (a diferencia de reaccionar solo a eventos de cambio).
 */
export function pickActiveSection(
  tops: ReadonlyArray<{ id: string; top: number }>,
  line: number,
  atBottom = false,
): string | undefined {
  if (tops.length === 0) return undefined
  if (atBottom) return tops[tops.length - 1]?.id
  let active = tops[0]?.id
  for (const t of tops) {
    if (t.top <= line) active = t.id
  }
  return active
}

/** Devuelve el id de la sección visible actualmente (para resaltar el menú). */
export function useScrollSpy(ids: readonly string[]): string | undefined {
  const [active, setActive] = useState<string | undefined>(ids[0])

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const tops = ids
        .map((id) => ({ id, el: document.getElementById(id) }))
        .filter((s): s is { id: string; el: HTMLElement } => !!s.el)
        .map((s) => ({ id: s.id, top: s.el.getBoundingClientRect().top }))
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      setActive(pickActiveSection(tops, window.innerHeight * READING_LINE, atBottom))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ids])

  return active
}
