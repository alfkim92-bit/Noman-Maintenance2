import type { NextConfig } from 'next'

/**
 * Legacy path -> new route. Every entry is emitted twice: the bare path and the
 * `.html` variant the old static site used, so no inbound link 404s.
 */
const legacy: Record<string, string> = {
  '/index': '/',
  '/about-us': '/about',
  '/contact': '/contact',
  '/projects': '/projects',
  '/certificates': '/certificates',
  '/epc-lstk': '/services',
  '/acoustic-pyrometers': '/solutions',
  '/engineering-design': '/services/engineering-design',
  '/construction-infrastructure': '/services/construction-infrastructure',
  '/mechanical-works': '/services/mechanical-works',
  '/electrical-instrumentation': '/services/electrical-instrumentation',
  '/engineering-simulation': '/solutions/engineering-simulation',
  '/industrial-water-treatment': '/solutions/industrial-water-treatment',
  '/modular-floating-cover': '/solutions/modular-floating-cover',
  '/process-heat-transfer': '/solutions/process-heat-transfer',
  '/venturi-steam-traps': '/solutions/venturi-steam-traps',
}

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    const out = []
    for (const [from, to] of Object.entries(legacy)) {
      // `/x.html` always redirects; `/x` only when it isn't already the real route.
      out.push({ source: `${from}.html`, destination: to, permanent: true })
      if (from !== to) {
        out.push({ source: from, destination: to, permanent: true })
      }
    }
    out.push({ source: '/old_index.html', destination: '/', permanent: true })
    return out
  },
}

export default nextConfig
