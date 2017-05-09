const getActionPromise = require('../db/get-action-promise')
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

const addRoutes = (router, routes) => {

  forOwn(routes, (urls, method) => {
    forOwn(urls, (action, url) => {

      router[method](url, (req, res) => {
        // req.params
        // req.body

        const respondError = respondNew.bind(null, res, 500)
        const respondOk = respondNew.bind(null, res, 200)

        getActionPromise(action)
          .then(respondOk)
          .catch(respondError)
      })
    })
  })
}

module.exports = {
  addRoutes,
  respond
}
