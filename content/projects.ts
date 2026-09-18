/**
 * The three projects the client currently publishes. Source: 01-CONTENT.md §5.
 * Do not add more — "24+ projects completed" is a statistic, not a licence to
 * invent case studies. Missing detail is rendered as a TODO-CLIENT chip.
 */

export type Project = {
  title: string
  discipline: string
  image: string
  imageAlt: string
  /** Fields the client still has to supply. Rendered honestly, never faked. */
  pending: string[]
}

export const PROJECTS: Project[] = [
  {
    title: 'Complete erection of steam turbine and generator',
    discipline: 'Mechanical works',
    image: '/assets/projects/steam-turbine-erection.jpeg',
    imageAlt:
      'Steam turbine and generator erection works on a Noman project site',
    pending: ['Client', 'Site', 'Year', 'Scope value'],
  },
  {
    title:
      'Electrical, instrumentation and control system works for a new power plant',
    discipline: 'Electrical & instrumentation',
    image: '/assets/projects/power-plant-ei.jpeg',
    imageAlt:
      'Electrical and instrumentation installation at a new power plant',
    pending: ['Client', 'Site', 'Year', 'Scope value'],
  },
  {
    title:
      'Supply & installation of ducts, NEDERMAN arms and grinding machine connection',
    discipline: 'Mechanical / HVAC',
    image: '/assets/projects/ducting-nederman.jpeg',
    imageAlt:
      'Ducting and extraction arm installation connected to grinding machinery',
    pending: ['Client', 'Site', 'Year', 'Scope value'],
  },
]
