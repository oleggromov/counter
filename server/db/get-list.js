const makeQuery = require('../modules/make-query')
const APIResponse = require('../api/api-response')
const SQL = require('./sql')
const hasPermission = require('./has-permission')

const getList = (defaultError, {userId, listId}, {excludeItems}) => {
  return hasPermission({ userId, listId })
    .then(() => Promise.all([
      makeQuery(SQL.getList, [listId]),
      makeQuery(SQL.listItems, [listId])
    ]))
    .then(results => new APIResponse({
      status: APIResponse.CODES.OK,
      data: Object.assign({}, results[0][0], { items: results[1] })
    }))
    .catch(APIResponse.getDefaultCatch(defaultError))
}

module.exports = getList
