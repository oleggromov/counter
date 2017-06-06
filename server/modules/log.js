const getDateString = require('../../common/get-mysql-date-string')

module.exports = req => {
  const dataString = Object.keys(req.body).length ? `\tdata=${JSON.stringify(req.body)}\t` : '\t'
  const uidString = req.user ? `uid=${req.user.id}\t` : ''

  console.log(`${getDateString(new Date())}\t${req.connection.remoteAddress}\t${uidString}${req.method}${dataString}${req.protocol}://${req.get('host')}${req.originalUrl}`)
}
