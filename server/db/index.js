const SQL_GET_LISTS = 'SELECT * FROM `lists`'
const SQL_GET_ITEMS = 'SELECT * FROM `items` WHERE `list_id` = ? ORDER BY `date` DESC'
const SQL_CREATE_LIST = 'INSERT INTO `lists` (`name`) VALUES (?)'
const SQL_CREATE_ITEM = 'INSERT INTO `items` (`list_id`, `name`, `value`, `date`) VALUES (?, ?, ?, ?)'
const SQL_DELETE_LIST = 'DELETE FROM `lists` WHERE `id` = ?'
const SQL_DELETE_ITEM = 'DELETE FROM `items` WHERE `list_id` = ? AND `id` = ?'

module.exports = {
  getLists: (connection) => {
    return new Promise((resolve, reject) => {
      connection.query(SQL_GET_LISTS, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },

  getItems: (connection, {listId}) => {
    return new Promise((resolve, reject) => {
      connection.query(SQL_GET_ITEMS, [listId], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },

  postList: (connection, params, {name}) => {
    return new Promise((resolve, reject) => {
      connection.query(SQL_CREATE_LIST, [name], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve({
            listId: result.insertId
          })
        }
      })
    })
  },

  postItem: (connection, {listId}, {name, value, date}) => {
    return new Promise((resolve, reject) => {
      connection.query(SQL_CREATE_ITEM, [listId, name, value, date], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve({
            listId: Number(listId),
            itemId: result.insertId
          })
        }
      })
    })
  },

  deleteList: (connection, {listId}) => {
    return new Promise((resolve, reject) => {
      connection.query(SQL_DELETE_LIST, [listId], (err, result) => {
        if (err) {
          reject(err)
        } else {
          // TODO: Always returns id if the list was not deleted
          resolve({
            listId: Number(listId)
          })
        }
      })
    })
  },

  deleteItem: (connection, {listId, itemId}) => {
    return new Promise((resolve, reject) => {
      connection.query(SQL_DELETE_ITEM, [listId, itemId], (err, result) => {
        if (err) {
          reject(err)
        } else {
          // TODO: Always returns id, even if the item was not deleted
          resolve({
            listId: Number(listId),
            itemId: Number(itemId)
          })
        }
      })
    })
  }
}
