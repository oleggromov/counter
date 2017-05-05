const SQL = 'SELECT * FROM `lists`'

module.exports = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(SQL, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}
