<template>
  <section class="relative px-6 py-32 overflow-hidden" style="background: var(--surface);">

    <div class="absolute top-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);" />

    <div class="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none left-1/2 top-1/2"
      style="width:700px;height:400px;background:radial-gradient(ellipse at center, rgba(164,224,75,0.04) 0%, transparent 70%);" />

    <div class="max-w-[1080px] mx-auto relative z-10">

      <div class="mb-4 section-label fade-up" style="width:fit-content; margin-inline:auto;">Client Results</div>
      <h2 class="font-display fade-up text-[clamp(48px,8vw,80px)] text-center mb-20"
        style="letter-spacing:0.02em; line-height:1; transition-delay:0.05s;">
        TESTIMONIALS
      </h2>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div
          v-for="(t, i) in testimonials"
          :key="t.name"
          class="testimonial-card fade-up"
          :style="`transition-delay:${i * 0.12}s`"
        >
          <!-- Stars -->
          <div class="flex gap-1 mb-6">
            <svg v-for="n in 5" :key="n" width="13" height="13" viewBox="0 0 24 24" fill="var(--accent)" stroke="none">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>

          <blockquote class="text-[14px] leading-relaxed text-text-muted mb-8" style="font-style:italic;">
            "{{ t.quote }}"
          </blockquote>

          <div class="h-px mb-6" style="background:var(--border);" />

          <div class="flex items-center gap-3">
            <div class="t-avatar">
              <span>{{ t.name.charAt(0) }}</span>
            </div>
            <div>
              <div class="font-semibold text-[13px]">{{ t.name }}</div>
              <div class="text-[12px] text-text-dim">{{ t.role }} · {{ t.company }}</div>
            </div>
          </div>
        </div>
      </div>


    </div>
  </section>
</template>

<script setup>
import { useFadeUp } from '../composables/useFadeUp'
useFadeUp()


const testimonials = [
  {
    quote: 'Working with INRAIT was unlike any agency experience we have had. The attention to detail was extraordinary — every interaction on our platform felt intentional. Delivered on time, on budget, zero surprises.',
    name: 'Client Name',
    role: 'Founder',
    company: 'Company Name',
  },
  {
    quote: 'We needed a booking system that felt premium enough for our clientele. What we received exceeded our expectations. The interface is fast, intuitive, and our guests actually compliment us on it.',
    name: 'Client Name',
    role: 'Owner',
    company: 'Company Name',
  },
  {
    quote: 'The team has a rare combination of engineering precision and design sensibility. The result speaks for itself. We have already started planning our second project together.',
    name: 'Client Name',
    role: 'CEO',
    company: 'Company Name',
  },
]
</script>

<style scoped>
.testimonial-card {
  padding: 32px;
  border-radius: 20px;
  background: rgba(255,255,255,0.018);
  border: 1px solid var(--border);
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.testimonial-card:hover {
  border-color: rgba(164,224,75,0.18);
  transform: translateY(-4px);
  box-shadow: 0 20px 48px rgba(0,0,0,0.4);
}

.t-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(164,224,75,0.08);
  border: 1px solid rgba(164,224,75,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  flex-shrink: 0;
}
</style>