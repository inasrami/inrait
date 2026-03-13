<template>
  <section id="services" class="py-32 px-6 relative" style="background: var(--surface);">

    <div class="absolute top-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);" />
    <div class="absolute bottom-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);" />

    <div class="max-w-[1080px] mx-auto">

      <div class="section-label fade-up mb-4">What We Build</div>
      <div class="flex items-end justify-between flex-wrap gap-6 mb-20">
        <h2 class="font-display fade-up text-[clamp(48px,8vw,80px)]" style="letter-spacing:0.02em; line-height:1; transition-delay:0.05s;">
          SERVICES
        </h2>
        <p class="text-text-muted text-[15px] max-w-sm leading-relaxed fade-up" style="transition-delay:0.1s;">
          Every engagement is scoped, priced, and delivered with full transparency. No retainers, no surprises, no lock-in.
        </p>
      </div>

      <div class="services-wrap">
        <div
          v-for="(service, i) in services"
          :key="service.title"
          class="service-row fade-up"
          :style="`transition-delay:${i * 0.07}s`"
          @mouseenter="active = i"
          @mouseleave="active = null"
          data-cursor
        >
          <!-- Index -->
          <span class="service-num">{{ String(i + 1).padStart(2, '0') }}</span>

          <!-- Title + Body -->
          <div class="service-main">
            <div class="flex items-center gap-3 mb-3">
              <div class="service-icon-wrap" :class="{ 'icon-active': active === i }">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  :stroke="active === i ? '#000' : 'var(--accent)'"
                  stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <g v-html="service.icon" />
                </svg>
              </div>
              <h3 class="font-semibold text-[19px] md:text-[21px]" style="letter-spacing:-0.02em;">{{ service.title }}</h3>
            </div>
            <p class="text-text-muted text-[14px] leading-relaxed">{{ service.body }}</p>
          </div>

          <!-- Deliverables -->
          <ul class="service-list">
            <li v-for="item in service.deliverables" :key="item" class="service-list-item">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>{{ item }}</span>
            </li>
          </ul>

          <!-- Price + CTA -->
          <div class="service-price-col">
            <div class="mb-5">
              <div class="price-label">Starting from</div>
              <div class="price-value">{{ service.price }}</div>
            </div>
            <RouterLink to="/contact" class="service-cta" data-cursor>
              Get a quote
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </RouterLink>
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
    title: 'Business Website',
    body: 'Custom-built websites that establish credibility and convert visitors into clients. We handle architecture, design, copy structure, performance, and deployment — end to end.',
    icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
    deliverables: [
      'Vue.js SPA or multi-page site',
      'Mobile-first responsive design',
      'SEO markup & Core Web Vitals optimisation',
      'CMS integration on request',
      'Git handoff + deployment support',
    ],
    price: '€900',
  },
  {
    title: 'Custom Booking System',
    body: 'Tailor-made reservation platforms for hotels, guesthouses, barbershops, and service businesses. Built to replace third-party tools and eliminate commission fees.',
    icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    deliverables: [
      'Real-time availability calendar',
      'Online payment integration (Stripe / PayPal)',
      'Automated email & SMS confirmations',
      'Admin dashboard for managing bookings',
      'Google Calendar sync',
    ],
    price: '€1,200',
  },
  {
    title: 'E-commerce Store',
    body: 'Full-featured online stores built for performance. Product management, checkout, payments — designed to sell from day one and scale with your catalogue.',
    icon: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.97 1.61h9.72a2 2 0 001.97-1.61L23 6H6"/>',
    deliverables: [
      'Product catalogue & variant management',
      'Secure checkout & payment gateway',
      'Order & inventory management',
      'Discount & coupon system',
      'Mobile-optimised shopping experience',
    ],
    price: '€1,500',
  },
  {
    title: 'Workflow Automation',
    body: 'We design and deploy n8n automation pipelines that eliminate repetitive work — lead capture, CRM syncing, notification flows, invoice generation, and multi-system integrations.',
    icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    deliverables: [
      'Custom n8n workflow design & build',
      'CRM, email & calendar integrations',
      'Automated lead capture & follow-up sequences',
      'Self-hosted or cloud deployment',
      'Full documentation & handover',
    ],
    price: '€600',
  },
  {
    title: 'Visual Identity & Design',
    body: 'Brand identity systems, UI/UX design, and marketing assets. We build brands that look intentional — from logo to colour palette to every client touchpoint.',
    icon: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
    deliverables: [
      'Logo design & brand guidelines',
      'UI/UX design (Figma or direct code)',
      'Social media & marketing assets',
      'Adobe Suite production files',
      'Typography & colour system',
    ],
    price: '€450',
  },
  {
    title: 'Photography & Media',
    body: 'Commercial photography and post-production for businesses that need their visual content to match the quality of their product — interiors, products, events, brand shoots.',
    icon: '<path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/>',
    deliverables: [
      'Commercial & brand photography',
      'Interior & product shoots',
      'Professional retouching & colour grading',
      'Event coverage',
      'Delivered in web & print formats',
    ],
    price: '€250',
  },
]
</script>

<style scoped>
.services-wrap {
  border: 1px solid var(--border);
  border-radius: 24px;
  overflow: hidden;
}

.service-row {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 36px 32px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  transition: background 0.3s ease;
  cursor: none;
}

.service-row:last-child { border-bottom: none; }
.service-row:hover { background: rgba(164, 224, 75, 0.025); }

@media (min-width: 900px) {
  .service-row {
    display: grid;
    grid-template-columns: 44px 1fr 190px 155px;
    align-items: start;
    gap: 28px;
  }
}

.service-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 40px;
  line-height: 1;
  letter-spacing: 0.02em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.07);
  display: none;
}

@media (min-width: 900px) { .service-num { display: block; } }

.service-icon-wrap {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(164, 224, 75, 0.07);
  border: 1px solid rgba(164, 224, 75, 0.18);
  flex-shrink: 0;
  transition: background 0.25s ease, border-color 0.25s ease;
}

.icon-active {
  background: var(--accent) !important;
  border-color: var(--accent) !important;
}

.service-list {
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding-top: 2px;
}

.service-list-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12.5px;
  color: var(--text-muted);
  line-height: 1.4;
}

.service-list-item svg { flex-shrink: 0; margin-top: 2px; }

.service-price-col {
  display: flex;
  flex-direction: column;
}

@media (min-width: 900px) {
  .service-price-col { align-items: flex-end; }
}

.price-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-dim);
  margin-bottom: 4px;
}

.price-value {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 36px;
  line-height: 1;
  letter-spacing: 0.02em;
  color: var(--accent);
  margin-bottom: 20px;
}

.service-cta {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  border: 1px solid var(--border-strong);
  border-radius: 100px;
  padding: 8px 16px;
  transition: color 0.2s ease, border-color 0.2s ease;
  cursor: none;
  white-space: nowrap;
}

.service-cta:hover {
  color: var(--accent);
  border-color: rgba(164, 224, 75, 0.35);
}
</style>