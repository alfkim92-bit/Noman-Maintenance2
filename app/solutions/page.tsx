import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import StatsBand from '@/components/sections/StatsBand'
import Card from '@/components/ui/Card'
import { CheckThis, NextUpGrid } from '@/components/CheckThis'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion'
import { fadeUp, popIn } from '@/lib/motion'
import { SOLUTIONS, SOLUTIONS_OVERVIEW } from '@/content/solutions'
import { resolveLinks } from '@/content/links'

export const metadata: Metadata = {
  title: 'Solutions Overview',
  description: SOLUTIONS_OVERVIEW.metaDescription,
  alternates: { canonical: '/solutions' },
}

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow={SOLUTIONS_OVERVIEW.eyebrow}
        title={SOLUTIONS_OVERVIEW.heroTitle}
        h1={SOLUTIONS_OVERVIEW.h1}
        lead={SOLUTIONS_OVERVIEW.lead}
        trail={[{ href: '/solutions', label: 'Solutions' }]}
      />

      <section className="section-y bg-[var(--bg)]">
        <div className="container-x">
          <Reveal variant={fadeUp} className="max-w-[68ch]">
            {SOLUTIONS_OVERVIEW.body.map(p => (
              <p key={p} className="mb-5 text-[1.0625rem] leading-[1.75]">
                {p}
              </p>
            ))}
          </Reveal>

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
                  image={s.image}
                  imageAlt={s.imageAlt}
                  index={s.index}
                  kicker="Solution"
                  cta="Explore"
                />
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-10">
            <CheckThis
              href={SOLUTIONS_OVERVIEW.checkThis.href}
              label={SOLUTIONS_OVERVIEW.checkThis.label}
            />
          </div>
        </div>
      </section>

      <StatsBand />

      <NextUpGrid
        items={resolveLinks(SOLUTIONS_OVERVIEW.nextUp).map(l => ({
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
