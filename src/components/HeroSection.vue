<template>
  <section class="relative flex flex-col items-center justify-center min-h-screen overflow-hidden grid-bg noise" style="padding-top: 80px;">

    <div class="hero-glow" />

    <div
      class="absolute left-0 right-0"
      style="top: 38%; height: 1px; background: linear-gradient(90deg, transparent 0%, rgba(164,224,75,0.15) 30%, rgba(164,224,75,0.15) 70%, transparent 100%);"
    />

    <div class="relative z-10 text-center px-6 max-w-[1000px] mx-auto w-full">

      <!-- Label -->
      <div class="mx-auto mb-8 section-label fade-in" style="transition-delay: 0.1s; justify-content: center;">
        {{ t('hero.available') }}
      </div>

      <!-- Main headline -->
      <h1 class="mb-6 leading-none hero-headline" :class="isBG ? 'hero-headline--cyrillic' : ''">
        <span class="block text-gradient fade-in" style="transition-delay: 0.15s">{{ t('hero.line1') }}</span>

        <!-- Typewriter line — cycles through words -->
        <span class="block fade-in typewriter-line" style="color: var(--accent); transition-delay: 0.25s;">
          {{ displayedWord }}<span class="typewriter-cursor" :class="{ 'typewriter-cursor--blink': !isTyping }">|</span>
        </span>

        <span class="block text-gradient fade-in" style="transition-delay: 0.35s">{{ t('hero.line3') }}</span>
      </h1>

      <!-- Subheadline -->
      <p
        class="text-text-muted fade-in"
        style="font-size: clamp(16px, 2.2vw, 21px); max-width: 560px; margin: 0 auto 48px; line-height: 1.65; font-weight: 300; transition-delay: 0.5s;"
      >
        {{ t('hero.sub') }}
      </p>

      <!-- CTAs with magnetic effect -->
      <div class="flex flex-wrap justify-center gap-4 fade-in" style="transition-delay: 0.65s">
        <div ref="magPrimary" class="magnetic-wrap">
          <RouterLink to="/contact" class="btn-primary">
            {{ t('hero.cta') }}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </RouterLink>
        </div>
        <div ref="magSecondary" class="magnetic-wrap">
          <a href="#work" class="btn-outline" @click.prevent="scrollToWork">
            {{ t('hero.ctaWork') }}
          </a>
        </div>
      </div>

      <!-- Social proof row with count-up -->
      <div class="flex items-center justify-center gap-8 mt-16 fade-in" style="transition-delay: 0.8s">
        <div class="text-center">
          <div :ref="el => { projectsEl = el }" class="stat-number text-[40px]">{{ projectsCount }}</div>
          <div class="text-text-muted text-[12px] uppercase tracking-widest mt-1">{{ t('hero.statProjects') }}</div>
        </div>
        <div class="w-px h-10 bg-white/10" />
        <div class="text-center">
          <div :ref="el => { yearsEl = el }" class="stat-number text-[40px]">{{ yearsCount }}</div>
          <div class="text-text-muted text-[12px] uppercase tracking-widest mt-1">{{ t('hero.statYears') }}</div>
        </div>
        <div class="w-px h-10 bg-white/10" />
        <div class="text-center">
          <div :ref="el => { codeEl = el }" class="stat-number text-[40px]">{{ codeCount }}</div>
          <div class="text-text-muted text-[12px] uppercase tracking-widest mt-1">{{ t('hero.statCode') }}</div>
        </div>
      </div>
    </div>

    <!-- Scroll arrow -->
    <div class="absolute -translate-x-1/2 bottom-8 left-1/2 scroll-arrow opacity-40">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useLanguage } from '../composables/useLanguage.js'

const { t, isBG } = useLanguage()

// ── Typewriter ────────────────────────────────────────────
const words = computed_words()

function computed_words() {
  // Returns reactive words based on language — called once, words don't need to be reactive
  // since the effect restarts on language change via watcher in onMounted
  return ['ENGINEERING', 'DEVELOPMENT', 'DESIGN']
}

const displayedWord = ref('')
const isTyping      = ref(true)
let typeTimer       = null

function startTypewriter() {
  let wordIndex   = 0
  let charIndex   = 0
  let deleting    = false
  const PAUSE     = 2200   // ms to hold full word
  const TYPE_SPD  = 80     // ms per character typed
  const DEL_SPD   = 40     // ms per character deleted

  function tick() {
    const word    = words[wordIndex]
    isTyping.value = true

    if (!deleting) {
      charIndex++
      displayedWord.value = word.slice(0, charIndex)

      if (charIndex === word.length) {
        isTyping.value = false
        deleting = true
        typeTimer = setTimeout(tick, PAUSE)
        return
      }
      typeTimer = setTimeout(tick, TYPE_SPD)
    } else {
      charIndex--
      displayedWord.value = word.slice(0, charIndex)

      if (charIndex === 0) {
        deleting  = false
        wordIndex = (wordIndex + 1) % words.length
        typeTimer = setTimeout(tick, 300)
        return
      }
      typeTimer = setTimeout(tick, DEL_SPD)
    }
  }

  // Seed with first word already typed for instant impact
  displayedWord.value = words[0]
  charIndex = words[0].length
  isTyping.value = false
  deleting = true
  typeTimer = setTimeout(tick, PAUSE)
}

