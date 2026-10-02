<template>
  <div class="scroll-progress" aria-hidden="true">
    <span ref="bar" class="scroll-progress__bar" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const bar = ref(null)
let ticking = false
let ro = null

function update() {
  ticking = false
  if (!bar.value) return
  const el = document.documentElement
  const max = el.scrollHeight - el.clientHeight
  const p = max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0
  bar.value.style.transform = `scaleX(${p})`
}

function schedule() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(update)
}

onMounted(() => {
  update()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  // Page height changes on route changes, font load, language switch, pinned scenes measuring themselves.
  if ('ResizeObserver' in window) {
    ro = new ResizeObserver(schedule)
    ro.observe(document.body)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  ro?.disconnect()
})
</script>

<style scoped>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 60;
  pointer-events: none;
}

.scroll-progress__bar {
  display: block;
  width: 100%;
  height: 100%;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left center;
  will-change: transform;
}
</style>
