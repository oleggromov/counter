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
      type: 'default'
    }
  }

  componentDidMount () {
    this.mediaDetector = new MediaDetector(layouts, type => {
      this.setState({ type })
    })
  }

  componentWillUnmount () {
    this.mediaDetector.destroy()
  }

  render () {
    return (
      <Layout mediaType={this.state.type}>
        <div>
          <SpentForm onItemAdd={this.props.onItemAdd} />
          <SpentList
            mediaType={this.state.type}
            items={this.props.items}
            onItemDelete={this.props.onItemDelete} />
        </div>
      </Layout>
    )
  }
}
