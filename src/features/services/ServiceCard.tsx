import { NeonCard } from '@/components/common/NeonCard'
import type { ServiceItem } from './data'

/** Tarjeta de un servicio. Reutilizable en cualquier lista de servicios. */
export function ServiceCard({ title, description, icon: Icon }: ServiceItem) {
  return (
    <NeonCard interactive className="h-full p-6">
      <span className="grid size-12 place-items-center rounded-xl border border-brand/40 bg-brand/10 text-brand">
        <Icon className="size-6" />
      </span>
      <h3 className="mt-4 text-2xl font-bold uppercase text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </NeonCard>
  )
}
