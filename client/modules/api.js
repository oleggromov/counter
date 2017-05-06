const Request = window.Request
const fetch = window.fetch

const {
  apiRoot,
  methods,
  URIs
} = require('../../common/api-constants')

const requestTypes = {
  GET_LISTS: 'getLists',
  CREATE_LIST: 'createList',
  DELETE_LIST: 'deleteList'
}

const getFullUrl = path => {
  return `${apiRoot}/${path}`.replace(/\/+/g, '/')
}

const jsonHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const requests = {
  [requestTypes.GET_LISTS]: {
    uri: getFullUrl(URIs.LISTS),
    method: methods.GET
  },

  [requestTypes.CREATE_LIST]: {
    uri: getFullUrl(URIs.LISTS),
    method: methods.POST,
    headers: jsonHeaders
  },

  [requestTypes.DELETE_LIST]: {
    uri: getFullUrl(URIs.ONE_LIST),
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

const makeApiRequest = (type, bodyData, uriData) => {
  profile(type)

  const reqParams = requests[type]
  const url = getParametrizedUrl(reqParams.uri, uriData)
  const req = new Request(url, {
    method: reqParams.method,
    body: bodyData ? JSON.stringify(bodyData) : null,
    headers: reqParams.headers || null
  })

  return fetch(req)
    .then(response => {
      return response.json()
        .then(data => {
          profileEnd(type)

          if (response.ok) {
            return data
          }
          throw data
        })
    })
}

export default {
  [requestTypes.GET_LISTS]: () => makeApiRequest(requestTypes.GET_LISTS),
  [requestTypes.CREATE_LIST]: (list) => makeApiRequest(requestTypes.CREATE_LIST, list),
  [requestTypes.DELETE_LIST]: (id) => makeApiRequest(requestTypes.DELETE_LIST, null, {listId: id})
}
