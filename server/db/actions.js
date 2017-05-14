const connection = require('../modules/get-connection')()
const APIResponse = require('../api/api-response')
const SQL = require('./queries')

const defaultResolver = (resolve, reject, result) => {
  resolve(new APIResponse({
    status: APIResponse.CODES.OK,
    data: result
  }))
}

const getRequestPromise = (defaultError, sqlRequest, sqlData = null, resolver = defaultResolver) => {
  return new Promise((resolve, reject) => {
    connection.query(sqlRequest, sqlData, (err, result) => {
      if (err) {
        reject(new APIResponse({
          status: APIResponse.CODES.SERVER_ERROR,
          error: {
            data: err,
            message: defaultError
          }
        }))
      } else {
        resolver(resolve, reject, result)
      }
    })
  })
}

/**
 * Returns all lists
 */
const getLists = (defaultError) => getRequestPromise(defaultError, SQL.getLists())

/**
 * Returns one list with items
 * TODO !!!!Refactor this!!!!
 */
const getList = (defaultError, {listId}, {excludeItems}) => {
  const promises = [
    getRequestPromise(defaultError, SQL.getLists({ singleList: true }), [listId]),
    excludeItems
      ? null
      : getRequestPromise(defaultError, SQL.listItems, [listId])
  ]

  return Promise.all(promises)
    .then(data => {
      const listInfo = data[0].data[0]
      const items = excludeItems ? undefined : { items: data[1].data }

      if (!listInfo) {
        return new APIResponse({
          status: APIResponse.CODES.NOT_FOUND,
          error: {
            message: defaultError
          }
        })
      }

      return new APIResponse({
        status: APIResponse.CODES.OK,
        data: Object.assign({}, listInfo, items)
      })
    })
}

/**
 * Creates a list and returns it
 */
const createList = (defaultError, params, {name}) => {
  return getRequestPromise(defaultError, SQL.createList, [name], (resolve, reject, result) => {
    const params = { listId: result.insertId }

    getList(defaultError, params, { excludeItems: true })
      .then(data => {
        resolve(new APIResponse({
          status: APIResponse.CODES.CREATED,
          data: data.data
        }))
      })
  })
}

/**
 * Creates a item and returns it
 */
const createItem = (defaultError, {listId}, {name, value, date}) => {
  return getRequestPromise(defaultError, SQL.createItem, [listId, name, value, date], (resolve, reject, result) => {
    getRequestPromise(defaultError, SQL.getItem, [listId, result.insertId])
      .then(data => {
        resolve(new APIResponse({
          status: APIResponse.CODES.CREATED,
          data: data.data[0]
        }))
      })
  })
}

const resolveIfDeleted = ({result, resolve, reject, successData, errorMessage}) => {
  if (result.affectedRows === 1) {
    resolve(new APIResponse({
      status: APIResponse.CODES.OK,
      data: successData
    }))
  } else {
    reject(new APIResponse({
      status: APIResponse.CODES.GONE,
      error: {
        message: errorMessage
      }
    }))
  }
}

/**
 * Deletes the list and returns delete id
 */
const deleteList = (defaultError, {listId}) => {
  return getRequestPromise(defaultError, SQL.deleteList, [listId], (resolve, reject, result) => {
    resolveIfDeleted({
      result,
      resolve,
      reject,
      successData: {
        listId: Number(listId)
      },
      errorMessage: `Cannot delete list with id=${listId}`
    })
  })
}

/**
 * Deletes the item and returns deleted list and item id
 */
const deleteItem = (defaultError, {listId, itemId}) => {
  return getRequestPromise(defaultError, SQL.deleteItem, [listId, itemId], (resolve, reject, result) => {
    resolveIfDeleted({
      result,
      resolve,
      reject,
      successData: {
        listId: Number(listId),
        itemId: Number(itemId)
      },
      errorMessage: `Cannot delete item ${listId}/${itemId}`
    })
  })
}

module.exports = {
  getLists,
  getList,
  createList,
  createItem,
  deleteList,
  deleteItem
}
