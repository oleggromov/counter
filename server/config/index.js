const merge = require('lodash/merge')
const secrets = require('../../secrets/secrets.js')

const commonConfig = {
  protocol: 'http',
  port: 3000,

  staticPath: './public/static',

  db: {
    host: process.env.DB_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10
  }
}

const config = {
  DEV: {
    host: 'localhost'
  },

  PRODUCTION: {
    host: 'counter-test.oleggromov.com'
  }
}

module.exports = isProd => {
  const env = isProd ? 'PRODUCTION' : 'DEV'

  return merge(commonConfig, config[env], secrets[env])
}
