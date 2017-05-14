const session = require('express-session')
const passport = require('passport')
const Strategy = require('passport-facebook').Strategy

const cookieSecret = 'bfa6c5df923efce3c06b38e9c85616f9'

module.exports = (app) => {
  passport.use(new Strategy({
    clientID: '470519336672906',
    clientSecret: '5a4dfa6321739f7c89345a25d8220e6b',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  }, (accessToken, refreshToken, profile, done) => {
    return done(null, profile)
  }))

  passport.serializeUser((user, cb) => cb(null, user))
  passport.deserializeUser((obj, cb) => cb(null, obj))

  app.use(session({
    secret: cookieSecret,
    resave: true,
    saveUninitialized: true
  }))

  app.get('/auth/login', (req, res) => {
    res.send(`<a href="/auth/facebook">Enter via Facebook</a>`)
    res.end()
  })

  app.get('/auth/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/auth/login')
  })

  app.use(passport.initialize())
  app.use(passport.session())

  app.get('/auth/facebook', passport.authenticate('facebook'))

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/auth/login'
  }))
}
