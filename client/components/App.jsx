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
      errors: [],
      currentError: null
    }

    this.dispatchError = this.dispatchError.bind(this)
  }

  componentWillMount () {
    api.getAuthInfo()
      .then(({data}) => {
        this.setState({ loginData: data })
      })
      .catch(() => {
        this.setState({ loginData: null })
      })
  }

  deleteUser () {
    api.deleteData()
      .then((data) => {
        window.alert(data.data.message)
        window.location.href = afterDeletedUrl
      })
      .catch(this.dispatchError)
  }

  dispatchError (originalError) {
    const { message, text } = originalError.error
    const err = {
      title: message,
      text
    }

    this.setState(cloneAndMutate(state => {
      if (!state.currentError) {
        state.currentError = err
      } else {
        state.errors.push(err)
      }
    }))
  }

  showNextError () {
    if (this.state.errors.length) {
      this.setState(cloneAndMutate(state => {
        state.currentError = state.errors.shift()
      }))
    } else {
      this.setState({ currentError: null })
    }
  }

  renderMessage () {
    const error = this.state.currentError || { title: null, text: null }

    return (
      <Message
        title={error.title}
        text={error.text}
        onClose={this.showNextError.bind(this)} />
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

    const hasError = Boolean(this.state.currentError)

    return (
      <Router>
        <div className={classes}>
          <Layout loginData={this.state.loginData} blur={hasError}>
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
