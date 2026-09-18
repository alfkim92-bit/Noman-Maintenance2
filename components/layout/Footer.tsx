import Link from 'next/link'
import { SITE } from '@/content/site'
import { SERVICES } from '@/content/services'
import { SOLUTIONS } from '@/content/solutions'
import Brand from './Brand'

/**
 * Every href here resolves to a real route — the old site's `#` quick-links
 * are gone. The copyright uses a literal UTF-8 © (never an entity).
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[var(--bg-invert)] text-[var(--ink-invert)]">
      {/* orange chevron rule along the top edge */}
      <div aria-hidden className="flex h-[6px] w-full">
        <span className="h-full flex-1 bg-[var(--accent)]" />
        <span className="h-full flex-1 bg-[var(--accent)]/40" />
        <span className="h-full flex-[3] bg-[var(--accent)]/15" />
      </div>

      <div className="container-x grid gap-10 py-[clamp(3rem,6vw,5rem)] md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Brand invert />
          <p className="mt-5 max-w-[34ch] text-sm text-white/65">
            {SITE.positioning}
          </p>
        </div>

        <FooterCol title="Services" links={[
          { href: '/services', label: 'Service overview' },
          ...SERVICES.map(s => ({ href: `/services/${s.slug}`, label: s.title })),
        ]} />

        <FooterCol title="Solutions" links={[
          { href: '/solutions', label: 'Solutions overview' },
          ...SOLUTIONS.map(s => ({ href: `/solutions/${s.slug}`, label: s.title })),
        ]} />

        <div>
          <h2 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-[.18em] text-white">
            Get in touch
          </h2>
          <span aria-hidden className="mt-3 block h-[3px] w-8 bg-[var(--accent)]" />

          <ul className="mt-5 flex flex-col gap-3 text-sm text-white/70">
            <li>
              <span className="block font-semibold text-white">
                {SITE.contactName}
              </span>
            </li>
            <li>
              <a
                href={SITE.phoneHref}
                className="transition-colors hover:text-[var(--orange-300)]"
              >
                {SITE.phoneLocal}
              </a>
              <span className="mx-2 text-white/25">·</span>
              <a
                href={SITE.phoneHref}
                className="transition-colors hover:text-[var(--orange-300)]"
              >
                {SITE.phoneIntl}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="transition-colors hover:text-[var(--orange-300)]"
              >
                {SITE.email}
              </a>
            </li>
            <li className="pt-2">
              {SITE.offices.map(o => (
                <span key={o.country} className="block">
                  <span className="text-white">{o.country}</span>
                  {' — '}
                  {o.cities.join(' & ')}
                </span>
              ))}
            </li>
            <li className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-semibold text-[var(--orange-300)] transition-colors hover:text-[var(--orange-200)]"
              >
                Send an enquiry
                <span aria-hidden>→</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className="tabular-nums">CR {SITE.cr}</p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  links,
}: {
  title: string
  links: { href: string; label: string }[]
}) {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-[.18em] text-white">
        {title}
      </h2>
      <span aria-hidden className="mt-3 block h-[3px] w-8 bg-[var(--accent)]" />
      <ul className="mt-5 flex flex-col gap-2.5 text-sm">
        {links.map(l => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="inline-block text-white/70 transition-all duration-200 hover:translate-x-1 hover:text-[var(--orange-300)]"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
