import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import HowWeDeliver from '@/components/sections/HowWeDeliver'
import StatsBand from '@/components/sections/StatsBand'
import Card from '@/components/ui/Card'
import { CheckThis, NextUpGrid } from '@/components/CheckThis'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion'
import { fadeUp, popIn } from '@/lib/motion'
import { SERVICES, SERVICE_OVERVIEW } from '@/content/services'
import { resolveLinks } from '@/content/links'

export const metadata: Metadata = {
  title: 'Service Overview',
  description: SERVICE_OVERVIEW.metaDescription,
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={SERVICE_OVERVIEW.eyebrow}
        title={SERVICE_OVERVIEW.heroTitle}
        h1={SERVICE_OVERVIEW.h1}
        lead={SERVICE_OVERVIEW.lead}
        trail={[{ href: '/services', label: 'Services' }]}
      />

      <section className="section-y bg-[var(--bg)]">
        <div className="container-x">
          <Reveal variant={fadeUp} className="max-w-[68ch]">
            {SERVICE_OVERVIEW.body.map(p => (
              <p key={p} className="mb-5 text-[1.0625rem] leading-[1.75]">
                {p}
              </p>
            ))}
          </Reveal>

          <RevealGroup
            step={0.07}
            className="mt-12 grid gap-[clamp(1rem,.5rem+1.5vw,2rem)] sm:grid-cols-2"
          >
            {SERVICES.map(s => (
              <RevealItem key={s.slug} variant={popIn}>
                <Card
                  href={`/services/${s.slug}`}
                  title={s.title}
                  blurb={s.blurb}
                  image={s.image}
                  imageAlt={s.imageAlt}
                  kicker="Service"
                  cta={`Discover ${s.title.toLowerCase()}`}
                />
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-10">
            <CheckThis
              href={SERVICE_OVERVIEW.checkThis.href}
              label={SERVICE_OVERVIEW.checkThis.label}
            />
          </div>
        </div>
      </section>

      <HowWeDeliver />
      <StatsBand />

      <NextUpGrid
        items={resolveLinks(SERVICE_OVERVIEW.nextUp).map(l => ({
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
