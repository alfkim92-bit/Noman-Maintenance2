import type { MetadataRoute } from 'next'
import { ROUTES } from '@/content/links'
import { SITE } from '@/content/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return ROUTES.map(route => ({
    url: `${SITE.url}${route === '/' ? '' : route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'monthly' : 'yearly',
    priority: route === '/' ? 1 : route.split('/').length === 2 ? 0.8 : 0.6,
  }))
}
