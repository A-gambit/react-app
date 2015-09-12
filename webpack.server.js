var webpack = require('webpack')
var fs = require('fs')

var nodeModules = {}

fs.readdirSync('./node_modules')
  .filter(function (mod) {
    return mod.indexOf('.bin') === -1
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

nodeModules['react'] = 'commonjs react/addons'

var buildDefinition = {
  entry: './src/server/index.js',
  output: {
    path: './dist',
    filename: 'server.js',
    devtoolModuleFilenameTemplate: '[resource-path]'
  },
  target: "node",
  externals: nodeModules,
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel?optional=runtime&stage=0'}
    ]
  }
}

if (process.env.NODE_ENV !== 'production') {
  buildDefinition.devtools = 'source-map'
  buildDefinition.plugins = [
    new webpack.BannerPlugin('require(\'source-map-support\').install();', {
      raw: true,
      entryOnly: true
    }),
    new webpack.DefinePlugin({
      "process.env": {
        PORT: 8081
      }
    })
  ]
}

module.exports = buildDefinition