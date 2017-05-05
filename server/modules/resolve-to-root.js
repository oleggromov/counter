const path = require('path')
const rootDir = path.dirname(require.main.filename)

const resolveToRoot = relativePath => {
  return path.resolve(rootDir, relativePath)
}

module.exports = resolveToRoot
