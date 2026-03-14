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

      <!-- Desktop nav -->
      <div class="items-center hidden gap-6 md:flex">

        <!-- Scroll-anchor links (home page only) -->
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`/#${link.id}`"
          class="nav-link"
          :class="{ 'nav-link--active': activeSection === link.id }"
          @click.prevent="scrollToSection(link.id)"
        >
          {{ t(link.labelKey) }}
        </a>

        <!-- Page links -->
        <RouterLink to="/services" class="nav-link" active-class="nav-link--active">
          {{ t('nav.services') }}
        </RouterLink>

        <RouterLink to="/blog" class="nav-link blog-link" active-class="nav-link--active">
          {{ t('nav.blog') }}
        </RouterLink>

        <!-- Divider -->
        <span class="nav-divider" />

        <!-- Language toggle — more visible -->
        <button class="lang-btn" @click="toggleLang" style="cursor:none;"
          :aria-label="`Switch to ${isBG ? 'English' : 'Bulgarian'}`">
          <span class="lang-flag">{{ isBG ? '🇧🇬' : '🇬🇧' }}</span>
          <span class="lang-code">{{ isBG ? 'BG' : 'EN' }}</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>

        <RouterLink to="/contact" class="btn-primary text-[13px] py-[10px] px-5">
          {{ t('nav.letsTalk') }}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </RouterLink>
      </div>

      <!-- Mobile right: lang + burger -->
      <div class="flex items-center gap-3 md:hidden">
        <button class="lang-btn" @click="toggleLang" style="cursor:none;">
          <span class="lang-flag">{{ isBG ? '🇧🇬' : '🇬🇧' }}</span>
          <span class="lang-code">{{ isBG ? 'BG' : 'EN' }}</span>
        </button>
        <button class="flex flex-col gap-[5px] p-2" style="cursor:none;"
          @click="mobileOpen = !mobileOpen" aria-label="Toggle menu">
          <span class="block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center"
            :style="mobileOpen ? 'transform: rotate(45deg) translate(5px, 5px)' : ''" />
          <span class="block w-5 h-[1.5px] bg-white transition-all duration-300"
            :style="mobileOpen ? 'opacity: 0' : ''" />
          <span class="block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center"
            :style="mobileOpen ? 'transform: rotate(-45deg) translate(5px, -5px)' : ''" />
        </button>
      </div>

    </div>
  </nav>

  <!-- Mobile overlay -->
  <Teleport to="body">
    <Transition name="mobile-menu">
      <div v-if="mobileOpen" class="mobile-menu" @click.self="mobileOpen = false">
        <div class="flex flex-col items-center gap-8 text-center">
          <a
            v-for="link in navLinks"
            :key="link.id"
            :href="`/#${link.id}`"
            class="font-display text-[52px] mobile-nav-item"
            :class="{ 'mobile-nav-item--active': activeSection === link.id }"
            @click.prevent="scrollToSection(link.id); mobileOpen = false"
          >
            {{ t(link.labelKey) }}
          </a>
          <RouterLink to="/services" class="font-display text-[52px] mobile-nav-item"
            :class="{ 'mobile-nav-item--active': route.path === '/services' }"
            @click="mobileOpen = false">
            {{ t('nav.services') }}
          </RouterLink>
          <RouterLink to="/blog" class="font-display text-[52px] mobile-nav-item"
            :class="{ 'mobile-nav-item--active': route.path.startsWith('/blog') }"
            @click="mobileOpen = false">
            {{ t('nav.blog') }}
          </RouterLink>
          <RouterLink to="/contact" class="px-8 py-4 mt-2 text-base btn-primary"
            @click="mobileOpen = false">
            {{ t('nav.letsTalk') }}
          </RouterLink>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { useLanguage } from '../composables/useLanguage.js'

const router        = useRouter()
const route         = useRoute()
const mobileOpen    = ref(false)
const scrolled      = ref(false)
const activeSection = ref('')

const { t, toggleLang, isEN, isBG } = useLanguage()

const navLinks = [
  { id: 'work',    labelKey: 'nav.work'    },
  { id: 'about',   labelKey: 'nav.about'   },
  { id: 'process', labelKey: 'nav.process' },
]

function onScroll() { scrolled.value = window.scrollY > 40 }

let observers = []
function initObservers() {
  observers.forEach(o => o.disconnect())
  observers = []
  navLinks.forEach(({ id }) => {
    const el = document.getElementById(id)
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) activeSection.value = id },
      { rootMargin: '-15% 0px -45% 0px', threshold: 0 }
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

function scrollToSection(id) {
  mobileOpen.value = false
  if (route.path !== '/') {
    router.push('/').then(() => {
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 350)
    })
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}

function handleLogoClick() {
  if (route.path === '/') window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  if (route.path === '/') initObservers()
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  destroyObservers()
})
watch(() => route.path, (path) => {
  if (path === '/') setTimeout(initObservers, 400)
  else destroyObservers()
})
</script>

<style scoped>
.nav-link--active { color: var(--text) !important; }
.nav-link--active::after { width: 100% !important; }

/* Blog link gets a subtle accent dot to make it stand out */
.blog-link { position: relative; }
.blog-link::before {
  content: '';
  position: absolute;
  top: -2px;
  right: -6px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.7;
}

/* Divider between links and lang/cta */
.nav-divider {
  width: 1px;
  height: 18px;
  background: var(--border-strong);
}

/* Language button — more prominent */
.lang-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 100px;
  border: 1px solid var(--border-strong);
  background: rgba(255,255,255,0.04);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  cursor: none;
}

.lang-btn:hover {
  color: var(--text);
  border-color: rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.07);
}

.lang-flag { font-size: 14px; line-height: 1; }
.lang-code { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; }

/* Mobile nav */
.mobile-nav-item {
  color: rgba(255,255,255,0.35);
  letter-spacing: 0.02em;
  transition: color 0.2s ease;
  cursor: none;
}
.mobile-nav-item:hover { color: rgba(255,255,255,0.75); }
.mobile-nav-item--active { color: #fff; }

.mobile-menu-enter-active, .mobile-menu-leave-active { transition: opacity 0.3s ease; }
.mobile-menu-enter-from, .mobile-menu-leave-to { opacity: 0; }
</style>