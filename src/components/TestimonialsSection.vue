<template>
  <section class="py-32 px-6 relative overflow-hidden" style="background: var(--surface);">

    <div class="absolute top-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);" />

    <!-- Ambient glow -->
    <div
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style="width: 700px; height: 400px; background: radial-gradient(ellipse at center, rgba(164,224,75,0.04) 0%, transparent 70%);"
    />

    <div class="max-w-[1080px] mx-auto relative z-10">

      <div class="section-label fade-up mb-4 mx-auto" style="width: fit-content;">What Clients Say</div>
      <h2 class="font-display fade-up text-[clamp(48px,8vw,80px)] text-center mb-20" style="letter-spacing:0.02em; line-height:1; transition-delay: 0.05s;">
        TESTIMONIALS
      </h2>

      <!-- Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(t, i) in testimonials"
          :key="t.name"
          class="testimonial-card fade-up"
          :style="`transition-delay: ${i * 0.12}s`"
        >
          <!-- Stars -->
          <div class="flex gap-1 mb-6">
            <svg v-for="n in 5" :key="n" width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>

          <!-- Quote -->
          <blockquote class="text-[15px] leading-relaxed text-text-muted mb-8" style="font-style: italic;">
            "{{ t.quote }}"
          </blockquote>

          <!-- Divider -->
          <div class="h-px mb-6" style="background: var(--border);" />

          <!-- Author -->
          <div class="flex items-center gap-3">
            <div class="testimonial-avatar">
              <span>{{ t.name.charAt(0) }}</span>
            </div>
            <div>
              <div class="font-semibold text-[14px] text-text-main">{{ t.name }}</div>
              <div class="text-[12px] text-text-dim">{{ t.role }} · {{ t.company }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Placeholder note — remove once you have real testimonials -->
      <p class="text-center text-[12px] text-text-dim mt-10 fade-up" style="transition-delay: 0.4s;">
        Real quotes from real clients. Replace placeholder text in
        <code style="font-size: 11px; background: rgba(255,255,255,0.06); padding: 2px 6px; border-radius: 4px;">TestimonialsSection.vue</code>
        with your own.
      </p>

    </div>
  </section>
</template>

<script setup>
import { useFadeUp } from '../composables/useFadeUp'

useFadeUp()

// ─── Replace these with real client quotes ───────────────
const testimonials = [
  {
    quote: "Working with INRAIT was unlike any agency experience I've had. The attention to detail was extraordinary — every interaction on our platform felt intentional. Delivered on time, on budget, zero surprises.",
    name: 'Client Name',
    role: 'Founder',
    company: 'Company Name',
  },
  {
    quote: "We needed a booking system that felt premium enough for our clientele. What we got exceeded our expectations. The interface is fast, intuitive, and our clients actually compliment us on it.",
    name: 'Client Name',
    role: 'Owner',
    company: 'Company Name',
  },
  {
    quote: "Inas has a rare skill set — the technical depth of a senior developer and the design sensibility of a creative director. The result speaks for itself. We've already started our second project together.",
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
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--border);
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.testimonial-card:hover {
  border-color: rgba(164,224,75,0.2);
  transform: translateY(-4px);
  box-shadow: 0 20px 48px rgba(0,0,0,0.4);
}

.testimonial-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(164,224,75,0.1);
  border: 1px solid rgba(164,224,75,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: var(--accent);
  flex-shrink: 0;
}
</style>