const { methods, urls } = require('../../common/api-constants')
const codes = require('./api-response').CODES

const routes = {
  // GET methods only retrieve lists/items
  [methods.GET]: {
    // Gets all lists
    [urls.LISTS]: [
      [{
        name: 'getLists',
        error: {
          text: 'Cannot retrieve lists'
        }
      }]
    ],

    // Gets all list items
    [urls.LIST]: [
      [{
        name: 'getLists',
        params: ['listId'],
        error: {
          code: codes.NOT_FOUND,
          text: 'Cannot retrieve list items'
        }
      }],
      [{
        name: 'listItems',
        params: ['listId'],
        resultKey: 'items'
      }]
    ]
  },

  // POST method creates list/items
  [methods.POST]: {
    // Creates a list and returns it back
    [urls.LISTS]: [
      [
        {
          name: 'createList',
          params: ['name'],
          error: {
            text: 'Cannot create list'
          }
        },
        {
          code: codes.CREATED,
          name: 'getList',
          params: ['result.insertedId']
        }
      ]
    ],

    // Creates an item and returns it back
    [urls.LIST]: [
      [
        {
          name: 'createItem',
          params: ['listId', 'name', 'value', 'date'],
          error: {
            text: 'Cannot create list item'
          }
        },
        {
          code: codes.CREATED,
          name: 'getItem',
          params: ['listId', 'result.insertedId']
        }
      ]
    ]
  },

  // DELETE method does guess what
  [methods.DELETE]: {
    [urls.LIST]: [
      [{
        name: 'deleteList',
        params: ['listId'],
        error: {
          code: codes.GONE,
          text: 'Cannot delete list'
        }
      }]
    ],

    [urls.ITEM]: [
      [{
        name: 'deleteItem',
        params: ['listId', 'itemId'],
        error: {
          code: codes.GONE,
          text: 'Cannot delete list item'
        }
      }]
    ]
  }

  // Editing is not implemented for the purpose:
  // there's no such a need yet
}

module.exports = routes
