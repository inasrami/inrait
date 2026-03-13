<template>
  <nav
    class="fixed top-0 left-0 z-50 w-full glass-nav"
    :class="scrolled ? 'h-14' : 'h-16'"
    style="transition: height 0.3s ease;"
  >
    <div class="max-w-[1080px] mx-auto h-full px-6 flex items-center justify-between">

      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2 select-none">
        <span class="font-display text-[22px] tracking-wider text-text-main">
          IN<span style="color: var(--accent)">R</span>AIT
        </span>
      </RouterLink>

      <!-- Desktop nav -->
      <div class="items-center hidden gap-8 md:flex">
        <RouterLink to="/" class="nav-link">Work</RouterLink>
        <a href="/#services" class="nav-link" @click.prevent="scrollTo('services')">Services</a>
        <a href="/#about" class="nav-link" @click.prevent="scrollTo('about')">About</a>
        <a href="/#specs" class="nav-link" @click.prevent="scrollTo('specs')">Stack</a>
        <a href="/#process" class="nav-link" @click.prevent="scrollTo('process')">Process</a>
        <RouterLink to="/contact" class="btn-primary text-[13px] py-[10px] px-5">
          Let's Talk
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </RouterLink>
      </div>

      <!-- Mobile burger -->
      <button
        class="md:hidden flex flex-col gap-[5px] p-2"
        style="cursor: none;"
        @click="mobileOpen = !mobileOpen"
        aria-label="Toggle menu"
      >
        <span
          class="block w-5 h-[1.5px] bg-text-main transition-all duration-300 origin-center"
          :style="mobileOpen ? 'transform: rotate(45deg) translate(5px, 5px)' : ''"
        />
        <span
          class="block w-5 h-[1.5px] bg-text-main transition-all duration-300"
          :style="mobileOpen ? 'opacity:0' : ''"
        />
        <span
          class="block w-5 h-[1.5px] bg-text-main transition-all duration-300 origin-center"
          :style="mobileOpen ? 'transform: rotate(-45deg) translate(5px, -5px)' : ''"
        />
      </button>
    </div>
  </nav>

  <!-- Mobile fullscreen overlay -->
  <Teleport to="body">
    <Transition name="mobile-menu">
      <div v-if="mobileOpen" class="mobile-menu" @click.self="mobileOpen = false">
        <div class="flex flex-col items-center gap-10 text-center">
          <RouterLink to="/" class="text-5xl font-display" @click="mobileOpen = false">Work</RouterLink>
          <a href="/#philosophy" class="text-5xl font-display" @click="mobileOpen = false; scrollTo('philosophy')">Philosophy</a>
          <a href="/#specs" class="text-5xl font-display" @click="mobileOpen = false; scrollTo('specs')">Stack</a>
          <RouterLink to="/contact" class="px-8 py-4 mt-4 text-lg btn-primary" @click="mobileOpen = false">Let's Talk</RouterLink>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const router     = useRouter()
const mobileOpen = ref(false)
const scrolled   = ref(false)

function scrollTo(id) {
  mobileOpen.value = false
  if (window.location.pathname !== '/') {
    router.push('/').then(() => {
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300)
    })
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}

function onScroll() {
  scrolled.value = window.scrollY > 40
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.35s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}
</style>