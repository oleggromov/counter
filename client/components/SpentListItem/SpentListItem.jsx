import React from 'react'
import styles from './spent-list-item.css'
import Loading from '../Loading/Loading.jsx'

const renderDeleteButton = (onDelete) => {
  return (
    <div className={styles.delete}>
      <span onClick={onDelete}>Delete</span>
    </div>
  )
}

const renderLoading = () => {
  return (
    <div className={styles.loading}>
      <Loading />
    </div>
  )
}

const getClasses = (isLoading, isReadyToDelete) => {
  let classes = styles.row

  if (isLoading) {
    classes = `${classes} ${styles.isLoading}`
  } else if (isReadyToDelete) {
    classes = `${classes} ${styles.readyToDelete}`
  }

  return classes
}

const SpentListItem = ({ currency, value, name, isReadyToDelete, onReadyToDelete, onDelete, isLoading }) => {
  const classes = getClasses(isLoading, isReadyToDelete)

  let control
  let onClick

  if (isLoading) {
    control = renderLoading()
    onClick = null
  } else {
    control = renderDeleteButton(onDelete)
    onClick = onReadyToDelete
  }

  return (
    <div className={classes} onClick={onClick}>
      <div className={styles.currency}>
        {currency}
      </div>
      <div className={styles.value}>
        {value.toFixed(2)}
      </div>
      <div className={styles.name}>
        {name}
      </div>

      {control}
    </div>
  )
}

export default SpentListItem
