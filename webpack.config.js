const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const outputPath = path.resolve(__dirname, 'public/');
const sourcePath = path.resolve(__dirname, 'src');
const publicPath = ''; // relative to index

const styleLoader = {
  fallback: 'style-loader',
  use: [
    { loader: 'css-loader', options: { sourceMap: !isProduction } },
    { loader: 'postcss-loader', options: { ident: 'postcss', plugins: [autoprefixer()], sourceMap: !isProduction } },
    { loader: 'resolve-url-loader'},
    { loader: 'sass-loader', options: { outputStyle: 'compressed', sourceMap: true } },
  ],
};

const entries = ['babel-polyfill'];

module.exports = {
  entry: [
    ...entries,
    './src/index.jsx',
  ],
  output: {
    filename: '[name].[hash].js',
    publicPath,
    path: outputPath,
  },
  devtool: isProduction ? '' : 'eval',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: sourcePath,
      },
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract(styleLoader)
      },
      {
        test: /\.(jpg|jpeg|gif|png|ico|svg|eot|woff|woff2|ttf)$/,
        loader: 'file-loader?name=[name].[hash].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isProduction ? '"production"' : '"development"',
    }),
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new ManifestPlugin({ publicPath }),
    new CleanWebpackPlugin([outputPath], { watch: isProduction }),
  ],
};
