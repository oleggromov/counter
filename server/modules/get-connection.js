const mysql = require('mysql')
const dbConfig = require('../config')(process.env.NODE_ENV === 'production').db

const enableDebug = false

const getConnection = () => {
  const config = Object.assign({}, dbConfig, {
    debug: enableDebug
  })

  return mysql.createConnection(config)
}

module.exports = getConnection
