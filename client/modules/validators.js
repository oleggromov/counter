export default {
  PRICE: value => {
    const isNumber = /^\d+(\.\d{1,2})?$/
    return isNumber.test(value) && parseFloat(value) !== 0
  },

  NOT_EMPTY: value => {
    value = value.trim()
    return /\S+/.test(value)
  }
}
