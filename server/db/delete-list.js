const SQL = 'DELETE FROM `lists` WHERE `id` = ?'

module.exports = (connection, listId) => {
  return new Promise((resolve, reject) => {
    connection.query(SQL, [listId], (err, result) => {
      if (err) {
        reject(err)
      } else {
        // TODO: Always returns id if the list was not deleted
        resolve(listId)
      }
    })
  })
}
