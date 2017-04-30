import cloneDeep from 'lodash/cloneDeep'

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
  const fieldsState = config
    .filter(({ type }) => type === 'Input')
    .reduce((acc, { name, value, isInvalid }) => {
      return Object.assign(acc, {
        [name]: {
          value,
          isInvalid
        }
      })
    }, {})

  const formState = {
    hideErrors: true,
    formIsInvalid: false
  }

  return Object.assign(formState, fieldsState)
}

const getValueFields = config => {
  return config
    .filter(({type}) => type === 'Input')
    .map(({ name }) => name)
}

const getStatefulConfig = (state, defaultConfig) => {
  let configCopy = cloneDeep(defaultConfig)

  return configCopy.map(field => {
    if (field.type === 'Input') {
      Object.assign(field, state[field.name])

      if (state.hideErrors) {
        field.isInvalid = false
      }
    }

    return field
  })
}

export {
  getInitialState,
  getStatefulConfig,
  getValueFields
}
