const statusCodes = require('./status-codes')
const { methods, urls } = require('../../common/api-constants')

const errors = {
  GET_LISTS: 'Cannot retrieve list',
  GET_ITEMS: 'Cannot retrieve list items',
  CREATE_LIST: 'Cannot create list',
  CREATE_ITEM: 'Cannot create list item',
  DELETE_LIST: 'Cannot delete list',
  DELETE_ITEM: 'Cannot delete list item'
}

const routes = {
  // GET methods only retrieve lists/items
  [methods.GET]: {
    statusCode: statusCodes.OK,
    urls: {
      // Gets all lists
      [urls.LISTS]: {
        handler: 'getLists',
        error: errors.GET_LISTS
      },

      // Gets all list items
      [urls.LIST]: {
        handler: 'getList',
        error: errors.GET_ITEMS
      }
    }
  },

  // POST method creates list/items
  [methods.POST]: {
    statusCode: statusCodes.CREATED,
    urls: {
      [urls.LISTS]: {
        handler: 'createList',
        error: errors.CREATE_LIST
      },

      [urls.LIST]: {
        handler: 'createItem',
        error: errors.CREATE_ITEM
      }
    }
  },

  // DELETE method does guess what
  [methods.DELETE]: {
    statusCode: statusCodes.OK,
    urls: {
      [urls.LIST]: {
        handler: 'deleteList',
        error: errors.DELETE_LIST
      },

      [urls.ITEM]: {
        handler: 'deleteItem',
        error: errors.DELETE_ITEM
      }
    }
  }

  // Editing is not implemented for the purpose:
  // there's no such a need yet
}

module.exports = routes
