import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SpentForm from '../SpentForm/SpentForm.jsx'
import SpentList from '../SpentList/SpentList.jsx'
import Loading from '../Loading/Loading.jsx'
import Title from '../Title/Title.jsx'
import api from '../../modules/api'
import cloneDeep from 'lodash/cloneDeep'
import cloneAndMutate from '../../modules/clone-and-mutate'
import css from './screen-list.css'

const stringBack = 'Back'

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
    api.getList(this.state.listId)
      .then(({data}) => {
        this.setState({
          currentList: data,
          isLoaded: true
        })
      })
      .catch(this.props.onError)
  }

  addItem (item) {
    const loadingId = this.addIntermediateItem(item)

    api.createItem(this.state.listId, item)
      .then(({data}) => {
        this.setState(cloneAndMutate(state => {
          const items = state.currentList.items
          const insertedIndex = items.findIndex(item => item.id === loadingId)
          items[insertedIndex] = data
        }))
      })
      .catch(this.props.onError)
  }

  addIntermediateItem (item) {
    item = cloneDeep(item)

    item.isLoading = true
    item.id = Date.now()

    this.setState(cloneAndMutate(state => {
      state.currentList.items.unshift(item)
      state.currentList.itemsCount++
    }))

    return item.id
  }

  deleteItem (id) {
    this.setState(cloneAndMutate(state => {
      const index = this.state.currentList.items.findIndex(item => item.id === id)
      state.currentList.items[index].isLoading = true
    }))

    api.deleteItem(this.state.listId, id)
      .then(({data}) => {
        this.setState(cloneAndMutate(state => {
          state.currentList.items = state.currentList.items.filter(({id}) => id !== data.itemId)
          state.currentList.itemsCount--
        }))
      })
      .catch(this.props.onError)
  }

  setReadyToDelete (id) {
    if (this.state.readyToDeleteId === id) {
      id = null
    }

    this.setState({ readyToDeleteId: id })
  }

  renderTitle () {
    if (this.state.isLoaded) {
      return (
        <Title back={<Link to='/'>{stringBack}</Link>}>
          {this.state.currentList.name}
        </Title>
      )
    }
  }

  renderContent () {
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

  render () {
    if (!this.state.isLoaded) {
      return (
        <div className={css.loading}>
          <Loading />
        </div>
      )
    }

    return (
      <div>
        <Title back={<Link to='/'>{stringBack}</Link>}>
          {this.state.currentList.name}
        </Title>
        <div onClick={this.unsetReadyToDelete}>
          <SpentForm onItemAdd={this.addItem} />
          {this.renderContent()}
        </div>
      </div>
    )
  }
}
