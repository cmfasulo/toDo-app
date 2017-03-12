var webpack = require('webpack');
var path = require('path');

//boiler plate config settings for webpack, webpack-dev-server
module.exports = {
    devtool: 'inline-source-map',
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:8080/',
        'webpack/hot/only-dev-server',
        'bootstrap-loader',
        './src'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['*', '.js', '.scss']
    },
    module: {
        loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        },
        {
            test: /\.html$/,
            loader: 'raw-loader'
        },
        {
            test: /\.scss$/,
            loaders: [
                'style-loader',
                'css-loader',
                'autoprefixer-loader',
                'sass-loader'
            ]
        },
        {
            test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
            loader: 'imports-loader?jQuery=jquery'
        },
        {
            test: /\.(woff2?|svg)$/,
            loader: 'url-loader?limit=10000'
        },
        {
            test: /\.(ttf|eot)$/,
            loader: 'file-loader'
        }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    devServer: {
        hot: true,
        proxy: {
            '*': 'http://localhost:3000'
        }
    }
};
