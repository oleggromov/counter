import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Title from '../Title/Title.jsx'
import Button from '../Form/Button.jsx'
import styles from './screen-settings.css'

export default class ScreenSettings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      canDelete: false
    }
  }

  check () {
    this.setState({
      canDelete: !this.state.canDelete
    })
  }

  renderButton () {
    if (this.state.canDelete) {
      return (
        <Button onClick={this.props.onDeleteUser}>Delete all my data</Button>
      )
    }
  }

  render () {
    const backLink = <Link to='/'>Main screen</Link>

    return (
      <div>
        <Title back={backLink}>About the application</Title>

        <div className={styles.settings}>
          <p>Counter application stores your:</p>
          <ul>
            <li>facebook user id</li>
            <li>all the lists and expenses you‘ve created</li>
          </ul>

          <p>It also uses cookies for session storage purposes.</p>
          <p>If you want to completely delete all the stored data from the server use the button below.</p>

          <div className={styles.confirmation}>
            <input
              id='i-do'
              type='checkbox'
              checked={this.state.canDelete}
              onChange={this.check.bind(this)}
            />

            <label htmlFor='i-do'>I do want to <b>completely delete</b> all my data</label>
          </div>

          <div className={styles.delete}>
            {this.renderButton()}
          </div>
        </div>
      </div>
    )
  }
}
