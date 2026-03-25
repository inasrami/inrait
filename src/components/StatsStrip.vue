<template>
  <section class="relative px-6 py-24" style="background: var(--surface);">
    <div class="absolute top-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);" />
    <div class="absolute bottom-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);" />

    <div class="max-w-[1080px] mx-auto">
      <div class="grid grid-cols-2 gap-8 md:grid-cols-4">

        <!-- Projects: counts up to 5 -->
        <div class="text-center fade-up" style="transition-delay: 0s">
          <div :ref="el => { projectsRef = el }" class="mb-2 stat-number">{{ projectsDisplay }}</div>
          <div class="text-text-muted text-[13px] uppercase tracking-widest">{{ t('stats.projects') }}</div>
        </div>

        <!-- Years: counts up to 2 then shows 2+ -->
        <div class="text-center fade-up" style="transition-delay: 0.1s">
          <div :ref="el => { yearsRef = el }" class="mb-2 stat-number">{{ yearsDisplay }}</div>
          <div class="text-text-muted text-[13px] uppercase tracking-widest">{{ t('stats.satisfaction') }}</div>
        </div>

        <!-- 100%: counts up to 100 -->
        <div class="text-center fade-up" style="transition-delay: 0.2s">
          <div :ref="el => { codeRef = el }" class="mb-2 stat-number">{{ codeDisplay }}</div>
          <div class="text-text-muted text-[13px] uppercase tracking-widest">{{ t('stats.performance') }}</div>
        </div>

        <!-- ∞ rendered as SVG — no count-up needed -->
        <div class="text-center fade-up" style="transition-delay: 0.3s">
          <div class="flex items-center justify-center mb-2 stat-number" style="height:1em;">
            <svg viewBox="14 -2 82 44" fill="none" xmlns="http://www.w3.org/2000/svg"
              style="width:1.1em; height:0.55em; display:block;" aria-hidden="true">
              <path d="M20 20C20 11.163 26.863 4 35.5 4C44.137 4 48 11 53.5 20C59 29 63.863 36 72.5 36C81.137 36 88 29.163 88 20C88 10.837 81.137 4 72.5 4C63.863 4 59 11 53.5 20C48 29 44.137 36 35.5 36C26.863 36 20 28.837 20 20Z"
                stroke="currentColor" stroke-width="5.5" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="text-text-muted text-[13px] uppercase tracking-widest">{{ t('stats.delivery') }}</div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useFadeUp }   from '../composables/useFadeUp'
import { useLanguage } from '../composables/useLanguage.js'

useFadeUp()
const { t } = useLanguage()

// Template refs assigned via :ref callback
let projectsRef = null
let yearsRef    = null
let codeRef     = null

const projectsDisplay = ref('0')
const yearsDisplay    = ref('0+')
const codeDisplay     = ref('0%')

const observers = []
const rafs      = []

function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4) }

function countUp(el, target, suffix, prefix, duration, onUpdate) {
  if (!el) return
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    observer.disconnect()

    const start = performance.now()
    function step(now) {
      const progress = Math.min((now - start) / duration, 1)
      const value    = Math.floor(easeOutQuart(progress) * target)
      onUpdate(`${prefix}${value}${suffix}`)
      if (progress < 1) {
        rafs.push(requestAnimationFrame(step))
      } else {
        onUpdate(`${prefix}${target}${suffix}`)
      }
    }
    rafs.push(requestAnimationFrame(step))
  }, { threshold: 0.4 })

  observer.observe(el)
  observers.push(observer)
}

onMounted(() => {
  // Small delay to let :ref callbacks settle
  setTimeout(() => {
    countUp(projectsRef, 5,   '',  '',   1400, v => { projectsDisplay.value = v })
    countUp(yearsRef,    2,   '+', '',   1200, v => { yearsDisplay.value    = v })
    countUp(codeRef,     100, '%', '',   1800, v => { codeDisplay.value     = v })
  }, 100)
})

onUnmounted(() => {
  observers.forEach(o => o.disconnect())
  rafs.forEach(id => cancelAnimationFrame(id))
})
</script>