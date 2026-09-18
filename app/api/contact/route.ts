import { NextResponse } from 'next/server'
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

  const firstName = str(data.firstName)
  const lastName = str(data.lastName)
  const service = str(data.service) || 'General enquiry'

  // TODO: wire up an email provider (e.g. Resend) when ready.
  // For now we log the submission server-side so no enquiry is lost.
  console.log('[contact] New enquiry received:', {
    name: `${firstName} ${lastName}`,
    email,
    phone: str(data.phone) || '—',
    company: str(data.company) || '—',
    service,
    to: SITE.email,
    message: str(data.message),
  })

  return NextResponse.json({ ok: true })
}

