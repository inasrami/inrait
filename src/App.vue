<template>
  <div style="background: var(--bg);">

    <!-- Custom cursor (hidden on mobile via CSS) -->
    <CursorEffect />

    <!-- Navigation -->
    <AppNav />

    <!-- Page content with transition -->
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="$route.fullPath" />
      </Transition>
    </RouterView>

    <!-- Footer -->
    <AppFooter />

  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import CursorEffect from './components/CursorEffect.vue'
import AppNav       from './components/AppNav.vue'
import AppFooter    from './components/AppFooter.vue'
</script>