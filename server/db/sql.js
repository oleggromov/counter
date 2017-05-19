// const PERMISSIONS_TABLE = 'permissions'
// const LISTS_TABLE = 'lists'
// const ITEMS_TABLE = 'items'
// const USERS_TABLE = 'users'

const getQueryGetLists = ({ singleList }) => {
  const whereClause = singleList
    ? `WHERE lists.id = ?`
    // Default behavior is to find only lists the user has permission
    // to view, i.e. has created himself
    : `WHERE lists.id IN
        (SELECT listId FROM permissions WHERE userId = ?)`

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

const getList = getQueryGetLists({ singleList: true })
const getLists = getQueryGetLists({ singleList: false })

module.exports = {
  getList,
  getLists,

  listItems: `SELECT id, name, date, value
    FROM items
    WHERE listId = ?
    ORDER BY date DESC`,

  createList: `INSERT INTO lists (name)
    VALUES (?)`,

  createItem: `INSERT INTO items (listId, name, value, date)
    VALUES (?, ?, ?, ?)`,

  getItem: `SELECT id, name, date, value
    FROM items
    WHERE listId = ? AND id = ?`,

  deleteList: `DELETE FROM lists
    WHERE id = ?`,

  deleteItem: `DELETE FROM items
    WHERE listId = ? AND id = ?`,

  getUser: `SELECT id FROM users
    WHERE facebookId = ?`,

  // TODO: auto increment increases like a crazy because of this
  // "on duplicate key update". Perhaps it could become an issue
  // some time.
  addUser: `INSERT INTO users (facebookId)
    VALUES (?)
    ON DUPLICATE KEY UPDATE facebookId = facebookId`,

  hasPermission: `SELECT * FROM permissions
    WHERE userId = ? AND listId = ?`,

  addPermission: `INSERT INTO permissions (userId, listId)
    VALUES (?, ?)`,

  deletePermission: `DELETE FROM permissions WHERE userId = ? AND listId = ?`,

  getUserListIds: `SELECT listId FROM permissions WHERE userId = ?`,

  deleteAllItems: `DELETE FROM items WHERE listId IN (?)`,

  deleteAllUserPermissions: `DELETE FROM permissions WHERE userId = ?`,

  deleteAllListsIn: `DELETE FROM lists WHERE id IN (?)`,

  deleteUser: `DELETE FROM users WHERE id = ?`
}
