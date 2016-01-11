const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: {
    app: [
  //   'webpack/hot/dev-server',
  //   'webpack-hot-middleware/client',
      './source/index.js'
    ]
  },
  contentBase: './build',
  output: {
    path: './build',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']

      },
      {
        test: /\.html$/,
        exclude: /(webpack|default)_index\.html$/,
        loaders: ['html-loader']
      },
      {
        test: /\.scss$/,
        // loader: ExtractTextPlugin.extract('style-loader', ['css?sourceMap', 'sass?sourceMap'])
        // loader: ExtractTextPlugin.extract('style-loader', ['raw', 'sass'])
        // loader: ExtractTextPlugin.extract('style-loader', ['css', 'sass'])
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(png|jpg|gif)$/i,
        loader: 'file-loader'
        9// url loader seems to be cause trouble with html-webpack-plugin finding images
        // loaders: ['url?limit=10000&name=images/[name]-[hash:6].[ext]']
        // loader: 'url',
        // query: {
        //   limit: 150,
        //   name: 'images/[name]-[hash:6].[ext]'
        // }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: function(context) {
        console.log(context);
        return '';
      }
    }),
    // new HtmlWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './source/webpack_index.html'
    }),
    // new webpack.optimize.CommonsChunkPlugin('common.js'),
    new ExtractTextPlugin('styles-[contenthash:6].css'),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin()
  ],
  sassLoader: {
    outputStyle: 'expanded',
    precision: 5,
    sourceComments: true
  }
};

module.exports = config;
