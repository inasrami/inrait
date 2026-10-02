<template>
  <nav v-show="active > -1" class="rail" aria-label="Page sections">
    <span class="rail__count">{{ pad(active + 1) }} / {{ pad(sections.length) }}</span>
    <button
      v-for="(s, i) in sections"
      :key="s.id"
      class="rail__dot"
      :class="{ 'is-active': i === active, 'is-past': i < active }"
      :aria-label="s.id"
      :aria-current="i === active ? 'true' : undefined"
      @click="go(s.id)"
    />
  </nav>
</template>

<script setup>
// A quiet "chapter" indicator on wide screens: shows where you are in the page and how much is left.
import { ref, onMounted, onBeforeUnmount } from 'vue'

const IDS = ['philosophy', 'services', 'work', 'about', 'industries', 'process']
const sections = ref([])
const active = ref(-1)
let frame = 0

const pad = (n) => String(n).padStart(2, '0')
const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

function update() {
  frame = 0
  const line = window.innerHeight * 0.5
  let current = -1
  sections.value.forEach((s, i) => {
    const r = s.el.getBoundingClientRect()
    if (r.top <= line && r.bottom > line) current = i
  })
  active.value = current
}
const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }

onMounted(() => {
  sections.value = IDS.map((id) => ({ id, el: document.getElementById(id) })).filter((s) => s.el)
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  schedule()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  if (frame) cancelAnimationFrame(frame)
})
</script>

<style scoped>
.rail {
  position: fixed; right: 28px; top: 50%; transform: translateY(-50%);
  z-index: 40; display: none; flex-direction: column; align-items: center; gap: 10px;
}
@media (min-width: 1280px) { .rail { display: flex; } }

.rail__count {
  margin-bottom: 6px; font-size: 10px; font-weight: 600; letter-spacing: 0.12em;
  color: var(--text-dim); font-variant-numeric: tabular-nums;
}
.rail__dot {
  width: 6px; height: 6px; padding: 0; border: 0; border-radius: 3px; cursor: pointer;
  background: var(--border-strong);
  transition: height 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.25s ease;
}
.rail__dot:hover { background: var(--text-muted); }
.rail__dot.is-past   { background: rgba(164, 224, 75, 0.45); }
.rail__dot.is-active { height: 22px; background: var(--accent); }

@media (prefers-reduced-motion: reduce) { .rail__dot { transition: none; } }
</style>
