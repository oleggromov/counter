const mysql = require('mysql')
const dbConfig = require('../config').db

const enableDebug = false

const getConnection = () => {
  const config = Object.assign({}, dbConfig, {
    debug: enableDebug
  })

  return mysql.createPool(config)
}

module.exports = getConnection
