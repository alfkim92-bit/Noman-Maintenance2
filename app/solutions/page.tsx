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
        <div className="container-x grid items-start gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[1fr_1.15fr]">
          <Reveal variant={fadeUp} className="flex flex-col gap-8">
            <div className="bg-[var(--bg-subtle)] p-8 rounded-[var(--r-lg)] border-l-4 border-[var(--brand)] shadow-sm">
              <h2 className="text-[length:var(--fs-h3)] font-bold text-[var(--brand)] mb-4">
                {SOLUTIONS_OVERVIEW.whatWeDo.heading}
              </h2>
              <p className="text-[1.0625rem] leading-[1.75] text-[var(--ink-muted)]">
                {SOLUTIONS_OVERVIEW.whatWeDo.text}
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--r-lg)] shadow-[var(--sh-md)]">
              <img
                src="/assets/projects/ducting-nederman.jpeg"
                alt="Engineered solutions"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal variant={fadeUp} className="flex flex-col gap-8 lg:mt-16">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[var(--r-lg)] shadow-[var(--sh-md)] border-2 border-white">
              <img
                src="/assets/services/ei.jpg"
                alt="System installation and verification"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-[length:var(--fs-h3)] font-bold text-[var(--brand)] mb-4">
                {SOLUTIONS_OVERVIEW.whyWeDoIt.heading}
              </h2>
              <p className="text-[1.0625rem] leading-[1.75] text-[var(--ink-strong)]">
                {SOLUTIONS_OVERVIEW.whyWeDoIt.text}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="container-x mt-16 pt-8 border-t border-[var(--border)]">
          <RevealGroup
            step={0.07}
            className="grid gap-[clamp(1rem,.5rem+1.5vw,2rem)] sm:grid-cols-2 lg:grid-cols-3"
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
