import React, { Component } from 'react'
import api from '../../modules/api'
import styles from './user.css'

const { urls } = require('../../../common/api-constants')

const message = 'Seems you\'ve been logged out or the session is timed out'
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
      logout: false,
      data: null
    }
  }

  componentDidMount () {
    api.getAuthInfo()
      .then(({data}) => {
        this.setState({ data })
      })
      .catch(() => {
        // TODO: add a flash message window here!
        window.alert(message)
        window.location = urls.AUTH_LOGOUT
      })
  }

  triggerLogout () {
    this.setState({ logout: !this.state.logout })
  }

  renderUser () {
    let classes = styles.user
    if (this.state.logout) {
      classes = `${classes} ${styles.logout}`
    }

    return (
      <div className={classes} onClick={this.triggerLogout.bind(this)}>
        <div className={styles.wrapper}>
          <div className={styles.picture} style={{ backgroundImage: `url(${this.state.data.picture})` }} />
          <div className={styles.name}>
            {trimName(this.state.data.name)}
          </div>

          <a href={urls.AUTH_LOGOUT} onClick={(e) => e.stopPropagation()} className={styles.link}>
            {logout}
          </a>
        </div>
      </div>
    )
  }

  render () {
    if (this.state.data) {
      return this.renderUser()
    }

    return null
  }
}

export default User
