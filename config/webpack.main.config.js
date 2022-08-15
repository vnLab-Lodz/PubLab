const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

const { isDevelopment } = require('./constants');

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/main/index.ts',
  module: { rules },
  plugins: plugins.mainPlugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.json'],
  },
};
