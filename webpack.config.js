const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, './client/index.js'),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env'],
              ['@babel/preset-react']
            ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml|mp3)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ], 
      }
    ]
  },
  devServer: {
    static: {
      publicPath: '/'
    },
    proxy: {
      '/api': 'html://localhost:3000'
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './client/template.html')
    }),
    new Dotenv(),
    new NodePolyfillPlugin()
  ]
};