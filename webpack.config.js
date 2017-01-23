var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'newClient/compiled');
var APP_DIR = path.resolve(__dirname, 'newClient');

var config = {
  entry: APP_DIR + '/src/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
    })
  ]
};

module.exports = config;