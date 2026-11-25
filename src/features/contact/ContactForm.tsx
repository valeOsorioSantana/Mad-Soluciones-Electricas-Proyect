import { Send } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Input, Select, Textarea } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { services } from '@/features/services/data'
import { useContactForm } from './useContactForm'

function Field({ id, label, error, children }: { id: string; label: string; error?: string | undefined; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  )
}

export function ContactForm() {
  const { values, errors, sent, onChange, onSubmit } = useContactForm()

  const aria = (name: keyof typeof errors) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Nombre" error={errors.name}>
          <Input id="name" name="name" autoComplete="name" placeholder="Tu nombre" value={values.name} onChange={onChange} {...aria('name')} />
        </Field>
        <Field id="phone" label="Teléfono" error={errors.phone}>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="300 000 0000" value={values.phone} onChange={onChange} {...aria('phone')} />
        </Field>
      </div>
      <Field id="service" label="Servicio de interés (opcional)">
        <Select id="service" name="service" value={values.service} onChange={onChange}>
          <option value="">Selecciona un servicio</option>
          {services.map((s) => (
            <option key={s.title} value={s.title}>
              {s.title}
            </option>
          ))}
        </Select>
      </Field>
      <Field id="message" label="Mensaje" error={errors.message}>
        <Textarea id="message" name="message" placeholder="Cuéntanos qué necesitas" value={values.message} onChange={onChange} {...aria('message')} />
      </Field>
      <Button type="submit" size="lg" className="w-full">
        <Send /> Enviar por WhatsApp
      </Button>
      <p role="status" className="min-h-5 text-center text-sm text-neon-soft">
        {sent ? 'Abrimos WhatsApp con tu mensaje. ¡Gracias por escribirnos!' : ''}
      </p>
    </form>
  )
}
