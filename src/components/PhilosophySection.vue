<template>
  <section id="philosophy" class="relative">

    <!-- Pinned stage: the headline stays on screen and lights up word by word as you scroll -->
    <div ref="scene" class="phil-scene" data-no-reveal>
      <div class="phil-stage">
        <div class="phil-inner">
          <h2 class="phil-headline" :style="{ '--span': span }">
            <template v-for="(tk, k) in tokens" :key="k"><span
                v-if="tk.word"
                class="phil-word"
                :class="{ 'phil-word--em': tk.em }"
                :style="{ '--i': tk.i }"
              >{{ tk.text }}</span><template v-else>{{ ' ' }}</template></template>
          </h2>

          <div class="phil-line" aria-hidden="true"><span /></div>
        </div>
      </div>
    </div>

    <!-- Pillars -->
    <div class="phil-pillars px-6 pb-40">
      <div class="max-w-[1000px] mx-auto">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
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
    </div>

  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useFadeUp } from '../composables/useFadeUp'
import { useLanguage } from '../composables/useLanguage.js'
import { useScrollProgress } from '../composables/useScrollProgress.js'

useFadeUp()
const { t } = useLanguage()

// --p (0 → 1) = progress through the pinned stretch
const scene = ref(null)
useScrollProgress(scene, { mode: 'pin', prop: '--p' })

const pillars = computed(() => t('philosophy.pillars'))

// Split the headline (plain + accent + suffix parts) into words so each one can fade in on its own.
const tokens = computed(() => {
  const parts = [
    { text: t('philosophy.headline'),       em: false },
    { text: t('philosophy.headlineEm'),     em: true  },
    { text: t('philosophy.headlineSuffix'), em: false },
  ]
  const out = []
  let i = 0
  for (const part of parts) {
    for (const chunk of String(part.text || '').split(/(\s+)/)) {
      if (!chunk) continue
      if (/^\s+$/.test(chunk)) out.push({ word: false })
      else out.push({ word: true, text: chunk, em: part.em, i: i++ })
    }
  }
  return out
})

const wordCount = computed(() => tokens.value.filter((x) => x.word).length)

// Words finish revealing at 80% of the pinned scroll, leaving a short hold before it releases.
// 3 = how many words are mid-fade at once (soft edge).
const span = computed(() => ((wordCount.value + 3) / 0.8).toFixed(3))

const pillarIcons = [
  '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
  '<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>',
  '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
]
</script>

<style scoped>
/* Default layout (reduced motion / very short screens): a normal, fully readable section */
.phil-stage {
  padding: 160px 24px 0;
}

.phil-inner {
  max-width: 1000px;
  margin: 0 auto;
}

.phil-headline {
  max-width: 900px;
  font-size: clamp(26px, 4.5vw, 56px);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.12;
  color: var(--text);
}

.phil-word--em {
  font-style: italic;
  color: var(--accent);
}

.phil-line {
  height: 1px;
  margin-top: 64px;
  background: var(--border-strong);
}

.phil-line span {
  display: block;
  height: 100%;
  background: var(--accent);
  transform-origin: left center;
  transform: scaleX(0);
}

.phil-pillars {
  padding-top: 80px;
}

/* ── Pinned mode ─────────────────────────────────────────────────────── */
@media (prefers-reduced-motion: no-preference) and (min-height: 561px) {
  .phil-scene {
    height: calc(100vh * 2.4);
    height: calc(100svh * 2.4);
  }

  .phil-stage {
    position: sticky;
    top: 0;
    height: 100vh;
    height: 100svh;
    display: flex;
    align-items: center;
    padding: 72px 24px 0;
  }

  .phil-inner {
    width: 100%;
  }

  .phil-headline {
    max-width: 1000px;
    font-size: clamp(30px, 5.6vw, 76px);
    line-height: 1.08;
  }

  /* each word waits its turn (--i) and fades in over ~3 words as --p runs 0 → 1 */
  .phil-word {
    opacity: clamp(0.14, calc(0.14 + 0.86 * ((var(--p, 1) * var(--span) - var(--i)) / 3)), 1);
  }

  .phil-line span {
    transform: scaleX(var(--p, 1));
  }

  .phil-pillars {
    padding-top: 32px;
  }
}

@media (prefers-reduced-motion: no-preference) and (min-height: 561px) and (min-width: 768px) {
  .phil-pillars {
    padding-top: 64px;
  }
}
</style>
