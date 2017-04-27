import React from 'react'
import styles from './spent-list-day.css'
import DateFormatted from '../DateFormatted/DateFormatted.jsx'

export default function SpentListDay (props) {
  const key = props.currentDay.valueOf

  return (
    <div className={`${styles.day} ${styles[props.mediaType]}`} key={key}>
      <div className={styles.caption}>
        <DateFormatted date={props.currentDay} />
      </div>
      {props.children}
    </div>
  )
}
