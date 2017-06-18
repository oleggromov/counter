const express = require('express')
const auth = require('./auth')
const bodyParser = require('body-parser')
const config = require('./config')
const resolveToRoot = require('./modules/resolve-to-root')
const apiRouter = require('./api/router')
const { apiRoot, urls } = require('../common/api-constants')
const ifNotLogged = require('./modules/if-not-logged')
const log = require('./modules/log')

const app = express()

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

const redirectToLogin = ifNotLogged((req, res) => res.redirect(urls.AUTH_LOGIN))
const sendIndex = (req, res) => res.sendFile(resolveToRoot('public/index.html'))

app.get(clientUrls, redirectToLogin, sendIndex)
app.get(urls.AUTH_LOGIN, sendIndex)

app.listen(config.port, () => console.log(`Server is running on ${config.port}`))
