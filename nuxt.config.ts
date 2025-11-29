export default defineNuxtConfig({
  ssr: true,

  app: {
    baseURL: '/tools/cid-tools-twitter-search-commands/',
    buildAssetsDir: '/tools/cid-tools-twitter-search-commands/_nuxt/',
  },

  nitro: {
    // ★ここを 'node' ではなく 'node-server' にする
    preset: 'node-server',
    serveStatic: true,
    prerender: {
      crawlLinks: false
    }
  },

  router: { options: { strict: false } },

  modules: ['@nuxt/ui'],
  css: ['@/assets/css/main.css'],
})
