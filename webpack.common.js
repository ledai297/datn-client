/* eslint import/no-extraneous-dependencies: 0 */
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: {
    app: ['babel-polyfill', './src/js/App.jsx'],
  },

  output: {
    path: `${__dirname}/public`,
    filename: 'js/[name].js',
    publicPath: '/',
  },

  devServer: {
    contentBase: './public',
    host: '192.168.0.5',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: './img/',
          },
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  externals: {},

  optimization: {
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/assets/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'robots.txt',
      template: 'src/assets/robots.txt',
      inject: false,
    }),
  ],
};
