const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// Make variables in the .env file available on the process.env object
require('dotenv').config();

module.exports = {
  // We're going to always do dev builds for now as they are much faster
  // and easier to debug.
  mode: 'development',
  entry: path.resolve(__dirname, 'app/index.js'),
  output: {
    filename: 'bundle.js',
    // 'public' is required for Now deployments
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({template: 'index.html'}),
  ],
  resolve: {
    modules: [__dirname, 'node_modules'],
    alias: {
      app: path.resolve(__dirname, 'app'),
    },
  },
  module: {
    rules: [
      // Our jsx-content module ships source code (ie. it includes Flow types
      // and JSX) so needs to be transpiled like all our other source code
      // despite the fact that it sits in node_modules.
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
      {
        test: /\.(svg)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        query: {
          limit: 10000,
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    writeToDisk: true,
    port: 13337,
  },
  // Shuts up an error due to a require('fs') call inside babel-core
  // TODO remove once we aren't transpiling jsx content at runtime anymore
  // Currently occurs in question-content.js
  node: {
    fs: 'empty',
  },
};
