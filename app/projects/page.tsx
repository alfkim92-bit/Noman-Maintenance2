import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/sections/PageHero'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import { CheckThis, NextUpGrid } from '@/components/CheckThis'
import { Reveal, MaskedImage } from '@/components/motion'
import { fadeUp } from '@/lib/motion'
import { PROJECTS } from '@/content/projects'
import { resolveLinks } from '@/content/links'

export const metadata: Metadata = {
  title: 'Our Projects',
  description:
    'Completed and ongoing scopes delivered by Noman across power, industrial and infrastructure sites in Saudi Arabia — turbine erection, E&I works and ducting.',
  alternates: { canonical: '/projects' },
}

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Our Projects"
        h1="Work delivered"
        lead="A selection of completed and ongoing scopes across power, industrial and infrastructure sites in the Kingdom."
        image="/assets/projects/steam-turbine-erection.jpeg"
        trail={[{ href: '/projects', label: 'Projects' }]}
      />

      <section className="section-y bg-[var(--bg)]">
        <div className="container-x">
          <div className="grid gap-[clamp(1rem,.5rem+1.5vw,2rem)] sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <MaskedImage key={p.title} delay={i * 0.09}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[var(--r-lg)] border border-[var(--border)] bg-white shadow-[var(--sh-sm)] transition-shadow duration-300 hover:shadow-[var(--sh-lg)]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-[.7rem] font-bold uppercase tracking-[.18em] text-[var(--ink-subtle)]">
                      {p.discipline}
                    </span>
                    <h2 className="mt-2 flex-1 text-[length:var(--fs-h3)] font-bold">
                      {p.title}
                    </h2>

                    {/* Honest about what we don't have yet */}
                    <dl className="mt-5 flex flex-wrap gap-2 border-t border-[var(--border)] pt-4">
                      {p.pending.map(f => (
                        <div
                          key={f}
                          className="inline-flex items-center gap-1.5 rounded-[var(--r-pill)] border border-dashed border-[var(--border-strong)] px-2.5 py-1 text-[.7rem] text-[var(--ink-subtle)]"
                        >
                          <dt>{f}</dt>
                          <dd className="font-medium">to be confirmed</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </article>
              </MaskedImage>
            ))}
          </div>

          {/* "More projects being added" — replaces the old dashed placeholder */}
          <Reveal variant={fadeUp} className="mt-10">
            <div className="blueprint relative overflow-hidden rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--bg-subtle)] p-[clamp(1.75rem,4vw,3rem)]">
              <span aria-hidden className="chevron-rule">
                <i />
                <i />
                <i />
              </span>
              <h2 className="mt-4 text-[length:var(--fs-h3)] font-bold">
                More projects are being added
              </h2>
              <p className="mt-3 max-w-[60ch] text-[var(--ink-muted)]">
                Noman has delivered 24+ scopes across the Kingdom. We are working
                through the client approvals needed to publish the rest. If you
                want to see relevant references for a specific scope or sector,
                ask us — we will send the project list directly.
              </p>
              <Link href="/contact" className="btn btn-primary mt-6">
                Request our project list
              </Link>
            </div>
          </Reveal>

          <CheckThis href="/services" label="Service overview" />
        </div>
      </section>

      <WhyChooseUs />

      <NextUpGrid
        items={resolveLinks(['/services', '/certificates', '/contact']).map(l => ({
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

