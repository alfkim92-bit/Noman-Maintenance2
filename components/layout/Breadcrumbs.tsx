import Link from 'next/link'
import { SITE } from '@/content/site'

export type Crumb = { href: string; label: string }

/**
 * Renders the visible trail and the matching BreadcrumbList JSON-LD, so the
 * two can never drift apart.
 */
export default function Breadcrumbs({
  trail,
  invert = false,
}: {
  trail: Crumb[]
  invert?: boolean
}) {
  const full: Crumb[] = [{ href: '/', label: 'Home' }, ...trail]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: full.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: `${SITE.url}${c.href === '/' ? '' : c.href}`,
    })),
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-sm ${invert ? 'text-white/70' : 'text-[var(--ink-muted)]'}`}
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {full.map((c, i) => {
          const last = i === full.length - 1
          return (
            <li key={c.href} className="flex items-center gap-2">
              {last ? (
                <span
                  aria-current="page"
                  className={invert ? 'text-white' : 'text-[var(--ink-strong)]'}
                >
                  {c.label}
                </span>
              ) : (
                <Link
                  href={c.href}
                  className={`transition-colors ${
                    invert
                      ? 'hover:text-[var(--orange-300)]'
                      : 'hover:text-[var(--brand)]'
                  }`}
                >
                  {c.label}
                </Link>
              )}
              {!last && (
                <span aria-hidden className="text-[var(--accent)]">
                  ›
                </span>
              )}
            </li>
          )
        })}
      </ol>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  )
}
