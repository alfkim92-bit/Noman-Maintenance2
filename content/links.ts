/**
 * One registry of every internal destination. The nav, the footer, the
 * NextUpGrid and the sitemap all resolve through this, so a page can never
 * link somewhere that does not exist — and `href="#"` is never needed.
 */

import { SERVICES, SERVICE_OVERVIEW } from './services'
import { SOLUTIONS, SOLUTIONS_OVERVIEW } from './solutions'

export type LinkEntry = {
  href: string
  title: string
  blurb: string
  kicker?: string
  image?: string
}

const STATIC_PAGES: LinkEntry[] = [
  {
    href: '/',
    title: 'Home',
    blurb: 'Engineered, erected and maintained — what Noman does, at a glance.',
  },
  {
    href: '/services',
    title: 'Service overview',
    blurb:
      'Engineering, civil, mechanical and E&I works under one accountable contract.',
    kicker: 'Services',
    image: '/assets/projects/power-plant-ei.jpeg',
  },
  {
    href: '/solutions',
    title: 'Solutions overview',
    blurb:
      'Seven engineered systems we supply, install, commission and maintain.',
    kicker: 'Solutions',
    image: '/assets/projects/steam-turbine-erection.jpeg',
  },
  {
    href: '/projects',
    title: 'Our projects',
    blurb: 'Scopes delivered across power, industrial and infrastructure sites.',
    kicker: 'Work',
    image: '/assets/projects/steam-turbine-erection.jpeg',
  },
  {
    href: '/certificates',
    title: 'Our certificates',
    blurb: 'Commercial registration and the accreditations we hold.',
    kicker: 'Compliance',
    image: '/assets/brand/certificate-card.png',
  },
  {
    href: '/about',
    title: 'About us',
    blurb:
      'Who we are, where we work and why clients keep us on their approved list.',
    kicker: 'Company',
    image: '/assets/projects/power-plant-ei.jpeg',
  },
  {
    href: '/contact',
    title: 'Talk to our team',
    blurb:
      'Tell us the scope, the site and the window. We come back with a team and a schedule.',
    kicker: 'Contact',
    image: '/assets/projects/ducting-nederman.jpeg',
  },
]

const SERVICE_LINKS: LinkEntry[] = SERVICES.map(s => ({
  href: `/services/${s.slug}`,
  title: s.title,
  blurb: s.blurb,
  kicker: 'Service',
  image: s.image,
}))

const SOLUTION_LINKS: LinkEntry[] = SOLUTIONS.map(s => ({
  href: `/solutions/${s.slug}`,
  title: s.title,
  blurb: s.blurb,
  kicker: 'Solution',
  image: s.image,
}))

export const ALL_LINKS: LinkEntry[] = [
  ...STATIC_PAGES,
  ...SERVICE_LINKS,
  ...SOLUTION_LINKS,
]

/** Throws at build time if a page references a route that does not exist. */
export function resolveLink(href: string): LinkEntry {
  const found = ALL_LINKS.find(l => l.href === href)
  if (!found) {
    throw new Error(
      `resolveLink: no registered route for "${href}". Add it to content/links.ts or fix the reference.`
    )
  }
  return found
}

export const resolveLinks = (hrefs: readonly string[]) => hrefs.map(resolveLink)

/** Desktop mega-menu + mobile accordion structure. */
export const NAV = [
  {
    label: 'Services',
    href: '/services',
    overview: {
      title: SERVICE_OVERVIEW.h1,
      blurb: SERVICE_OVERVIEW.lead,
      href: '/services',
    },
    items: SERVICE_LINKS,
  },
  {
    label: 'Solutions',
    href: '/solutions',
    overview: {
      title: SOLUTIONS_OVERVIEW.h1,
      blurb: SOLUTIONS_OVERVIEW.lead,
      href: '/solutions',
    },
    items: SOLUTION_LINKS,
  },
] as const

export const NAV_SIMPLE = [
  { label: 'Projects', href: '/projects' },
  { label: 'Certificates', href: '/certificates' },
  { label: 'About', href: '/about' },
] as const

/** Every route, for sitemap.ts. */
export const ROUTES = [
  '/',
  '/services',
  ...SERVICES.map(s => `/services/${s.slug}`),
  '/solutions',
  ...SOLUTIONS.map(s => `/solutions/${s.slug}`),
  '/projects',
  '/certificates',
  '/about',
  '/contact',
]
