<template>
  <footer class="relative overflow-hidden" style="background: #000;">

    <div class="absolute top-0 left-0 right-0 h-px" style="background: var(--border);" />

    <div class="max-w-[1080px] mx-auto px-6 pt-20 pb-10">

      <div class="flex flex-col justify-between gap-16 mb-16 md:flex-row">

        <!-- Brand column -->
        <div class="max-w-[280px]">
          <RouterLink to="/" class="font-display text-[28px] tracking-wider block mb-4">
            IN<span style="color: var(--accent)">R</span>AIT
          </RouterLink>
          <p class="text-text-muted text-[14px] leading-relaxed mb-6">
            {{ t('footer.tagline') }}
          </p>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-accent" style="box-shadow: 0 0 8px var(--accent);" />
            <span class="text-[13px] text-text-muted">{{ t('footer.available') }}</span>
          </div>
        </div>

        <!-- Links grid -->
        <div class="grid grid-cols-2 gap-10 sm:grid-cols-3">

          <div>
            <h4 class="text-[11px] font-semibold uppercase tracking-widest text-text-dim mb-4">{{ t('footer.colWork') }}</h4>
            <div class="flex flex-col gap-3">
              <RouterLink v-for="project in projects" :key="project.slug" :to="`/work/${project.slug}`" class="footer-link">
                {{ project.title }}
              </RouterLink>
            </div>
          </div>

          <div>
            <h4 class="text-[11px] font-semibold uppercase tracking-widest text-text-dim mb-4">{{ t('footer.colNav') }}</h4>
            <div class="flex flex-col gap-3">
              <RouterLink to="/services" class="footer-link">{{ t('footer.navServices') }}</RouterLink>
              <RouterLink to="/blog" class="footer-link">{{ t('footer.navBlog') }}</RouterLink>
              <a href="/#philosophy" class="footer-link">{{ t('footer.navPhilo') }}</a>
              <a href="/#specs" class="footer-link">{{ t('footer.navStack') }}</a>
              <a href="/#process" class="footer-link">{{ t('footer.navProcess') }}</a>
              <RouterLink to="/contact" class="footer-link">{{ t('footer.navContact') }}</RouterLink>
            </div>
          </div>

          <div>
            <h4 class="text-[11px] font-semibold uppercase tracking-widest text-text-dim mb-4">{{ t('footer.colConnect') }}</h4>
            <div class="flex flex-col gap-3">
              <a href="https://linkedin.com/in/inasrami" target="_blank" rel="noopener" class="footer-link">LinkedIn</a>
              <!-- <a href="https://github.com/inasrami" target="_blank" rel="noopener" class="footer-link">GitHub</a> -->
              <a href="mailto:inrait@hotmail.com" class="footer-link">Email</a>
              <a href="tel:0876566094" class="footer-link">+359 876 566 094</a>
            </div>
          </div>

        </div>
      </div>

      <!-- Bottom bar -->
      <div class="h-px mb-8" style="background: var(--border);" />
      <div class="flex flex-wrap justify-between items-center gap-4 text-[12px] text-text-dim">
        <p>{{ t('footer.copyright') }}</p>
        <div class="flex items-center gap-4">
          <RouterLink to="/privacy" class="transition-colors duration-200 hover:text-text-muted">{{ t('footer.privacy') }}</RouterLink>
          <span>·</span>
          <p>{{ t('footer.engineered') }}</p>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage.js'
import { RouterLink } from 'vue-router'

const { t } = useLanguage()

const projects = [
  { slug: 'barbers-unity',  title: 'Barbers Unity'  },
  { slug: 'shiftease',      title: 'ShiftEase'       },
  { slug: 'hotel-prestige', title: 'Hotel Prestige'  },
  { slug: 'dna-of-design',  title: 'DNA of Design'   },
  { slug: 'aurum',          title: 'Aurum'            },
]
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