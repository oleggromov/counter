import React, { Component } from 'react'
import styles from './user.css'
const { urls } = require('../../../common/api-constants')
const logout = 'Log out'

const trimName = (name) => {
  const match = name.match(/\S+/g)
  if (match) {
    name = `${match[0]} ${match[1][0]}.`
  }

  return name
}

// TODO: figure out how to re-fetch data and re-render the component
// only when it's needed
class User extends Component {
  constructor (props) {
    super(props)

    this.state = {
      logout: false
    }
  }

  triggerLogout () {
    this.setState({ logout: !this.state.logout })
  }

  render () {
    const { data } = this.props
    const triggerLogout = this.triggerLogout.bind(this)
    const stopPropagation = (e) => e.stopPropagation()

    if (!data) {
      return null
    }

    let classes = styles.user
    if (this.state.logout) {
      classes = `${classes} ${styles.logout}`
    }

    const bgStyles = {
      backgroundImage: `url(${data.picture})`
    }

    return (
      <div className={classes} onClick={triggerLogout}>
        <div className={styles.wrapper}>
          <div className={styles.picture} style={bgStyles} />
          <div className={styles.name}>
            {trimName(data.name)}
          </div>

          <a href={urls.AUTH_LOGOUT} onClick={stopPropagation} className={styles.link}>
            {logout}
          </a>
        </div>
      </div>
    )
  }
}

export default User
