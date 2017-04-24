const storage = window.localStorage
const itemName = 'data'

function set (data) {
  const serialized = JSON.stringify(data)

  storage.setItem(itemName, serialized)
}

function get () {
  const serialized = storage.getItem(itemName)

  return JSON.parse(serialized) || []
}

export default { set, get }
