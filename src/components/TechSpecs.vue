<template>
  <section id="industries" class="relative px-6 py-32" style="background: var(--surface);">

    <div class="absolute top-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);" />

    <div class="max-w-[1080px] mx-auto">

      <div class="flex flex-wrap items-end justify-between gap-6 mb-20">
        <h2 class="font-display fade-up text-[clamp(40px,7vw,72px)]" style="letter-spacing:0.02em; line-height:1.1;">
          Who We Build For
        </h2>
        <p class="text-text-muted text-[15px] max-w-sm leading-relaxed fade-up" style="transition-delay: 0.1s;">
          We engineer specialized digital solutions tailored to the unique operational needs of modern businesses.
        </p>
      </div>

      <!-- Industries Grid -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div
          v-for="(industry, i) in industries"
          :key="industry.title"
          class="flex flex-col p-8 card-glass fade-up"
          :style="`transition-delay: ${i * 0.1}s`"
        >
          <div class="flex items-center gap-3 mb-5">
            <div class="p-2 rounded-lg" style="background: rgba(164,224,75,0.08); border: 1px solid rgba(164,224,75,0.15);">
              <svg v-html="industry.icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
            </div>
            <h3 class="font-semibold text-[18px] text-white">{{ industry.title }}</h3>
          </div>

          <div class="mb-4">
            <span class="inline-block px-3 py-1.5 text-[11px] font-bold tracking-wider uppercase rounded-md" style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: var(--accent);">
              Ideal for: {{ industry.idealFor }}
            </span>
          </div>

          <p class="text-[14.5px] leading-relaxed text-text-muted flex-grow">
            {{ industry.value }}
          </p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useFadeUp } from '../composables/useFadeUp'
// import { useLanguage } from '../composables/useLanguage.js' // Uncomment if you add these strings to your i18n files

useFadeUp()
// const { t } = useLanguage()

const industries = [
  {
    title: 'Service & Appointment',
    idealFor: 'Barbershops, salons, and personal care',
    value: 'We build custom booking platforms that eliminate no-shows and seamlessly manage schedules so you can focus on your clients, not your calendar.',
    // Calendar Icon
    icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'
  },
  {
    title: 'Automotive & Dealerships',
    idealFor: 'Auto retailers, detailers, and showrooms',
    value: 'High-performance showcase sites designed to highlight inventory with crisp, responsive layouts that drive inquiries and test drives.',
    // Car Icon
    icon: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 13v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>' 
  },
  {
    title: 'Boutique Hospitality',
    idealFor: 'Boutique hotels, guesthouses, and unique stays',
    value: 'Digital experiences that capture your unique atmosphere, paired with seamless direct-booking flows that reduce reliance on third-party platforms.',
    // Home/Hotel Icon
    icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'
  },
  {
    title: 'Wellness & Specialized Retail',
    idealFor: 'Herbal dispensaries, wellness brands, e-commerce',
    value: 'From ground-up visual brand identity to high-converting online stores, we create digital storefronts that build trust and scale your sales.',
    // Shopping Bag Icon
    icon: '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>'
  }
]
</script>