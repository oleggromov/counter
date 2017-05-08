const defaultResolver = (resolve, result) => {
  resolve(result)
}

const getRequestPromise = (connection, sqlRequest, sqlData = null, resolver = defaultResolver) => {
  return new Promise((resolve, reject) => {
    connection.query(sqlRequest, sqlData, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolver(resolve, result)
      }
    })
  })
}

/**
 * Returns all lists
 */
const getSqlGetLists = (listId) => {
  const whereClause = listId
    ? `WHERE lists.id = ${listId}`
    : ''

  return `SELECT lists.id, lists.name,
      COUNT(items.id) AS itemsCount,
      MAX(items.date) AS lastDate
    FROM lists
    LEFT JOIN items
      ON lists.id = items.listId
    ${whereClause}
    GROUP BY lists.id
    ORDER BY lastDate DESC`
}

const getLists = connection => getRequestPromise(connection, getSqlGetLists())

/**
 * Returns one list with items
 */
const SQL_GET_LIST_ITEMS = 'SELECT `id`, `name`, `date`, `value` FROM `items` WHERE `listId` = ? ORDER BY `date` DESC'

const getList = (connection, {listId}, {excludeItems}) => {
  const promises = [
    getRequestPromise(connection, getSqlGetLists(listId), [listId]),
    excludeItems
      ? null
      : getRequestPromise(connection, SQL_GET_LIST_ITEMS, [listId])
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
const SQL_CREATE_LIST = 'INSERT INTO `lists` (`name`) VALUES (?)'

const createList = (connection, params, {name}) => {
  return getRequestPromise(connection, SQL_CREATE_LIST, [name], (resolve, result) => {
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
const SQL_CREATE_ITEM = 'INSERT INTO `items` (`listId`, `name`, `value`, `date`) VALUES (?, ?, ?, ?)'
const SQL_GET_ITEM = 'SELECT `id`, `name`, `date`, `value` FROM `items` WHERE `listId` = ? and `id` = ?'

const createItem = (connection, {listId}, {name, value, date}) => {
  return getRequestPromise(connection, SQL_CREATE_ITEM, [listId, name, value, date], (resolve, result) => {
    getRequestPromise(connection, SQL_GET_ITEM, [listId, result.insertId])
      .then(data => resolve(data[0]))
  })
}

/**
 * Deletes the list and returns delete id
 */
const SQL_DELETE_LIST = 'DELETE FROM `lists` WHERE `id` = ?'

const deleteList = (connection, {listId}) => {
  return getRequestPromise(connection, SQL_DELETE_LIST, [listId], (resolve, result) => {
    // TODO: Always returns id, even if the list was not deleted
    resolve({
      listId: Number(listId)
    })
  })
}

/**
 * Deletes the item and returns deleted list and item id
 */
const SQL_DELETE_ITEM = 'DELETE FROM `items` WHERE `listId` = ? AND `id` = ?'

const deleteItem = (connection, {listId, itemId}) => {
  return getRequestPromise(connection, SQL_DELETE_ITEM, [listId, itemId], (resolve, result) => {
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
