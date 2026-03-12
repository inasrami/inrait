<template>
  <div class="relative" style="height: 150vh;">
    <div class="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden">

      <h1
        ref="heroTextEl"
        class="text-gradient-white font-bold text-center will-change-transform select-none"
        :style="heroStyle"
        style="font-size: clamp(60px, 12vw, 180px); letter-spacing: -0.04em; line-height: 1;"
      >
        INRAIT.
      </h1>

      <p
        class="font-medium mt-[-10px]"
        :class="subVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
        :style="subStyle"
        style="font-size: clamp(24px, 4vw, 40px); color: #A4E04B; transition: opacity 1s ease, transform 1s ease;"
      >
        Pro Web Engineering.
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const scrollY    = ref(0)
const subVisible = ref(false)

const heroStyle = computed(() => ({
  transform: `scale(${Math.max(0.3, 1 - scrollY.value / 1000)})`,
  opacity:    Math.max(0, 1 - scrollY.value / 600),
}))

const subStyle = computed(() => ({
  opacity:   Math.max(0, 1 - scrollY.value / 600),
  transform: `translateY(${scrollY.value * 0.2}px)`,
}))

function onScroll() { scrollY.value = window.scrollY }

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  setTimeout(() => { subVisible.value = true }, 500)
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
