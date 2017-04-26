import React, { Component } from 'react'
import styles from './layout.css'
import Header from '../Header/Header.jsx'

export default class Layout extends Component {
  render () {
    const mediaType = this.props.mediaType

    return (
      <div className={`${styles.layout} ${styles[mediaType]}`}>
        <Header mediaType={mediaType} />

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
