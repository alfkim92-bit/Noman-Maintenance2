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
        <div className="container-x grid items-start gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[1.15fr_1fr]">
          <Reveal variant={fadeUp} className="flex flex-col gap-8">
            <div>
              <h2 className="text-[length:var(--fs-h3)] font-bold text-[var(--brand)] mb-3">
                {SERVICE_OVERVIEW.whatWeDo.heading}
              </h2>
              <p className="text-[1.0625rem] leading-[1.75] text-[var(--ink)]">
                {SERVICE_OVERVIEW.whatWeDo.text}
              </p>
            </div>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[var(--r-md)]">
              <img
                src="/assets/projects/power-plant-ei.jpeg"
                alt="Noman service operations"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal variant={fadeUp} className="flex flex-col gap-8 lg:mt-12">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--r-md)] border-l-4 border-[var(--accent)]">
              <img
                src="/assets/projects/steam-turbine-erection.jpeg"
                alt="Engineering and design works"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="bg-white/50 p-6 rounded-[var(--r-md)] border border-[var(--border)]">
              <h2 className="text-[length:var(--fs-h3)] font-bold text-[var(--brand)] mb-3">
                {SERVICE_OVERVIEW.whyWeDoIt.heading}
              </h2>
              <p className="text-[1.0625rem] leading-[1.75] text-[var(--ink)]">
                {SERVICE_OVERVIEW.whyWeDoIt.text}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="container-x mt-16 pt-8 border-t border-[var(--border)]">
          <RevealGroup
            step={0.07}
            className="grid gap-[clamp(1rem,.5rem+1.5vw,2rem)] sm:grid-cols-2"
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
