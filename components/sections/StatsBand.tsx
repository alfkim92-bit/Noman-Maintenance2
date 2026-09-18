import { CountUp, RevealGroup, RevealItem } from '@/components/motion'
import { fadeUp } from '@/lib/motion'
import { STATS } from '@/content/site'

export default function StatsBand({
  heading = 'Our achievements at a glance',
  lead = 'We measure our success by the value we bring to our clients and the impact we make in the industry.',
  stats = STATS,
}: {
  heading?: string
  lead?: string
  stats?: readonly { value: string; label: string }[]
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-invert)] py-[clamp(3.5rem,6vw,6rem)] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[.12]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 75%)',
        }}
      />

      <div className="container-x relative">
        <div className="max-w-[60ch]">
          <p className="eyebrow !text-[var(--orange-300)]">At a glance</p>
          <h2 className="mt-4 text-[length:var(--fs-h2)] font-extrabold text-white">
            {heading}
          </h2>
          <p className="lead mt-4 !text-white/70">{lead}</p>
        </div>

        <RevealGroup
          step={0.09}
          className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-4"
        >
          {stats.map(s => (
            <RevealItem key={s.label} variant={fadeUp}>
              <div className="border-l-[3px] border-[var(--accent)] pl-5">
                <div className="stat-num text-[clamp(2rem,1.2rem+2.6vw,3rem)] leading-none">
                  <CountUp value={s.value} />
                </div>
                <div className="mt-2 text-[.8rem] uppercase tracking-[.1em] text-white/70">
                  {s.label}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
