const makeQuery = require('../modules/make-query')
const APIResponse = require('../api/api-response')
const SQL = require('./queries')

/**
 * Creates a list and returns it
 */
const createList = (defaultError, params, {name}) => {
  return makeQuery(SQL.createList, [name])
    .then(({insertId}) => makeQuery(SQL.getLists({singleList: true}), [insertId]))
    .then(data => new APIResponse({
      status: APIResponse.CODES.CREATED,
      data: data[0]
    }))
    .catch(APIResponse.getDefaultCatch(defaultError))
}

module.exports = createList
