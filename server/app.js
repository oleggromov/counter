const express = require('express')
const auth = require('./auth')
const redirectToLogin = require('./modules/if-not-logged')((req, res) => {
  res.redirect(loginUrl)
})
const bodyParser = require('body-parser')
const config = require('./config')
const resolveToRoot = require('./modules/resolve-to-root')
const apiRouter = require('./api/router')
const { apiRoot } = require('../common/api-constants')
const log = require('./modules/log')

const app = express()

const loginUrl = '/auth/login'

// Some (API) calls get JSON input
app.use(bodyParser.json())

// Auth
auth(app)

// Logging requests
app.use((req, res, next) => {
  log(req)
  next()
})

// API requests go first
app.use(apiRoot, apiRouter)

// Everything that is found in public/ directory is served as static
app.use('/', redirectToLogin, express.static(resolveToRoot(config.staticPath), {
  fallthrough: true
}))

// And if nothing was found, send index.html by default
app.use(/\/lists\/\d+/, redirectToLogin, (req, res) => {
  res.sendFile(resolveToRoot('public/index.html'))
})

app.listen(config.port, () => console.log(`Server is running on ${config.port}`))
