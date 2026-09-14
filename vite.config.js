import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const deeplKey = env.DEEPL_API_KEY || env.VITE_DEEPL_API_KEY

  return {
    plugins: [vue()],
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