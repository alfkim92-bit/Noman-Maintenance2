import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { SITE } from '@/content/site'

export const runtime = 'nodejs'

const REQUIRED = ['firstName', 'lastName', 'email', 'message'] as const
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
const MAX = 5000

type Payload = Record<string, unknown>

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

export async function POST(req: Request) {
  let data: Payload
  try {
    data = (await req.json()) as Payload
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Malformed request.' },
      { status: 400 }
    )
  }

  /* Honeypot — real people never fill a hidden field. Answer 200 so bots
     don't learn anything from the response. */
  if (str(data.company_website)) return NextResponse.json({ ok: true })

  for (const field of REQUIRED) {
    if (!str(data[field])) {
      return NextResponse.json(
        { ok: false, error: `${field} is required`, field },
        { status: 400 }
      )
    }
  }

  const email = str(data.email)
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: 'Enter a valid email address.', field: 'email' },
      { status: 400 }
    )
  }

  if (str(data.message).length > MAX) {
    return NextResponse.json(
      { ok: false, error: 'Message is too long.', field: 'message' },
      { status: 400 }
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    /* Fail honestly rather than showing a fake success like the old site did. */
    console.error('[contact] RESEND_API_KEY is not set — email not sent.')
    return NextResponse.json(
      {
        ok: false,
        error:
          'The enquiry form is not connected yet. Please email or call us directly.',
        unconfigured: true,
      },
      { status: 503 }
    )
  }

  const firstName = str(data.firstName)
  const lastName = str(data.lastName)
  const service = str(data.service) || 'General enquiry'

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM ?? 'Noman Website <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO ?? SITE.email],
      replyTo: email,
      subject: `Website enquiry — ${service} — ${firstName} ${lastName}`,
      text: [
        `Name:    ${firstName} ${lastName}`,
        `Email:   ${email}`,
        `Phone:   ${str(data.phone) || '—'}`,
        `Company: ${str(data.company) || '—'}`,
        `Service: ${service}`,
        '',
        str(data.message),
      ].join('\n'),
    })

    if (error) {
      console.error('[contact] resend error', error)
      return NextResponse.json(
        { ok: false, error: 'We could not send your message. Please try again.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] unexpected error', err)
    return NextResponse.json(
      { ok: false, error: 'We could not send your message. Please try again.' },
      { status: 500 }
    )
  }
}
