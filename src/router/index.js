import { createRouter, createWebHistory } from 'vue-router'
import Home        from '../pages/Home.vue'
import ProjectPage from '../pages/ProjectPage.vue'
import Contact     from '../pages/Contact.vue'

const routes = [
  { path: '/',               component: Home,        name: 'home'    },
  { path: '/work/:slug',     component: ProjectPage, name: 'project' },
  { path: '/contact',        component: Contact,     name: 'contact' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})

export default router