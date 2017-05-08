import React from 'react'
import styles from './spent-list-item.css'

const SpentListItem = ({ currency, value, name, isReadyToDelete, onReadyToDelete, onDelete }) => {
  let classes = styles.row
  if (isReadyToDelete) {
    classes = `${classes} ${styles.readyToDelete}`
  }

  return (
    <div className={classes} onClick={onReadyToDelete}>
      <div className={styles.currency}>
        {currency}
      </div>
      <div className={styles.value}>
        {value.toFixed(2)}
      </div>
      <div className={styles.name}>
        {name}
      </div>
      <div className={styles.delete}>
        <span onClick={onDelete}>Delete</span>
      </div>
    </div>
  )
}

export default SpentListItem
