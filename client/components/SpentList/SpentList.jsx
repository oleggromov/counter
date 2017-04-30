import React from 'react'
import moment from 'moment'
import SpentListDay from '../SpentListDay/SpentListDay.jsx'
import ContainerSpentListItem from '../ContainerSpentListItem/ContainerSpentListItem.jsx'
import groupItemsByDays from './group-items-by-days.js'

// TODO: refactor this to make it simplier
const SpentList = (props) => {
  const {
    mediaType,
    onItemDelete,
    readyToDeleteId,
    onReadyToDelete
  } = props
  const days = groupItemsByDays(props.items)

  const renderItem = item => {
    const deleteItem = onItemDelete.bind(undefined, item.id)
    const readyToDelete = item.id === readyToDeleteId

    return (
      <ContainerSpentListItem
        mediaType={mediaType}
        item={item}
        isDeletable={item.isDeletable}
        readyToDelete={readyToDelete}
        onPreDelete={onReadyToDelete}
        onDelete={deleteItem}
        key={item.id} />
    )
  }

  const renderDay = dayItems => {
    const currentDay = dayItems[0].date
    const key = moment(currentDay).valueOf()

    return (
      <SpentListDay
        mediaType={mediaType}
        currentDay={currentDay}
        key={key}>

        {dayItems.map(renderItem)}

      </SpentListDay>
    )
  }

  return (
    <div>
      {days.map(renderDay)}
    </div>
  )
}

export default SpentList
