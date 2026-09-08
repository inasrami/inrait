<template>
  <section class="relative flex flex-col items-center justify-center min-h-screen" style="padding-top: 80px;">

    <div class="relative z-10 text-center px-6 max-w-[1000px] mx-auto w-full">

      <h1 class="mb-8 leading-none hero-headline" :class="isBG ? 'hero-headline--cyrillic' : ''">
        <span class="block">{{ t('hero.line1') }}</span>
        <span class="block" style="color: var(--accent);">{{ t('hero.line2') }}</span>
        <span class="block">{{ t('hero.line3') }}</span>
      </h1>

      <p
        class="text-text-muted"
        style="font-size: clamp(16px, 2.2vw, 20px); max-width: 520px; margin: 0 auto 48px; line-height: 1.6; font-weight: 400;"
      >
        {{ t('hero.sub') }}
      </p>

      <div class="flex flex-wrap justify-center gap-4">
        <RouterLink to="/contact" class="btn-primary">
          {{ t('hero.cta') }}
        </RouterLink>
        <a href="#work" class="btn-outline" @click.prevent="scrollToWork">
          {{ t('hero.ctaWork') }}
        </a>
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

.hero-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(64px, 12vw, 160px);
  letter-spacing: 0.02em;
  line-height: 0.95;
  text-align: center;
}

.hero-headline--cyrillic {
  font-family: 'Oswald', 'Arial Narrow', sans-serif;
  font-size: clamp(48px, 8vw, 110px);
  letter-spacing: 0.03em;
  line-height: 1.05;
  font-weight: 700;
}

@media (max-width: 640px) {
  .hero-headline--cyrillic {
    font-size: clamp(36px, 10vw, 72px);
  }
}
</style>
