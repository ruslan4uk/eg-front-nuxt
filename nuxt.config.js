import pkg from './package'

export default {
  debug: false,
  
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { 
    color: '#2185d0',
    height: '5px',
  },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/sass/style.sass',
    //{ src: '~assets/sass/style.sass', lang: 'sass' },
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/mixins/validation',
    '@/plugins/mixins/user',
    '@/plugins/axios',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
  ],

  /**
   * Auth
   */
  auth: {
    plugins: [
      '~/plugins/axios'
    ],
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          user: { url: '/profile', method: 'get', propertyName: 'data' },
          logout: { url: '/auth/logout', method: 'post' },
        },
        //tokenRequired: true,
        tokenType: 'Bearer',
      }
    },
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      home: '/'
    },
  },

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: 'http://localhost:8000/api/v1',
  },

  /**
   * Router middleware config
   */
  router: {
    linkActiveClass: 'active',
    middleware: [
        'clearValidationErrors'
    ]
},

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
