var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    },
    {
      test: /\.(css|scss)$/,
      loader: ExtractTextPlugin.extract('css-loader!sass-loader')
    },
    {
      test: /\.(jpg|png|svg|gif|html)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    },
    {
      test: /\.(jpg|png|svg|gif)$/,
      loader: 'url-loader?limit=100000',
      include: path.join(__dirname, './dist/images')
    }]
  },
  plugins: [
    new ExtractTextPlugin('style.css', {
      allChunks: true
    }),
    new CopyWebpackPlugin([
      { from: 'deploy' }
    ])
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      utils: path.resolve('./src/utils'),
      styles: path.resolve('./src/assets/styles'),
      images: path.resolve('./src/assets/images'),
      actions: path.resolve('./src/actions'),
      reducers: path.resolve('./src/reducers'),
      structure: path.resolve('./src/components/structure'),
      modules: path.resolve('./src/components/modules'),
      views: path.resolve('./src/components/views')
    },
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    port: 8181
  }
};
