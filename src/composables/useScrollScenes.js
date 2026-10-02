import { onMounted, onUnmounted } from 'vue'

const CARD_SELECTOR = [
  '.service-card',
  '.post-card',
  '.carousel-card',
  '.testimonial-card',
  '.value-card',
  '.industry-item',
  '.card-glass',
  '.contact-form-panel',
  '.post-cta-box',
  '.comp-table',
].join(', ')

const TITLE_SELECTOR = 'h1:not(.hero-headline), section h2, article h2'
const READING_SELECTOR = 'article p, article ul, .policy-body > section'
const IMAGE_SELECTOR = 'section img:not(.carousel-img-wrap img):not(.hero-project-image)'
const PANEL_SELECTOR = 'section:not(#process):not(.hero-section) > div, footer > div'
const TARGET_SELECTOR = [CARD_SELECTOR, TITLE_SELECTOR, READING_SELECTOR, IMAGE_SELECTOR, PANEL_SELECTOR].join(', ')

let revealObserver = null
let mutationObserver = null
const observed = new Set()
const revealGroups = new Map()
const targetRoots = new Map()

function reveal(el) {
  if (!(el instanceof HTMLElement) || observed.has(el) || el.classList.contains('is-revealed')) return

  const isCard = el.matches(CARD_SELECTOR)
  const isTitle = el.matches(TITLE_SELECTOR)
  const isReading = el.matches(READING_SELECTOR)
  const isImage = el.matches(IMAGE_SELECTOR)
  const isPanel = el.matches(PANEL_SELECTOR) && getComputedStyle(el).position !== 'absolute'

  if (isCard) el.classList.add('scroll-reveal-card')
  else if (isTitle) el.classList.add('scroll-reveal-title')
  else if (isReading) el.classList.add('scroll-reveal-reading')
  else if (isImage) el.classList.add('scroll-reveal-image')
  else if (isPanel) el.classList.add('scroll-reveal-panel')
  else return

  const siblingIndex = el.parentElement
    ? [...el.parentElement.children].filter((child) => child.matches(TARGET_SELECTOR)).indexOf(el)
    : 0
  el.style.setProperty('--reveal-delay', `${Math.max(0, siblingIndex % 5) * 75}ms`)

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !revealObserver) {
    el.classList.add('is-revealed')
    return
  }

  const root = el.parentElement
  if (!root) {
    el.classList.add('is-revealed')
    return
  }

  observed.add(el)
  targetRoots.set(el, root)
  if (!revealGroups.has(root)) {
    revealGroups.set(root, new Set())
    revealObserver.observe(root)
  }
  revealGroups.get(root).add(el)
}

function scan(node) {
  if (!(node instanceof HTMLElement)) return
  if (node.matches(TARGET_SELECTOR)) reveal(node)
  node.querySelectorAll(TARGET_SELECTOR).forEach(reveal)
}

function removeTargets(node) {
  if (!(node instanceof HTMLElement)) return
  const removed = [node, ...node.querySelectorAll(TARGET_SELECTOR)]
  removed.forEach((el) => {
    if (!observed.delete(el)) return
    const root = targetRoots.get(el)
    targetRoots.delete(el)
    const group = revealGroups.get(root)
    group?.delete(el)
    if (group?.size === 0) {
      revealGroups.delete(root)
      revealObserver?.unobserve(root)
    }
  })
}

export function useScrollScenes() {
  onMounted(() => {
    if ('IntersectionObserver' in window) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const group = revealGroups.get(entry.target)
          if (!group) return
          group.forEach((el) => {
            el.classList.add('is-revealed')
            observed.delete(el)
            targetRoots.delete(el)
          })
          revealGroups.delete(entry.target)
          revealObserver.unobserve(entry.target)
        })
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
    }

    scan(document.body)
    mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.removedNodes.forEach(removeTargets)
        record.addedNodes.forEach(scan)
      })
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })
  })

  onUnmounted(() => {
    revealObserver?.disconnect()
    mutationObserver?.disconnect()
    revealObserver = null
    mutationObserver = null
    observed.clear()
    revealGroups.clear()
    targetRoots.clear()
  })
}
