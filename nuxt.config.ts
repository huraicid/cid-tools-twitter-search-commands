export default defineNuxtConfig({
  typescript: { strict: true },

  app: {
    baseURL: '/tools/cid-tools-twitter-search-commands/',
    buildAssetsDir: '_nuxt/',   // ★絶対パスを使わない
  },

  nitro: {
    preset: 'node'
  },

  router: {
    options: { strict: false }
  },

  routeRules: {
    '/**': { ssr: true },
  },
})
