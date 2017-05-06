module.exports = {
  port: process.env.NODE_ENV === 'production'
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
