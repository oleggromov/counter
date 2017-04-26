import React, { Component } from 'react'
import styles from './spent-list-item.css'

const currency = '$'

export default class SpentListItem extends Component {
  render () {
    const item = this.props.item

    return (
      <div className={`${styles.row} ${styles[this.props.mediaType]}`}>
        <div className={styles.currency}>
          {currency}
        </div>
        <div className={styles.amount}>
          {item.amount.toFixed(2)}
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
