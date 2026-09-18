import type { Metadata } from 'next'
import { display, body, arabic } from './fonts'
import { SITE } from '@/content/site'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Industrial & Infrastructure Contractor`,
    template: `%s | ${SITE.name}`,
  },
  description:
    'Mechanical, electrical & instrumentation, civil and scaffolding works for plants, refineries and power projects across Saudi Arabia and the Gulf.',
  openGraph: {
    type: 'website',
    locale: 'en',
    siteName: SITE.name,
    url: SITE.url,
  },
  robots: { index: true, follow: true },
}

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  alternateName: SITE.nameAr,
  url: SITE.url,
  email: SITE.email,
  telephone: '+966591063827',
  identifier: { '@type': 'PropertyValue', name: 'CR', value: SITE.cr },
  areaServed: SITE.offices.map(o => o.country),
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    name: SITE.contactName,
    telephone: '+966591063827',
    email: SITE.email,
    availableLanguage: ['en', 'ar'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${arabic.variable}`}
    >
      <head>
        {/* Scroll reveals render at opacity:0 and are animated in by JS. If JS
            never runs, nothing may stay stuck invisible. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--r-sm)] focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:shadow-[var(--sh-lg)]"
        >
          Skip to content
        </a>

        <SmoothScroll>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
      </body>
    </html>
  )
}
