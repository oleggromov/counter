const express = require('express')
const auth = require('./auth')
const bodyParser = require('body-parser')
const config = require('./config')
const resolveToRoot = require('./modules/resolve-to-root')
const apiRouter = require('./api/router')
const { apiRoot } = require('../common/api-constants')
const log = require('./modules/log')

const app = express()

const loginUrl = '/auth/login'
const redirectToLogin = require('./modules/if-not-logged')((req, res) => {
  res.redirect(loginUrl)
})

// Serving static before anything else
app.use('/static', express.static(resolveToRoot(config.staticPath)))

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

const clientUrls = [
  '/',
  '/settings',
  /\/lists\/\d+/
]

app.get(clientUrls, redirectToLogin, (req, res) => {
  res.sendFile(resolveToRoot('public/index.html'))
})

app.get(loginUrl, (req, res) => {
  res.sendFile(resolveToRoot('public/index.html'))
})

app.listen(config.port, () => console.log(`Server is running on ${config.port}`))
