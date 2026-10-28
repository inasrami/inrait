import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes, scrollBehavior, languageGuard } from './router/index.js'
import { applyStoredConsent } from './composables/useConsent.js'
import './style.css'

// vite-ssg: prerenders every public route to static HTML at build time,
// then hydrates it in the browser. Browser-only setup lives behind isClient.
export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  ({ router, isClient }) => {
    if (!isClient) return

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    router.beforeEach(languageGuard)
    applyStoredConsent()
  },
)
