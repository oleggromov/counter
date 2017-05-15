const connection = require('../modules/get-connection')()
const APIResponse = require('../api/api-response')
const SQL = require('./queries')

/**
 * Deletes the item and returns deleted list and item id
 */
const deleteItem = (defaultError, {listId, itemId}) => {
  return new Promise((resolve, reject) => {
    connection.query(SQL.deleteItem, [listId, itemId], (err, result) => {
      if (err) {
        reject(new APIResponse({
          status: APIResponse.CODES.SERVER_ERROR,
          error: {
            data: err,
            message: defaultError
          }
        }))
      } else {
        if (result.affectedRows === 1) {
          resolve(new APIResponse({
            status: APIResponse.CODES.OK,
            data: {
              listId: Number(listId),
              itemId: Number(itemId)
            }
          }))
        } else {
          reject(new APIResponse({
            status: APIResponse.CODES.GONE,
            error: {
              message: `Cannot delete item ${listId}/${itemId}`
            }
          }))
        }
      }
    })
  })
}

module.exports = deleteItem
