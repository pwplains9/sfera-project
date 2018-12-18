"use string";
const webpack = require('webpack');
const path = require('path');
const env = require('./environments.config');
let plugins = [];
const { PORT } = process.env;
//Поагины
const CircularDependencyPlugin = require('circular-dependency-plugin');

plugins.push(
  new webpack.HotModuleReplacementPlugin()
);

plugins.push(new webpack.NoEmitOnErrorsPlugin());

plugins.push(new CircularDependencyPlugin({
  exclude: /a\.js|node_modules/,
  failOnError: false,
}));

module.exports = require('./webpack.babel')({
  entry: {
    js: path.join(process.cwd(), 'src/js/index.app.js'),
    vendor: [
      'es6-promise',
      'svg4everybody',
      'jquery'
    ]
  },
  output: {
    publicPath: env.publicPath
  },
  plugins: plugins,
  devServer: {
    contentBase: path.join(process.cwd(), 'src'),
    historyApiFallback: true,
    port: PORT || 3003,
    host: '0.0.0.0',
    compress: false,
    inline: true,
    hot: false,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
});