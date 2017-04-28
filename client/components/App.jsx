import React, { Component } from 'react'
import DeviceSpecificLayout from './DeviceSpecificLayout/DeviceSpecificLayout.jsx'
import listsStore from '../modules/lists-store.js'

const listId = 0

export default class App extends Component {
  constructor (props) {
    super(props)

    this.addItem = this.addItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  componentWillMount () {
    this.updateState()
  }

  updateState () {
    this.setState(prevState => {
      // TODO remake this!
      return listsStore.listGet(listId) || { items: [] }
    })
  }

  addItem (item) {
    listsStore.itemAdd(listId, item)
    this.updateState()
  }

  deleteItem (id) {
    listsStore.itemDelete(listId, id)
    this.updateState()
  }

  render () {
    return (
      <DeviceSpecificLayout
        items={this.state.items}
        onItemAdd={this.addItem}
        onItemDelete={this.deleteItem} />
    )
  }
}
