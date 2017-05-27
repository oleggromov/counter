const makeQuery = require('../modules/make-query')
const APIResponse = require('../api/api-response')
const SQL = require('./sql')

const hasPermission = ({userId, listId}) => {
  return makeQuery(SQL.hasPermission, [userId, listId])
    .then(result => {
      if (result.length === 0) {
        throw new APIResponse({
          status: APIResponse.CODES.UNAUTHORIZED,
          error: {
            message: 'Access is not permitted'
          }
        })
      }
      return true
    })
}

module.exports = hasPermission
