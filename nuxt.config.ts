export default defineNuxtConfig({
  ssr: true,

  app: {
    baseURL: '/tools/cid-tools-twitter-search-commands/',
    buildAssetsDir: '_nuxt/',
  },

  nitro: {
    preset: 'node',
    serveStatic: true,
  },

  router: { options: { strict: false } },
})
