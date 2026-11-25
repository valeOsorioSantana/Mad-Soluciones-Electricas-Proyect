import { pickActiveSection } from './useScrollSpy'

const sections = (tops: number[]) => ['inicio', 'nosotros', 'servicios'].map((id, i) => ({ id, top: tops[i]! }))

describe('pickActiveSection', () => {
  it('arriba de todo es "inicio", aunque "nosotros" esté justo debajo', () => {
    expect(pickActiveSection(sections([0, 780, 1600]), 380)).toBe('inicio')
  })

  it('pasa a la siguiente cuando su borde superior cruza la línea de lectura', () => {
    expect(pickActiveSection(sections([-500, 300, 1100]), 380)).toBe('nosotros')
  })

  it('al final de la página activa la última sección', () => {
    expect(pickActiveSection(sections([-2000, -1200, -300]), 380, true)).toBe('servicios')
  })

  it('sin secciones devuelve undefined', () => {
    expect(pickActiveSection([], 380)).toBeUndefined()
  })
})
