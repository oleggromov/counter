const makeQuery = require('../modules/make-query')
const APIResponse = require('../api/api-response')
const SQL = require('./queries')

const getList = (defaultError, {userId, listId}, {excludeItems}) => {
  // return hasPermission({ userId, listId })

  const checkIfListExists = data => {
    if (!data.length) {
      throw new APIResponse({
        status: APIResponse.CODES.NOT_FOUND,
        error: {
          message: defaultError
        }
      })
    }
    return data
  }

  const promises = [
    makeQuery(SQL.getLists({ singleList: true }), [listId]).then(checkIfListExists),
    makeQuery(SQL.listItems, [listId])
  ]

  return Promise.all(promises)
    .then(results => new APIResponse({
      status: APIResponse.CODES.OK,
      data: Object.assign({}, results[0][0], { items: results[1] })
    }))
    .catch(err => {
      if (err instanceof APIResponse) {
        return err
      }

      return new APIResponse({
        status: APIResponse.CODES.SERVER_ERROR,
        error: {
          data: err,
          message: defaultError
        }
      })
    })
}

module.exports = getList
