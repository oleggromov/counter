const prependZero = (str) => {
  return String(str).length === 1 ? `0${str}` : str
}

const getMysqlDateString = (date) => {
  const year = date.getFullYear()
  const month = prependZero(date.getMonth() + 1)
  const day = prependZero(date.getDate())
  const hours = prependZero(date.getHours())
  const minutes = prependZero(date.getMinutes())
  const seconds = prependZero(date.getSeconds())

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

module.exports = getMysqlDateString
