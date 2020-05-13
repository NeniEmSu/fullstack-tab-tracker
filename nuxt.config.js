module.exports = {
  mode: 'universal',

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://kit.fontawesome.com/41fc25a21c.js',
      },
    ],
  },

  loading: { color: '#fff' },

  css: ['sweetalert2/dist/sweetalert2.min.css'],

  plugins: [],

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/moment',
  ],

  modules: [
    'bootstrap-vue/nuxt',
    'vue-sweetalert2/nuxt',

    '@nuxtjs/axios',
    '@nuxtjs/pwa',

    '@nuxtjs/dotenv',
    '@nuxtjs/auth',
  ],

  axios: {},

  auth: {
    redirect: {
      callback: '/callback',
      logout: '/signed-out',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/auth/login',
            method: 'post',
            propertyName: 'token',
          },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: {
            url: '/api/auth/user',
            method: 'get',
            propertyName: 'user',
          },
        },
        tokenRequired: true,
        tokenType: '',
        globalToken: true,
        autoFetchUser: true,
      },
    },
  },

  build: {
    extend(config, ctx) {},
  },
}
