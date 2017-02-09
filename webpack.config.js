const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
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
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.png$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'public'),
  },

  resolve: {
    extensions: ['.js', '.vue']
  },

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
      FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
      FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
      FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
      FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
    })
  ]
};
