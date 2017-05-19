import React from 'react'
import styles from './layout.css'
import Header from '../Header/Header.jsx'
import User from '../User/User.jsx'
import gearIcon from './gear.svg'

const github = 'https://github.com/oleggromov/counter'
const settingsLink = '/settings'

const renderSettings = (render) => {
  if (render) {
    return (
      <a className={styles.settings} href={settingsLink} dangerouslySetInnerHTML={{__html: gearIcon}} />
    )
  }
}

const Layout = ({ loginData, children }) => {
  const userIsLogged = Boolean(loginData)
  const user = <User data={loginData} />

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header rightComponent={user} />
      </div>

      <div className={styles.content}>
        {children}
      </div>

      <div className={styles.footer}>
        <div className={styles.footerLayout}>
          <div className={styles.copyright}>
            Made in 2017 by Oleg Gromov,{' '}
            <a href={github}>source code</a>
          </div>

          { renderSettings(userIsLogged) }
        </div>
      </div>
    </div>
  )
}

export default Layout
