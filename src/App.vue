<template>
  <div style="background: var(--bg);">
    <SiteLoader />
    <CursorEffect />
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
import { RouterView } from 'vue-router'
import SiteLoader     from './components/SiteLoader.vue'
import CursorEffect   from './components/CursorEffect.vue'
import AppNav         from './components/AppNav.vue'
import AppFooter      from './components/AppFooter.vue'
import CookieBanner   from './components/CookieBanner.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'
</script>