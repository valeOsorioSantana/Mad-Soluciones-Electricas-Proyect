/** Consulta de búsqueda en Google Maps. Cambiar por la dirección exacta cuando se confirme la sede. */
export const MAPS_QUERY = 'Medellín, Antioquia, Colombia'

/** Enlace que abre Google Maps (app o web) en la ubicación indicada. */
export function buildGoogleMapsUrl(query: string = MAPS_QUERY): string {
  const params = new URLSearchParams({ api: '1', query })
  return `https://www.google.com/maps/search/?${params.toString()}`
}
