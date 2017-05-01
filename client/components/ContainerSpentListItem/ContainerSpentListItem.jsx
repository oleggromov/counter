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
      amount: props.item.amount,
      type: props.item.type,
      isReadyToDelete: props.readyToDelete,
      onReadyToDelete: this.setPreDelete,
      onDelete: props.onDelete
    }

    return (
      <SpentListItem {...presentationalProps} />
    )
  }
}
