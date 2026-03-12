<template>
  <nav class="glass-nav fixed top-0 left-0 w-full h-12 z-50 flex justify-center border-b border-white/[0.07]">
    <div class="w-full max-w-[980px] px-5 flex justify-between items-center">

      <a href="#" class="text-[17px] font-semibold tracking-[-0.01em] text-text-main no-underline">
        IN<span class="text-accent">R</span>AIT
      </a>

      <!-- Desktop links -->
      <div class="hidden md:flex gap-8">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="text-[12px] text-[#e8e8ed] opacity-70 hover:opacity-100 transition-opacity duration-200 no-underline"
        >
          {{ link.label }}
        </a>
      </div>

      <!-- Mobile burger -->
      <button
        class="md:hidden flex flex-col gap-[5px] cursor-pointer"
        @click="menuOpen = !menuOpen"
        aria-label="Toggle menu"
      >
        <span
          v-for="i in 3"
          :key="i"
          class="block w-5 h-[1.5px] bg-text-main transition-all duration-300"
        />
      </button>
    </div>

    <!-- Mobile dropdown -->
    <div
      v-if="menuOpen"
      class="absolute top-12 left-0 w-full bg-surface border-b border-border-subtle flex flex-col px-5 py-4 gap-4 md:hidden"
    >
      <a
        v-for="link in links"
        :key="link.href"
        :href="link.href"
        class="text-[14px] text-text-main opacity-80 no-underline"
        @click="menuOpen = false"
      >
        {{ link.label }}
      </a>
    </div>

  </nav>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)

const links = [
  { href: '#philosophy', label: 'Philosophy' },
  { href: '#specs',      label: 'Tech Specs'  },
  { href: '#work',       label: 'Projects'    },
  { href: '#contact',    label: 'Contact'     },
]
</script>
