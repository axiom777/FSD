// Utils
const path = require('path');
const fs = require('fs');

// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

// Get Pages
const pagesDir = path.resolve(__dirname, 'src/pages');
const pages = fs.readdirSync(pagesDir);

module.exports = (env, options) => {
  const isDev = options.mode === 'development';
  return {
    resolve: {
      alias: {
        scss: path.resolve(__dirname, 'src/scss/'),
      },
      modules: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules'),
      ],
    },
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
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'resolve-url-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)$/,
          include: [
            path.resolve(__dirname, 'src/fonts'),
            path.resolve(__dirname, 'node_modules'),
          ],
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts',
            },
          },
        },
        {
          test: /\.(png|jpg|jpeg|svg|gif)$/,
          exclude: [path.resolve(__dirname, 'src/fonts')],
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images',
            },
          },
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
      new FaviconsWebpackPlugin({
        logo: path.resolve(__dirname, 'src/images/logo.svg'),
        icons: {
          android: true, // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          appleStartup: false, // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          coast: false, // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          favicons: true, // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          firefox: true, // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          windows: false, // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          yandex: true, // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        },
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
