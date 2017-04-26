import React from 'react'
import styles from './header.css'

const appName = 'Counter'
const appVersion = '0.1'

export default function Header (props) {
  return (
    <div className={`${styles.header} ${styles[props.mediaType]}`}>
      <div className={styles.logo}>{appName} <sup className={styles.logoVersion}>{appVersion}</sup></div>
    </div>
  )
}
