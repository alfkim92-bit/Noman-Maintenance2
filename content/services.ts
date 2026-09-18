/**
 * The four service pages + the service overview.
 * Copy source: noman-rebuild/01-CONTENT.md §3. Nothing here is invented.
 */

import type { Hotspot } from '@/components/ExplainerFigure'

export type Service = {
  slug: string
  /** Nav, cards, breadcrumbs. */
  title: string
  /** Uppercase page-hero title. */
  heroTitle: string
  h1: string
  /** One line — mega menu + overview cards. */
  blurb: string
  lead: string
  scope: string[]
  image: string
  imageAlt: string
  metaDescription: string
  explainer?: {
    src: string
    alt: string
    caption: string
    hotspots: Hotspot[]
  }
  /** Inline connector inside the body copy (01-CONTENT.md §9). */
  checkThis: { href: string; label: string }
  /** Closing "Where to next" cards. */
  nextUp: string[]
}

export const SERVICES: Service[] = [
  {
    slug: 'engineering-design',
    title: 'Engineering & Design',
    heroTitle: 'Engineering & Design',
    h1: 'Engineering and consultancy services',
    blurb:
      'Basic and detailed engineering, FEED, feasibility and as-built packages.',
    lead: 'Drawings that survive contact with the site. Our engineers work from feasibility through detailed design to the as-built package you hand to operations.',
    scope: [
      'Basic & detailed engineering',
      'Project feasibility studies',
      'FEED — front end engineering design',
      'As-built packages',
      'Technical due diligence',
      'Procurement & contracting support',
      'Consultancy services',
      'Site supervision',
    ],
    image: '/assets/_placeholder/PLACEHOLDER__services-engineering.png',
    imageAlt: 'Engineers reviewing project drawings',
    metaDescription:
      'Basic and detailed engineering, FEED, feasibility studies, as-built packages and site supervision for industrial projects in Saudi Arabia and the Gulf.',
    checkThis: { href: '/services', label: 'Service overview' },
    nextUp: [
      '/services/construction-infrastructure',
      '/services/mechanical-works',
      '/contact',
    ],
  },
  {
    slug: 'construction-infrastructure',
    title: 'Construction & Infrastructure',
    heroTitle: 'Construction & Infrastructure',
    h1: 'Industrial civil and construction services',
    blurb:
      'Foundations, pipe racks, duct banks, roads, buildings and site facilities.',
    lead: 'The concrete, steel and groundworks that everything else stands on — set out, poured and finished to the tolerances the equipment vendor specified.',
    scope: [
      'Buildings, equipment foundations and pipe racks',
      'Duct banks and cable trenching',
      'Camera poles and security barriers',
      'Fence civil works',
      'Temporary construction and residential facilities',
      'Recreational facilities',
      'Surveying, earthwork and infrastructure',
      'Architectural finish and warehousing',
      'Road pavement and landscaping',
      'Pre-engineered structure buildings',
    ],
    image: '/assets/_placeholder/PLACEHOLDER__services-civil.png',
    imageAlt: 'Reinforced concrete foundation works on an industrial site',
    metaDescription:
      'Industrial civil works in Saudi Arabia: equipment foundations, pipe racks, duct banks, earthworks, roads, warehousing and pre-engineered buildings.',
    checkThis: {
      href: '/solutions/construction-scaffolds',
      label: 'Construction scaffolds',
    },
    nextUp: [
      '/services/mechanical-works',
      '/services/electrical-instrumentation',
      '/contact',
    ],
  },
  {
    slug: 'mechanical-works',
    title: 'Mechanical Works',
    heroTitle: 'Mechanical Works',
    h1: 'Mechanical erection, fabrication and maintenance',
    blurb:
      'Static and rotating equipment, piping fabrication, tanks, welding and insulation.',
    lead: 'Static and rotating equipment installed, aligned, tested and maintained — plus the piping, tanks and welding that tie it into the plant.',
    scope: [
      'Stationary & rotary equipment installation and dismantling',
      'Installation, dismantling and replacements',
      'Pipe fabrication and installation',
      'Storage tank design, fabrication and installation',
      'Welding — aluminium, copper and alloys',
      'Insulation and surface protection',
      'In-plant replacements',
    ],
    image: '/assets/services/mechanical.jpg',
    imageAlt: 'Industrial pipe welding during a mechanical erection scope',
    metaDescription:
      'Mechanical erection and maintenance: static and rotating equipment, pipe fabrication, storage tanks, specialist welding, insulation and in-plant replacements.',
    checkThis: {
      href: '/solutions/suspended-scaffolds',
      label: 'Suspended scaffolds',
    },
    nextUp: [
      '/services/electrical-instrumentation',
      '/services/engineering-design',
      '/contact',
    ],
  },
  {
    slug: 'electrical-instrumentation',
    title: 'Electrical & Instrumentation',
    heroTitle: 'Electrical & Instrumentation',
    h1: 'Electrical and instrumentation services',
    blurb:
      'HV/MV/LV systems, DCS/PLC/ESD automation, SCADA and field instrumentation.',
    lead: 'From HV switchgear down to the last loop check — power distribution, control systems and field instrumentation delivered by one team.',
    scope: [
      'HV/MV/LV switchgear',
      'Gas insulated switchgear (GIS)',
      'Power and main distribution boards',
      'Transformers and bus ducts',
      'Power factor correction, UPS and battery backup',
      'Earthing and lightning protection',
      'Motors, cable termination and splicing',
      'Electrical maintenance and renewable energy',
      'Indoor and outdoor lighting',
      'Power distribution networks',
      'DCS/PLC/ESD automation',
      'SCADA integration',
      'Process instrumentation and vibration monitoring',
      'Control valves, switches and sensors',
      'Instrument panels, cabinets and racks',
      'Control system revamping',
      'Metering and analytical shelters',
      'Analyser installation and calibration',
      'Hook-up, terminations and loop checks',
      'Control and safety relief valve services',
    ],
    image: '/assets/services/ei.jpg',
    imageAlt: 'Electrical switchgear panels in a plant substation',
    metaDescription:
      'Electrical and instrumentation contracting: HV/MV/LV switchgear, transformers, DCS/PLC/ESD automation, SCADA integration, field instruments and loop checks.',
    explainer: {
      src: '/assets/_placeholder/PLACEHOLDER__explainer-ei-panel.png',
      alt: 'Annotated elevation of a switchgear and control panel line-up',
      caption:
        'A typical substation and control line-up, incomer to field. Hover or tap a number to highlight it.',
      hotspots: [
        { n: 1, x: 17.5, y: 30, label: 'Incoming HV switchgear', detail: 'incomer, protection and metering' },
        { n: 2, x: 37, y: 53, label: 'Transformer', detail: 'HV/MV step-down with bus duct connection' },
        { n: 3, x: 56, y: 30, label: 'LV distribution board', detail: 'feeders to motors and plant loads' },
        { n: 4, x: 74, y: 50, label: 'UPS and battery backup', detail: 'secured supply for control systems' },
        { n: 5, x: 80, y: 36, label: 'DCS / PLC control cabinet', detail: 'process automation and ESD logic' },
        { n: 6, x: 56, y: 88, label: 'Earthing and bonding', detail: 'plant earth grid and lightning protection' },
      ],
    },
    checkThis: {
      href: '/solutions/engineering-simulation',
      label: 'Engineering simulation',
    },
    nextUp: ['/services/mechanical-works', '/services', '/contact'],
  },
]

export const SERVICE_OVERVIEW = {
  heroTitle: 'Service Overview',
  eyebrow: 'Our capabilities',
  h1: 'Industrial services under one contract',
  lead: 'From detailed engineering through construction, mechanical erection and electrical & instrumentation works to commissioning — Noman covers the full delivery chain, so your project has one accountable contractor instead of four.',
  body: [
    'Noman Maintenance Services Company works across plants, refineries, power stations and industrial infrastructure in Saudi Arabia and the wider Gulf. Our teams mobilise out of Jubail and Riyadh, supported by offices in Dubai and Manama, and work to the QA/QC and HSE regimes the region’s operators expect.',
    'Every service below can be contracted on its own or bundled into a single turnkey scope. When the work spans trades — a tie-in that needs civil, mechanical and instrumentation crews in sequence — bundling is usually what keeps the schedule.',
  ],
  metaDescription:
    'Engineering, civil construction, mechanical erection and electrical & instrumentation works for plants, refineries and power projects across Saudi Arabia.',
  checkThis: { href: '/solutions', label: 'Solutions overview' },
  nextUp: ['/solutions', '/projects', '/contact'],
} as const

export const getService = (slug: string) => SERVICES.find(s => s.slug === slug)
