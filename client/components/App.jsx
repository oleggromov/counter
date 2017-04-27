import React, { Component } from 'react'
import DeviceSpecificLayout from './DeviceSpecificLayout/DeviceSpecificLayout.jsx'
import { cloneDeep } from 'lodash'
import localStorage from '../modules/local-storage.js'
import moment from 'moment'

const canBeDeleted = {
  maxAge: 15,
  unit: 'minutes'
}

function markDeletable (items) {
  const now = moment()

  return items.map(item => {
    let newItem = cloneDeep(item)
    const age = now.diff(moment(item.date), canBeDeleted.unit, true)

    newItem.isDeletable = age < canBeDeleted.maxAge
    newItem.age = age

    return newItem
  })
}

export default class App extends Component {
  constructor (props) {
    super(props)

    let spentItems = localStorage.get()
    spentItems = markDeletable(spentItems)

    this.state = { spentItems }
    this.nextId = this.getNextId(spentItems)

    this.addItem = this.addItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  getNextId (items) {
    return items.length
      ? items[0].id + 1
      : 0
  }

  generateId () {
    return this.nextId++
  }

  addItem (item) {
    this.setState(prevState => {
      let newState = cloneDeep(prevState)

      newState.spentItems.unshift({
        id: this.generateId(),
        amount: Number(item.amount),
        type: item.type,
        date: moment().format('YYYY-MM-DD HH:mm:ss')
      })

      newState.spentItems = markDeletable(newState.spentItems)

      localStorage.set(newState.spentItems)

      return newState
    })
  }

  deleteItem (id) {
    this.setState(prevState => {
      let newState = cloneDeep(prevState)

      newState.spentItems = newState.spentItems.filter(item => {
        return item.id !== id
      })

      newState.spentItems = markDeletable(newState.spentItems)

      localStorage.set(newState.spentItems)

      return newState
    })
  }

  render () {
    return (
      <DeviceSpecificLayout
        items={this.state.spentItems}
        onItemAdd={this.addItem}
        onItemDelete={this.deleteItem} />
    )
  }
}
