import React from 'react'
import styles from './spent-list-item.css'

const SpentListItem = (props) => {
  const {
    currency,
    amount,
    type,
    isReadyToDelete,
    onReadyToDelete,
    onDelete,
    mediaType
  } = props

  const extendedClass = isReadyToDelete
      ? styles.readyToDelete
      : ''

  const classes = `${styles.row} ${styles[mediaType]} ${extendedClass}`

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
