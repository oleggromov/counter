import React, { Component } from 'react'
import Layout from '../Layout/Layout.jsx'
import Title from '../Title/Title.jsx'
import ListsItem from '../ListsItem/ListsItem.jsx'
import listsStore from '../../modules/lists-store'
import ListEdit from '../ListEdit/ListEdit.jsx'

export default class ScreenMain extends Component {
  constructor (props) {
    super(props)

    this.state = {
      lists: null,
      showDeletable: false
    }
  }

  toggleDelete (showDeletable) {
    if (showDeletable !== this.state.showDeletable) {
      this.setState({ showDeletable })
    }
  }

  addList (list) {
    listsStore.listAdd(list)
    this.updateState()
  }

  deleteList (id) {
    listsStore.listDelete(id)
    this.updateState()
  }

  componentWillMount () {
    this.updateState()
  }

  updateState () {
    const lists = listsStore.listsGet()

    this.setState({
      lists: lists
    })
  }

  getTitle () {
    return (
      <Title>
        All lists
      </Title>
    )
  }

  renderListItem (item) {
    const count = item.items.length

    return (
      <ListsItem
        key={item.id}
        link={`/lists/${item.id}`}
        date={count ? item.items[0].date : null}
        count={count}
        onDelete={this.deleteList.bind(this, item.id)}
        showDelete={item.isDeletable && this.state.showDeletable}>
        {item.name}
      </ListsItem>
    )
  }

  render () {
    return (
      <Layout title={this.getTitle()}>
        {this.state.lists.map(this.renderListItem, this)}

        <ListEdit
          onListAdd={this.addList.bind(this)}
          onToggleDelete={this.toggleDelete.bind(this)} />
      </Layout>
    )
  }
}
