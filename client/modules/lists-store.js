import moment from 'moment'
import cloneDeep from 'lodash/cloneDeep'
import pick from 'lodash/pick'
import findIndex from 'lodash/findIndex'
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

function listGet (id) {
  profile('listGet')

  const lists = listsGet()
  let index = findIndex(lists, ['id', id])

  if (index < 0) {
    throw new Error(`cannot get list ${id}`)
  }

  profileEnd('listGet')

  return {
    index,
    list: lists[index]
  }
}

function listsGet () {
  const data = localStorage.get()
  return data.lists
}

function listAdd (list) {
  console.log(list)
}

function replaceList ({ index, list }) {
  profile('replaceList')

  let lists = listsGet()
  lists[index] = list

  localStorage.set({ lists })

  profileEnd('replaceList')
}

// TODO rewrite this, it's too slow
function itemAdd (listId, item) {
  profile('itemAdd')

  let listObj = listGet(listId)
  let list = listObj.list

  let newItem = Object.assign(pick(item, ['amount', 'type']), {
    id: list.nextId++,
    date: moment().format('YYYY-MM-DD HH:mm:ss')
  })

  list.items.unshift(newItem)

  replaceList(listObj)

  profileEnd('itemAdd')
}

function itemDelete (listId, itemId) {
  profile('itemDelete')

  let listObj = listGet(listId)
  let list = listObj.list

  list.items = list.items.filter(item => {
    return item.id !== itemId
  })

  replaceList(listObj)

  profileEnd('itemDelete')
}

export default {
  listGet: function listGetDecoratedDeletable (...args) {
    const result = listGet(...args).list
    return result
      ? markDeletable(result)
      : null
  },
  listsGet,
  listAdd,
  // listDelete: function listDelete (id) {},
  // listEdit: function listEdit (id, name) {},
  itemAdd,
  itemDelete
}
