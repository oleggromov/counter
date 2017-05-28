import React from 'react'
import { Link } from 'react-router-dom'
import css from './layout.css'
import Header from '../Header/Header.jsx'
import User from '../User/User.jsx'
import gearIcon from './gear.svg'

const github = 'https://github.com/oleggromov/counter'
const settingsLink = '/settings'

const renderSettings = (render) => {
  if (render) {
    return (
      <Link className={css.settings} to={settingsLink} dangerouslySetInnerHTML={{__html: gearIcon}} />
    )
  }
}

const Layout = ({ loginData, children, blur }) => {
  const userIsLogged = Boolean(loginData)
  const user = <User data={loginData} />
  let classes = css.layout

  if (blur) {
    classes = `${classes} ${css.blur}`
  }

  return (
    <div className={classes}>
      <div className={css.header}>
        <Header rightComponent={user} />
      </div>

      <div className={css.content}>
        {children}
      </div>

      <div className={css.footer}>
        <div className={css.footerLayout}>
          <div className={css.copyright}>
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
