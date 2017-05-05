const express = require('express')
const apiRouter = express.Router()
const bodyParser = require('body-parser')
const getConnection = require('./modules/get-connection')
const connection = getConnection()
const db = require('./db')

const returnError = (res, type, code = 500) => {
  return (data) => {
    res.status(code)
    res.json({
      error: {
        type,
        data
      },
      data: null
    })
    res.end()
  }
}

const returnData = (res, dataKey, code = 200) => {
  return (data) => {
    res.status(code)
    res.json({
      error: null,
      data: {
        [dataKey]: data
      }
    })
    res.end()
  }
}

// API calls get JSON input
apiRouter.use(bodyParser.json())

// Returns array of lists without items
apiRouter.get('/lists', (req, res) => {
  db.getLists(connection)
    .then(returnData(res, 'lists'))
    .catch(returnError(res, 'DB error: cannot retrieve list'))
})

// Creates a list and returns its id
apiRouter.post('/lists', (req, res) => {
  db.createList(connection, req.body)
    .then(returnData(res, 'listId', 201))
    .catch(returnError(res, 'DB error: cannot create list'))
})

// Deletes the list and returns id of deleted list
// TODO: always returns this id even if the list was delete beforehand
apiRouter.delete('/lists/:id', (req, res) => {
  db.deleteList(connection, req.params.id)
    .then(returnData(res, 'deletedListId'))
    .catch(returnError(res, 'DB error: cannot delete list'))
})

// Returns array of list elements
apiRouter.get('/lists/:id/items', (req, res) => {
  db.getListItems(connection, req.params.id)
    .then(returnData(res, 'listItems'))
    .catch(returnError(res, 'DB error: cannot retrieve list items'))
})

// Creates an item and returns its and list's id
apiRouter.post('/lists/:id/items', (req, res) => {
  db.createItem(connection, req.params.id, req.body)
    .then(returnData(res, 'item', 201))
    .catch(returnError(res, 'DB error: cannot create item'))
})

apiRouter.delete('/lists/:listId/items/:itemId', (req, res) => {
  const {
    listId,
    itemId
  } = req.params

  db.deleteItem(connection, listId, itemId)
    .then(returnData(res, 'deletedItem'))
    .catch(returnError(res, 'DB error: cannot delete item'))
})

apiRouter.use((req, res) => {
  returnError(res, 'Bad request: there\'s no such method or URI', 400)()
})

module.exports = apiRouter
