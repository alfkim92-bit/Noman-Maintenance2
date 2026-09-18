import { RevealGroup, RevealItem, Reveal } from '@/components/motion'
import { fadeUp, popIn } from '@/lib/motion'
import { WHY_NOMAN, VISION_2030 } from '@/content/site'

export default function WhyChooseUs({
  heading = 'Why industrial operators choose Noman',
  lead = 'We measure our success by the value we bring to our clients and the impact we make in the industry.',
  reasons = WHY_NOMAN,
}: {
  heading?: string
  lead?: string
  reasons?: typeof WHY_NOMAN
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
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" /> The Noman Advantage
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
          className="mt-[clamp(3.5rem,6vw,5rem)] grid gap-6 sm:grid-cols-3"
        >
          {reasons.map((r, i) => (
            <RevealItem key={r.title} variant={fadeUp}>
              <div className="group relative h-full overflow-hidden rounded-[var(--r-lg)] border border-white/10 bg-white/5 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
                {/* Decorative corner brackets */}
                <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-[var(--accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-[var(--accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-[var(--orange-300)]">
                    {r.title}
                  </h3>
                  <div className="my-4 h-[2px] w-8 bg-[var(--accent)] transition-all duration-300 group-hover:w-12" />
                  <p className="text-[.95rem] leading-[1.6] text-white/80">
                    {r.body}
                  </p>
                </div>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[var(--accent)] to-transparent opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-10" />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Vision 2030 Banner */}
        <Reveal variant={popIn} className="mt-12">
          <div className="relative overflow-hidden rounded-[var(--r-lg)] bg-gradient-to-br from-[var(--blue-900)] to-[var(--blue-950)] p-[clamp(1.5rem,4vw,3rem)] shadow-lg ring-1 ring-white/10">
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }} />
            
            <div className="relative z-10 flex flex-col items-center justify-between gap-6 md:flex-row md:gap-12">
              <div className="flex-1 text-center md:text-left">
                <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[var(--orange-300)]">
                  Alignment & Commitment
                </p>
                <p className="text-[1.1rem] font-medium leading-[1.6] text-white">
                  {VISION_2030.en}
                </p>
              </div>
              <div className="h-[1px] w-full bg-white/10 md:h-20 md:w-[1px]" />
              <div className="flex-1 text-center md:text-right">
                <p className="text-xl font-bold leading-loose text-white" dir="rtl" lang="ar">
                  {VISION_2030.ar}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
