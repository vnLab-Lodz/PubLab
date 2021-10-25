const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const { isDevelopment } = require('./constants');

const devPlugins = isDevelopment
  ? [
      new ReactRefreshPlugin({
        overlay: {
          sockIntegration: 'whm',
        },
      }),
    ]
  : [];

module.exports = [new ForkTsCheckerWebpackPlugin(), ...devPlugins];
