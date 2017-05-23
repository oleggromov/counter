import React from 'react'
import { Link } from 'react-router-dom'
import DateFormatted from '../DateFormatted/DateFormatted.jsx'
import styles from './lists-item.css'
import Loading from '../Loading/Loading.jsx'

const strings = {
  pcs: 'pcs',
  delete: 'Delete'
}

const renderDate = (date, isLoading) => {
  if (date && !isLoading) {
    return (
      <div className={styles.date}>
        <DateFormatted contracted date={date} />
      </div>
    )
  }
}

const getClasses = (isLoading, isReadyToDelete) => {
  let classes = styles.listsItem

  if (isLoading) {
    classes = `${classes} ${styles.isLoading}`
  } else if (isReadyToDelete) {
    classes = `${classes} ${styles.isReadyToDelete}`
  }

  return classes
}

const renderLoading = () => {
  return (
    <div className={styles.loading}>
      <Loading />
    </div>
  )
}

const renderDeleteButton = (onDelete) => {
  const notifyDeletion = (e) => {
    e.preventDefault()
    onDelete()
  }

  return (
    <div className={styles.delete} onClick={notifyDeletion}>
      {strings.delete}
    </div>
  )
}

const renderCount = (count, isLoading) => {
  if (!isLoading) {
    return (
      <div className={styles.count}>
        {count} {strings.pcs}
      </div>
    )
  }
}

const ListsItem = ({ children, link, date, count, isLoading, isReadyToDelete, onDelete }) => {
  const classes = getClasses(isLoading, isReadyToDelete)

  let control
  let onClick

  if (isLoading) {
    control = renderLoading()
    onClick = (e) => e.preventDefault()
  } else {
    control = renderDeleteButton(onDelete)
  }

  return (
    <Link className={classes} to={link} onClick={onClick}>
      <div className={styles.link}>
        <span className={styles.linkText}>
          {children}
        </span>
      </div>

      { renderDate(date, isLoading) }

      { renderCount(count, isLoading) }

      {control}
    </Link>
  )
}

export default ListsItem
