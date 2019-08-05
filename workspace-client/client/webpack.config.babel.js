import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import AssetsPlugin from 'assets-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
// import SassLintPlugin from 'sasslint-webpack-plugin';

function relativePath(_path) {
  return path.join(__dirname, _path);
}

module.exports = () => {
  const { ifProduction, ifNotProduction } = getIfUtils(process.env.NODE_ENV || 'development');
  console.log(`\n>>> Building client in mode ${ifProduction('production', 'development')} <<<\n`); // eslint-disable-line no-console

  return {
    mode: ifProduction('production', 'development'),
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
        // {
        //   enforce: 'pre',
        //   test: /\.js$/,
        //   include: relativePath('src'),
        //   loader: 'eslint-loader',
        // },
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
          use: removeEmpty([
            ifProduction(MiniCssExtractPlugin.loader, 'style-loader'),
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                localIdentName: '[name]-[local]--[hash:base64:5]',
              },
            },
            // {
            //   loader: 'sass-loader',
            //   options: {
            //     sourceMap: true,
            //   },
            // },
          ]),
        },
      ],
    },
    plugins: removeEmpty([
      new AssetsPlugin({
        filename: 'assets.json',
        path: relativePath('build/static'),
      }),
      new CopyWebpackPlugin([
        { from: 'src/styles/fonts', to: 'fonts' },
      ]),
      ifProduction(new CleanWebpackPlugin([relativePath('build/static')])),
      // new SassLintPlugin({
      //   glob: 'src/**/*.s?(a|c)ss',
      // }),
      ifProduction(new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
      })),
    ]),
  };
};
