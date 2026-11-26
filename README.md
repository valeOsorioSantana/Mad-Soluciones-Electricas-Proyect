# MAD Soluciones Eléctricas · Landing page

Landing page de **MAD Soluciones Eléctricas** (Medellín y alrededores): presentación, servicios, trabajos realizados y contacto por WhatsApp.

**Stack:** React 19 + TypeScript · Vite · Tailwind CSS v4 · shadcn/ui + Radix UI · Motion · Docker + Nginx · Git + GitHub Actions.

## Comandos

```bash
npm install
npm run dev         # desarrollo
npm run build       # producción (tsc + vite)
npm run lint        # oxlint
npm run typecheck
npm test            # vitest
npm run images      # regenera las imágenes optimizadas desde los originales
```

## Arquitectura (Component Composition)

```
src/
  app/          App, rutas (agregar una página = componente en pages/ + ruta en routes.tsx)
  pages/        HomePage: solo compone secciones
  features/     una carpeta por sección: hero, about, services, process, gallery, faq, contact
                (componentes de presentación + hook de lógica + data.ts con el contenido)
  components/
    ui/         primitivas estilo shadcn sobre Radix (button, accordion, dialog, input…)
    layout/     Header, Footer, Section, Container, SectionHeading
    common/     NeonCard, OptimizedImage, Reveal, WhatsAppButton…
  config/       site.ts: datos de marca y contacto (única fuente de verdad)
  services/     lógica pura sin UI: enlaces de WhatsApp, validación del formulario
  hooks/        hooks compartidos (useScrollSpy)
```

- **Single Responsibility:** cada sección y cada componente hace una sola cosa.
- **Reusabilidad:** `NeonCard`, `Section`, `SectionHeading`, `OptimizedImage`, `WhatsAppButton` se configuran por props.
- **Composición:** `HomePage` agrupa secciones; el contenido vive en `data.ts`, no en el JSX.
- **Separación de responsabilidades:** presentación (components) · lógica (hooks) · servicios (services) · datos (data.ts/config).
- **Escalabilidad:** una sección nueva es una carpeta nueva en `features/`; una página nueva, un archivo en `pages/`.

Para cambiar teléfono, correo o textos de marca: `src/config/site.ts`. Servicios: `src/features/services/data.ts`. FAQ: `src/features/faq/data.ts`.

## Imágenes

Los originales (fotos de celular de varios MB) **no** están en el repositorio. `scripts/optimize-images.mjs` (sharp) los convierte a **WebP**, a **un único tamaño por uso** (igual en móvil y escritorio), sin metadatos y recortando el sello de fecha del celular. El resultado queda en `src/assets/images/` y Vite lo publica con nombre con hash.

| Uso | Tamaño | Peso aprox. |
| --- | --- | --- |
| Hero | 640×800 | ~75 KB |
| Sobre nosotros | 560×560 | ~40 KB |
| Miniaturas de galería (16) | 480×360 | 4–60 KB (media ~20 KB) |
| Ampliación (solo al abrir el visor) | ≤1100 px | 15–320 KB |
| Logo | 420×276 / 260×116 | 46 KB / 12 KB |

Carga inicial: solo hero + logo; el resto con `loading="lazy"`.

## Protección de imágenes (Nginx)

Ver `nginx/default.conf.template`. Para archivos `webp/avif/png/jpg/mp4`:

- **Hotlinking/descarga directa bloqueados (403):** se exige `Referer` de un host autorizado y `Sec-Fetch-Site` distinto de `cross-site`/`none`.
- **Límite por IP:** 15 peticiones/s (ráfaga 60) y 20 conexiones → 429 contra scrapers.
- Sin listado de directorios, nombres con hash, `X-Robots-Tag: noimageindex`, `Cross-Origin-Resource-Policy: same-origin`.
- En el cliente: sin arrastrar ni menú contextual sobre las fotos (solo disuasivo).

> Ninguna medida impide que alguien capture la pantalla o guarde lo que su navegador ya muestra; esto frena la **descarga masiva automatizada**.

Configura los dominios permitidos con `ALLOWED_HOSTS` (por defecto solo localhost):

```bash
docker build -t mad-web .
docker run -p 8080:8080 -e ALLOWED_HOSTS="midominio.com *.midominio.com" mad-web
```

## CI/CD

- `.github/workflows/ci.yml`: lint, typecheck, tests y build en cada push/PR.
- `.github/workflows/deploy.yml`: construye y publica la imagen en GHCR en `main`. El despliegue por SSH se activa con la variable `DEPLOY_ENABLED=true` y los secretos `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY` (+ variable `ALLOWED_HOSTS`).

## Producción: Cloudflare Pages

CI/CD con GitHub Actions (`deploy-cloudflare.yml`): si CI pasa, publica en Cloudflare Pages; los pull requests generan vista previa. Cabeceras de seguridad y caché en `public/_headers`. Guía completa: [docs/DEPLOY-CLOUDFLARE.md](docs/DEPLOY-CLOUDFLARE.md).

## Demo temporal en Render

`render.yaml` despliega el sitio como **Static Site** (build `npm ci && npm run build`, publica `dist/`, reescribe todas las rutas a `index.html`, `noindex` para que Google no lo indexe). Pasos en el chat del proyecto; resumen: Render → New → Blueprint → elegir el repositorio → Apply. Cada `git push` a `main` redespliega solo. En Render no aplican las reglas de protección de imágenes de Nginx (solo sirven con Docker).

## Pendientes del cliente

- Confirmar la ubicación exacta de la sede (hoy solo "Medellín y alrededores, a domicilio").
- Dominio y servidor de despliegue.
- Si se desea, agregar testimonios reales y planes/precios (no incluidos al no estar en el documento).
