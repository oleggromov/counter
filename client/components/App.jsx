import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import detectMedia from '../modules/detect-media'
import api from '../modules/api'
import Layout from './Layout/Layout.jsx'
import ScreenMain from './ScreenMain/ScreenMain.jsx'
import ScreenList from './ScreenList/ScreenList.jsx'
import ScreenLogin from './ScreenLogin/ScreenLogin.jsx'
import ScreenSettings from './ScreenSettings/ScreenSettings.jsx'

const afterDeletedUrl = '/'

const mediaType = detectMedia({
  '(max-device-width: 799px)': 'mobile',
  '(min-device-width: 800px)': 'desktop'
})

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loginData: null
    }
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
      .catch((err) => {
        window.alert('Uncaught error! See the dev console')
        console.error(err)
      })
  }

  render () {
    let classes = 'app'
    if (mediaType !== 'mobile') {
      classes = `${classes} app_desktop`
    }

    const settingsScreen = () => <ScreenSettings onDeleteUser={this.deleteUser.bind(this)} />

    return (
      <Router>
        <div className={classes}>
          <Layout loginData={this.state.loginData}>
            <Route path='/' exact component={ScreenMain} />
            <Route path='/lists/:id' component={ScreenList} />
            <Route path='/auth/login' component={ScreenLogin} />
            <Route path='/settings' component={settingsScreen} />
          </Layout>
        </div>
      </Router>
    )
  }
}
