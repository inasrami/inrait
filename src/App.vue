<template>
  <div style="background: var(--bg);">
    <SiteLoader />
    <ScrollProgress />
    <AppNav />

    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="$route.fullPath" />
      </Transition>
    </RouterView>

    <AppFooter />
    <CookieBanner />
    <WhatsAppButton />
  </div>
</template>

<script setup>
import { watch } from 'vue'
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
const { setLang } = useLanguage()

useScrollScenes()

watch(() => route.path, (path) => {
  setLang(path === '/bg' || path.startsWith('/bg/') ? 'bg' : 'en')
}, { immediate: true })
</script>