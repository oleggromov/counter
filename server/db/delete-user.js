const makeQuery = require('../modules/make-query')
const APIResponse = require('../api/api-response')
const SQL = require('./queries')

const getIdsArray = (data) => data.reduce((acc, list) => {
  acc.push(list.listId)
  return acc
}, [])

const deleteUser = (userId) => {
  return makeQuery(SQL.getUserListIds, [userId])
    .then(getIdsArray)
    .then(ids => {
      if (ids.length) {
        return Promise.all([
          makeQuery(SQL.deleteAllItems, [ids]),
          makeQuery(SQL.deleteAllUserPermissions, [userId])
        ])
        .then(() => makeQuery(SQL.deleteAllListsIn, [ids]))
      }

      return makeQuery(SQL.deleteAllUserPermissions, [userId])
    })
    .then(() => makeQuery(SQL.deleteUser, [userId]))
    .then(() => new APIResponse({
      status: APIResponse.CODES.OK,
      data: {
        message: `User ${userId} has been completely deleted`
      }
    }))
    .catch(APIResponse.getDefaultCatch('Cannot remove user'))
}

module.exports = deleteUser
