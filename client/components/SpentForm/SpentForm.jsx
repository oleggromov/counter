import React, { Component } from 'react'
import styles from './spent-form.css'
import getConfig from './getConfig'
import Form from '../Form/Form.jsx'
import getInitialState from '../Form/get-initial-state'
import getStatefulConfig from '../Form/get-stateful-config'

const defaultConfig = getConfig(styles, {
  currency: '$',
  for: 'for',
  save: 'Save'
})

const getDefaultState = () => {
  return Object.assign({
    hideErrors: true,
    formIsInvalid: false
  }, getInitialState(defaultConfig))
}

export default class SpentFrom extends Component {
  constructor (props) {
    super(props)

    this.state = getDefaultState()
  }

  setValue (name, validator, value) {
    this.setState({
      [name]: {
        isInvalid: !validator(value),
        value: value
      },
      hideErrors: false
    })
  }

  saveItem () {
    const { amount, type } = this.state

    if (amount.isInvalid || type.isInvalid) {
      this.setState({
        hideErrors: false,
        formIsInvalid: true
      })
    } else {
      this.props.onItemAdd({
        amount: Number(amount.value),
        type: type.value.trim()
      })

      this.setState(getDefaultState())
    }
  }

  resetFormInvalid () {
    this.setState({
      formIsInvalid: false
    })
  }

  render () {
    const { mediaType } = this.props
    const setValue = this.setValue.bind(this)
    const saveItem = this.saveItem.bind(this)
    const spentFormClasses = `${styles.spentForm} ${styles[mediaType]}`
    const resetFormInvalid = this.resetFormInvalid.bind(this)

    return (
      <Form
        className={spentFormClasses}
        mediaType={mediaType}
        config={getStatefulConfig(this.state, defaultConfig)}
        isInvalid={this.state.formIsInvalid}
        onAnimationEnd={resetFormInvalid}
        onChange={setValue}
        onSubmit={saveItem} />
    )
  }
}
