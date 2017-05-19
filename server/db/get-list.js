const makeQuery = require('../modules/make-query')
const APIResponse = require('../api/api-response')
const SQL = require('./sql')
const hasPermission = require('./has-permission')

const getList = (defaultError, {userId, listId}, {excludeItems}) => {
  // TODO: this check is likely to never work
  // because if list doesn't exist, the user has no permission
  // to access it
  // const checkIfListExists = results => {
  //   if (!results.length) {
  //     throw new APIResponse({
  //       status: APIResponse.CODES.NOT_FOUND,
  //       error: {
  //         message: defaultError
  //       }
  //     })
  //   }
  //   return results
  // }

  return hasPermission({ userId, listId })
    .then(() => Promise.all([
      // makeQuery(SQL.getList, [listId]).then(checkIfListExists),
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
