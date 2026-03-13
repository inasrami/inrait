<template>
  <section class="relative px-6 py-20 overflow-hidden">
    <div class="max-w-[1080px] mx-auto">

      <p class="text-center text-[11px] uppercase tracking-widest text-text-dim mb-12 fade-up">
        Trusted by businesses across Bulgaria and Europe
      </p>

      <div class="logos-grid fade-up" style="transition-delay:0.1s;">
        <div
          v-for="client in clients"
          :key="client.name"
          class="logo-cell"
          :title="client.name"
        >
          <!--
            To use a real logo image, add an `image` field to the client object below:
              { name: 'Hotel Prestige', image: '/images/logos/hotel-prestige.svg' }
            Then replace the wordmark span with:
              <img :src="client.image" :alt="client.name" class="logo-img" />
          -->
          <span class="logo-wordmark">{{ client.name }}</span>
        </div>
      </div>

      <p class="text-center text-[12px] text-text-dim mt-8 fade-up" style="transition-delay:0.2s;">
        Your brand here?
        <RouterLink to="/contact" class="text-accent underline-offset-2 hover:underline" style="cursor:none;">Let's talk.</RouterLink>
      </p>

    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useFadeUp } from '../composables/useFadeUp'
useFadeUp()

// Replace with real client names/logos
const clients = [
  { name: 'Barbers Unity' },
  { name: 'Hotel Prestige' },
  { name: 'ShiftEase' },
  { name: 'Client Name' },
  { name: 'Client Name' },
]
</script>

<style scoped>
.logos-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
}

@media (min-width: 640px) {
  .logos-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 768px) {
  .logos-grid { grid-template-columns: repeat(5, 1fr); }
}

.logo-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  background: var(--surface);
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  transition: background 0.25s ease;
}

.logo-cell:hover { background: rgba(255,255,255,0.025); }

.logo-wordmark {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-dim);
  text-align: center;
  transition: color 0.25s ease;
}

.logo-cell:hover .logo-wordmark { color: var(--text-muted); }

/* For actual logo images */
.logo-img {
  max-height: 26px;
  max-width: 96px;
  object-fit: contain;
  filter: grayscale(1) brightness(0.45);
  transition: filter 0.25s ease;
}

.logo-cell:hover .logo-img { filter: grayscale(0.2) brightness(0.75); }
</style>