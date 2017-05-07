const defaultResolver = (resolve, result) => {
  resolve(result)
}

const getPromise = (connection, sqlRequest, sqlData = null, resolver = defaultResolver) => {
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
const SQL_GET_LISTS = `SELECT lists.id, lists.name,
    COUNT(items.id) AS itemsCount,
    MAX(items.date) AS lastDate
  FROM lists
  LEFT JOIN items
    ON lists.id = items.listId
  GROUP BY lists.id`

const getLists = connection => getPromise(connection, SQL_GET_LISTS)

/**
 * Returns one list with items
 */
const SQL_GET_LIST = [
  'SELECT * FROM `lists` WHERE `id` = ?',
  'SELECT `id`, `name`, `date`, `value` FROM `items` WHERE `listId` = ? ORDER BY `date` DESC'
]

const getList = (connection, {listId}) => {
  const promises = SQL_GET_LIST.map(query => getPromise(connection, query, [listId]))

  return Promise.all(promises)
    .then(data => {
      const listInfo = data[0][0]
      const items = { items: data[1] }

      return Object.assign({}, listInfo, items)
    })
}

/**
 * Creates a list and returns it
 */
const SQL_CREATE_LIST = 'INSERT INTO `lists` (`name`) VALUES (?)'

const createList = (connection, params, {name}) => {
  return getPromise(connection, SQL_CREATE_LIST, [name], (resolve, result) => {
    const params = { listId: result.insertId }

    getList(connection, params)
      .then(data => {
        resolve(data)
      })
  })
}

/**
 * Creates a item and returns it
 */
const SQL_CREATE_ITEM = 'INSERT INTO `items` (`listId`, `name`, `value`, `date`) VALUES (?, ?, ?, ?)'
const SQL_GET_ITEM = 'SELECT `id`, `name`, `date`, `value` FROM `items` WHERE `listId` = ? and `id` = ? ORDER BY `date` DESC'

const createItem = (connection, {listId}, {name, value, date}) => {
  return getPromise(connection, SQL_CREATE_ITEM, [listId, name, value, date], (resolve, result) => {
    getPromise(connection, SQL_GET_ITEM, [listId, result.insertId])
      .then(data => resolve(data[0]))
  })
}

/**
 * Deletes the list and returns delete id
 */
const SQL_DELETE_LIST = 'DELETE FROM `lists` WHERE `id` = ?'

const deleteList = (connection, {listId}) => {
  return getPromise(connection, SQL_DELETE_LIST, [listId], (resolve, result) => {
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
  return getPromise(connection, SQL_DELETE_ITEM, [listId, itemId], (resolve, result) => {
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
