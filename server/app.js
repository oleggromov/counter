const express = require('express')
const path = require('path')
const app = express()
const apiRouter = require('./api-router')

const apiVersion = '0.1'
const port = process.env.NODE_ENV === 'production' ? 80 : 3000

const staticPath = path.resolve(__dirname, './public')
app.use('/', express.static(staticPath))
console.log(`Serving static from ${staticPath}`)

app.use(`/api/${apiVersion}/`, apiRouter)

app.listen(port, () => console.log(`Server is running on ${port}`))
