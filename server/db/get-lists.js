const makeQuery = require('../modules/make-query')
const APIResponse = require('../api/api-response')
const SQL = require('./queries')

const getLists = defaultError => {
  return makeQuery(SQL.getLists())
    .then(data => new APIResponse({
      status: APIResponse.CODES.OK,
      data
    }))
    .catch(APIResponse.getDefaultCatch(defaultError))
}

module.exports = getLists
