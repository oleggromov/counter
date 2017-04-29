import React, { Component } from 'react'
import styles from './input.css'

const validationTypes = {
  'DEFAULT': 1,
  'PRICE': 2
}

const invalidations = {
  [validationTypes.DEFAULT]: () => false,
  [validationTypes.PRICE]: (value) => {
    const isNumber = /^\d+(\.\d{1,2})?$/
    return !(isNumber.test(value) && parseFloat(value) !== 0)
  }
}

export default class Input extends Component {
  constructor (props) {
    super(props)

    const value = props.value || ''

    this.setValue = this.setValue.bind(this)

    const validation = props.validation || validationTypes['DEFAULT']
    this.isInvalid = invalidations[validation]

    this.state = {
      value,
      isInvalid: this.isInvalid(value)
    }
  }

  setValue (e) {
    const value = e.target.value.trim()

    this.setState(prevState => {
      const isInvalid = this.isInvalid(value)

      if (isInvalid) {
        this.props.onInvalid()
      } else {
        this.props.onChange(value)
      }

      return {
        isInvalid,
        value
      }
    })
  }

  render () {
    let classes = `${styles.input} ${styles[this.props.mediaType]}`
    if (this.state.isInvalid) {
      classes = `${classes} ${styles.error}`
    }

    return (
      <input
        className={classes}
        autoFocus={this.props.autoFocus}
        onChange={this.setValue}
        value={this.state.value}
      />
    )
  }
}

export { validationTypes }
