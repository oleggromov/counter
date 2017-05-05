const SQL = 'DELETE FROM `items` WHERE `list_id` = ? AND `id` = ?'

module.exports = (connection, listId, itemId) => {
  return new Promise((resolve, reject) => {
    connection.query(SQL, [listId, itemId], (err, result) => {
      if (err) {
        reject(err)
      } else {
        // TODO: Always returns id, even if the item was not deleted
        resolve({
          listId,
          itemId
        })
      }
    })
  })
}
