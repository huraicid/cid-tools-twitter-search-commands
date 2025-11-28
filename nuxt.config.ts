import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  ssr: true,

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

  nitro: {
    preset: 'node-server',
  },

  router: {
    options: {
      strict: false,
    }
  },
});
