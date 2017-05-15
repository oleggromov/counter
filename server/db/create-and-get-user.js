const makeQuery = require('../modules/make-query')
const APIResponse = require('../api/api-response')
const SQL = require('./queries')

const createAndGetUser = (facebookId) => {
  return makeQuery(SQL.addUser, [facebookId])
    .then(() => makeQuery(SQL.getUser, [facebookId]))
    .then(result => result[0].id)
    .catch(APIResponse.getDefaultCatch('Cannot create or get user'))
}

module.exports = createAndGetUser
