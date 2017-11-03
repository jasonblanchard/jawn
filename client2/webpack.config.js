const _path = require('path');
var sassLintPlugin = require('sasslint-webpack-plugin');

function relativePath(path) {
  return _path.join(__dirname, path);
}

// TODO: Configure production build with https://github.com/kentcdodds/webpack-config-utils

module.exports = {
  entry: './src/index.js',
  output: {
    path: relativePath('build/static'),
    filename: 'app.js'
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    modules: [relativePath('src'), 'node_modules']
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
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|scss)$/,
        include: relativePath('src'),
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  plugins: [
    new sassLintPlugin({
      glob: 'src/**/*.s?(a|c)ss',
    })
  ]
}
