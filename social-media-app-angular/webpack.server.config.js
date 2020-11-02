// Work around for https://github.com/angular/angular-cli/issues/7200
import path from 'path';
import webpack from 'webpack';

module.exports = {
  mode: 'none',
  entry: {
    // Express server 
    server: './server.ts'
  },
  externals: {
    './dist/server/main': 'require("./server/main")'
  },
  target: 'node',
  resolve: {
    extensions: ['.ts', '.js']
  },
  optimization: {
    minimize: false
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    noParse: /polyfills-.*\.js/,
    rules: [{
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        // Have files into `@angular/core`. 
        // Removing this will show deprecation warnings.
        test: /(\\|\/)@angular(\\|\/)core(\\|\/).+\.js$/,
        parser: {
          system: true
        },
      },
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src folder
      {} 
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'), {}
    )
  ]
};