const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
//const postcssImport = require('postcss-import');
const cssnext = require('postcss-cssnext')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  context: __dirname,
  entry: {
    app: './src/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    //new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: '切图仔专用webpack'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new UglifyJSPlugin(),
    new ExtractTextPlugin('[name].css')
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    //publicPath: '/'
  },
  module: {
    rules: [
      {
        test:   /\.sss/,
        loader: "style-loader!css-loader!postcss-loader?parser=sugarss"
      },
      {
        test:   /\.css/,
        loader: "style-loader!css-loader?importLoaders=1!postcss-loader"
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.less$/,
        // use: [
        //   { loader: 'style-loader', options: { sourceMap: true } },
        //   { loader: 'css-loader', options: { sourceMap: true } },
        //   { loader: 'postcss-loader', options: { sourceMap: true } },
        //   { loader: 'less-loader', options: { sourceMap: true } }
        // ]
        loader:'style-loader!css-loader!postcss-loader!less-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      { 
        test: /\.js$/,
        //exclude: path.resolve(__dirname, '/node_modules/'),
        include: path.resolve(__dirname, '/src/'),
        loader: "babel-loader",
        query: {
          "presets":["latest"]
        },
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loaders: [
          'url-loader?limit=20000&name=asset/[name]-[hash: 5].[ext]',
          'image-webpack-loader'
        ]
      }
    ]
  }
};