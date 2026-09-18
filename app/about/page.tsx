import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/sections/PageHero'
import StatsBand from '@/components/sections/StatsBand'
import WhyNoman from '@/components/sections/WhyNoman'
import Vision2030 from '@/components/sections/Vision2030'
import ClientLogos from '@/components/sections/ClientLogos'
import { CheckThis, NextUpGrid } from '@/components/CheckThis'
import { Reveal, RevealGroup, RevealItem, MaskedImage } from '@/components/motion'
import { fadeUp, popIn } from '@/lib/motion'
import { SITE } from '@/content/site'
import { resolveLinks } from '@/content/links'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Noman Maintenance Services Company is an industrial and infrastructure contractor working out of Jubail and Riyadh, with offices in Dubai and Manama.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Noman"
        title="About Us"
        h1="Your trusted partner for industrial & infrastructure projects, services and solutions"
        image="/assets/projects/power-plant-ei.jpeg"
        trail={[{ href: '/about', label: 'About' }]}
      />

      <section className="section-y bg-[var(--bg)]">
        <div className="container-x grid items-center gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[1fr_1.15fr]">
          <MaskedImage className="relative">
            <div className="relative">
              <div className="brackets relative aspect-[4/3] w-[82%] overflow-hidden rounded-[var(--r-lg)] border border-[var(--border)]">
                <Image
                  src="/assets/projects/steam-turbine-erection.jpeg"
                  alt="Noman crews during a turbine erection scope"
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 right-0 aspect-[4/3] w-[52%] overflow-hidden rounded-[var(--r-lg)] border-4 border-white shadow-[var(--sh-lg)]">
                <Image
                  src="/assets/about/site-work.jpg"
                  alt="Ducting and extraction installation work"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <span className="absolute bottom-6 left-0 z-10 rounded-[var(--r-md)] bg-[var(--blue-950)] px-5 py-3 text-[.7rem] font-bold uppercase tracking-[.14em] text-white">
                <span className="text-[var(--accent)]">✓</span> Vision 2030
                aligned
              </span>
            </div>
          </MaskedImage>

          <Reveal variant={fadeUp}>
            <p className="spec-line">
              <span className="eyebrow ml-3">Who we are</span>
            </p>
            <h2 className="mt-4 text-[length:var(--fs-h2)] font-extrabold">
              Rooted in the Kingdom, working across the Gulf
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-[1.75]">
              {SITE.name} (CR {SITE.cr}) is a trusted name in Saudi Arabia&rsquo;s
              industrial and infrastructure sector. We deliver engineering,
              mechanical, electrical and civil works, backed by a highly skilled
              team and a commitment to doing the job once, properly.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-[1.75]">
              Aligned with Saudi Vision 2030, we are committed to empowering the
              local workforce, driving sustainable industrial growth, and
              building long-lasting relationships with our clients across the
              Kingdom.
            </p>
            <CheckThis href="/services" label="Service overview" />
          </Reveal>
        </div>
      </section>

      <ClientLogos />
      <Vision2030 />
      <StatsBand heading="Our achievements at a glance" />
      <WhyNoman />

      {/* Global reach */}
      <section className="section-y bg-[var(--bg-subtle)] blueprint">
        <div className="container-x">
          <Reveal variant={fadeUp}>
            <p className="spec-line">
              <span className="eyebrow ml-3">Our strategic offices</span>
            </p>
            <h2 className="mt-4 text-[length:var(--fs-h2)] font-extrabold">
              Our global reach
            </h2>
            <p className="lead mt-4">
              This network lets us mobilise locally and support projects across
              the GCC without losing the supervision that keeps a scope on
              schedule.
            </p>
          </Reveal>

          <div className="mt-12 grid items-center gap-[clamp(2rem,4vw,3rem)] lg:grid-cols-2">
            <RevealGroup step={0.08} className="flex flex-col gap-3">
              {SITE.offices.map(o => (
                <RevealItem key={o.country} variant={popIn}>
                  <div className="flex items-baseline gap-4 rounded-[var(--r-md)] border border-[var(--border)] bg-white p-5">
                    <span
                      aria-hidden
                      className="text-lg leading-none text-[var(--accent)]"
                    >
                      ◆
                    </span>
                    <div>
                      <h3 className="text-[1.0625rem] font-bold text-[var(--brand)]">
                        {o.country}
                      </h3>
                      <p className="text-sm text-[var(--ink-muted)]">
                        {o.cities.join(' · ')}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
              <RevealItem variant={popIn}>
                <Link href="/contact" className="btn btn-secondary mt-2 w-full">
                  Contact the team
                </Link>
              </RevealItem>
            </RevealGroup>

            <Reveal variant={fadeUp} className="relative">
              <div className="relative mx-auto aspect-[16/10] w-full max-w-[560px]">
                <Image
                  src="/assets/brand/world-map.webp"
                  alt="Map showing Noman's offices across Saudi Arabia, the UAE and Bahrain"
                  fill
                  sizes="(max-width: 1024px) 90vw, 560px"
                  className="object-contain opacity-90"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <NextUpGrid
        items={resolveLinks(['/services', '/projects', '/contact']).map(l => ({
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
