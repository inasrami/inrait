<template>
  <section class="relative px-6 py-40 overflow-hidden" style="background: var(--surface);">

    <div
      class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(ellipse at center, rgba(164,224,75,0.07) 0%, transparent 65%);"
    />

    <div class="max-w-[760px] mx-auto text-center relative z-10">

      <div class="mx-auto mb-8 section-label fade-up">{{ t('cta.label') }}</div>

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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </RouterLink>
        <a href="mailto:inkorami27@gmail.com" class="btn-outline text-[16px] px-10 py-5">
          {{ t('cta.email') }}
        </a>
      </div>

      <!-- Availability badge -->
      <div class="mt-10 fade-up" style="transition-delay: 0.4s;">
        <span class="inline-flex items-center gap-2 text-[13px] text-text-muted">
          <span class="inline-block w-2 h-2 rounded-full bg-accent" style="box-shadow: 0 0 8px var(--accent);" />
          {{ t('cta.avail') }}
        </span>
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