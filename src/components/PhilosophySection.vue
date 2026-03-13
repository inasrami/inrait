<template>
  <section id="philosophy" class="relative px-6 py-40 overflow-hidden">

    <!-- Subtle accent line left -->
    <div class="absolute left-0 top-1/2 w-[1px] h-40 -translate-y-1/2" style="background: linear-gradient(to bottom, transparent, var(--accent), transparent);" />

    <div class="max-w-[1000px] mx-auto">

      <div class="mb-12 section-label fade-up">Philosophy</div>

      <h2
        ref="textEl"
        class="font-semibold text-gradient-reveal"
        style="
          font-size: clamp(26px, 4.5vw, 56px);
          letter-spacing: -0.02em;
          line-height: 1.12;
          max-width: 900px;
        "
      >
        Most websites exist. The best ones<em style="font-style:italic; color: var(--accent);"> speak</em>. We build the kind that make visitors stop scrolling and start trusting — before they've read a single word.
      </h2>

      <div class="my-16 divider" />

      <div class="grid grid-cols-1 gap-8 mt-4 md:grid-cols-3">
        <div v-for="(pillar, i) in pillars" :key="pillar.title" class="fade-up" :style="`transition-delay: ${i * 0.12}s`">
          <div class="mb-4">
            <!-- SVG icon -->
            <div class="inline-flex p-3 border rounded-xl" style="border-color: rgba(164,224,75,0.2); background: rgba(164,224,75,0.05);">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <g v-html="pillar.icon" />
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useFadeUp } from '../composables/useFadeUp'

useFadeUp()

const textEl = ref(null)

const pillars = [
  {
    title: 'Speed is design.',
    body: 'Every millisecond costs conversions. We write lean, optimized code because a beautiful interface that loads slow is a broken interface.',
    icon: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
  },
  {
    title: 'UX is psychology.',
    body: "Users don't read — they feel. Every layout decision, every micro-interaction guides attention and builds confidence without a word.",
    icon: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>',
  },
  {
    title: 'Code is craft.',
    body: 'Scalable architecture, clean components, semantic HTML. Code you can hand off to any senior dev without embarrassment.',
    icon: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  },
]

function onScroll() {
  if (!textEl.value) return
  const rect = textEl.value.getBoundingClientRect()
  const wh   = window.innerHeight
  if (rect.top < wh * 0.85 && rect.bottom > 0) {
    let progress = 1 - rect.top / (wh * 0.75)
    progress = Math.max(0, Math.min(1, progress))
    textEl.value.style.backgroundPosition = `${(1 - progress) * 100}% 0`
  }
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>