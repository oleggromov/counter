import cloneDeep from 'lodash/cloneDeep'

export default (state, defaultConfig) => {
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
