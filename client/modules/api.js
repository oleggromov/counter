const Request = window.Request
const fetch = window.fetch

const profilingEnabled = true
const profile = name => {
  profilingEnabled && console.time(`api:${name}`)
}
const profileEnd = name => {
  profilingEnabled && console.timeEnd(`api:${name}`)
}

const URIs = {
  getLists: '/api/0.1/lists',
  createList: '/api/0.1/lists',
  deleteList: '/api/0.1/lists/:listId'
}

const getLists = () => {
  profile('getLists')
  const req = new Request(URIs.getLists)
  return fetch(req)
    .then(response => {
      return response.json()
        .then(data => {
          profileEnd('getLists')
          if (response.ok) {
            return data
          }
          throw data
        })
    })
}

const createList = (list) => {
  profile('createList')
  const req = new Request(URIs.createList, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(list)
  })

  return fetch(req)
    .then(response => {
      return response.json()
        .then(data => {
          profileEnd('createList')
          if (response.ok) {
            return data
          }
          throw data
        })
    })
}

const deleteList = (id) => {
  profile('deleteList')
  const req = new Request(URIs.deleteList.replace(':listId', id), {
    method: 'DELETE'
  })

  return fetch(req)
    .then(response => {
      return response.json()
        .then(data => {
          profileEnd('deleteList')
          if (response.ok) {
            return data
          }
          throw data
        })
    })
}

export default {
  getLists,
  // getItems,
  createList,
  // createItem,
  deleteList
  // deleteItem
}
