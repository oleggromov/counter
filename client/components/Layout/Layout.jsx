import React from 'react'
import styles from './layout.css'
import Header from '../Header/Header.jsx'
import DateDisplay from '../DateDisplay/DateDisplay.jsx'

const link = 'http://oleggromov.com'

const Layout = (props) => {
  const {
    title,
    children,
    mediaType
  } = props

  return (
    <div className={`${styles.layout} ${styles[mediaType]}`}>
      <Header
        mediaType={mediaType}
        rightComponent={<DateDisplay mediaType={mediaType} />} />

      <div className={styles.title}>
        {title}
      </div>

      <div className={styles.content}>
        {children}
      </div>

      <div className={styles.footer}>
        Copyright 2017, <a href={link} target='blank'>Oleg Gromov</a>
      </div>
    </div>
  )
}

export default Layout
