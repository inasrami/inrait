/**
 * useConsent - cookie consent + the tracking scripts that depend on it.
 *
 * Google Analytics and the Meta Pixel are NOT in index.html. They are injected
 * here, and only after the visitor clicks "Accept" (now, or on an earlier visit).
 * Declining - or never answering - means neither script is ever requested.
 */

const STORAGE_KEY = 'inrait_cookie_consent'
const GA_ID       = 'G-R1LXQHHGSQ'
const PIXEL_ID    = '1445752864116324'

let trackingLoaded = false

export function getConsent() {
  if (typeof window === 'undefined') return null
  try { return localStorage.getItem(STORAGE_KEY) } catch { return null }
}

export function setConsent(value) {
  try { localStorage.setItem(STORAGE_KEY, value) } catch { /* storage blocked: choice lasts this visit only */ }
}

export function loadTracking() {
  if (typeof window === 'undefined' || trackingLoaded) return
  trackingLoaded = true

  // Google Analytics (gtag.js)
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() { window.dataLayer.push(arguments) }
  const ga = document.createElement('script')
  ga.async = true
  ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(ga)
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)

  // Meta Pixel
  if (!window.fbq) {
    const fbq = function () {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments)
    }
    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.queue = []
    window.fbq = window._fbq = fbq
    const px = document.createElement('script')
    px.async = true
    px.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(px)
  }
  window.fbq('init', PIXEL_ID)
  window.fbq('track', 'PageView')
}

/** Call once on page load: re-enables tracking for visitors who already accepted. */
export function applyStoredConsent() {
  if (getConsent() === 'accepted') loadTracking()
}
