const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
//const postcssImport = require('postcss-import')
const cssnext = require('postcss-cssnext')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
  context: __dirname,
  entry: {
    app: './src/index.js'
  },
  // devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'webpack demo'
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new UglifyJSPlugin(),
    // new ExtractTextPlugin({
    //   filename: './dist/main.css',
    //   allChunks: true
    // }), 
    new ExtractTextPlugin("styles.css"),
    new WriteFilePlugin()
  ],
  output: {
    // filename: '[name].bundle.js',
    filename: 'bundle.js',
    // path: path.resolve(__dirname, 'dist'),
    //path: path.resolve(__dirname, 'dist'),
    path: __dirname + '/dist'
    // publicPath: '/'
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test:   /\.sss/,
        loader: "style-loader!css-loader!postcss-loader?parser=sugarss"
      },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.scss$/,
        // use: [
        //   { loader: 'style-loader', options: { sourceMap: true } },
        //   { loader: 'css-loader', options: { sourceMap: true } },
        //   { loader: 'postcss-loader', options: { sourceMap: true } },
        //   { loader: 'sass-loader', options: { sourceMap: true } }
        // ]
        loader:'style-loader!css-loader!postcss-loader!sass-loader',
        // loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
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
        exclude: path.resolve(__dirname, '/node_modules/'),
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
        test: /\.txt$/, use: 'raw-loader' 
      }
      // {
      //   test: /\.(png|jpg|gif|svg)$/,
      //   loaders: [
      //     'url-loader?limit=20000&name=asset/[name]-[hash:5].[ext]',
      //     'image-webpack-loader'
      //   ]
      // }
    ]
  }
};