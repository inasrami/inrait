<template>
  <section id="specs" class="py-40 container mx-auto px-5 max-w-[1080px]">

    <h2 class="fade-up text-[56px] font-semibold text-center mb-20" style="letter-spacing: -0.01em;">
      Tech Specs.
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="(card, i) in specs"
        :key="card.title"
        class="fade-up bg-surface rounded-3xl border border-[#333336] hover:border-accent hover:-translate-y-[5px] transition-all duration-300"
        style="padding: 40px 32px;"
        :style="{ transitionDelay: `${i * 100}ms` }"
      >
        <div class="text-[32px] text-accent mb-6">{{ card.icon }}</div>
        <h3 class="text-[24px] font-semibold mb-4 text-text-main">{{ card.title }}</h3>
        <ul class="list-none">
          <li v-for="item in card.items" :key="item" class="text-[17px] text-text-muted leading-[1.8]">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

  </section>
</template>

<script setup>
import { useFadeUp } from '../composables/useFadeUp'
useFadeUp()

const specs = [
  { icon: '⚡', title: 'Core Languages',   items: ['JavaScript (ES6+)', 'HTML5 Architecture', 'CSS3 Styling', 'Modern DOM Manipulation'] },
  { icon: '⚛️', title: 'Frameworks & UI',  items: ['Vue.js / Vue 3', 'Tailwind CSS', 'Responsive Design', 'CSS Grid & Flexbox'] },
  { icon: '🛠️', title: 'Systems & APIs',   items: ['Git & GitHub', 'Postman API Testing', 'MongoDB Integration', 'SheetJS Data Parsing'] },
  { icon: '🎨', title: 'Visual Media',     items: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe Lightroom', 'Pro Video Editing'] },
]
</script>
