import { createRouter, createWebHistory } from "vue-router";

const Home = () => import('../pages/Home.vue')
const ProjectPage = () => import('../pages/ProjectPage.vue')
const Contact = () => import('../pages/Contact.vue')
const Services = () => import('../pages/Services.vue')
const Integrations = () => import('../pages/Integrations.vue')
const PrivacyPolicy = () => import('../pages/PrivacyPolicy.vue')
const Blog = () => import('../pages/Blog.vue')
const BlogPost = () => import('../pages/BlogPost.vue')
const NotFound = () => import('../pages/NotFound.vue')
const Admin = () => import('../pages/Admin.vue')

const routes = [
  { path: "/", alias: ["/bg", "/bg/"], component: Home, name: "home" },
  { path: "/work/:slug", alias: "/bg/work/:slug", component: ProjectPage, name: "project" },
  { path: "/contact", alias: "/bg/contact", component: Contact, name: "contact" },
  { path: "/services", alias: "/bg/services", component: Services, name: "services" },
  { path: "/integrations", alias: "/bg/integrations", component: Integrations, name: "integrations" },
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