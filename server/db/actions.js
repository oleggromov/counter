const SQL = require('./queries')

const defaultResolver = (resolve, reject, result) => {
  resolve(result)
}

const getRequestPromise = (connection, sqlRequest, sqlData = null, resolver = defaultResolver) => {
  return new Promise((resolve, reject) => {
    connection.query(sqlRequest, sqlData, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolver(resolve, reject, result)
      }
    })
  })
}

/**
 * Returns all lists
 */
const getLists = connection => getRequestPromise(connection, SQL.getLists())

/**
 * Returns one list with items
 */
const getList = (connection, {listId}, {excludeItems}) => {
  const promises = [
    getRequestPromise(connection, SQL.getLists({ singleList: true }), [listId]),
    excludeItems
      ? null
      : getRequestPromise(connection, SQL.listItems, [listId])
  ]

  return Promise.all(promises)
    .then(data => {
      const listInfo = data[0][0]
      const items = excludeItems
        ? undefined
        : { items: data[1] }

      return Object.assign({}, listInfo, items)
    })
}

/**
 * Creates a list and returns it
 */
const createList = (connection, params, {name}) => {
  return getRequestPromise(connection, SQL.createList, [name], (resolve, reject, result) => {
    const params = { listId: result.insertId }

    getList(connection, params, { excludeItems: true })
      .then(data => {
        resolve(data)
      })
  })
}

/**
 * Creates a item and returns it
 */
const createItem = (connection, {listId}, {name, value, date}) => {
  return getRequestPromise(connection, SQL.createItem, [listId, name, value, date], (resolve, reject, result) => {
    getRequestPromise(connection, SQL.getItem, [listId, result.insertId])
      .then(data => resolve(data[0]))
  })
}

/**
 * Deletes the list and returns delete id
 */
const deleteList = (connection, {listId}) => {
  return getRequestPromise(connection, SQL.deleteList, [listId], (resolve, reject, result) => {
    // TODO: Always returns id, even if the list was not deleted
    resolve({
      listId: Number(listId)
    })
  })
}

/**
 * Deletes the item and returns deleted list and item id
 */
const deleteItem = (connection, {listId, itemId}) => {
  return getRequestPromise(connection, SQL.deleteItem, [listId, itemId], (resolve, reject, result) => {
    // TODO: Always returns id, even if the item was not deleted
    resolve({
      listId: Number(listId),
      itemId: Number(itemId)
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
