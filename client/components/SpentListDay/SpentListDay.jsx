import React from 'react'
import styles from './spent-list-day.css'
import DateFormatted from '../DateFormatted/DateFormatted.jsx'

export default function SpentListDay (props) {
  const key = props.currentDay.valueOf

  return <tbody>
    <tr className={`${styles.day} ${styles[props.mediaType]}`} key={key}>
      <th colSpan='4' className={styles.caption}>
        <DateFormatted date={props.currentDay} />
      </th>
    </tr>
    { props.children }
  </tbody>
}
