const session = require('express-session')
const passport = require('passport')
const Strategy = require('passport-facebook').Strategy
const createAndGetUser = require('./db/create-and-get-user')
const log = require('./modules/log')
const config = require('./config')
const APIResponse = require('./api/api-response')
const deleteUser = require('./db/actions').deleteUser

// Change to production values
const fbAppSecret = '5a4dfa6321739f7c89345a25d8220e6b'
const cookieSecret = 'bfa6c5df923efce3c06b38e9c85616f9'

const URLs = require('../common/api-constants').urls

module.exports = (app) => {
  passport.use(new Strategy({
    clientID: '470519336672906',
    clientSecret: fbAppSecret,
    callbackURL: `${config.protocol}://${config.host}:${config.port}${URLs.AUTH_FB_CB}`,
    profileFields: ['id', 'displayName', 'photos']
  }, (accessToken, refreshToken, profile, done) => {
    // TODO understand what happens here
    createAndGetUser(profile.id)
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

  app.get(URLs.AUTH_LOGIN, (req, res, next) => {
    log(req)
    if (req.isAuthenticated()) {
      res.redirect(URLs.MAIN)
    } else {
      next()
    }
  })

  app.get(URLs.AUTH_LOGOUT, (req, res) => {
    log(req)
    req.session.destroy()
    res.redirect(URLs.AUTH_LOGIN)
  })

  app.get(URLs.AUTH_FB_REDIR, passport.authenticate('facebook'))

  app.get(URLs.AUTH_FB_CB, passport.authenticate('facebook', {
    successRedirect: URLs.MAIN,
    failureRedirect: URLs.AUTH_LOGIN
  }))

  app.get(URLs.AUTH_INFO, (req, res) => {
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

  app.delete(URLs.AUTH_DELETE, (req, res) => {
    log(req)

    if (req.isAuthenticated()) {
      const sendResponse = response => {
        res.status(response.status)
        res.json(response.toData())
        res.end()
        req.session.destroy()
      }

      deleteUser(req.user.id).then(sendResponse, sendResponse)
    } else {
      res.status(APIResponse.CODES.UNAUTHORIZED)
      res.send({
        error: 'Unauthorized',
        data: null
      })
    }
  })
}
