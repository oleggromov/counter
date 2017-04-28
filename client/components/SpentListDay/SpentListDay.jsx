import React from 'react'
import styles from './spent-list-day.css'
import DateFormatted from '../DateFormatted/DateFormatted.jsx'

export default function SpentListDay (props) {
  const {
    mediaType,
    currentDay,
    children
  } = props

  return (
    <div className={`${styles.day} ${styles[mediaType]}`}>
      <div className={styles.caption}>
        <DateFormatted date={currentDay} />
      </div>
      {children}
    </div>
  )
}
