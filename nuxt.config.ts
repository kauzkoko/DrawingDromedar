// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['@unocss/reset/eric-meyer.css'],
  modules: ['@unocss/nuxt', '@vueuse/nuxt'],
  unocss: {
    attributify: true,
    icons: true,
  },
  experimental: {
    reactivityTransform: true,
  },
  ssr: false,
});
