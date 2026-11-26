/**
 * Optimiza las imágenes originales (fuera del repo) y genera WebP livianos en src/assets/images.
 *
 *   npm run images
 *   SOURCE_DIR="<ruta a 'imagenes y video'>" LOGO_DIR="<ruta a 'logos'>" npm run images
 *
 * - Un único tamaño por uso (el mismo para móvil y escritorio).
 * - Se elimina el borde inferior de las fotos del celular (sello de fecha/modelo) y los metadatos EXIF.
 * - Los originales NO se copian al repositorio.
 */
import { mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const DOCS =
  'C:/Users/Vale/Documents/Material de Estudio y Programacion/Documentacion del proyecto/Proyecto Mad Soluciones Electricas'
const SOURCE_DIR = process.env.SOURCE_DIR ?? `${DOCS}/imagenes y video`
const LOGO_DIR = process.env.LOGO_DIR ?? `${DOCS}/logos`
const OUT = path.resolve('src/assets/images')

/** Porción inferior (%) que se recorta para quitar el sello "REDMI NOTE / fecha". */
const STAMP_CROP = 0.07

/** Fotos seleccionadas: índice dentro de la lista ordenada alfabéticamente de SOURCE_DIR. */
const GALLERY = [
  { id: 'tablero-residencial', index: 34 },
  { id: 'tablero-organizado', index: 37, position: 'center' },
  { id: 'tablero-distribucion', index: 41 },
  { id: 'canalizacion-tablero', index: 22 },
  { id: 'acometida-subterranea', index: 26 },
  { id: 'tuberia-enterrada', index: 43 },
  { id: 'instalacion-muros', index: 28 },
  { id: 'cajas-tomacorrientes', index: 35 },
  { id: 'iluminacion-colgante', index: 10 },
  { id: 'iluminacion-lampara', index: 12, position: 'top' },
  { id: 'iluminacion-aplique', index: 45 },
  { id: 'conexion-medidor', index: 33 },
  { id: 'medidor-breaker', index: 2 },
  { id: 'proyecto-vivienda', index: 51 },
  { id: 'proyecto-interior', index: 14 },
  { id: 'proyecto-oficina', index: 42 },
]

const SINGLES = [
  { file: 'hero', index: 24, width: 640, height: 800, quality: 74, position: 'attention' },
  { file: 'about', index: 18, width: 560, height: 560, quality: 74, position: 'attention' },
]

const THUMB = { width: 480, height: 360, quality: 70 }

/** Marca de agua (solo en las fotos ampliadas): ancho en px y opacidad. */
const WATERMARK = { width: 170, opacity: 0.6, margin: 14 }
const FULL_LONG_SIDE = 1100

const kb = (n) => `${(n / 1024).toFixed(1)} KB`
const report = []

async function listSources() {
  const files = (await readdir(SOURCE_DIR)).filter((f) => f.endsWith('.jpeg')).sort()
  if (files.length < 63) throw new Error(`Se esperaban >= 63 fotos en ${SOURCE_DIR}, hay ${files.length}`)
  return files.map((f) => path.join(SOURCE_DIR, f))
}

/** Lee la foto con la orientación correcta y sin el sello inferior. */
async function loadClean(file) {
  const rotated = await sharp(file).rotate().toBuffer()
  const { width, height } = await sharp(rotated).metadata()
  return sharp(rotated).extract({
    left: 0,
    top: 0,
    width,
    height: Math.floor(height * (1 - STAMP_CROP)),
  })
}

async function save(pipeline, outFile, source) {
  await mkdir(path.dirname(outFile), { recursive: true })
  const info = await pipeline.toFile(outFile)
  const original = (await stat(source)).size
  report.push({ out: path.relative(OUT, outFile), from: original, to: info.size, dim: `${info.width}x${info.height}` })
}

/** Convierte el fondo oscuro de la camiseta en transparencia para usar el logo sobre el tema oscuro. */
async function logo(file, region, width, outName, { feather = [0.1, 0.1], low = 55, high = 120 } = {}) {
  const { data, info } = await sharp(path.join(LOGO_DIR, file))
    .extract(region)
    .resize({ width })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const LOW = low
  const HIGH = high
  const [FEATHER_X, FEATHER_Y] = feather // fracción del ancho/alto que se desvanece en cada borde (evita cortes visibles)
  const smooth = (t) => t * t * (3 - 2 * t)
  for (let i = 0; i < data.length; i += 4) {
    const px = i / 4
    const x = px % info.width
    const y = Math.floor(px / info.width)
    const max = Math.max(data[i], data[i + 1], data[i + 2])
    let a = Math.min(1, Math.max(0, (max - LOW) / (HIGH - LOW)))
    // Quita el oscurecimiento del fondo: los píxeles semitransparentes conservan su color (no se vuelven negros).
    if (a > 0 && a < 1) {
      const k = Math.min(255 / Math.max(max, 1), 1 / a)
      data[i] = Math.min(255, data[i] * k)
      data[i + 1] = Math.min(255, data[i + 1] * k)
      data[i + 2] = Math.min(255, data[i + 2] * k)
    }
    const ex = Math.min(x, info.width - 1 - x) / (info.width * FEATHER_X)
    const ey = Math.min(y, info.height - 1 - y) / (info.height * FEATHER_Y)
    a *= smooth(Math.min(1, ex)) * smooth(Math.min(1, ey))
    data[i + 3] = Math.round(a * 255)
  }
  const out = path.join(OUT, outName)
  const res = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .webp({ quality: 82, alphaQuality: 85, effort: 6 })
    .toFile(out)
  report.push({ out: outName, from: (await stat(path.join(LOGO_DIR, file))).size, to: res.size, dim: `${res.width}x${res.height}` })
}

/** Logo de MAD semitransparente para estampar en las fotos ampliadas. */
async function buildWatermark() {
  return sharp(path.join(OUT, 'logo-mark.webp'))
    .resize({ width: WATERMARK.width })
    .ensureAlpha()
    .linear([1, 1, 1, WATERMARK.opacity], [0, 0, 0, 0])
    .png()
    .toBuffer()
}

/** Redimensiona y estampa la marca de agua abajo a la derecha. */
async function resizeWithWatermark(pipeline, watermark) {
  const { data, info } = await pipeline
    .resize(FULL_LONG_SIDE, FULL_LONG_SIDE, { fit: 'inside', withoutEnlargement: true })
    .toBuffer({ resolveWithObject: true })
  const wm = await sharp(watermark).metadata()
  return sharp(data).composite([
    {
      input: watermark,
      left: info.width - wm.width - WATERMARK.margin,
      top: info.height - wm.height - WATERMARK.margin,
    },
  ])
}

async function main() {
  await rm(OUT, { recursive: true, force: true })
  await mkdir(OUT, { recursive: true })
  const sources = await listSources()

  // Logo: recorte del área del logo en la foto de la camiseta (logo.jpg 1200x896).
  await logo('logo.jpg', { left: 60, top: 20, width: 1090, height: 720 }, 420, 'logo-full.webp')
  await logo('logo.jpg', { left: 125, top: 40, width: 970, height: 450 }, 300, 'logo-mark.webp', {
    feather: [0.03, 0.045],
    low: 62,
    high: 115,
  })

  const watermark = await buildWatermark()

  for (const s of SINGLES) {
    const src = sources[s.index]
    const img = await loadClean(src)
    await save(
      img.resize(s.width, s.height, { fit: 'cover', position: s.position }).webp({ quality: s.quality, effort: 6 }),
      path.join(OUT, `${s.file}.webp`),
      src,
    )
  }

  for (const g of GALLERY) {
    const src = sources[g.index]
    const thumb = await loadClean(src)
    await save(
      thumb.resize(THUMB.width, THUMB.height, { fit: 'cover', position: g.position ?? 'attention' }).webp({ quality: THUMB.quality, effort: 6 }),
      path.join(OUT, 'gallery', `${g.id}-thumb.webp`),
      src,
    )
    const full = await resizeWithWatermark(await loadClean(src), watermark)
    await save(
      full.webp({ quality: 74, effort: 6 }),
      path.join(OUT, 'gallery', `${g.id}-full.webp`),
      src,
    )
  }

  const total = report.reduce((a, r) => a + r.to, 0)
  const lines = report.map((r) => `${r.out.padEnd(46)} ${r.dim.padEnd(10)} ${kb(r.from).padStart(10)} -> ${kb(r.to).padStart(9)}`)
  console.log(lines.join('\n'))
  console.log(`\nTotal generado: ${kb(total)}  (${report.length} archivos)`)
  await writeFile(path.join(OUT, '.gitkeep'), '')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
