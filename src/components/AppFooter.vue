<template>
  <footer class="relative overflow-hidden" style="background: #000;">

    <!-- Gradient overlay top -->
    <div class="absolute top-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(164,224,75,0.2), transparent);" />

    <div class="max-w-[1080px] mx-auto px-6 pt-20 pb-10">

      <div class="flex flex-col justify-between gap-16 mb-16 md:flex-row">

        <!-- Brand column -->
        <div class="max-w-[280px]">
          <RouterLink to="/" class="font-display text-[28px] tracking-wider block mb-4">
            IN<span style="color: var(--accent)">R</span>AIT
          </RouterLink>
          <p class="text-text-muted text-[14px] leading-relaxed mb-6">
            Pro web engineering from Sofia, Bulgaria. Clean code. Absolute performance. Built to scale.
          </p>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-accent" style="box-shadow: 0 0 8px var(--accent);" />
            <span class="text-[13px] text-text-muted">Available for projects</span>
          </div>
        </div>

        <!-- Links grid -->
        <div class="grid grid-cols-2 gap-10 sm:grid-cols-3">

          <div>
            <h4 class="text-[11px] font-semibold uppercase tracking-widest text-text-dim mb-4">Work</h4>
            <div class="flex flex-col gap-3">
              <RouterLink to="/work/barbers-unity" class="footer-link">Barbers Unity</RouterLink>
              <RouterLink to="/work/shiftease" class="footer-link">ShiftEase</RouterLink>
              <RouterLink to="/work/hotel-prestige" class="footer-link">Hotel Prestige</RouterLink>
              <RouterLink to="/work/dna-of-design" class="footer-link">DNA of Design</RouterLink>
              <RouterLink to="/work/aurum" class="footer-link">Aurum</RouterLink>
            </div>
          </div>

          <div>
            <h4 class="text-[11px] font-semibold uppercase tracking-widest text-text-dim mb-4">Navigate</h4>
            <div class="flex flex-col gap-3">
              <RouterLink to="/services" class="footer-link">Services</RouterLink>
              <a href="/#philosophy" class="footer-link">Philosophy</a>
              <a href="/#specs" class="footer-link">Stack</a>
              <a href="/#process" class="footer-link">Process</a>
              <RouterLink to="/contact" class="footer-link">Contact</RouterLink>
            </div>
          </div>

          <div>
            <h4 class="text-[11px] font-semibold uppercase tracking-widest text-text-dim mb-4">Connect</h4>
            <div class="flex flex-col gap-3">
              <a href="https://linkedin.com/in/inasrami" target="_blank" rel="noopener" class="footer-link">LinkedIn</a>
              <a href="https://github.com/inasrami" target="_blank" rel="noopener" class="footer-link">GitHub</a>
              <a href="mailto:inkorami27@gmail.com" class="footer-link">Email</a>
              <a href="tel:0876566094" class="footer-link">+359 876 566 094</a>
            </div>
          </div>

        </div>
      </div>

      <!-- Bottom bar -->
      <div class="h-px mb-8" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);" />
      <div class="flex flex-wrap justify-between items-center gap-4 text-[12px] text-text-dim">
        <p>© 2025 INRAIT Web Engineering · Sofia, Bulgaria. All rights reserved.</p>
        <div class="flex items-center gap-4">
          <RouterLink to="/privacy" class="transition-colors duration-200 hover:text-text-muted">Privacy Policy</RouterLink>
          <span>·</span>
          <p>Engineered with precision.</p>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.footer-link {
  font-size: 14px;
  color: var(--text-muted);
  transition: color 0.2s ease;
}
.footer-link:hover {
  color: var(--text);
}
</style>