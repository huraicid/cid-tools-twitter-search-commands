export default defineNuxtConfig({
  ssr: true,

  app: {
    baseURL: '/tools/cid-tools-twitter-search-commands/',
    buildAssetsDir: '_nuxt/',
  },

  nitro: {
    // ★ここを 'node' ではなく 'node-server' にする
    preset: 'node-server',
    serveStatic: true,
  },

  router: { options: { strict: false } },
})
