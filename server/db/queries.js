const getLists = (params = {singleList: false}) => {
  const whereClause = params.singleList
    ? `WHERE lists.id = ?`
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

const listItems = `SELECT id, name, date, value
  FROM items
  WHERE listId = ?
  ORDER BY date DESC`

const createList = `INSERT INTO lists (name)
  VALUES (?)`

const createItem = `INSERT INTO items (listId, name, value, date)
  VALUES (?, ?, ?, ?)`

const getItem = `SELECT id, name, date, value
  FROM items
  WHERE listId = ? AND id = ?`

const deleteList = `DELETE FROM lists
  WHERE id = ?`

const deleteItem = `DELETE FROM items
  WHERE listId = ? AND id = ?`

module.exports = {
  getLists,
  listItems,
  createList,
  createItem,
  getItem,
  deleteList,
  deleteItem
}
