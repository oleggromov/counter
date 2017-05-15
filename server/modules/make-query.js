const connection = require('../modules/get-connection')()
const promisify = require('es6-promisify')

module.exports = promisify(connection.query, connection)
