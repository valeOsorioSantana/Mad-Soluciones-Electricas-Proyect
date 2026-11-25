import { ExternalLink, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react'
import { NeonCard } from '@/components/common/NeonCard'
import { WhatsAppButton } from '@/components/common/WhatsAppButton'
import { site } from '@/config/site'
import { DEFAULT_QUOTE_MESSAGE, buildWhatsAppUrl } from '@/services/whatsapp'
import { buildGmailComposeUrl } from '@/services/email'
import { buildGoogleMapsUrl } from '@/services/maps'

function InfoRow({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-brand/40 bg-brand/10 text-brand">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
        <div className="font-medium text-white">{children}</div>
      </div>
    </li>
  )
}

/** Datos de contacto y "radar" de cobertura (sin ubicación exacta: servicio a domicilio). */
export function ContactInfo() {
  return (
    <div className="space-y-5">
      <ul className="space-y-4">
        <InfoRow icon={Phone} label="Teléfono / WhatsApp">
          <a href={buildWhatsAppUrl(DEFAULT_QUOTE_MESSAGE)} target="_blank" rel="noopener noreferrer" className="hover:text-brand">{site.phoneDisplay}</a>
        </InfoRow>
        <InfoRow icon={Mail} label="Correo">
          <a href={buildGmailComposeUrl()} target="_blank" rel="noopener noreferrer" className="break-all hover:text-brand">{site.email}</a>
        </InfoRow>
        <InfoRow icon={MapPin} label="Cobertura">
          <a href={buildGoogleMapsUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
            {site.area} · servicio a domicilio
          </a>
        </InfoRow>
      </ul>

      <a
        href={buildGoogleMapsUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ver ${site.area} en Google Maps`}
        className="group block rounded-2xl transition-transform hover:-translate-y-0.5"
      >
        <NeonCard className="relative grid h-48 place-items-center overflow-hidden">
          <div className="circuit-bg absolute inset-0" aria-hidden="true" />
          {[28, 60, 92].map((size) => (
            <span key={size} aria-hidden="true" className="absolute rounded-full border border-neon/40" style={{ width: `${size * 2}px`, height: `${size * 2}px`, maxWidth: '90%' }} />
          ))}
          <span aria-hidden="true" className="absolute size-[184px] animate-ping rounded-full bg-brand/10 motion-reduce:hidden" />
          <div className="relative flex flex-col items-center text-center">
            <MapPin className="size-9 text-brand drop-shadow-[0_0_10px_rgb(245_197_24/0.8)]" />
            <p className="mt-1 font-display text-xl font-bold uppercase text-white">Medellín</p>
            <p className="text-xs text-muted">y sus alrededores</p>
          </div>
        </NeonCard>
        <span className="mt-2 flex items-center justify-center gap-1.5 text-sm font-medium text-neon-soft group-hover:text-brand">
          <ExternalLink className="size-4" /> Abrir en Google Maps
        </span>
      </a>

      <WhatsAppButton variant="whatsapp" size="lg" className="w-full" message={DEFAULT_QUOTE_MESSAGE}>
        Chatear por WhatsApp
      </WhatsAppButton>
    </div>
  )
}
