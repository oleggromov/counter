const statusCodes = require('./status-codes')
const { methods, urls } = require('../../common/api-constants')

const routes = {
  // GET methods only retrieve lists/items
  [methods.GET]: {
    statusCode: statusCodes.OK,
    urls: {
      // Gets all lists
      [urls.LISTS]: {
        handler: 'getLists',
        error: 'Cannot retrieve lists'
      },

      // Gets all list items
      [urls.LIST]: {
        handler: 'getList',
        error: 'Cannot retrieve list items'
      }
    }
  },

  // POST method creates list/items
  [methods.POST]: {
    statusCode: statusCodes.CREATED,
    urls: {
      [urls.LISTS]: {
        handler: 'createList',
        error: 'Cannot create list'
      },

      [urls.LIST]: {
        handler: 'createItem',
        error: 'Cannot create list item'
      }
    }
  },

  // DELETE method does guess what
  [methods.DELETE]: {
    statusCode: statusCodes.OK,
    urls: {
      [urls.LIST]: {
        handler: 'deleteList',
        error: 'Cannot delete list'
      },

      [urls.ITEM]: {
        handler: 'deleteItem',
        error: 'Cannot delete list item'
      }
    }
  }

  // Editing is not implemented for the purpose:
  // there's no such a need yet
}

module.exports = routes
