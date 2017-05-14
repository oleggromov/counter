const express = require('express')
const apiRouter = express.Router()
const routesConfig = require('./routes-config')
const routerHelpers = require('./router-helpers')
const APIResponse = require('./api-response')

// Authorization check hook
apiRouter.use((req, res, next) => {
  const isAuthorized = true

  if (!isAuthorized) {
    const unauthorized = new APIResponse({
      status: APIResponse.CODES.UNAUTHORIZED,
      error: {
        message: 'Not authorized'
      }
    })

    routerHelpers.respond(res, unauthorized)
  } else {
    next()
  }
})

// All the business logic routes
routerHelpers.addRoutes(apiRouter, routesConfig)

// Absent URI/method returns 400 Bad Request error
apiRouter.use((req, res) => {
  const badRequest = new APIResponse({
    status: APIResponse.CODES.BAD_REQUEST,
    error: {
      message: 'Bad request: there\'s no such method or URI'
    }
  })

  routerHelpers.respond(res, badRequest)
})

module.exports = apiRouter
