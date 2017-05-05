const express = require('express')
const config = require('./config')
const resolveToRoot = require('./modules/resolve-to-root')
const apiRouter = require('./api/router')

const app = express()

// API requests go first
app.use(`/api/${config.apiVersionUrl}/`, apiRouter)

// Everything that is found in public/ directory is served as static
app.use('/', express.static(resolveToRoot(config.staticPath), {
  fallthrough: true
}))

// And if nothing was found, send index.html by default
app.use(/.*/, (req, res) => {
  res.sendFile(resolveToRoot('public/index.html'))
})

app.listen(config.port, () => console.log(`Server is running on ${config.port}`))
