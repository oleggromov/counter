import React, { Component } from 'react'
import Input from '../Input/Input.jsx'
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
        shake: true
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

  getIsInvalid (key) {
    return !this.state.hideErrors && this.state[key].isInvalid
  }

  resetShaking () {
    this.setState({ shake: false })
  }

  render () {
    const setAmount = this.setValue.bind(this, 'amount', validators.PRICE)
    const setType = this.setValue.bind(this, 'type', validators.NOT_EMPTY)
    const saveItem = this.saveItem.bind(this)

    return (
      <form
        className={`${styles.spentForm} ${styles[this.props.mediaType]} ${this.state.shake ? styles.shake : ''}`}
        onAnimationEnd={this.resetShaking.bind(this)}
        >
        <div className={styles.currencyColumn}>
          <span className={styles.label}>
            {strings.currency}
          </span>
        </div>

        <div className={styles.amountColumn}>
          <Input
            mediaType={this.props.mediaType}
            onChange={setAmount}
            isInvalid={this.getIsInvalid('amount')}
            value={this.state.amount.value}
            />
        </div>

        <div className={styles.forColumn}>
          <span className={styles.label}>
            {strings.for}
          </span>
        </div>

        <div className={styles.typeColumn}>
          <Input
            mediaType={this.props.mediaType}
            onChange={setType}
            isInvalid={this.getIsInvalid('type')}
            value={this.state.type.value} />
        </div>

        <div className={styles.buttonColumn}>
          <button
            className={styles.button}
            onClick={saveItem}>
            {strings.save}
          </button>
        </div>
      </form>
    )
  }
}
