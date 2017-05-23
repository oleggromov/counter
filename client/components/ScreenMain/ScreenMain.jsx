import React, { Component } from 'react'
import Title from '../Title/Title.jsx'
import ListsItem from '../ListsItem/ListsItem.jsx'
import ListEdit from '../ListEdit/ListEdit.jsx'
import api from '../../modules/api'
import cloneAndMutate from '../../modules/clone-and-mutate'

const handleError = err => {
  console.warn('Error!')
  console.log(err)
}

export default class ScreenMain extends Component {
  constructor (props) {
    super(props)

    this.state = {
      lists: null,
      showDeletable: false,
      pendingLoad: true
    }
  }

  toggleDelete (showDeletable) {
    if (showDeletable !== this.state.showDeletable) {
      this.setState({ showDeletable })
    }
  }

  addList (list) {
    const loadingId = Date.now()

    list.isLoading = true
    list.id = loadingId

    this.setState(cloneAndMutate(state => state.lists.push(list)))

    api.createList(list)
      .then(({data}) => {
        this.setState(cloneAndMutate(state => {
          const insertedIndex = state.lists.findIndex(item => item.id === loadingId)
          state.lists[insertedIndex] = data
        }))
      })
      .catch(handleError)
  }

  deleteList (id) {
    this.setState(cloneAndMutate(state => {
      const index = state.lists.findIndex(item => item.id === id)
      state.lists[index].isLoading = true
    }))

    api.deleteList(id)
      .then(({data}) => {
        this.setState(cloneAndMutate(state => {
          state.lists = state.lists.filter(item => {
            return item.id !== data.listId
          })
        }))
      })
      .catch(handleError)
  }

  componentWillMount () {
    api.getLists()
      .then(data => {
        this.setState({
          lists: data.data,
          pendingLoad: false
        })
      })
      .catch(handleError)
  }

  renderListItem (item) {
    return (
      <ListsItem
        key={item.id}
        link={`/lists/${item.id}`}
        date={item.lastDate}
        count={item.itemsCount}
        onDelete={this.deleteList.bind(this, item.id)}
        isLoading={item.isLoading}
        isReadyToDelete={item.itemsCount === 0 && this.state.showDeletable}>
        {item.name}
      </ListsItem>
    )
  }

  renderItems () {
    if (!this.state.pendingLoad) {
      return this.state.lists.map(this.renderListItem, this)
    }
  }

  render () {
    return (
      <div>
        <Title>All lists</Title>

        {this.renderItems()}

        <ListEdit
          onListAdd={this.addList.bind(this)}
          onToggleDelete={this.toggleDelete.bind(this)} />
      </div>
    )
  }
}
