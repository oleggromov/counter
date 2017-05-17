const session = require('express-session')
const passport = require('passport')
const Strategy = require('passport-facebook').Strategy
const dbActions = require('./db/actions')
const log = require('./modules/log')
const config = require('./config')
const APIResponse = require('./api/api-response')

// Change to production values
const fbAppSecret = '5a4dfa6321739f7c89345a25d8220e6b'
const cookieSecret = 'bfa6c5df923efce3c06b38e9c85616f9'

const loginedUrl = '/'
const loginUrl = '/auth/login'
const logoutUrl = '/auth/logout'
const facebookRedirectUrl = '/auth/facebook'
const facebookCbUrl = '/auth/facebook/callback'
const loginInfo = '/auth/info'

module.exports = (app) => {
  passport.use(new Strategy({
    clientID: '470519336672906',
    clientSecret: fbAppSecret,
    callbackURL: `${config.protocol}://${config.host}:${config.port}${facebookCbUrl}`,
    profileFields: ['id', 'displayName', 'photos']
  }, (accessToken, refreshToken, profile, done) => {
    // TODO understand what happens here
    dbActions.createAndGetUser(profile.id)
      .then(id => {
        done(null, {
          id,
          name: profile.displayName,
          picture: profile.photos[0].value
        })
      })
      .catch(err => {
        done(err)
      })
  }))

  passport.serializeUser((user, cb) => cb(null, user))
  passport.deserializeUser((obj, cb) => cb(null, obj))

  app.use(session({
    name: 'sid',
    secret: cookieSecret,
    resave: true,
    saveUninitialized: true
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  app.get(loginUrl, (req, res, next) => {
    log(req)
    if (req.isAuthenticated()) {
      res.redirect(loginedUrl)
    } else {
      next()
    }
  })

  app.get(logoutUrl, (req, res) => {
    log(req)
    req.session.destroy()
    res.redirect(loginUrl)
  })

  app.get(facebookRedirectUrl, passport.authenticate('facebook'))

  app.get(facebookCbUrl, passport.authenticate('facebook', {
    successRedirect: loginedUrl,
    failureRedirect: loginUrl
  }))

  app.get(loginInfo, (req, res) => {
    // TODO: we do not want to set cookie on this response
    if (req.isAuthenticated()) {
      res.status(APIResponse.CODES.OK)
      res.send({
        error: null,
        data: req.user
      })
    } else {
      res.status(APIResponse.CODES.UNAUTHORIZED)
      res.send({
        error: 'There\'s no active session',
        data: null
      })
    }
    res.end()
  })
}
