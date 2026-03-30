export default defineNuxtConfig({
  ssr: true,

  app: {
    buildAssetsDir: '_nuxt/',
  },

  nitro: {
    serveStatic: true,
    prerender: {
      crawlLinks: false
    }
  },

  router: { options: { strict: false } },

  modules: ['@nuxt/ui'],
  css: ['@/assets/css/main.css'],
})