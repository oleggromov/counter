import React, { Component } from 'react'
import Input from '../Input/Input.jsx'
import Button from '../Button/Button.jsx'
import styles from './spent-form.css'
import validators from '../../modules/validators'

const strings = {
  currency: '$',
  for: 'for',
  save: 'Save'
}

const getInitialState = () => ({
  amount: {
    value: '',
    isInvalid: true
  },
  type: {
    value: '',
    isInvalid: true
  },
  shake: false,
  hideErrors: true
})

export default class SpentForm extends Component {
  constructor (props) {
    super(props)

    this.state = getInitialState()
  }

  setValue (type, validator, value) {
    this.setState({
      [type]: {
        isInvalid: !validator(value),
        value: value
      },
      hideErrors: false
    })
  }

  saveItem (e) {
    const { amount, type } = this.state

    if (amount.isInvalid || type.isInvalid) {
      this.setState({
        shake: true,
        hideErrors: false
      })
    } else {
      this.props.onItemAdd({
        amount: Number(amount.value),
        type: type.value.trim()
      })

      this.setState(getInitialState())
    }

    e.preventDefault()
  }

  getIsInvalid (field) {
    return !this.state.hideErrors && this.state[field].isInvalid
  }

  resetShaking () {
    this.setState({ shake: false })
  }

  render () {
    const { mediaType } = this.props
    const state = this.state

    let formClasses = `${styles.spentForm} ${styles[mediaType]}`
    if (state.shake) {
      formClasses = `${formClasses} ${styles.shake}`
    }

    const setAmount = this.setValue.bind(this, 'amount', validators.PRICE)
    const setType = this.setValue.bind(this, 'type', validators.NOT_EMPTY)
    const saveItem = this.saveItem.bind(this)

    return (
      <form
        className={formClasses}
        onAnimationEnd={this.resetShaking.bind(this)}>
        <div className={styles.currencyColumn}>
          <span className={styles.label}>
            {strings.currency}
          </span>
        </div>

        <div className={styles.amountColumn}>
          <Input
            mediaType={mediaType}
            onChange={setAmount}
            isInvalid={this.getIsInvalid('amount')}
            value={state.amount.value}
            />
        </div>

        <div className={styles.forColumn}>
          <span className={styles.label}>
            {strings.for}
          </span>
        </div>

        <div className={styles.typeColumn}>
          <Input
            mediaType={mediaType}
            onChange={setType}
            isInvalid={this.getIsInvalid('type')}
            value={state.type.value} />
        </div>

        <div className={styles.buttonColumn}>
          <Button
            mediaType={mediaType}
            onClick={saveItem}>
            {strings.save}
          </Button>
        </div>
      </form>
    )
  }
}
