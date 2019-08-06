const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const SRC_DIR = path.resolve(__dirname, '../src');
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const OUTPUT_DIR = path.resolve(__dirname, '../dist/');

const ENTRY_POINT_JS = path.resolve(SRC_DIR, 'scripts/index.js');
const ENTRY_POINT_CSS = path.resolve(SRC_DIR, 'styles/main.css');
const ENTRY_POINT_PUG = path.resolve(SRC_DIR, 'index.pug');

module.exports = {
  entry: [ENTRY_POINT_JS, ENTRY_POINT_CSS, ENTRY_POINT_PUG],
  output: {
    filename: 'scripts/bundle.js',
    path: OUTPUT_DIR,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(png|jp(e)?g|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/images',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/fonts',
        },
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'index.html',
            },
          },
          {
            loader: 'pug-html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devServer: {
    port: 9001,
    stats: 'minimal',
    contentBase: PUBLIC_DIR,
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/bundle.css',
    }),
  ],
};
