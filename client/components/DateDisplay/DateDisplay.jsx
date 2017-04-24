import React, { Component } from 'react'
import DateFormatted from '../DateFormatted/DateFormatted.jsx'
import Time from '../Time/Time.jsx'
import styles from './date-display.css'

function getNow () {
  return new Date()
}

export default class DateDisplay extends Component {
  constructor () {
    super()
    this.state = getNow()
  }

  componentDidMount () {
    this.timer = setInterval(() => {
      this.tick()
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  tick () {
    this.setState(getNow())
  }

  render () {
    return (
      <div className={styles.dateDisplay}>
        <div className={styles.date}>
          <DateFormatted date={this.state} />
        </div>
        <div className={styles.time}>
          <Time date={this.state} />
        </div>
      </div>
    )
  }
}
