const forOwn = require('lodash/forOwn')
const statusCodes = require('./status-codes')

const getHandlerName = (method, key) => {
  return `${method}${key[0].toUpperCase()}${key.slice(1)}`
}

const renderJson = (res, errorText, dataKey, statusCode) => {
  return (data) => {
    let result

    if (errorText) {
      result = {
        error: {
          text: errorText,
          data: data
        },
        data: null
      }
    } else {
      result = {
        error: null,
        data: {
          [dataKey]: data
        }
      }
    }

    res.status(statusCode)
    res.json(result)
    res.end()
  }
}

const addRoutes = (router, routes, connection, db) => {
  forOwn(routes, ({statusCode, uris}, method) => {
    forOwn(uris, ({dataKey, error}, uri) => {
      const handlerName = getHandlerName(method, dataKey)
      if (typeof db[handlerName] !== 'function') {
        throw new Error(`db doesn't have a method "${handlerName}"`)
      }

      router[method](uri, (req, res) => {
        const renderSuccess = renderJson(res, null, dataKey, statusCode)
        const renderError = renderJson(res, error, null, statusCodes.SERVER_ERROR)

        db[handlerName](connection, req.params, req.body)
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
