module.exports = (notLoggedCb) => {
  return (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return notLoggedCb(req, res)
    }

    next()
  }
}
