import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import HomeHero from '@/components/sections/HomeHero'
import HowWeDeliver from '@/components/sections/HowWeDeliver'
import WhyNoman from '@/components/sections/WhyNoman'
import Vision2030 from '@/components/sections/Vision2030'
import Card from '@/components/ui/Card'
import { CheckThis, NextUpGrid } from '@/components/CheckThis'
import { SectionHeader } from '@/components/layout/Section'
import { MaskedImage, RevealGroup, RevealItem } from '@/components/motion'
import { popIn } from '@/lib/motion'
import { SERVICES } from '@/content/services'
import { SOLUTIONS } from '@/content/solutions'
import { PROJECTS } from '@/content/projects'
import { resolveLinks } from '@/content/links'
import { SITE } from '@/content/site'

export const metadata: Metadata = {
  title: 'Industrial & Infrastructure Contractor in Saudi Arabia',
  description:
    'Noman Maintenance Services Company delivers mechanical, electrical & instrumentation, civil and scaffolding works to plants, refineries and power projects in the Gulf.',
  alternates: { canonical: '/' },
}

const localBusinessLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE.name,
  alternateName: SITE.nameAr,
  url: SITE.url,
  email: SITE.email,
  telephone: '+966591063827',
  description: SITE.positioning,
  identifier: { '@type': 'PropertyValue', name: 'CR', value: SITE.cr },
  address: SITE.offices.map(o => ({
    '@type': 'PostalAddress',
    addressCountry: o.country,
    addressLocality: o.cities.join(', '),
  })),
}

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* ------------------------------------------------- capabilities -- */}
      <section className="section-y bg-[var(--bg)]">
        <div className="container-x">
          <SectionHeader
            eyebrow="What we do"
            title="Four disciplines, one site team"
            lead="Most industrial work fails at the handover between trades. We keep all four under one contract, one schedule and one QA/QC regime."
          />

          <RevealGroup
            step={0.07}
            className="mt-12 grid gap-[clamp(1rem,.5rem+1.5vw,2rem)] sm:grid-cols-2 lg:grid-cols-4"
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
                />
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-10">
            <CheckThis href="/services" label="Service overview" />
          </div>
        </div>
      </section>

      <HowWeDeliver />

      {/* ----------------------------------------------------- solutions -- */}
      <section className="section-y bg-[var(--bg)]">
        <div className="container-x">
          <SectionHeader
            eyebrow="Engineered solutions"
            title="Specialist systems we supply, install and maintain"
            lead="Seven engineered systems, each chosen because it solves a problem our clients actually have on site."
          />

          <RevealGroup
            step={0.07}
            className="mt-12 grid gap-[clamp(1rem,.5rem+1.5vw,2rem)] sm:grid-cols-2 lg:grid-cols-3"
          >
            {SOLUTIONS.map(s => (
              <RevealItem key={s.slug} variant={popIn}>
                <Card
                  href={`/solutions/${s.slug}`}
                  title={s.title}
                  blurb={s.blurb}
                  index={s.index}
                  kicker="Solution"
                  cta="Explore"
                />
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-10">
            <CheckThis href="/solutions" label="Solutions overview" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ projects -- */}
      <section className="section-y bg-[var(--bg-subtle)] blueprint">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Our work"
              title="Recent projects"
              lead="A selection of completed and ongoing scopes across power, industrial and infrastructure sites in the Kingdom."
            />
            <Link href="/projects" className="btn btn-secondary">
              All projects
            </Link>
          </div>

          <div className="mt-12 grid gap-[clamp(1rem,.5rem+1.5vw,2rem)] sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <MaskedImage key={p.title} delay={i * 0.09}>
                <article className="group h-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--border)] bg-white shadow-[var(--sh-sm)]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[.7rem] font-bold uppercase tracking-[.18em] text-[var(--ink-subtle)]">
                      {p.discipline}
                    </span>
                    <h3 className="mt-2 text-[length:var(--fs-h3)] font-bold">
                      {p.title}
                    </h3>
                  </div>
                </article>
              </MaskedImage>
            ))}
          </div>
        </div>
      </section>

      <WhyNoman />
      <Vision2030 />

      <NextUpGrid items={resolveLinks(['/services', '/solutions', '/contact']).map(l => ({
        href: l.href,
        title: l.title,
        blurb: l.blurb,
        kicker: l.kicker,
        image: l.image,
      }))} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
      />
    </>
  )
}
