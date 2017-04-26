import React, { Component } from 'react'
import styles from './layout.css'
import Header from '../Header/Header.jsx'
import DateDisplay from '../DateDisplay/DateDisplay.jsx'

const link = 'http://oleggromov.com'

export default class Layout extends Component {
  render () {
    const mediaType = this.props.mediaType
    const dateDisplay = <DateDisplay mediaType={mediaType} />

    return (
      <div className={`${styles.layout} ${styles[mediaType]}`}>
        <Header
          mediaType={mediaType}
          rightComponent={dateDisplay} />

        <div className={styles.content}>
          {this.props.children}
        </div>

        <div className={styles.footer}>
          Copyright 2017, <a href={link} target='blank'>Oleg Gromov</a>
        </div>
      </div>
    )
  }
}
