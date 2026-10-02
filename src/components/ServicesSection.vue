<template>
  <section id="services" class="relative px-6 py-12" style="background: var(--surface);">
    <div class="max-w-[1080px] mx-auto">
      <div class="flex flex-wrap items-end justify-between gap-6 mb-8">
        <div>
          <div class="section-kicker">{{ t('services.label') }}</div>
          <h2 class="font-display fade-up text-[clamp(28px,5vw,42px)]" style="letter-spacing:0.02em; line-height:1; transition-delay:0.05s;">
            {{ t('services.title') }}
          </h2>
        </div>
        <RouterLink to="/services" class="fade-up btn-outline text-[13px] py-[8px] px-5 flex items-center gap-2" style="transition-delay:0.1s;">
          {{ t('services.viewAll') }}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </RouterLink>
      </div>

      <div ref="grid" class="service-grid">
        <div
          v-for="(service, i) in topServices"
          :key="service.id"
          class="flex flex-col service-card"
          :style="`--i:${i}`"
        >
          <div class="mb-4 card-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><g v-html="service.icon" /></svg>
          </div>
          
          <h3 class="font-semibold text-[16px] mb-1" style="letter-spacing:-0.01em;">
            {{ service.title }}
          </h3>
          
          <div class="text-[12px] text-text-dim mb-6 flex-1">
            {{ t('services.from') }} <span class="font-medium text-white">€{{ service.basePrice.toLocaleString() }}</span>
          </div>

          <RouterLink :to="`/services#${service.id}`" class="details-btn">
            Details
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useLanguage } from '../composables/useLanguage.js'
import { useServices } from '../data/services.js'
import { useFadeUp } from '../composables/useFadeUp'
import { useScrollProgressMany } from '../composables/useScrollProgress.js'

useFadeUp()
const { t } = useLanguage()
const { SERVICES } = useServices()

// --s (0 → 1) rides each card up into place as the grid enters; --i staggers them
const grid = ref(null)
useScrollProgressMany(grid, '.service-card', { mode: 'enter', start: 0.95, end: 0.6, prop: '--s' })

// Featured services shown on the landing page (flagged `hero` in data/services.js), max 4 for the 4-column grid
const topServices = computed(() => SERVICES.value.filter(s => s.hero).slice(0, 4))
</script>

<style scoped>
.service-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.service-card {
  padding: 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: all 0.2s ease;

  /* Scroll-linked entrance. Uses the individual translate/scale properties so they
     compose with the hover transform below. Defaults to fully visible without JS. */
  --k: clamp(0, calc(var(--s, 1) * 1.5 - var(--i, 0) * 0.14), 1);
  translate: 0 calc((1 - var(--k)) * 40px);
  scale: calc(0.94 + var(--k) * 0.06);
  opacity: calc(0.1 + var(--k) * 0.9);
}

.service-card:hover {
  border-color: rgba(164, 224, 75, 0.4);
  background: rgba(164, 224, 75, 0.03);
  transform: translateY(-2px);
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(164, 224, 75, 0.08);
}

.details-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-radius: 6px;
  transition: all 0.2s ease;
}

.details-btn:hover {
  color: var(--accent);
  border-color: var(--accent);
  background: rgba(164, 224, 75, 0.08);
}

.section-kicker {
  margin-bottom: 8px;
  color: var(--accent);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

@media (prefers-reduced-motion: reduce) {
  .service-card { --s: 1 !important; }
}

@media (max-width: 900px) {
  .service-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .service-grid {
    grid-template-columns: 1fr;
  }
}
</style>