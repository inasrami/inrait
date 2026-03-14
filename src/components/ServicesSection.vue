<template>
  <section id="services" class="relative px-6 py-32" style="background: var(--surface);">

    <div class="absolute top-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);" />
    <div class="absolute bottom-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);" />

    <div class="max-w-[1080px] mx-auto">

      <!-- Header -->
      <div class="flex flex-wrap items-end justify-between gap-6 mb-16">
        <div>
          <div class="mb-4 section-label fade-up">What We Build</div>
          <h2 class="font-display fade-up text-[clamp(48px,8vw,80px)]"
            style="letter-spacing:0.02em; line-height:1; transition-delay:0.05s;">
            SERVICES
          </h2>
        </div>
        <RouterLink
          to="/services"
          class="fade-up btn-outline text-[13px] py-[10px] px-5 flex items-center gap-2"
          style="transition-delay:0.1s;"
        >
          View all 6 services
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </RouterLink>
      </div>

      <!-- 3 hero cards -->
      <div class="grid grid-cols-1 gap-5 mb-10 md:grid-cols-3">
        <div
          v-for="(service, i) in heroServices"
          :key="service.id"
          class="hero-card fade-up"
          :style="`transition-delay:${i * 0.1}s`"
          @mouseenter="active = i"
          @mouseleave="active = null"
        >
          <!-- Top: icon + tag -->
          <div class="flex items-start justify-between mb-8">
            <div class="card-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="var(--accent)" stroke-width="1.75"
                stroke-linecap="round" stroke-linejoin="round">
                <g v-html="service.icon" />
              </svg>
            </div>
            <span class="service-tag">{{ service.tag }}</span>
          </div>

          <!-- Title + body -->
          <h3 class="font-semibold text-[21px] mb-3" style="letter-spacing:-0.02em;">
            {{ service.title }}
          </h3>
          <p class="text-text-muted text-[14px] leading-relaxed mb-8">{{ service.body }}</p>

          <!-- Deliverables -->
          <ul class="flex flex-col flex-1 gap-2 mb-10">
            <li v-for="item in service.deliverables" :key="item" class="flex items-start gap-2 text-[13px] text-text-muted">
              <svg class="flex-shrink-0 mt-[3px]" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {{ item }}
            </li>
          </ul>

          <!-- Footer: price + CTA -->
          <div class="card-footer">
            <div>
              <div class="text-[10px] uppercase tracking-widest text-text-dim mb-1">Starting from</div>
              <div class="font-display text-[38px] leading-none" style="letter-spacing:0.02em; color:var(--accent);">
                €{{ service.basePrice.toLocaleString() }}
              </div>
            </div>
            <RouterLink to="/services" class="card-cta" style="cursor:none;">
              Details
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Bottom CTA strip -->
      <div class="more-strip fade-up">
        <div class="flex items-start gap-3">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span class="text-[13px] text-text-muted leading-relaxed">
            We also offer <strong class="text-text-main">E-commerce, Visual Identity &amp; Photography.</strong>
            Combine services for up to <strong class="text-accent">15% off.</strong>
            All prices are estimates — final cost is agreed after a free consultation.
          </span>
        </div>
        <RouterLink to="/services" class="more-link" style="cursor:none;">
          Build your package
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
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { SERVICES } from '../data/services.js'
import { useFadeUp } from '../composables/useFadeUp'

useFadeUp()
const active = ref(null)
const heroServices = computed(() => SERVICES.filter(s => s.hero))
</script>

<style scoped>
.hero-card {
  display: flex;
  flex-direction: column;
  padding: 32px;
  border-radius: 24px;
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--border);
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  cursor: none;
}

.hero-card:hover {
  border-color: rgba(164,224,75,0.2);
  transform: translateY(-5px);
  box-shadow: 0 24px 60px rgba(0,0,0,0.5);
}

.card-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(164,224,75,0.07);
  border: 1px solid rgba(164,224,75,0.18);
}

.service-tag {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  background: rgba(164,224,75,0.08);
  border: 1px solid rgba(164,224,75,0.18);
  border-radius: 100px;
  padding: 4px 10px;
}

.card-footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-top: 20px;
  border-top: 1px solid var(--border);
  margin-top: auto;
}

.card-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  border: 1px solid var(--border-strong);
  border-radius: 100px;
  padding: 8px 16px;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.card-cta:hover {
  color: var(--accent);
  border-color: rgba(164,224,75,0.35);
}

.more-strip {
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

.more-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  white-space: nowrap;
  transition: gap 0.2s ease;
}

.more-link:hover { gap: 10px; }
</style>