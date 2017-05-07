const express = require('express')
const apiRouter = express.Router()
const bodyParser = require('body-parser')

const routesConfig = require('./routes-config')
const routerHelpers = require('./router-helpers')
const statusCodes = require('./status-codes')

const connection = require('../modules/get-connection')()
const db = require('../modules/db-actions.js')

// API calls get JSON input
apiRouter.use(bodyParser.json())

// Logging requests
apiRouter.use((req, res, next) => {
  console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} data=${JSON.stringify(req.body)}`)
  next()
})

routerHelpers.addRoutes(apiRouter, routesConfig, connection, db)

// Absent URI/method returns 400 Bad Request error
apiRouter.use((req, res) => {
  routerHelpers.renderJson(res, 'Bad request: there\'s no such method or URI', statusCodes.BAD_REQUEST)(null)
})

module.exports = apiRouter
