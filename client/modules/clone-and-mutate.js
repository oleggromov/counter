import cloneDeep from 'lodash/cloneDeep'

const cloneAndMutate = (mutate) => {
  return (prev) => {
    let state = cloneDeep(prev)
    mutate(state)
    return state
  }
}

export default cloneAndMutate