// ── Count-up for hero stats ───────────────────────────────
let projectsEl = null
let yearsEl    = null
let codeEl     = null

const projectsCount = ref('0')
const yearsCount    = ref('0+')
const codeCount     = ref('0%')

const heroObservers = []
const heroRafs      = []

function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4) }

function heroCountUp(getEl, target, suffix, duration, onUpdate) {
  function tryObserve() {
    const el = getEl()
    if (!el) return

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      obs.disconnect()
      const start = performance.now()
      function step(now) {
        const progress = Math.min((now - start) / duration, 1)
        const value    = Math.floor(easeOutQuart(progress) * target)
        onUpdate(`${value}${suffix}`)
        if (progress < 1) heroRafs.push(requestAnimationFrame(step))
        else onUpdate(`${target}${suffix}`)
      }
      heroRafs.push(requestAnimationFrame(step))
    }, { threshold: 0.5 })

    obs.observe(el)
    heroObservers.push(obs)
  }

  setTimeout(tryObserve, 200)
}

// ── Magnetic buttons ──────────────────────────────────────
const magPrimary   = ref(null)
const magSecondary = ref(null)

function applyMagnetic(el, strength = 0.3) {
  if (!el || !window.matchMedia('(hover: hover)').matches) return

  let cx = 0, cy = 0, tx = 0, ty = 0
  let raf = null

  function lerp(a, b, t) { return a + (b - a) * t }

  function loop() {
    cx = lerp(cx, tx, 0.14)
    cy = lerp(cy, ty, 0.14)
    el.style.transform = `translate(${cx}px, ${cy}px)`
    if (Math.abs(cx - tx) > 0.1 || Math.abs(cy - ty) > 0.1) {
      raf = requestAnimationFrame(loop)
    } else {
      raf = null
    }
  }

  el.addEventListener('mousemove', e => {
    const r  = el.getBoundingClientRect()
    tx = (e.clientX - (r.left + r.width / 2)) * strength
    ty = (e.clientY - (r.top + r.height / 2)) * strength
    if (!raf) raf = requestAnimationFrame(loop)
  })

  el.addEventListener('mouseleave', () => {
    tx = 0; ty = 0
    if (!raf) raf = requestAnimationFrame(loop)
  })
}

// ── Scroll helper ─────────────────────────────────────────
function scrollToWork() {
  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
}

// ── Lifecycle ─────────────────────────────────────────────
onMounted(() => {
  // Fade-ins
  document.querySelectorAll('.fade-in').forEach((el, i) => {
    setTimeout(() => el.classList.add('is-visible'), 100 + i * 50)
  })

  // Typewriter — start after hero fades in
  setTimeout(startTypewriter, 800)

  // Count-ups
  heroCountUp(() => projectsEl, 5,   '',  1400, v => { projectsCount.value = v })
  heroCountUp(() => yearsEl,    2,   '+', 1200, v => { yearsCount.value    = v })
  heroCountUp(() => codeEl,     100, '%', 1800, v => { codeCount.value     = v })

  // Magnetic
  setTimeout(() => {
    applyMagnetic(magPrimary.value,   0.32)
    applyMagnetic(magSecondary.value, 0.28)
  }, 300)
})

onUnmounted(() => {
  if (typeTimer) clearTimeout(typeTimer)
  heroObservers.forEach(o => o.disconnect())
  heroRafs.forEach(id => cancelAnimationFrame(id))
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap');

.hero-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(72px, 14vw, 200px);
  letter-spacing: 0.02em;
  line-height: 1;
  text-align: center;
}

.hero-headline--cyrillic {
  font-family: 'Oswald', 'Arial Narrow', sans-serif;
  font-size: clamp(52px, 9vw, 120px);
  letter-spacing: 0.03em;
  line-height: 1.05;
  font-weight: 700;
}

@media (max-width: 640px) {
  .hero-headline--cyrillic {
    font-size: clamp(40px, 11vw, 80px);
  }
}

/* Typewriter */
.typewriter-line {
  min-height: 1.05em;
  display: block;
}

.typewriter-cursor {
  display: inline-block;
  color: var(--accent);
  font-weight: 100;
  margin-left: 2px;
  opacity: 1;
  transition: opacity 0.1s;
}

.typewriter-cursor--blink {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

/* Magnetic wrapper — needs position for transform */
.magnetic-wrap {
  display: inline-flex;
  will-change: transform;
}
</style>