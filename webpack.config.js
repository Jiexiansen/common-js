const path = require('path');
const webpack = require('webpack');
// const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  plugins: [new webpack.optimize.ModuleConcatenationPlugin()]
  // resolve: {
  //   // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
  //   mainFields: ['jsnext:main', 'browser', 'main']
  // },
  // plugins: [
  //   // 开启 Scope Hoisting
  //   new ModuleConcatenationPlugin()
  // ]
};
