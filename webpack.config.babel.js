import { getIfUtils } from 'webpack-config-utils';
import path from 'path';
import nodeExternals from 'webpack-node-externals';

function relativePath(_path) {
  return path.join(__dirname, _path);
}

module.exports = () => {
  const { ifProduction } = getIfUtils(process.env.NODE_ENV || 'development');
  console.log(`\n>>> Building server in mode ${ifProduction('production', 'development')} <<<\n`); // eslint-disable-line no-console

  return {
    mode: ifProduction('production', 'development'),
    target: 'node',
    entry: relativePath('src/app/index.js'),
    output: {
      path: relativePath('build'),
      pathinfo: true,
      filename: 'server.js',
      libraryTarget: 'commonjs',
    },
    resolve: {
      modules: [relativePath('.'), relativePath('client'), 'node_modules'],
      alias: {
        app: relativePath('src/app'),
      },
    },
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          include: relativePath('src'),
          test: /\.js$/,
          enforce: 'pre',
          use: ['eslint-loader'],
        },
        {
          include: [
            relativePath('src/app'),
          ],
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
      ],
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    optimization: {
      concatenateModules: false,
      minimize: false,
    },
  };
};
