import Image from 'next/image'
import Link from 'next/link'

/**
 * Home hero.
 *
 * Two deliberate decisions:
 *
 * 1. No stat strip and no scroll cue. The client asked for the numbers out, and
 *    a hero that says one thing lands harder than a hero that says five.
 *
 * 2. The entrance is CSS, not JavaScript, and this is a server component with
 *    no motion library at all. A JS animation starting at opacity:0 leaves the
 *    headline invisible whenever the animation does not run — a background tab
 *    on load, a throttled rAF, a slow device. The hero is the one thing on the
 *    site that must never depend on an animation to be readable.
 */
export default function HomeHero() {
  return (
    <section className="relative isolate flex min-h-[92svh] max-h-[880px] items-end overflow-hidden bg-[var(--blue-950)]">
      <div aria-hidden className="absolute inset-0 -z-20">
        {/* Source is a dark night shot; without a lift it turns to mud under
            the scrim. */}
        <Image
          src="/assets/hero/plant-wide.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center [filter:brightness(1.45)_contrast(1.06)_saturate(1.12)]"
        />
      </div>

      {/* Dark down the left where the copy column runs, clear at the right so
          the plant is still the picture. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(to right, rgba(4,20,40,.93) 0%, rgba(4,20,40,.88) 28%, rgba(4,20,40,.58) 50%, rgba(4,20,40,.16) 76%, rgba(4,20,40,0) 100%), linear-gradient(to top, rgba(4,20,40,.55) 0%, transparent 30%)',
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[.10]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '34px 34px',
          maskImage: 'radial-gradient(70% 60% at 8% 100%, #000 5%, transparent 72%)',
          WebkitMaskImage:
            'radial-gradient(70% 60% at 8% 100%, #000 5%, transparent 72%)',
        }}
      />

      <div className="container-x relative z-20 pb-[clamp(3.5rem,8vw,6.5rem)] pt-[clamp(8rem,15vw,11rem)]">
        <div
          className="anim-slide flex items-center gap-4"
          style={{ animationDelay: '80ms' }}
        >
          <span aria-hidden className="flex flex-none gap-[3px]">
            {[1, 0.45, 0.18].map((o, i) => (
              <i
                key={i}
                style={{ opacity: o }}
                className="block h-[22px] w-[4px] skew-x-[-18deg] bg-[var(--accent)]"
              />
            ))}
          </span>
          <p className="text-[.78rem] font-bold uppercase tracking-[.22em] text-[var(--orange-300)]">
            Jubail · Riyadh · Dammam
          </p>
        </div>

        <h1
          className="anim-rise display-1 mt-6 max-w-[15ch] text-white [text-shadow:0_2px_24px_rgba(4,20,40,.55)]"
          style={{ animationDelay: '180ms' }}
        >
          Engineered.
          <br />
          Erected.
          <br />
          Maintained.
        </h1>

        <p
          className="anim-rise mt-7 max-w-[54ch] text-[length:var(--fs-lead)] leading-[1.7] text-white/85"
          style={{ animationDelay: '320ms' }}
        >
          Mechanical, electrical &amp; instrumentation, civil and scaffolding
          works for the plants, refineries and power projects of Saudi Arabia.
        </p>

        <div
          className="anim-rise mt-10 flex flex-wrap items-center gap-3"
          style={{ animationDelay: '440ms' }}
        >
          <Link href="/services" className="btn btn-primary">
            Explore our services
          </Link>
          <Link href="/contact" className="btn btn-invert">
            Talk to our team
          </Link>
        </div>
      </div>
    </section>
  )
}
