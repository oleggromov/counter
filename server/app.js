const express = require('express')
const auth = require('./auth')
const ensureLogin = require('connect-ensure-login')
const bodyParser = require('body-parser')
const config = require('./config')
const resolveToRoot = require('./modules/resolve-to-root')
const apiRouter = require('./api/router')
const { apiRoot } = require('../common/api-constants')

const app = express()

const loginUrl = '/auth/login'

// Some (API) calls get JSON input
app.use(bodyParser.json())

// Logging requests
app.use((req, res, next) => {
  const dataString = Object.keys(req.body).length ? ` data=${JSON.stringify(req.body)} ` : ' '
  console.log(`${req.method}${dataString}${req.protocol}://${req.get('host')}${req.originalUrl}`)
  next()
})

auth(app)

// API requests go first
app.use(apiRoot, apiRouter)

// Everything that is found in public/ directory is served as static
app.use('/', ensureLogin.ensureLoggedIn(loginUrl), express.static(resolveToRoot(config.staticPath), {
  fallthrough: true
}))

// And if nothing was found, send index.html by default
app.use(/\/lists\/\d+/, ensureLogin.ensureLoggedIn(loginUrl), (req, res) => {
  res.sendFile(resolveToRoot('public/index.html'))
})

app.listen(config.port, () => console.log(`Server is running on ${config.port}`))
