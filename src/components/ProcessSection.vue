<template>
  <section id="process" class="process-section px-6">
    <div class="max-w-[1080px] mx-auto">
      <h2 class="font-display">{{ t('process.title') }}</h2>
      <ol class="process-grid" :aria-label="t('process.label')">
        <li v-for="step in steps" :key="step.title" class="process-step">
          <h3>{{ step.title }}</h3>
          <p>{{ step.body }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage.js'

const { t } = useLanguage()
const steps = computed(() => t('process.steps'))
</script>

<style scoped>
.process-section { padding-top: 40px; padding-bottom: 44px; background: var(--surface); }
.process-section h2 { margin: 0; color: var(--text-muted); font-size: 13px; font-weight: 400; }
.process-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
}

.process-step {
  position: relative;
  min-width: 0;
  padding: 0 24px 0 0;
}

.process-step h3 {
  margin: 0 0 5px;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 22px;
  font-weight: 400;
  letter-spacing: 0.02em;
}

.process-step p {
  margin: 0;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.5;
}

.process-step:not(:last-child)::after {
  position: absolute;
  top: 0;
  right: 12px;
  color: var(--accent);
  content: '→';
}

@media (max-width: 640px) {
  .process-section { padding-top: 32px; padding-bottom: 36px; }
  .process-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px 16px; }
  .process-step { padding-right: 8px; }
  .process-step::after { display: none; }
}
</style>
