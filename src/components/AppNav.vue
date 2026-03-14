<template>
  <nav
    class="fixed top-0 left-0 z-50 w-full glass-nav"
    :class="scrolled ? 'h-14' : 'h-16'"
    style="transition: height 0.3s ease;"
  >
    <div class="max-w-[1080px] mx-auto h-full px-6 flex items-center justify-between">

      <!-- Logo -->
      <RouterLink to="/" class="flex items-center select-none" @click="handleLogoClick">
        <img src="/images/WhiteLogo.webp" alt="INRAIT" class="w-10 h-10" />
      </RouterLink>

      <!-- Desktop nav — order mirrors Home.vue section order -->
      <div class="items-center hidden md:flex gap-7">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`/#${link.id}`"
          class="nav-link"
          :class="{ 'nav-link--active': activeSection === link.id }"
          @click.prevent="scrollToSection(link.id)"
        >
          {{ link.label }}
        </a>
        <RouterLink to="/services" class="nav-link" active-class="nav-link--active">Services</RouterLink>

        <RouterLink to="/contact" class="btn-primary text-[13px] py-[10px] px-5">
          Let's Talk
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
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
          class="block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center"
          :style="mobileOpen ? 'transform: rotate(45deg) translate(5px, 5px)' : ''"
        />
        <span
          class="block w-5 h-[1.5px] bg-white transition-all duration-300"
          :style="mobileOpen ? 'opacity: 0' : ''"
        />
        <span
          class="block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center"
          :style="mobileOpen ? 'transform: rotate(-45deg) translate(5px, -5px)' : ''"
        />
      </button>

    </div>
  </nav>

  <!-- Mobile fullscreen overlay -->
  <Teleport to="body">
    <Transition name="mobile-menu">
      <div v-if="mobileOpen" class="mobile-menu" @click.self="mobileOpen = false">
        <div class="flex flex-col items-center text-center gap-9">
          <a
            v-for="link in navLinks"
            :key="link.id"
            :href="`/#${link.id}`"
            class="font-display text-[52px] mobile-nav-item"
            :class="{ 'mobile-nav-item--active': activeSection === link.id }"
            @click.prevent="scrollToSection(link.id); mobileOpen = false"
          >
            {{ link.label }}
          </a>
          <RouterLink
            to="/services"
            class="font-display text-[52px] mobile-nav-item"
            :class="{ 'mobile-nav-item--active': route.path === '/services' }"
            @click="mobileOpen = false"
          >
            Services
          </RouterLink>
          <RouterLink
            to="/contact"
            class="px-8 py-4 mt-2 text-base btn-primary"
            @click="mobileOpen = false"
          >
            Let's Talk
          </RouterLink>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'

const router        = useRouter()
const route         = useRoute()
const mobileOpen    = ref(false)
const scrolled      = ref(false)
const activeSection = ref('')

/**
 * Nav links — ORDER MUST MATCH the visual top-to-bottom order of sections
 * in Home.vue so IntersectionObserver fires in the right sequence.
 *
 * Home.vue order:
 *   HeroSection (no nav)
 *   SkillsStrip (no nav)
 *   PhilosophySection (no nav)
 *   StatsStrip (no nav)
 *   ServicesSection  → #services
 *   ClientLogos (no nav)
 *   ProjectsSection  → #work
 *   AboutSection     → #about
 *   TechSpecs        → #specs
 *   TestimonialsSection (no nav)
 *   ProcessSection   → #process
 *   CtaSection (no nav)
 */
const navLinks = [
  { id: 'work',     label: 'Work'    },
  { id: 'about',   label: 'About'   },
  { id: 'specs',   label: 'Stack'   },
  { id: 'process', label: 'Process' },
]

// ─── Scroll shrink ────────────────────────────────────────
function onScroll() {
  scrolled.value = window.scrollY > 40
}

// ─── IntersectionObserver active section ─────────────────
let observers = []

function initObservers() {
  observers.forEach(o => o.disconnect())
  observers = []

  navLinks.forEach(({ id }) => {
    const el = document.getElementById(id)
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activeSection.value = id
        }
      },
      {
        // Detection band: ignore bottom 45% and top 15% of viewport.
        // Active fires when a section occupies the middle 40% band.
        rootMargin: '-15% 0px -45% 0px',
        threshold: 0,
      }
    )

    observer.observe(el)
    observers.push(observer)
  })
}

function destroyObservers() {
  observers.forEach(o => o.disconnect())
  observers = []
  activeSection.value = ''
}

// ─── Scroll-to helper ─────────────────────────────────────
function scrollToSection(id) {
  mobileOpen.value = false

  if (route.path !== '/') {
    router.push('/').then(() => {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 350)
    })
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}

function handleLogoClick() {
  if (route.path === '/') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// ─── Lifecycle ────────────────────────────────────────────
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  if (route.path === '/') initObservers()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  destroyObservers()
})

// Re-init after route change (e.g. returning from /contact or /work/:slug)
watch(
  () => route.path,
  (path) => {
    if (path === '/') {
      setTimeout(initObservers, 400)
    } else {
      destroyObservers()
    }
  }
)
</script>

<style scoped>
/* JS-driven active state — same visual as hover/router-link-active in global CSS */
.nav-link--active {
  color: var(--text) !important;
}

.nav-link--active::after {
  width: 100% !important;
}

/* Mobile nav items */
.mobile-nav-item {
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 0.02em;
  transition: color 0.2s ease;
  cursor: none;
}

.mobile-nav-item:hover {
  color: rgba(255, 255, 255, 0.75);
}

.mobile-nav-item--active {
  color: #fff;
}

/* Transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}
</style>