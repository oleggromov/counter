const storage = window.localStorage
const localStorageKey = 'data'
const noData = { lists: [] }

const get = () => {
  const serialized = storage.getItem(localStorageKey)
  return JSON.parse(serialized) || noData
}

const set = (data) => {
  const serialized = JSON.stringify(data)
  storage.setItem(localStorageKey, serialized)
}

export default {
  get,
  set
}
