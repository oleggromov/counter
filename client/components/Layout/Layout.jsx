import React from 'react'
import styles from './layout.css'
import Header from '../Header/Header.jsx'
import DateDisplay from '../DateDisplay/DateDisplay.jsx'

const link = 'http://oleggromov.com'

const Layout = ({ title, children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header
          rightComponent={<DateDisplay />} />
      </div>

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
