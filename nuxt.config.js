import pkg from './package'

require('dotenv').config();

import getSitemap from './utils/getSitemap'

export default {
  debug: false,

  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Excursguide',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'yandex-verification', content: '1b17652caa4578f5' },
      { name: 'google-site-verification', content: 'Jrlf7j1xzEEYlhh8m_Og-nz5Q2Q2zJ_Wch1oqOJCIk4' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/fav_64x64.png' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.3.0/css/flag-icon.min.css' }
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
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/mixins/validation',
    '@/plugins/mixins/user',
    '@/plugins/axios',
    //'@/plugins/interceptors',
    { src: '~/plugins/lazyload', ssr: false },
    { src: '~/plugins/carousel', ssr: false },
    { src: '~/plugins/laravelEcho', ssr: false },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        //import whole set
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas']
        },
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['fab']
        },
      ]
    }],
    // Yandex Metrika
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '54142261',
        clickmap:true,
        // useCDN:false,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true,
      }
    ],
  ],

  /**
   * Robots
   */
  robots: [
    {
      UserAgent: '*',
      Allow: '/'
    }
  ],

  /**
   * Sitemap
   */

  sitemap: {
    routes() {
      return getSitemap();
    },
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date(),
      lastmodrealtime: true
    }
    // generate: true,
    // hostname: 'https://www.excursguide.ru',
    // gzip: true,
    // exclude: [
    //   '/guide'
    // ]
  },

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
        tokenRequired: true,
        tokenType: 'Bearer',
      }
    },
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      home: '/'
    },
    watchLoggedIn: true,
  },

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    browserBaseURL: process.env.BASE_URL || 'https://api.excursguide.ru/api/v1',
    baseURL: process.env.DOCKER ? 'http://nginx/api/v1' : 'https://api.excursguide.ru/api/v1',
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
  },

  serverMiddleware: ['redirect-ssl'],

}
