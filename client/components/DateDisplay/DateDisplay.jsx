import React, { Component } from 'react'
import DateFormatted from '../DateFormatted/DateFormatted.jsx'
import Time from '../Time/Time.jsx'
import styles from './date-display.css'

const reqFrame = window.requestAnimationFrame
const freq = 1000

export default class DateDisplay extends Component {
  constructor () {
    super()
    this.update = this.update.bind(this)
  }

  update () {
    if (this.active) {
      const now = new Date()

      if (now - (this.prev || 0) >= freq) {
        this.setState(now)
        this.prev = now
      }

      reqFrame(this.update)
    }
  }

  componentDidMount () {
    this.active = true
    this.update()
  }

  componentWillUnmount () {
    this.active = false
  }

  render () {
    return (
      <div className={`${styles.dateDisplay} ${styles[this.props.mediaType]}`}>
        <div className={styles.date}>
          <DateFormatted date={this.state} />
        </div>
        <div>
          <Time date={this.state} />
        </div>
      </div>
    )
  }
}
