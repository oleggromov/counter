const merge = require('lodash/merge')
const secrets = require('../../secrets/secrets.js')

const config = {
  protocol: 'http',
  host: 'localhost',
  port: 3000,

  staticPath: './public/static',

  db: {
    connectionLimit: 10
  }
}

module.exports = isProd => {
  const env = isProd ? 'PRODUCTION' : 'DEV'

  return merge(config, secrets[env])
}
