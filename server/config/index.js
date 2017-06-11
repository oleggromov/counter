const merge = require('lodash/merge')
const secrets = require('../../secrets/secrets.js')

const config = {
  DEV: {
    protocol: 'http',
    host: 'localhost',
    port: 3000,

    staticPath: './public/static',

    db: {
      connectionLimit: 10
    }
  },

  PRODUCTION: {
    protocol: null,
    host: null,
    port: null,

    staticPath: null,

    db: {
      host: null,
      connectionLimit: null
    }
  }
}

module.exports = isProd => {
  const env = isProd ? 'PRODUCTION' : 'DEV'

  return merge(config[env], secrets[env])
}
