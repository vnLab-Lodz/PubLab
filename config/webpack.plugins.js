// eslint-disable-next-line import/no-extraneous-dependencies
const { EnvironmentPlugin } = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const dotenv = require('dotenv');

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

const sharedPlugins = [new EnvironmentPlugin({ ...dotenv.config().parsed })];

module.exports = {
  mainPlugins: [...sharedPlugins],
  rendererPlugins: [
    new ForkTsCheckerWebpackPlugin(),
    ...sharedPlugins,
    ...devPlugins,
  ],
};
