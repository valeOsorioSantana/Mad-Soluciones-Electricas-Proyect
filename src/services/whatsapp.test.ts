import { buildWhatsAppUrl } from './whatsapp'

describe('buildWhatsAppUrl', () => {
  it('usa el número de la marca y no añade texto vacío', () => {
    expect(buildWhatsAppUrl()).toBe('https://wa.me/573104055697')
    expect(buildWhatsAppUrl('   ')).toBe('https://wa.me/573104055697')
  })

  it('codifica el mensaje', () => {
    const url = buildWhatsAppUrl('Hola, ¿cotizan?')
    expect(url).toBe('https://wa.me/573104055697?text=Hola%2C%20%C2%BFcotizan%3F')
  })
})
