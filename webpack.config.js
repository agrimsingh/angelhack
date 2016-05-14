const path = require('path');
const webpack = require('webpack');

const dirJs = path.resolve(__dirname, 'src');
const dirBuild = path.resolve(__dirname, 'build');

module.exports = {
  entry: path.resolve(dirJs, 'main.js'),
  output: {
    path: dirBuild,
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: dirBuild,
    historyApiFallback: true,
  },
  module: {
    loaders: [
      { include: [dirJs], loader: 'babel-loader' },
    ],
  },
  plugins: [
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin(),
  ],
  stats: {
// Nice colored output
    colors: true,
  },
// Create Sourcemaps for the bundle
  devtool: 'source-map',
  resolve: {
    alias: {
      src: dirJs,
    },
    extensions: ['', '.js'],
  },
};
