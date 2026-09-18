'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { SITE } from '@/content/site'

export type SidebarLink = { href: string; label: string }

/**
 * Sticky sibling-page rail on service/solution pages. The active item is
 * marked with an orange bar that slides between items via a shared layoutId.
 */
export default function Sidebar({
  title,
  links,
  activeHref,
}: {
  title: string
  links: SidebarLink[]
  activeHref: string
}) {
  return (
    <aside className="lg:sticky lg:top-[96px]">
      <nav
        aria-label={title}
        className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--bg-subtle)] p-4"
      >
        <h2 className="px-2 pb-3 text-[.7rem] font-bold uppercase tracking-[.18em] text-[var(--ink-subtle)]">
          {title}
        </h2>
        <ul className="flex flex-col gap-1.5">
          {links.map(l => {
            const active = l.href === activeHref
            return (
              <li key={l.href} className="relative">
                {active && (
                  <motion.span
                    layoutId="sidebar-active"
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[3px] rounded-full bg-[var(--accent)]"
                  />
                )}
                <Link
                  href={l.href}
                  aria-current={active ? 'page' : undefined}
                  className={`flex min-h-[48px] items-center justify-between gap-3 rounded-[var(--r-sm)] bg-white px-4 py-3 text-sm font-semibold shadow-[var(--sh-sm)] transition-all duration-200 hover:translate-x-1 ${
                    active
                      ? 'text-[var(--brand)]'
                      : 'text-[var(--ink-strong)] hover:text-[var(--brand)]'
                  }`}
                >
                  {l.label}
                  <span aria-hidden className="text-[var(--accent)]">
                    ›
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Contact rail — the sidebar's second job */}
      <div className="mt-5 rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--blue-950)] p-6 text-white">
        <span aria-hidden className="mb-3 flex gap-[3px]">
          {[1, 0.45, 0.18].map((o, i) => (
            <i
              key={i}
              style={{ opacity: o }}
              className="block h-[16px] w-[3px] skew-x-[-18deg] rounded-[1px] bg-[var(--accent)]"
            />
          ))}
        </span>
        <p className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
          Talk to our team
        </p>
        <p className="mt-2 text-sm text-white/70">
          {SITE.contactName} will come back to you with a team and a schedule.
        </p>
        <a
          href={SITE.phoneHref}
          className="mt-4 block font-semibold text-[var(--orange-300)] transition-colors hover:text-[var(--orange-200)]"
        >
          {SITE.phoneLocal}
        </a>
        <Link href="/contact" className="btn btn-primary mt-4 w-full">
          Send an enquiry
        </Link>
      </div>
    </aside>
  )
}
