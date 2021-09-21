/* eslint-disable */
var webpack = require("webpack");
var path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: ["./client/src/index.js"],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
          },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {},
          },
        ],
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist/bundle/",
    publicPath: "/static/",
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false,
      __PROD__: true,
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }),
  ],
};