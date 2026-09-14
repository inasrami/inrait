<template>
  <section class="relative flex items-end w-full min-h-[min(900px,100svh)] overflow-hidden bg-bg-primary hero-section">
    <img class="hero-project-image" src="/images/wall.jpg" alt="Abstract purple structural artwork" />
    <div class="hero-project-overlay" />

    <div class="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 pb-12 md:pb-16">
      <div class="hero-content-grid">
        <h1
          class="flex flex-col p-0 m-0 text-left uppercase hero-headline"
          :class="isBG ? 'hero-headline--cyrillic' : ''"
        >
          <span class="block text-text-primary mb-[-2%]">{{ t('hero.line1') }}</span>
          <span class="block accent-text mb-[-2%]">{{ t('hero.line2') }}</span>
          <span class="block text-text-primary">{{ t('hero.line3') }}</span>
        </h1>

        <div class="hero-copy">
          <p class="text-text-primary text-lg md:text-xl leading-relaxed mb-8 max-w-[450px]">
            {{ t('hero.sub') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-3 w-full max-w-[450px]">
            <RouterLink to="/contact" class="flex-1 py-4 text-lg font-medium text-center btn-primary">
              {{ t('hero.cta') }}
            </RouterLink>
            <a href="#work" class="flex-1 py-4 text-lg font-medium text-center transition-colors btn-outline hero-work-link" @click.prevent="scrollToWork">
              {{ t('hero.ctaWork') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useLanguage } from '../composables/useLanguage.js'

const { t, isBG } = useLanguage()

function scrollToWork() {
  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap');

/* Physical SVG Noise Texture */
.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

.hero-project-image {
  display: none;
}

.hero-project-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: rgba(0,0,0,0.48);
}

.hero-section {
  isolation: isolate;
}

.hero-section::before {
  content: '';
  position: absolute;
  inset: -6px;
  z-index: 0;
  background: url('/images/wall.jpg') center center / contain no-repeat;
  background-attachment: fixed;
  filter: blur(6px) saturate(0.78) contrast(1.06);
  transform: scale(1.02);
}

.hero-content-grid {
  display: grid;
  min-width: 0;
  grid-template-columns: minmax(0, 1.25fr) minmax(320px, 0.75fr);
  align-items: end;
  gap: 64px;
}

/* Tight, massive typography left-aligned */
.hero-headline {
  min-width: 0;
  max-width: 100%;
  overflow-wrap: anywhere;
  font-family: 'Bebas Neue', sans-serif;
  /* Adjusted fluid scaling (9vw instead of 13vw) so the long "AND SYSTEMS" line fits on smaller screens without overflowing */
  font-size: clamp(52px, 9vw, 170px);
  letter-spacing: 0.02em;
  line-height: 0.85;
  text-wrap: balance;
}

.hero-headline--cyrillic {
  font-family: 'Oswald', 'Arial Narrow', sans-serif;
  font-size: clamp(40px, 8vw, 170px);
  letter-spacing: 0em;
  line-height: 0.95;
  font-weight: 700;
}

.hero-copy {
  position: relative;
  min-width: 0;
  max-width: 450px;
  padding: 0;
}

.hero-work-link { color: var(--text-primary); background: rgba(0,0,0,0.22); border-color: rgba(255,255,255,0.42); }
.hero-work-link:hover { background: rgba(255,255,255,0.9); color: #000; }
.hero-copy .btn-primary, .hero-copy .btn-outline { min-width: 0; white-space: normal; }

/* Stylish outline text for the accent line to create depth */
.accent-text {
  color: transparent;
  -webkit-text-stroke: 2px var(--accent);
  transition: color 0.3s ease;
}

.accent-text:hover {
  color: var(--accent);
}

.btn-primary, .btn-outline {
  border-radius: 4px;
}

@media (max-width: 1024px) {
  .hero-headline {
    line-height: 0.9;
  }
}

@media (max-width: 639px) {
  .hero-section { display: flex; min-height: 720px; padding-top: 0; }
  .hero-project-overlay { inset: 0; height: auto; background: rgba(0,0,0,0.5); }
  .hero-content-grid { display: flex; flex-direction: column; align-items: stretch; gap: 34px; }
  .hero-headline {
    font-size: clamp(38px, 14vw, 82px);
    line-height: 0.88;
  }

  .hero-headline--cyrillic {
    font-size: clamp(34px, 12vw, 76px);
  }

  .hero-copy { max-width: none; }
}
</style>