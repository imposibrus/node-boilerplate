
const path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin'),
    AssetsPlugin = require('assets-webpack-plugin'),
    autoprefixer = require('autoprefixer-stylus'),
    buildDir = path.join(__dirname, 'public', 'build'),
    isDev = process.env.NODE_ENV !== 'production',
    plugins = [
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify('production'),
        }),
        new ExtractTextPlugin({
            filename: isDev ? 'css/[name].css' : 'css/[name].[chunkhash].css',
            allChunks: true,
        }),
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.jQuery': 'jquery'
        // }),
        new CommonsChunkPlugin({name: 'commons', minChunks: 2}),
        new CommonsChunkPlugin({
            name: 'vendor',
            minChunks: m => m.context && m.context.includes('node_modules'),
        }),
        new CommonsChunkPlugin({
            name: 'runtime',
            chunks: ['vendor'],
            minChunks: Infinity,
        }),
        new AssetsPlugin({path: buildDir}),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ];

if (!isDev) {
    plugins.unshift(new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
            warnings: true,
        },
    }));
}

module.exports = {
    entry: {
        main: ['./public/js/main.ts', 'webpack-hot-middleware/client?reload=true'],
    },
    output: {
        path: buildDir,
        filename: isDev ? '[name].bundle.js' : '[name].[chunkhash].bundle.js',
        publicPath: '/public/build/',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: 'public/js/tsconfig.json'
                        },
                    },
                    'webpack-module-hot-accept'
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                    publicPath: '../',
                })
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000
                    }
                }
            },
            {
                test:  /\.woff2?$|\.ttf$|\.eot$|\.wav$|\.mp3$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'files/[hash].[ext]'
                    }
                }
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'stylus-loader',
                            options: {
                                sourceMap: true,
                                use: [
                                    autoprefixer()
                                ],
                            }
                        }
                    ],
                    publicPath: '../'
                })
            }
        ]
    },
    plugins: plugins,
    resolve: {
        alias: {
            'main.styl': __dirname + '/public/css/main.styl',
            'noty.css': __dirname + '/node_modules/noty/lib/noty.css',
        },
        extensions: ['.ts', '.js'],
    },
    devtool: '#source-map',
    bail: true,
};
