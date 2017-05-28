import React from 'react'
import css from './spent-list-item.css'
import Loading from '../Loading/Loading.jsx'

const renderDeleteButton = (onDelete) => {
  return (
    <div className={css.delete}>
      <span onClick={onDelete}>Delete</span>
    </div>
  )
}

const renderLoading = () => {
  return (
    <div className={css.loading}>
      <Loading />
    </div>
  )
}

const getClasses = (isLoading, isReadyToDelete) => {
  let classes = css.row

  if (isLoading) {
    classes = `${classes} ${css.isLoading}`
  } else if (isReadyToDelete) {
    classes = `${classes} ${css.readyToDelete}`
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
      <div className={css.currency}>
        {currency}
      </div>
      <div className={css.value}>
        {value.toFixed(2)}
      </div>
      <div className={css.name}>
        {name}
      </div>

      {control}
    </div>
  )
}

export default SpentListItem
