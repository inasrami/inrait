import { createRouter, createWebHistory } from 'vue-router'
import Home          from '../pages/Home.vue'
import ProjectPage   from '../pages/ProjectPage.vue'
import Contact       from '../pages/Contact.vue'
import Services      from '../pages/Services.vue'
import PrivacyPolicy from '../pages/PrivacyPolicy.vue'
import Blog          from '../pages/Blog.vue'
import BlogPost      from '../pages/BlogPost.vue'
import NotFound      from '../pages/NotFound.vue'

const routes = [
  { path: '/',               component: Home,          name: 'home'     },
  { path: '/work/:slug',     component: ProjectPage,   name: 'project'  },
  { path: '/contact',        component: Contact,       name: 'contact'  },
  { path: '/services',       component: Services,      name: 'services' },
  { path: '/privacy',        component: PrivacyPolicy, name: 'privacy'  },
  { path: '/blog',           component: Blog,          name: 'blog'     },
  { path: '/blog/:slug',     component: BlogPost,      name: 'blog-post'},
  { path: '/:pathMatch(.*)*',component: NotFound,      name: 'not-found'},
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