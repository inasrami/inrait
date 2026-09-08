<template>
  <section class="relative px-6 py-20 overflow-hidden md:py-32" style="background: var(--surface);">

    <div class="absolute top-0 left-0 right-0 h-px"
      style="background: var(--border);" />
    <div class="absolute bottom-0 left-0 right-0 h-px"
      style="background: var(--border);" />

    <div class="max-w-[860px] mx-auto relative z-10">

      <h2 class="font-display fade-up text-[clamp(36px,7vw,72px)] mb-8 md:mb-4 text-center md:text-left"
        style="letter-spacing:0.02em; line-height:1; transition-delay:0.05s;">
        {{ t('comparison.title') }}
      </h2>
      
      <!-- Table -->
      <div class="comp-table fade-up" style="transition-delay:0.15s;">

        <!-- Header row (Hidden on mobile via CSS) -->
        <div class="comp-row comp-header">
          <div class="comp-feature-cell" />
          <div class="comp-col comp-col--inrait">
            <span class="col-logo">IN<span style="color:var(--accent)">R</span>AIT</span>
          </div>
          <div class="comp-col">{{ t('comparison.col2') }}</div>
          <div class="comp-col comp-col--last">{{ t('comparison.col3') }}</div>
        </div>

        <!-- Data rows -->
        <div
          v-for="(row, i) in rows"
          :key="i"
          class="comp-row"
          :class="{ 'comp-row--alt': i % 2 === 1 }"
        >
          <div class="comp-feature-cell">{{ row.feature }}</div>

          <div class="comp-col comp-col--inrait">
            <span class="mobile-label">INRAIT</span>
            <span v-if="row.inrait === true" class="cell-yes">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              {{ t('comparison.yes') }}
            </span>
            <span v-else-if="row.inrait === false" class="cell-no">
              {{ t('comparison.no') }}
            </span>
            <span v-else class="cell-price">{{ row.inrait }}</span>
          </div>

          <div class="comp-col">
            <span class="mobile-label">{{ t('comparison.col2') }}</span>
            <span v-if="row.freelancer === true" class="cell-neutral-yes">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            <span v-else-if="row.freelancer === false" class="cell-neutral-no">✕</span>
            <span v-else-if="row.freelancer === 'varies'" class="cell-varies">{{ t('comparison.varies') }}</span>
            <span v-else class="cell-price-neutral">{{ row.freelancer }}</span>
          </div>

          <div class="comp-col comp-col--last">
            <span class="mobile-label">{{ t('comparison.col3') }}</span>
            <span v-if="row.agency === true" class="cell-neutral-yes">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            <span v-else-if="row.agency === false" class="cell-neutral-no">✕</span>
            <span v-else-if="row.agency === 'varies'" class="cell-varies">{{ t('comparison.varies') }}</span>
            <span v-else class="cell-price-neutral">{{ row.agency }}</span>
          </div>
        </div>

      </div>

      <!-- CTA below table -->
      <div class="mt-8 text-center md:mt-12 fade-up" style="transition-delay:0.2s;">
        <RouterLink to="/contact" class="btn-primary text-[15px] px-8 py-4 md:px-10 md:py-5 inline-flex items-center justify-center gap-2" style="cursor: pointer;">
          {{ t('cta.start') }}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useLanguage } from '../composables/useLanguage.js'
import { useFadeUp } from '../composables/useFadeUp.js'

useFadeUp()
const { t } = useLanguage()

const rows = computed(() => t('comparison.rows'))
</script>

<style scoped>
.comp-table {
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.comp-row {
  display: grid;
  grid-template-columns: 1fr 160px 140px 140px;
  align-items: center;
  border-bottom: 1px solid var(--border);
}

.comp-row:last-child { border-bottom: none; }

.comp-row--alt {
  background: rgba(255,255,255,0.015);
}

.comp-header {
  background: rgba(255,255,255,0.025);
  border-bottom: 1px solid var(--border-strong);
}

.comp-feature-cell {
  padding: 16px 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted);
}

.comp-header .comp-feature-cell {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-dim);
}

.comp-col {
  padding: 16px 12px;
  text-align: center;
  font-size: 13px;
  color: var(--text-muted);
}

.comp-col--inrait {
  background: rgba(164,224,75,0.05);
  border-left: 1px solid rgba(164,224,75,0.18);
  border-right: 1px solid rgba(164,224,75,0.18);
}

.comp-col--last {
  border-right: none;
}

.col-logo {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 20px;
  letter-spacing: 0.06em;
  color: var(--text);
}

.cell-yes {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 700;
  color: var(--accent);
}

.cell-no {
  font-size: 12px;
  color: var(--text-dim);
}

.cell-price {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 20px;
  letter-spacing: 0.04em;
  color: var(--accent);
}

.cell-neutral-yes {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
}

.cell-neutral-no {
  font-size: 14px;
  color: var(--text-dim);
  opacity: 0.4;
}

.cell-varies {
  font-size: 11px;
  color: var(--text-dim);
  font-style: italic;
}

.cell-price-neutral {
  font-size: 13px;
  color: var(--text-muted);
}

/* Hidden by default on desktop */
.mobile-label {
  display: none;
}

/* Mobile Responsive Optimization */
@media (max-width: 768px) {
  .comp-header {
    display: none;
  }

  .comp-row {
    grid-template-columns: 1fr;
    padding: 16px;
    gap: 12px;
  }

  .comp-feature-cell {
    padding: 0 0 8px 0;
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
    border-bottom: 1px solid var(--border);
  }

  .comp-col {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.01);
    border-radius: 8px;
    text-align: right;
  }

  .comp-col--inrait {
    background: rgba(164, 224, 75, 0.08);
    border: 1px solid rgba(164, 224, 75, 0.2);
  }

  .mobile-label {
    display: inline-block;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-dim);
    font-weight: 600;
  }

  .comp-col--inrait .mobile-label {
    color: var(--accent);
  }
}
</style>