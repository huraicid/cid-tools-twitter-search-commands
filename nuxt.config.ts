import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  ssr: true,

  typescript: {
    strict: true,
  },

  app: {
    // SSR のルートは常に /
    // サブパス対応は Nginx の location で行う
    buildAssetsDir: '/tools/cid-tools-twitter-search-commands/_nuxt/',

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
  },

  router: {
    options: {
      strict: false,
    }
  },
});
