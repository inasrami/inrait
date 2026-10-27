import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

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
        const { projects } = await import('./src/data/Projects.js')
        const { posts } = await import('./src/data/posts.js')

        const english = [
          '/',
          '/services',
          '/integrations',
          '/contact',
          '/privacy',
          '/blog',
          ...projects.map((p) => `/work/${p.slug}`),
          ...posts.map((p) => `/blog/${p.slug}`),
        ]
        const bulgarian = english.map((path) => (path === '/' ? '/bg' : `/bg${path}`))

        // /404 renders the NotFound page to dist/404/index.html (nginx serves it with a real 404 status)
        return [...english, ...bulgarian, '/404']
      },
      onBeforePageRender(route, indexHTML) {
        if (!spaShell) spaShell = indexHTML
        return indexHTML
      },
      onFinished() {
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