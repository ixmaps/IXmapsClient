/* jslint node: true */

"use strict";

var Webpack = require('webpack');
var path = require('path');

var nodeModulesPath = path.resolve('node_modules');
var buildPath = path.resolve('web/assets');

var config = {
  devtool: 'eval',
  
  entry: {
    frontend: ['./src/js/frontend.js', 'webpack/hot/dev-server']
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
    rules: [
      {
        test: /.*\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'react-hot-loader/webpack' },
          { 
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ]
            }
          }
        ]
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
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoEmitOnErrorsPlugin()
  ]
};

module.exports = config;
