import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import PageHero from '@/components/sections/PageHero'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import ExplainerFigure from '@/components/ExplainerFigure'
import Sidebar from '@/components/ui/Sidebar'
import ScopeList from '@/components/ui/ScopeList'
import DownloadCard from '@/components/ui/DownloadCard'
import { CheckThis, NextUpGrid } from '@/components/CheckThis'
import { Reveal, RevealGroup, RevealItem, MaskedImage } from '@/components/motion'
import { fadeUp, popIn } from '@/lib/motion'
import { SOLUTIONS, getSolution, bulletText } from '@/content/solutions'
import { resolveLinks } from '@/content/links'

export function generateStaticParams() {
  return SOLUTIONS.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const solution = getSolution(slug)
  if (!solution) return {}
  return {
    title: solution.title,
    description: solution.metaDescription,
    alternates: { canonical: `/solutions/${solution.slug}` },
  }
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const solution = getSolution(slug)
  if (!solution) notFound()

  const sidebarLinks = [
    { href: '/solutions', label: 'Solutions overview' },
    ...SOLUTIONS.filter(s => s.slug !== solution.slug).map(s => ({
      href: `/solutions/${s.slug}`,
      label: s.title,
    })),
  ]

  return (
    <>
      <PageHero
        eyebrow="Engineered systems"
        title={solution.heroTitle}
        h1={solution.h1}
        lead={solution.lead}
        image={solution.image}
        trail={[
          { href: '/solutions', label: 'Solutions' },
          { href: `/solutions/${solution.slug}`, label: solution.title },
        ]}
      />

      <section className="section-y bg-[var(--bg)]">
        <div className="container-x grid gap-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-[2.5fr_1fr]">
          <div className="min-w-0">
            {solution.body && (
              <Reveal variant={fadeUp} className="max-w-[68ch]">
                {solution.body.map(p => (
                  <p key={p} className="mb-5 text-[1.0625rem] leading-[1.75]">
                    {p}
                  </p>
                ))}
              </Reveal>
            )}

            {solution.bullets && (
              <>
                <Reveal variant={fadeUp}>
                  <p className="spec-line">
                    <span className="eyebrow ml-3">What it covers</span>
                  </p>
                  <h2 className="mt-4 text-[length:var(--fs-h2)] font-extrabold">
                    Systems and capabilities
                  </h2>
                </Reveal>
                <ScopeList items={solution.bullets.map(bulletText)} />
              </>
            )}

            {/* Two system cards — construction scaffolds */}
            {solution.systems && (
              <div className="mt-14">
                <Reveal variant={fadeUp}>
                  <p className="spec-line">
                    <span className="eyebrow ml-3">Systems we supply</span>
                  </p>
                  <h2 className="mb-8 mt-4 text-[length:var(--fs-h2)] font-extrabold">
                    Two ways to reach the work face
                  </h2>
                </Reveal>
                <RevealGroup step={0.08} className="grid gap-5 sm:grid-cols-2">
                  {solution.systems.map(sys => (
                    <RevealItem key={sys.title} variant={popIn}>
                      <article className="h-full rounded-[var(--r-lg)] border border-[var(--border)] bg-white p-6 shadow-[var(--sh-sm)]">
                        <h3 className="text-[length:var(--fs-h3)] font-bold">
                          {sys.title}
                        </h3>
                        <p className="mt-3 text-[var(--ink-muted)]">{sys.body}</p>
                      </article>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            )}

            {/* Advantage cards — suspended scaffolds */}
            {solution.advantages && (
              <div className="mt-14">
                <Reveal variant={fadeUp}>
                  <p className="spec-line">
                    <span className="eyebrow ml-3">Why this system</span>
                  </p>
                  <h2 className="mb-8 mt-4 text-[length:var(--fs-h2)] font-extrabold">
                    What it gives you on site
                  </h2>
                </Reveal>
                <RevealGroup step={0.07} className="grid gap-4 sm:grid-cols-2">
                  {solution.advantages.map(a => (
                    <RevealItem key={a.title} variant={popIn}>
                      <article className="h-full rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--bg-subtle)] p-5">
                        <h3 className="flex items-center gap-2 text-[1.0625rem] font-bold">
                          <span aria-hidden className="flex gap-[2px]">
                            <i className="block h-[14px] w-[3px] skew-x-[-18deg] rounded-[1px] bg-[var(--accent)]" />
                          </span>
                          {a.title}
                        </h3>
                        <p className="mt-2 text-sm text-[var(--ink-muted)]">
                          {a.body}
                        </p>
                      </article>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            )}

            {solution.explainer && (
              <div className="mt-14">
                <Reveal variant={fadeUp}>
                  <p className="spec-line">
                    <span className="eyebrow ml-3">How it works</span>
                  </p>
                  <h2 className="mb-8 mt-4 text-[length:var(--fs-h2)] font-extrabold">
                    The parts, labelled
                  </h2>
                </Reveal>
                <ExplainerFigure {...solution.explainer} />
              </div>
            )}

            {/* Application areas table — suspended scaffolds */}
            {solution.applications && (
              <div className="mt-14">
                <Reveal variant={fadeUp}>
                  <p className="spec-line">
                    <span className="eyebrow ml-3">Application areas</span>
                  </p>
                  <h2 className="mb-8 mt-4 text-[length:var(--fs-h2)] font-extrabold">
                    Where we use it
                  </h2>
                </Reveal>
                <RevealGroup step={0.06} className="grid gap-3">
                  {solution.applications.map(a => (
                    <RevealItem key={a.sector} variant={fadeUp}>
                      <div className="grid gap-1 rounded-[var(--r-md)] border border-[var(--border)] bg-white p-5 sm:grid-cols-[180px_1fr] sm:gap-6">
                        <span className="font-bold text-[var(--brand)]">
                          {a.sector}
                        </span>
                        <span className="text-[var(--ink-muted)]">{a.work}</span>
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            )}

            {solution.usedFor && (
              <div className="mt-14">
                <Reveal variant={fadeUp}>
                  <p className="spec-line">
                    <span className="eyebrow ml-3">Where it&rsquo;s used</span>
                  </p>
                  <h2 className="mt-4 text-[length:var(--fs-h2)] font-extrabold">
                    Typical projects
                  </h2>
                </Reveal>
                <ScopeList items={solution.usedFor} columns={2} />
              </div>
            )}

            {solution.safety && (
              <div className="mt-14 rounded-[var(--r-lg)] border-l-[5px] border-[var(--accent)] bg-[var(--orange-50)] p-7">
                <Reveal variant={fadeUp}>
                  <h2 className="text-[length:var(--fs-h3)] font-bold">
                    Safety &amp; compliance
                  </h2>
                  <ul className="mt-4 flex flex-col gap-3">
                    {solution.safety.map(s => (
                      <li key={s} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="mt-[.45em] grid h-4 w-4 flex-none place-items-center rounded-full bg-[var(--accent)] text-[10px] font-bold text-[var(--steel-950)]"
                        >
                          ✓
                        </span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            )}

            {!solution.explainer && (
              <MaskedImage className="brackets relative mt-14 overflow-hidden rounded-[var(--r-lg)] border border-[var(--border)]">
                <div className="relative aspect-[16/9] w-full bg-[var(--bg-inset)]">
                  <Image
                    src={solution.image}
                    alt={solution.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </div>
              </MaskedImage>
            )}

            {solution.download && (
              <div className="mt-12 max-w-[420px]">
                <h2 className="mb-4 text-[.7rem] font-bold uppercase tracking-[.18em] text-[var(--ink-subtle)]">
                  Downloads
                </h2>
                <DownloadCard label={solution.download.label} />
              </div>
            )}

            <CheckThis
              href={solution.checkThis.href}
              label={solution.checkThis.label}
            />
          </div>

          <Sidebar
            title="Our solutions"
            links={sidebarLinks}
            activeHref={`/solutions/${solution.slug}`}
          />
        </div>
      </section>

      <WhyChooseUs />

      <NextUpGrid
        items={resolveLinks(solution.nextUp).map(l => ({
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
