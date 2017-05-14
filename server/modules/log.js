module.exports = req => {
  const dataString = Object.keys(req.body).length ? ` data=${JSON.stringify(req.body)} ` : ' '
  const uidString = req.user ? `uid=${req.user.id} ` : ''

  console.log(`${uidString}${req.method}${dataString}${req.protocol}://${req.get('host')}${req.originalUrl}`)
}
