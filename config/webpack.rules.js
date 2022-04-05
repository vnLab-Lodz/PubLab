const { isDevelopment } = require('./constants');

// * root url differs slightly because of the way webpack handles dev server and packaging
const publicPath = isDevelopment ? './' : '../';

module.exports = [
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: { outputAssetBase: 'native_modules' },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: [
      isDevelopment && {
        loader: 'babel-loader',
        options: { plugins: ['react-refresh/babel'] },
      },
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ].filter(Boolean),
  },
  {
    test: /\.s[ac]ss$/i,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  },
  {
    test: /\.svg$/,
    use: {
      loader: 'svg-url-loader',
    },
  },
  {
    test: /\.(png|jpe?g|gif)$/i,
    use: [{ loader: 'file-loader', options: { publicPath } }],
  },
  {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'file-loader',
        options: { name: 'fonts/[name].[ext]', publicPath },
      },
    ],
  },
];
