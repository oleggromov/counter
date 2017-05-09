// const queries = require('../queries')
// const connection = require('../modules/get-connection')()
// const APIResponse = require('./api-response')

// const extractParams = (data, paramsList) => {

// }

const getQueryPromise = (query) => {
  return new Promise((resolve, reject) => {
    // if err
    resolve({
      [query.name]: query.name
    })
  })
}

const getPromiseChain = (queryChain) => {
  const promisedQueries = queryChain.map(getQueryPromise)

  return promisedQueries.reduce((prev, current) => {
    return prev.then(result => {
      return current.then(value => {
        return Object.assign({}, result, value)
      })
    })
  }, Promise.resolve({}))
}

const getActionPromise = (queries) => {
  const promises = queries.map(getPromiseChain)
  return Promise.all(promises).then(results => {
    return results.reduce((acc, cur) => {
      return Object.assign(acc, cur)
    }, {})
  })
}

module.exports = getActionPromise
