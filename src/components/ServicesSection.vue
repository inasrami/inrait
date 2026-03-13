<template>
  <section id="services" class="py-32 px-6 relative" style="background: var(--surface);">

    <div class="absolute top-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);" />
    <div class="absolute bottom-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);" />

    <div class="max-w-[1080px] mx-auto">

      <div class="section-label fade-up mb-4">What We Offer</div>
      <div class="flex items-end justify-between flex-wrap gap-6 mb-20">
        <h2 class="font-display fade-up text-[clamp(48px,8vw,80px)]" style="letter-spacing:0.02em; line-height:1; transition-delay: 0.05s;">
          SERVICES
        </h2>
        <p class="text-text-muted text-[15px] max-w-sm leading-relaxed fade-up" style="transition-delay: 0.1s;">
          Every engagement is scoped, priced, and delivered with full transparency — no surprises, no middlemen.
        </p>
      </div>

      <!-- Service cards -->
      <div class="flex flex-col gap-px" style="border: 1px solid var(--border); border-radius: 24px; overflow: hidden;">
        <div
          v-for="(service, i) in services"
          :key="service.title"
          class="service-row fade-up"
          :style="`transition-delay: ${i * 0.1}s`"
          @mouseenter="active = i"
          @mouseleave="active = null"
          data-cursor
        >
          <!-- Left: number + title -->
          <div class="service-left">
            <span class="service-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <div>
              <div class="flex items-center gap-3 mb-2">
                <div class="service-icon-wrap">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" :stroke="active === i ? '#000' : 'var(--accent)'" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                    <g v-html="service.icon" />
                  </svg>
                </div>
                <h3 class="font-semibold text-[20px] md:text-[24px]" style="letter-spacing: -0.02em;">
                  {{ service.title }}
                </h3>
              </div>
              <p class="text-text-muted text-[14px] leading-relaxed max-w-md">{{ service.body }}</p>
            </div>
          </div>

          <!-- Right: deliverables + price -->
          <div class="service-right">
            <ul class="flex flex-col gap-2 mb-6">
              <li
                v-for="item in service.deliverables"
                :key="item"
                class="flex items-center gap-2 text-[13px] text-text-muted"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {{ item }}
              </li>
            </ul>
            <div class="flex items-center justify-between">
              <div>
                <div class="text-[10px] uppercase tracking-widest text-text-dim mb-0.5">Starting from</div>
                <div class="font-display text-[28px]" style="letter-spacing: 0.02em; color: var(--accent);">{{ service.price }}</div>
              </div>
              <RouterLink to="/contact" class="service-cta">
                Get a quote
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </RouterLink>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useFadeUp } from '../composables/useFadeUp'

useFadeUp()

const active = ref(null)

const services = [
  {
    title: 'Web Engineering',
    body: 'Full front-end development from architecture to deployment. Vue.js applications, marketing websites, booking platforms, dashboards — built to perform and scale.',
    icon: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    deliverables: [
      'Vue.js / JavaScript SPA or website',
      'Responsive, mobile-first layout',
      'Performance optimisation & SEO markup',
      'MongoDB or REST API integration',
      'Git delivery + deployment support',
    ],
    price: '€800',
  },
  {
    title: 'Design & Visual Identity',
    body: 'Brand identity, UI design, and graphic assets. Built for companies that understand that design is not decoration — it is the product.',
    icon: '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3-.5 3-2v-.5c0-.47-.15-.9-.4-1.26-.24-.35-.4-.78-.4-1.24 0-1.1.9-2 2-2h2c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z"/>',
    deliverables: [
      'Logo design & brand guidelines',
      'UI/UX design (Figma or direct code)',
      'Social media & marketing assets',
      'Adobe Suite production files',
      'Typography & colour system',
    ],
    price: '€400',
  },
  {
    title: 'Photography & Media',
    body: 'Professional photography, video editing, and post-production for businesses that need their visual content to match the quality of their product.',
    icon: '<path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/>',
    deliverables: [
      'Commercial product & brand photography',
      'Event & corporate shoots',
      'Professional photo retouching',
      'Video editing & colour grading',
      'Delivered in web & print formats',
    ],
    price: '€300',
  },
]
</script>

<style scoped>
.service-row {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 36px 40px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  transition: background 0.3s ease;
  cursor: none;
}

.service-row:last-child { border-bottom: none; }

.service-row:hover {
  background: rgba(164,224,75,0.04);
}

@media (min-width: 768px) {
  .service-row {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 40px;
  }
}

.service-left {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  flex: 1;
}

.service-right {
  flex-shrink: 0;
  width: 100%;
  padding-top: 4px;
}

@media (min-width: 768px) {
  .service-right { width: 280px; }
}

.service-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 48px;
  line-height: 1;
  letter-spacing: 0.02em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.1);
  flex-shrink: 0;
  margin-top: -4px;
}

.service-icon-wrap {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(164,224,75,0.08);
  border: 1px solid rgba(164,224,75,0.2);
  flex-shrink: 0;
  transition: background 0.2s ease;
}

.service-row:hover .service-icon-wrap {
  background: var(--accent);
  border-color: var(--accent);
}

.service-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
  border: 1px solid var(--border-strong);
  border-radius: 100px;
  padding: 8px 16px;
  transition: color 0.2s ease, border-color 0.2s ease;
  cursor: none;
}

.service-cta:hover {
  color: var(--accent);
  border-color: var(--accent);
}
</style>