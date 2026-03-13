<template>
  <section id="process" class="py-32 px-6 relative overflow-hidden">

    <!-- Background accent -->
    <div
      class="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
      style="width: 600px; height: 600px; background: radial-gradient(ellipse at right center, rgba(164,224,75,0.04) 0%, transparent 70%);"
    />

    <div class="max-w-[1080px] mx-auto">

      <div class="section-label fade-up mb-4">How We Work</div>
      <h2 class="font-display fade-up text-[clamp(48px,8vw,80px)] mb-20" style="letter-spacing:0.02em; line-height:1;">
        THE PROCESS
      </h2>

      <!-- Process steps -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-0 relative">

        <!-- Vertical connector line (desktop) -->
        <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style="background: linear-gradient(to bottom, transparent, var(--border-strong), transparent);" />

        <div
          v-for="(step, i) in steps"
          :key="step.title"
          class="relative pb-16 last:pb-0 fade-up"
          :class="i % 2 === 1 ? 'md:mt-24' : ''"
          :style="`transition-delay: ${i * 0.12}s`"
        >
          <!-- Number -->
          <div
            class="font-display text-[80px] leading-none mb-4"
            style="color: transparent; -webkit-text-stroke: 1px rgba(164,224,75,0.2); letter-spacing: 0.02em;"
          >
            0{{ i + 1 }}
          </div>

          <div class="flex items-start gap-4">
            <div class="p-3 rounded-xl shrink-0" style="background: rgba(164,224,75,0.07); border: 1px solid rgba(164,224,75,0.15); margin-top: 2px;">
              <svg v-html="step.icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
            </div>
            <div>
              <h3 class="font-semibold text-[20px] mb-2" style="letter-spacing: -0.01em;">{{ step.title }}</h3>
              <p class="text-text-muted text-[15px] leading-relaxed">{{ step.body }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA after process -->
      <div class="mt-24 text-center fade-up">
        <p class="text-text-muted text-[17px] mb-8">Ready to build something extraordinary together?</p>
        <RouterLink to="/contact" class="btn-primary text-[15px] px-10 py-[18px]">
          Start the conversation
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useFadeUp } from '../composables/useFadeUp'

useFadeUp()

const steps = [
  {
    title: 'Discovery & Strategy',
    body: 'We align on the real problem first. Who is this for? What do they need to feel? What does success look like in 6 months?',
    icon: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  },
  {
    title: 'Design Architecture',
    body: 'We map the user journey, define the component structure, and establish the visual language before touching code.',
    icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
  },
  {
    title: 'Engineering & Build',
    body: 'Clean Vue components, semantic HTML, optimized assets, performance budgets from day one. No technical debt shipped.',
    icon: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  },
  {
    title: 'Review & Refinement',
    body: "Cross-device testing, performance audits, accessibility checks. We don't ship until it meets the standard set at the start.",
    icon: '<polyline points="20 6 9 17 4 12"/>',
  },
]
</script>