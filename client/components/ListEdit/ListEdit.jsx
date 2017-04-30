import React, { Component } from 'react'
import styles from './list-edit.css'
import ListForm from '../ListForm/ListForm.jsx'

const strings = {
  linkAdd: 'Add a new one',
  linkDelete: 'Delete empty',
  linkBack: '← Back',

  headings: {
    default: 'Edit lists',
    add: 'Add list',
    delete: 'Select empty lists'
  }
}

const modes = [
  {
    mode: 'add',
    label: strings.linkAdd
  },
  {
    mode: 'delete',
    label: strings.linkDelete
  }
]

export default class ListEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mode: 'default'
    }
  }

  changeMode (mode) {
    this.props.onToggleDelete(mode === 'delete')
    this.setState({ mode })
  }

  callOnListAdd (...args) {
    this.props.onListAdd(...args)
    this.setState({ mode: 'default' })
  }

  renderModes () {
    const modeLinks = modes.map(({ mode, label }, index) => (
      <li key={index}>
        <span className={styles.link} onClick={this.changeMode.bind(this, mode)}>
          {label}
        </span>
      </li>
    ))

    return (
      <ul className={styles.modes}>
        {modeLinks}
      </ul>
    )
  }

  renderContent () {
    switch (this.state.mode) {
      case 'default':
        return this.renderModes()
      case 'add':
        return this.renderForm()
    }
  }

  renderForm () {
    return (
      <div className={styles.inlineBlock}>
        <ListForm
          mediaType={this.props.mediaType}
          onListAdd={this.callOnListAdd.bind(this)} />
      </div>
    )
  }

  renderBackLink () {
    if (this.state.mode !== 'default') {
      return (
        <div className={styles.backLink}>
          <span className={styles.link} onClick={this.changeMode.bind(this, 'default')}>
            {strings.linkBack}
          </span>
        </div>
      )
    }
  }

  getHeading () {
    return strings.headings[this.state.mode]
  }

  render () {
    const classes = `${styles.listEdit} ${styles[this.props.mediaType]}`

    return (
      <div className={classes}>
        <div className={styles.heading}>
          {this.renderBackLink()}

          <h2 className={styles.title}>
            {this.getHeading()}
          </h2>
        </div>

        <div className={styles.content}>
          {this.renderContent()}
        </div>
      </div>
    )
  }
}
