import React from 'react'
import { Link } from 'react-router-dom'
import DateFormatted from '../DateFormatted/DateFormatted.jsx'
import styles from './lists-item.css'

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

  return (
    <Link
      className={`${styles.listsItem} ${styles[props.mediaType]}`}
      to={props.link}>
      <div className={styles.link}>
        <span className={styles.linkText}>
          {props.children}
        </span>
      </div>

      { renderDate() }

      <div className={styles.count}>
        {props.count} pcs
      </div>
    </Link>
  )
}

export default ListsItem
