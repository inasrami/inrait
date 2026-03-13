<template>
  <section class="py-20 px-6 relative overflow-hidden">

    <div class="max-w-[1080px] mx-auto">

      <p class="text-center text-[12px] uppercase tracking-widest text-text-dim mb-12 fade-up">
        Trusted by businesses across Bulgaria &amp; Europe
      </p>

      <!-- Logo grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px fade-up" style="border: 1px solid var(--border); border-radius: 16px; overflow: hidden; transition-delay: 0.1s;">
        <div
          v-for="client in clients"
          :key="client.name"
          class="logo-cell"
          :title="client.name"
        >
          <!-- If you have an actual logo image, swap the text below for an <img> -->
          <span class="logo-wordmark">{{ client.name }}</span>
        </div>
      </div>

      <p class="text-center text-[12px] text-text-dim mt-8 fade-up" style="transition-delay: 0.2s;">
        Your logo here? <RouterLink to="/contact" class="text-accent hover:underline" style="cursor:none;">Let's talk.</RouterLink>
      </p>

    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useFadeUp } from '../composables/useFadeUp'

useFadeUp()

// Replace these with your real clients.
// To use a logo image instead of text, add an `image: '/images/client-x.svg'` field
// and swap the wordmark span for: <img :src="client.image" :alt="client.name" class="logo-img" />
const clients = [
  { name: 'Barbers Unity' },
  { name: 'Hotel Prestige' },
  { name: 'ShiftEase' },
  { name: 'Client Name'  },
  { name: 'Client Name'  },
]
</script>

<style scoped>
.logo-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
  background: var(--surface);
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  transition: background 0.25s ease;
}

.logo-cell:hover {
  background: rgba(255,255,255,0.03);
}

.logo-wordmark {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-dim);
  transition: color 0.25s ease;
  text-align: center;
}

.logo-cell:hover .logo-wordmark {
  color: var(--text-muted);
}

/* If using actual logo images */
.logo-img {
  max-height: 28px;
  max-width: 100px;
  object-fit: contain;
  filter: grayscale(1) brightness(0.5);
  transition: filter 0.25s ease;
}

.logo-cell:hover .logo-img {
  filter: grayscale(0.3) brightness(0.8);
}
</style>