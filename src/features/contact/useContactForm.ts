import { useState, type ChangeEvent, type FormEvent } from 'react'
import {
  contactFormToWhatsAppUrl,
  emptyContactForm,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from '@/services/contactForm'

/** Estado, validación y envío (apertura de WhatsApp) del formulario de contacto. */
export function useContactForm() {
  const [values, setValues] = useState<ContactFormValues>(emptyContactForm)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [sent, setSent] = useState(false)

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name as keyof ContactFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
    setSent(false)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const found = validateContactForm(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    window.open(contactFormToWhatsAppUrl(values), '_blank', 'noopener,noreferrer')
    setSent(true)
    setValues(emptyContactForm)
  }

  return { values, errors, sent, onChange, onSubmit }
}
