import cloneDeep from 'lodash/cloneDeep'
import { getMysqlDateString, getDiffInSeconds } from './date-helpers'

const Headers = window.Headers
const Request = window.Request
const fetch = window.fetch

// 15 minutes
const maxDeletableAge = 60 * 15

const {
  apiRoot,
  methods,
  urls
} = require('../../common/api-constants')

const requestTypes = {
  GET_LISTS: 'getLists',
  CREATE_LIST: 'createList',
  DELETE_LIST: 'deleteList',
  GET_LIST: 'getList',
  CREATE_ITEM: 'createItem',
  DELETE_ITEM: 'deleteItem',
  GET_AUTH_INFO: 'getAuthInfo',
  DELETE_DATA: 'deleteData'
}

const getFullUrl = path => {
  return `${apiRoot}/${path}`.replace(/\/+/g, '/')
}

const jsonHeaders = new Headers()
jsonHeaders.append('Accept', 'application/json')
jsonHeaders.append('Content-Type', 'application/json')

const requests = {
  [requestTypes.GET_LISTS]: {
    url: getFullUrl(urls.LISTS),
    method: methods.GET
  },

  [requestTypes.CREATE_LIST]: {
    url: getFullUrl(urls.LISTS),
    method: methods.POST,
    headers: jsonHeaders
  },

  [requestTypes.DELETE_LIST]: {
    url: getFullUrl(urls.LIST),
    method: methods.DELETE
  },

  [requestTypes.GET_LIST]: {
    url: getFullUrl(urls.LIST),
    method: methods.GET
  },

  [requestTypes.CREATE_ITEM]: {
    url: getFullUrl(urls.LIST),
    method: methods.POST,
    headers: jsonHeaders
  },

  [requestTypes.DELETE_ITEM]: {
    url: getFullUrl(urls.ITEM),
    method: methods.DELETE
  },

  [requestTypes.GET_AUTH_INFO]: {
    url: '/auth/info',
    method: methods.GET
  },

  [requestTypes.DELETE_DATA]: {
    url: '/auth/delete',
    method: methods.DELETE
  }
}

const profilingEnabled = true
const profile = name => {
  profilingEnabled && console.time(`api:${name}`)
}
const profileEnd = name => {
  profilingEnabled && console.timeEnd(`api:${name}`)
}

const getParametrizedUrl = (url, params = {}) => {
  const supportedParams = ['listId', 'itemId']
  supportedParams.forEach(param => {
    if (params[param]) {
      url = url.replace(`:${param}`, params[param])
    }
  })
  return url
}

const getReqData = (method, bodyData, headers) => {
  let data = {
    credentials: 'include',
    method
  }

  if (bodyData) {
    data.body = JSON.stringify(bodyData)
  }

  if (headers) {
    data.headers = headers
  }

  return data
}

const defaultDataProcessor = data => data
const makeApiRequest = (type, bodyData, urlData, dataProcessor = defaultDataProcessor) => {
  profile(type)

  const reqParams = requests[type]
  const url = getParametrizedUrl(reqParams.url, urlData)
  const reqData = getReqData(reqParams.method, bodyData, reqParams.headers)
  const req = new Request(url, reqData)

  return fetch(req)
    .then(response => {
      return response.json()
        .then(data => {
          profileEnd(type)

          if (response.ok) {
            return dataProcessor(data)
          }
          throw data
        })
    })
}

const markDeletableItem = (data) => {
  let newData = cloneDeep(data)
  newData.data.isDeletable = getDiffInSeconds(data.data.date, Date.now()) < maxDeletableAge
  return newData
}

const markDeletableList = (data) => {
  const now = Date.now()
  let newData = cloneDeep(data)

  newData.data.items = newData.data.items.map(item => {
    item.isDeletable = getDiffInSeconds(item.date, now) < maxDeletableAge
    return item
  })
  return newData
}

export default {
  [requestTypes.GET_LISTS]: () => makeApiRequest(requestTypes.GET_LISTS),
  [requestTypes.CREATE_LIST]: (listData) => makeApiRequest(requestTypes.CREATE_LIST, listData),
  [requestTypes.DELETE_LIST]: (listId) => makeApiRequest(requestTypes.DELETE_LIST, null, {listId}),
  [requestTypes.GET_LIST]: (listId) => makeApiRequest(requestTypes.GET_LIST, null, {listId}, markDeletableList),
  [requestTypes.CREATE_ITEM]: (listId, itemData) => {
    itemData = Object.assign({}, itemData, {
      date: getMysqlDateString(new Date())
    })
    return makeApiRequest(requestTypes.CREATE_ITEM, itemData, {listId}, markDeletableItem)
  },
  [requestTypes.DELETE_ITEM]: (listId, itemId) => makeApiRequest(requestTypes.DELETE_ITEM, null, {listId, itemId}),
  [requestTypes.GET_AUTH_INFO]: () => makeApiRequest(requestTypes.GET_AUTH_INFO),
  [requestTypes.DELETE_DATA]: () => makeApiRequest(requestTypes.DELETE_DATA)
}
