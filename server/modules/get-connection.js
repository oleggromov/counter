const mysql = require('mysql')
const dbConfig = require('../config').db

const getConnection = () => {
  return mysql.createConnection(dbConfig)
}

module.exports = getConnection
