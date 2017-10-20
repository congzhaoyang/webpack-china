const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
//const postcssImport = require('postcss-import');
const cssnext = require('postcss-cssnext')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: {
    app: './src/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'output management'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new UglifyJSPlugin(),
    new ExtractTextPlugin("styles.sss")
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test:   /\.sss/,
        loader: "style-loader!css-loader!postcss-loader?parser=sugarss"
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};