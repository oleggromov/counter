import React, { Component } from 'react'
import styles from './list-edit.css'
import ListForm from '../ListForm/ListForm.jsx'

const modeTypes = {
  DEFAULT: 0,
  ADD: 1,
  DELETE: 2
}

const strings = {
  links: {
    [modeTypes.ADD]: 'Add a new one',
    [modeTypes.DELETE]: 'Delete empty',
    back: 'Back'
  },

  headings: {
    [modeTypes.DEFAULT]: 'Edit lists',
    [modeTypes.ADD]: 'Add list',
    [modeTypes.DELETE]: 'Delete lists'
  },

  deleteMessage: 'You can remove only empty lists'
}

export default class ListEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mode: modeTypes.DEFAULT,
      prevMode: null,
      switchToMode: false
    }
  }

  changeMode (mode) {
    this.props.onToggleDelete(mode === modeTypes.DELETE)
    this.setState({
      mode,
      prevMode: this.state.mode,
      switchToMode: mode !== modeTypes.DEFAULT
    })
  }

  callOnListAdd (...args) {
    this.props.onListAdd(...args)
    this.setState({
      mode: modeTypes.DEFAULT,
      prevMode: this.state.mode,
      switchToMode: false
    })
  }

  renderModeSelector () {
    const modeLinks = [modeTypes.ADD, modeTypes.DELETE]
    const links = modeLinks.map((modeType, index) => {
      return (
        <li key={index}>
          <span className={styles.link} onClick={this.changeMode.bind(this, modeType)}>
            <span>{strings.links[modeType]}</span>
          </span>
        </li>
      )
    })

    return (
      <ul className={styles.modes}>
        {links}
      </ul>
    )
  }

  renderAddForm () {
    return (
      <ListForm
        mediaType={this.props.mediaType}
        onListAdd={this.callOnListAdd.bind(this)} />
    )
  }

  renderModeHeading (mode) {
    return (
      <div className={styles.heading}>
        <div className={styles.backLink}>
          <span className={styles.link} onClick={this.changeMode.bind(this, modeTypes.DEFAULT)}>
            ←&nbsp;<span>{strings.links.back}</span>
          </span>
        </div>

        <h2 className={styles.title}>
          {strings.headings[mode]}
        </h2>
      </div>
    )
  }

  renderModeContent (mode) {
    switch (mode) {
      case modeTypes.ADD:
        return this.renderAddForm()

      case modeTypes.DELETE:
        return strings.deleteMessage
    }
  }

  getNextModeType () {
    return this.state.mode === modeTypes.DEFAULT
      ? this.state.prevMode
      : this.state.mode
  }

  getFrameClasses () {
    let classes = styles.frame

    if (this.state.switchToMode) {
      classes = `${classes} ${styles.switch}`
    }

    return classes
  }

  render () {
    const classes = `${styles.listEdit} ${styles[this.props.mediaType]}`
    const nextModeType = this.getNextModeType()

    return (
      <div className={classes}>
        <div className={this.getFrameClasses()}>
          <div className={styles.main}>
            <div className={styles.heading}>
              <h2 className={styles.title}>
                {strings.headings[modeTypes.DEFAULT]}
              </h2>
            </div>

            <div className={styles.content}>
              {this.renderModeSelector()}
            </div>
          </div>

          <div className={styles.mode}>
            {this.renderModeHeading(nextModeType)}

            <div className={styles.content}>
              {this.renderModeContent(nextModeType)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
