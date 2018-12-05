// global meta for different routes

export const Meta = {
  // all public facing pages
  front: {
    link: {
      style: {
        rel: 'stylesheet',
        href: '/css/style.css'
      },
      restricted: null,
      // Google fonts
      raleway: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Raleway'
      },
      roboto: null,
    },
    script: {
      material: null
    }
  },
  // admin restrcited area (Material Design Lite)
  restricted: {
    link: {
      style: null,
      restricted: {
        rel: 'stylesheet',
        href: '/css/restricted.css'
      },
      // Google fonts
      raleway: false,
      roboto: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700'
      },
    },
    script: {
      material: '/material/material.min.js'
    }
  }
}
