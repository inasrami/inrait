<template>
  <section class="relative px-6 py-32 overflow-hidden" style="background: var(--surface);">

    <div class="absolute top-0 left-0 right-0 h-px"
      style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);" />
    <div class="absolute bottom-0 left-0 right-0 h-px"
      style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);" />

    <!-- Glow centred on INRAIT column -->
    <div class="absolute pointer-events-none"
      style="top:50%; left:50%; transform:translate(-50%,-50%); width:500px; height:500px; background:radial-gradient(ellipse at center, rgba(164,224,75,0.06) 0%, transparent 70%);" />

    <div class="max-w-[860px] mx-auto relative z-10">

      <div class="mb-4 section-label fade-up">{{ t('comparison.label') }}</div>
      <h2 class="font-display fade-up text-[clamp(40px,7vw,72px)] mb-4"
        style="letter-spacing:0.02em; line-height:1; transition-delay:0.05s;">
        {{ t('comparison.title') }}
      </h2>
      <p class="text-text-muted text-[16px] mb-16 max-w-lg fade-up" style="transition-delay:0.1s; font-weight:300;">
        {{ t('comparison.sub') }}
      </p>

      <!-- Table -->
      <div class="comp-table fade-up" style="transition-delay:0.15s;">

        <!-- Header row -->
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

          <!-- INRAIT col — always positive highlight -->
          <div class="comp-col comp-col--inrait">
            <span v-if="row.inrait === true" class="cell-yes">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              {{ t('comparison.yes') }}
            </span>
            <span v-else-if="row.inrait === false" class="cell-no">
              {{ t('comparison.no') }}
            </span>
            <span v-else class="cell-price">{{ row.inrait }}</span>
          </div>

          <!-- Freelancer col -->
          <div class="comp-col">
            <span v-if="row.freelancer === true" class="cell-neutral-yes">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            <span v-else-if="row.freelancer === false" class="cell-neutral-no">✕</span>
            <span v-else-if="row.freelancer === 'varies'" class="cell-varies">{{ t('comparison.varies') }}</span>
            <span v-else class="cell-price-neutral">{{ row.freelancer }}</span>
          </div>

          <!-- Agency col -->
          <div class="comp-col comp-col--last">
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
      <div class="mt-12 text-center fade-up" style="transition-delay:0.2s;">
        <RouterLink to="/contact" class="btn-primary text-[15px] px-10 py-5" style="cursor:none;">
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

/* Header */
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

/* INRAIT column gets accent highlight */
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

/* Cell states */
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

/* Mobile — stack columns */
@media (max-width: 640px) {
  .comp-row {
    grid-template-columns: 1fr 100px 90px 90px;
  }

  .comp-feature-cell {
    padding: 14px 14px;
    font-size: 13px;
  }

  .comp-col {
    padding: 14px 6px;
    font-size: 12px;
  }

  .cell-price,
  .col-logo {
    font-size: 16px;
  }
}
</style>