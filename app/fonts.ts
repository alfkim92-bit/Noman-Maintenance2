import { Archivo, Inter, IBM_Plex_Sans_Arabic } from 'next/font/google'

export const display = Archivo({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

export const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600'],
  variable: '--font-arabic',
  display: 'swap',
})
