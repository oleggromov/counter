const validators = {
  PRICE: value => {
    const isNumber = /^\d+(\.\d{1,2})?$/
    return isNumber.test(value) && parseFloat(value) !== 0
  },

  NOT_EMPTY: value => {
    value = value.trim()
    return /\S+/.test(value)
  }
}

export default name => {
  const validator = validators[name]
  if (typeof validator !== 'function') {
    throw new Error(`getValidator: there's no "${name}" validator!`)
  }

  return validator
}
