/**
 * The seven solution pages + the solutions overview.
 * Copy source: noman-rebuild/01-CONTENT.md §4.
 *
 * `verify` marks a technical claim that must be confirmed by Noman before it
 * stays live. Every one is listed in TODO-CLIENT.md — keep the two in sync.
 * Claims the reference site makes but Noman cannot evidence (the "100 m"
 * height and the "50% faster" figure) are NOT published here at all; the prose
 * is written without them.
 */

import type { Hotspot } from '@/components/ExplainerFigure'

export type Bullet = string | { text: string; verify: string }

export type Solution = {
  slug: string
  /** 01–07, used by the numbered card grid. */
  index: string
  title: string
  heroTitle: string
  h1: string
  blurb: string
  lead: string
  body?: string[]
  bullets?: Bullet[]
  systems?: { title: string; body: string; cta: string }[]
  usedFor?: string[]
  safety?: string[]
  advantages?: { title: string; body: string }[]
  applications?: { sector: string; work: string }[]
  explainer?: {
    src: string
    alt: string
    caption: string
    hotspots: Hotspot[]
  }
  download?: { label: string; status: 'pending' }
  image: string
  imageAlt: string
  metaDescription: string
  checkThis: { href: string; label: string }
  nextUp: string[]
}

export const SOLUTIONS: Solution[] = [
  {
    slug: 'construction-scaffolds',
    index: '01',
    title: 'Construction Scaffolds',
    heroTitle: 'Construction Scaffolds',
    h1: 'Facade and frame scaffolding for construction sites',
    blurb:
      'Facade and frame scaffolding for buildings, renovations and roofing works.',
    lead: 'Fast-erect frame systems for buildings, renovations, roofing works and residential projects — assembled by trained crews, verified by our own engineers.',
    body: [
      'Construction scaffolding earns its place on speed. Our frame systems use pre-assembled components, rigid welded frames, integrated decking and drop-in diagonals, so a crew can raise a working lift and move on rather than sorting loose fittings. With correct anchorage and static calculation verification, frame scaffolds carry working platforms to substantial heights.',
      'Facades are rarely flat. Protrusions, canopies, setbacks and balconies all need bridging, and our systems take console brackets, bridging ledgers and adjustable spindles to work around them without leaving gaps in the deck. That matters commercially as well as technically — a platform that reaches the work face is a platform the trades will actually use.',
    ],
    systems: [
      {
        title: 'Frame scaffold system',
        body: 'The general-purpose facade solution. Pre-welded vertical frames, steel or aluminium decks, guardrails and toe boards. Fastest system to erect for regular facades.',
        cta: 'All about frame scaffolds',
      },
      {
        title: 'Modular ring-lock facade system',
        body: 'Where the facade is irregular or loads are higher. Rosette nodes at fixed intervals let ledgers and diagonals connect at any angle, so the scaffold follows the building instead of fighting it.',
        cta: 'All about ring-lock scaffolds',
      },
    ],
    usedFor: [
      'Commercial buildings',
      'Residential construction',
      'Renovation and refurbishment',
      'Roofing works',
      'Cladding and facade replacement',
      'Plant buildings',
    ],
    safety: [
      'Static calculation and anchorage verification for every structure',
      'Scaftag inspection regime — green/red tagging before each shift',
      'Erected and dismantled by trained, certified scaffolders',
      'Guardrails, toe boards and fully decked platforms as standard, not as an extra',
      'Handover documentation and load ratings issued with the completed scaffold',
    ],
    explainer: {
      src: '/assets/services/mechanical.jpg',
      alt: 'Annotated diagram of an erected facade frame scaffold',
      caption:
        'The six components that make a compliant facade lift. Hover or tap a number to highlight it.',
      hotspots: [
        { n: 1, x: 17.5, y: 45, label: 'Vertical frame', detail: 'pre-welded, sets the bay width and lift height' },
        { n: 2, x: 47, y: 40, label: 'Steel deck', detail: 'integrated planking, no loose boards' },
        { n: 3, x: 44, y: 74, label: 'Diagonal brace', detail: 'drop-in, resists racking along the facade' },
        { n: 4, x: 47, y: 31, label: 'Guardrail and toe board', detail: 'standard on every working lift' },
        { n: 5, x: 63, y: 33, label: 'Wall tie / anchorage', detail: 'verified against the static calculation' },
        { n: 6, x: 17.5, y: 89, label: 'Adjustable base spindle', detail: 'levels the structure on uneven ground' },
      ],
    },
    download: { label: 'Frame scaffold data sheet', status: 'pending' },
    image: '/assets/services/mechanical.jpg',
    imageAlt: 'Facade scaffolding erected against a building elevation',
    metaDescription:
      'Facade and frame scaffolding supplied and erected in Saudi Arabia — fast-erect frame systems and modular ring-lock scaffolds with engineered anchorage.',
    checkThis: {
      href: '/solutions/suspended-scaffolds',
      label: 'Suspended scaffolds',
    },
    nextUp: [
      '/solutions/suspended-scaffolds',
      '/services/construction-infrastructure',
      '/contact',
    ],
  },
  {
    slug: 'suspended-scaffolds',
    index: '02',
    title: 'Suspended Scaffolds',
    heroTitle: 'Suspended Scaffolds',
    h1: 'Access where there is nothing to build up from',
    blurb:
      'Hanging access platforms for bridges, vessels, hulls and structures with no ground support.',
    lead: 'Suspended platforms hang the working deck from above — the answer for bridge soffits, vessel exteriors, ship hulls and any structure where a ground-supported scaffold is impossible or uneconomic.',
    body: [
      'A suspended scaffold is assembled from the deck you are already standing on and hung from a small number of suspension points, rather than built up from grade. That removes the two worst parts of traditional suspended access: climbing below the work floor to attach components, and the material and time cost of a tower that may be 40 m of scaffold serving 2 m of work.',
      'Because the system uses the same modular components as our ring-lock scaffolds, the inventory is shared, the crews already know the connections, and the same static calculations apply. Assembly is materially faster than traditional suspended methods.',
    ],
    advantages: [
      {
        title: 'Safe',
        body: 'Designed and erected to recognised suspended-access standards, with no need to work below the deck.',
      },
      {
        title: 'Fewer suspension points',
        body: 'Less structural interface with the asset, faster set-up and strike.',
      },
      {
        title: 'Shared inventory',
        body: 'Built from standard modular components, so nothing is single-use.',
      },
      {
        title: 'Rent or buy',
        body: 'Supplied outright or on a project rental, with erection crews if needed.',
      },
      {
        title: 'Engineering support',
        body: 'Load calculations, drawings and method statements produced in-house.',
      },
    ],
    applications: [
      {
        sector: 'Infrastructure',
        work: 'Bridge construction and maintenance, soffit repairs, pier inspection and painting',
      },
      {
        sector: 'Oil & gas',
        work: 'Refinery access, cooling towers, pressure vessels, pipe racks and pipelines',
      },
      {
        sector: 'Chemical',
        work: 'Distillation columns, reactors and tank shell access',
      },
      {
        sector: 'Maritime',
        work: 'Hull blasting and painting, superstructure and interior works',
      },
      {
        sector: 'Offshore',
        work: 'Wind turbine towers and platform maintenance',
      },
    ],
    explainer: {
      src: '/assets/projects/steam-turbine-erection.jpeg',
      alt: 'Annotated diagram of a suspended working platform hung beneath a bridge deck',
      caption:
        'How the deck is carried when there is no ground support. Hover or tap a number to highlight it.',
      hotspots: [
        { n: 1, x: 30, y: 17.5, label: 'Suspension point / anchor', detail: 'engineered interface with the structure' },
        { n: 2, x: 30, y: 42, label: 'Hanger tube', detail: 'transfers the deck load to the anchor' },
        { n: 3, x: 50, y: 62, label: 'Main bearer', detail: 'spans between hangers' },
        { n: 4, x: 65, y: 66, label: 'Transom', detail: 'carries the deck across the bearers' },
        { n: 5, x: 50, y: 71.5, label: 'Decked platform', detail: 'fully boarded working surface' },
        { n: 6, x: 62, y: 56, label: 'Guardrail and edge protection', detail: 'all open edges, all four sides' },
      ],
    },
    download: { label: 'Suspended scaffold technical info', status: 'pending' },
    image: '/assets/projects/steam-turbine-erection.jpeg',
    imageAlt: 'Suspended working platform beneath a bridge deck',
    metaDescription:
      'Suspended access platforms for bridge soffits, pressure vessels, refinery structures and ship hulls — engineered, erected and supported by Noman in the Gulf.',
    checkThis: {
      href: '/solutions/construction-scaffolds',
      label: 'Construction scaffolds',
    },
    nextUp: [
      '/solutions/construction-scaffolds',
      '/services/mechanical-works',
      '/contact',
    ],
  },
  {
    slug: 'industrial-water-treatment',
    index: '03',
    title: 'Industrial Water Treatment',
    heroTitle: 'Industrial Water Treatment',
    h1: 'Industrial water treatment solutions',
    blurb: 'MBR/MBBR, reverse osmosis, filtration and dosing systems.',
    lead: 'Treatment trains sized for the effluent you actually have — supplied, installed and commissioned as a package or integrated into an existing plant.',
    bullets: [
      'MBR and MBBR plants',
      'Reverse osmosis',
      'Ultrafiltration',
      'Degasser units',
      'Microfiltration',
      'Rainwater harvesting',
      'Odour control',
      'Chemical injection and dosing pumps',
      'Gas chlorination',
      'Containerised water plants',
    ],
    explainer: {
      src: '/assets/services/ei.jpg',
      alt: 'Annotated process flow diagram of an industrial water treatment train',
      caption:
        'A typical treatment train, left to right. Hover or tap a number to highlight a stage.',
      hotspots: [
        { n: 1, x: 10, y: 51, label: 'Intake and screening', detail: 'solids removal before the biology' },
        { n: 2, x: 27, y: 39, label: 'Chemical dosing', detail: 'injection and dosing pumps' },
        { n: 3, x: 43, y: 51, label: 'MBR / MBBR bioreactor', detail: 'biological treatment stage' },
        { n: 4, x: 60, y: 39, label: 'Ultrafiltration', detail: 'membrane polishing' },
        { n: 5, x: 76, y: 51, label: 'Reverse osmosis', detail: 'dissolved solids removal' },
        { n: 6, x: 91, y: 39, label: 'Treated water storage', detail: 'reuse, discharge or process make-up' },
      ],
    },
    image: '/assets/services/ei.jpg',
    imageAlt: 'Industrial water treatment skid',
    metaDescription:
      'Industrial water treatment for Gulf plants: MBR and MBBR systems, reverse osmosis, ultrafiltration, dosing, gas chlorination and containerised treatment plants.',
    checkThis: { href: '/solutions', label: 'Solutions overview' },
    nextUp: [
      '/solutions/modular-floating-cover',
      '/solutions/process-heat-transfer',
      '/contact',
    ],
  },
  {
    slug: 'modular-floating-cover',
    index: '04',
    title: 'Modular Floating Cover',
    heroTitle: 'Modular Floating Cover',
    h1: 'Modular floating covers',
    blurb: 'Surface covers for surge ponds, lagoons and open tanks.',
    lead: 'Floating modular panels that close off an open water surface — cutting evaporation, odour and algae without roofing the structure.',
    bullets: [
      'For surge ponds, lagoons and open tanks',
      {
        text: 'Covers 99% of the surface',
        verify: 'Supplier claim carried over from the current site — confirm the coverage figure.',
      },
      'Odour, VOC and evaporation reduction',
      'Algae control',
      {
        text: '10-year warranty, service life up to 20 years',
        verify: 'Supplier warranty and service-life claim — confirm terms before publishing.',
      },
    ],
    image: '/assets/projects/ducting-nederman.jpeg',
    imageAlt: 'Modular floating cover panels on an open water surface',
    metaDescription:
      'Modular floating covers for surge ponds, lagoons and open tanks — reducing evaporation, odour, VOC release and algae growth without a fixed roof structure.',
    checkThis: { href: '/solutions', label: 'Solutions overview' },
    nextUp: [
      '/solutions/industrial-water-treatment',
      '/solutions',
      '/contact',
    ],
  },
  {
    slug: 'process-heat-transfer',
    index: '05',
    title: 'Process Heat Transfer',
    heroTitle: 'Process Heat Transfer',
    h1: 'Process heat transfer solutions',
    blurb:
      'Hot oil and water temperature control, chillers, cooling and mixer systems.',
    lead: 'Temperature control packages for process plant — heating, cooling and circulation supplied as engineered units rather than assembled on site.',
    bullets: [
      'Hot oil and water temperature control',
      'Central and portable chillers',
      'Natural refrigerant chillers',
      'Cooling tower and tank systems',
      'Mixer systems',
      'Glycol feed systems',
      'Bio-waste decomposition',
      'Pump heat exchanger packages',
      'Steam sampling systems',
    ],
    image: '/assets/projects/power-plant-ei.jpeg',
    imageAlt: 'Process heat transfer and temperature control package',
    metaDescription:
      'Process heat transfer packages: hot oil and water temperature control, central and portable chillers, cooling towers, glycol feed and heat exchanger units.',
    checkThis: { href: '/solutions', label: 'Solutions overview' },
    nextUp: [
      '/solutions/venturi-steam-traps',
      '/solutions/industrial-water-treatment',
      '/contact',
    ],
  },
  {
    slug: 'venturi-steam-traps',
    index: '06',
    title: 'Venturi Steam Traps',
    heroTitle: 'Venturi Steam Traps',
    h1: 'Venturi steam traps',
    blurb: 'Fixed-orifice steam traps that cut steam loss and maintenance.',
    lead: 'A fixed-orifice trap with no moving parts — which is why it does not fail open, and why the maintenance burden of a conventional trap population largely disappears.',
    bullets: [
      {
        text: '20-year warranty',
        verify: 'Supplier warranty claim carried over from the current site — confirm terms.',
      },
      {
        text: '1–2 year return on investment',
        verify: 'Supplier ROI claim — confirm the basis or remove the figure.',
      },
      {
        text: '20–30% steam energy reduction',
        verify: 'Supplier performance claim — confirm the measurement basis.',
      },
      {
        text: '10–30% reduction in steam cost',
        verify: 'Supplier performance claim — confirm the measurement basis.',
      },
      'CO₂ emission reduction',
      'Lower make-up water expense',
      'Reduced water hammering',
    ],
    image: '/assets/services/mechanical.jpg',
    imageAlt: 'Venturi steam trap installed on a steam line',
    metaDescription:
      'Venturi fixed-orifice steam traps with no moving parts — reducing steam loss, make-up water cost, CO₂ emissions and steam trap maintenance across plant.',
    checkThis: { href: '/solutions', label: 'Solutions overview' },
    nextUp: [
      '/solutions/process-heat-transfer',
      '/services/mechanical-works',
      '/contact',
    ],
  },
  {
    slug: 'engineering-simulation',
    index: '07',
    title: 'Engineering Simulation',
    heroTitle: 'Engineering Simulation',
    h1: 'Engineering simulation solutions',
    blurb: 'Verification, validation and operator training platforms.',
    lead: 'Model the plant before it runs — verify control logic, validate procedures and train operators on upsets that are far too expensive to rehearse live.',
    bullets: [
      'Holistic engineering V&V platform',
      'Control system design and V&V',
      'Human factors engineering platform',
      'Develop and validate operating procedures',
      'Training on upset conditions',
      'Turnaround and start-up experience',
      'Real-world and transient training',
      'Plant logic testing',
      'Equipment impact simulation',
      'Plant operations training',
    ],
    image: '/assets/services/ei.jpg',
    imageAlt: 'Operator training simulator console',
    metaDescription:
      'Engineering simulation for verification and validation, control system testing, operating procedure development and operator training on upset conditions.',
    checkThis: { href: '/services', label: 'Service overview' },
    nextUp: [
      '/services/electrical-instrumentation',
      '/solutions',
      '/contact',
    ],
  },
]

