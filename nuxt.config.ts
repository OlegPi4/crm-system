// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // pages: false,
  devtools: { enabled: false },
  modules: [
    '@nuxt/ui',
    "@nuxt/image",
    // '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    // 'nuxt-icon',
    '@pinia/nuxt',
    ['@vee-validate/nuxt',
      {
        autoImports: true,
      },
    ],
    ['@nuxtjs/google-fonts', {
      families: {
        Lato: {
          wght: [300, 400, 700],
          ital: [300]
        },
      },
    },
    ],
  ],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  pinia: {
    storesDirs: ['./store/**'],
  }
})