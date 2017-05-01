import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../Layout/Layout.jsx'
import SpentForm from '../SpentForm/SpentForm.jsx'
import SpentList from '../SpentList/SpentList.jsx'
import Title from '../Title/Title.jsx'
import listsStore from '../../modules/lists-store'

export default class ScreenList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      readyToDeleteId: null,
      listId: Number(this.props.match.params.id)
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
    this.setState({
      currentList: listsStore.listGet(this.state.listId)
    })
  }

  addItem (item) {
    listsStore.itemAdd(this.state.listId, item)
    this.updateState()
  }

  deleteItem (id) {
    listsStore.itemDelete(this.state.listId, id)
    this.updateState()
  }

  setReadyToDelete (id) {
    if (this.state.readyToDeleteId === id) {
      id = null
    }

    this.setState({ readyToDeleteId: id })
  }

  getContent () {
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

  getTitle () {
    return (
      <Title
        back={<Link to='/'>To the main screen</Link>}>
        {this.state.currentList.name}
      </Title>
    )
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
