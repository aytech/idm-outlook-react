const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },

  performance: {
    hints: "warning"
  },

  mode: 'production',

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        extractComments: false,
        sourceMap: true,
        uglifyOptions: {
          mangle: true,
          ie8: false,
          keep_fnames: true,
          ecmaVersion: 6,
          compress: {
            ie8: false,
            warnings: false
          }
        }
      })
    ]
  }
});
