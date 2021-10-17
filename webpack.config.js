const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  externals: {
    fetch: {
      root: 'fetch',
      commonjs2: 'isomorphic-fetch',
      commonjs: 'isomorphic-fetch',
      amd: 'isomorphic-fetch'
    },
  },
  externalsType: 'umd',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: 'MybbSDK',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
};
