const makeQuery = require('../modules/make-query')
const APIResponse = require('../api/api-response')
const SQL = require('./queries')

/**
 * Deletes the list and returns delete id
 */
const deleteList = (defaultError, {listId}) => {
  return makeQuery(SQL.deleteList, [listId])
    .then(result => {
      if (result.affectedRows === 1) {
        return new APIResponse({
          status: APIResponse.CODES.OK,
          data: {
            listId: Number(listId)
          }
        })
      } else {
        return new APIResponse({
          status: APIResponse.CODES.GONE,
          error: {
            message: `Cannot delete list with id=${listId}`
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

module.exports = deleteList
