<template>
  <div style="background: var(--bg);">
    <SiteLoader />
    <ScrollProgress v-if="!isAdminRoute" />
    <AppNav v-if="!isAdminRoute" />

    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="$route.fullPath" />
      </Transition>
    </RouterView>

    <AppFooter v-if="!isAdminRoute" />
    <CookieBanner v-if="!isAdminRoute" />
    <WhatsAppButton v-if="!isAdminRoute" />
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useLanguage } from './composables/useLanguage.js'
import SiteLoader     from './components/SiteLoader.vue'
import AppNav         from './components/AppNav.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import AppFooter      from './components/AppFooter.vue'
import CookieBanner   from './components/CookieBanner.vue'
import WhatsAppButton from './components/WhatsappButton.vue'
import { useScrollScenes } from './composables/useScrollScenes.js'

const route = useRoute()
// Back-office pages are full screen - no public nav, footer, cookie banner or chat button
const isAdminRoute = computed(() => route.path === '/admin' || route.path.startsWith('/admin/'))
const { setLang } = useLanguage()

useScrollScenes()

watch(() => route.path, (path) => {
  setLang(path === '/bg' || path.startsWith('/bg/') ? 'bg' : 'en')
}, { immediate: true })
</script>