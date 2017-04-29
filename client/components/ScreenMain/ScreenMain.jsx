import React, { Component } from 'react'
import Layout from '../Layout/Layout.jsx'
import Title from '../Title/Title.jsx'
import ListsItem from '../ListsItem/ListsItem.jsx'
import listsStore from '../../modules/lists-store'

export default class ScreenMain extends Component {
  constructor (props) {
    super(props)

    this.state = {
      lists: null
    }
  }

  componentWillMount () {
    this.setState({
      lists: listsStore.listsGet()
    })
  }

  getTitle () {
    return (
      <Title mediaType={this.props.mediaType}>
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
        mediaType={this.props.mediaType}>
        {item.name}
      </ListsItem>
    )
  }

  render () {
    return (
      <Layout
        title={this.getTitle()}
        mediaType={this.props.mediaType}>

        {this.state.lists.map(this.renderListItem, this)}
      </Layout>
    )
  }
}
