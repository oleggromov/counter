const detectMedia = (config) => {
  for (let mediaQuery in config) {
    if (config.hasOwnProperty(mediaQuery)) {
      let match = window.matchMedia(mediaQuery)
      if (match.matches) {
        return config[mediaQuery]
      }
    }
  }

  return null
}

export default detectMedia
