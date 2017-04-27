import React, { Component } from 'react'
import moment from 'moment'
import SpentListDay from '../SpentListDay/SpentListDay.jsx'
import SpentListItem from '../SpentListItem/SpentListItem.jsx'
import groupItemsByDays from '../../modules/group-items-by-days.js'

export default class SpentList extends Component {
  render () {
    const items = this.props.items

    return items.length
      ? this.renderContent(items)
      : this.renderPlaceholder()
  }

  renderContent (items) {
    const days = groupItemsByDays(items)

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
      const readyToDelete = item.id === this.props.readyToDeleteId

      return (
        <SpentListItem
          mediaType={this.props.mediaType}
          item={item}
          isDeletable={item.isDeletable}
          readyToDelete={readyToDelete}
          onPreDelete={this.props.onReadyToDelete}
          onDelete={deleteItem}
          key={item.id} />
      )
    })
  }
}
