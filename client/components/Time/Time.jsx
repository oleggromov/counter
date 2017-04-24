import React from 'react'
import styles from './time.css'
import moment from 'moment'

export default function Time (props) {
  const date = moment(props.date)

  return (<span>
    {date.format('h')}
    <span className={styles.divider}>:</span>
    {date.format('mm a')}
  </span>)
}
