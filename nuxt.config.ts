export default defineNuxtConfig({
  ssr: true,   // ★これが超重要

  typescript: { strict: true },

  app: {
    baseURL: '/tools/cid-tools-twitter-search-commands/',
    buildAssetsDir: '_nuxt/',
  },

  nitro: {
    preset: 'node',   // nodeサーバーとしてlistenする
  },

  router: {
    options: { strict: false }
  },

  routeRules: {
    '/**': { ssr: true },
  },
})
