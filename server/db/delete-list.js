const makeQuery = require('../modules/make-query')
const APIResponse = require('../api/api-response')
const SQL = require('./queries')
const hasPermission = require('./has-permission')

/**
 * Deletes the list and returns delete id
 */
const deleteList = (defaultError, {userId, listId}) => {
  return hasPermission({ userId, listId })
    .then(() => makeQuery(SQL.deletePermission, [userId, listId]))
    .then(() => makeQuery(SQL.deleteList, [listId]))
    // This never works because of permissions check
    // .then(result => {
    //   if (result.affectedRows === 0) {
    //     throw new APIResponse({
    //       status: APIResponse.CODES.GONE,
    //       error: {
    //         message: `Cannot delete list with id=${listId}`
    //       }
    //     })
    //   }
    // })
    .then(result => new APIResponse({
      status: APIResponse.CODES.OK,
      data: {
        listId: Number(listId)
      }
    }))
    .catch(APIResponse.getDefaultCatch(defaultError))
}

module.exports = deleteList
