import tailwindcss from "@tailwindcss/vite";

// nuxt.config.ts
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  app: {
    baseURL: '/tools/cid-tools-twitter-search-commands/',
    head: {
      title: 'huraicid - Twitter Search Commands',
    },
  },
  css: ['@/assets/css/main.css'],
  modules: ['@nuxt/ui'],
  vite: {
    plugins: [tailwindcss()],
  },
})
