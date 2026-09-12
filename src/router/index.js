import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import ProjectPage from "../pages/ProjectPage.vue";
import Contact from "../pages/Contact.vue";
import Services from "../pages/Services.vue";
import PrivacyPolicy from "../pages/PrivacyPolicy.vue";
import Blog from "../pages/Blog.vue";
import BlogPost from "../pages/BlogPost.vue";
import NotFound from "../pages/NotFound.vue";
import Admin from '../pages/Admin.vue'

const routes = [
  { path: "/", alias: ["/bg", "/bg/"], component: Home, name: "home" },
  { path: "/work/:slug", alias: "/bg/work/:slug", component: ProjectPage, name: "project" },
  { path: "/contact", alias: "/bg/contact", component: Contact, name: "contact" },
  { path: "/services", alias: "/bg/services", component: Services, name: "services" },
  { path: "/privacy", alias: "/bg/privacy", component: PrivacyPolicy, name: "privacy" },
  { path: "/blog", alias: "/bg/blog", component: Blog, name: "blog" },
  { path: "/blog/:slug", alias: "/bg/blog/:slug", component: BlogPost, name: "blog-post" },
  { path: "/:pathMatch(.*)*", component: NotFound, name: "not-found" },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: "smooth" };
    return { top: 0 };
  },
});

router.beforeEach((to) => {
  const savedLanguage = localStorage.getItem('inrait_lang')
  const isAdmin = to.path === '/admin' || to.path.startsWith('/admin/')
  const isBulgarian = to.path === '/bg' || to.path.startsWith('/bg/')

  if (savedLanguage === 'bg' && !isBulgarian && !isAdmin) {
    const path = to.path === '/' ? '' : to.path
    return `/bg${path}${to.fullPath.slice(to.path.length)}`
  }

  return true
});

export default router;