export const SOLUTIONS_OVERVIEW = {
  heroTitle: 'Solutions Overview',
  eyebrow: 'Engineered systems',
  h1: 'Specialist systems, supplied and supported',
  lead: 'Alongside our contracting services, Noman supplies, installs and maintains a portfolio of engineered systems — access and scaffolding, water treatment, heat transfer, steam efficiency and simulation. Each one is chosen because it solves a problem our clients actually have on site.',
  whatWeDo: {
    heading: 'Systems for site-specific challenges',
    text: 'Our portfolio includes engineered frame and suspended scaffolding, industrial water treatment facilities utilizing Reverse Osmosis and MBR technology, venturi steam traps for thermal efficiency, and modular floating covers for surge ponds.',
  },
  whyWeDoIt: {
    heading: 'In-house engineering & verification',
    text: 'Every system below can be supplied on its own, or seamlessly installed and commissioned by our own crews as part of a larger scope. Safety and compliance are paramount; where a solution needs design verification — such as engineered load calculations for a suspended platform, computational fluid dynamics (CFD) for process flow, or Scaftag inspections for scaffolding — that work is executed and validated in-house by our engineering team before anything reaches the site.',
  },
  metaDescription:
    'Scaffolding, water treatment, floating covers, heat transfer, venturi steam traps and engineering simulation — engineered systems supplied and installed by Noman.',
  checkThis: { href: '/services', label: 'Service overview' },
  nextUp: [
    '/solutions/construction-scaffolds',
    '/solutions/suspended-scaffolds',
    '/contact',
  ],
} as const

export const getSolution = (slug: string) => SOLUTIONS.find(s => s.slug === slug)

export const bulletText = (b: Bullet) => (typeof b === 'string' ? b : b.text)
