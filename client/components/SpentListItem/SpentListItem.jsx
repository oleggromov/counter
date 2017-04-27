import React, { Component } from 'react'
import styles from './spent-list-item.css'

const currency = '$'

function renderPrice (price) {
  const fixedPoint = price.toFixed(2)
  return fixedPoint
}

export default class SpentListItem extends Component {
  constructor (props) {
    super(props)

    this.setPreDelete = this.props.isDeletable
      ? this.setPreDelete.bind(this)
      : function () {}
  }

  setPreDelete (e) {
    this.props.onPreDelete(this.props.item.id)
    e.stopPropagation()
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
