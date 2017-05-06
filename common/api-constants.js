const apiRoot = '/api/'

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

module.exports = {
  apiRoot,
  methods,
  dataKeys,
  URIs
}
