import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import detectMedia from '../modules/detect-media'
import api from '../modules/api'
import cloneAndMutate from '../modules/clone-and-mutate'
import Layout from './Layout/Layout.jsx'
import ScreenMain from './ScreenMain/ScreenMain.jsx'
import ScreenList from './ScreenList/ScreenList.jsx'
import ScreenLogin from './ScreenLogin/ScreenLogin.jsx'
import ScreenSettings from './ScreenSettings/ScreenSettings.jsx'
import Message from './Message/Message.jsx'

const afterDeletedUrl = '/'

const mediaType = detectMedia({
  '(max-device-width: 799px)': 'mobile',
  '(min-device-width: 800px)': 'desktop'
})

const getComponentRender = (Component, commonProps) => {
  return (props) => {
    const renderProps = Object.assign({}, commonProps, props)
    return (
      <Component {...renderProps} />
    )
  }
}

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loginData: null,
      messages: [],
      currentMessage: null,
      messageIsVisible: false
    }

    this.dispatchError = this.dispatchError.bind(this)
  }

  componentWillMount () {
    api.getAuthInfo()
      .then(({data}) => this.setState({ loginData: data }))
      .catch(() => this.setState({ loginData: null }))
  }

  deleteUser () {
    api.deleteData()
      .then((data) => {
        this.addMessage({
          title: 'Success!',
          text: data.data.message,
          isInfo: true,
          onAfterClose: () => {
            window.location.href = afterDeletedUrl
          }
        })
      })
      .catch(this.dispatchError)
  }

  dispatchError (originalError) {
    const { message, text } = originalError.error
    this.addMessage({
      title: message,
      text
    })
  }

  addMessage (msg) {
    this.setState(cloneAndMutate(state => {
      if (!state.messageIsVisible) {
        state.currentMessage = msg
        state.messageIsVisible = true
      } else {
        state.messages.push(msg)
      }
    }))
  }

  showNextMessage () {
    if (this.state.messages.length) {
      this.setState(cloneAndMutate(state => {
        state.currentMessage = state.messages.shift()
      }))
    } else {
      this.setState({ messageIsVisible: false })
    }
  }

  renderMessage () {
    const message = this.state.currentMessage || {}

    return (
      <Message
        title={message.title}
        text={message.text}
        isVisible={this.state.messageIsVisible}
        isInfo={message.isInfo}
        onClose={this.showNextMessage.bind(this)}
        onAfterClose={message.onAfterClose} />
    )
  }

  render () {
    let classes = 'app'
    if (mediaType !== 'mobile') {
      classes = `${classes} app_desktop`
    }

    const screenProps = {
      onError: this.dispatchError
    }

    const login = getComponentRender(ScreenLogin, screenProps)
    const main = getComponentRender(ScreenMain, screenProps)
    const list = getComponentRender(ScreenList, screenProps)
    const settings = getComponentRender(ScreenSettings, Object.assign({}, screenProps, {
      onDeleteUser: this.deleteUser.bind(this)
    }))

    return (
      <Router>
        <div className={classes}>
          <Layout loginData={this.state.loginData} blur={this.state.messageIsVisible}>
            <Route path='/auth/login' render={login} />
            <Route exact path='/' render={main} />
            <Route path='/lists/:id' render={list} />
            <Route path='/settings' render={settings} />
          </Layout>

          { this.renderMessage() }
        </div>
      </Router>
    )
  }
}
