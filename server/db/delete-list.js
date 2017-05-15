const connection = require('../modules/get-connection')()
const APIResponse = require('../api/api-response')
const SQL = require('./queries')

/**
 * Deletes the list and returns delete id
 */
const deleteList = (defaultError, {listId}) => {
  return new Promise((resolve, reject) => {
    connection.query(SQL.deleteList, [listId], (err, result) => {
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
              listId: Number(listId)
            }
          }))
        } else {
          reject(new APIResponse({
            status: APIResponse.CODES.GONE,
            error: {
              message: `Cannot delete list with id=${listId}`
            }
          }))
        }
      }
    })
  })
}

module.exports = deleteList
