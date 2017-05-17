import React from 'react'
import styles from './layout.css'
import Header from '../Header/Header.jsx'
import User from '../User/User.jsx'

const link = 'http://oleggromov.com'

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header
          rightComponent={<User />} />
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
