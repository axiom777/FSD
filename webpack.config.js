// Utils
const path = require('path');
const fs = require('fs');

// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Get Pages
const pagesDir = path.resolve(__dirname, 'src/pages');
const pages = fs.readdirSync(pagesDir);

module.exports = (env, options) => {
  const isDev = options.mode === 'development';
  return {
    entry: {
      index: './src/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['eslint-loader'],
        },
        {
          test: /\.pug$/,
          loader: 'pug-loader',
          query: {
            pretty: isDev,
          },
        },
        {
          test: /\.s?css$/,
          loader: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [
      ...pages.map(
        (page) =>
          new HtmlWebpackPlugin({
            filename: `${page}.html`,
            template: `${pagesDir}/${page}/${page}.pug`,
          }),
      ),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'build'),
      compress: true,
      port: 9000,
      overlay: {
        warnings: true,
        errors: true,
      },
    },
  };
};
