import React, { Component } from 'react'
import Layout from './Layout/Layout.jsx'
import SpentForm from './SpentForm/SpentForm.jsx'
import SpentList from './SpentList/SpentList.jsx'
import listsStore from '../modules/lists-store'
import detectMedia from '../modules/detect-media'

const listId = 0

const mediaConfig = {
  // iphone 7+ screen width is 414px
  '(max-device-width: 414px) and (orientation: portrait)': 'portrait',
  // iphone 7+ screen width in landscape orientation is 736px
  '(max-device-width: 736px) and (orientation: landscape)': 'landscape',
  '(min-device-width: 737px)': 'default'
}

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      readyToDeleteId: null
    }

    this.addItem = this.addItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.setReadyToDelete = this.setReadyToDelete.bind(this)
    this.unsetReadyToDelete = this.setReadyToDelete.bind(this, null)
  }

  componentWillMount () {
    this.setState({ mediaType: detectMedia(mediaConfig) })
    this.updateState()
  }

  updateState () {
    this.setState(() => {
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

  setReadyToDelete (id) {
    if (this.state.readyToDeleteId === id) {
      id = null
    }

    this.setState({ readyToDeleteId: id })
  }

  getContent () {
    const items = this.state.items

    if (items.length) {
      return (
        <SpentList
          mediaType={this.state.mediaType}
          items={items}
          readyToDeleteId={this.state.readyToDeleteId}
          onReadyToDelete={this.setReadyToDelete}
          onItemDelete={this.deleteItem} />
      )
    } else {
      return (
        <p>There're no items yet</p>
      )
    }
  }

  render () {
    const mediaType = this.state.mediaType

    return (
      <Layout mediaType={mediaType}>
        <div onClick={this.unsetReadyToDelete}>
          <SpentForm
            mediaType={mediaType}
            onItemAdd={this.addItem} />

          {this.getContent()}
        </div>
      </Layout>
    )
  }
}
