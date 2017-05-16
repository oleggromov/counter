const apiRoot = '/api/'

const methods = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete'
}

const urls = {
  LISTS: `/lists`,
  LIST: `/lists/:listId`,
  ITEM: `/lists/:listId/:itemId`,
  AUTH_INFO: '/auth/info',
  AUTH_LOGOUT: '/auth/logout'
}

module.exports = {
  apiRoot,
  methods,
  urls
}
