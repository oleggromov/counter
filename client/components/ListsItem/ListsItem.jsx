import React from 'react'
import { Link } from 'react-router-dom'
import DateFormatted from '../DateFormatted/DateFormatted.jsx'
import styles from './lists-item.css'

const strings = {
  pcs: 'pcs',
  delete: 'Delete'
}

const ListsItem = props => {
  const renderDate = () => {
    if (props.date) {
      return (
        <div className={styles.date}>
          <DateFormatted date={props.date} />
        </div>
      )
    }
  }

  const notifyDeletion = (e) => {
    e.preventDefault()
    props.onDelete()
  }

  let classes = styles.listsItem
  if (props.showDelete) {
    classes = `${classes} ${styles.readyToDelete}`
  }

  return (
    <Link
      className={classes}
      to={props.link}>
      <div className={styles.link}>
        <span className={styles.linkText}>
          {props.children}
        </span>
      </div>

      { renderDate() }

      <div className={styles.count}>
        {props.count} {strings.pcs}
      </div>

      <div
        className={styles.delete}
        onClick={notifyDeletion}>
        {strings.delete}
      </div>
    </Link>
  )
}

export default ListsItem
