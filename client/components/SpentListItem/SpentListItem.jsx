import React from 'react'
import styles from './spent-list-item.css'

const SpentListItem = ({ currency, amount, type, isReadyToDelete, onReadyToDelete, onDelete }) => {
  let classes = styles.row
  if (isReadyToDelete) {
    classes = `${classes} ${styles.readyToDelete}`
  }

  return (
    <div className={classes} onClick={onReadyToDelete}>
      <div className={styles.currency}>
        {currency}
      </div>
      <div className={styles.amount}>
        {amount.toFixed(2)}
      </div>
      <div className={styles.name}>
        {type}
      </div>
      <div className={styles.delete}>
        <span onClick={onDelete}>Delete</span>
      </div>
    </div>
  )
}

export default SpentListItem
