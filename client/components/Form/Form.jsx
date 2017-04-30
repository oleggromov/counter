import React, { Component } from 'react'
import Input from './Input.jsx'
import Label from './Label.jsx'
import Button from './Button.jsx'
import styles from './form.css'
import getValidator from '../../modules/get-validator'

export default class Form extends Component {
  callOnSubmit (e) {
    this.props.onSubmit()
    e.preventDefault()
  }

  renderChildren () {
    return this.props.config.map((field, index) => {
      return (
        <div
          className={field.containerClass}
          key={index}>
          {this.renderField(field, index)}
        </div>
      )
    })
  }

  renderField (field) {
    let props = {
      mediaType: this.props.mediaType
    }

    switch (field.type) {
      case 'Input':
        Object.assign(props, {
          onChange: this.props.onChange.bind(null, field.name, getValidator(field.validator)),
          isInvalid: field.isInvalid,
          value: field.value
        })

        return (
          <Input {...props} />
        )

      case 'Label':
        return (
          <Label>{field.text}</Label>
        )

      case 'Button':
        Object.assign(props, {
          onClick: this.callOnSubmit.bind(this)
        })

        return (
          <Button {...props}>
            {field.text}
          </Button>
        )

      default:
        throw new Error(`Form.renderField: unknown element type "${field.type}"`)
    }
  }

  render () {
    let formClasses = `${styles.form} ${this.props.className}`
    if (this.props.isInvalid) {
      formClasses = `${formClasses} ${styles.shake}`
    }

    return (
      <form
        className={formClasses}
        onAnimationEnd={this.props.onAnimationEnd}>
        {this.renderChildren()}
      </form>
    )
  }
}
