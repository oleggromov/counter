const express = require('express')
const apiRouter = express.Router()

const getMessage = (data) => {
  return Object.assign({
    message: 'Ok',
    error: null,
    data: null
  }, data)
}

apiRouter.get('/lists', (req, res) => {
  console.log('Trying to GET /lists')

  const result = getMessage({
    data: {
      lists: []
    }
  })

  res.json(result)
  res.end()
})

apiRouter.post('/lists', (req, res) => {
  console.log('Trying to POST /lists')

  const result = getMessage({
    data: {
      newId: Math.floor(Math.random() * 1000),
      newItem: {}
    }
  })

  // Will it be created before sending an answer?
  // Otherwise change to 202
  // (http://restfulapi.net/http-status-codes/)
  res.status(201)
  res.json(result)
  res.end()
})

apiRouter.delete('/lists/:id', (req, res) => {
  console.log(`Trying to DELETE /lists/${req.params.id}`)

  const result = getMessage({
    data: {
      deletedId: Number(req.params.id)
    }
  })

  res.json(result)
  res.end()
})

apiRouter.get('/lists/:id', (req, res) => {
  console.log(`Trying to GET /lists/${req.params.id}`)

  const result = getMessage({
    data: {
      id: 1,
      name: 'Test list',
      nextId: 1234,
      items: []
    }
  })

  res.json(result)
  res.end()
})

apiRouter.post('/lists/:id', (req, res) => {
  console.log(`Trying to POST /lists/${req.params.id}`)

  const result = getMessage({
    data: {
      newId: Math.floor(Math.random() * 1000),
      newItem: {}
    }
  })

  // Will it be created before sending an answer?
  // Otherwise change to 202
  // (http://restfulapi.net/http-status-codes/)
  res.status(201)
  res.json(result)
  res.end()
})

apiRouter.delete('/lists/:id/:itemId', (req, res) => {
  console.log(`Trying to DELETE /lists/${req.params.id}/${req.params.itemId}`)

  const result = getMessage({
    data: {
      deletedId: Number(req.params.itemId),
      listId: Number(req.params.id)
    }
  })

  res.json(result)
  res.end()
})

apiRouter.use((req, res) => {
  const result = getMessage({
    message: 'Bad request',
    error: 'There\'s no such method or URI'
  })

  res.status(400)
  res.json(result)
  res.end()
})

module.exports = apiRouter
