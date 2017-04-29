import React, { Component } from 'react'
import MediaDetector from '../../modules/media-detector.js'
import Layout from '../Layout/Layout.jsx'
import SpentForm from '../SpentForm/SpentForm.jsx'
import SpentList from '../SpentList/SpentList.jsx'

const layouts = {
  // iphone 7+ screen width is 414px
  '(max-device-width: 414px) and (orientation: portrait)': 'portrait',
  // iphone 7+ screen width in landscape orientation is 736px
  '(max-device-width: 736px) and (orientation: landscape)': 'landscape',
  '(min-device-width: 737px)': 'default'
}

export default class DeviceSpecificLayout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 'default',
      readyToDeleteId: null
    }

    this.setReadyToDelete = this.setReadyToDelete.bind(this)
    this.unsetReadyToDelete = this.setReadyToDelete.bind(this, null)
  }

  componentWillMount () {
    this.mediaDetector = new MediaDetector(layouts, type => {
      this.setState({ type })
    })
  }

  componentWillUnmount () {
    this.mediaDetector.destroy()
  }

  setReadyToDelete (id) {
    if (this.state.type !== 'default') {
      if (this.state.readyToDeleteId === id) {
        id = null
      }

      this.setState({ readyToDeleteId: id })
    }
  }

  render () {
    const listContent = this.props.items.length
      ? (<SpentList
        mediaType={this.state.type}
        items={this.props.items}
        readyToDeleteId={this.state.readyToDeleteId}
        onReadyToDelete={this.setReadyToDelete}
        onItemDelete={this.props.onItemDelete} />)
      : (<p>There're no items yet</p>)

    return (
      <Layout mediaType={this.state.type}>
        <div onClick={this.unsetReadyToDelete}>
          <SpentForm
            mediaType={this.state.type}
            onItemAdd={this.props.onItemAdd} />

          {listContent}
        </div>
      </Layout>
    )
  }
}
