const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  isDevelopment &&
    new ReactRefreshPlugin({
      overlay: {
        sockIntegration: 'whm',
      },
    }),
];
