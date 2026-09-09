/**
 * useCountUp - animates a number from 0 to `target` when the element
 * scrolls into view. Returns a reactive `display` string.
 *
 * Usage:
 *   const { elRef, display } = useCountUp(100, { suffix: '%', duration: 1800 })
 *   <div ref="elRef">{{ display }}</div>
 */

import { ref, onMounted, onUnmounted } from 'vue'

export function useCountUp(target, { suffix = '', prefix = '', duration = 1600, decimals = 0 } = {}) {
  const elRef   = ref(null)
  const display = ref(`${prefix}0${suffix}`)
  let observer  = null
  let rafId     = null

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4)
  }

  function animate() {
    const start = performance.now()

    function step(now) {
      const elapsed  = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased    = easeOutQuart(progress)
      const current  = target * eased

      display.value = `${prefix}${decimals > 0 ? current.toFixed(decimals) : Math.floor(current)}${suffix}`

      if (progress < 1) {
        rafId = requestAnimationFrame(step)
      } else {
        display.value = `${prefix}${target}${suffix}`
      }
    }

    rafId = requestAnimationFrame(step)
  }

  onMounted(() => {
    if (!elRef.value) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(elRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
    if (rafId) cancelAnimationFrame(rafId)
  })

  return { elRef, display }
}