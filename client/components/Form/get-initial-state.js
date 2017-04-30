/**
 * Transforms form config into
 * a state object by picking only 'Inputs'
 * and populating a resulting array with them
 *
 * @param {Object[]} config
 * @param {Object} config[]
 * @return {Object} { name: String, isInvalid: Boolean }
 */
const getInitialState = config => {
  return config
    .filter(({ type }) => type === 'Input')
    .reduce((acc, { name, value, isInvalid }) => {
      return Object.assign(acc, {
        [name]: {
          value,
          isInvalid
        }
      })
    }, {})
}

export default getInitialState
