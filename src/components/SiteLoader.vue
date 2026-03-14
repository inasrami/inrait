<template>
  <Transition name="loader">
    <div v-if="visible" class="site-loader" aria-hidden="true">
      <!-- Animated logo mark -->
      <div class="loader-content">
        <div class="loader-logo">
          IN<span style="color: var(--accent)">R</span>AIT
        </div>
        <div class="loader-bar-wrap">
          <div class="loader-bar" :style="`width: ${progress}%`" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const visible  = ref(true)
const progress = ref(0)

onMounted(() => {
  // Animate progress bar
  const start = performance.now()
  const duration = 900

  function step(now) {
    const elapsed = now - start
    progress.value = Math.min((elapsed / duration) * 100, 100)
    if (elapsed < duration) {
      requestAnimationFrame(step)
    }
  }
  requestAnimationFrame(step)

  // Dismiss after window load or timeout, whichever is first
  const dismiss = () => {
    progress.value = 100
    setTimeout(() => { visible.value = false }, 300)
  }

  if (document.readyState === 'complete') {
    setTimeout(dismiss, 600)
  } else {
    window.addEventListener('load', dismiss, { once: true })
    // Hard fallback — never show longer than 2.5s
    setTimeout(dismiss, 2500)
  }
})
</script>

<style scoped>
.site-loader {
  position: fixed;
  inset: 0;
  background: #000;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

.loader-logo {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(48px, 10vw, 96px);
  letter-spacing: 0.06em;
  color: #fff;
  animation: logoIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes logoIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.loader-bar-wrap {
  width: 120px;
  height: 2px;
  background: rgba(255,255,255,0.08);
  border-radius: 100px;
  overflow: hidden;
}

.loader-bar {
  height: 100%;
  background: var(--accent);
  border-radius: 100px;
  transition: width 0.1s linear;
  box-shadow: 0 0 8px var(--accent);
}

/* Exit transition */
.loader-leave-active {
  transition: opacity 0.5s ease;
}
.loader-leave-to {
  opacity: 0;
}
</style>