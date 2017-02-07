const path = require('path');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'dist/bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.vue']
  }
};
