import React from 'react'
import styles from './spent-list-day.css'
import DateFormatted from '../DateFormatted/DateFormatted.jsx'

const SpentListDay = ({ currentDay, children }) => (
  <div className={styles.day}>
    <div className={styles.caption}>
      <DateFormatted date={currentDay} />
    </div>
    {children}
  </div>
)

export default SpentListDay
