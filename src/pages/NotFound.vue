<template>
  <div class="notfound">
    <div class="hero-glow" />

    <div class="max-w-[1080px] mx-auto px-6 text-center relative z-10">

      <!-- Big 404 -->
      <div class="font-display notfound-num">404</div>

      <h1 class="font-display text-[clamp(36px,6vw,64px)] mb-6 leading-none" style="letter-spacing:0.02em;">
        {{ t('notFound.title') }}
      </h1>

      <p class="text-text-muted text-[17px] max-w-md mx-auto leading-relaxed mb-12" style="font-weight:300;">
        {{ t('notFound.sub') }}
      </p>

      <div class="flex flex-wrap items-center justify-center gap-4">
        <RouterLink to="/" class="btn-primary px-8 py-4 text-[15px]">
          {{ t('notFound.home') }}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </RouterLink>
        <RouterLink to="/contact" class="btn-outline px-8 py-4 text-[15px]">
          {{ t('notFound.contact') }}
        </RouterLink>
      </div>

      <!-- Quick links -->
      <div class="flex flex-wrap justify-center gap-3 mt-20">
        <span class="text-[12px] text-text-dim uppercase tracking-widest mr-2 self-center">{{ t('notFound.orGoTo') }}</span>
        <RouterLink
          v-for="link in quickLinks"
          :key="link.to"
          :to="link.to"
          class="quick-link"
        >
          {{ link.label }}
        </RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useSeo } from '../composables/useSeo.js'
import { useLanguage } from '../composables/useLanguage.js'

const { t } = useLanguage()

useSeo({
  title:       '404 — Page Not Found',
  description: 'The page you are looking for does not exist. Return to the INRAIT homepage.',
  canonical:   '/404',
})

const quickLinks = computed(() => t('notFound.quickLinks'))
</script>

<style scoped>
.notfound {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 0 80px;
  position: relative;
  overflow: hidden;
}

.notfound-num {
  font-size: clamp(160px, 28vw, 320px);
  line-height: 1;
  letter-spacing: 0.02em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(164,224,75,0.15);
  margin-bottom: -20px;
  user-select: none;
  pointer-events: none;
}

.quick-link {
  padding: 6px 14px;
  border-radius: 100px;
  border: 1px solid var(--border);
  font-size: 13px;
  color: var(--text-muted);
  transition: color 0.2s ease, border-color 0.2s ease;
  cursor: none;
}

.quick-link:hover {
  color: var(--accent);
  border-color: rgba(164,224,75,0.35);
}
</style>