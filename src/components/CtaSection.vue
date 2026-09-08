<template>
  <section class="relative px-6 py-40 overflow-hidden" style="background: var(--surface);">

    <div class="max-w-[760px] mx-auto text-center relative z-10">

      <h2
        class="font-display fade-up"
        style="font-size: clamp(64px, 12vw, 140px); letter-spacing: 0.02em; line-height: 0.92; transition-delay: 0.1s; margin-bottom: 32px;"
      >
        {{ t('cta.line1') }}<br/>
        <span style="color: var(--accent);">{{ t('cta.line2') }}</span>
      </h2>

      <p class="text-text-muted text-[18px] leading-relaxed mb-12 fade-up" style="transition-delay: 0.2s; max-width: 480px; margin-left: auto; margin-right: auto;">
        {{ t('cta.sub') }}
      </p>

      <div class="flex flex-wrap justify-center gap-4 fade-up" style="transition-delay: 0.3s;">
        <RouterLink to="/contact" class="btn-primary text-[16px] px-10 py-5">
          {{ t('cta.start') }}
        </RouterLink>
        <a href="mailto:inkorami27@gmail.com" class="btn-outline text-[16px] px-10 py-5">
          {{ t('cta.email') }}
        </a>
      </div>

    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useFadeUp } from '../composables/useFadeUp'
import { useLanguage } from '../composables/useLanguage.js'

useFadeUp()
const { t } = useLanguage()
</script>