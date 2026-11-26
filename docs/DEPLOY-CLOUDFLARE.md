# Despliegue definitivo en Cloudflare Pages

Flujo: `git push` → GitHub Actions corre CI (lint, typecheck, tests, build) → si pasa, publica `dist/` en Cloudflare Pages.
`main` = producción. Cada pull request = vista previa con URL propia.

## 1. Cuenta y dominio
1. Crea una cuenta gratuita en cloudflare.com.
2. Dominio propio:
   - Comprarlo en Cloudflare Registrar, o
   - Si ya lo tienes en otro registrador: *Add a site* → plan **Free** → cambia los *nameservers* del dominio a los que indique Cloudflare (necesario para usar el dominio raíz, p. ej. `midominio.com`).

## 2. Crear el proyecto de Pages (una sola vez)
En una terminal, dentro del proyecto:
```bash
npx wrangler login
npx wrangler pages project create mad-soluciones-electricas --production-branch=main
```
(El nombre define la URL `https://mad-soluciones-electricas.pages.dev`. Si está tomado, elige otro y úsalo en el paso 4.)

## 3. Token y ID de cuenta
- **Token:** Cloudflare → *My Profile* → *API Tokens* → *Create Token* → personalizado con permiso **Account › Cloudflare Pages › Edit**.
- **Account ID:** en *Workers & Pages* (barra lateral derecha).

## 4. Secretos en GitHub
Repositorio → *Settings* → *Secrets and variables* → *Actions*:
- Secret `CLOUDFLARE_API_TOKEN`
- Secret `CLOUDFLARE_ACCOUNT_ID`
- Variable `CLOUDFLARE_PROJECT_NAME` = nombre del paso 2

## 5. Publicar
`git push origin main` → pestaña **Actions** → workflow *Deploy (Cloudflare Pages)*. Al terminar, el sitio queda en la URL `.pages.dev`.

## 6. Dominio propio
Cloudflare → *Workers & Pages* → tu proyecto → *Custom domains* → *Set up a domain*. HTTPS se activa solo.
Después de tener dominio, en `index.html` agrega la etiqueta `<link rel="canonical">` y `og:url` con la URL final.

## 7. Verificación
```bash
curl -sI https://TU-DOMINIO/ | grep -iE "content-security|x-frame|cache-control|server"
curl -s -o /dev/null -w "%{http_code}\n" https://TU-DOMINIO/ruta-inexistente   # 200 (SPA)
```
Y revisa la página en móvil y escritorio. Opcional: Lighthouse desde Chrome DevTools.

## Notas
- **Reversión:** en *Deployments* del proyecto puedes volver a un despliegue anterior.
- **Protección de imágenes:** el *Hotlink Protection* integrado de Cloudflare solo cubre gif/ico/jpg/jpeg/png, no `webp`. Una regla personalizada de WAF por `Referer` puede cubrir `webp`; no frena capturas de pantalla.
- **Cloudflare recomienda Workers para proyectos nuevos.** Pages sigue activo; si algún día se retira, migrar es un cambio de `wrangler pages deploy` a `wrangler deploy` (ver su guía de migración).
- La demo en Render (`render.yaml`) puede borrarse al terminar; no interfiere con este flujo.
