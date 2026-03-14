/**
 * useSeo — per-page SEO: title, meta description, OG, Twitter, canonical, hreflang.
 *
 * Usage:
 *   useSeo({
 *     title:       'Services',                  // appended as "Services · INRAIT"
 *     description: 'Custom web engineering...',
 *     canonical:   '/services',                 // path, not full URL
 *     image:       '/images/og-services.jpg',   // optional custom OG image
 *   })
 */

const SITE_NAME   = 'INRAIT'
const SITE_URL    = 'https://inrait.com'         // ← update when domain confirmed
const DEFAULT_OG  = `${SITE_URL}/images/og-cover.jpg`
const DEFAULT_DESC = 'Custom websites, booking systems, workflow automation and visual identity — built by INRAIT in Sofia, Bulgaria.'

export function useSeo({ title, description, canonical, image } = {}) {
  const fullTitle = title
    ? `${title} · ${SITE_NAME}`
    : `${SITE_NAME} · Web Engineering Studio Sofia`
  const desc    = description || DEFAULT_DESC
  const ogImg   = image       ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : DEFAULT_OG
  const canon   = canonical   ? `${SITE_URL}${canonical}` : null

  // Title
  document.title = fullTitle

  // Standard meta
  setMeta('name', 'description', desc)

  // Canonical
  if (canon) setLink('canonical', canon)

  // hreflang — EN default + BG variant (once BG is live, update /bg/ path)
  setHreflang('en',        canon || SITE_URL)
  setHreflang('x-default', canon || SITE_URL)
  // setHreflang('bg', canon ? canon.replace(SITE_URL, `${SITE_URL}/bg`) : `${SITE_URL}/bg/`)

  // Open Graph
  setMeta('property', 'og:title',       fullTitle)
  setMeta('property', 'og:description', desc)
  setMeta('property', 'og:image',       ogImg)
  setMeta('property', 'og:url',         canon || SITE_URL)
  setMeta('property', 'og:type',        'website')
  setMeta('property', 'og:site_name',   SITE_NAME)
  setMeta('property', 'og:locale',      'en_GB')

  // Twitter card
  setMeta('name', 'twitter:card',        'summary_large_image')
  setMeta('name', 'twitter:title',       fullTitle)
  setMeta('name', 'twitter:description', desc)
  setMeta('name', 'twitter:image',       ogImg)
}

// ─── Helpers ─────────────────────────────────────────────

function setMeta(attrName, attrValue, content) {
  let el = document.querySelector(`meta[${attrName}="${attrValue}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attrName, attrValue)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setHreflang(lang, href) {
  let el = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'alternate')
    el.setAttribute('hreflang', lang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}