<template>
  <div class="relative py-12 overflow-hidden" style="border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);">
    <!-- Row 1 -->
    <div class="mb-3 marquee-track">
      <div v-for="n in 6" :key="`a${n}`" class="flex items-center flex-shrink-0 gap-6 mr-6">
        <span
          v-for="item in row1"
          :key="`a${n}${item}`"
          class="flex items-center gap-3 px-5 py-2 rounded-full text-[13px] font-medium tracking-wide"
          style="border: 1px solid var(--border); color: var(--text-muted); white-space: nowrap; background: rgba(255,255,255,0.02);"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
          {{ item }}
        </span>
      </div>
    </div>
    <!-- Row 2 reverse -->
    <div class="marquee-track-reverse">
      <div v-for="n in 6" :key="`b${n}`" class="flex items-center flex-shrink-0 gap-6 mr-6">
        <span
          v-for="item in row2"
          :key="`b${n}${item}`"
          class="flex items-center gap-3 px-5 py-2 rounded-full text-[13px] font-medium tracking-wide"
          style="border: 1px solid var(--border); color: var(--text-muted); white-space: nowrap; background: rgba(255,255,255,0.02);"
        >
          <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background: rgba(164,224,75,0.5);" />
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const row1 = ['Vue.js 3', 'Tailwind CSS', 'JavaScript ES6+', 'MongoDB', 'Responsive Design', 'Git & GitHub', 'CSS Grid', 'Performance Optimization']
const row2 = ['UX Engineering', 'Component Architecture', 'REST APIs', 'Adobe Suite', 'Photography', 'SEO-Ready Markup', 'Dark UI Design', 'Vite Build System']
</script>