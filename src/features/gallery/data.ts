export type GalleryCategory = 'tableros' | 'instalaciones' | 'iluminacion' | 'proyectos'

export const categoryLabels: Record<GalleryCategory, string> = {
  tableros: 'Tableros',
  instalaciones: 'Instalaciones',
  iluminacion: 'Iluminación',
  proyectos: 'Proyectos',
}

export interface GalleryItem {
  /** Coincide con el nombre de archivo en src/assets/images/gallery/{id}-thumb|full.webp */
  id: string
  title: string
  category: GalleryCategory
  alt: string
}

export const galleryItems: GalleryItem[] = [
  { id: 'tablero-residencial', title: 'Tablero residencial', category: 'tableros', alt: 'Tablero eléctrico residencial con breakers y cableado ordenado' },
  { id: 'tablero-organizado', title: 'Tablero organizado', category: 'tableros', alt: 'Tablero de distribución con cableado identificado por colores' },
  { id: 'tablero-distribucion', title: 'Tablero de distribución', category: 'tableros', alt: 'Tablero de distribución con protecciones rotuladas' },
  { id: 'medidor-breaker', title: 'Medidor y protección', category: 'tableros', alt: 'Breaker principal y conexiones a tierra junto al medidor' },
  { id: 'conexion-medidor', title: 'Conexión al medidor', category: 'instalaciones', alt: 'Técnico realizando la conexión de un medidor eléctrico' },
  { id: 'canalizacion-tablero', title: 'Canalización de tableros', category: 'instalaciones', alt: 'Tableros eléctricos con tubería y canalización organizada' },
  { id: 'acometida-subterranea', title: 'Acometida subterránea', category: 'instalaciones', alt: 'Zanja con tubería eléctrica para acometida subterránea' },
  { id: 'tuberia-enterrada', title: 'Tubería enterrada', category: 'instalaciones', alt: 'Tubería eléctrica instalada en zanja en un jardín' },
  { id: 'instalacion-muros', title: 'Instalación en muros', category: 'instalaciones', alt: 'Tubería y cajas eléctricas instaladas en muro de ladrillo' },
  { id: 'cajas-tomacorrientes', title: 'Cajas y tomacorrientes', category: 'instalaciones', alt: 'Cajas para tomacorrientes e interruptores con tubería' },
  { id: 'iluminacion-colgante', title: 'Lámparas colgantes', category: 'iluminacion', alt: 'Lámparas colgantes instaladas sobre una cocina' },
  { id: 'iluminacion-lampara', title: 'Lámpara de techo', category: 'iluminacion', alt: 'Lámpara de techo moderna instalada en una vivienda' },
  { id: 'iluminacion-aplique', title: 'Aplique de pared', category: 'iluminacion', alt: 'Aplique de pared con globo de vidrio instalado' },
  { id: 'proyecto-vivienda', title: 'Proyecto de vivienda', category: 'proyectos', alt: 'Vivienda en construcción con instalación eléctrica' },
  { id: 'proyecto-interior', title: 'Proyecto residencial', category: 'proyectos', alt: 'Interior de vivienda con iluminación y acabados terminados' },
  { id: 'proyecto-oficina', title: 'Proyecto de oficina', category: 'proyectos', alt: 'Oficina con instalación eléctrica terminada' },
]

// Vite resuelve cada archivo a su URL final (con hash) en build.
const modules = import.meta.glob<string>('../../assets/images/gallery/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

/** URL de la miniatura (480×360) o de la imagen ampliada (≤1100 px) de un elemento. */
export function galleryImageUrl(id: string, kind: 'thumb' | 'full'): string {
  const url = modules[`../../assets/images/gallery/${id}-${kind}.webp`]
  if (!url) throw new Error(`Falta la imagen de galería: ${id}-${kind}.webp`)
  return url
}
