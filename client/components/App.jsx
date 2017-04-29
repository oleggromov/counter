import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import detectMedia from '../modules/detect-media'
import ScreenMain from './ScreenMain/ScreenMain.jsx'
import ScreenList from './ScreenList/ScreenList.jsx'

const mediaType = detectMedia({
  // iphone 7+ screen width is 414px
  '(max-device-width: 414px) and (orientation: portrait)': 'portrait',
  // iphone 7+ screen width in landscape orientation is 736px
  '(max-device-width: 736px) and (orientation: landscape)': 'landscape',
  '(min-device-width: 737px)': 'default'
})

const MediaScreenList = ({ match }) => (<ScreenList mediaType={mediaType} match={match} />)
const MediaScreenMain = ({ match }) => (<ScreenMain mediaType={mediaType} match={match} />)

export default () => {
  return (
    <Router>
      <div>
        <Route path='/' exact component={MediaScreenMain} />
        <Route path='/lists/:id' component={MediaScreenList} />
      </div>
    </Router>
  )
}
