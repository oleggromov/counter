const env = process.env

module.exports = {
  protocol: 'http',

  host: env.PUBLIC_DOMAIN,
  publicPort: env.PUBLIC_PORT,
  port: env.LISTENING_PORT,

  appId: env.FB_APP_ID,
  fbAppSecret: env.FB_APP_SECRET,
  cookieSecret: env.COOKIE_SECRET,

  staticPath: './public/static',

  db: {
    host: env.DB_HOST,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    connectionLimit: 10
  }
}
