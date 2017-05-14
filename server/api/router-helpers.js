const dbActions = require('../db/actions.js')
const forOwn = require('lodash/forOwn')

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

      router[method](url, (req, res) => {
        const respondBinded = respond.bind(null, res)
        dbActions[handler](error, req.params, req.body)
          .then(respondBinded, respondBinded)
      })
    })
  })
}

module.exports = {
  addRoutes,
  respond
}
