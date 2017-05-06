const statusCodes = require('./status-codes')
const { methods, dataKeys, URIs } = require('../../common/api-constants')

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
    uris: {
      // Gets all lists
      [URIs.LISTS]: {
        dataKey: dataKeys.LISTS,
        error: errors.GET_LISTS
      },

      // Gets all list items
      [URIs.ITEMS]: {
        dataKey: dataKeys.ITEMS,
        error: errors.GET_ITEMS
      }
    }
  },

  // POST method creates list/items
  [methods.POST]: {
    statusCode: statusCodes.CREATED,
    uris: {
      [URIs.LISTS]: {
        dataKey: dataKeys.ONE_LIST,
        error: errors.CREATE_LIST
      },

      [URIs.ITEMS]: {
        dataKey: dataKeys.ONE_ITEM,
        error: errors.CREATE_ITEM
      }
    }
  },

  // DELETE method does guess what
  [methods.DELETE]: {
    statusCode: statusCodes.OK,
    uris: {
      [URIs.ONE_LIST]: {
        dataKey: dataKeys.ONE_LIST,
        error: errors.DELETE_LIST
      },

      [URIs.ONE_ITEM]: {
        dataKey: dataKeys.ONE_ITEM,
        error: errors.DELETE_ITEM
      }
    }
  }

  // Editing is not implemented for the purpose:
  // there's no such a need yet
}

module.exports = routes
