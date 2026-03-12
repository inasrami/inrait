<template>
  <section
    id="philosophy"
    class="py-36 px-5 max-w-[1080px] mx-auto min-h-[80vh] flex items-center"
  >
    <h2
      ref="textEl"
      class="text-gradient-reveal font-semibold leading-[1.08]"
      style="
        font-size: clamp(30px, 5.5vw, 68px);
        letter-spacing: -0.015em;
        background-position: 100% 0;
        transition: none;
      "
    >
      Clean code. Absolute performance.&nbsp;We engineer scalable front-end platforms
      that don't just function perfectly — they feel entirely native to the web.
    </h2>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const textEl = ref(null)

function onScroll() {
  if (!textEl.value) return
  const rect = textEl.value.getBoundingClientRect()
  const wh   = window.innerHeight

  if (rect.top < wh * 0.85 && rect.bottom > 0) {
    let progress = 1 - rect.top / (wh * 0.82)
    progress = Math.max(0, Math.min(1, progress))
    const pos = 100 - progress * 100
    textEl.value.style.backgroundPosition = `${pos}% 0`
  }
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
