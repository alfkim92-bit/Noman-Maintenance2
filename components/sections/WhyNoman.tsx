import { Reveal, RevealGroup, RevealItem } from '@/components/motion'
import { fadeUp, fromRight } from '@/lib/motion'
import { WHY_NOMAN } from '@/content/site'
import { SectionHeader } from '@/components/layout/Section'

export default function WhyNoman() {
  return (
    <section className="section-y bg-[var(--bg)]">
      <div className="container-x grid items-start gap-[clamp(2rem,4vw,4rem)] lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeader
            eyebrow="Excellence in action"
            title="Why choose Noman"
            lead="Explore a comprehensive range of services and solutions that support you at every stage of your project."
          />
        </div>

        <RevealGroup step={0.1} className="flex flex-col gap-4">
          {WHY_NOMAN.map(f => (
            <RevealItem key={f.title} variant={fromRight}>
              <article className="rounded-[var(--r-lg)] border-l-[5px] border-[var(--accent)] bg-[var(--orange-50)] p-7 transition-all duration-300 hover:-translate-x-1.5 hover:shadow-[var(--sh-md)]">
                <h3 className="text-[length:var(--fs-h3)] font-bold text-[var(--ink-strong)]">
                  {f.title}
                </h3>
                <p className="mt-2 text-[var(--ink-muted)]">{f.body}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <Reveal variant={fadeUp} className="container-x mt-12">
        <span aria-hidden className="chevron-rule">
          <i /><i /><i />
        </span>
      </Reveal>
    </section>
  )
}
