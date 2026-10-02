<template>
  <section id="process" class="relative px-6 py-36">

    <div class="max-w-[1080px] mx-auto process-layout">

      <div class="process-intro">
        <h2 class="font-display fade-up text-[clamp(48px,8vw,80px)]" style="letter-spacing:0.02em; line-height:1;">
          {{ t('process.title') }}
        </h2>
      </div>

      <!-- Process steps scroll beside the pinned heading on wide screens. -->
      <div ref="processSteps" class="process-steps">
        <div class="process-line">
          <div class="process-line-fill" />
        </div>

        <div
          v-for="(step, i) in steps"
          :key="step.title"
          class="process-step relative pb-16 last:pb-0 fade-up"
          :style="`transition-delay: ${i * 0.12}s`"
        >
          <div
            class="font-display text-[80px] leading-none mb-4"
            style="color: transparent; -webkit-text-stroke: 2px rgba(164,224,75,0.2); letter-spacing: 0.02em;"
          >
            0{{ i + 1 }}
          </div>

          <div class="flex items-start gap-4">
            <div class="p-3 rounded-xl shrink-0" style="background: rgba(164,224,75,0.07); border: 1px solid rgba(164,224,75,0.15); margin-top: 2px;">
              <svg v-html="stepIcons[i]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
            </div>
            <div>
              <h3 class="font-semibold text-[20px] mb-2" style="letter-spacing: -0.01em;">{{ step.title }}</h3>
              <p class="text-text-muted text-[15px] leading-relaxed">{{ step.body }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA after process -->
      <div class="process-cta mt-24 text-center fade-up">
        <p class="text-text-muted text-[17px] mb-8">{{ t('process.cta') }}</p>
        <RouterLink to="/contact" class="btn-primary text-[15px] px-10 py-[18px]">
          {{ t('process.ctaBtn') }}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useFadeUp } from '../composables/useFadeUp'
import { useLanguage } from '../composables/useLanguage.js'
import { useScrollProgress } from '../composables/useScrollProgress.js'

useFadeUp()
const { t } = useLanguage()
const processSteps = ref(null)
useScrollProgress(processSteps, { mode: 'span', anchor: 0.55, prop: '--process-progress' })

const steps = computed(() => t('process.steps'))

const stepIcons = [
  '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
  '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  '<polyline points="20 6 9 17 4 12"/>',
]
</script>

<style scoped>
.process-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  align-items: start;
  gap: clamp(32px, 8vw, 112px);
}

.process-intro {
  position: sticky;
  top: clamp(100px, 18vh, 160px);
}

.process-steps {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  padding-left: 24px;
}

.process-line {
  position: absolute;
  top: 0;
  bottom: 80px;
  left: 0;
  width: 1px;
  background: var(--border-strong);
}

.process-line-fill {
  width: 100%;
  height: 100%;
  background: var(--accent);
  transform: scaleY(var(--process-progress, 0));
  transform-origin: top;
}

.process-cta {
  grid-column: 1 / -1;
}

@media (prefers-reduced-motion: reduce) {
  .process-line-fill { transform: scaleY(1); }
}

@media (max-width: 767px) {
  .process-layout {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .process-intro {
    position: static;
  }
}
</style>