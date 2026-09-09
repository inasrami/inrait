<template>
  <section class="relative flex items-center w-full min-h-screen py-20 overflow-hidden bg-bg-primary">
    
    <!-- SVG Film Grain / Noise Texture (Tactile, non-AI feel) -->
    <div class="absolute inset-0 z-0 pointer-events-none opacity-[0.4] mix-blend-overlay bg-noise"></div>

    <!-- Single Asymmetrical Structural Line -->
    <div class="absolute top-0 bottom-0 right-0 lg:right-[33.333%] w-[1px] bg-text-muted/20 z-0 pointer-events-none hidden lg:block"></div>

    <!-- 12-Column Grid Container -->
    <div class="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
      
      <!-- Left Column: Massive Typography -->
      <div class="flex flex-col lg:col-span-8">
        <h1 
          class="flex flex-col p-0 m-0 text-left uppercase hero-headline" 
          :class="isBG ? 'hero-headline--cyrillic' : ''"
        >
          <!-- whitespace-nowrap strictly enforces the 3-line layout -->
          <span class="block text-text-primary mb-[-2%] whitespace-nowrap">{{ t('hero.line1') }}</span>
          <span class="block accent-text mb-[-2%] whitespace-nowrap">{{ t('hero.line2') }}</span>
          <span class="block text-text-primary whitespace-nowrap">{{ t('hero.line3') }}</span>
        </h1>
      </div>

      <!-- Right Column: Context & CTAs docked to the bottom -->
      <div class="flex flex-col p-4 rounded-lg lg:col-span-4 lg:pb-4 bg-bg-primary/50 backdrop-blur-sm lg:backdrop-blur-none lg:p-0 lg:rounded-none">
        <p class="text-text-muted text-lg md:text-xl leading-relaxed mb-8 max-w-[450px]">
          {{ t('hero.sub') }}
        </p> 
        
        <div class="flex flex-col sm:flex-row gap-4 w-full max-w-[450px]">
          <RouterLink to="/contact" class="btn-primary flex-1 py-4 text-center text-lg font-medium transition-colors hover:bg-[var(--accent)] hover:text-white">
            {{ t('hero.cta') }}
          </RouterLink>
          <a href="#work" class="flex-1 py-4 text-lg font-medium text-center transition-colors btn-outline hover:bg-text-primary hover:text-bg-primary" @click.prevent="scrollToWork">
            {{ t('hero.ctaWork') }}
          </a>
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

/* Tight, massive typography left-aligned */
.hero-headline {
  font-family: 'Bebas Neue', sans-serif;
  /* Adjusted fluid scaling (9vw instead of 13vw) so the long "AND SYSTEMS" line fits on smaller screens without overflowing */
  font-size: clamp(48px, 9vw, 220px);
  letter-spacing: 0.02em;
  line-height: 0.85;
}

.hero-headline--cyrillic {
  font-family: 'Oswald', 'Arial Narrow', sans-serif;
  font-size: clamp(40px, 8vw, 170px);
  letter-spacing: 0em;
  line-height: 0.95;
  font-weight: 700;
}

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
</style>