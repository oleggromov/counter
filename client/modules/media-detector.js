import { forOwn } from 'lodash'

export default class MediaDetector {
  constructor (layouts, fn) {
    this.callback = fn
    this.state = null
    this.listeners = []

    this.listen = this.listen.bind(this)
    this.setListener = this.setListener.bind(this)

    forOwn(layouts, this.setListener)
  }

  destroy () {
    this.listeners.forEach(listener => {
      listener.match.removeListener(listener.fn)
    })
    this.listeners = []
  }

  setListener (type, key) {
    const match = window.matchMedia(key)
    const typedListener = this.listen.bind(this, type)

    typedListener(match)
    match.addListener(typedListener)

    this.listeners.push({
      match,
      fn: typedListener
    })
  }

  listen (type, match) {
    if (match.matches) {
      if (this.state !== type) {
        this.state = type
        this.callback(this.state)
      }
    }
  }
}
