const connection = require('../modules/get-connection')()
const queries = require('./queries')

const getResultObject = (query, result, params) => {
  if (query.type === 'delete') {
    return Object.assign({}, params)
  }

  const resultObj = query.resultKey
    ? { [query.resultKey]: result }
    : Array.isArray(result)
      ? result[0]
      : result

  return Object.assign({}, resultObj)
}

const getParamsArray = (params, requiredParams = []) => {
  return requiredParams.map(param => {
    const match = param.match(/(\w+)\.(\w+)/)
    if (match) {
      return params[match[1]][match[2]]
    }
    return params[param]
  })
}

const getPromise = (query, params) => {
  const sql = queries[query.query]
  const sqlParams = getParamsArray(params, query.params)

  return new Promise((resolve, reject) => {
    connection.query(sql, sqlParams, (err, result) => {
      if (err) {
        reject({
          code: 500,
          error: {
            text: `${query.name} - error!`,
            data: err
          }
        })
      } else if (query.emptyError && !result.length) {
        reject({
          code: query.emptyError.code,
          text: `${query.name}: ${query.emptyError.text}`
        })
      } else if (query.noRowsError && !result.affectedRows) {
        reject({
          code: query.noRowsError.code,
          text: query.noRowsError.text
        })
      } else {
        resolve(getResultObject(query, result, params))
      }
    })
  })
}

const arrayToObject = results => {
  return results.reduce((acc, cur) => {
    return Object.assign(acc, cur)
  }, {})
}

const getQueryPromise = (queries, params) => {
  const promises = queries.map(query => {
    return getPromise(query, params)
  })

  return Promise.all(promises)
    .then(arrayToObject)
}

module.exports = getQueryPromise
