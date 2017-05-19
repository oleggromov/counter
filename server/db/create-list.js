const makeQuery = require('../modules/make-query')
const APIResponse = require('../api/api-response')
const SQL = require('./sql')

/**
 * Creates a list and returns it
 */
const createList = (defaultError, {userId}, {name}) => {
  return makeQuery(SQL.createList, [name])
    .then(({insertId}) => Promise.all([
      makeQuery(SQL.addPermission, [userId, insertId]),
      makeQuery(SQL.getList, [insertId])
    ]))
    .then(data => new APIResponse({
      status: APIResponse.CODES.CREATED,
      data: data[1][0]
    }))
    .catch(APIResponse.getDefaultCatch(defaultError))
}

module.exports = createList
