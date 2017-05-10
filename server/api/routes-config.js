const { methods, urls } = require('../../common/api-constants')
const codes = require('./api-response').CODES

const routes = {
  // GET methods only retrieve lists/items
  [methods.GET]: {
    // Gets all lists
    [urls.LISTS]: {
      handlers: [
        {
          queries: [
            {
              name: 'Retrieving lists',
              query: 'getLists',
              resultKey: 'lists'
            }
          ]
        }
      ]
    },

    // Gets all list items
    [urls.LIST]: {
      handlers: [
        {
          queries: [
            {
              name: 'Retrieving list',
              query: 'getList',
              params: ['listId'],
              emptyError: {
                code: codes.NOT_FOUND,
                text: 'list doesn\'t exist'
              }
            },
            {
              name: 'Retrieving list items',
              query: 'listItems',
              params: ['listId'],
              resultKey: 'items'
            }
          ]
        }
      ]
    }
  },

  // POST method creates list/items
  [methods.POST]: {
    // Creates a list and returns it back
    [urls.LISTS]: {
      handlers: [
        {
          id: 'create',
          queries: [
            {
              name: 'Creating list',
              query: 'createList',
              params: ['name']
            }
          ]
        },
        {
          queries: [
            {
              name: 'Retrieving created list',
              code: codes.CREATED,
              query: 'getList',
              params: ['create.insertId']
            }
          ]
        }
      ]
    },

    // Creates an item and returns it back
    [urls.LIST]: {
      handlers: [
        {
          id: 'create',
          queries: [
            {
              name: 'Creating item',
              query: 'createItem',
              params: ['listId', 'name', 'value', 'date'],
              error: {
                text: 'Cannot create list item'
              }
            }
          ]
        },
        {
          queries: [
            {
              name: 'Retreiving created item',
              code: codes.CREATED,
              query: 'getItem',
              params: ['listId', 'create.insertId']
            }
          ]
        }
      ]
    }
  },

  // DELETE method does guess what
  [methods.DELETE]: {
    [urls.LIST]: {
      handlers: [
        {
          queries: [
            {
              name: 'Deleting list',
              query: 'deleteList',
              type: 'delete',
              params: ['listId'],
              noRowsError: {
                code: codes.GONE,
                text: 'Cannot delete list'
              }
            }
          ]
        }
      ]
    },

    [urls.ITEM]: {
      handlers: [
        {
          queries: [
            {
              name: 'Deleting item',
              query: 'deleteItem',
              params: ['listId', 'itemId'],
              type: 'delete',
              noRowsError: {
                code: codes.GONE,
                text: 'Cannot delete list item'
              }
            }
          ]
        }
      ]
    }
  }

  // Editing is not implemented for the purpose:
  // there's no such a need yet
}

module.exports = routes
