import React, { Component } from 'react'
import styles from './spent-form.css'
import Form from '../Form/Form.jsx'

const strings = {
  currency: '$',
  for: 'for',
  save: 'Add'
}

const config = [
  {
    type: 'Label',
    text: strings.currency,
    containerClass: styles.currency
  },
  {
    type: 'Input',
    name: 'value',
    value: '',
    isInvalid: true,
    validator: 'PRICE',
    containerClass: styles.value
  },
  {
    type: 'Label',
    text: strings.for,
    containerClass: styles.for
  },
  {
    type: 'Input',
    name: 'name',
    value: '',
    isInvalid: true,
    validator: 'NOT_EMPTY',
    containerClass: styles.name
  },
  {
    type: 'Button',
    text: strings.save,
    containerClass: styles.button
  }
]

export default class SpentFrom extends Component {
  saveItem (item) {
    const { value, name } = item

    this.props.onItemAdd({
      value: Number(value),
      name: name.trim()
    })
  }

  render () {
    const props = {
      config,
      className: styles.spentForm,
      onSubmit: this.saveItem.bind(this)
    }

    return (
      <Form {...props} />
    )
  }
}
