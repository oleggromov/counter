const express = require('express')
const apiRouter = express.Router()
const bodyParser = require('body-parser')

const routesConfig = require('./routes-config')
const routerHelpers = require('./router-helpers')

const connection = require('../modules/get-connection')()
const db = require('../db/actions.js')
const APIResponse = require('./api-response')

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
  routerHelpers.respond(res, new APIResponse({
    status: APIResponse.CODES.BAD_REQUEST,
    error: {
      message: 'Bad request: there\'s no such method or URI'
    }
  }))
})

module.exports = apiRouter
