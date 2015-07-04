/* jslint node: true */

"use strict";

var Webpack = require('webpack'), path = require('path');

var buildPath = './web/assets';

var config = {
  devtool: 'source-map',
  entry: {
    frontend : './src/js/frontend.js'
  },
  output: {
    path: buildPath,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /.*src\/js.*\.jsx?$/,
        loaders: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /app\/.*\.json$/, loader: 'json-loader'
      },

      {
        test: /\.css$/, loader: "style-loader!css-loader"
      },
      {
        test: /\.less$/, loader: "style!css?localIdentName=[path][name]---[local]---[hash:base64:5]!postcss!less"
      },

      // Fonts
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"
      }
    ]
  },
  plugins: [
    new Webpack.optimize.OccurenceOrderPlugin(),
    new Webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } })
  ]
};

module.exports = config;
