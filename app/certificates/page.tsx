import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import { NextUpGrid } from '@/components/CheckThis'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion'
import { fadeUp, popIn } from '@/lib/motion'
import { SITE } from '@/content/site'
import { resolveLinks } from '@/content/links'

export const metadata: Metadata = {
  title: 'Our Certificates',
  description: `Noman Maintenance Services Company is commercially registered in the Kingdom of Saudi Arabia under CR ${SITE.cr}. Registrations and accreditations we hold.`,
  alternates: { canonical: '/certificates' },
}

/** Nothing here is invented. Slots we cannot evidence are shown as awaiting. */
const AWAITING = [
  { name: 'ISO 9001', detail: 'Quality management' },
  { name: 'ISO 45001', detail: 'Occupational health & safety' },
  { name: 'ISO 14001', detail: 'Environmental management' },
  { name: 'Client pre-qualifications', detail: 'Operator approvals' },
]

export default function CertificatesPage() {
  return (
    <>
      <PageHero
        eyebrow="Compliance"
        title="Our Certificates"
        h1="Registrations and accreditations"
        lead={`Noman Maintenance Services Company is commercially registered in the Kingdom of Saudi Arabia under CR ${SITE.cr}.`}
        trail={[{ href: '/certificates', label: 'Certificates' }]}
      />

      <section className="section-y bg-[var(--bg)]">
        <div className="container-x">
          <Reveal variant={fadeUp}>
            <p className="spec-line">
              <span className="eyebrow ml-3">On record</span>
            </p>
            <h2 className="mt-4 text-[length:var(--fs-h2)] font-extrabold">
              What we can evidence today
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-[clamp(1rem,.5rem+1.5vw,2rem)] sm:grid-cols-2 lg:grid-cols-3">
            <Reveal variant={popIn}>
              <article className="flex h-full flex-col rounded-[var(--r-lg)] border border-[var(--border)] bg-white p-7 shadow-[var(--sh-sm)]">
                <span aria-hidden className="chevron-rule">
                  <i />
                  <i />
                  <i />
                </span>
                <h3 className="mt-4 text-[length:var(--fs-h3)] font-bold">
                  Commercial Registration
                </h3>
                <p className="mt-2 flex-1 text-[var(--ink-muted)]">
                  Issued in the Kingdom of Saudi Arabia.
                </p>
                <p className="stat-num mt-5 text-[1.75rem] tabular-nums">
                  {SITE.cr}
                </p>
              </article>
            </Reveal>
          </div>

          {/* Honest empty state — never fabricate a certification */}
          <Reveal variant={fadeUp} className="mt-16">
            <p className="spec-line">
              <span className="eyebrow ml-3">Awaiting documents</span>
            </p>
            <h2 className="mt-4 text-[length:var(--fs-h2)] font-extrabold">
              Slots ready for the rest
            </h2>
            <p className="lead mt-4">
              These cards are built and will publish as soon as Noman supplies
              the certificates. We do not list an accreditation before we hold
              the document.
            </p>
          </Reveal>

          <RevealGroup
            step={0.07}
            className="mt-10 grid gap-[clamp(1rem,.5rem+1.5vw,2rem)] sm:grid-cols-2 lg:grid-cols-4"
          >
            {AWAITING.map(c => (
              <RevealItem key={c.name} variant={popIn}>
                <article className="flex h-full flex-col rounded-[var(--r-lg)] border border-dashed border-[var(--border-strong)] bg-[var(--bg-subtle)] p-6">
                  <span className="text-[.7rem] font-bold uppercase tracking-[.18em] text-[var(--ink-subtle)]">
                    Awaiting document
                  </span>
                  <h3 className="mt-3 text-[1.0625rem] font-bold text-[var(--ink-muted)]">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--ink-subtle)]">
                    {c.detail}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <NextUpGrid
        items={resolveLinks(['/about', '/projects', '/contact']).map(l => ({
          href: l.href,
          title: l.title,
          blurb: l.blurb,
          kicker: l.kicker,
          image: l.image,
        }))}
      />
    </>
  )
}
