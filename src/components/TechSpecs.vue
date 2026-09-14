<template>
  <section id="industries" class="relative px-6 py-36" style="background: var(--surface);">

    <div class="absolute top-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);" />

    <div class="max-w-[1080px] mx-auto">

      <div class="flex flex-wrap items-end justify-between gap-6 mb-20">
        <h2 class="font-display fade-up text-[clamp(40px,7vw,72px)]" style="letter-spacing:0.02em; line-height:1.1;">
          {{ t('techSpecs.industriesTitle') }}
        </h2>
        <p class="text-text-muted text-[15px] max-w-sm leading-relaxed fade-up" style="transition-delay: 0.1s;">
          {{ t('techSpecs.industriesSub') }}
        </p>
      </div>

      <div class="industries-list">
        <div
          v-for="(industry, i) in industries"
          :key="industry.title"
          class="industry-item fade-up"
          :style="`transition-delay: ${i * 0.1}s`"
        >
          <div class="industry-index">0{{ i + 1 }}</div>
          <div class="industry-icon">
            <svg v-html="industry.icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
          </div>
          <div class="industry-content">
            <h3 class="font-semibold text-[18px] text-white">{{ industry.title }}</h3>
            <p class="industry-audience">{{ t('techSpecs.idealFor') }} {{ industry.idealFor }}</p>
            <p class="text-[14.5px] leading-relaxed text-text-muted">{{ industry.value }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useFadeUp } from '../composables/useFadeUp'
import { useLanguage } from '../composables/useLanguage.js'

useFadeUp()
const { t } = useLanguage()

const industryIcons = [
  '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 13v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
]

const industries = computed(() =>
  t('techSpecs.industries').map((industry, index) => ({
    ...industry,
    icon: industryIcons[index],
  }))
)
</script>

<style scoped>
.industries-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 56px;
}

.industry-item {
  display: grid;
  grid-template-columns: 42px 32px minmax(0, 1fr);
  gap: 16px;
  padding: 28px 0 32px;
  border-top: 1px solid var(--border);
}

.industry-index {
  padding-top: 2px;
  color: var(--accent);
  font-family: var(--font-mono, monospace);
  font-size: 11px;
  letter-spacing: 0.08em;
}

.industry-icon { padding-top: 1px; }

.industry-content h3 { margin-bottom: 8px; }

.industry-audience {
  margin-bottom: 12px;
  color: var(--accent);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  line-height: 1.4;
  text-transform: uppercase;
}

@media (max-width: 767px) {
  .industries-list { grid-template-columns: 1fr; }
  .industry-item { grid-template-columns: 30px 28px minmax(0, 1fr); gap: 12px; }
}
</style>