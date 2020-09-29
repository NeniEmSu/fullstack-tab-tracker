const axios = require('axios')
require('dotenv').config()

module.exports = {
  head: {
    title: 'Tab Tracker' || process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Music tabs tracker for fullstack apps' ||
          process.env.npm_package_description,
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  loading: { color: '#fff' },

  css: ['sweetalert2/dist/sweetalert2.min.css'],

  plugins: ['~/plugins/bootstrap-vue-icon'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

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

  generate: {
    routes() {
      const songRoute = axios
        .get(`${process.env.BASE_URL}/api/song`)
        .then((res) => {
          return res.data.songs.map((song) => {
            return `/song/${song.title_slug}/${song._id}`
          })
        })
      return Promise.all([songRoute]).then((values) => {
        return values.join().split(',')
      })
    },
  },

  build: {
    extend(config, ctx) {},
  },
}
