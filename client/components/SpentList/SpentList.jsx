import React from 'react'
import SpentListDay from '../SpentListDay/SpentListDay.jsx'
import ContainerSpentListItem from '../ContainerSpentListItem/ContainerSpentListItem.jsx'
import groupItemsByDays from './group-items-by-days.js'

// TODO: refactor this to make it simplier
const SpentList = (props) => {
  const {
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
        item={item}
        isDeletable={item.isDeletable}
        readyToDelete={readyToDelete}
        onPreDelete={onReadyToDelete}
        onDelete={deleteItem}
        key={item.id}
        isLoading={item.isLoading} />
    )
  }

  const renderDay = dayItems => {
    const currentDay = dayItems[0].date
    const key = new Date(currentDay).valueOf()

    return (
      <SpentListDay
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
