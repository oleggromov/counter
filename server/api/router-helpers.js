const forOwn = require('lodash/forOwn')
const statusCodes = require('./status-codes')

// TODO change this to production/development flag
const includeSqlDetails = true

const getResultObject = (overrides) => {
  return Object.assign({
    error: null,
    data: null
  }, overrides)
}

const getResult = (errorText, data) => {
  if (errorText) {
    return getResultObject({
      error: {
        text: errorText,
        data: includeSqlDetails ? data : null
      }
    })
  } else {
    return getResultObject({ data })
  }
}

const renderJson = (res, errorText, statusCode) => {
  return (data) => {
    res.status(statusCode)
    res.json(getResult(errorText, data))
    res.end()
  }
}

const addRoutes = (router, routes, connection, db) => {
  forOwn(routes, ({statusCode, urls}, method) => {
    forOwn(urls, ({handler, error}, url) => {
      if (typeof db[handler] !== 'function') {
        throw new Error(`db doesn't have a method "${handler}"`)
      }

      router[method](url, (req, res) => {
        const renderSuccess = renderJson(res, null, statusCode)
        const renderError = renderJson(res, error, statusCodes.SERVER_ERROR)

        db[handler](connection, req.params, req.body)
          .then(renderSuccess)
          .catch(renderError)
      })
    })
  })
}

module.exports = {
  addRoutes,
  renderJson
}
