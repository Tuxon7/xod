const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    './src/client/app-browser/index.jsx',
  ],
  output: {
    filename: 'bundle.js',
  },
  resolve: {
    root: path.join(__dirname, '../src'),
    modulesDirectories: ['node_modules', 'src'],
    extensions: ['', '.js', '.jsx', '.scss'],
  },
  module: {
    loaders: [
      {
        test: /src\/.*\.jsx?$/,
        loaders: [
          'babel?presets[]=react,presets[]=es2015',
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css',
          'autoprefixer?browsers=last 3 versions',
          'sass?outputStyle=expanded',
        ],
      },
      {
        test: /assets\/.*\.(jpe?g|png|gif|svg|ttf|eot|svg|woff|woff2)?$/,
        loaders: [
          'file?name=[path][name].[ext]?[hash:6]&context=./src',
        ],
      },
      {
        test: /node_modules\/font-awesome\/.*\.(jpe?g|png|gif|svg|ttf|eot|svg|woff|woff2)(\?\S*)?$/,
        loaders: [
          'file?name=[path][name].[ext]?[hash:6]',
        ],
      },
      {
        test: /\.json5$/,
        loader: 'json5',
      },
    ],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([
      { from: 'src/client/index.html' },
    ]),
  ],
  externals: [
    {
      'isomorphic-fetch': {
        root: 'isomorphic-fetch',
        commonjs2: 'isomorphic-fetch',
        commonjs: 'isomorphic-fetch',
        amd: 'isomorphic-fetch',
      },
    },
  ],
};
