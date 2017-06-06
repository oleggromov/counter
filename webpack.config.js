const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const selectorFormat = '[name]__[local]___[hash:base64:5]'
const extPlugin = new ExtractTextPlugin('styles.css')

const isProduction = process.env.NODE_ENV === 'production'
const plugins = isProduction
  ? [
    extPlugin,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
      '__PRODUCTION__': isProduction
    }),
    new UglifyJSPlugin({
      comments: false
    })
  ]
  : [
    extPlugin,
    new webpack.DefinePlugin({
      '__PRODUCTION__': isProduction
    })
  ]

module.exports = {
  entry: './client/index.js',

  output: {
    path: path.resolve('server/public/static'),
    publicPath: '/static/',
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
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },

  plugins,

  devServer: {
    historyApiFallback: true
  }
}
