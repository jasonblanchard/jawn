import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import AssetsPlugin from 'assets-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import SassLintPlugin from 'sasslint-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

function relativePath(_path) {
  return path.join(__dirname, _path);
}

const styleLoader = { loader: 'style-loader' };

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
    localIdentName: '[name]-[local]--[hash:base64:5]',
  },
};

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
  },
};

module.exports = (env = {}) => {
  const { ifProduction, ifNotProduction } = getIfUtils(env);

  return {
    entry: './src/index.js',
    output: {
      path: relativePath('build/static'),
      pathinfo: ifNotProduction(),
      filename: ifProduction('[name].[hash].bundle.js', 'app.js'),
    },
    devtool: ifNotProduction('cheap-module-source-map'),
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
          use: ifProduction(ExtractTextPlugin.extract({
            use: [
              cssLoader,
              sassLoader,
            ],
          }), [
            styleLoader,
            cssLoader,
            sassLoader,
          ]),
        },
      ],
    },
    plugins: removeEmpty([
      new AssetsPlugin({
        filename: 'assets.json',
        path: relativePath('build/static'),
      }),
      new CleanWebpackPlugin([relativePath('build/static')]),
      new SassLintPlugin({
        glob: 'src/**/*.s?(a|c)ss',
      }),
      ifProduction(new UglifyJsPlugin()),
      ifProduction(new ExtractTextPlugin('styles.css')),
    ]),
  };
};
