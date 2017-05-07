const apiRoot = '/api/'

const methods = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete'
}

const urls = {
  LISTS: `/lists`,
  LIST: `/lists/:listId`,
  ITEM: `/lists/:listId/:itemId`
}

module.exports = {
  apiRoot,
  methods,
  urls
}
