<template>
  <section class="final-cta px-6">
    <div class="final-cta-content">
      <h2 class="font-display">{{ t('cta.title') }}</h2>
      <RouterLink to="/contact" class="btn-primary">
        {{ t('cta.start') }}
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useLanguage } from '../composables/useLanguage.js'

const { t } = useLanguage()
</script>

<style scoped>
.final-cta { padding-top: 54px; padding-bottom: 60px; background: var(--surface); }
.final-cta-content { display: flex; max-width: 1080px; align-items: center; justify-content: space-between; gap: 24px; margin: 0 auto; }
.final-cta h2 { margin: 0; font-size: clamp(28px, 5vw, 48px); font-weight: 400; letter-spacing: 0.02em; line-height: 1.1; }
.final-cta .btn-primary { flex: 0 0 auto; padding: 13px 22px; font-size: 14px; }
@media (max-width: 560px) {
  .final-cta { padding-top: 40px; padding-bottom: 44px; }
  .final-cta-content { align-items: flex-start; flex-direction: column; }
}
</style>
