const statusCodes = require('./status-codes')

const methods = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete'
}

const dataKeys = {
  LISTS: 'lists',
  ITEMS: 'items',
  ONE_LIST: 'list',
  ONE_ITEM: 'item'
}

const URIs = {
  LISTS: `/${dataKeys.LISTS}`,
  ITEMS: `/${dataKeys.LISTS}/:listId/${dataKeys.ITEMS}`,
  ONE_LIST: `/${dataKeys.LISTS}/:listId`,
  ONE_ITEM: `/${dataKeys.LISTS}/:listId/${dataKeys.ITEMS}/:itemId`
}

const errors = {
  GET_LISTS_ERROR: 'Cannot retrieve list',
  GET_ITEMS_ERROR: 'Cannot retrieve list items',
  CREATE_LIST_ERROR: 'Cannot create list',
  CREATE_ITEM_ERROR: 'Cannot create list item',
  DELETE_LIST_ERROR: 'Cannot delete list',
  DELETE_ITEM_ERROR: 'Cannot delete list item'
}

const routes = {
  [methods.GET]: {
    statusCode: statusCodes.OK,
    uris: {
      // Gets all lists
      [URIs.LISTS]: {
        dataKey: dataKeys.LISTS,
        error: errors.GET_LISTS_ERROR
      },

      // Gets all list items
      [URIs.ITEMS]: {
        dataKey: dataKeys.ITEMS,
        error: errors.GET_ITEMS_ERROR
      }
    }
  },

  [methods.POST]: {
    statusCode: statusCodes.CREATED,
    uris: {
      [URIs.LISTS]: {
        dataKey: dataKeys.ONE_LIST,
        error: errors.CREATE_LIST_ERROR
      },

      [URIs.ITEMS]: {
        dataKey: dataKeys.ONE_ITEM,
        error: errors.CREATE_ITEM_ERROR
      }
    }
  },

  [methods.DELETE]: {
    statusCode: statusCodes.OK,
    uris: {
      [URIs.ONE_LIST]: {
        dataKey: dataKeys.ONE_LIST,
        error: errors.DELETE_LIST_ERROR
      },

      [URIs.ONE_ITEM]: {
        dataKey: dataKeys.ONE_ITEM,
        error: errors.DELETE_ITEM_ERROR
      }
    }
  }
}

module.exports = routes
