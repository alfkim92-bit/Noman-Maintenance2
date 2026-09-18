import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import ContactForm from '@/components/sections/ContactForm'
import { NextUpGrid } from '@/components/CheckThis'
import { Reveal } from '@/components/motion'
import { fadeUp } from '@/lib/motion'
import { SITE } from '@/content/site'
import { resolveLinks } from '@/content/links'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Talk to Noman Maintenance Services Company about mechanical, electrical, civil or scaffolding scopes in Saudi Arabia, the UAE and Bahrain.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch with us"
        title="Contact Us"
        h1="Start your project with us"
        lead="Tell us the scope, the site and the window. We'll come back with a team and a schedule."
        image="/assets/projects/ducting-nederman.jpeg"
        trail={[{ href: '/contact', label: 'Contact' }]}
      />

      <section className="section-y bg-[var(--bg)]">
        <div className="container-x grid gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[1.15fr_1fr]">
          <Reveal variant={fadeUp}>
            <p className="spec-line">
              <span className="eyebrow ml-3">Send an enquiry</span>
            </p>
            <h2 className="mb-8 mt-4 text-[length:var(--fs-h2)] font-extrabold">
              Tell us what you need
            </h2>
            <ContactForm />
          </Reveal>

          <Reveal variant={fadeUp} delay={0.1}>
            <div className="flex flex-col gap-4">
              <InfoCard
                title="Talk to us"
                accent
                lines={[
                  <span key="n" className="font-semibold text-[var(--ink-strong)]">
                    {SITE.contactName}
                  </span>,
                  <a
                    key="p1"
                    href={SITE.phoneHref}
                    className="text-[var(--brand)] underline decoration-[var(--accent)] decoration-2 underline-offset-4"
                  >
                    {SITE.phoneLocal}
                  </a>,
                  <a
                    key="p2"
                    href={SITE.phoneHref}
                    className="text-[var(--brand)] underline decoration-[var(--accent)] decoration-2 underline-offset-4"
                  >
                    {SITE.phoneIntl}
                  </a>,
                ]}
              />

              <InfoCard
                title="Email"
                lines={[
                  <a
                    key="e"
                    href={`mailto:${SITE.email}`}
                    className="text-[var(--brand)] underline decoration-[var(--accent)] decoration-2 underline-offset-4"
                  >
                    {SITE.email}
                  </a>,
                  <span key="d" className="text-sm text-[var(--ink-muted)]">
                    We answer enquiries on working days.
                  </span>,
                ]}
              />

              <InfoCard
                title="Offices"
                lines={[
                  ...SITE.offices.map(o => (
                    <span key={o.country}>
                      <span className="font-semibold text-[var(--ink-strong)]">
                        {o.country}
                      </span>
                      <span className="text-[var(--ink-muted)]">
                        {' '}
                        — {o.cities.join(' & ')}
                      </span>
                    </span>
                  )),
                  <span
                    key="addr"
                    className="mt-2 inline-flex rounded-[var(--r-pill)] border border-dashed border-[var(--border-strong)] px-3 py-1 text-[.75rem] text-[var(--ink-subtle)]"
                  >
                    Registered street address to be confirmed
                  </span>,
                ]}
              />

              <InfoCard
                title="Working hours"
                lines={[
                  <span
                    key="wh"
                    className="inline-flex rounded-[var(--r-pill)] border border-dashed border-[var(--border-strong)] px-3 py-1 text-[.75rem] text-[var(--ink-subtle)]"
                  >
                    To be confirmed
                  </span>,
                ]}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <NextUpGrid
        items={resolveLinks(['/services', '/solutions', '/projects']).map(l => ({
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

function InfoCard({
  title,
  lines,
  accent = false,
}: {
  title: string
  lines: React.ReactNode[]
  accent?: boolean
}) {
  return (
    <div
      className={`rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--bg-subtle)] p-6 ${
        accent ? 'border-l-[4px] border-l-[var(--accent)]' : ''
      }`}
    >
      <h3 className="text-[.7rem] font-bold uppercase tracking-[.18em] text-[var(--ink-subtle)]">
        {title}
      </h3>
      <div className="mt-3 flex flex-col gap-1.5">{lines}</div>
    </div>
  )
}
