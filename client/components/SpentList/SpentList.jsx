import React, { Component } from 'react'
import styles from './spent-list.css'
import moment from 'moment'
import SpentListDay from '../SpentListDay/SpentListDay.jsx'
import SpentListItem from '../SpentListItem/SpentListItem.jsx'

function getDay (dateStr) {
  return moment(dateStr).date()
}

/**
 * Splits items into arrays by day.
 * @param {Array} items
 * @return {Array}
 */
function groupByDays (items) {
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

export default class SpentList extends Component {
  render () {
    const items = this.props.items

    return items.length
      ? this.renderContent(items)
      : this.renderPlaceholder()
  }

  renderContent (items) {
    const days = groupByDays(items)

    return <table className={`${styles.spentList} ${styles[this.props.mediaType]}`}>
      {this.renderDays(days)}
    </table>
  }

  renderPlaceholder () {
    return <p>There're no items yet</p>
  }

  renderDays (days) {
    return days.map(day => {
      const currentDay = day[0].date
      const key = moment(currentDay).valueOf()

      return <SpentListDay
        mediaType={this.props.mediaType}
        currentDay={currentDay}
        key={key}>

        {this.renderItems(day)}

      </SpentListDay>
    })
  }

  renderItems (items) {
    return items.map(item => {
      const deleteItem = this.props.onItemDelete.bind(undefined, item.id)

      return <SpentListItem
        mediaType={this.props.mediaType}
        item={item}
        onDelete={deleteItem}
        key={item.id} />
    })
  }
}
