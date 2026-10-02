/**
 * useScrollProgress - scroll-linked CSS variables, driven by ONE shared listener.
 *
 * It measures how far an element has travelled through the viewport (0 → 1) and
 * writes that number to a CSS custom property on the element. Styles then do the
 * visual work with calc(), so only compositor-friendly properties (opacity,
 * transform) change and nothing is animated in JavaScript.
 *
 * Modes
 *   'enter' (default)  p = 0 when the element's top is at `start` of the viewport
 *                      height, p = 1 when it reaches `end`.          { start: .85, end: .4 }
 *   'span'             progress through the element's own height, measured
 *                      against a line at `anchor` of the viewport.   { anchor: .6 }
 *   'leave'            0 at the element's top edge, 1 once it has scrolled
 *                      completely past the top of the viewport.
 *   'pin'              for a TALL wrapper whose first child is `position: sticky`
 *                      (a pinned scene). 0 when the pin starts, 1 when it
 *                      releases - i.e. progress through the pinned stretch only.
 *
 * Usage
 *   const el = ref(null)
 *   useScrollProgress(el, { mode: 'enter' })              // sets --p on el
 *   useScrollProgressMany(root, '.step', { prop: '--s' })  // sets --s on each match
 *
 * Reduced motion is handled in CSS (see the @media blocks in each component).
 */
import { onMounted, onBeforeUnmount, unref } from 'vue'

const items = new Set()
let frame = 0
let bound = false

const clamp01 = (n) => Math.min(1, Math.max(0, n))

function measure(item, vh) {
  const r = item.el.getBoundingClientRect()
  const { mode, start, end, anchor } = item.opts
  let p
  if (mode === 'span')       p = (vh * anchor - r.top) / Math.max(r.height, 1)
  else if (mode === 'leave') p = -r.top / Math.max(r.height, 1)
  else if (mode === 'pin') {
    const stage = item.el.firstElementChild
    const range = item.el.offsetHeight - (stage ? stage.offsetHeight : 0)
    p = -r.top / Math.max(range, 1)
  }
  else                       p = (vh * start - r.top) / Math.max(vh * (start - end), 1)
  return clamp01(p)
}

function update() {
  frame = 0
  const vh = window.innerHeight
  // Read everything first, then write, so we never force layout in a loop.
  const reads = []
  items.forEach((item) => reads.push([item, measure(item, vh)]))
  for (const [item, p] of reads) {
    if (Math.abs(p - item.last) > 0.0005) {
      item.last = p
      item.el.style.setProperty(item.opts.prop, p.toFixed(4))
    }
  }
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(update)
}

function bind() {
  if (bound) return
  bound = true
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  window.addEventListener('load', schedule)
}

function unbind() {
  if (!bound || items.size) return
  bound = false
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  window.removeEventListener('load', schedule)
  if (frame) { cancelAnimationFrame(frame); frame = 0 }
}

function register(el, opts) {
  const item = {
    el,
    last: -1,
    opts: { mode: 'enter', start: 0.85, end: 0.4, anchor: 0.6, prop: '--p', ...opts },
  }
  items.add(item)
  bind()
  schedule()
  return item
}

function resolve(target) {
  const v = unref(target)
  return v && v.$el ? v.$el : v
}

export function useScrollProgress(target, opts = {}) {
  let item = null
  onMounted(() => {
    const el = resolve(target)
    if (el) item = register(el, opts)
  })
  onBeforeUnmount(() => {
    if (item) items.delete(item)
    unbind()
  })
}

export function useScrollProgressMany(container, selector, opts = {}) {
  const mine = []
  onMounted(() => {
    const root = resolve(container)
    if (!root) return
    root.querySelectorAll(selector).forEach((el) => mine.push(register(el, opts)))
  })
  onBeforeUnmount(() => {
    mine.forEach((item) => items.delete(item))
    unbind()
  })
}
