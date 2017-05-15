const makeQuery = require('../modules/make-query')
const APIResponse = require('../api/api-response')
const SQL = require('./queries')

/**
 * Deletes the item and returns deleted list and item id
 */
const deleteItem = (defaultError, {listId, itemId}) => {
  return makeQuery(SQL.deleteItem, [listId, itemId])
    .then(result => {
      if (result.affectedRows === 1) {
        return new APIResponse({
          status: APIResponse.CODES.OK,
          data: {
            listId: Number(listId),
            itemId: Number(itemId)
          }
        })
      } else {
        return new APIResponse({
          status: APIResponse.CODES.GONE,
          error: {
            message: `Cannot delete item ${listId}/${itemId}`
          }
        })
      }
    })
    .catch(err => new APIResponse({
      status: APIResponse.CODES.SERVER_ERROR,
      error: {
        data: err,
        message: defaultError
      }
    }))
}

module.exports = deleteItem
