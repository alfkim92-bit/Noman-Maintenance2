/**
 * Canonical company facts. Every contact detail, the Arabic name and the CR
 * number are rendered from here — nothing is retyped into JSX, which is what
 * makes the old "Arabic only renders correctly on the home page" bug
 * structurally impossible to reintroduce.
 *
 * Source: noman-rebuild/01-CONTENT.md §0. Do not add facts that are not there.
 */

export const SITE = {
  name: 'Noman Maintenance Services Company',
  shortName: 'Noman Maintenance Services',
  nameAr: 'شركة نومان مينتينانس سيرفيسز',
  cr: '7032690815',
  positioning:
    'Your trusted partner for industrial & infrastructure projects, services and solutions',
  contactName: 'R Anwar',
  phoneLocal: '059 106 3827',
  phoneIntl: '00 966 59 106 3827',
  phoneHref: 'tel:+966591063827',
  whatsapp: 'https://wa.me/966591063827',
  email: 'info@nomanksa.com',
  url: 'https://www.nomanksa.com',
  offices: [
    { country: 'Saudi Arabia', cities: ['Jubail', 'Riyadh', 'Dammam'] },
  ],
  /** Rendered as a TODO-CLIENT placeholder until Noman supplies the real one. */
  addressStatus: 'pending' as const,
} as const

/** Client-published stats — source: noman-rebuild/01-CONTENT.md §0 */
export const STATS = [
  { value: '90M+', label: 'Safe man-hours' },
  { value: '24+', label: 'Projects completed' },
  { value: '5+', label: 'Ongoing projects' },
  { value: '3+', label: 'Mega projects' },
] as const

/** Home hero uses a variant with office count instead of mega projects. */
export const HERO_STATS = [
  { value: '90M+', label: 'Safe man-hours' },
  { value: '24+', label: 'Projects completed' },
  { value: '5+', label: 'Ongoing projects' },
  { value: '4', label: 'Regional offices' },
] as const

export const WHY_NOMAN = [
  {
    title: 'Expert team',
    body: 'Engineers, supervisors and craftsmen who have worked live plants, not just drawings.',
  },
  {
    title: 'Personalised approach',
    body: 'Scope, sequencing and manning built around your shutdown window, not a template.',
  },
  {
    title: 'Timely and reliable',
    body: 'Turnkey projects delivered with schedule and safety performance we can evidence.',
  },
] as const

export const VISION_2030 = {
  en: "Building the industrial capability Saudi Arabia's Vision 2030 calls for — with local crews, local supervision and international standards.",
  ar: 'نفخر بمواءمة أعمالنا مع رؤية المملكة 2030',
} as const
