const dbActions = require('../db/actions.js')
const forOwn = require('lodash/forOwn')
const APIResponse = require('./api-response')

const sendUnauthorized = require('../modules/if-not-logged')((req, res) => {
  respond(res, new APIResponse({
    status: APIResponse.CODES.UNAUTHORIZED,
    error: {
      message: 'Unathorized'
    }
  }))
})

const respond = (res, apiResponse) => {
  res.status(apiResponse.status)
  res.json(apiResponse.toData())
  res.end()
}

const addRoutes = (router, routes) => {
  forOwn(routes, ({statusCode, urls}, method) => {
    forOwn(urls, ({handler, error}, url) => {
      if (typeof dbActions[handler] !== 'function') {
        throw new Error(`dbActions doesn't have a method "${handler}"`)
      }

      router[method](url, sendUnauthorized, (req, res) => {
        const respondBinded = respond.bind(null, res)
        const reqParams = Object.assign({}, req.params, {
          userId: req.user.id
        })

        dbActions[handler](error, reqParams, req.body)
          .then(respondBinded, respondBinded)
      })
    })
  })
}

module.exports = {
  addRoutes,
  respond
}
