const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  protocol: 'http',
  host: 'localhost',

  port: isProd
    ? 80
    : 3000,

  staticPath: './public',

  db: {
    host: 'localhost',
    user: 'counter',
    password: '',
    database: 'counter_0_1'
  }
}
