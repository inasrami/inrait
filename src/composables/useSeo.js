/**
 * useSeo - per-page SEO: title, meta description, OG, Twitter, canonical, hreflang.
 *
 * Usage:
 *   useSeo({
 *     noindex:     true,                        // optional: keep the page out of search results
 *     title:       'Services',                  // appended as "Services · INRAIT"
 *     description: 'Custom web engineering...',
 *     canonical:   '/services',                 // path, not full URL
 *     image:       '/images/og-services.jpg',   // optional custom OG image
 *   })
 *
 *   // or pass a function when the values depend on reactive data:
 *   useSeo(() => ({ title: post.value?.title, canonical: `/blog/${slug}` }))
 */

import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'

const SITE_NAME   = 'INRAIT'
const SITE_URL    = 'https://inrait.com'         // ← update when domain confirmed
const DEFAULT_OG  = `${SITE_URL}/images/og-cover.jpg`
const DEFAULT_DESC = 'Custom websites, booking systems, stores and automation for hotels, restaurants and service businesses in Bulgaria and the EU. Get a free estimate.'

export function useSeo(options = {}) {
  const route = useRoute()
  const read  = typeof options === 'function' ? options : () => options

  // useHead works on the server (prerender) and in the browser, and removes
  // this page's tags again on navigation, so nothing leaks between routes.
  useHead(computed(() => buildHead(read() || {}, route.path)))
}

function buildHead({ title, description, canonical, image, noindex = false }, path) {
  const fullTitle = title
    ? `${title} · ${SITE_NAME}`
    : `${SITE_NAME} · Websites, Booking Systems & Automation in Sofia`
  const desc    = description || DEFAULT_DESC
  const ogImg   = image       ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : DEFAULT_OG
  const isBulgarian = path === '/bg' || path.startsWith('/bg/')
  const englishPath = canonical?.replace(/^\/bg(?=\/)/, '') || '/'
  const routePath = isBulgarian && englishPath !== '/' ? `/bg${englishPath}` : isBulgarian ? '/bg' : englishPath
  const canon = canonical ? `${SITE_URL}${routePath}` : null
  const englishUrl = `${SITE_URL}${englishPath}`
  const bulgarianUrl = `${SITE_URL}${englishPath === '/' ? '/bg' : `/bg${englishPath}`}`

  return {
    title: fullTitle,
    meta: [
      { name: 'description', content: desc },
      { name: 'robots', content: noindex ? 'noindex, nofollow' : 'index, follow' },

      { property: 'og:title',       content: fullTitle },
      { property: 'og:description', content: desc },
      { property: 'og:image',       content: ogImg },
      { property: 'og:url',         content: canon || SITE_URL },
      { property: 'og:type',        content: 'website' },
      { property: 'og:site_name',   content: SITE_NAME },
      { property: 'og:locale',      content: isBulgarian ? 'bg_BG' : 'en_GB' },

      { name: 'twitter:card',        content: 'summary_large_image' },
      { name: 'twitter:title',       content: fullTitle },
      { name: 'twitter:description', content: desc },
      { name: 'twitter:image',       content: ogImg },
    ],
    link: [
      ...(canon ? [{ rel: 'canonical', href: canon }] : []),
      { rel: 'alternate', hreflang: 'en',        href: englishUrl,   key: 'hreflang-en' },
      { rel: 'alternate', hreflang: 'bg',        href: bulgarianUrl, key: 'hreflang-bg' },
      { rel: 'alternate', hreflang: 'x-default', href: englishUrl,   key: 'hreflang-x-default' },
    ],
  }
}
