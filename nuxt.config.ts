// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
  ],

  runtimeConfig: {
    // Server-only (private) — never exposed to client
    jellyfinApiKey: process.env.JELLYFIN_API_KEY || '',
    jellyfinUrl: process.env.JELLYFIN_URL || 'http://localhost:8096',

    // Public (exposed to client via useRuntimeConfig().public)
    public: {
      jellyfinUrl: process.env.NUXT_PUBLIC_JELLYFIN_URL || process.env.JELLYFIN_URL || 'http://localhost:8096',
    },
  },

  css: ['~/assets/css/main.css'],

  nitro: {
    // Allow server routes to proxy to Jellyfin backend
  },
})
