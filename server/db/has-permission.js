const makeQuery = require('../modules/make-query')
const APIResponse = require('../api/api-response')
const SQL = require('./queries')

const hasPermission = ({userId, listId}) => {
  return makeQuery(SQL.getPermission, [userId, listId])
    // .catch(APIResponse.getDefaultCatch(`Cannot get permissions for user ${userId} on list ${listId}`))
    .then(result => {
      if (result.length === 0) {
        throw new APIResponse({
          status: APIResponse.CODES.UNAUTHORIZED,
          error: {
            message: 'Access is not permitted',
            data: result.length
          }
        })
      }
      return true
    })
}

module.exports = hasPermission
