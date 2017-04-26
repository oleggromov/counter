import React from 'react'
import styles from './spent-list-item.css'

const currency = '$'

export default function SpentListItem (props) {
  const item = props.item

  return (
    <div className={`${styles.row} ${styles[props.mediaType]}`}>
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
        <span onClick={props.onDelete}>Delete</span>
      </div>
    </div>
  )
}
