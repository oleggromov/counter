const getQueryPromise = require('../db/get-query-promise')
const forOwn = require('lodash/forOwn')

const respond = (res, apiResponse) => {
  res.status(apiResponse.status)
  res.json(apiResponse.toData())
  res.end()
}

const respondNew = (res, status, data) => {
  res.status(status)
  res.send(data)
  res.end()
}

const addRoutes = (router, methods) => {
  forOwn(methods, (urls, method) => {
    forOwn(urls, ({handlers}, url) => {
      const lastIndex = handlers.length - 1
      handlers.forEach((handler, index) => {
        const returnsResult = index === lastIndex

        router[method](url, (req, res, next) => {
          const params = Object.assign({}, req.params, req.body, res.intermediate || {})

          getQueryPromise(handler.queries, params)
            .then(data => {
              if (returnsResult) {
                respondNew(res, 200, data)
              } else {
                res.intermediate = res.intermediate || {}
                res.intermediate[handler.id] = data
                next()
              }
            })
            .catch(err => {
              respondNew(res, 500, err)
            })
        })
      })
    })
  })
}

module.exports = {
  addRoutes,
  respond
}
