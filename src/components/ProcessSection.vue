<template>
  <section id="process" class="relative">

    <!-- On tall screens with motion allowed this becomes a pinned stage: the title stays put and
         the steps slide in sideways as you scroll down. Otherwise it is the stacked layout
         (heading pinned beside the steps) exactly as before. -->
    <div ref="scene" class="process-scene px-6 py-36">
      <div class="process-stage">

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

            <div ref="track" class="process-track" :style="{ '--last': steps.length }">
              <div class="process-spacer process-spacer--lead" aria-hidden="true" />

              <div
                v-for="(step, i) in steps"
                :key="step.title"
                class="process-step relative pb-16"
                :class="{ 'is-last': i === steps.length - 1 }"
                :style="{ '--k': i }"
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

              <!-- Final panel of the sideways scene (hidden in the stacked layout) -->
              <div class="process-card-cta" :style="{ '--k': steps.length }">
                <p class="process-card-cta__text">{{ t('process.cta') }}</p>
                <RouterLink to="/contact" class="btn-primary text-[15px] px-10 py-[18px]">
                  {{ t('process.ctaBtn') }}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </RouterLink>
              </div>

              <div class="process-spacer process-spacer--trail" aria-hidden="true" />
            </div>
          </div>

          <!-- CTA after process (stacked layout) -->
          <div class="process-cta mt-24 text-center fade-up">
            <p class="text-text-muted text-[17px] mb-8">{{ t('process.cta') }}</p>
            <RouterLink to="/contact" class="btn-primary text-[15px] px-10 py-[18px]">
              {{ t('process.ctaBtn') }}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </RouterLink>
          </div>

        </div>

        <div class="process-progress" aria-hidden="true"><span /></div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { useFadeUp } from '../composables/useFadeUp'
import { useLanguage } from '../composables/useLanguage.js'
import { useScrollProgress } from '../composables/useScrollProgress.js'

useFadeUp()
const { t } = useLanguage()

const scene        = ref(null)
const processSteps = ref(null)
const track        = ref(null)

// Sideways scene: --p (0 → 1) = progress through the pinned stretch
useScrollProgress(scene, { mode: 'pin', prop: '--p' })
// Stacked layout: fills the vertical line beside the steps
useScrollProgress(processSteps, { mode: 'span', anchor: 0.55, prop: '--process-progress' })

const steps = computed(() => t('process.steps'))

// How far the track has to travel sideways; also stretches the scene so there is room to scroll.
function measure() {
  const view = processSteps.value
  const row  = track.value
  if (!view || !row || !scene.value) return
  const dist = Math.max(0, Math.round(row.scrollWidth - view.clientWidth))
  scene.value.style.setProperty('--dist', `${dist}px`)
}

let ro = null
let mq = null
onMounted(() => {
  measure()
  if ('ResizeObserver' in window) {
    ro = new ResizeObserver(measure)
    ro.observe(processSteps.value)
    ro.observe(track.value)
  }
  window.addEventListener('resize', measure)
  mq = window.matchMedia('(prefers-reduced-motion: no-preference) and (min-height: 561px)')
  mq.addEventListener('change', measure)
})
onBeforeUnmount(() => {
  ro?.disconnect()
  window.removeEventListener('resize', measure)
  mq?.removeEventListener('change', measure)
})

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

/* In the stacked layout the track is invisible to layout, so the steps stay grid items of .process-steps */
.process-track {
  display: contents;
}

.process-step.is-last {
  padding-bottom: 0;
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

/* Only used by the sideways scene */
.process-spacer,
.process-card-cta,
.process-progress {
  display: none;
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

/* ── Sideways pinned scene ───────────────────────────────────────────── */
@media (prefers-reduced-motion: no-preference) and (min-height: 561px) {
  .process-scene {
    padding: 0;
    height: calc(100vh + var(--dist, 0px));
    height: calc(100svh + var(--dist, 0px));
  }

  .process-stage {
    position: sticky;
    top: 0;
    height: 100vh;
    height: 100svh;
    display: flex;
    flex-direction: column;
    padding: 88px 0 36px;
    overflow: hidden;
  }

  .process-layout {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex: 1;
    min-height: 0;
    width: 100%;
    max-width: none;
    margin: 0;
    gap: 0;
  }

  .process-intro {
    position: static;
    flex: none;
    width: 100%;
    max-width: 1080px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .process-steps {
    display: flex;
    align-items: center;
    flex: 1;
    min-height: 0;
    padding-left: 0;
    overflow: hidden;
  }

  .process-line,
  .process-cta {
    display: none;
  }

  .process-track {
    display: flex;
    align-items: flex-start;
    will-change: transform;
    /* progress (--p) × distance (--dist) = how far the track has slid left */
    transform: translate3d(calc(var(--p, 0) * var(--dist, 0px) * -1), 0, 0);
  }

  /* Aligns the first panel with the page's content column */
  .process-spacer {
    display: block;
    flex: 0 0 auto;
  }
  .process-spacer--lead  { width: max(24px, calc((100vw - 1080px) / 2 + 24px)); }
  .process-spacer--trail { width: max(0px, calc((100vw - 1080px) / 2 - 16px)); }

  .process-track .process-step,
  .process-track .process-card-cta {
    display: block;
    flex: 0 0 auto;
    width: min(400px, 78vw);
    margin-right: 40px;
    padding: 20px 0 0;
    border-top: 1px solid var(--border-strong);
    /* each panel lights up as the scroll reaches it (k = panel index, last = number of steps) */
    opacity: clamp(0.3, calc(0.3 + (var(--p, 0) * var(--last) - var(--k) + 1.5) * 0.7), 1);
  }

  .process-track .process-card-cta {
    border-top-color: var(--accent);
  }

  .process-card-cta__text {
    margin-bottom: 32px;
    font-size: clamp(22px, 2.6vw, 30px);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  .process-progress {
    display: block;
    flex: none;
    width: min(1032px, calc(100% - 48px));
    height: 2px;
    margin: 28px auto 0;
    background: var(--border-strong);
  }

  .process-progress span {
    display: block;
    height: 100%;
    background: var(--accent);
    transform-origin: left center;
    transform: scaleX(var(--p, 0));
  }
}

@media (prefers-reduced-motion: no-preference) and (min-height: 561px) and (max-width: 640px) {
  .process-stage { padding-top: 76px; }
}
</style>
