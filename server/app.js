const express = require('express')
const config = require('./config')
const resolveToRoot = require('./modules/resolve-to-root')
const apiRouter = require('./api-router')

const app = express()
const staticPath = resolveToRoot(config.staticPath)

app.use('/', express.static(staticPath))
console.log(`Serving static from ${staticPath}`)

app.use(`/api/${config.apiVersionUrl}/`, apiRouter)

app.listen(config.port, () => console.log(`Server is running on ${config.port}`))
