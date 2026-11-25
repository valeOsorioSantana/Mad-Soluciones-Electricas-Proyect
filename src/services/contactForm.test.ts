import { contactFormToWhatsAppUrl, validateContactForm } from './contactForm'

const valid = {
  name: 'Ana Gómez',
  phone: '300 123 4567',
  service: 'Tableros eléctricos',
  message: 'Necesito revisar el tablero de mi casa.',
}

describe('validateContactForm', () => {
  it('acepta datos válidos', () => {
    expect(validateContactForm(valid)).toEqual({})
  })

  it('rechaza campos vacíos o inválidos', () => {
    const errors = validateContactForm({ name: ' ', phone: 'abc', service: '', message: 'hola' })
    expect(Object.keys(errors).sort()).toEqual(['message', 'name', 'phone'])
  })

  it('el servicio es opcional', () => {
    expect(validateContactForm({ ...valid, service: '' })).toEqual({})
  })
})

describe('contactFormToWhatsAppUrl', () => {
  it('incluye nombre, servicio, mensaje y teléfono', () => {
    const url = decodeURIComponent(contactFormToWhatsAppUrl(valid))
    expect(url).toContain('soy Ana Gómez')
    expect(url).toContain('Servicio de interés: Tableros eléctricos')
    expect(url).toContain('Necesito revisar el tablero')
    expect(url).toContain('300 123 4567')
  })

  it('omite el servicio si no se eligió', () => {
    const url = decodeURIComponent(contactFormToWhatsAppUrl({ ...valid, service: '' }))
    expect(url).not.toContain('Servicio de interés')
  })
})
