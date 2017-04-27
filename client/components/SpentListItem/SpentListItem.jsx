import React, { Component } from 'react'
import styles from './spent-list-item.css'

const currency = '$'
const precisePrice = /\.00$/

function renderPrice (price) {
  const fixedPoint = price.toFixed(2)
  const matchResult = fixedPoint.match(precisePrice)

  if (matchResult) {
    return (
      <span>
        {fixedPoint.slice(0, matchResult.index)}
        <span className={styles.amountInvisible}>
          {matchResult[0]}
        </span>
      </span>
    )
  }

  return fixedPoint
}

export default class SpentListItem extends Component {
  constructor (props) {
    super(props)

    this.setPreDelete = this.setPreDelete.bind(this)
  }

  setPreDelete () {
    this.props.onPreDelete(this.props.item.id)
  }

  render () {
    const extendedClass = this.props.readyToDelete
      ? styles.readyToDelete
      : ''

    const classes = `${styles.row} ${styles[this.props.mediaType]} ${extendedClass}`
    const item = this.props.item

    return (
      <div className={classes} onClick={this.setPreDelete}>
        <div className={styles.currency}>
          {currency}
        </div>
        <div className={styles.amount}>
          {renderPrice(item.amount)}
        </div>
        <div className={styles.name}>
          {item.type}
        </div>
        <div className={styles.delete}>
          <span onClick={this.props.onDelete}>Delete</span>
        </div>
      </div>
    )
  }
}
