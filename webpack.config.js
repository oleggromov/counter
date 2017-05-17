const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const selectorFormat = '[name]__[local]___[hash:base64:5]'

module.exports = {
  entry: './client/index.js',

  output: {
    path: path.resolve('server/public/static'),
    publicPath: '/static',
    filename: 'app.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(`css-loader?modules&importLoaders=1&localIdentName=${selectorFormat}!postcss-loader`)
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('styles.css')
  ],

  devServer: {
    historyApiFallback: true
  }
}
