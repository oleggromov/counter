import React, { Component } from 'react'
import Input from './Input.jsx'
import Label from './Label.jsx'
import Button from './Button.jsx'
import styles from './form.css'
import { getInitialState, getValueFields, getStatefulConfig } from './form-helpers'
import getValidator from './get-validator'
import pick from 'lodash/pick'
import transform from 'lodash/transform'

export default class Form extends Component {
  constructor (props) {
    super(props)

    this.values = getValueFields(props.config)
    this.state = getInitialState(props.config)
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

  callOnSubmit (e) {
    e.preventDefault()

    const values = pick(this.state, this.values)
    const result = transform(values, (acc, value, key) => {
      acc[key] = value.value
      acc.isInvalid = acc.isInvalid || value.isInvalid
      return acc
    }, {})

    if (result.isInvalid) {
      this.setState({
        hideErrors: false,
        formIsInvalid: true
      })
    } else {
      this.props.onSubmit(pick(result, this.values))
      this.setState(getInitialState(this.props.config))
    }
  }

  resetFormInvalid () {
    this.setState({
      formIsInvalid: false
    })
  }

  renderChildren (config) {
    return config.map((field, index) => {
      return (
        <div
          className={`${styles.column} ${field.containerClass}`}
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
          onChange: this.setValue.bind(this, field.name, getValidator(field.validator)),
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
    if (this.state.formIsInvalid) {
      formClasses = `${formClasses} ${styles.shake}`
    }

    const statefulConfig = getStatefulConfig(this.state, this.props.config)

    return (
      <form
        className={formClasses}
        onAnimationEnd={this.resetFormInvalid.bind(this)}>

        {this.renderChildren(statefulConfig)}

      </form>
    )
  }
}
