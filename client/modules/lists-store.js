import moment from 'moment'
import cloneDeep from 'lodash/cloneDeep'
import pick from 'lodash/pick'
import localStorage from './local-storage.js'

const profilingEnabled = false

function profile (name) {
  profilingEnabled && console.time(`listsStore:${name}`)
}

function profileEnd (name) {
  profilingEnabled && console.timeEnd(`listsStore:${name}`)
}

const canBeDeleted = {
  maxAge: 15,
  unit: 'minutes'
}

function markDeletable (list) {
  const now = moment()

  list.items = list.items.map(item => {
    let newItem = cloneDeep(item)
    const age = now.diff(moment(item.date), canBeDeleted.unit)

    newItem.isDeletable = age < canBeDeleted.maxAge

    return newItem
  })

  return list
}

function createList (id) {
  return {
    id,
    url: '',
    nextId: 0,
    items: []
  }
}

function listGet (id) {
  profile('listGet')

  const lists = listsGet()

  let requestedList = lists.reduce((acc, cur) => {
    if (cur.id === id) {
      return cur
    }
    return acc
  }, null)

  profileEnd('listGet')

  return requestedList
}

function listsGet () {
  const data = localStorage.get()
  return data.lists
}

// function listAdd (name) {}

// function listDelete (id) {}

// function listEdit (id, name) {}

function replaceList (id, newList) {
  profile('replaceList')

  let replaced = false

  let lists = listsGet().map(oldList => {
    if (oldList.id === id) {
      replaced = true
      return newList
    } else {
      return oldList
    }
  })

  if (!replaced) {
    lists.push(newList)
  }

  localStorage.set({ lists })

  profileEnd('replaceList')
}

// TODO rewrite this, it's too slow
function itemAdd (listId, item) {
  profile('itemAdd')

  let list = listGet(listId)

  // TODO delete this
  if (!list) {
    list = createList(listId)
  }

  let newItem = pick(item, ['amount', 'type'])

  newItem.id = list.nextId++
  newItem.date = moment().format('YYYY-MM-DD HH:mm:ss')

  list.items.unshift(newItem)

  replaceList(listId, list)

  profileEnd('itemAdd')
}

function itemDelete (listId, itemId) {
  profile('itemDelete')

  let list = listGet(listId)
  list.items = list.items.filter(item => {
    return item.id !== itemId
  })

  replaceList(listId, list)

  profileEnd('itemDelete')
}

export default {
  listGet: function listGetDecoratedDeletable (...args) {
    const result = listGet(...args)
    return result
      ? markDeletable(result)
      : null
  },
  // listsGet,
  // listAdd,
  // listDelete,
  // listEdit,
  itemAdd,
  itemDelete
}
