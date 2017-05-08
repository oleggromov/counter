import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../Layout/Layout.jsx'
import SpentForm from '../SpentForm/SpentForm.jsx'
import SpentList from '../SpentList/SpentList.jsx'
import Title from '../Title/Title.jsx'
import api from '../../modules/api'
import cloneDeep from 'lodash/cloneDeep'

export default class ScreenList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      readyToDeleteId: null,
      listId: Number(this.props.match.params.id),
      isLoaded: false
    }

    this.addItem = this.addItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.setReadyToDelete = this.setReadyToDelete.bind(this)
    this.unsetReadyToDelete = this.setReadyToDelete.bind(this, null)
  }

  componentWillMount () {
    this.updateState()
  }

  updateState () {
    api.getList(this.state.listId)
      .then(({data}) => {
        this.setState({
          currentList: data,
          isLoaded: true
        })
      })
  }

  addItem (item) {
    api.createItem(this.state.listId, item)
      .then(({data}) => {
        this.setState(prevState => {
          let newState = cloneDeep(prevState)
          newState.currentList.items.unshift(data)
          newState.currentList.itemsCount++
          return newState
        })
      })
  }

  deleteItem (id) {
    api.deleteItem(this.state.listId, id)
      .then(({data}) => {
        this.setState(prevState => {
          let newState = cloneDeep(prevState)
          newState.currentList.items = newState.currentList.items.filter(({id}) => id !== data.itemId)
          newState.currentList.itemsCount--
          return newState
        })
      })
  }

  setReadyToDelete (id) {
    if (this.state.readyToDeleteId === id) {
      id = null
    }

    this.setState({ readyToDeleteId: id })
  }

  getContent () {
    if (this.state.isLoaded) {
      const items = this.state.currentList.items

      if (items.length) {
        return (
          <SpentList
            items={items}
            readyToDeleteId={this.state.readyToDeleteId}
            onReadyToDelete={this.setReadyToDelete}
            onItemDelete={this.deleteItem} />
        )
      }
    }
  }

  getTitle () {
    if (this.state.isLoaded) {
      return (
        <Title
          back={<Link to='/'>To the main screen</Link>}>
          {this.state.currentList.name}
        </Title>
      )
    }
  }

  render () {
    return (
      <Layout
        title={this.getTitle()}>
        <div onClick={this.unsetReadyToDelete}>
          <SpentForm
            onItemAdd={this.addItem} />

          {this.getContent()}
        </div>
      </Layout>
    )
  }
}
