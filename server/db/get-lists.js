const makeQuery = require('../modules/make-query')
const APIResponse = require('../api/api-response')
const SQL = require('./sql')

const getLists = (defaultError, {userId}) => {
  return makeQuery(SQL.getLists, [userId])
    .then(data => new APIResponse({
      status: APIResponse.CODES.OK,
      data
    }))
    .catch(APIResponse.getDefaultCatch(defaultError))
}

module.exports = getLists
