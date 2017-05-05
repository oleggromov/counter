const SQL = 'INSERT INTO `items` (`list_id`, `name`, `value`, `date`) VALUES (?, ?, ?, ?)'

module.exports = (connection, listId, {name, value, date}) => {
  return new Promise((resolve, reject) => {
    connection.query(SQL, [listId, name, value, date], (err, result) => {
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
}
