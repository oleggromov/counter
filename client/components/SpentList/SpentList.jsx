import React, { Component } from 'react'
import styles from './spent-list.css'
import moment from 'moment'
import DateFormatted from '../DateFormatted/DateFormatted.jsx'

function getDay (dateStr) {
  return moment(dateStr).date()
}

export default class SpentList extends Component {
  /**
   * Splits items into arrays by day.
   * @param {Array} items
   * @return {Array}
   */
  groupByDays (items) {
    let prevDay = null

    return items.reduce((acc, cur) => {
      const curDay = getDay(cur.date)

      if (curDay !== prevDay) {
        acc.push([])
      }

      acc[acc.length - 1].push(cur)
      prevDay = curDay

      return acc
    }, [])
  }

  render () {
    const items = this.props.items

    if (items.length) {
      const days = this.groupByDays(items)
      return (<table className={styles.table}>
        {this.renderDays(days)}
      </table>)
    } else {
      return (<p>There're no items yet</p>)
    }
  }

  renderDays (days) {
    return days.map(day => {
      const currentDay = day[0].date
      const items = this.renderItems(day)
      const key = moment(currentDay).valueOf()

      return (
        <tbody key={key}>
          <tr className={styles.row} key={key}><th colSpan='2' className={styles.caption}>
            <DateFormatted date={currentDay} />
          </th></tr>
          {items}
        </tbody>
      )
    })
  }

  renderItems (items) {
    return items.map(item => {
      const deleteItem = this.props.onItemDelete.bind(undefined, item.id)

      return (
        <tr className={styles.row} key={item.id}>
          <td className={styles.currency}>
            $
          </td>
          <td className={styles.amount}>
            {item.amount.toFixed(2)}
          </td>
          <td className={styles.type}>
            {item.type}
          </td>
          <td className={styles.delete}>
            <span onClick={deleteItem}>Delete</span>
          </td>
        </tr>
      )
    })
  }
}
