const path = require('path');

module.exports = {
  entry: './api/src/server.ts',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist', 'api'),
  },
  target: 'node',
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  mode: 'production'
};