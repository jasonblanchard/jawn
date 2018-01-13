const path = require('path');
const SassLintPlugin = require('sasslint-webpack-plugin');

function relativePath(_path) {
  return path.join(__dirname, _path);
}

// TODO: Configure production build with https://github.com/kentcdodds/webpack-config-utils

module.exports = {
  entry: './src/index.js',
  output: {
    path: relativePath('build/static'),
    filename: 'app.js',
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    modules: [relativePath('src'), 'node_modules'],
    alias: {
      src: relativePath('src'),
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        include: relativePath('src'),
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        include: relativePath('src'),
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|scss)$/,
        include: relativePath('src'),
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              localIdentName: '[name]-[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new SassLintPlugin({
      glob: 'src/**/*.s?(a|c)ss',
    }),
  ],
};
