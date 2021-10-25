const rules = require('./webpack.rules');

const { isDevelopment } = require('./constants');

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/main/index.ts',
  module: { rules },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.json'],
  },
};
