import { Mail, MapPin, Phone } from 'lucide-react'
import logoFull from '@/assets/images/logo-full.webp'
import { OptimizedImage } from '@/components/common/OptimizedImage'
import { navItems, site } from '@/config/site'
import { buildGmailComposeUrl } from '@/services/email'
import { buildGoogleMapsUrl } from '@/services/maps'
import { DEFAULT_QUOTE_MESSAGE, buildWhatsAppUrl } from '@/services/whatsapp'
import { Container } from './Container'

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="relative border-t border-neon/25 bg-navy-950/80 pt-14 pb-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent" />
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1.2fr]">
          <div>
            <OptimizedImage src={logoFull} alt={site.name} width={420} height={276} className="h-24 w-auto bg-transparent" />
            <p className="mt-4 max-w-xs text-sm text-muted">{site.slogan}.</p>
          </div>

          <nav aria-label="Pie de página">
            <h2 className="mb-3 text-xl font-bold uppercase text-white">Navegación</h2>
            <ul className="space-y-2 text-sm text-muted">
              {navItems.map((n) => (
                <li key={n.id}>
                  <a href={n.href} className="transition-colors hover:text-brand">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-3 text-xl font-bold uppercase text-white">Contacto</h2>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-brand" />
                <a href={buildWhatsAppUrl(DEFAULT_QUOTE_MESSAGE)} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-brand" />
                <a href={buildGmailComposeUrl()} target="_blank" rel="noopener noreferrer" className="break-all hover:text-brand">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-brand" />
                <a href={buildGoogleMapsUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                  {site.area}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-muted">
          © {currentYear} {site.name}. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  )
}
