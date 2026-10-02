import { createApp } from 'vue'
import App    from './App.vue'
import router from './router/index.js'
import './style.css'

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

createApp(App).use(router).mount('#app')