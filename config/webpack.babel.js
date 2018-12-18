"use strict";
const env = require('./environments.config');
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
let plugins = [];
const sourcePath = env.sourcePath;

//Поагины
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
plugins.push(new ExtractTextPlugin({
  filename: 'css/style.css',
  allChunks: true
}));

plugins.push(new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  minChunks: Infinity,
  filename: 'vendor.bundle.js'
}));

plugins.push(new webpack.optimize.CommonsChunkPlugin({
  name: 'node',
  minChunks: function (module) {
    const context = module.context;
    return context && context.indexOf('node_modules') >= 0;
  }
}));

plugins.push(new webpack.optimize.CommonsChunkPlugin({
  name: 'manifest',
  minChunks: Infinity,
}));

plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    DEMO_ENV: JSON.stringify(process.env.DEMO_ENV)
  }
}));
plugins.push(new webpack.NamedModulesPlugin());

plugins.push(new webpack.ProvidePlugin({
  'assign': 'lodash/assign',
  'isEmpty': 'lodash/isEmpty',
  'merge': 'lodash/merge',
  '$': 'jquery',
  'jQuery': "jquery",
  'window.jQuery': 'jquery',
  'window.$': 'jquery',
  'SvgEvery': 'svg4everybody',
  'isMobile': [sourcePath + '/js/vendors/isMobile'],
  '_addClass': [sourcePath + '/js/vendors/Help', 'addClass'],
  '_removeClass': [sourcePath + '/js/vendors/Help', 'removeClass'],
  '_hasClass': [sourcePath + '/js/vendors/Help', 'hasClass']
}));

fs.readdirSync(sourcePath).forEach(file => {
  if (file.indexOf('.pug') !== -1) {
    plugins.push(new HtmlWebpackPlugin({
      inject: false,
      filename: file.replace('pug', 'html'),
      template: './' + file,
      hash: true
    }));
  }
});

module.exports = (options) => ({
  context: sourcePath,
  entry: options.entry,
  output: Object.assign({
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].bundle.js',
  }, options.output),
  module: {
    rules: [{
      test: /(\.css|\.less)$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [{
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            minimize: true
          }
        },
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('postcss-import')({
                  root: loader.resourcePath
                }),
                require('autoprefixer')(),
                require('cssnano')({
                  zindex: false,
                  reduceIdents: {
                    keyframes: false
                  },
                  discardUnused: {
                    keyframes: false
                  }
                })
              ]
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      })
    },
      {
        test: /\.(jpg|png|gif)$/,
        loaders: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        },
          {
            loader: 'image-webpack-loader',
            query: {
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              mozjpeg: {
                progressive: true
              },
              gifsicle: {
                interlaced: true
              },
              optipng: {
                optimizationLevel: 7
              }
            },
          }
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: '10000',
            name: 'css/fonts/[name].[ext]'
          }
        }]
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            plugins: ['transform-runtime'],
            presets: ['es2015', 'stage-0']
          }
        }]
      },
      {
        test: /\.(pug)$/,
        use: [{
          loader: 'html-loader'
        },
          {
            loader: 'pug-html-loader'
          }
        ]
      }
    ]
  },
  plugins: options.plugins.concat(plugins),
  resolve: {
    extensions: ['.js'],
    modules: [
      'node_modules',
      'src'
    ]
  },
  devServer: options.devServer
});