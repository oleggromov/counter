import React, { Component } from 'react'
import Login from '../Login/Login.jsx'

export default class ScreenLogin extends Component {
  render () {
    return (
      <Login url='/auth/facebook' />
    )
  }
}
