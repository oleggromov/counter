import React from 'react'
import styles from './layout.css'
import Header from '../Header/Header.jsx'
import User from '../User/User.jsx'
import gearIcon from './gear.svg'

// const link = 'http://oleggromov.com'
const github = 'https://github.com/oleggromov/counter'
const settingsLink = '/settings'

const Layout = ({ children }, context) => {
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
        <div className={styles.footerLayout}>
          <div className={styles.copyright}>
            Made in 2017 by Oleg G.,
            {' '}
            <a href={github}>github</a>
          </div>

          <a className={styles.settings} href={settingsLink} dangerouslySetInnerHTML={{__html: gearIcon}} />
        </div>
      </div>
    </div>
  )
}

export default Layout
