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
  },

  loading: { color: '#fff' },

  css: [],

  plugins: [],

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/stylelint-module'],

  modules: [
    'bootstrap-vue/nuxt',

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
        tokenType: 'bearer',
        globalToken: true,
        autoFetchUser: true,
      },
    },
  },

  build: {
    extend(config, ctx) {},
  },
}
