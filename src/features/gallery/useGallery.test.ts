import { act, renderHook } from '@testing-library/react'
import { galleryItems } from './data'
import { filterByCategory, useGallery, wrapIndex } from './useGallery'

describe('wrapIndex', () => {
  it('da la vuelta en ambos extremos', () => {
    expect(wrapIndex(4, 4)).toBe(0)
    expect(wrapIndex(-1, 4)).toBe(3)
    expect(wrapIndex(0, 0)).toBe(0)
  })
})

describe('filterByCategory', () => {
  it('"todos" devuelve todo y una categoría filtra', () => {
    expect(filterByCategory(galleryItems, 'todos')).toHaveLength(galleryItems.length)
    const tableros = filterByCategory(galleryItems, 'tableros')
    expect(tableros.length).toBeGreaterThan(0)
    expect(tableros.every((i) => i.category === 'tableros')).toBe(true)
  })
})

describe('useGallery', () => {
  it('abre, navega circularmente y cierra', () => {
    const { result } = renderHook(() => useGallery(galleryItems))
    expect(result.current.current).toBeUndefined()

    act(() => result.current.open(0))
    expect(result.current.current?.id).toBe(galleryItems[0]?.id)

    act(() => result.current.prev())
    expect(result.current.selected).toBe(galleryItems.length - 1)

    act(() => result.current.next())
    expect(result.current.selected).toBe(0)

    act(() => result.current.close())
    expect(result.current.selected).toBeNull()
  })

  it('al cambiar de categoría cierra el visor y filtra', () => {
    const { result } = renderHook(() => useGallery(galleryItems))
    act(() => result.current.open(2))
    act(() => result.current.changeCategory('iluminacion'))
    expect(result.current.selected).toBeNull()
    expect(result.current.visible.every((i) => i.category === 'iluminacion')).toBe(true)
  })
})
