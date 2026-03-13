<template>
  <section class="relative px-6 py-24" style="background: var(--surface);">
    <div class="absolute top-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);" />
    <div class="absolute bottom-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);" />

    <div class="max-w-[1080px] mx-auto">
      <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="text-center fade-up"
          :style="`transition-delay: ${i * 0.1}s`"
        >
          <div class="mb-2 stat-number">{{ stat.value }}</div>
          <div class="text-text-muted text-[13px] uppercase tracking-widest">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useFadeUp } from '../composables/useFadeUp'
useFadeUp()

const stats = [
  { value: '5+',   label: 'Projects Shipped' },
  { value: '3+',   label: 'Years of Craft'   },
  { value: '100%', label: 'Custom Built'      },
  { value: '∞',    label: 'Pixel Precision'  },
]
</script>