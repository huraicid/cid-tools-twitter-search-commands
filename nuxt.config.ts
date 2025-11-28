import tailwindcss from "@tailwindcss/vite";

// nuxt.config.ts
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  app: {
    baseURL: '/tools/cid-tools-twitter-search-commands/',
    buildAssetsDir: 'assets',
    head: {
      title: 'huraicid - Twitter Search Commands',
    },
  },
  css: ['@/assets/css/main.css'],
  modules: ['@nuxt/ui'],
  vite: {
    plugins: [tailwindcss()],
  },
  nitro: {
    preset: 'node',
    routeRules: {
      '/tools/cid-tools-twitter-search-commands/**': { prerender: false }
    }
  },
  router: {
    options: {
      strict: false,  // ★これが無いと302になる
    }
  },
  routeRules: {
    // Nitro が /tools/... 配下で正しく動作するようにする
    '/tools/cid-tools-twitter-search-commands/**': { proxy: '' }
  },
})
