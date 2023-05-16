const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
  },
  entry: './electron/main.ts',
  module: {
    rules: require('./rules.webpack'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'node_modules/iohook/builds', to: 'builds' }],
    }),
  ],
}
