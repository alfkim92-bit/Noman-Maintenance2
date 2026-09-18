import { RevealGroup, RevealItem } from '@/components/motion'
import { fadeUp } from '@/lib/motion'
import { STATS } from '@/content/site'

export default function StatsBand({
  heading = 'The numbers that earned us the next contract',
  lead = 'Built on a track record of safe man-hours, delivered projects and the kind of reliability that keeps clients coming back.',
  stats = STATS,
}: {
  heading?: string
  lead?: string
  stats?: readonly { value: string; label: string }[]
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-subtle)] py-[clamp(4rem,7vw,7rem)]">
      {/* Subtle blueprint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--brand) 1px, transparent 1px), linear-gradient(to bottom, var(--brand) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Orange accent line at top */}
      <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-[var(--accent)] via-[var(--accent)] to-transparent opacity-80" />

      <div className="container-x relative z-10">
        {/* Header — headline left, descriptor right */}
        <div className="grid items-end gap-8 border-b border-[var(--border)] pb-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow text-[var(--accent)]">Proven performance</p>
            <h2 className="mt-3 max-w-[22ch] text-[length:var(--fs-h2)] font-extrabold leading-[1.1] text-[var(--brand)]">
              {heading}
            </h2>
          </div>
          <p className="max-w-[36ch] text-[var(--ink-muted)] leading-relaxed lg:text-right">
            {lead}
          </p>
        </div>

        {/* Stats row — divided by thin rules, no cards */}
        <RevealGroup
          step={0.1}
          className="grid grid-cols-2 divide-x divide-[var(--border)] lg:grid-cols-4"
        >
          {stats.map((s) => (
            <RevealItem key={s.label} variant={fadeUp}>
              <div className="group px-8 py-10 transition-colors duration-300 first:pl-0 hover:bg-white">
                <div className="text-[clamp(3rem,2rem+3vw,5rem)] font-black leading-none tracking-[-0.03em] text-[var(--brand)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                  {s.value}
                </div>
                <div className="my-4 h-[2px] w-8 bg-[var(--accent)] transition-all duration-500 group-hover:w-16" />
                <div className="text-[.8rem] font-bold uppercase tracking-[.14em] text-[var(--ink-muted)] transition-colors duration-300 group-hover:text-[var(--ink)]">
                  {s.label}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="border-t border-[var(--border)]" />
      </div>
    </section>
  )
}
