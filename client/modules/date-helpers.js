const getDiffInSeconds = (before, after) => {
  return (new Date(after) - new Date(before)) / 1000
}

const isCurrentYear = date => {
  const curYear = new Date().getFullYear()
  return curYear === new Date(date).getFullYear()
}

const FORMATS = {
  TINY: 'TINY',
  CONTRACTED: 'CONTRACTED',
  FULL: 'FULL'
}

// TODO: i18n
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const monthsSmall = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const format = (originDate, format) => {
  if (!FORMATS.hasOwnProperty(format)) {
    throw new Error(`Incorrect data format ${format}`)
  }

  const date = new Date(originDate)
  let dateStr

  if (format === FORMATS.FULL || format === FORMATS.TINY) {
    dateStr = months[date.getMonth()]
  } else if (format === FORMATS.CONTRACTED) {
    dateStr = monthsSmall[date.getMonth()]
  }

  dateStr = `${dateStr} ${date.getDate()}`

  if (format === FORMATS.FULL || format === FORMATS.CONTRACTED) {
    dateStr = `${dateStr}, ${date.getFullYear()}`
  }

  return dateStr
}

export {
  getDiffInSeconds,
  isCurrentYear,
  format,
  FORMATS
}
