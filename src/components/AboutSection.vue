<template>
  <section id="about" class="relative px-6 py-32 overflow-hidden">

    <!-- Ambient glow -->
    <div class="absolute right-0 -translate-y-1/2 pointer-events-none top-1/2"
      style="width:600px;height:600px;background:radial-gradient(ellipse at right, rgba(164,224,75,0.05) 0%, transparent 70%);" />

    <div class="max-w-[1080px] mx-auto relative z-10">

      <!-- Header row -->
      <div class="flex flex-wrap items-start justify-between gap-6 mb-20">
        <div>
          <h2 class="font-display fade-up text-[clamp(48px,8vw,80px)]"
            style="letter-spacing:0.02em; line-height:1; transition-delay:0.05s;">
            {{ t('about.title') }}
          </h2>
        </div>

        <!-- Availability badge -->
        <div class="availability-badge fade-up" style="transition-delay:0.1s;">
          <span class="avail-dot" />
          <span>{{ t('about.available') }}</span>
        </div>
      </div>

      <!-- Studio statement -->
      <p class="fade-up text-[clamp(18px,2.5vw,26px)] leading-relaxed mb-20 max-w-3xl"
        style="font-weight:300; letter-spacing:-0.01em; transition-delay:0.08s;">
        {{ t('about.statement') }}
      </p>

      <!-- Values grid -->
      <div class="grid grid-cols-1 gap-4 mb-16 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(val, i) in values"
          :key="val.title"
          class="value-card fade-up"
          :style="`transition-delay:${0.1 + i * 0.07}s`"
        >
          <div class="mb-5 value-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="var(--accent)" stroke-width="1.75"
              stroke-linecap="round" stroke-linejoin="round">
              <g v-html="valueIcons[i]" />
            </svg>
          </div>
          <h3 class="font-semibold text-[15px] mb-2" style="letter-spacing:-0.01em;">{{ val.title }}</h3>
          <p class="text-[13px] text-text-muted leading-relaxed">{{ val.body }}</p>
        </div>
      </div>

      <!-- Bottom strip: location + CTA -->
      <div class="about-strip fade-up" style="transition-delay:0.45s;">
        <div class="flex items-center gap-3 text-text-muted text-[14px]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {{ t('about.location') }}
        </div>
        <RouterLink to="/contact" class="btn-outline text-[13px] py-[10px] px-5" style="cursor:none;">
          {{ t('about.startProject') }}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useFadeUp } from '../composables/useFadeUp'
import { useLanguage } from '../composables/useLanguage.js'

useFadeUp()
const { t } = useLanguage()

const values = computed(() => t('about.values'))

const valueIcons = [
  '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>',
  '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>',
  '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
]
</script>

<style scoped>
.availability-badge {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 10px 18px;
  border-radius: 100px;
  border: 1px solid rgba(164,224,75,0.25);
  background: rgba(164,224,75,0.05);
  font-size: 13px;
  font-weight: 500;
  color: var(--accent);
  white-space: nowrap;
  align-self: flex-start;
  margin-top: 6px;
}

.avail-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
  flex-shrink: 0;
  animation: pulse-dot 2.5s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 6px var(--accent); }
  50%       { box-shadow: 0 0 14px var(--accent); }
}

.value-card {
  padding: 28px 24px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.02);
  transition: border-color 0.25s ease, transform 0.25s ease;
}

.value-card:hover {
  border-color: rgba(164,224,75,0.2);
  transform: translateY(-3px);
}

.value-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(164,224,75,0.07);
  border: 1px solid rgba(164,224,75,0.15);
}

.about-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px 28px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.015);
}
</style>