<template>
  <section id="about" class="about-section px-6">
    <div class="about-container">
      <h2 class="font-display">{{ t('about.title') }}</h2>
      <p class="about-intro">{{ t('about.statement') }}</p>
      <ul class="about-values">
        <li v-for="value in values" :key="value.title">
          <h3>{{ value.title }}</h3>
          <p>{{ value.body }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage.js'

const { t } = useLanguage()
const values = computed(() => t('about.values').slice(0, 3))
</script>

<style scoped>
.about-section { padding-top: 56px; padding-bottom: 60px; }
.about-container { max-width: 1080px; margin: 0 auto; }
h2 { margin: 0 0 14px; font-size: clamp(32px, 5vw, 48px); font-weight: 400; letter-spacing: 0.02em; line-height: 1.05; }
.about-intro { max-width: 660px; margin: 0 0 28px; color: var(--text-muted); font-size: clamp(16px, 2vw, 19px); line-height: 1.55; }
.about-values { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin: 0; padding: 0; list-style: none; }
.about-values li { padding-top: 14px; border-top: 1px solid var(--border-strong); }
.about-values h3 { margin: 0 0 4px; font-size: 15px; font-weight: 600; }
.about-values p { margin: 0; color: var(--text-muted); font-size: 13px; line-height: 1.5; }
@media (max-width: 600px) {
  .about-section { padding-top: 44px; padding-bottom: 48px; }
  .about-values { grid-template-columns: 1fr; gap: 14px; }
}
</style>
