import { buildGoogleMapsUrl } from './maps'

describe('buildGoogleMapsUrl', () => {
  it('abre una búsqueda de Google Maps con la consulta', () => {
    const url = new URL(buildGoogleMapsUrl('Medellín'))
    expect(url.origin + url.pathname).toBe('https://www.google.com/maps/search/')
    expect(url.searchParams.get('api')).toBe('1')
    expect(url.searchParams.get('query')).toBe('Medellín')
  })
})
