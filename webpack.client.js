var webpack = require('webpack');

var buildDefinition = {
  entry: './src/client/index.js',
  output: {
    path: './dist/assets',
    filename: 'client.js',
    devtoolModuleFilenameTemplate: '[resource-path]',
    publicPath: '/assets/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel?optional=runtime&stage=0']
      }
    ]
  },
  resolve: {
    alias: {
      react$: 'react/addons'
    }
  }
};

if (process.env.NODE_ENV !== 'production') {
  buildDefinition.module.loaders[0].loaders.unshift('react-hot');
  buildDefinition.devtool = 'source-map';
}

module.exports = buildDefinition;