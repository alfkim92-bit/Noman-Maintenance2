'use client'

import { useId, useRef, useState } from 'react'

const SERVICES = [
  'Engineering & Design',
  'Construction & Infrastructure',
  'Mechanical Works',
  'Electrical & Instrumentation',
  'Construction Scaffolds',
  'Suspended Scaffolds',
  'Other solution',
  'General enquiry',
]

type Status =
  | { state: 'idle' }
  | { state: 'sending' }
  | { state: 'sent' }
  | { state: 'error'; message: string; field?: string }

export default function ContactForm() {
  const id = useId()
  const [status, setStatus] = useState<Status>({ state: 'idle' })
  const formRef = useRef<HTMLFormElement>(null)

  const errorField = status.state === 'error' ? status.field : undefined

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status.state === 'sending') return
    setStatus({ state: 'sending' })

    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd.entries())

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()

      if (!res.ok || !json.ok) {
        setStatus({
          state: 'error',
          message:
            json?.error ?? 'We could not send your message. Please try again.',
          field: json?.field,
        })
        return
      }

      setStatus({ state: 'sent' })
      formRef.current?.reset()
    } catch {
      setStatus({
        state: 'error',
        message:
          'We could not reach the server. Check your connection, or call us directly.',
      })
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--bg-subtle)] p-[clamp(1.5rem,3vw,2.5rem)]"
    >
      {/* honeypot — hidden from people, irresistible to bots */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-hp`}>Company website</label>
        <input id={`${id}-hp`} name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${id}-first`} name="firstName" label="First name" required autoComplete="given-name" invalid={errorField === 'firstName'} />
        <Field id={`${id}-last`} name="lastName" label="Last name" required autoComplete="family-name" invalid={errorField === 'lastName'} />
      </div>

      <Field id={`${id}-email`} name="email" type="email" label="Email address" required autoComplete="email" invalid={errorField === 'email'} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${id}-phone`} name="phone" type="tel" label="Phone number" autoComplete="tel" />
        <Field id={`${id}-company`} name="company" label="Company" autoComplete="organization" />
      </div>

      <div className="mt-4">
        <label htmlFor={`${id}-service`} className="mb-2 block text-sm font-semibold">
          Service of interest
        </label>
        <select
          id={`${id}-service`}
          name="service"
          defaultValue=""
          className="min-h-[48px] w-full rounded-[var(--r-sm)] border-[1.5px] border-[var(--border-strong)] bg-white px-4 py-3 text-[var(--ink)] transition-colors focus:border-[var(--brand)]"
        >
          <option value="">Select a service…</option>
          {SERVICES.map(s => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor={`${id}-message`} className="mb-2 block text-sm font-semibold">
          Your message <span className="text-[var(--accent)]">*</span>
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={6}
          aria-invalid={errorField === 'message' || undefined}
          placeholder="Tell us the scope, the site and the window."
          className="w-full resize-y rounded-[var(--r-sm)] border-[1.5px] border-[var(--border-strong)] bg-white px-4 py-3 text-[var(--ink)] transition-colors focus:border-[var(--brand)]"
        />
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm text-[var(--ink-muted)]">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-[18px] w-[18px] flex-none accent-[var(--accent)]"
        />
        <span>
          I agree that Noman may use these details to respond to my enquiry.
        </span>
      </label>

      <button
        type="submit"
        disabled={status.state === 'sending'}
        className="btn btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status.state === 'sending' ? 'Sending…' : 'Send message'}
      </button>

      {/* One live region, honest about every outcome */}
      <div aria-live="polite" className="mt-4 min-h-[1.5rem]">
        {status.state === 'sent' && (
          <p className="rounded-[var(--r-sm)] border border-[var(--success)]/30 bg-[var(--success)]/8 px-4 py-3 text-sm font-medium text-[var(--success)]">
            Thank you — your message has been sent. We will come back to you
            shortly.
          </p>
        )}
        {status.state === 'error' && (
          <p className="rounded-[var(--r-sm)] border border-[var(--danger)]/30 bg-[var(--danger)]/8 px-4 py-3 text-sm font-medium text-[var(--danger)]">
            {status.message}
          </p>
        )}
      </div>
    </form>
  )
}

function Field({
  id,
  name,
  label,
  type = 'text',
  required = false,
  autoComplete,
  invalid,
}: {
  id: string
  name: string
  label: string
  type?: string
  required?: boolean
  autoComplete?: string
  invalid?: boolean
}) {
  return (
    <div className="mt-4">
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label} {required && <span className="text-[var(--accent)]">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={invalid || undefined}
        className="min-h-[48px] w-full rounded-[var(--r-sm)] border-[1.5px] border-[var(--border-strong)] bg-white px-4 py-3 text-[var(--ink)] transition-colors focus:border-[var(--brand)] aria-[invalid]:border-[var(--danger)]"
      />
    </div>
  )
}
