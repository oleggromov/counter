const apiRoot = '/api/'

const methods = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete'
}

const urls = {
  MAIN: '/',

  LISTS: `/lists`,
  LIST: `/lists/:listId`,
  ITEM: `/lists/:listId/:itemId`,

  AUTH_FB_REDIR: '/auth/facebook',
  AUTH_FB_CB: '/auth/facebook/callback',
  AUTH_LOGIN: '/auth/login',
  AUTH_INFO: '/auth/info',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_DELETE: '/auth/delete'
}

module.exports = {
  apiRoot,
  methods,
  urls
}
