// global meta for different routes

export const Meta = {
  front: {
    link: {
      style: {
        rel: 'stylesheet',
        href: '/css/style.css'
      },
      restricted: null
    },
    script: {
      material: null
    }
  },
  restricted: {
    link: {
      style: null,
      restricted: {
        rel: 'stylesheet',
        href: '/css/restricted.css'
      },
    },
    script: {
      material: '/material/material.min.js'
    }
  }
}
