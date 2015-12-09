
var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin'),
    AssetsPlugin = require('assets-webpack-plugin'),
    bowerProvider = new webpack.ResolverPlugin([
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main']),
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
    ], ['normal', 'loader']),
    isDev = process.argv.indexOf('--production') == -1;

var plugins = [
  new webpack.DefinePlugin({
    'NODE_ENV': JSON.stringify('production')
  }),
  bowerProvider,
  new ExtractTextPlugin(isDev ? 'css/[name].css' : 'css/[name].[chunkhash].css', {allChunks: true}),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
  }),
  new CommonsChunkPlugin({name: 'commons.chunk', minChunks: 2}),
  new AssetsPlugin({path: path.join(__dirname, 'public', 'build')})
];

if(!isDev) {
  plugins.unshift(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  entry: {
    main: './public/js/main.js'
  },
  output: {
    path: path.join(__dirname, 'public/build'),
    filename: isDev ? '[name].bundle.js' : '[name].[chunkhash].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?cacheDirectory'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader', {publicPath: '../'})
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test:  /\.woff2?$|\.ttf$|\.eot$|\.wav$|\.mp3$/,
        loader: 'file-loader?name=files/[hash].[ext]'
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('css?sourceMap!stylus?sourceMap', {publicPath: '../'})
      }
    ]
  },
  plugins: plugins,
  resolve: {
    root: [path.join(__dirname, 'node_modules'), path.join(__dirname, 'public', 'bower_components')],
    modulesDirectories: ['node_modules', 'bower_components'],
    alias: {
      'main.styl': __dirname + '/public/css/main.styl'
    }
  },
  devtool: '#source-map',
  bail: true,
  debug: true/*,
  watch: isDev*/
};
