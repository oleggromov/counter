const SQL = 'INSERT INTO `lists` (`name`) VALUES (?)'

module.exports = (connection, data) => {
  return new Promise((resolve, reject) => {
    connection.query(SQL, [data.name], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result.insertId)
      }
    })
  })
}
