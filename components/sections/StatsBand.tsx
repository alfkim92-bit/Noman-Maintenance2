import { RevealGroup, RevealItem } from '@/components/motion'
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
    <section className="relative overflow-hidden bg-[var(--bg-invert)] py-[clamp(4.5rem,8vw,8rem)] text-white">
      {/* Dynamic Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage:
            'radial-gradient(100% 100% at 50% 0%, #000 20%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(100% 100% at 50% 0%, #000 20%, transparent 80%)',
        }}
      />
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-[var(--accent)] opacity-10 blur-[120px]" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[var(--blue-400)] opacity-10 blur-[120px]" />

      <div className="container-x relative z-10">
        <div className="mx-auto max-w-[60ch] text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--border-invert)] bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--orange-300)] shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" /> At a glance
          </p>
          <h2 className="mt-6 text-[length:var(--fs-h2)] font-extrabold text-white">
            {heading}
          </h2>
          <p className="lead mx-auto mt-4 max-w-[50ch] !text-white/70">
            {lead}
          </p>
        </div>

        <RevealGroup
          step={0.12}
          className="mt-[clamp(3.5rem,6vw,5rem)] grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((s, i) => (
            <RevealItem key={s.label} variant={fadeUp}>
              <div className="group relative overflow-hidden rounded-[var(--r-lg)] border border-white/10 bg-white/5 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
                {/* Decorative corner brackets */}
                <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-[var(--accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-[var(--accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="relative z-10">
                  <div className="text-[clamp(2rem,1.2rem+2.6vw,3rem)] font-extrabold leading-none tracking-tight text-white transition-transform duration-500 group-hover:scale-105 group-hover:text-[var(--orange-300)]">
                    {s.value}
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-[2px] w-8 bg-[var(--accent)] transition-all duration-300 group-hover:w-12" />
                    <div className="text-[.85rem] font-semibold uppercase tracking-wider text-white/80 transition-colors duration-300 group-hover:text-white">
                      {s.label}
                    </div>
                  </div>
                </div>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[var(--accent)] to-transparent opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-10" />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
