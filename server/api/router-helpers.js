const forOwn = require('lodash/forOwn')

const respond = (res, apiResponse) => {
  res.status(apiResponse.status)
  res.json(apiResponse.toData())
  res.end()
}

const addRoutes = (router, routes, connection, db) => {
  forOwn(routes, ({statusCode, urls}, method) => {
    forOwn(urls, ({handler, error}, url) => {
      if (typeof db[handler] !== 'function') {
        throw new Error(`db doesn't have a method "${handler}"`)
      }

      router[method](url, (req, res) => {
        const respondBinded = respond.bind(null, res)
        db[handler](connection, error, req.params, req.body)
          .then(respondBinded, respondBinded)
      })
    })
  })
}

module.exports = {
  addRoutes,
  respond
}
