import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import PageHero from '@/components/sections/PageHero'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import ExplainerFigure from '@/components/ExplainerFigure'
import Sidebar from '@/components/ui/Sidebar'
import ScopeList from '@/components/ui/ScopeList'
import { CheckThis, NextUpGrid } from '@/components/CheckThis'
import { Reveal, MaskedImage } from '@/components/motion'
import { fadeUp } from '@/lib/motion'
import { SERVICES, getService } from '@/content/services'
import { resolveLinks } from '@/content/links'

export function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const sidebarLinks = [
    { href: '/services', label: 'Service overview' },
    ...SERVICES.filter(s => s.slug !== service.slug).map(s => ({
      href: `/services/${s.slug}`,
      label: s.title,
    })),
  ]

  return (
    <>
      <PageHero
        eyebrow="Our capabilities"
        title={service.heroTitle}
        h1={service.h1}
        lead={service.lead}
        image={service.image}
        trail={[
          { href: '/services', label: 'Services' },
          { href: `/services/${service.slug}`, label: service.title },
        ]}
      />

      <section className="section-y bg-[var(--bg)]">
        <div className="container-x grid gap-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-[2.5fr_1fr]">
          <div className="min-w-0">
            <Reveal variant={fadeUp}>
              <p className="spec-line">
                <span className="eyebrow ml-3">Scope of work</span>
              </p>
              <h2 className="mt-4 text-[length:var(--fs-h2)] font-extrabold">
                What this scope covers
              </h2>
            </Reveal>

            <ScopeList
              items={service.scope}
              columns={service.scope.length > 10 ? 2 : 1}
            />

            <MaskedImage className="brackets relative mt-12 overflow-hidden rounded-[var(--r-lg)] border border-[var(--border)]">
              <div className="relative aspect-[16/9] w-full bg-[var(--bg-inset)]">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
            </MaskedImage>

            {service.explainer && (
              <div className="mt-14">
                <Reveal variant={fadeUp}>
                  <p className="spec-line">
                    <span className="eyebrow ml-3">How it fits together</span>
                  </p>
                  <h2 className="mb-8 mt-4 text-[length:var(--fs-h2)] font-extrabold">
                    Inside the installation
                  </h2>
                </Reveal>
                <ExplainerFigure {...service.explainer} />
              </div>
            )}

            <CheckThis
              href={service.checkThis.href}
              label={service.checkThis.label}
            />
          </div>

          <Sidebar
            title="Our services"
            links={sidebarLinks}
            activeHref={`/services/${service.slug}`}
          />
        </div>
      </section>

      <WhyChooseUs />

      <NextUpGrid
        items={resolveLinks(service.nextUp).map(l => ({
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
