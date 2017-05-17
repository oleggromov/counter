import React, { Component } from 'react'
import Layout from '../Layout/Layout.jsx'
import Login from '../Login/Login.jsx'

export default class ScreenLogin extends Component {
  render () {
    return (
      <Layout>
        <Login url='/auth/facebook' />
      </Layout>
    )
  }
}
