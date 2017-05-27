const makeQuery = require('../modules/make-query')
const APIResponse = require('../api/api-response')
const SQL = require('./sql')
const hasPermission = require('./has-permission')

/**
 * Deletes the list and returns delete id.
 * Note: there's a bug-feature: the user will always receive
 * a "no permission" error when trying to delete an absent
 * list even if it was owned by that user before.
 */
const deleteList = (defaultError, {userId, listId}) => {
  return hasPermission({ userId, listId })
    .then(() => makeQuery(SQL.deletePermission, [userId, listId]))
    .then(() => makeQuery(SQL.deleteList, [listId]))
    .then(result => new APIResponse({
      status: APIResponse.CODES.OK,
      data: {
        listId: Number(listId)
      }
    }))
    .catch(APIResponse.getDefaultCatch(defaultError))
}

module.exports = deleteList
