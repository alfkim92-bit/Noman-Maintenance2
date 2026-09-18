'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { NAV, NAV_SIMPLE } from '@/content/links'
import Brand from './Brand'
import MegaMenu from './MegaMenu'
import MobileNav from './MobileNav'

/** Hover-intent delays — long enough to cross the gap to the panel. */
const OPEN_DELAY = 120
const CLOSE_DELAY = 180

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Any navigation closes everything. Adjusted during render rather than in an
     effect, so the menus never paint open on the new route. */
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpenMenu(null)
    setMobileOpen(false)
  }

  const clear = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
  }
  const scheduleOpen = (label: string) => {
    clear()
    timer.current = setTimeout(() => setOpenMenu(label), OPEN_DELAY)
  }
  const scheduleClose = () => {
    clear()
    timer.current = setTimeout(() => setOpenMenu(null), CLOSE_DELAY)
  }

  useEffect(() => clear, [])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[60] border-b bg-white/88 backdrop-blur-[12px] transition-[background-color,border-color] duration-[280ms]"
        style={{
          borderColor: scrolled ? 'var(--border)' : 'transparent',
          backgroundColor: scrolled
            ? 'rgba(255,255,255,.96)'
            : 'rgba(255,255,255,.88)',
        }}
        onPointerLeave={scheduleClose}
      >
        <div className="container-x">
          <div
            className="flex items-center justify-between gap-4 transition-[height] duration-[280ms] ease-[cubic-bezier(.22,1,.36,1)]"
            style={{ height: scrolled ? 64 : 88 }}
          >
            <div
              className="min-w-0 flex-1 origin-left transition-transform duration-[280ms] ease-[cubic-bezier(.22,1,.36,1)] lg:flex-none"
              style={{ transform: `scale(${scrolled ? 0.82 : 1})` }}
            >
              <Brand />
            </div>

            {/* ---------------------------------------------- desktop nav -- */}
            <nav
              aria-label="Primary"
              className="hidden items-center gap-1 lg:flex"
            >
              <TopLink href="/" label="Home" active={pathname === '/'} />

              {NAV.map(section => {
                const panelId = `mega-${section.label.toLowerCase()}`
                const open = openMenu === section.label
                return (
                  <div
                    key={section.label}
                    onPointerEnter={() => scheduleOpen(section.label)}
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      aria-haspopup="true"
                      onClick={() =>
                        setOpenMenu(open ? null : section.label)
                      }
                      className={`relative flex min-h-[44px] items-center gap-1.5 px-3 py-2 text-[15px] font-semibold transition-colors ${
                        isActive(section.href)
                          ? 'text-[var(--brand)]'
                          : 'text-[var(--ink)] hover:text-[var(--brand)]'
                      }`}
                    >
                      {section.label}
                      <span
                        aria-hidden
                        className="text-[10px] text-[var(--ink-subtle)] transition-transform duration-200"
                        style={{ transform: open ? 'rotate(180deg)' : 'none' }}
                      >
                        ▼
                      </span>
                      {isActive(section.href) && <ActiveBar />}
                    </button>
                  </div>
                )
              })}

              {NAV_SIMPLE.map(item => (
                <TopLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  active={isActive(item.href)}
                />
              ))}
            </nav>

            <div className="flex flex-none items-center gap-2">
              <Link
                href="/contact"
                className="btn btn-primary hidden !min-h-[44px] !px-5 !py-2.5 text-[15px] lg:inline-flex"
              >
                Contact us
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                className="grid h-11 w-11 place-items-center rounded-[var(--r-sm)] border border-[var(--border)] transition-colors hover:bg-[var(--bg-subtle)] lg:hidden"
              >
                <span aria-hidden className="flex flex-col gap-[5px]">
                  <span className="block h-[2px] w-5 bg-[var(--ink)]" />
                  <span className="block h-[2px] w-5 bg-[var(--ink)]" />
                  <span className="block h-[2px] w-5 bg-[var(--ink)]" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {NAV.map(section => (
          <MegaMenu
            key={section.label}
            data={section}
            open={openMenu === section.label}
            panelId={`mega-${section.label.toLowerCase()}`}
            onClose={() => {
              clear()
              setOpenMenu(null)
            }}
            onPointerEnter={clear}
            onPointerLeave={scheduleClose}
          />
        ))}
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}

function ActiveBar() {
  return (
    <span
      aria-hidden
      className="absolute inset-x-3 bottom-1 h-[2px] rounded-full bg-[var(--accent)]"
    />
  )
}

function TopLink({
  href,
  label,
  active,
}: {
  href: string
  label: string
  active: boolean
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`relative flex min-h-[44px] items-center px-3 py-2 text-[15px] font-semibold transition-colors ${
        active ? 'text-[var(--brand)]' : 'text-[var(--ink)] hover:text-[var(--brand)]'
      }`}
    >
      {label}
      {active && <ActiveBar />}
    </Link>
  )
}
