<template>
  <section id="philosophy" class="relative px-6 py-40 overflow-hidden">

    <div class="max-w-[1000px] mx-auto">

      <div class="mb-12 section-label fade-up">{{ t('philosophy.label') }}</div>

      <h2
        class="font-semibold text-text-main"
        style="
          font-size: clamp(26px, 4.5vw, 56px);
          letter-spacing: -0.02em;
          line-height: 1.12;
          max-width: 900px;
        "
      >
        {{ t('philosophy.headline') }}<em style="font-style:italic; color: var(--accent);">{{ t('philosophy.headlineEm') }}</em>{{ t('philosophy.headlineSuffix') }}
      </h2>

      <div class="my-16 divider" />

      <div class="grid grid-cols-1 gap-8 mt-4 md:grid-cols-3">
        <div v-for="(pillar, i) in pillars" :key="pillar.title" class="fade-up" :style="`transition-delay: ${i * 0.12}s`">
          <div class="mb-4">
            <div class="inline-flex p-3 border rounded-xl" style="border-color: rgba(164,224,75,0.2); background: rgba(164,224,75,0.05);">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <g v-html="pillarIcons[i]" />
              </svg>
            </div>
          </div>
          <h3 class="font-semibold text-[18px] mb-2 text-text-main">{{ pillar.title }}</h3>
          <p class="text-text-muted text-[15px] leading-relaxed">{{ pillar.body }}</p>
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

const pillars = computed(() => t('philosophy.pillars'))

const pillarIcons = [
  '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
  '<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>',
  '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
]
</script>