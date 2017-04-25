import React, { Component } from 'react'
import Layout from './Layout/Layout.jsx'
import DateDisplay from './DateDisplay/DateDisplay.jsx'
import SpentForm from './SpentForm/SpentForm.jsx'
import SpentList from './SpentList/SpentList.jsx'
import { cloneDeep } from 'lodash'
import localStorage from '../modules/local-storage.js'
import moment from 'moment'

export default class App extends Component {
  constructor (props) {
    super(props)

    const spentItems = localStorage.get()

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

      localStorage.set(newState.spentItems)

      return newState
    })
  }

  render () {
    return (
      <Layout>
        <div>
          <DateDisplay />
          <SpentForm onItemAdd={this.addItem} />
          <SpentList onItemDelete={this.deleteItem} items={this.state.spentItems} />
        </div>
      </Layout>
    )
  }
}
