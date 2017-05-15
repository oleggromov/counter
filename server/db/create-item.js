const makeQuery = require('../modules/make-query')
const APIResponse = require('../api/api-response')
const SQL = require('./queries')

/**
 * Creates a item and returns it
 */
const createItem = (defaultError, {listId}, {name, value, date}) => {
  return makeQuery(SQL.createItem, [listId, name, value, date])
    .then(({insertId}) => makeQuery(SQL.getItem, [listId, insertId]))
    .then(data => new APIResponse({
      status: APIResponse.CODES.CREATED,
      data: data[0]
    }))
    .catch(APIResponse.getDefaultCatch(defaultError))
}

module.exports = createItem
