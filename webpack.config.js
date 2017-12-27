const { join } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const webpack = require('webpack');

const prod = process.env.NODE_ENV === 'production';
const dest = join(__dirname, 'public');

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
});

const html = new HTMLWebpackPlugin({
  template: join(__dirname, 'src/index.html'),
});

const define = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
});

const clean = new CleanWebpackPlugin([
  'public/*.js',
  'public/*.html',
  'public/*.jpg',
  'public/*.svg',
  'public/*.png',
  'public/*.css',
]);

const reload = new LiveReloadPlugin();

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: dest,
    filename: 'index.[hash].js',
    publicPath: '/',
  },
  devtool: prod ? '' : 'eval-source-map',
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: extractSass.extract({
          use: [
            { loader: 'css-loader', options: { sourceMap: !prod } },
            { loader: 'resolve-url-loader', options: { keepQuery: true } }
          ],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            { loader: 'css-loader', options: { sourceMap: !prod } },
            { loader: 'resolve-url-loader', options: { keepQuery: true } },
            { loader: 'sass-loader', options: { sourceMap: !prod } },
          ],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.js$/,
        loader: 'ify-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: join(__dirname, 'src'),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=80000"
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [extractSass, html, clean, reload, define],
};
