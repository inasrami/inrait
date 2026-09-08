<template>
  <section id="services" class="relative px-6 py-32" style="background: var(--surface);">
    <div class="absolute top-0 left-0 right-0 h-px" style="background: var(--border);" />
    <div class="absolute bottom-0 left-0 right-0 h-px" style="background: var(--border);" />

    <div class="max-w-[1080px] mx-auto">
      <div class="flex flex-wrap items-end justify-between gap-6 mb-16">
        <div>
          <div class="mb-4 section-label fade-up">{{ t('services.label') }}</div>
          <h2 class="font-display fade-up text-[clamp(48px,8vw,80px)]" style="letter-spacing:0.02em; line-height:1; transition-delay:0.05s;">
            {{ t('services.title') }}
          </h2>
        </div>
        <RouterLink to="/services" class="fade-up btn-outline text-[13px] py-[10px] px-5 flex items-center gap-2" style="transition-delay:0.1s;">
          {{ t('services.viewAll') }}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </RouterLink>
      </div>

      <div class="grid grid-cols-1 gap-5 mb-10 md:grid-cols-3">
        <div v-for="(service, i) in heroServices" :key="service.id" class="hero-card fade-up" :style="`transition-delay:${i * 0.1}s`">
          <div class="flex items-start justify-between mb-8">
            <div class="card-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><g v-html="service.icon" /></svg>
            </div>
            <span class="service-tag">{{ service.tag }}</span>
          </div>
          <h3 class="font-semibold text-[21px] mb-3" style="letter-spacing:-0.02em;">{{ service.title }}</h3>
          <p class="text-text-muted text-[14px] leading-relaxed mb-8 flex-1">{{ service.body }}</p>
          <div class="card-footer">
            <div>
              <div class="text-[10px] uppercase tracking-widest text-text-dim mb-1">{{ t('services.from') }}</div>
              <div class="font-display text-[38px] leading-none" style="letter-spacing:0.02em; color:var(--accent);">€{{ service.basePrice.toLocaleString() }}</div>
            </div>
            <RouterLink to="/services" class="card-cta" style="cursor:none;">
              {{ t('services.details') }}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </RouterLink>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useLanguage } from '../composables/useLanguage.js'
import { useServices } from '../data/services.js'
import { useFadeUp } from '../composables/useFadeUp'

useFadeUp()
const { t } = useLanguage()
const { SERVICES } = useServices()
const heroServices = computed(() => SERVICES.value.filter(s => s.hero))
</script>

<style scoped>
.hero-card { display:flex; flex-direction:column; padding:32px; border-radius:24px; background:rgba(255,255,255,0.02); border:1px solid var(--border); transition:border-color 0.3s ease,transform 0.3s ease,box-shadow 0.3s ease; cursor:none; }
.hero-card:hover { border-color:rgba(164,224,75,0.2); transform:translateY(-5px); box-shadow:0 24px 60px rgba(0,0,0,0.5); }
.card-icon-wrap { width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; background:rgba(164,224,75,0.07); border:1px solid rgba(164,224,75,0.18); }
.service-tag { font-size:10px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:var(--accent); background:rgba(164,224,75,0.08); border:1px solid rgba(164,224,75,0.18); border-radius:100px; padding:4px 10px; }
.card-footer { display:flex; align-items:flex-end; justify-content:space-between; padding-top:20px; border-top:1px solid var(--border); margin-top:auto; }
.card-cta { display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:500; color:var(--text-muted); border:1px solid var(--border-strong); border-radius:100px; padding:8px 16px; transition:color 0.2s ease,border-color 0.2s ease; }
.card-cta:hover { color:var(--accent); border-color:rgba(164,224,75,0.35); }
</style>