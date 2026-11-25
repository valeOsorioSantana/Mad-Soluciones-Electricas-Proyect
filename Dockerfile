# syntax=docker/dockerfile:1

# ---- Build ----
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Runtime (Nginx sin privilegios de root, puerto 8080) ----
FROM nginxinc/nginx-unprivileged:1.27-alpine AS runtime
# Hosts autorizados a cargar imágenes. En producción: ALLOWED_HOSTS="midominio.com *.midominio.com"
# "server_names" autoriza el server_name actual; localhost/127.0.0.1 facilitan las pruebas locales.
ENV ALLOWED_HOSTS="localhost 127.0.0.1 localhost:8080 127.0.0.1:8080"
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY nginx/security-headers.conf /etc/nginx/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:8080/ >/dev/null || exit 1
