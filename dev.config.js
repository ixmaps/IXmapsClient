/* jslint node: true */
/* windows version */

"use strict";

var Webpack = require('webpack');
var path = require('path');

var nodeModulesPath = path.resolve('node_modules');
var buildPath = path.resolve('web/assets');

var config = {
  // We change to normal source mapping
  devtool: 'eval',
  //   devtool: 'source-map'
  entry: {
    frontend : ['./src/js/frontend.js', 'webpack/hot/dev-server']
  },
  output: {
    path: buildPath,
    filename: '[name].js',
    publicPath: '/assets'
  },
  devServer: {
    contentBase: "./assets",
    noInfo: true,
    hot: true,
    inline: true
  },
  module: {
    loaders: [
      {
        test: /.*\.jsx?$/,
        loaders: [
          'react-hot-loader',
          'babel-loader'
        ],
        exclude: /node_modules/
      },

      { test: /app\/.*\.json$/, loader: 'json-loader' },

      // Styles
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.less$/, loader: "style!css?localIdentName=[path][name]---[local]---[hash:base64:5]!postcss!less" },

      // Fonts
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoErrorsPlugin()
  ]
};

module.exports = config;
