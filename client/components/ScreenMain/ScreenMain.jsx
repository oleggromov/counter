import React from 'react'
import Layout from '../Layout/Layout.jsx'
import { Link } from 'react-router-dom'

export default (props) => {
  return (
    <Layout mediaType={props.mediaType}>
      <h1>Main view</h1>
      <Link to='/lists/0'>0</Link>
      {' '}
      <Link to='/lists/1'>1</Link>
    </Layout>
  )
}
