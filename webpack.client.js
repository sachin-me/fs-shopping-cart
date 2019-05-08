
const path = require('path');
const merge = require('webpack-merge');
// const baseConfig = require('./webpack.base');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  mode : "development",
  target: "web",
  entry: "./client/index.js",
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            }
          },
          { loader: 'sass-loader' },
        ]
      }
    ]
  },
  output: {
    filename: "client.bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }),
  ]
}

module.exports =  config;