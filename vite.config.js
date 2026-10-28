import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const SITE_URL = 'https://inrait.com'

// Every public page, English paths only, with an optional lastmod for blog posts.
// Used for BOTH prerendering and the sitemap, so they can never drift apart.
async function getPublicPages() {
  const { projects } = await import('./src/data/Projects.js')
  const { posts } = await import('./src/data/posts.js')
  return [
    { path: '/' },
    { path: '/services' },
    { path: '/integrations' },
    { path: '/contact' },
    { path: '/privacy' },
    { path: '/blog' },
    ...projects.map((p) => ({ path: `/work/${p.slug}` })),
    ...posts.map((p) => ({ path: `/blog/${p.slug}`, lastmod: p.date })),
  ]
}

const bgPath = (path) => (path === '/' ? '/bg' : `/bg${path}`)

function buildSitemap(pages) {
  const alternates = (path) => [
    `    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${path === '/' ? '/' : path}" />`,
    `    <xhtml:link rel="alternate" hreflang="bg" href="${SITE_URL}${bgPath(path)}" />`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${path === '/' ? '/' : path}" />`,
  ].join('\n')

  const entry = (loc, page) =>
    `  <url>\n    <loc>${SITE_URL}${loc}</loc>\n${alternates(page.path)}\n` +
    (page.lastmod ? `    <lastmod>${page.lastmod}</lastmod>\n` : '') +
    `  </url>`

  const urls = pages.flatMap((page) => [entry(page.path, page), entry(bgPath(page.path), page)])
  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    urls.join('\n') + `\n</urlset>\n`
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const deeplKey = env.DEEPL_API_KEY || env.VITE_DEEPL_API_KEY

  // Unrendered copy of the built index.html, kept for the client-only /admin pages.
  let spaShell = ''

  return {
    plugins: [vue()],

    // Prerender (vite-ssg): every public page becomes real HTML at build time.
    ssgOptions: {
      dirStyle: 'nested',   // /services -> dist/services/index.html
      concurrency: 1,       // the language store is a shared singleton; render one route at a time
      async includedRoutes() {
        const pages = (await getPublicPages()).map((page) => page.path)
        // /404 renders the NotFound page to dist/404/index.html (nginx serves it with a real 404 status)
        return [...pages, ...pages.map(bgPath), '/404']
      },
      onBeforePageRender(route, indexHTML) {
        if (!spaShell) spaShell = indexHTML
        return indexHTML
      },
      async onFinished() {
        // dist/sitemap.xml: generated from the same route list that was just prerendered
        writeFileSync(join('dist', 'sitemap.xml'), buildSitemap(await getPublicPages()))

        // dist/spa.html: the plain app shell, used for /admin (never prerendered, never indexed)
        mkdirSync('dist', { recursive: true })
        writeFileSync(join('dist', 'spa.html'), spaShell)
      },
    },

    server: {
      proxy: {
        '/api/translate': {
          target: 'https://api-free.deepl.com',
          changeOrigin: true,
          rewrite: () => '/v2/translate',
          configure: (proxy) => {
            proxy.on('proxyReq', (request) => {
              request.setHeader('Authorization', `DeepL-Auth-Key ${deeplKey}`)
            })
          },
        },
      },
    },
  }
})