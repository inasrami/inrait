/**
 * useMagnetic - makes an element subtly pull toward the cursor on hover.
 *
 * Usage:
 *   const { magnetRef } = useMagnetic({ strength: 0.35 })
 *   <button ref="magnetRef">Click me</button>
 */

import { ref, onMounted, onUnmounted } from 'vue'

export function useMagnetic({ strength = 0.3, ease = 0.15 } = {}) {
  const magnetRef = ref(null)

  let raf     = null
  let targetX = 0
  let targetY = 0
  let currentX = 0
  let currentY = 0
  let isHovering = false

  function lerp(a, b, t) {
    return a + (b - a) * t
  }

  function loop() {
    currentX = lerp(currentX, targetX, ease)
    currentY = lerp(currentY, targetY, ease)

    if (magnetRef.value) {
      magnetRef.value.style.transform = `translate(${currentX}px, ${currentY}px)`
    }

    // Stop animating when close enough to target
    if (Math.abs(currentX - targetX) > 0.01 || Math.abs(currentY - targetY) > 0.01 || isHovering) {
      raf = requestAnimationFrame(loop)
    } else {
      raf = null
    }
  }

  function onMouseMove(e) {
    if (!magnetRef.value) return
    const rect = magnetRef.value.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    targetX = (e.clientX - centerX) * strength
    targetY = (e.clientY - centerY) * strength

    if (!raf) raf = requestAnimationFrame(loop)
  }

  function onMouseLeave() {
    isHovering = false
    targetX = 0
    targetY = 0
    if (!raf) raf = requestAnimationFrame(loop)
  }

  function onMouseEnter() {
    isHovering = true
  }

  onMounted(() => {
    const el = magnetRef.value
    if (!el) return

    // Only apply on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
      el.addEventListener('mousemove',  onMouseMove)
      el.addEventListener('mouseleave', onMouseLeave)
      el.addEventListener('mouseenter', onMouseEnter)
    }
  })

  onUnmounted(() => {
    const el = magnetRef.value
    if (el) {
      el.removeEventListener('mousemove',  onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
      el.removeEventListener('mouseenter', onMouseEnter)
    }
    if (raf) cancelAnimationFrame(raf)
  })

  return { magnetRef }
}