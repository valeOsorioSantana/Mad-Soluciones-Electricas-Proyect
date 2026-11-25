import { buildGmailComposeUrl } from './email'

describe('buildGmailComposeUrl', () => {
  it('apunta a la redacción de Gmail con destinatario y asunto', () => {
    const url = new URL(buildGmailComposeUrl('Hola'))
    expect(url.origin + url.pathname).toBe('https://mail.google.com/mail/')
    expect(url.searchParams.get('view')).toBe('cm')
    expect(url.searchParams.get('to')).toBe('gelo25@outlook.com')
    expect(url.searchParams.get('su')).toBe('Hola')
  })
})
