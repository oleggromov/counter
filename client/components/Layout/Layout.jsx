import React, { Component } from 'react'
import styles from './layout.css'

function getLayoutTypeClass (type) {
  return styles[`layout_${type}`]
}

export default class Layout extends Component {
  render () {
    const layoutClass = getLayoutTypeClass(this.props.mediaType)

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
