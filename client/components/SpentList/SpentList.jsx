import React, { Component } from 'react'
import moment from 'moment'
import { cloneDeep } from 'lodash'
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
  constructor (props) {
    super(props)

    this.state = {
      items: this.props.items,
      readyToDelete: null
    }

    if (this.props.mediaType === 'desktop') {
      this.setReadyToDelete = function () {}
    } else {
      this.setReadyToDelete = this.setReadyToDelete.bind(this)
    }
  }

  setReadyToDelete (id) {
    this.setState((prevState) => {
      let newState = cloneDeep(prevState)

      newState.readyToDelete = id

      return newState
    })
  }

  render () {
    const items = this.props.items

    return items.length
      ? this.renderContent(items)
      : this.renderPlaceholder()
  }

  renderContent (items) {
    const days = groupByDays(items)

    return (
      <div>
        {this.renderDays(days)}
      </div>
    )
  }

  renderPlaceholder () {
    return (
      <p>There're no items yet</p>
    )
  }

  renderDays (days) {
    return days.map(day => {
      const currentDay = day[0].date
      const key = moment(currentDay).valueOf()

      return (
        <SpentListDay
          mediaType={this.props.mediaType}
          currentDay={currentDay}
          key={key}>

          {this.renderItems(day)}

        </SpentListDay>
      )
    })
  }

  renderItems (items) {
    return items.map(item => {
      const deleteItem = this.props.onItemDelete.bind(undefined, item.id)
      const readyToDelete = item.id === this.state.readyToDelete

      return (
        <SpentListItem
          mediaType={this.props.mediaType}
          item={item}
          readyToDelete={readyToDelete}
          onPreDelete={this.setReadyToDelete}
          onDelete={deleteItem}
          key={item.id} />
      )
    })
  }
}
