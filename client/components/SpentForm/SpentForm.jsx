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
    name: 'amount',
    value: '',
    isInvalid: true,
    validator: 'PRICE',
    containerClass: styles.amount
  },
  {
    type: 'Label',
    text: strings.for,
    containerClass: styles.for
  },
  {
    type: 'Input',
    name: 'type',
    value: '',
    isInvalid: true,
    validator: 'NOT_EMPTY',
    containerClass: styles.type
  },
  {
    type: 'Button',
    text: strings.save,
    containerClass: styles.button
  }
]

export default class SpentFrom extends Component {
  saveItem (item) {
    const { amount, type } = item

    this.props.onItemAdd({
      amount: Number(amount),
      type: type.trim()
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
