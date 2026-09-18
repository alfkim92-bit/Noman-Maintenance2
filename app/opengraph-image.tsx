import { ImageResponse } from 'next/og'
import { SITE } from '@/content/site'

export const alt = `${SITE.name} — industrial & infrastructure contractor`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#041428',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ width: 14, height: 56, background: '#FF7E00', transform: 'skewX(-18deg)' }} />
          <div style={{ width: 14, height: 56, background: 'rgba(255,126,0,.45)', transform: 'skewX(-18deg)' }} />
          <div style={{ width: 14, height: 56, background: 'rgba(255,126,0,.18)', transform: 'skewX(-18deg)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 82,
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            Engineered. Erected.
          </div>
          <div
            style={{
              fontSize: 82,
              fontWeight: 800,
              color: '#FF9833',
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            Maintained.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: '1px solid rgba(255,255,255,.18)',
            paddingTop: 28,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 30, fontWeight: 700, color: '#fff' }}>
              {SITE.name}
            </div>
            <div style={{ fontSize: 22, color: 'rgba(255,255,255,.65)', marginTop: 6 }}>
              Jubail · Riyadh · Dubai · Manama
            </div>
          </div>
          <div style={{ fontSize: 20, color: 'rgba(255,255,255,.5)' }}>
            {`CR ${SITE.cr}`}
          </div>
        </div>
      </div>
    ),
    size
  )
}
