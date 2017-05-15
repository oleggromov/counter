const makeQuery = require('../modules/make-query')
const APIResponse = require('../api/api-response')
const SQL = require('./queries')

/**
 * Deletes the item and returns deleted list and item id
 */
const deleteItem = (defaultError, {listId, itemId}) => {
  return makeQuery(SQL.deleteItem, [listId, itemId])

    .then(result => {
      if (result.affectedRows === 0) {
        throw new APIResponse({
          status: APIResponse.CODES.GONE,
          error: {
            message: `Cannot delete item ${listId}/${itemId}`
          }
        })
      }
      return result
    })
    .then(result => new APIResponse({
      status: APIResponse.CODES.OK,
      data: {
        listId: Number(listId),
        itemId: Number(itemId)
      }
    }))
    .catch(APIResponse.getDefaultCatch(defaultError))
}

module.exports = deleteItem
