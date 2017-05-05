const SQL = 'SELECT * FROM `items` WHERE `list_id` = ? ORDER BY `date` DESC'

module.exports = (connection, listId) => {
  return new Promise((resolve, reject) => {
    connection.query(SQL, [listId], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}
