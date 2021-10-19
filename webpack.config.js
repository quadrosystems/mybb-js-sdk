const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  externals: [
    {
      'cross-fetch': {
        root: 'fetch',
        commonjs2: 'cross-fetch',
        commonjs: 'cross-fetch',
        amd: 'cross-fetch'
      }
    }
  ],
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
    globalObject: 'this',
    library: 'MybbSDK',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
};
