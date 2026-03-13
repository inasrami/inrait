<template>
  <div>
    <div class="cursor-dot" :style="dotStyle" />
    <div class="cursor-ring" :class="{ hovering: isHovering }" :style="ringStyle" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)
const rx = ref(0)
const ry = ref(0)
const isHovering = ref(false)

let rafId = null

const dotStyle = computed(() => ({
  left: x.value + 'px',
  top:  y.value + 'px',
}))

const ringStyle = computed(() => ({
  left: rx.value + 'px',
  top:  ry.value + 'px',
}))

function onMouseMove(e) {
  x.value = e.clientX
  y.value = e.clientY
  if (!rafId) {
    rafId = requestAnimationFrame(() => {
      rx.value = x.value
      ry.value = y.value
      rafId = null
    })
  }
}

function onMouseEnter(e) {
  const t = e.target
  if (t.closest('a, button, .project-card, .card-glass, [data-cursor]')) {
    isHovering.value = true
  }
}

function onMouseLeave(e) {
  const t = e.relatedTarget
  if (!t || !t.closest('a, button, .project-card, .card-glass, [data-cursor]')) {
    isHovering.value = false
  }
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  document.addEventListener('mouseover', onMouseEnter)
  document.addEventListener('mouseout', onMouseLeave)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseover', onMouseEnter)
  document.removeEventListener('mouseout', onMouseLeave)
})
</script>