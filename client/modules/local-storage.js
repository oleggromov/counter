const storage = window.localStorage
const localStorageKey = 'data'
const emptyDaya = { lists: { nextId: 0, items: [] } }

const get = () => {
  const serialized = storage.getItem(localStorageKey)
  return JSON.parse(serialized) || emptyDaya
}

const set = (data) => {
  const serialized = JSON.stringify(data)
  storage.setItem(localStorageKey, serialized)
}

export default {
  get,
  set
}
