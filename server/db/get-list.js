const makeQuery = require('../modules/make-query')
const APIResponse = require('../api/api-response')
const SQL = require('./queries')

const getList = (defaultError, {userId, listId}, {excludeItems}) => {
  // return hasPermission({ userId, listId })

  const promises = [
    makeQuery(SQL.getLists({ singleList: true }), [listId]),
    makeQuery(SQL.listItems, [listId])
  ]

  return Promise.all(promises)
    .then(results => {
      const listInfo = results[0][0]
      const items = { items: results[1] }

      if (!listInfo) {
        return new APIResponse({
          status: APIResponse.CODES.NOT_FOUND,
          error: {
            message: defaultError
          }
        })
      }

      return new APIResponse({
        status: APIResponse.CODES.OK,
        data: Object.assign({}, listInfo, items)
      })
    })
    .catch(err => new APIResponse({
      status: APIResponse.CODES.SERVER_ERROR,
      error: {
        data: err,
        message: defaultError
      }
    }))
}

module.exports = getList
