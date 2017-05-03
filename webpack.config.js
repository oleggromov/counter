const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const selectorFormat = '[name]__[local]___[hash:base64:5]'

module.exports = {
  entry: './client/index.js',

  output: {
    path: path.resolve('server/public'),
    publicPath: '/',
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
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new ExtractTextPlugin('styles.css')
  ],

  devServer: {
    historyApiFallback: true
  }
}
