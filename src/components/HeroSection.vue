<template>
  <section class="relative min-h-screen flex flex-col justify-center items-center overflow-hidden grid-bg noise" style="padding-top: 80px;">

    <!-- Ambient glow -->
    <div class="hero-glow" />

    <!-- Horizontal line accent -->
    <div
      class="absolute left-0 right-0"
      style="top: 38%; height: 1px; background: linear-gradient(90deg, transparent 0%, rgba(164,224,75,0.15) 30%, rgba(164,224,75,0.15) 70%, transparent 100%);"
    />

    <!-- Content -->
    <div class="relative z-10 text-center px-6 max-w-[1000px] mx-auto">

      <!-- Label -->
      <div class="section-label mx-auto mb-8 fade-in" style="transition-delay: 0.1s">
        Available for projects · Sofia, Bulgaria
      </div>

      <!-- Main headline -->
      <h1 class="font-display leading-none mb-6" style="font-size: clamp(72px, 14vw, 200px); letter-spacing: 0.02em;">
        <span class="text-gradient block fade-in" style="transition-delay: 0.15s">WEB</span>
        <span class="fade-in" style="color: var(--accent); transition-delay: 0.25s; display: block;">ENGINEERING</span>
        <span class="text-gradient block fade-in" style="transition-delay: 0.35s">THAT HITS.</span>
      </h1>

      <!-- Subheadline -->
      <p
        class="text-text-muted fade-in"
        style="font-size: clamp(17px, 2.5vw, 22px); max-width: 540px; margin: 0 auto 48px; line-height: 1.6; font-weight: 300; transition-delay: 0.5s;"
      >
        I build fast, scalable, obsessively crafted front-end platforms — the kind clients remember and users keep coming back to.
      </p>

      <!-- CTAs -->
      <div class="flex flex-wrap gap-4 justify-center fade-in" style="transition-delay: 0.65s">
        <RouterLink to="/contact" class="btn-primary">
          Start a project
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </RouterLink>
        <a href="#work" class="btn-outline" @click.prevent="scrollToWork">
          See my work
        </a>
      </div>

      <!-- Social proof row -->
      <div class="flex items-center justify-center gap-8 mt-16 fade-in" style="transition-delay: 0.8s">
        <div class="text-center">
          <div class="stat-number text-[40px]">5+</div>
          <div class="text-text-muted text-[12px] uppercase tracking-widest mt-1">Live Projects</div>
        </div>
        <div class="w-px h-10 bg-white/10" />
        <div class="text-center">
          <div class="stat-number text-[40px]">3+</div>
          <div class="text-text-muted text-[12px] uppercase tracking-widest mt-1">Years Building</div>
        </div>
        <div class="w-px h-10 bg-white/10" />
        <div class="text-center">
          <div class="stat-number text-[40px]">100%</div>
          <div class="text-text-muted text-[12px] uppercase tracking-widest mt-1">Custom Code</div>
        </div>
      </div>
    </div>

    <!-- Scroll arrow -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-arrow opacity-40">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
    </div>

  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

function scrollToWork() {
  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  // Trigger fade-ins that are already in viewport
  document.querySelectorAll('.fade-in').forEach((el, i) => {
    setTimeout(() => el.classList.add('is-visible'), 100 + i * 50)
  })
})
</script>