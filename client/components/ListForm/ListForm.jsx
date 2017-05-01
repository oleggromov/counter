import React, { Component } from 'react'
import styles from './list-form.css'
import Form from '../Form/Form.jsx'

const strings = {
  name: 'Name',
  add: 'Add list'
}

const config = [
  {
    type: 'Label',
    text: strings.name,
    containerClass: styles.label
  },
  {
    type: 'Input',
    name: 'name',
    value: '',
    isInvalid: true,
    validator: 'NOT_EMPTY',
    containerClass: styles.input
  },
  {
    type: 'Button',
    text: strings.add,
    containerClass: styles.button
  }
]

export default class ListForm extends Component {
  saveList (list) {
    this.props.onListAdd({
      name: list.name.trim()
    })
  }

  render () {
    const props = {
      config,
      className: styles.listForm,
      onSubmit: this.saveList.bind(this)
    }

    return (
      <Form {...props} />
    )
  }
}
