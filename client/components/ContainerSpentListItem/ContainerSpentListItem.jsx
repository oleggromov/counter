import React, { Component } from 'react'
import SpentListItem from '../SpentListItem/SpentListItem.jsx'

const currency = '$'

export default class ContainerSpentListItem extends Component {
  constructor (props) {
    super(props)

    this.setPreDelete = this.props.isDeletable
      ? this.setPreDelete.bind(this)
      : null
  }

  setPreDelete (e) {
    this.props.onPreDelete(this.props.item.id)
    e.stopPropagation()
  }

  render () {
    const props = this.props
    const presentationalProps = {
      currency,
      value: props.item.value,
      name: props.item.name,
      isReadyToDelete: props.readyToDelete,
      onReadyToDelete: this.setPreDelete,
      onDelete: props.onDelete,
      isLoading: props.isLoading
    }

    return (
      <SpentListItem {...presentationalProps} />
    )
  }
}
