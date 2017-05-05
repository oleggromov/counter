const sql = {
  GET_LISTS: 'SELECT * FROM `lists`',
  GET_ITEMS: 'SELECT * FROM `items` WHERE `list_id` = ? ORDER BY `date` DESC',
  CREATE_LIST: 'INSERT INTO `lists` (`name`) VALUES (?)',
  CREATE_ITEM: 'INSERT INTO `items` (`list_id`, `name`, `value`, `date`) VALUES (?, ?, ?, ?)',
  DELETE_LIST: 'DELETE FROM `lists` WHERE `id` = ?',
  DELETE_ITEM: 'DELETE FROM `items` WHERE `list_id` = ? AND `id` = ?'
}

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

module.exports = {
  getLists: connection => getPromise(connection, sql.GET_LISTS),

  getItems: (connection, {listId}) => getPromise(connection, sql.GET_ITEMS, [listId]),

  postList: (connection, params, {name}) => {
    return getPromise(connection, sql.CREATE_LIST, [name], (resolve, result) => {
      resolve({
        listId: result.insertId
      })
    })
  },

  postItem: (connection, {listId}, {name, value, date}) => {
    return getPromise(connection, sql.CREATE_ITEM, [listId, name, value, date], (resolve, result) => {
      resolve({
        listId: Number(listId),
        itemId: result.insertId
      })
    })
  },

  deleteList: (connection, {listId}) => {
    return getPromise(connection, sql.DELETE_LIST, [listId], (resolve, result) => {
      // TODO: Always returns id, even if the list was not deleted
      resolve({
        listId: Number(listId)
      })
    })
  },

  deleteItem: (connection, {listId, itemId}) => {
    return getPromise(connection, sql.DELETE_ITEM, [listId, itemId], (resolve, result) => {
      // TODO: Always returns id, even if the item was not deleted
      resolve({
        listId: Number(listId),
        itemId: Number(itemId)
      })
    })
  }
}
