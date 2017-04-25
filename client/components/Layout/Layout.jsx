import React, { Component } from 'react'
import MediaDetector from '../../modules/media-detector.js'
import styles from './layout.css'

const layouts = {
  // iphone 7+ screen width is 414px
  '(max-device-width: 414px) and (orientation: portrait)': 'portrait',
  // iphone 7+ screen width in landscape orientation is 736px
  '(max-device-width: 736px) and (orientation: landscape)': 'landscape',
  '(min-device-width: 737px)': 'default'
}

function getLayoutTypeClass (type) {
  return styles[`layout_${type}`]
}

export default class Layout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 'default'
    }
  }

  componentDidMount () {
    this.mediaDetector = new MediaDetector(layouts, type => {
      this.setState({ type })
    })
  }

  componentWillUnmount () {
    this.mediaDetector.destroy()
  }

  render () {
    const layoutClass = getLayoutTypeClass(this.state.type)

    return (
      <div className={`${styles.layout} ${layoutClass}`}>
        <div className={styles.header}>
          <div className={styles.logo}>Counter <sup className={styles.logoVersion}>0.1</sup></div>
        </div>
        <div className={styles.content}>
          {this.props.children}
        </div>
        <div className={styles.footer}>
          Copyright 2017, Oleg Gromov
        </div>
      </div>
    )
  }
}
